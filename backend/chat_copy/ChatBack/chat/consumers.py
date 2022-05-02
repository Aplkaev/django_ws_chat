from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json


class ChatConsumer(WebsocketConsumer):
    my_rooms = {}
    def connect(self):
        """
            Действие при подключение wss клиентом (рукопожатие)

            Создаем группу и добавляем туда человека
            Сообщаем тем кто уже есть, сколько теперь людей в комнате
        """
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        # создаем группу и добавляем человека в группу
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()
        self._add_person_room()


    def disconnect(self, close_code):
        """
            Отключение пользователя
        """
        if self.room_group_name in self.my_rooms:
            self.my_rooms[self.room_group_name] -= 1

        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )
        self._rm_person_room()


    def receive(self, text_data):
        """
            Сообщение от пользователя
        """
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        data = {
            'type': 'chat_message',
            'message': message,
        }
        
        if message.strip() == '':
            data['type'] = 'chat_error'
            data['message'] = 'Ошибка. Пустое сообщение'

        self._send_message(data)


    def _add_person_room(self):
        """
            Добавляем человека в счетчик людей в комнате
        """
        # для определения количества людей в группе
        if not self.room_group_name in self.my_rooms:
            self.my_rooms[self.room_group_name] = 0
        self.my_rooms[self.room_group_name] += 1
        data = {
            'type':'chat_len',
            'len':self.my_rooms[self.room_group_name]
        }
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            data
        )

    
    def _rm_person_room(self):
        """
            Убираем человека из комнаты
        """
        data = {
            'type':'chat_len',
            'len':self.my_rooms[self.room_group_name]
        }
        self._send_message(data)


    def _send_message(self, data):
        """
            Отправляем сообщение
        """
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            data
        )


    def chat_error(self, event:dict):
        """
            Оповещение об ошибки

            Например пустой сообщение
            TODO: добавить предупреждение через код ошибки

            event:dict - {
                'message':'Тест ошибки'
            }
        """
        self.send(text_data=json.dumps({
            'event': "error",
            'message': event['message'],
        }))      


    def chat_message(self, event):
        """
            Сообщением все пользователем в комнате
        """
        print('chat_message',event)
        message = event['message']
        
        self.send(text_data=json.dumps({
            'event': "send",
            'message': message,
        }))


    def chat_len(self, event):
        """
            Пишем всем сколько людей в комнате
        """
        print(event)
        self.send(text_data=json.dumps({
            'event': "users_len",
            'len': event['len'],
        }))

