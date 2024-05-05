import network
import urequests
import utime
import ujson
from machine import Pin, PWM

wlan = network.WLAN(network.STA_IF) 
wlan.active(True) 

ssid = 'iPhone de Mila'
password = 'mila2809'
wlan.connect(ssid, password)
url = "http://192.168.1.45:3000"

leds = [PWM(Pin(18,mode=Pin.OUT)),PWM(Pin(17,mode=Pin.OUT)),PWM(Pin(16,mode=Pin.OUT))]

for i in leds:
    i.freq(1_000)
    i.duty_u16(0)
    
#dico maison rvb
house ={
     "Gryffindor": [250,0,0],
     "Slytherin": [0,250,0],
     "Ravenclaw": [0,0,250],
     "Hufflepuff": [250,250,0],
     "": [250,250,250],
}
  
# fct set color c = [250,0,0]
def setColor(c):
    for i in range(3): #0,1,2
        leds[i].duty_u16(c[i]*100)
        





while not wlan.isconnected():
    print("pas co")
    utime.sleep(1)
    pass

while(True):
    try:
        print("GET")
        r = urequests.get(url) # lance une requete sur l'url
        key = r.json()["message"]
        print(key)
        setColor(house[key])
        r.close() # ferme la demande
        utime.sleep(0.5)  
    except Exception as e:
        print(e)