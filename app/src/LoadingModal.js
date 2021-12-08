import React from 'react';
import { StyleSheet, View, ActivityIndicator, Modal } from 'react-native';

export default function LoadingModal(props) {
	return (
		<Modal visible={props.isVisible} animationType="fade" transparent>
			<View style={styles.container}>
				<ActivityIndicator size='large' color='white'/>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent:"center",
		alignItems:"center",
		backgroundColor:'#000000bb',
	},
});