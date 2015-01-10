import urllib2
import time
import json
import base64
import RPi.GPIO as io
io.setmode(io.BCM)

door_sensor = 18
sensorTrigger = True

# Server data
url = 'http://localhost:80'
key = 'xxxxxxxxxxxxxxCHANGEME_EVERYWHERExxxxxxxxxxxxxxxxxxxxx'
data = {'key': key}

io.setup(door_sensor, io.IN, pull_up_down=io.PUD_UP)

# Change me (username and password) - oh and don't forget to also change me in /data/users.htpasswd
base64string = base64.encodestring('%s:%s' % ('username', 'password123')).replace('\n', '')

# function for the door opening
def door_open():
    print("Door Opened")
    req = urllib2.Request(url + '/opened')
    req.add_header('Content-Type', 'application/json')
    req.add_header("Authorization", "Basic %s" % base64string)

    try:
      response = urllib2.urlopen(req, json.dumps(data)).close
    except Exception as e:
      print 'Door opened but failed to notify server :('


# function for the door closing
def door_close():
    print("Door Closed")
    req = urllib2.Request(url + '/closed')
    req.add_header('Content-Type', 'application/json')
    req.add_header("Authorization", "Basic %s" % base64string)

    try:
      response = urllib2.urlopen(req, json.dumps(data)).close
    except Exception as e:
      print 'Door closed but failed to notify server :('

while True:
    if io.input(door_sensor): # if door is closed
        if (sensorTrigger):
            door_close() # fire GA code
            sensorTrigger = False # make sure it doesn't fire again
    if not io.input(door_sensor): # if door is opened
        if not (sensorTrigger):
            door_open() # fire GA code
            sensorTrigger = True # make sure it doesn't fire again
