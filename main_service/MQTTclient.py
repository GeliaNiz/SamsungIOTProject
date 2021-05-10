from random import randint
from .models import State
from paho.mqtt import client as mqtt

broker = 'localhost'
port = 1883
client_id = f'python-mqtt-{randint(0, 1000)}'
main_topic = 'global/#'
m_client = mqtt.Client(client_id)

def on_connect(client, userdata, flags, rc):
    client.subscribe(main_topic)
    print(f"Subscribed to {broker}/{main_topic}")


def on_message(client, userdata, msg):
    main_thread, pot_id, attribute = str(msg.topic).split('/')
    value = float(msg.payload)
    if not State.objects.filter(pot_id=int(pot_id)).exists():
        state = State()
    else:
        state = State.objects.get(pot_id=int(pot_id))
    setattr(state, attribute, value)
    state.pot_id = int(pot_id)
    state.save()


def send(client, topic, message, retain=False, qos=0):
    client.publish(topic=topic, payload=message, retain=retain, qos=qos)


def start():

    m_client.on_connect = on_connect
    m_client.on_message = on_message
    m_client.connect(broker, port)

    m_client.loop_start()
