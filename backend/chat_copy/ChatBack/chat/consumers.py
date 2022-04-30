from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json


class ChatConsumer(WebsocketConsumer):

    def connect(self):
        
        # print('\n\t\t',(self.scope),'\n')
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name
        # print('connect',self.room_name, self.room_group_name, self.channel_name, self.channel_layer)
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        print('disconnect',self.room_name, self.room_group_name)
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        if message.strip() == '':
            return


        print(text_data, message)

        print('receive',self.room_name, self.room_group_name)
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                # 'username': username
            }
        )
        # self.chat_message({
        #         'type': 'chat_message',
        #         'message': message,
        #         # 'username': username
        #     })
        

    def chat_message(self, event):
        print('chat_message',event)
        message = event['message']
        # username = event['username']
        
        self.send(text_data=json.dumps({
            'event': "Send",
            'message': message,
            # 'username': username
        }))
