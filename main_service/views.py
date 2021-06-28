from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from rest_framework.views import APIView
from .models import *
from .serializers import StateSerializer
from .MQTTclient import *
import json


class StateView(APIView):
    def get(self, request):
        state = State.objects.all()
        ser_state = StateSerializer(state, many=True)
        context = {'states': ser_state.data}
        return render(request, 'dashboard_m.html', context)


@require_http_methods(["GET"])
def get_users(request):
    state = State.objects.all()
    ser_state = StateSerializer(state, many=True)
    return JsonResponse(ser_state.data, safe=False)


@require_http_methods(['POST'])
@csrf_exempt
def update_data(request):
    message = 1
    send(m_client, '%/1/update', message, True)
    return HttpResponse('work')


@require_http_methods(['POST'])
@csrf_exempt
def control_watering(request):
    state = request.POST.get('state')
    send(m_client, '%/1/control_pump', state, True)
    return HttpResponse('Watering')


@require_http_methods(['POST'])
@csrf_exempt
def control_manual(request):
    state = request.POST.get('state')
    send(m_client, '%/1/manual', state, True)
    return HttpResponse('Manual')


@require_http_methods(['POST'])
@csrf_exempt
def send_mqtt(request):
    dest = request.POST.get('topicName')
    id = request.POST.get('id')
    state = request.POST.get('state')
    send(m_client, f'%/control/{id}/{dest}', state, True)
    return HttpResponse('Work')
