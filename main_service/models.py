from django.db import models
import datetime


# Create your models here.
class State(models.Model):
    pot_id = models.IntegerField(default=0)
    humidity = models.FloatField(default=0)
    temperature = models.FloatField(default=0)
    light = models.FloatField(default=0)
    water_flow = models.FloatField(default=0)
    fertilizer_flow = models.FloatField(default=0)
    water_level = models.FloatField(default=0)
    fertilizer_level = models.FloatField(default=0)
    date = models.DateTimeField(auto_now=True)
