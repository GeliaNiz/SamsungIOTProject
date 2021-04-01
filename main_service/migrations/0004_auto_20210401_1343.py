# Generated by Django 3.1.7 on 2021-04-01 10:43

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_service', '0003_state_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='state',
            name='pot_id',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='state',
            name='date',
            field=models.TimeField(default=datetime.time(13, 43, 14, 412871)),
        ),
    ]