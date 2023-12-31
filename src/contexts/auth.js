import { useState, createContext, useEffect } from "react"
import { auth, db } from "../../firebaseConfig"
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const AuthContext = createContext()

function AuthProvider({ children }) {
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)
	const [loadingAuth, setLoadingAuth] = useState(false)

	useEffect(() => {
		async function loadStorage() {
			const storageUser = await AsyncStorage.getItem("devApp")

			if (storageUser) {
				setUser(JSON.parse(storageUser))
				setLoading(false)
			}

			setLoading(false)
		}

		loadStorage()
	})

	async function signIn(email, password) {
		setLoadingAuth(true)
		await signInWithEmailAndPassword(auth, email, password)
			.then(async (value) => {
				let uid = value.user.uid
				const userProfile = await getDoc(doc(db, "users", uid))

				let data = {
					uid: uid,
					nome: userProfile.data().nome,
					email: value.user.email,
				}
				setUser(data)
				storageUser(data)
				setLoadingAuth(false)
			})
			.catch((error) => {
				console.log(error)
				setLoadingAuth(false)
			})
	}

	async function signUp(email, password, name) {
		setLoadingAuth(true)
		await createUserWithEmailAndPassword(auth, email, password)
			.then(async (value) => {
				let uid = value.user.uid
				await setDoc(doc(db, "users", uid), {
					nome: name,
					email: value.user.email,
				}).then(async () => {
					let data = {
						uid: uid,
						nome: name,
						email: value.user.email,
					}
					setUser(data)
					storageUser(data)
					setLoadingAuth(false)
				})
			})
			.catch((error) => {
				console.log(error)
				setLoadingAuth(false)
			})
	}

	async function signOutApp() {
		await signOut(auth)
		await AsyncStorage.clear().then(() => {
			setUser(null)
		})
	}

	async function storageUser(data) {
		await AsyncStorage.setItem("devApp", JSON.stringify(data))
	}

	return (
		<AuthContext.Provider
			value={{
				signed: !!user,
				user,
				setUser,
				signUp,
				signIn,
				signOutApp,
				loadingAuth,
				loading,
				storageUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider
