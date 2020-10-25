import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import Arrow from "./svg/Arrow";
import Logo from "./svg/Logo";
import CustomText from "./CustomText";

//@ts-ignore
const Header = (props: any) => {
	const width = Dimensions.get("screen").width;
	return (
		<View style={[styles.header, { width: width }]}>
			<View style={styles.container}>
				{props.screen === "login" ? (
					<Logo width={40} height={26} />
				) : !props.noArrow ? (
					<TouchableOpacity onPress={props.nav}>
						<Arrow />
					</TouchableOpacity>
				) : null}
				<CustomText content={props.screen !== "login" ? props.screen : null} style={styles.title} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		height: 50,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#0E0F10",
	},
	container: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		width: 320,
		marginLeft: "auto",
		marginRight: "auto",
	},
	title: {
		color: "#F28300",
		fontSize: 24,
		margin: "auto",
	},
});
export default Header;
