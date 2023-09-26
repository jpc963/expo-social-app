import styled from "styled-components/native"

export const Container = styled.View`
	flex: 1;
	background-color: #36393f;
`

export const ButtonPost = styled.TouchableOpacity`
	background-color: #202225;
	width: 60px;
	height: 60px;
	justify-content: center;
	align-items: center;
	position: absolute;
	bottom: 4%;
	right: 6%;
	border-radius: 30px;
`

export const ListPosts = styled.FlatList`
	flex: 1;
	background-color: #f1f1f1;
`
