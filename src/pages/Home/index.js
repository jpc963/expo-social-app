import { useState, useContext, useEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import { AuthContext } from "../../contexts/auth"
import { FIREBASE_DB } from "../../../firebaseConfig"
import { collection, query, orderBy, onSnapshot } from "firebase/firestore"

import { View, ActivityIndicator } from "react-native"
import { Feather } from "@expo/vector-icons"
import { Container, ButtonPost, ListPosts } from "./styles"

import Header from "../../components/Header"
import PostsList from "../../components/PostsList"

export default function Home() {
	const navigation = useNavigation()
	const [posts, setPosts] = useState([])
	const [loading, setLoading] = useState(true)
	const { user } = useContext(AuthContext)

	useEffect(() => {
		const subscriber = onSnapshot(
			query(collection(FIREBASE_DB, "posts"), orderBy("created", "desc")),
			(snapshot) => {
				const postList = []

				snapshot.forEach((doc) => {
					postList.push({
						...doc.data(),
						id: doc.id,
					})
				})

				setPosts(postList)
				setLoading(false)
			}
		)

		// Stop listening for updates when no longer required
		return () => subscriber()
	}, [])

	return (
		<Container>
			<Header />

			{loading ? (
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<ActivityIndicator
						size={50}
						color="#e52246"
					/>
				</View>
			) : (
				<ListPosts
					showsVerticalScrollIndicator={false}
					data={posts}
					renderItem={({ item }) => (
						<PostsList
							data={item}
							userId={user.uid}
						/>
					)}
				/>
			)}

			<ButtonPost
				onPress={() => {
					navigation.navigate("NewPost")
				}}
			>
				<Feather
					name="edit-2"
					size={25}
					color="#fff"
				/>
			</ButtonPost>
		</Container>
	)
}
