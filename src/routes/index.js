import { View, ActivityIndicator } from "react-native"
import { useContext } from "react"
import { AuthContext } from "../contexts/auth"

import AuthRoutes from "./auth.routes"
import AppRoutes from "./app.routes"

function Routes() {
	const { signed, loading } = useContext(AuthContext)

	if (loading) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: "#36393f",
				}}
			>
				<ActivityIndicator
					size={50}
					color="#36393f"
				/>
			</View>
		)
	}

	return signed ? <AppRoutes /> : <AuthRoutes />
}

export default Routes
