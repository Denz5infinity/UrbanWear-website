import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

let app;
let auth;

const requiredKeys = [
  "apiKey",
  "authDomain",
  "projectId",
  "storageBucket",
  "messagingSenderId",
  "appId"
];

function getFirebaseConfig() {
  const config = window.__URBANWEAR_FIREBASE_CONFIG__;

  if (!config) {
    throw new Error(
      "Firebase is not configured yet. Create scripts/firebase/env.js from env.example.js and add your Firebase project values."
    );
  }

  const missingKey = requiredKeys.find((key) => {
    const value = config[key];
    return !value || String(value).startsWith("YOUR_");
  });

  if (missingKey) {
    throw new Error(`Firebase config is missing a valid ${missingKey}.`);
  }

  return config;
}

export function getFirebaseAuth() {
  if (!app) {
    app = initializeApp(getFirebaseConfig());
  }

  if (!auth) {
    auth = getAuth(app);
  }

  return auth;
}
