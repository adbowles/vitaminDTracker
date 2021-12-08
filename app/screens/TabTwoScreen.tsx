import * as React from 'react';
import { StyleSheet, TouchableWithoutFeedback, Keyboard, TextInput } from 'react-native';
import {Pressable} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { backgroundColor } from '../src/style';
import { getData, storeData, updateSettings } from '../src/Database';
import LoadingModal from '../src/LoadingModal';

export default class TabTwoScreen extends React.Component { 
state = {inches:null, feet:null, weight:null, BMI:null, Gender:null, SkinTone:null, loaded:false, age:null, isModalVisible:false}

componentDidMount() {
  if (this.state.loaded) return;

  getData("settings").then((data) => {
      this.setState({loaded:true});
      if (!data) return;

      data = JSON.parse(data);
      data.isModalVisible = false;
      this.setState(data);
      updateSettings(data);
  })
}

   ageChanger(age){
      this.setState({age:age});
    }
   inchChanger(inches){
    if (inches > 11) inches = '11';
    this.setState({inches:inches});
  }
  feetChanger(feet){
    if (feet > 7) feet = '7';
    this.setState({feet:feet});
  }
  weightChanger (weight){
    this.setState({weight:weight});
  }
  calcBMI(){
    // kg / m^2
    // ( lbs / in^2 )* 703
    if (this.state.inches > 0 || this.state.feet > 0) {
      let totalInches = parseInt(this.state.feet)*12 + parseInt(this.state.inches);
      let thisBMI = (parseInt(this.state.weight) * 703) / (totalInches*totalInches);
      this.setState({BMI:thisBMI});
    }
  }
  renderSkinTones(){
    const skinTones = [ '#ffdbac','#ffcba3','#c28155','#8d5524','#7B4B2A','#361e02'];
    return (
      <View style={styles.inputContainer}>
        {
        skinTones.map( (value, index) => {
          return (
            <Pressable 
              key={index}
              style={this.state.SkinTone == value ? [styles.skinToneActive,{backgroundColor:value}] : [styles.skinTone,{backgroundColor:value}] }
              onPress={() => {this.setState({SkinTone:value});}}>
            </Pressable>
            );
          })
        }
      </View>
      );
  }
  render () {
  return (
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();this.calcBMI();}} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Settings</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Age:</Text>
          <TextInput
            onChangeText={this.ageChanger.bind(this)}
            value={this.state.age}
            keyboardType="numeric"
            style={styles.input}
            maxLength={2}
          />
        </View>
      
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Height:</Text>
          <TextInput
            onChangeText={this.feetChanger.bind(this)}
            value={this.state.feet}
            keyboardType="numeric"
            style={styles.inputSmall}
            maxLength={1}
          />
          <Text style={styles.inputLabel}>ft</Text>
          <TextInput
            onChangeText={this.inchChanger.bind(this)}
            value={this.state.inches}
            keyboardType="numeric"
            style={styles.inputSmall}
            maxLength={2}
          />
          <Text style={styles.inputLabel}>in</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Weight:</Text>
          <TextInput
            onChangeText={this.weightChanger.bind(this)}
            value={this.state.weight}
            keyboardType="numeric"
            style={styles.input}
            maxLength={3}
          />
          <Text style={styles.inputLabel}>lbs</Text>
        </View>
      
        <Text style={styles.BMILabel}>BMI: {this.state.BMI ? this.state.BMI.toFixed(2) : 0}</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Gender:</Text>
          <Pressable style = {this.state.Gender == 'Male' ? styles.GenderIconactive: styles.GenderIcon} onPress={() => {this.setState({Gender:'Male'})}}>
            <Text style = {styles.GenderText}>M</Text>
            </Pressable >
            <Pressable style = {this.state.Gender == 'Female' ? styles.GenderIconactive: styles.GenderIcon} onPress = {() => {this.setState({Gender:'Female'})}}>
            <Text style = {styles.GenderText}>F</Text>
            </Pressable >
            </View>
        <View style={styles.skinToneContainer}>
          <Text style={styles.inputLabel}>Skin Tone:</Text>
          {this.renderSkinTones()}  
        </View>
        <Pressable onPress={() => {
          this.setState({isModalVisible:true});

          // send to blutooth
          updateSettings(this.state);

          // save to local storage
          // setTimeout( () =>
          let tempState = { ...this.state };
          tempState.isModalVisible = false;
          storeData("settings", JSON.stringify(tempState))
            .then(() => this.setState({isModalVisible:false}));
          // , 100);
        }} style={{alignSelf:'center', backgroundColor:'grey', paddingHorizontal:10, paddingVertical:5, borderRadius:2,}}>
          <Text style={{fontSize:32, fontWeight:'bold'}}>Save</Text>
        </Pressable>
        <LoadingModal isVisible={this.state.isModalVisible}/>

      </View>
    </TouchableWithoutFeedback>
  );
  }
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
    marginTop: '8%',
    marginBottom: '8%',
  // position: "absolute",
  //  top: '5%',
  },
  inputContainer: {
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    alignSelf:"flex-start",
    marginLeft:'10%',
  },
  skinToneContainer: {
    marginBottom:15,
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
  },
  skinTone: {
    left : '-90%',
    width:45,
    height:45,
    margin:0,
  },
  skinToneActive: {
    left : '-90%',
    width:45,
    height:45,
    margin:0,
    borderRadius:0,
    borderWidth:3,
    borderColor:"white",
  }
});