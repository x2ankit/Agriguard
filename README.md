# Agriguard - An Intelligent Pesticide Sprinkling System

![Project Status](https://img.shields.io/badge/status-in--development-green)
![License](https://img.shields.io/badge/license-MIT-blue)
![Smart India Hackathon 2025](https://img.shields.io/badge/Event-Smart%20India%20Hackathon%202025-orange)

An AI-powered drone system for precision agriculture, designed to reduce pesticide usage, improve crop health, and boost profitability for Indian farmers.

Live at - [Agriguard](https://agriguard-green.vercel.app/)
---

## Table of Contents

1.  [About The Project](#about-the-project)
2.  [Key Features](#key-features)
3.  [System Architecture](#system-architecture)
4.  [Tech Stack](#tech-stack)
5.  [Getting Started](#getting-started)
6.  [Roadmap](#roadmap)
7.  [Contributing](#contributing)
8.  [License](#license)
9.  [Deployment](#deployment)

---

## About The Project

> Traditional pesticide spraying applies chemicals uniformly across entire fields, wasting resources and causing significant harm to soil, water, and non-target organisms. Farmers need an affordable, automated, and intelligent system that detects plant health and sprays pesticides *only* where needed, reducing costs, improving yield, and supporting sustainable farming.

**Agriguard** is our solution. Developed by **Team Chaotex** for the Smart India Hackathon 2025, it is an integrated system of hardware and software designed to bring precision agriculture to every farmer.

At its core, Agriguard is an AI-enabled quadcopter that flies over fields, uses an onboard computer vision model to identify the exact location and severity of plant infections in real-time, and dispenses a variable, precise dose of pesticide only on the affected areas. This "see and spray" approach drastically cuts down on chemical usage, environmental impact, and operational costs.

The entire system is accessible through a user-friendly web dashboard and is designed around a **Drone-as-a-Service (DaaS)** model to make this technology accessible to all.

---

## Key Features

* **🌱 AI-Powered Infection Detection**: Classifies plant health into categories (Healthy, Mild, Severe) in real-time.
* **🚁 Smart Drone Spraying**: Fully autonomous, GPS-guided missions for precise, targeted pesticide application.
* **📊 Farmer Dashboard**: A comprehensive web app for mission planning, real-time monitoring (live camera feed, maps), and viewing analytics (infection heatmaps, spray history).
* **🤖 AI Chatbot**: An integrated help section powered by the OpenAI API to assist farmers with operations and queries.
* **🔗 IoT Integration**: Provides real-time notifications to the dashboard on drone status, battery levels, and tank levels.

---

## System Architecture

The Agriguard system is composed of two main parts: the onboard drone system that operates at the edge, and the cloud platform that provides control and analytics.

#### 🤖 Onboard Drone System (The Edge)
* **Flight & Control**: A **Pixhawk** flight controller manages autonomous GPS missions and flight stability.
* **AI Brain**: A **Raspberry Pi 4** coupled with a **Google Coral TPU** runs the `TensorFlow Lite` model for real-time inference.
* **Vision**: A **Pi Camera** captures the live video feed for the AI model.
* **Action**: A custom pump and nozzle system, controlled by **PWM signals** from the Raspberry Pi, enables variable-rate spraying.

#### ☁️ Cloud & Web Platform
* **Frontend**: A **React** and **TypeScript** single-page application serves as the farmer's dashboard.
* **Backend**: A **Node.js** and **Express.js** server manages data flow, user authentication, and communication with the drones.
* **Database**: **Firebase/MongoDB** stores all user, farm, and mission data.
* **Communication**: **MQTT/LoRa** protocols are used for lightweight, real-time data transfer between the drone and the cloud.

---

## Tech Stack

This project is built with a modern and robust set of technologies.

| Category                  | Technologies                                                                                                                                                                                          |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend** | ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white) ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white) ![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/-Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white) |
| **Backend** | ![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/-Express.js-000000?logo=express&logoColor=white) |
| **Database** | ![Firebase](https://img.shields.io/badge/-Firebase-FFCA28?logo=firebase&logoColor=white) ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?logo=mongodb&logoColor=white) |
| **ML / AI** | ![TensorFlow](https://img.shields.io/badge/-TensorFlow-FF6F00?logo=tensorflow&logoColor=white) ![Keras](https://img.shields.io/badge/-Keras-D00000?logo=keras&logoColor=white) ![OpenCV](https://img.shields.io/badge/-OpenCV-5C3EE8?logo=opencv&logoColor=white) ![Python](https://img.shields.io/badge/-Python-3776AB?logo=python&logoColor=white) |
| **Onboard Hardware** | ![Raspberry Pi](https://img.shields.io/badge/-Raspberry_Pi-A22846?logo=raspberry-pi&logoColor=white) ![Google Coral](https://img.shields.io/badge/-Google_Coral_TPU-F6AB01) |
| **External APIs** | ![OpenAI](https://img.shields.io/badge/-OpenAI-412991?logo=openai&logoColor=white) |

---

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js and npm
    ```sh
    npm install npm@latest -g
    ```
* Python & pip
    ```sh
    # Ensure Python 3.8+ is installed
    ```

### Installation

1.  **Clone the repo**
    ```sh
    git clone [https://github.com/x2ankit/Agriguard.git)
    ```
2.  **Install Frontend Dependencies**
    ```sh
    cd agriguard/frontend
    npm install
    ```
3.  **Install Backend Dependencies**
    ```sh
    cd ../backend
    npm install
    ```
4.  **Install Python Dependencies for ML scripts**
    ```sh
    cd ../ml
    pip install -r requirements.txt
    ```

---

## Roadmap

We have a clear vision for the future of Agriguard. Our next steps include:

-   [ ] **Multi-Sensor Fusion**: Evolve the AI model to process both camera and NDVI sensor data for earlier, more accurate detection.
-   [ ] **Swarm Intelligence**: Implement multi-drone communication and coordination for covering large farms efficiently.
-   [ ] **Predictive Analytics**: Build a cloud platform that uses aggregated data to predict pest outbreaks before they happen.
-   [ ] **Automated Retraining**: Create a CI/CD pipeline for the ML model to automatically retrain and improve itself with new data from the field.

See the [open issues](https://github.com/your_username/agriguard/issues) for a full list of proposed features (and known issues).

---

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

---

## Deployment

Website Link: [Click to View](https://agriguard-green.vercel.app/)
