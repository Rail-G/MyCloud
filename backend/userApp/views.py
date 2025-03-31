from rest_framework.viewsets import ModelViewSet
from django.contrib.auth import login, logout
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from .permissions import AdminOrSelf
from .models import Users
from .serializer import UserSerializer, AdminSerializer
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from django.middleware.csrf import get_token
from rest_framework.response import Response
from rest_framework import status

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
    
    def user_authenticate(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            token = Token.objects.get_or_create(user=user)

            csrf = get_token(request)

            response = Response({
                'id': user.id, 'username': user.username, 'is_staff': user.is_staff
                }, status=status.HTTP_200_OK)
            login(request, user)
            response.set_cookie(key='a_t', value=token[0].key, httponly=True, secure=True, samesite='None')
            response.set_cookie(key='csrf', value=csrf, httponly=True, secure=True, samesite='None')

            return response
        else:
            return Response({'error': 'Такого пользователя не существует'}, status=status.HTTP_403_FORBIDDEN)
        
    def user_registration(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        new_user = serializer.save()
        
        token = Token.objects.create(user=new_user)

        return Response({
            'message': 'Вы успешно зарегистрировали аккаунт'
        }, status=status.HTTP_201_CREATED)

    def user_logout(self, request, *args, **kwargs):
        user_token = Token.objects.filter(key=request.COOKIES.get('a_t'))
        if user_token.exists():
            user_token.delete()
            response = Response({"message": 'Вы успешно вышли из аккаунта'}, status=status.HTTP_204_NO_CONTENT)
            response.delete_cookie('a_t')
            response.delete_cookie('csrf')
            logout(request)
            return response
        return Response({'error': 'Не валидный токен'}, status=status.HTTP_403_FORBIDDEN)