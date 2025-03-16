from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.authtoken.models import Token

class TokenAndCsrfAuthentication(BaseAuthentication):
    def authenticate(self, request):
        if request.path in ['/api/user/login/'] and request.method == 'GET' or request.method == 'POST':
            return None
        csrf = request.COOKIES.get('csrftoken')
        if not csrf:
            raise AuthenticationFailed('Отсутствует csrf токен')

        token = request.META.get('HTTP_AUTHORIZATION')
        if (not token or not token.startswith('Token ')) or token:
            token = request.COOKIES.get('a_t')

        if not token:
            raise AuthenticationFailed('Отсутсвует запрошенный токен')

        token_key = token.split(' ')[1]
        try:
            token = Token.objects.get(key=token_key)
        except Token.DoesNotExist:
            raise AuthenticationFailed('Такого токена не существует')

        return (token.user, token)