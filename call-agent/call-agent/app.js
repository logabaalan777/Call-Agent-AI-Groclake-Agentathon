require('dotenv').config();
require('colors');

const express = require('express');
const ExpressWs = require('express-ws');
const { GptService } = require('./services/gpt-service');
const { StreamService } = require('./services/stream-service');
const { TranscriptionService } = require('./services/transcription-service');
const { TextToSpeechService } = require('./services/tts-service');
const { recordingService } = require('./services/recording-service');
const bodyParser = require('body-parser');
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const app = express();
ExpressWs(app);

const callerMap = new Map();

const PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/incoming', (req, res) => {
  try {
    console.log('Incoming request to /incoming');
    const response = new VoiceResponse();
    const connect = response.connect();
    const callerNumber = req.body.From;
    
    callerMap.set(req.body.CallSid, callerNumber);
    
    connect.stream({ url: `wss://${process.env.SERVER}/connection` });
    
    res.type('text/xml');
    res.end(response.toString());
    console.log('Response sent to Twilio');
  } catch (err) {
    console.error('Error in /incoming route:', err);
  }
});

app.ws('/connection', (ws) => {
  console.log('WebSocket connection initiated...');
  try {
    console.log('WebSocket connection established');
    
    ws.on('error', (err) => {
      console.error('WebSocket error:', err);
    });

    let streamSid;
    let callSid;

    const gptService = new GptService();
    const streamService = new StreamService(ws);
    const transcriptionService = new TranscriptionService();
    const ttsService = new TextToSpeechService({});
  
    let marks = [];
    let interactionCount = 0;
  
    ws.on('message', function message(data) {
      try {
        const msg = JSON.parse(data);
        
        if (msg.event === 'start') {
          streamSid = msg.start.streamSid;
          callSid = msg.start.callSid;
          
          const callerNumber = callerMap.get(callSid);
          
          streamService.setStreamSid(streamSid);
          gptService.setCallSid(callSid, callerNumber);

          callerMap.delete(callSid);

          recordingService(ttsService, callSid).then(() => {
            console.log(`Twilio -> Starting Media Stream for ${streamSid}`.underline.red);
            ttsService.generate({
              partialResponseIndex: null, 
              partialResponse: 'Hello! How can I help you! What service are you looking for?'
            }, 0);
            console.log('Transcript done!');
          }).catch(err => {
            console.error('Recording Service Error:', err);
          });
        } else if (msg.event === 'media') {
          transcriptionService.send(msg.media.payload);
        } else if (msg.event === 'mark') {
          const label = msg.mark.name;
          console.log(`Twilio -> Audio completed mark (${msg.sequenceNumber}): ${label}`.red);
          marks = marks.filter(m => m !== msg.mark.name);
        } else if (msg.event === 'stop') {
          console.log(`Twilio -> Media stream ${streamSid} ended.`.underline.red);
        }
      } catch (err) {
        console.error('Error processing message:', err);
      }
    });
  
    transcriptionService.on('utterance', async (text) => {
      if (marks.length > 0 && text?.length > 5) {
        console.log('Twilio -> Interruption, Clearing stream'.red);
        ws.send(
          JSON.stringify({
            streamSid,
            event: 'clear',
          })
        );
      }
    });
  
    transcriptionService.on('transcription', async (text) => {
      if (!text) { return; }
      console.log(`Interaction ${interactionCount} – STT -> GPT: ${text}`.yellow);
      gptService.completion(text, interactionCount);
      interactionCount += 1;
    });
    
    gptService.on('gptreply', async (gptReply, icount) => {
      console.log(`Interaction ${icount}: GPT -> TTS: ${gptReply.partialResponse}`.green);
      ttsService.generate(gptReply, icount);
    });
  
    ttsService.on('speech', (responseIndex, audio, label, icount) => {
      console.log(`Interaction ${icount}: TTS -> TWILIO: ${label}`.blue);
      streamService.buffer(responseIndex, audio);
    });
  
    streamService.on('audiosent', (markLabel) => {
      console.log(`Audio sent: ${markLabel}`);
      marks.push(markLabel);
    });
  } catch (err) {
    console.error('Error in WebSocket connection:', err);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
