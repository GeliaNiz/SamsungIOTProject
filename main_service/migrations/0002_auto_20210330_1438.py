# Generated by Django 3.1.7 on 2021-03-30 11:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_service', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='state',
            name='fertilizer_flow',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='state',
            name='fertilizer_level',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='state',
            name='humidity',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='state',
            name='illumination',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='state',
            name='temperature',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='state',
            name='water_flow',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='state',
            name='water_level',
            field=models.FloatField(default=0),
        ),
    ]
