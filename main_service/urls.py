from django.contrib import admin
from django.urls import path, include
from .views import StateView

urlpatterns = [
    path('', StateView.as_view())
]