from datetime import datetime, timedelta
from rest_framework.viewsets import ModelViewSet
from django.contrib.auth import login, logout
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from .permissions import AdminOrSelf
from .models import Users
from .serializer import UserSerializer, AdminSerializer
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.pagination import PageNumberPagination
from django.middleware.csrf import get_token
from rest_framework.response import Response
from rest_framework import status
from .signals import signal_manager


class UsersPagination(PageNumberPagination):
    page_size = 10


class UserView(ModelViewSet):
    queryset = Users.objects.all()
    pagination_class = UsersPagination

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

    def get_queryset(self):
        queryset = super().get_queryset()
        username = self.request.query_params.get('username', None)
        if username:
            queryset = queryset.filter(username__icontains=username)
        return queryset.order_by('id')

    def create(self, request):
        return Response({'detail': 'Метод POST запрещен'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
class UserLoginView(ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UserSerializer
    
    def user_authenticate(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        serializer = UserSerializer(user)
        serializedUser = serializer.data
        if user is not None:
            token = Token.objects.get_or_create(user=user)

            csrf = get_token(request)

            response = Response({
                'id': serializedUser['id'], 'username': serializedUser['username'], 'is_staff': serializedUser['is_staff'], 'is_superuser': serializedUser['is_superuser'], "user_folder": serializedUser['user_folder']
                }, status=status.HTTP_200_OK)
            signal_manager.disable()
            login(request, user)
            signal_manager.enable()
            expires = datetime.now() + timedelta(days=365)
            response.set_cookie(key='a_t', value=token[0].key, httponly=True, secure=True, samesite='None')
            response.set_cookie(key='csrf', value=csrf, httponly=True, secure=True, samesite='None')

            return response
        else:
            return Response({'error': 'Такого пользователя не существует'}, status=status.HTTP_403_FORBIDDEN)
        
    def user_registration(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        print(serializer)
        new_user = serializer.save()

        return Response({}, status=status.HTTP_201_CREATED)

    def user_logout(self, request, *args, **kwargs):
        user_token = Token.objects.filter(key=request.COOKIES.get('a_t'))
        if user_token.exists():
            print("Session data after login:", request.session.items(), request.user)
            logout(request)
            print("Session data after login:", request.session.items(), request.user)
            user_token.delete()
            request.session.flush()
            response = Response({"message": 'Вы успешно вышли из аккаунта'}, status=status.HTTP_204_NO_CONTENT)
            response.delete_cookie('a_t')
            response.delete_cookie('csrf')
            response.delete_cookie('csrftoken')
            response.delete_cookie('sessionid')
            return response
        return Response({'error': 'Не валидный токен'}, status=status.HTTP_403_FORBIDDEN)