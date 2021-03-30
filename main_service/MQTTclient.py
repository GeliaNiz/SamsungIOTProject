from random import randint
#from .models import State
from paho.mqtt import client as mqtt



broker = 'localhost'
port = 1883
client_id = f'python-mqtt-{randint(0, 1000)}'
main_topic = 'global/#'
topics = {
    'global/humidity' : 1
}


def on_connect(client, userdata, flags, rc):
    client.subscribe(main_topic)
    print(f"Subscribed to {broker}/{main_topic}")

def on_message(client, userdata, msg):
    topic = msg.topic
    value = str(msg.payload).replace('b',"").replace("'","")
    # if not State.objects.get(id=1):
    #     State().save()
    print(topic, value)


def send(topic, message, retain, qos):
    client.publish(topic=topic, payload=message, retain=retain, qos=qos)


client = mqtt.Client(client_id)
client.on_connect = on_connect
client.on_message = on_message
client.connect(broker, port)

client.loop_forever()