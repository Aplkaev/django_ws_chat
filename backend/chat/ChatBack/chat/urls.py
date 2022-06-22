from django.urls import path

from . import views

urlpatterns = [
    path('api/getRooms/', views.get_rooms),
    path('api/getMyId/', views.get_my_id),
    path('', views.index, name='index'),
]