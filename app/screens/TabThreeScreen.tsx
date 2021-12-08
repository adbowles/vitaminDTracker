//import * as React from 'react';
//import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import React, {Component, useState} from 'react';
import {Alert, StyleSheet, TouchableOpacity, Pressable, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingModal from '../src/LoadingModal';

// @ts-expect-error

const columns = [
  {
      name: 'Date',
      selector: (row: { date: any; }) => row.date,
  },
  {
      name: 'Percentage',
      selector: (row: { percentage: any; }) => row.percentage,
  },
];

// export default class AgendaScreen extends Component {
export default function TabThreeScreen () {
  const [calendarData, setCalendarData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState([]);

  // render() {
    return (<ScrollView contentContainerStyle={{flex:1, alignItems:'center',justifyContent:'center'}}>
      <Text style={{fontSize:45, marginBottom:30, fontWeight:'bold'}}>Daily Logs</Text>
      {
        calendarData.map((val, index) => {
          return <View key={val.id} style={{flexDirection:'row', justifyContent:'space-around', width:'100%', paddingBottom:10, paddingTop:20, borderBottomWidth:1, borderBottomColor:'white'}}>
              <Text style={{fontSize:30}}>{val.date}</Text>
              <Text style={{fontSize:30}}>{Number((parseFloat(val.percentage)).toFixed(2))}%</Text>
            </View>
        })
      }
      <Pressable
        onPress = { () => {
          setIsModalVisible(true);
          AsyncStorage.getAllKeys().then((Keys) => {
            Keys.sort();
            AsyncStorage.multiGet(Keys).then((value) => {
              var result = [];
              Keys.forEach((key, i) => {
                if (key === 'settings' || key === 'clothing_items') return;
                result.push({
                  id: i,
                  date:key,
                  percentage: value[i][1],
                });
              });
              setCalendarData(result);
              setIsModalVisible(false);
            });
          });
        }}
      ><Text style={{fontSize:30, marginVertical:30, fontWeight:'bold', backgroundColor:'grey', padding:20, borderRadius:15, overflow:'hidden'}}>Refresh Log</Text></Pressable>
      <LoadingModal isVisible={isModalVisible} />
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
});
/*export default function TabThreeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calendar</Text>
      <EditScreenInfo path="/screens/TabThreeScreen.tsx" />
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
});*/
