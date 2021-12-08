import AsyncStorage from '@react-native-async-storage/async-storage';

export const dailyInfo = {
    exposedPercentage: null,
    settings: null,
    uvIndex:0,
    percent:0,
    timerStarted:false,
    currentRef:null,
}

export const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (e) {
        //saving error
    }
}

// store dummy data
storeData("12-2","95%")
storeData("12-3","105%")
storeData("12-4","75%")
storeData("12-5","85%")
storeData("12-6","10%")
storeData("12-7","34%")


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
        console.log("here");
    }
}

export const updateBodyCoverage = async (data) => {
    
    // calculate values
    let bodyCoverage = 0;
     if (data.Thead == 0) 
        bodyCoverage += 1//add modifier no hat
     else  
        bodyCoverage += 0//add modifier for hat

    if (data.Ttorso == 0) 
        bodyCoverage += 0//add modifier no shirt
    else if (data.Ttorso == 1)
        bodyCoverage += 5//add modifier for short sleeve
    else if (data.Ttorso == 2)
        bodyCoverage += 6//add modifier for long sleeve
    else if (data.Ttorso == 3)
        bodyCoverage += 2//add modifier for bra
    else    
        bodyCoverage += 4//add modifier for tank top
    
    if (data.Tleg == 0) 
        bodyCoverage += 0//add modifier no pants 
    else if (data.Tleg == 1)
        bodyCoverage += 2//add modifier for shorts
    else 
        bodyCoverage += 4//add modifier for pants

    if (data.Tfeet == 0) 
        bodyCoverage += 0//add modifier no shoes
     else  
        bodyCoverage += 0//add modifier for fresh shoes

    dailyInfo.exposedPercentage = .09 * bodyCoverage;
}

export const updateSettings = async (data) => {
    dailyInfo.settings = data;
}

export const getMinutesNeeded = (uvIndex) => {
    // if settings haven't been saved, make it impossible.
    if (!dailyInfo.settings) return Number.MAX_SAFE_INTEGER;

    let data = {...dailyInfo.settings};
    // user height is available in data.feet and data.inches
    // user weight is data.weight. Units are in pounds
    // user BMI is data.BMI
    data.BMI = (data.weight/data.inches/data.inches) * 703;
    let weightKg = data.weight / 2.205;
    let heightCm = (data.feet * 12 + data.inches) * 2.54;
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
    let vitDPerSED = 4900 * dailyInfo.exposedPercentage
    /* the first number here is the SED (standard erythemal dose) we want to hit.
        we go with 0.25 because for someone with type II skin, they will produce
        approximately 4900 IU of vitamin D per SED. This should produce roughly 1200 IU.
        Modifiers get added here to scale the number of SEDs needed*/
    let calculatedSED = 0.25 * skinToneMap[data.SkinTone] * (4900/vitDPerSED) * genderModifier * ageModifier
    let sEDPerMin = (0.0138 * uvIndex) + 0.0013
    // avoiding divide by 0 just in case. We shouldn't ever get negatives but we might get 0
    if (sEDPerMin <= 0) sEDPerMin = 0.00001
    let minutesNeeded = calculatedSED / sEDPerMin

    return minutesNeeded;
}

export function StartTimer(compRef) {
    if (dailyInfo.timerStarted == true) return;
    dailyInfo.timerStarted = true;
    dailyInfo.currentRef = compRef;

    Timer();
}

const time_delta = 8000; // in milliseconds
function Timer() {
    // console.log("here");
    getUVIndex();
    updatePercent();
    setTimeout(()=>Timer(dailyInfo.currentRef), time_delta);
    if ( dailyInfo.currentRef.mounted ) {
        dailyInfo.currentRef.update();
    }
}

// AsyncStorage.removeItem("12-8")

function updatePercent(/**/) {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var hour = new Date().getHours();
    var min = new Date().getMinutes();

    // send time to the bluetooth device
    var time = hour + ':' + min;

    var key =  month + '-' + date;

    getData(key).then((data) => {
        let percent = 0;
        if (data) percent = parseFloat(data)/100.0;

        // get min needed
        if (dailyInfo.uvIndex > 0)
            percent += (time_delta/60000)/getMinutesNeeded(dailyInfo.uvIndex/*get UV index*/);
            // percent += 1/getMinutesNeeded(dailyInfo.uvIndex/*get UV index*/);

        storeData(key,percent*100+"%");

        dailyInfo.percent = percent;
    });
}

const lat = 33.214747;
const lon = -87.542876;
const API_key = "de1a886f9752d0e95d168fbc710aba93";
const part = "minutely,hourly,daily,alerts";

const openweather_api_url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${API_key}`;

function getUVIndex() {
    fetch(openweather_api_url).then(res => res.json())
        .then((data) => {
            dailyInfo.uvIndex = data.current.uvi;
            console.log("UVIndex", data.current.uvi);
      });
}