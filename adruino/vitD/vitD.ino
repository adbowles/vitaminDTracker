#include <Adafruit_GFX.h>    // Core graphics library
#include <Adafruit_ST7789.h> // Hardware-specific library for ST7789
#include <SPI.h>

#define TFT_CS        10
#define TFT_RST       9 // Or set to -1 and connect to Arduino RESET pin
#define TFT_DC        8
#define uvPin A7

Adafruit_ST7789 tft = Adafruit_ST7789(TFT_CS, TFT_DC, TFT_RST);

void setup(void) {
  pinMode(uvPin, INPUT);
  Serial.begin(9600);
  Serial.print(F("Hello! ST77xx TFT Test"));

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
  tft.fillRect(11, 96, 110, 28, ST77XX_GREEN);  // 11, 96, 218, 28
  //tft.setCursor(90, 100);
  //tft.setTextColor(ST77XX_BLACK);
  //tft.println("100%");       // Testing for now
  delay(1000);
}

void loop(){
  int uvReading = 0;
  float avgReading = 0;
  for (int i = 0; i < 10; i++) {    // does 10 conversions
    uvReading = analogRead(uvPin);    // reads analog value
    avgReading += float(uvReading);   // adds all conversion times together to solve for average later
  }
  /*Normally here you would divide avgReading (which is a measure of output voltage) by 10 but 
  because you need to multiply the voltage by 10 to convert it to UV Index, it just makes more sense to skip that step and not divide by 10*/
  avgReading = ((avgReading)/1023)*5;  // gets Uv Index from UV sensor
  
  
  //Update UV reading
  tft.fillRect(180, 28, 60, 30, ST77XX_BLACK);  // place black rectangle over old text to "delete" it
  tft.setTextSize(3);
  tft.setTextColor(ST77XX_WHITE);
  tft.setCursor(180, 28);
  //tft.println(String((int)avgReading));  // this will be used during normal use
  tft.println(String(avgReading));  // this is just for testing

  // Vitamin D Percentage
  static int neededVitD = 20;
  static float currVitD = 19;
  if (currVitD >= neededVitD) currVitD = neededVitD;
  static float vitDPercentage = (currVitD / neededVitD) * 100;
  tft.setTextSize(3);
  tft.setTextColor(ST77XX_BLACK);
  tft.setCursor(90, 100);
  if (vitDPercentage == 100) tft.println(String((int)vitDPercentage) + "%");
  else tft.println(" " + String((int)vitDPercentage) + "%");
  
  delay(1000);
}
