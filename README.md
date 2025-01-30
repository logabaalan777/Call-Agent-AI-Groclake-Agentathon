# 🌟 Drastic Innovators 🌟

### 🏫 College: Sri Eshwar College of Engineering

Welcome to the Drastic Innovators project! 🚀 We are a team of enthusiastic individuals dedicated to pushing the boundaries of innovation and technology. Our goal is to create impactful solutions that enhance user experiences and drive progress in various fields. 

---

## 🎬 Demo Video
📺 Watch our solution in action!  
👉 [Click here to view the demo](https://drive.google.com/file/d/1yWoCBKMfJzC1o5rdpHyiC9W9D2ldWNYU/view?usp=sharing)

---

## 📄 Project Presentation
📢 Check out our **detailed PPT presentation** explaining the project.  
📥 [Download Presentation](https://drive.google.com/file/d/1zDygnpZTdAVJeuFqYkor8j8hgI__Lpna/view?usp=sharing)

---

# *Revolutionizing E-Commerce Customer Support with AI Voice Calling* 🛍️📱

*AI-powered Voice Assistance for E-Commerce* to tackle the growing complexity of customer queries, ensuring scalability, efficiency, and 24/7 support. Our solution leverages AI to provide real-time, human-like voice interactions, reducing dependence on human agents. This innovation enhances customer satisfaction, streamlines support operations and boosts e-commerce business growth. 🚀

## *Reason for Choosing This Theme*!🤔

🚀 **Addressing a Real-World Challenge:** The increasing complexity and volume of customer queries in e-commerce require innovative solutions. Our AI Voice Calling System 📞🤖 ensures scalable, efficient, and cost-effective customer support, enhancing user experience like never before! ✨

💡 **Driving Innovation in E-Commerce:** By leveraging AI-powered voice interactions 🗣️⚡, our solution offers a cutting-edge, future-ready approach that meets evolving industry needs 📈. This boosts business competitiveness 🏆 while ensuring a seamless, intelligent customer support experience! ✅

---

## 📌 Problem Statement
E-commerce platforms struggle with:  
🔴 **Scalability Issues** – Millions of customer queries but limited support agents.  
🔴 **Complexity** – Queries range from product inquiries to returns & refunds.  
🔴 **Customer Satisfaction** – Poor support leads to lost sales and brand damage.  

## ✅ Our Solution
✔️ AI **Voice-Based Customer Support** for seamless interaction.  
✔️ **24/7 AI-Powered Assistance** reducing human dependency.  
✔️ **Real-Time Integration** with e-commerce databases.  
✔️ **Multi-Query Handling** – Product details, delivery status, return & refund tracking, Raising An Issue.  

---

## 🔄 How It Works  

![image](https://github.com/logabaalan777/Call-Agent-AI-Groclake-Agentathon/blob/main/Presentation_Img_flow_chart.png)

1️⃣ **Customer Initiates Call** 📞  
   - The customer calls via **Twilio**, which manages the **public switched telephone network (PSTN)**.  

2️⃣ **Customer Verification** ✅  
   - The system checks the **MySQL database** for customer details.  
   - If valid, the process continues.  

3️⃣ **Real-time Streaming via Node.js** 🌐  
   - **Node.js** manages the audio stream and connects to **WebSockets**.  

4️⃣ **Speech-to-Text Conversion** 🎙️➡️📝  
   - The voice input is sent to **Deepgram** for transcription.  

5️⃣ **AI Processing & Response Generation** 🤖💡  
   - The transcribed query is processed by **OpenAI**.  
   - **ModelLake** formats the response and retrieves **product details** from **Vector Lake**.  

6️⃣ **Backend Processing & Formatting** 🔄  
   - The AI-generated response is processed using **Flask APIs**.  

7️⃣ **AI Response is Sent Back** 🔊  
   - The text is **converted back to speech** via **Deepgram** and streamed through **Twilio**.  

---


