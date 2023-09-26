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
import { MaterialIcons } from "@expo/vector-icons"
import { formatDistance } from "date-fns"
import { ptBR } from "date-fns/locale"

export default function PostsList({ data, userId }) {
	function formatTimePost() {
		const datePost = new Date(data?.created.seconds * 1000)

		return formatDistance(new Date(), datePost, {
			locale: ptBR,
		})
	}

	return (
		<Container style={{ elevation: 3 }}>
			<Header>
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
				<LikeButton>
					<MaterialIcons
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
