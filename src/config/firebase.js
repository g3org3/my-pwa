// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, remove, push, child } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const id = process.env.REACT_APP_FIREBASE_PROJECT_ID;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: `${id}.firebaseapp.com`,
  databaseURL: `https://${id}-default-rtdb.firebaseio.com`,
  projectId: id,
  storageBucket: `${id}.appspot.com`,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
// const apps = getApps();
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const auth = getAuth(app);
export const dbActivitiesRef = ref(db, '/activities');
export const dbRemove = (refName, id) => remove(ref(db, refName + '/' + id));
export const dbPush = (refName, payload) =>
  push(child(ref(db), refName), payload);
