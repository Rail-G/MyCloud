from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny, IsAdminUser
from .permissions import AdminOrSelf
from .models import Users
from .serializer import UserSerializer, AdminSerializer
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from django.middleware.csrf import get_token
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q

class UserView(ModelViewSet):
    queryset = Users.objects.all()

    def get_permissions(self):
        if self.action in ['list', 'destroy']:
            return [IsAdminUser()]
        elif self.action in ['retrieve', 'update', 'partial_update']:
            return [AdminOrSelf()]
        return [AllowAny()]
    
    def get_serializer_class(self, *args, **kwargs):
        if self.action in ['list', 'retrieve']:
            return AdminSerializer
        return UserSerializer

    def create(self, request):
        return Response({'detail': 'Метод POST запрещен'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
class UserLoginView(ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
    def user_authenticate(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            token = Token.objects.get_or_create(user=user)

            get_token(request)

            response = Response({
                'user': {'username': user.username},
                'message': 'Вы успешно вошли в аккаунт'
            }, status=status.HTTP_200_OK)

            response.set_cookie(key='a_t', value=token.key, httponly=True, secure=True)

            return response
        else:
            return Response({'error': 'Такого пользователя не существует'}, status=status.HTTP_403_FORBIDDEN)
        
    def user_registration(self, request, *args, **kwargs):        
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        new_user = serializer.save()

        token = Token.objects.create(user=new_user)
        get_token(request)

        response = Response({
            'user': {'username': serializer.data['username']},
            'message': 'Вы зарегистрировали аккаунт'
        }, status=status.HTTP_201_CREATED)

        response.set_cookie(key='a_t', value=token.key, httponly=True, secure=True)

        return response