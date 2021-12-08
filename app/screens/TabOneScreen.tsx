import * as React from 'react';
import { StyleSheet } from 'react-native';
import {Pressable} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import ClothingSelector from '../components/ClothingSelector';
import {dailyInfo, StartTimer} from '../src/Database';
import * as Progress from 'react-native-progress';

export default class TabOneScreen extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.test = {
      mounted:false,
      update:this.forceUpdate.bind(this)
    }
    this.state = {

    };
  }

  componentDidMount() { 
    this.test.mounted = true;
  }
  
  componentWillUnmount() {
    this.test.mounted = false;
  }

  render() {
    StartTimer(this.test);
    return (
      <View style={styles.container}>
        <Text style={styles.header}>MyVitamin D {"\n"} Tracker</Text>
        <Progress.Bar progress={dailyInfo.percent} width={200} height={20} color={'white'}/>
        <Text style={styles.progressBartext}>Vitamin D Progress:</Text>
        <Text style={styles.UVIndex}>UV Index: {dailyInfo.uvIndex}</Text>
        <ClothingSelector style={styles.ClothingSpace}/>
        <StatusBar/>
      </View>
    );
  }
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
    top:'-16%'
    //position: "absolute",
  },

  progressBar: {
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
