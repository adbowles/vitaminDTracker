#include <Adafruit_GFX.h>    // Core graphics library
#include <Adafruit_ST7789.h> // Hardware-specific library for ST7789
#include <SPI.h>
#include <ArduinoBLE.h>

#define TFT_CS        10
#define TFT_RST       9 // Or set to -1 and connect to Arduino RESET pin
#define TFT_DC        8
#define uvPin         A7
#define lcdButton     6
#define lcdPower      A0
#define motor         16

Adafruit_ST7789 tft = Adafruit_ST7789(TFT_CS, TFT_DC, TFT_RST);
BLEService vitDService("180A"); // BLE Vitamin D Service
BLEStringCharacteristic greetingCharacteristic("2A56", BLERead, 13);
BLEFloatCharacteristic uvCharacteristic("2A57", BLEWrite);
BLEFloatCharacteristic vitDCharacteristic("2A58", BLEWrite);
BLEStringCharacteristic timeCharacteristic("2A59", BLEWrite, 13);
static const char* greeting = "Hello";

void setup(void) {
  pinMode(uvPin, INPUT);
  pinMode(lcdButton, INPUT);
  pinMode(lcdPower, OUTPUT);
  pinMode(motor, OUTPUT);
  analogWrite(lcdPower, 255);
  digitalWrite(motor, 0);
  Serial.begin(9600);
  //while (!Serial);
  Serial.print(F("Hello! ST77xx TFT Test"));

  BLE.setLocalName("Vitamin D Watch");  // Set name for connection
  BLE.setAdvertisedService(vitDService); // Advertise service
  vitDService.addCharacteristic(greetingCharacteristic); // Add characteristic to service
  BLE.addService(vitDService); // Add service
  greetingCharacteristic.setValue(greeting); // Set greeting string

  BLE.advertise();  // Start advertising
  Serial.print("Peripheral device MAC: ");
  Serial.println(BLE.address());
  Serial.println("Waiting for connections...");

  tft.init(135, 240);           // Init ST7789 240x135
  tft.setRotation(3);

  Serial.println(F("Initialized"));
  tft.fillScreen(ST77XX_BLACK);
  tft.setTextWrap(false);
  tft.drawRect(190, 5, 40, 17, ST77XX_WHITE);
  tft.fillRect(230, 10, 3, 6, ST77XX_WHITE);
  tft.fillRect(191, 6, 19, 15, ST77XX_GREEN); // 191 6 38 15
  tft.setCursor(2, 2);
  tft.setTextSize(2);
  tft.print("12:32");
  tft.setCursor(10, 32);
  tft.setTextSize(3);
  tft.print("UV Index: ");
  tft.setTextSize(3);
  tft.setCursor(0, 65);
  tft.println("  Vitamin D:");
  tft.fillRect(10, 95, 220, 30, ST77XX_WHITE);
  //tft.fillRect(11, 96, 110, 28, ST77XX_GREEN);  // 11, 96, 218, 28
  //tft.setCursor(90, 100);
  //tft.setTextColor(ST77XX_BLACK);
  //tft.println("100%");       // Testing for now
  delay(1000);
}


void loop(){
  //BLEDevice central = BLE.central();  // Wait for a BLE central to connect
  if (digitalRead(lcdButton)==HIGH) analogWrite(lcdPower,255);     // and turn on the LED
  else analogWrite(lcdPower,0);      // and turn off the LED
  digitalWrite(motor, 1);
  //delay(500);
  digitalWrite(motor, 0);
  
  int uvReading = 0;
  float avgReading = 0;
  for (int i = 0; i < 10; i++) {    // does 10 conversions
    uvReading = analogRead(uvPin);    // reads analog value
    avgReading += float(uvReading);   // adds all conversion times together
  }
  /*Normally here you would divide avgReading (which is a measure of output voltage) by 10 but 
  because you need to multiply the voltage by 10 to convert it to UV Index, it just makes more
  sense to skip that step and not divide by 10*/
  avgReading = ((avgReading)/1023)*3.3;  // gets Uv Index from UV sensor
  
  if (lcdPower) {
  //Update UV reading
  tft.fillRect(180, 28, 60, 30, ST77XX_BLACK);  // place black rectangle over old text to "delete" it
  tft.setTextSize(3);
  tft.setTextColor(ST77XX_WHITE);
  tft.setCursor(180, 28);
  //tft.println(String((int)avgReading));  // this will be used during normal use
  tft.println(String(avgReading, 1));  // this is just for testing

  // Vitamin D Percentage
  static float neededVitD = 17;
  static float currVitD = 0;
  if (currVitD >= neededVitD) currVitD = neededVitD;
  static float vitDPercentage = 0;
  vitDPercentage = (currVitD / neededVitD) * 100;
  int progressFill = (int)((vitDPercentage/100)*218);
  tft.fillRect(11, 96, progressFill, 28, ST77XX_GREEN);
  tft.fillRect(11+progressFill, 96, 218-progressFill, 28, ST77XX_WHITE);
  tft.setTextSize(3);
  tft.setTextColor(ST77XX_BLACK);
  tft.setCursor(90, 100);
  if (vitDPercentage == 100) tft.println(String((int)vitDPercentage) + "%");
  else tft.println(" " + String((int)vitDPercentage) + "%");
  currVitD = currVitD + 1.0;  // test
  if (currVitD == neededVitD + 1) currVitD = 0; // test
  }
  
  delay(1000);
}
