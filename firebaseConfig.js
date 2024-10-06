// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, Timestamp } from "firebase/firestore";

import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

export function convertTimestampsToDate(obj) {
    if (obj && typeof obj === 'object') {
        Object.keys(obj).forEach(key => {
            const value = obj[key];

            // Eğer değer Timestamp ise, Date'e çevir


            if (value && value instanceof Timestamp) {

                obj[key] = value.toDate();
            }

            // Eğer iç içe obje varsa, aynı fonksiyonu yeniden çağır
            else if (typeof value === 'object' && value !== null && value != undefined) {
                convertTimestampsToDate(value);
            }
        });
    }
    return obj;
}


const firebaseConfig = {
    apiKey: "AIzaSyCGNywbuyq9wmFY5V-DzT10Dfy1Bj5d6vQ",
    authDomain: "farmdb-3e57e.firebaseapp.com",
    projectId: "farmdb-3e57e",
    storageBucket: "farmdb-3e57e.appspot.com",
    messagingSenderId: "526751856101",
    appId: "1:526751856101:web:f88387fb4f5fee7b7d2b0c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});




export default app;