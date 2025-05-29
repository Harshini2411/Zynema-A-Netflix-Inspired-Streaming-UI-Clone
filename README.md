---

# 🎬 Zynema - A Netflix-Inspired Streaming UI Clone

**Zynema** is a visually captivating Netflix-style movie streaming platform built with **React.js**. It fetches real-time movie data from the **TMDb API**, integrates **YouTube trailers**, and leverages **Firebase Authentication and Firestore** to manage users and securely store data.

This project aims to demonstrate full-stack skills, including frontend design, API integration, authentication, database management, and modular component architecture. Ideal for developers building portfolio-grade clones.

---

## 🔥 Key Features

- 🔐 **User Authentication** using Firebase (Email & Password)
- 🧾 **User Data Storage** using Firestore (for session-based features)
- 🎞️ **Movie Streaming UI** powered by The Movie Database (TMDb) API
- 📼 **Trailer Preview** via embedded YouTube videos
- ⚛️ Built with React, using functional components and hooks
- ⚙️ Axios-based API client for clean TMDb requests
- 📱 Fully responsive design mimicking Netflix's layout
- 🖼️ Avatar + User Profile integration with `assets/` directory
- 🔄 Auto reloads on changes (with `npm start`)
- 📁 Organized and scalable codebase with modular components

---

## 📁 Project Structure

```

netflix-clone/
├── public/
│   └── index.html                      # Entry point
├── src/
│   ├── assets/
│   │   └── zynema\_avatar.png          # Avatar used in header/profile
│   ├── components/
│   │   ├── Banner.js                  # Top hero section
│   │   ├── Row\.js                     # Movie row component
│   │   ├── Nav.js                     # Top navbar
│   │   └── AuthPage.js                # Login/Signup UI
│   ├── firebase.js                    # Firebase config and exports
│   ├── axios.js                       # Axios instance for TMDb API
│   ├── App.js                         # Main router & layout logic
│   ├── styles/
│   │   ├── AuthPage.css               # Styles for login/signup
│   │   └── ...
│   └── index.js                       # ReactDOM rendering entry
├── .firebaserc
├── package.json
└── README.md

````

---

## 🔧 Firebase Setup and Usage

### Step 1: Create Firebase Project
- Go to [Firebase Console](https://console.firebase.google.com/)
- Create a new project and register a Web App

### Step 2: Enable Email & Password Authentication
- Navigate to **Authentication > Sign-in Method**
- Enable **Email/Password**

### Step 3: Configure Firestore Database
- Go to **Firestore Database** in the sidebar
- Click **Create Database** (start in test mode for development)

### Step 4: Add Firebase Config

Inside `src/firebase.js`:

```js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-app",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
````

---

## 🧠 Firestore Structure

```plaintext
users (collection)
├── <uid> (document)
│   └── email: "user@example.com"
│   └── displayName: "Harshini"
│   └── createdAt: Timestamp
```

This structure allows you to store and manage user-related data securely and efficiently.

---

## 🎞️ TMDb API Integration

* Signup at [TMDb](https://www.themoviedb.org/)
* Generate an API key in your account settings
* Add it to `axios.js` as follows:

```js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "YOUR_TMDB_API_KEY",
  },
});

export default instance;
```

---

## 📦 Installation Guide

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/netflix-clone.git
cd netflix-clone
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the App Locally

```bash
npm start
```

App is now available at: **[http://localhost:3000](http://localhost:3000)**

---

## 📤 Production Build

To build the project for production:

```bash
npm run build
```

This will generate an optimized `build/` folder that can be deployed to Firebase Hosting, Vercel, Netlify, or any static host.

---

## 🧪 Testing

Run tests with:

```bash
npm test
```

---

## 💡 Future Enhancements

* 🧠 Personalized movie recommendations (using ML/LLMs)
* 🌙 Dark/Light Theme Toggle
* 📺 User Watch History
* 📌 Add to Watchlist (stored in Firestore)
* 🔍 Search movies by genre, actor, or title
* 📱 Mobile-first UI improvements

---

## 📚 Resources

* [React Docs](https://reactjs.org/)
* [Firebase Docs](https://firebase.google.com/docs)
* [TMDb API Docs](https://developers.themoviedb.org/3)
* [YouTube IFrame Player API](https://developers.google.com/youtube/iframe_api_reference)

---

## 🛠 CRA Scripts Reference

### `npm start`

Runs the app in development mode.

### `npm run build`

Bundles the app for production.

### `npm run test`

Launches the test runner in interactive watch mode.

### `npm run eject`

**Note:** Irreversible! Copies all configs (Webpack, Babel, ESLint, etc.) to your project folder.

---

## 📸 Screenshots

<img width="959" alt="sign_up" src="https://github.com/user-attachments/assets/a3829bf7-2bc5-470e-b44b-1a2de363c5ef" />

<img width="959" alt="sign_in" src="https://github.com/user-attachments/assets/4d61693d-2459-41b5-bedd-7dc96ddc0e14" />

[▶️ Watch the demo video](zynema_app.mp4)


---

---
## 🎥Zynema - Final Deployment
** [https://zynema-afceb.web.app/](https://zynema-afceb.web.app/) **
---

## 📄 License

This project is open-source under the [MIT License](LICENSE).

```


