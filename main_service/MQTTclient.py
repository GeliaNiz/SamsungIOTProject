import datetime
import json
from random import randint
from .models import State
from paho.mqtt import client as mqtt
from .consumers import WSConsumer
from channels.generic.websocket import WebsocketConsumer
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

broker = '192.168.43.120'
port = 1883
client_id = f'python-mqtt-{randint(0, 1000)}'
main_topic = '%/#'
m_client = mqtt.Client(client_id)


def on_connect(client, userdata, flags, rc):
    client.subscribe(main_topic)
    print(f"Subscribed to {broker}/{main_topic}")


def on_message(client, userdata, msg):

    main_thread, pot_id, attribute = str(msg.topic).split('/')
    value = float(msg.payload.decode("UTF-8")[0:3])
    if attribute in 'temperature, humidity, light':
        if not State.objects.filter(pot_id=int(pot_id)).exists():
            state = State()
        else:
            state = State.objects.get(pot_id=int(pot_id))
        setattr(state, attribute, value)
        state.date = datetime.datetime.now().time()
        state.pot_id = int(pot_id)
        state.save()
        return 'attribute_update'
    if attribute == 'pump':
        print(msg.topic)
        msg = "Pump off"
        if value == 1:
            msg = "Pump on"
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            'pump_update_group',
            {'type': 'render', 'message': msg}
        )


def send(client, topic, message, retain=False, qos=0):
    client.publish(topic=topic, payload=message, retain=retain, qos=qos)


def start():
    m_client.on_connect = on_connect
    m_client.on_message = on_message
    m_client.connect(broker, port)

    m_client.loop_start()
