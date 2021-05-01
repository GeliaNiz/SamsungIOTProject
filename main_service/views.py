from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from rest_framework.views import APIView
from .models import *
from .serializers import StateSerializer


class StateView(APIView):
    def get(self, request):
        state = State.objects.all()
        ser_state = StateSerializer(state, many=True)
        context = {'states': ser_state.data}
        return render(request, 'dashboard.html', context)


@require_http_methods(["GET"])
def get_users(request):
    state = State.objects.all()
    ser_state = StateSerializer(state, many=True)
    return JsonResponse(ser_state.data, safe=False)
