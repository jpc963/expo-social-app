import { useState, useContext } from "react"
import { ActivityIndicator, Text } from "react-native"
import { AuthContext } from "../../contexts/auth"

import {
	Container,
	Title,
	Input,
	Button,
	ButtonText,
	SignUpButton,
	SignUpButtonText,
} from "./styles"
import * as Animatable from "react-native-animatable"

const TitleAnimatable = Animatable.createAnimatableComponent(Title)

export default function Login() {
	const { signUp, signIn, loadingAuth } = useContext(AuthContext)
	const [login, setLogin] = useState(true)
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	function toggleLogin() {
		setLogin(!login)
		setName("")
		setEmail("")
		setPassword("")
	}

	function handleLogin() {
		if (email === "" || password === "") {
			alert("Preencha todos os campos")
			return
		}
		signIn(email, password)
	}

	function handleSignUp() {
		if (name === "" || email === "" || password === "") {
			alert("Preencha todos os campos")
			return
		}
		signUp(email, password, name)
	}

	if (login) {
		return (
			<Container>
				<TitleAnimatable animation={"flipInY"}>
					Dev<Text style={{ color: "#e52246" }}>Post</Text>
				</TitleAnimatable>

				<Input
					placeholder="Email"
					value={email}
					onChangeText={(e) => setEmail(e)}
				/>
				<Input
					placeholder="Senha"
					secureTextEntry={true}
					value={password}
					onChangeText={(e) => setPassword(e)}
				/>

				<Button onPress={handleLogin}>
					{loadingAuth ? (
						<ActivityIndicator
							size={20}
							color={"#fff"}
						/>
					) : (
						<ButtonText>Acessar</ButtonText>
					)}
				</Button>

				<SignUpButton onPress={toggleLogin}>
					<SignUpButtonText>Criar conta</SignUpButtonText>
				</SignUpButton>
			</Container>
		)
	}

	return (
		<Container>
			<TitleAnimatable animation={"fadeInDown"}>
				Dev<Text style={{ color: "#e52246" }}>Post</Text>
			</TitleAnimatable>

			<Input
				placeholder="Nome"
				value={name}
				onChangeText={(e) => setName(e)}
			/>
			<Input
				placeholder="Email"
				value={email}
				onChangeText={(e) => setEmail(e)}
			/>
			<Input
				placeholder="Senha"
				secureTextEntry={true}
				value={password}
				onChangeText={(e) => setPassword(e)}
			/>

			<Button onPress={handleSignUp}>
				{loadingAuth ? (
					<ActivityIndicator
						size={20}
						color={"#fff"}
					/>
				) : (
					<ButtonText>Cadastrar</ButtonText>
				)}
			</Button>

			<SignUpButton onPress={toggleLogin}>
				<SignUpButtonText>Já tenho uma conta</SignUpButtonText>
			</SignUpButton>
		</Container>
	)
}
