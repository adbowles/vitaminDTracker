import * as React from 'react';
import { Text, View } from './Themed';
import { Image, Dimensions, ScrollView, Pressable } from 'react-native';
import { getData, storeData, updateBodyCoverage } from '../src/Database';
 
const screenWidth = Dimensions.get('window').width;
 
export default class ClothingSelector extends React.Component {

    constructor (props) {
        super (props);

        this.Thead = React.createRef();
        this.Ttorso = React.createRef();
        this.Tleg = React.createRef();
        this.Tfeet = React.createRef();
    }

    //T=temp
    state = {
        Thead:0,
        Ttorso:0,
        Tleg:0,
        Tfeet:0,

        loaded:false
    }

    componentDidMount() {
        // return;
        if (this.state.loaded) return;

        getData("clothing_items").then((data) => {
            this.setState({loaded:true});
            if (!data) return;

            data = JSON.parse(data);
            this.setState(data);

            for (const [key, index] of Object.entries(data)) {
                // console.log(key, index, {x:index*screenWidth, y:0, animated:true});
                const scrollObj = {x: index*screenWidth, y:0, animated:true};

                switch (key) {
                    case 'Thead':
                        this.Thead.current.scrollTo(scrollObj);
                        break;
                    case 'Ttorso':
                        this.Ttorso.current.scrollTo(scrollObj);
                        break;
                    case 'Tleg':
                        this.Tleg.current.scrollTo(scrollObj);
                        break;
                    case 'Tfeet':
                        this.Tfeet.current.scrollTo(scrollObj);
                        break;   
                }
            }
        })
    }

    change = (thing, bodyPart) => {
        const slide = Math.ceil((thing.nativeEvent.contentOffset.x / thing.nativeEvent.layoutMeasurement.width)-.5);
        if (slide != this.state[bodyPart]) {
            let tempState = { ...this.state };
            tempState[bodyPart] = slide;
            this.setState(tempState);
        }
    }

    render() {
        return (
            <View style={[{width:screenWidth, position:'relative', alignItems:'center'},this.props.style]}>
                <Image source={require('../assets/images/person.png')} />

                <View style={{ position:'absolute', width:screenWidth, backgroundColor:'transparent', top:-10}}>
                    <ScrollView 
                        style={{ width:screenWidth }}
                        scrollEventThrottle={16}
                        horizontal pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onScroll={(thing) => {this.change(thing, 'Thead')}}
                        ref={this.Thead} >

                        <View style={{alignItems:'center', width:screenWidth, backgroundColor:'transparent'}}>
                            
                        </View>
                        <View style={{alignItems:'center', width:screenWidth, backgroundColor:'transparent'}}>
                            <Image source={require('../assets/images/hat.png')} />
                        </View>
                    </ScrollView>
                </View>
                <View style={{ position:'absolute', width:screenWidth, backgroundColor:'transparent', top:100}}>
                    <ScrollView 
                        style={{ width:screenWidth }}
                        scrollEventThrottle={16}
                        horizontal pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onScroll={(thing) => {this.change(thing, 'Tleg')}}
                        ref={this.Tleg} >

                        <View style={{alignItems:'center', width:screenWidth, backgroundColor:'transparent'}}>
                            
                        </View>
                        <View style={{alignItems:'center', width:screenWidth, backgroundColor:'transparent'}}>
                            <Image source={require('../assets/images/shorts.png')} />
                        </View>
                        <View style={{alignItems:'center', width:screenWidth, backgroundColor:'transparent'}}>
                            <Image source={require('../assets/images/jeans.png')} />
                        </View>
                    </ScrollView>
                </View>
                <View style={{ position:'absolute', width:screenWidth, backgroundColor:'transparent', top:41}}>
                    <ScrollView 
                        style={{ width:screenWidth }}
                        scrollEventThrottle={16}
                        horizontal pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onScroll={(thing) => {this.change(thing, 'Ttorso')}}
                        ref={this.Ttorso} >

                        <View style={{alignItems:'center', width:screenWidth, backgroundColor:'transparent'}}>
                            
                        </View>
                        <View style={{alignItems:'center', width:screenWidth, backgroundColor:'transparent'}}>
                            <Image source={require('../assets/images/tshirt.png')} />
                        </View>
                        <View style={{alignItems:'center', width:screenWidth, backgroundColor:'transparent'}}>
                            <Image source={require('../assets/images/longSleeveShirt.png')} />
                        </View>
                        <View style={{alignItems:'center', width:screenWidth, backgroundColor:'transparent'}}>
                            <Image source={require('../assets/images/bra.png')} />
                        </View>
                        <View style={{alignItems:'center', width:screenWidth, backgroundColor:'transparent'}}>
                            <Image source={require('../assets/images/top.png')} />
                        </View>
                    </ScrollView>
                </View>
                <View style={{ position:'absolute', width:screenWidth, backgroundColor:'transparent', top:180}}>
                    <ScrollView 
                        style={{ width:screenWidth }}
                        scrollEventThrottle={16}
                        horizontal pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onScroll={(thing) => {this.change(thing, 'Tfeet')}}
                        ref={this.Tfeet} >

                        <View style={{alignItems:'center', width:screenWidth, backgroundColor:'transparent'}}>
                            
                        </View>
                        <View style={{alignItems:'center', width:screenWidth, backgroundColor:'transparent'}}>
                            <Image source={require('../assets/images/shoes.png')} />
                        </View>
                    </ScrollView>

                    <Pressable onPress={() => {
                        // send to blutooth


                        // save to local storage
                        storeData("clothing_items", JSON.stringify(this.state));
                        updateBodyCoverage(this.state);
                    }} 
                    style={{alignSelf:'center', backgroundColor:'grey', paddingHorizontal:10, paddingVertical:2, borderRadius:2,marginTop:0}}><Text style={{fontSize:32, fontWeight:'bold'}}>Save</Text></Pressable>
                </View>
                
            </View>
            );
        }
}