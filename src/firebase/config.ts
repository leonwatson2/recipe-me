// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { VITE_ENV } from "../types";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const ENV: VITE_ENV = import.meta.env as unknown as VITE_ENV;
const firebaseConfig = {
  apiKey: ENV.VITE_FIREBASE_API_KEY,
  authDomain: ENV.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: ENV.VITE_FIREBASE_PROJECT_ID,
  storageBucket: ENV.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: ENV.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: ENV.VITE_FIREBASE_APP_ID,
};
export const GOOGLE_AUTH_CLIENT_ID = ENV.VITE_GOOGLE_AUTH_CLIENT_ID

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
