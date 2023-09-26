import { useContext } from "react"
import { View, Text, Button } from "react-native"

import { AuthContext } from "../../contexts/auth"

export default function Profile() {
	const { signOutApp } = useContext(AuthContext)

	return (
		<View>
			<Text>Profile</Text>
			<Button
				title="Sair"
				onPress={() => signOutApp()}
			/>
		</View>
	)
}
