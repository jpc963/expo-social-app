import { useState, useLayoutEffect, useContext } from "react"
import { useNavigation } from "@react-navigation/native"

import { FIREBASE_DB, FIREBASE_STORAGE } from "../../../firebaseConfig"
import { ref, getDownloadURL } from "firebase/storage"
import { addDoc, collection } from "firebase/firestore"
import { AuthContext } from "../../contexts/auth"

import { Container, Input, Button, ButtonText } from "./styles"

export default function NewPost() {
	const navigation = useNavigation()
	const [post, setPost] = useState("")
	const { user } = useContext(AuthContext)

	useLayoutEffect(() => {
		const options = navigation.setOptions({
			headerRight: () => (
				<Button onPress={() => handlePost()}>
					<ButtonText>Compartilhar</ButtonText>
				</Button>
			),
		})
	}, [navigation, post])

	async function handlePost() {
		if (post === "") {
			alert("Digite algo para postar")
			return
		}
		let avatarUrl = null

		try {
			let response = await getDownloadURL(
				ref(FIREBASE_STORAGE, `users/${user.uid}/perfil.jpg`)
			)
			avatarUrl = response
		} catch (error) {
			avatarUrl = null
			console.log(error)
		}

		await addDoc(collection(FIREBASE_DB, "posts"), {
			created: new Date(),
			content: post,
			autor: user.nome,
			likes: 0,
			avatarUrl: avatarUrl,
			userId: user.uid,
		})
			.then(() => {
				setPost("")
				console.log("Post criado com sucesso!")
				navigation.goBack()
			})
			.catch((error) => {
				console.log(error)
			})
	}

	return (
		<Container>
			<Input
				placeholder="O que está acontecendo?"
				placeholderTextColor={"#ddd"}
				multiline={true}
				maxLength={255}
				value={post}
				onChangeText={(text) => setPost(text)}
				autoCorrect={false}
			/>
		</Container>
	)
}
