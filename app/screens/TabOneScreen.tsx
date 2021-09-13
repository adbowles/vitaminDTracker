import * as React from 'react';
import { StyleSheet } from 'react-native';
import {Pressable} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'Home'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>MyVitamin D {"\n"} Tracker</Text>
      <View style={styles.progressBar}></View>
      <Text style={styles.UVIndex}>UV Index: 6.3</Text>
      
      <StatusBar/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#36A900',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header:{
    //fontFamily:"Yellowtail-Regular", 
    fontSize: 50,
    textAlign: "center",
    fontWeight: 'bold',
    color:"#fff",
    position: "absolute",
    top: '5%',
  },
  progressBar: {
    width:'80%',
    height:40,
    backgroundColor:'#fff'
  },
  UVIndex:{
    //fontFamily:"Yellowtail-Regular", 
    marginTop:30,
    fontSize: 25,
    textAlign: "center",
    fontWeight: 'bold',
    color:"#000",
    //position: "absolute",
  },
});
