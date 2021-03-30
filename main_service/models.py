from django.db import models


# Create your models here.
class State(models.Model):
    humidity = models.FloatField()
    temperature = models.FloatField()
    illumination = models.FloatField()
    water_flow = models.FloatField()
    fertilizer_flow = models.FloatField()
    water_level = models.FloatField()
    fertilizer_level = models.FloatField()
