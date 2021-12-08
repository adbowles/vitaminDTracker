import * as React from 'react';
import { StyleSheet } from 'react-native';
import {Pressable} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import ClothingSelector from '../components/ClothingSelector';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'Home'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>MyVitamin D {"\n"} Tracker</Text>
      <View style={styles.progressBar1}></View>
      <Text style={styles.progressBartext}>Vitamin D Progress:</Text>
      <Text style={styles.UVIndex}>UV Index: 6</Text>
      <ClothingSelector style={styles.ClothingSpace}/>
      <StatusBar/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header:{
    //fontFamily:"Yellowtail-Regular", 
    fontSize: 45,
    textAlign: "center",
    fontWeight: 'bold',
    position: "absolute",
    top: '2%',
  },
  progressBartext:{
    //fontFamily:"Yellowtail-Regular", 
    marginTop:30,
    fontSize: 25,
    textAlign: "center",
    fontWeight: 'bold',
    top:'-13%'
    //position: "absolute",
  },

  progressBar1: {
    width:'80%',
    height:30,
    borderRadius: 20,
    backgroundColor:'#fff',
    top: '6%'
  },

  UVIndex:{
    //fontFamily:"Yellowtail-Regular", 
    marginTop:30,
    fontSize: 25,
    textAlign: "center",
    fontWeight: 'bold',
    //position: "absolute",
    top: '-33%'
  },
  ClothingSpace:{
    position: 'absolute',
    bottom:'15%'
  },
});
