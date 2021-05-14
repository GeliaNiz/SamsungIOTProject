from channels.generic.websocket import WebsocketConsumer
import json
from asgiref.sync import async_to_sync
import time


class WSConsumer(WebsocketConsumer):
    groups = ['pump_update_group']
    def connect(self):
        self.accept()

    def render(self,message,type='render' ):
        print(message)
        self.send(json.dumps(message))
