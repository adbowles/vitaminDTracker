import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (e) {
        //saving error
    }
}

export const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key)
        if(value !== null) {
            // value previously stores
        }
        return value 
    }
        catch(e) {
            // error reading value
        }
    }

export const updateCoverageBluTooth = async (data) => {
    // calculate values
    let bodyCoverage = 0;
     if (data.Thead == 0) 
        bodyCoverage += 0//add modifier no hat
     else  
        bodyCoverage += 0//add modifier for hat

    if (data.Ttorso == 0) 
        bodyCoverage += 0//add modifier no shirt
    else if (data.Ttorso == 1)
        bodyCoverage += 0//add modifier for short sleeve
    else 
        bodyCoverage += 0//add modifier for long sleeve
    
    if (data.Tleg == 0) 
        bodyCoverage += 0//add modifier no pants 
    else if (data.Tleg == 1)
        bodyCoverage += 0//add modifier for shorts
    else 
        bodyCoverage += 0//add modifier for pants

    if (data.Tfeet == 0) 
        bodyCoverage += 0//add modifier no shoes
     else  
        bodyCoverage += 0//add modifier for fresh shoes
}

export const updateSettingsBluTooth = async (data) => {

    // user height is available in data.feet and data.inches 

    // user weight is data.weight. Units are in pounds
    
    // user BMI is data.BMI
    data.BMI = (data.weight/data.inches/data.inches) * 703
    // options for data.Gender are 'Male' or 'Female'

    /* user skintone is a value in the following array, assessible via data.SkinTone
    [ '#ffdbac','#ffcba3','#c28155','#8d5524','#7B4B2A','#361e02'];*/

    //One approach could be to create a map, such as:
    const skinToneMap = {
        '#ffdbac':3.2/2.4575, // most fair
        '#ffcba3':3.2/3, // fair
        '#c28155':3.2/4, // middle fair
        '#8d5524':3.2/5.25, // middle dark
        '#7B4B2A':3.2/7.5, // dark
        '#361e02':3.2/42, // most dark
    };

    /*where the appropriate modifier is accessed
    skinToneMap[data.SkinTone]

    */

}