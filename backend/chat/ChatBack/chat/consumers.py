from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json


class ChatConsumer(WebsocketConsumer):
    # хранит количество людей в комнатах
    my_rooms: dict = {}
    # название комнаты
    room_name: str = ''
    room_group_name: str = ''

    def connect(self):
        """
            Действие при подключение wss клиентом (рукопожатие)

            Создаем группу и добавляем туда человека
            Сообщаем тем кто уже есть, сколько теперь людей в комнате
        """
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        # TODO: сделать поддрежку unicode или форматирование в ASCII
        self.room_group_name = self.room_name

        # создаем группу и добавляем человека в группу
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        """
            Отключение пользователя
        """
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )
        self._rm_person_room()

    def receive(self, text_data:str):
        """
            Сообщение от пользователя
            TODO: вынести в отдельные обработчики
            @param text_data:str - сообщение из ws
        """
        # TODO: переделать на роут для разных событий
        try:
            text_data_json = json.loads(text_data)
        except Exception as e:
            print('receive',e)
            return
        data = {
            'type': 'error',
            'myssage': 'Нет такого события'
        }
        if 'event' in text_data_json and text_data_json['event'] == 'connect':
            # подключение нового человека
            self._add_person_room(text_data_json['user'])

        if 'message' in text_data_json or text_data_json['event'] == 'message':
            # сообщение от пользователя
            message = text_data_json['message']
            user = text_data_json['user']
            data = {
                'type': 'chat_message',
                'message': message,
                'user': user
            }

            if message.strip() == '':
                data['type'] = 'chat_error'
                data['message'] = 'Ошибка. Пустое сообщение'
                data['user'] = user
            else:
                text_data_json['event'] = 'typing_stop'
            self._send_message(data)

        if 'event' in text_data_json and text_data_json['event'] == 'typing':
            user = text_data_json['user']
            data = {
                'type': 'typing_message',
                'user': user
            }
            self._send_message(data)

        if 'event' in text_data_json and text_data_json['event'] == 'typing_stop':
            user = text_data_json['user']
            data = {
                'type': 'typing_message_stop',
                'user': user
            }
            self._send_message(data)

    def _add_person_room(self, user_id=None):
        """
            Добавляем человека в счетчик людей в комнате
        """
        # если нет user_id
        if user_id is None:
            return

        # для определения количества людей в группе
        if not self.room_group_name in self.my_rooms:
            self.my_rooms[self.room_group_name] = set()

        self.my_rooms[self.room_group_name].add(user_id)
        self._person_room()

    def _rm_person_room(self, user_id=None):
        """
            Убираем человека из комнаты
        """
        self.my_rooms[self.room_group_name] = set()
        data = {
            'type': 'update_person'
        }
        self._send_message(data)

        # # если нет user_id
        # if user_id is None:
        #     return

        # if self.room_group_name in self.my_rooms:
        #     if user_id in self.my_rooms[self.room_group_name]:
        #         self.my_rooms[self.room_group_name].remove(user_id)
        # self._person_room()

    def _person_room(self):
        """
            Человек в комнате
            Общая отпрвка сколько человек в комнате
        """
        data = {
            'type': 'chat_len',
            'len': len(self.my_rooms[self.room_group_name])
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

    def chat_error(self, event: dict):
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
            'user': event['user'],
        }))

    def chat_message(self, event):
        """
            Сообщением все пользователем в комнате
        """
        message = event['message']
        user = event['user']

        self.send(text_data=json.dumps({
            'event': "send",
            'message': message,
            'user': user
        }))

    def chat_len(self, event):
        """
            Пишем всем сколько людей в комнате
        """
        self.send(text_data=json.dumps({
            'event': "users_len",
            'len': event['len'],
        }))

    def update_person(self, event):
        """
            Просим всех в комнате подвердить присудствие
        """
        self.send(text_data=json.dumps({
            'event': "person_confirm"
        }))

    def typing_message(self, event):
        """
            Говорим всем кто печатает
        """
        self.send(text_data=json.dumps({
            'event': 'typing',
            'user': event['user']
        }))

    def typing_message_stop(self, event):
        """
            Поле ввода сообщние пустое
        """
        self.send(text_data=json.dumps({
            'event': 'typing_stop',
            'user': event['user']
        }))
