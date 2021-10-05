import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function BluetScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bluetooth</Text>
      <EditScreenInfo path="/screens/BluetScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: "center",
    position: "absolute",
    top: '5%',
  },
});
