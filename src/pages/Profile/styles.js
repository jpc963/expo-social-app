import styled from "styled-components/native"

export const Container = styled.View`
	flex: 1;
	align-items: center;
	background-color: #353840;
`

export const UploadButton = styled.TouchableOpacity`
	margin-top: 20%;
	background-color: #fff;
	width: 165px;
	height: 165px;
	border-radius: 90px;
	align-items: center;
	justify-content: center;
	z-index: 5;
`

export const UploadText = styled.Text`
	z-index: 9;
	position: absolute;
	font-size: 55px;
	color: #e52246;
	opacity: 0.4;
`

export const Avatar = styled.Image`
	width: 160px;
	height: 160px;
	border-radius: 80px;
	opacity: 0.9;
`

export const Name = styled.Text`
	margin: 20px 20px 0 20px;
	font-size: 28px;
	font-weight: bold;
	color: #fff;
`

export const Email = styled.Text`
	margin: 9px 20px 10px 20px;
	font-size: 20px;
	font-style: italic;
	color: #ddd;
`

export const Button = styled.TouchableOpacity`
	margin-top: 12px;
	align-items: center;
	justify-content: center;
	background-color: ${(props) => props.bg || "#fff"};
	width: 80%;
	height: 45px;
	border-radius: 5px;
`

export const ButtonText = styled.Text`
	font-size: 20px;
	color: ${(props) => props.color || "#000"};
	font-style: italic;
`

export const ModalContainer = styled.KeyboardAvoidingView`
	width: 100%;
	height: 70%;
	background-color: #fff;
	justify-content: center;
	align-items: center;
	position: absolute;
	bottom: 0;
`

export const ButtonBack = styled.TouchableOpacity`
	position: absolute;
	top: 18px;
	left: 25px;
	flex-direction: row;
	align-items: center;
`

export const Input = styled.TextInput`
	width: 90%;
	height: 50px;
	background-color: #ddd;
	border-radius: 10px;
	padding: 10px;
	font-size: 20px;
	text-align: center;
`
