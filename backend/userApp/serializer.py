from rest_framework.serializers import ModelSerializer, ValidationError, CharField
from django.contrib.auth.hashers import make_password
from .models import Users
from fileApp.serializer import UsersFilesSerializer
import re

class AdminSerializer(ModelSerializer):
    files = UsersFilesSerializer(read_only=True, many=True)
    class Meta:
        model = Users
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'is_staff', 'files']

class UserSerializer(ModelSerializer):
    class Meta:
        model = Users
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'is_staff', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)
    
    def validate_email(self, value):
        if value == '':
            return value
        
        regex_email = re.search(r'^[a-zA-Z]{1}[a-zA-Z0-9._-]{2,20}@[a-zA-Z0-9-]{1,10}\.[a-zA-Z]{2,3}$', value)
        if regex_email is None:
            raise ValidationError('Некорректный email. Пожалуйста, не используйте прямой запрос на сервер. Для этого используйте клиентская форма')
        if Users.objects.filter(email=value).exists():
            raise ValidationError(f'Email {value} уже существует')
        
        return value