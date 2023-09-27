import { useLayoutEffect, useState, useEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import { db } from "../../../firebaseConfig"
import {
	collection,
	onSnapshot,
	query,
	where,
	orderBy,
} from "firebase/firestore"
import PostsList from "../../components/PostsList"

import { ActivityIndicator, View } from "react-native"
import { Container, ListPosts } from "./styles"

export default function PostsUser({ route }) {
	const navigation = useNavigation()
	const [title, setTitle] = useState(route.params?.title)
	const [posts, setPosts] = useState([])
	const [loading, setLoading] = useState(true)

	useLayoutEffect(() => {
		navigation.setOptions({
			title: title === "" ? "" : title,
		})
	}, [navigation, title])

	useEffect(() => {
		const subscriber = onSnapshot(
			query(
				collection(db, "posts"),
				where("userId", "==", route.params?.userId),
				orderBy("created", "desc")
			),
			(snapshot) => {
				const postList = []

				snapshot.forEach((doc) => {
					postList.push({ ...doc.data(), id: doc.id })
				})

				setPosts(postList)
				setLoading(false)
			}
		)

		return () => subscriber()
	}, [])

	return (
		<Container>
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
							userId={route.params?.userId}
						/>
					)}
				/>
			)}
		</Container>
	)
}
