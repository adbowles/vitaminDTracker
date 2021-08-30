import { white } from 'color-name';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View , Pressable} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>MyVitamin D {"\n"} Tracker</Text>
      <View style={styles.progressBar}></View>
      <Text style={styles.UVIndex}>UV Index: 6.3</Text>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>MyCalendar</Text>
      </Pressable>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>MySettings</Text>
      </Pressable>
      
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
  button:{
    textAlign:'center',
    backgroundColor:"#fff",
    width:"80%",
    marginTop:30,
    borderRadius: 20,
    paddingTop:20,
    paddingBottom:20
    // height:'30%'
  },
  buttonText: {
    textAlign:'center',
    fontSize: 35,
  }
});
