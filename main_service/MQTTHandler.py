
from threading import Thread

def mqtt_communication(client):
    pass


client = MQTTclient()
thread = Thread(target = mqtt_communication, args=(client,))
thread.start()
thread.join()