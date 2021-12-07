import * as React from 'react';
import { Text, View } from './Themed';
import { Image, Dimensions, ScrollView } from 'react-native';
 
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

const screenWidth = Dimensions.get('window').width;
 
export default function ClothingSelector (props) {
    return (
        <View style={[{width:screenWidth, position:'relative', alignItems:'center'},props.style]}>
            <Image source={require('../assets/images/person.png')} />

            <View style={{ position:'absolute', width:screenWidth, backgroundColor:'transparent', top:-10}}>
                <ScrollView 
                    style={{ width:screenWidth }}
                    scrollEventThrottle={16}
                    horizontal pagingEnabled
                    showsHorizontalScrollIndicator={false} >

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
                    showsHorizontalScrollIndicator={false} >

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
                    showsHorizontalScrollIndicator={false} >

                    <View style={{alignItems:'center', width:screenWidth, backgroundColor:'transparent'}}>
                        
                    </View>
                    <View style={{alignItems:'center', width:screenWidth, backgroundColor:'transparent'}}>
                        <Image source={require('../assets/images/tshirt.png')} />
                    </View>
                    <View style={{alignItems:'center', width:screenWidth, backgroundColor:'transparent'}}>
                        <Image source={require('../assets/images/longSleeveShirt.png')} />
                    </View>
                </ScrollView>
            </View>
            <View style={{ position:'absolute', width:screenWidth, backgroundColor:'transparent', top:180}}>
                <ScrollView 
                    style={{ width:screenWidth }}
                    scrollEventThrottle={16}
                    horizontal pagingEnabled
                    showsHorizontalScrollIndicator={false} >

                    <View style={{alignItems:'center', width:screenWidth, backgroundColor:'transparent'}}>
                        
                    </View>
                    <View style={{alignItems:'center', width:screenWidth, backgroundColor:'transparent'}}>
                        <Image source={require('../assets/images/shoes.png')} />
                    </View>
                </ScrollView>
            </View>
            
        </View>
        );
}