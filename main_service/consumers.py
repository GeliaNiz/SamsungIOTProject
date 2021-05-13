from channels.generic.websocket import WebsocketConsumer
import json
import time


class WSConsumer(WebsocketConsumer):
    def connect(self):
        # self.accept()
        #
        # for i in range(100):
        #     self.send(json.dumps({'message':'Pump on'}))
        #     time.sleep(10)
        pass