from random import randint
from .models import State
from paho.mqtt import client as mqtt

broker = 'localhost'
port = 1883
client_id = f'python-mqtt-{randint(0, 1000)}'
main_topic = 'global/#'
topics = {

}


def on_connect(client, userdata, flags, rc):
    client.subscribe(main_topic)
    print(f"Subscribed to {broker}/{main_topic}")


def on_message(client, userdata, msg):
    topic = str(msg.topic).replace('global/', '')
    value = str(msg.payload).replace('b', "").replace("'", "")
    state = State()
    setattr(state, topic, float(value))
    state.save()


def send(client, topic, message, retain, qos):
    client.publish(topic=topic, payload=message, retain=retain, qos=qos)


def start():
    m_client = mqtt.Client(client_id)
    m_client.on_connect = on_connect
    m_client.on_message = on_message
    m_client.connect(broker, port)

    m_client.loop_start()
