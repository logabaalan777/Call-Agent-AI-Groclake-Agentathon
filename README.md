# Call Agent AI - Drastic Innovators 🚀

## 📌 Project Overview
**Call Agent AI** is an AI-powered voice assistant designed to revolutionize e-commerce customer support. It enables real-time, human-like voice interactions, reducing dependency on human agents and enhancing customer satisfaction.

---
## 🏫 **Sri Eshwar College of Engineering**

## 🎬 **Demo Video**  
📺 [Watch Here](https://drive.google.com/file/d/1x0bhNdwgSyUrPugg1VCHzfN1TZWsjk3F/view?usp=drive_link)

## 📄 **Project Presentation**  
📥 [Download PPT](https://drive.google.com/file/d/1lpIjY_XEgLMxKY4TY0DincBSW6RsQMPs/view?usp=sharing)

---

## 🚀 **Features**
✅ AI-powered **voice-based customer support**  
✅ **24/7 AI assistance**, reducing human dependency  
✅ **Real-time integration** with e-commerce databases  
✅ Handles multiple queries: **Product inquiries, delivery tracking, returns, refunds, and issue resolution**  

---

## 🔄 **How It Works**
![Flowchart](https://github.com/logabaalan777/Call-Agent-AI-Groclake-Agentathon/blob/main/Presentation_Img_flow_chart.png)

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
   - **OpenAI** processes the transcribed query.  
   - **ModelLake** formats the response and retrieves **product details** from **Vector Lake**.  

6️⃣ **Backend Processing & Formatting** 🔄  
   - The AI-generated response is processed using **Flask APIs**.  

7️⃣ **AI Response is Sent Back** 🔊  
   - The text is **converted back to speech** via **Deepgram** and streamed through **Twilio**.  

---

## 🛠️ Tech Stack  

| Technology | Description |
|------------|-------------|
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white) | Handles media streaming for incoming/outgoing calls |
| ![Twilio](https://img.shields.io/badge/Twilio-FF0000?style=for-the-badge&logo=twilio&logoColor=white) | Manages voice calling and PSTN network |
| ![WebSockets](https://img.shields.io/badge/WebSockets-FFCC00?style=for-the-badge) | Enables real-time communication |
| ![Deepgram](https://img.shields.io/badge/Deepgram-000000?style=for-the-badge&logo=deepgram&logoColor=white) | Converts speech-to-text and vice versa |
| ![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white) | Processes queries and generates intelligent responses |
| ![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white) | Backend API management |
| ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white) | Stores customer details |
| ![Modellake](https://img.shields.io/badge/Modellake-6A0DAD?style=for-the-badge) | Formats chat responses and powers AI/NLP processing |
| ![VectorLake](https://img.shields.io/badge/Vector_Lake-007ACC?style=for-the-badge) | Stores and retrieves product details |

---

## 🎯 **Why Call Agent AI?**
✅ **AI-First Approach** - NLP, Speech Recognition & Real-Time Processing  
💰 **Cost-Effective** - Reduces operational costs  
🔗 **Seamless Integration** - Works with e-commerce platforms  
📊 **Data-Driven Insights** - Tracks customer queries to improve service quality  

---

## 🌟 Groclake Tools and its usage 

**Groclake** is an **Agentic AI infrastructure** designed to revolutionize **e-commerce automation** by integrating **AI-powered workflows, intelligent agents, and scalable solutions**. It automates tasks such as customer engagement, inventory management, and intelligent product search.  

Our project leverages **Groclake's modular components** to enhance customer interactions through AI-driven **voice assistance, search capabilities, and dynamic responses**.  

## 🚀 How We Use Groclake Components

| Component | Usage in Our Project |
|-----------|----------------------|
| **Modellake** | Enables **AI-driven solution** and **Formating the Responses** for customer interactions. |
| **Vectorlake** | Powers **stores product details, semantic search & personalized product recommendations**. |

## ⚡ Why Groclake?  
✔️ **Boosts Efficiency**: Reduces manual effort by **40%**, improves query resolution by **50%**.  
✔️ **Enhances CX**: AI-driven interactions increase **customer satisfaction** & conversions.  
✔️ **Secure & Scalable**: Enterprise-grade **data security** & **cost-effective automation**.  
✔️ **Developer-Friendly**: Pre-built libraries simplify AI/ML **integration & deployment**.  

🚀 **Groclake + AI = The Future of E-Commerce Automation!**  

---

## 📢 **Meet the Drastic Innovators Team**
We are passionate about AI-driven innovation, transforming customer support one call at a time! 🚀

- **Karthikeyan M**: [LinkedIn](https://www.linkedin.com/in/karthikeyan-m30112004/) | [GitHub](https://github.com/KarthikeyanM3011)
- **Barath Raj P**: [LinkedIn](https://www.linkedin.com/in/barathrajp/) | [GitHub](https://github.com/Barathaj)
- **Arun Kumar R**: [LinkedIn](https://www.linkedin.com/in/arun-kumar-99b841255/) | [GitHub](https://github.com/ArunKumar200510)
- **Logabaalan R S**: [LinkedIn](https://www.linkedin.com/in/logabaalan-r-s-94ba82259/) | [GitHub](https://github.com/logabaalan777)

Contact us for collaborations, queries, or more information!

💡 **Join us in making E-Commerce smarter, faster & more efficient!**  

