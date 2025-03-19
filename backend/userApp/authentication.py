from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.authtoken.models import Token
import logging

class TokenAndCsrfAuthentication(BaseAuthentication):
    def authenticate(self, request):
        if request.path in ['/api/user/login/', '/api/user/registration/'] and request.method in ['GET', 'POST']:
            return None
        
        cookie_token = request.COOKIES.get('a_t')

        if not cookie_token:
            logging.warning('Аутентификация провалена: Отсутствует запрошенный токен')
            raise AuthenticationFailed('Отсутствует запрошенный токен')
        
        csrf = request.COOKIES.get('csrftoken')
        if not csrf:
            logging.warning('Аутентификация провалена: Отсутствует csrf токен')
            raise AuthenticationFailed('Отсутствует csrf токен')
        
        try:
            token = Token.objects.select_related('user').get(key=cookie_token)
        except Token.DoesNotExist:
            logging.warning('Аутентификация провалена: Токен и пользователь не совпадают')
            raise AuthenticationFailed('Токен и пользователь не совпадают')
        
        if not token.user.is_authenticated:
            logging.warning('Аутентификация провалена: Вы не вошли в свой аккаунт')
            raise AuthenticationFailed('Вы не вошли в свой аккаунт')
        return (token.user, token)