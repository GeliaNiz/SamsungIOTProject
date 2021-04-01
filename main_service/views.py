from django.http import JsonResponse
from rest_framework.views import APIView
from .models import *
from .serializers import StateSerializer


class StateView(APIView):
    def get(self,request):
        state = State.objects.all()
        ser_state = StateSerializer(state, many=True)
        return JsonResponse(ser_state.data,safe=False)
