from django.urls import path

from . import views

urlpatterns = [
    path('api/getRooms/', views.get_rooms),
    path('api/getMyId/', views.get_my_id),
    path('<str:room_name>/', views.room, name='room'),
    path('', views.index, name='index'),
]
