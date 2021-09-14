#include <Adafruit_GFX.h>    // Core graphics library
#include <Adafruit_ST7789.h> // Hardware-specific library for ST7789
#include <SPI.h>

#define TFT_CS        10
#define TFT_RST       9 // Or set to -1 and connect to Arduino RESET pin
#define TFT_DC        8

Adafruit_ST7789 tft = Adafruit_ST7789(TFT_CS, TFT_DC, TFT_RST);
void setup(void) {
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
  tft.setCursor(90, 100);
  tft.setTextColor(ST77XX_BLACK);
  tft.println("100%");       // Testing for now
  delay(1000);
}

void loop(){
  int uvReading = XX;
  tft.setTextSize(4);
  tft.setCursor(180, 28);
  tft.println(String(uvReading));
  delay(1000);
}
