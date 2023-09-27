import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/auth"
import * as ImagePicker from "expo-image-picker"
import { db, storage } from "../../../firebaseConfig"
import {
	doc,
	collection,
	updateDoc,
	query,
	where,
	getDocs,
} from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"

import { Modal, Platform } from "react-native"
import Header from "../../components/Header"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import {
	Container,
	UploadButton,
	UploadText,
	Avatar,
	Name,
	Email,
	Button,
	ButtonText,
	ModalContainer,
	ButtonBack,
	Input,
} from "./styles"

export default function Profile() {
	const { signOutApp, user, storageUser, setUser } = useContext(AuthContext)
	const [urlFoto, setUrlFoto] = useState(null)
	const [nome, setNome] = useState(user?.nome)
	const [open, setOpen] = useState(false)

	useEffect(() => {
		async function getPhoto() {
			try {
				const url = await getDownloadURL(ref(storage, `users/${user.uid}`))
				setUrlFoto(url)
			} catch (error) {
				console.log("Usuário sem foto de perfil!")
			}
		}

		getPhoto()
	}, [])

	async function updateProfile() {
		if (nome === "") {
			return
		}

		await updateDoc(doc(db, "users", user.uid), {
			nome: nome,
		})

		const postDocs = await getDocs(
			query(collection(db, "posts"), where("userId", "==", user.uid))
		)

		postDocs.forEach(async (document) => {
			await updateDoc(doc(db, "posts", document.id), {
				autor: nome,
			})
		})

		let data = {
			uid: user.uid,
			nome: nome,
			email: user.email,
		}

		setUser(data)
		storageUser(data)
		setOpen(false)
	}

	const uploadImage = async () => {
		await ImagePicker.requestMediaLibraryPermissionsAsync()

		if (ImagePicker.getMediaLibraryPermissionsAsync === false) {
			alert("É necessário permissão para acessar a galeria!")
			return
		}

		ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
		})
			.then((response) => {
				if (response.canceled) {
					return
				}

				setUrlFoto(response.assets[0].uri)
				uploadImageFirebase(response).then(() => {
					uploadAvatarPosts()
				})

				console.log("Foto atualizada com sucesso!")
			})
			.catch((error) => {
				console.log(error)
			})
	}

	const uploadImageFirebase = async (response) => {
		const fileSource = await fetch(response.assets[0].uri)
		return await uploadBytes(
			ref(storage, `users/${user.uid}`),
			await fileSource.blob()
		)
	}

	async function uploadAvatarPosts() {
		const url = await getDownloadURL(ref(storage, `users/${user.uid}`))
			.then(async (image) => {
				const postDocs = await getDocs(
					query(collection(db, "posts"), where("userId", "==", user.uid))
				)

				postDocs.forEach(async (document) => {
					await updateDoc(doc(db, "posts", document.id), {
						avatarUrl: image,
					})
				})
			})
			.catch((error) => {
				console.log(error)
			})
	}

	return (
		<Container>
			<Header />

			{urlFoto ? (
				<UploadButton onPress={uploadImage}>
					<UploadText>
						<MaterialCommunityIcons
							name="camera-retake-outline"
							size={50}
						/>
					</UploadText>

					<Avatar source={{ uri: urlFoto }} />
				</UploadButton>
			) : (
				<UploadButton onPress={uploadImage}>
					<UploadText>
						<MaterialCommunityIcons
							name="camera-plus-outline"
							size={50}
						/>
					</UploadText>
				</UploadButton>
			)}

			<Name numberOfLines={1}>{user.nome}</Name>

			<Email numberOfLines={1}>{user.email}</Email>

			<Button
				bg="#428cfd"
				onPress={() => setOpen(true)}
			>
				<ButtonText color="#fff">Atualizar perfil</ButtonText>
			</Button>

			<Button
				bg="#f1f1f1"
				onPress={() => signOutApp()}
			>
				<ButtonText color="#3b3b3b">Sair</ButtonText>
			</Button>

			<Modal
				visible={open}
				animationType="slide"
				transparent={true}
			>
				<ModalContainer behavior={Platform.OS === "ios" ? "padding" : ""}>
					<ButtonBack onPress={() => setOpen(false)}>
						<MaterialCommunityIcons
							name="arrow-left"
							size={22}
							color="#121212"
						/>

						<ButtonText color="#121212">Voltar</ButtonText>
					</ButtonBack>

					<Input
						placeholder={user?.nome}
						value={nome}
						onChangeText={(text) => setNome(text)}
					/>

					<Button
						bg="#428cfd"
						onPress={() => updateProfile()}
					>
						<ButtonText color="#f1f1f1">Atualizar</ButtonText>
					</Button>
				</ModalContainer>
			</Modal>
		</Container>
	)
}
