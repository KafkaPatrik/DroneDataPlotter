import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your Firebase configuration here
const firebaseConfig = {
  apiKey: "AIzaSyBt_tbIbhbfa9WvZoqPNcpFoIjCWFaHvsc",
  authDomain: "droneplot-4b03b.firebaseapp.com",
  databaseURL: "https://droneplot-4b03b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "droneplot-4b03b",
  storageBucket: "droneplot-4b03b.appspot.com",
  messagingSenderId: "612802366224",
  appId: "1:612802366224:web:33dc95b2f7ae76c685f395"
};

const FIREBASE_APP = initializeApp(firebaseConfig);
const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { FIREBASE_APP, FIREBASE_AUTH };