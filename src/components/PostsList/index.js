import { useRef } from "react"
import { db } from "../../../firebaseConfig"
import {
	collection,
	deleteDoc,
	doc,
	getDoc,
	updateDoc,
	setDoc,
} from "firebase/firestore"
import { useNavigation } from "@react-navigation/native"
import { formatDistance } from "date-fns"
import { ptBR } from "date-fns/locale"

import { MaterialIcons } from "@expo/vector-icons"
import {
	Container,
	Header,
	Avatar,
	Name,
	ContentView,
	Content,
	Actions,
	LikeButton,
	Like,
	TimePost,
} from "./styles"
import * as Animatable from "react-native-animatable"

const HeartAnimated = Animatable.createAnimatableComponent(MaterialIcons)

export default function PostsList({ data, userId }) {
	const navigation = useNavigation()
	const likeRef = useRef()

	function formatTimePost() {
		const datePost = new Date(data?.created.seconds * 1000)

		return formatDistance(new Date(), datePost, {
			locale: ptBR,
		})
	}

	async function likePost(id, likes) {
		const docId = `${userId}_${id}`
		likeRef.current.rubberBand()

		const document = await getDoc(doc(collection(db, "likes"), docId))

		if (document.exists()) {
			await updateDoc(doc(collection(db, "posts"), id), {
				likes: likes - 1,
			})

			await deleteDoc(doc(collection(db, "likes"), docId))
			return
		}

		await setDoc(doc(collection(db, "likes"), docId), {
			postId: id,
			userId: userId,
		})

		await updateDoc(doc(collection(db, "posts"), id), {
			likes: likes + 1,
		})
	}

	return (
		<Container style={{ elevation: 3 }}>
			<Header
				onPress={() =>
					navigation.navigate("PostsUser", {
						title: data.autor,
						userId: data.userId,
					})
				}
			>
				{data.avatarUrl ? (
					<Avatar source={{ uri: data.avatarUrl }} />
				) : (
					<Avatar source={require("../../assets/avatar.png")} />
				)}

				<Name>{data?.autor}</Name>
			</Header>

			<ContentView>
				<Content>{data?.content}</Content>
			</ContentView>

			<Actions>
				<LikeButton onPress={() => likePost(data.id, data.likes)}>
					<HeartAnimated
						ref={likeRef}
						name={data?.likes === 0 ? "favorite-outline" : "favorite"}
						size={20}
						color="#e52246"
					/>

					<Like>{data?.likes === 0 ? "" : data?.likes}</Like>
				</LikeButton>

				<TimePost>{formatTimePost()}</TimePost>
			</Actions>
		</Container>
	)
}
