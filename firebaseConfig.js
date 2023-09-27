import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
	apiKey: "AIzaSyDjri2IOCGoPgj7h8Uis_q18_5utOTn934",
	authDomain: "devpost-d1030.firebaseapp.com",
	projectId: "devpost-d1030",
	storageBucket: "devpost-d1030.appspot.com",
	messagingSenderId: "1033994767049",
	appId: "1:1033994767049:web:5b04bd5927e70b28759b18",
	measurementId: "G-YSBFMNVVJG",
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
