import json
import time

from django.shortcuts import render
from django.utils.safestring import mark_safe
from django.http import JsonResponse
from .consumers import ChatConsumer 



def index(request):
    """Главная страница"""
    return render(request, 'chat/index.html', {})


def room(request, room_name):
    """"""
    return render(request, 'chat/room.html', {
        'room_name_json': mark_safe(json.dumps(room_name))
    })


def get_rooms(request):
    """Запрос на получение всех комнат"""
    rooms = []
    c = ChatConsumer()
    my_rooms = c.my_rooms
    c_keys = my_rooms.keys()
    for i in c_keys:
        rooms.append({
            'name':i,
            'users_len':my_rooms[i]
        })
    return JsonResponse({
        'items':rooms
    })


def get_my_id(request):
    """
        Выдаем пользователю уникальный id
    """

    return JsonResponse({
        'id':int(time.time()*1000)
    })