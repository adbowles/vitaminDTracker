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
    let weightKg = data.weight / 2.205
    let heightCm = data.inches * 2.54
    // Du Bois surface area formula
    let bodySurfaceArea = 0.007184 * Math.pow(weightKg, 0.425) * Math.pow(heightCm, 0.725)
    // the constants here are just from taking the average person (5'9 191 lbs) 2.03 m2, setting that to 1,
    // and scaling from there so 2.43 m2 / 2.03 m2 is 0.835391
    let surfaceAreaModifier = (-0.4115 * bodySurfaceArea) + 1.8354
    // options for data.Gender are 'Male' or 'Female'
    let genderModifier = 1
    if (data.Gender == 'Female')
        genderModifier = 1.1
    else genderModifier = 1
    // user age modifier code
    let ageModifier = 1
    ageModifier = (0.025 * data.age) + 0.5
    if (data.age < 20)
        ageModifier = 1
    /* user skintone is a value in the following array, assessible via data.SkinTone
    [ '#ffdbac','#ffcba3','#c28155','#8d5524','#7B4B2A','#361e02'];*/

    /* This was only if we were depending on location and seasons
    let actionSpectrumConversionFactor = 0;
    const date = new Date();
    if (date.getMonth() >= 2 && date.getMonth() < 5)
        actionSpectrumConversionFactor = 0.9745
    else if (date.getMonth() >= 5 && date.getMonth() < 8)
        actionSpectrumConversionFactor = 1.069
    else if (date.getMonth() >= 8 && date.getMonth() < 11)
        actionSpectrumConversionFactor = 0.954
    else
        actionSpectrumConversionFactor = 0.7035*/



    //One approach could be to create a map, such as:
    const skinToneMap = {
        '#ffdbac':2.5/3, // most fair
        '#ffcba3':3/3, // fair
        '#c28155':4/3, // middle fair
        '#8d5524':5.25/3, // middle dark
        '#7B4B2A':7.5/3, // dark
        '#361e02':15/3, // most dark
    };

    // changes vit D based on how much skin exposed. Naked person produces 4900 IU/SED
    let vitDPerSED = 4900 * exposedPercentage
    /* the first number here is the SED (standard erythemal dose) we want to hit.
        we go with 0.25 because for someone with type II skin, they will produce
        approximately 4900 IU of vitamin D per SED. This should produce roughly 1200 IU.
        Modifiers get added here to scale the number of SEDs needed*/
    let calculatedSED = 0.25 * skinToneMap[data.SkinTone] * (4900/vitDPerSED) * genderModifier * ageModifier
    let sEDPerMin = (0.0138 * uvIndex) + 0.0013
    // avoiding divide by 0 just in case. We shouldn't ever get negatives but we might get 0
    if (sEDPerMin <= 0) sEDPerMin = 0.00001
    let minutesNeeded = calculatedSED / sEDPerMin

}