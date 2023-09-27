import { useEffect, useState } from "react"
import { db } from "../../../firebaseConfig"
import { collection, where, query, onSnapshot } from "firebase/firestore"

import { Feather } from "@expo/vector-icons"
import { Container, AreaInput, Input, List } from "./styles"
import SearchList from "../../components/SearchList"

export default function Search() {
	const [input, setInput] = useState("")
	const [users, setUsers] = useState([])

	useEffect(() => {
		if (input === "" || input === undefined) {
			setUsers([])
			return
		}

		const subscriber = onSnapshot(
			query(
				collection(db, "users"),
				where("nome", ">=", input.toLowerCase()),
				where("nome", "<=", input.toLowerCase() + "\uf8ff")
			),
			(snapshot) => {
				const listsUsers = []

				snapshot.forEach((doc) => {
					listsUsers.push({
						...doc.data(),
						id: doc.id,
					})
				})

				setUsers(listsUsers)
			}
		)

		return () => subscriber()
	}, [input])

	return (
		<Container>
			<AreaInput>
				<Feather
					name="search"
					size={24}
					color="#e52246"
				/>

				<Input
					placeholder="Pocurando alguém?"
					placeholderTextColor="#353840"
					value={input}
					onChangeText={(text) => setInput(text)}
				/>
			</AreaInput>

			<List
				showsVerticalScrollIndicator={false}
				data={users}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => <SearchList data={item} />}
			/>
		</Container>
	)
}
