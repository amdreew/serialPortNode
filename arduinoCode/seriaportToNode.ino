int c = 0;
void setup() {
  Serial.begin(9600);

}

void loop() {  
  Serial.print(++c, DEC);
  delay(2000);
}
