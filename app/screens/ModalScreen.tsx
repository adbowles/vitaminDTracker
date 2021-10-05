import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, ScrollView, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title} lightColor="white" darkColor="rgba(255,255,255,0.1)">Information</Text>
      <View style={styles.separator} lightColor="black" darkColor="rgba(255,255,255,0.1)" />
      <ScrollView style = {{marginTop:20, marginBottom: 20}}>
        <Text style={{marginLeft:'10%', marginRight:'10%', fontSize: 20}}lightColor="white" darkColor="rgba(255,255,255,0.1)">
          The human body can get vitamin D in two ways: diet or sun exposure. In fact, vitamin D is the only vitamin the body can actually synthesize in response to sun exposure, and therefore does not necessarily need to be provided from the diet or supplements. If you cannot get sufficient vitamin D from your diet, you can follow recommendations for adequate sunlight exposure. How much sun exposure you need is determined by your skin type and the UV index, which depends on your location, time of day, and season of the year.{"\n"}{"\n"}
          If you wear sunscreen, your whole body is covered with clothing, or the UV index is 2 or lower, you will not get enough vitamin D. In general, the UV index is higher between 10:00 am and 4:00 pm, and during summer months.{"\n"}{"\n"} 
          It is important to remember that too much sun exposure can cause premature aging of the skin and other skin problems, cataracts and other eye damage, suppression of the immune system, and even skin cancer. Recommended sun exposure times are based on the amount you need to get sufficient vitamin D while minimizing risk of overexposure to sunlight. If you think your skin type is sensitive to sun exposure or you live in a place with a typically lower UV index, you can get vitamin D by choosing vitamin D rich foods or supplements.{"\n"}{"\n"}
        </Text>
      </ScrollView>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
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
    fontSize: 50,
    textAlign: "center",
    fontWeight: 'bold',
    //position: "absolute",
    marginTop: 10,
    flexGrow: 1,
  },
  separator: {
    marginTop: 20,
    height: 1,
    width: '80%',
  },
});