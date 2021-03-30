from django.db import models
import datetime


# Create your models here.
class State(models.Model):
    humidity = models.FloatField(default=0)
    temperature = models.FloatField(default=0)
    illumination = models.FloatField(default=0)
    water_flow = models.FloatField(default=0)
    fertilizer_flow = models.FloatField(default=0)
    water_level = models.FloatField(default=0)
    fertilizer_level = models.FloatField(default=0)
    date = models.TimeField(default=datetime.datetime.now().time())
