import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Feather } from "@expo/vector-icons"

import Home from "../pages/Home"
import Profile from "../pages/Profile"
import Search from "../pages/Search"
import NewPost from "../pages/NewPost"
import PostsUser from "../pages/PostsUser"

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function StackScreen() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Index"
				component={Home}
				options={{
					headerShown: false,
				}}
			/>

			<Stack.Screen
				name="NewPost"
				component={NewPost}
				options={{
					headerTintColor: "#fff",
					headerStyle: {
						backgroundColor: "#36393f",
					},
				}}
			/>

			<Stack.Screen
				name="PostsUser"
				component={PostsUser}
			/>
		</Stack.Navigator>
	)
}

function AppRoutes() {
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarHideOnKeyboard: true,
				tabBarShowLabel: false,
				tabBarStyle: {
					backgroundColor: "#202225",
					borderTopWidth: 0,
				},
				tabBarActiveTintColor: "#fff",
				headerShown: false,
			}}
		>
			<Tab.Screen
				name="Home"
				component={StackScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Feather
							name="home"
							size={size}
							color={color}
						/>
					),
				}}
			/>

			<Tab.Screen
				name="Search"
				component={Search}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Feather
							name="search"
							size={size}
							color={color}
						/>
					),
				}}
			/>

			<Tab.Screen
				name="Profile"
				component={Profile}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Feather
							name="user"
							size={size}
							color={color}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	)
}

export default AppRoutes
