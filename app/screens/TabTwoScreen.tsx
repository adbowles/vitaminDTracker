import * as React from 'react';
import { StyleSheet, TouchableWithoutFeedback, Keyboard, TextInput } from 'react-native';
import {Pressable} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';


export default function TabTwoScreen() {
  const [inches, setInches] = React.useState(null);
  const [feet, setFeet] = React.useState(null);
  const [weight, setWeight] = React.useState(null);
  const [BMI, setBMI] = React.useState(null);
  const [Gender, setGender] = React.useState(null);

 
  const inchChanger = (inches) => {
    if (inches > 11) inches = '11';
    setInches(inches);
  }
  const feetChanger = (feet) => {
    if (feet > 7) feet = '7';
    setFeet(feet);
  }
  const weightChanger = (weight) => {
    setWeight(weight);
  }
  const calcBMI = () => {
    // kg / m^2
    // ( lbs / in^2 )* 703
    if (inches > 0 || feet > 0) {
      let totalInches = parseInt(feet)*12 + parseInt(inches);
      let thisBMI = (parseInt(weight) * 703) / (totalInches*totalInches);
      setBMI(thisBMI);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();calcBMI();}} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Height:</Text>
          <TextInput
            onChangeText={feetChanger}
            value={feet}
            keyboardType="numeric"
            style={styles.inputSmall}
            maxLength={1}
          />
          <Text style={styles.inputLabel}>ft</Text>
          <TextInput
            onChangeText={inchChanger}
            value={inches}
            keyboardType="numeric"
            style={styles.inputSmall}
            maxLength={2}
          />
          <Text style={styles.inputLabel}>in</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Weight:</Text>
          <TextInput
            onChangeText={weightChanger}
            value={weight}
            keyboardType="numeric"
            style={styles.input}
            maxLength={3}
          />
          <Text style={styles.inputLabel}>lbs</Text>
        </View>
      
        <Text style={styles.BMILabel}>BMI: {BMI ? BMI.toFixed(2) : 0}</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Gender:</Text>
          <Pressable style = {Gender == 'Male' ? styles.GenderIconactive: styles.GenderIcon} onPress={() => {setGender('Male');}}>
            <Text style = {styles.GenderText}>M</Text>
            </Pressable >
            <Pressable style = {Gender == 'Female' ? styles.GenderIconactive: styles.GenderIcon} onPress = {() => {setGender('Female')}}>
            <Text style = {styles.GenderText}>F</Text>
            </Pressable >
        </View>
      </View>
    </TouchableWithoutFeedback>
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
  inputContainer: {
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    alignSelf:"flex-start",
    marginLeft:'10%',
  },
  inputLabel: {
    fontSize:30,
    // fontWeight:'bold'
  },
  input: {
    fontSize: 30,
    backgroundColor:'white',
    margin:10,
    width:'30%',
    textAlign:'center',
    padding:5,
  },
  inputSmall: {
    fontSize: 30,
    backgroundColor:'white',
    margin:10,
    width:60,
    textAlign:'center',
    padding:5,
  },
  BMILabel: {
    marginTop:5,
    fontSize:20,
  },
  GenderIcon: {
    backgroundColor: '#BBBBBB',
    display: 'flex',
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    fontSize:20,
    height: 50,
    width: 50,
    borderRadius: 30,
  },
  GenderText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  GenderIconactive: {
    backgroundColor: '#68FF00',
    display: 'flex',
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    fontSize:20,
    height: 50,
    width: 50,
    borderRadius: 30,
  }
});
