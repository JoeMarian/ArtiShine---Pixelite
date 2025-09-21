# 🎨 ArtiShine – AI-Powered Marketplace for Local Artisans

**ArtiShine** is a **Platform-as-a-Service (PaaS)** designed to empower **local artisans** by giving them a digital presence while connecting them to buyers in their local area. It leverages **generative AI, multimodal inputs, and geo-fenced discovery** to create a seamless artisan-to-buyer experience.  

---

## 💡 What is ArtiShine?

ArtiShine bridges the gap between **traditional craftsmanship** and the **modern digital marketplace**. Local artisans can:

- Speak about themselves and their products in their **native language 🎤**  
- Get their voice inputs **transcribed, translated, and converted into AI-generated product stories 📖**  
- Showcase products with rich **images and storytelling**  
- Gain visibility through **Instagram posts 📸** with their consent  
- Reach **local buyers** via geo-fenced recommendations 📍  
- Engage buyers with a **Tinder-style swipe interface ❤️/💔**  
- Include **personalized notes 🖐️** with product deliveries  

---

## 🖥️ What We Built

ArtiShine consists of **two major components**:  

### 1. Backend – Artisan Storytelling API

- **FastAPI-based backend** for high-performance API services  
- Accepts **multimodal input**: audio (transcribed text) + product images  
- Generates **structured JSON output** with fields like Title, Category, Tagline, Cultural Significance, etc.  
- Saves stories in **Firestore** and **Google Cloud Storage** for persistence  
- Integrates **LangChain + OpenRouter AI** to produce compelling product narratives  

**Features Include:**  
- Automatic transcription of artisan audio  
- Image classification & metadata extraction  
- AI-generated storytelling for product and artisan profile  
- Optional auto-posting on Instagram  

---

### 2. Frontend – Buyer & Artisan Platforms

- **Artisan Portal**: Onboard products, manage profile, generate AI stories  
- **Buyer Portal**: Discover nearby handmade products, swipe to like/add to wishlist/cart  
- **Map Integration**: Visualize artisans and products in a **10km radius**  
- **Intuitive UI** inspired by modern apps, keeping the experience **simple and interactive**  

---

## 🛠️ Technology Stack

| Component         | Technology / Tool                        |
| ---------------- | ---------------------------------------- |
| Backend          | FastAPI, Uvicorn                          |
| AI               | LangChain + OpenRouter (`google/gemini-flash-1.5`) |
| Database         | Google Firestore                          |
| Storage          | Google Cloud Storage                       |
| Frontend         | React.js / HTML / CSS / JS                |
| Deployment       | Localhost / Cloud (GCP)                  |
| Environment      | Python 3.10+                              |

---

## 🚀 Setup & Installation

### 1️⃣ Prerequisites

- Python 3.10+  
- Google Cloud project with Firestore & Cloud Storage  
- OpenRouter API Key

---
### 👥 Pixelite Team Members
- Muhammad Farhaan
- Joe Marian A
- Mohamed Sheraz M
- Mohamed Junaidh R
- Ajmal Khan

---
### 2️⃣ Clone the Repository

```bash
git clone <your-repo-url>
cd artishine
