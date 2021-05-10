from django.contrib import admin
from django.urls import path, include
from .views import StateView
from .views import *

urlpatterns = [
    path('', StateView.as_view()),
    path('get_users/', get_users),
    path('update_data/',update_data)
]