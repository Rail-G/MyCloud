from rest_framework.serializers import ModelSerializer, ValidationError, IntegerField, SerializerMethodField
from django.contrib.auth.hashers import make_password
from .models import Users
from fileApp.serializer import UsersFilesSerializer
import re

class AdminSerializer(ModelSerializer):
    folders = IntegerField(source='folders.count', read_only=True)
    files = IntegerField(source='files.count', read_only=True)
    main_folder = SerializerMethodField()
    file_size = SerializerMethodField()
    class Meta:
        model = Users
        fields = ['id', 'username', 'email', 'is_staff', 'is_superuser', 'is_active', 'files', 'folders', 'file_size', 'main_folder']

    def get_main_folder(self, obj):
        user = obj.folders.first()
        return user.id if user else None
    
    def get_file_size(self, obj):
        return sum(file.size for file in obj.files.all())

class UserSerializer(ModelSerializer):
    user_folder = SerializerMethodField()
    class Meta:
        model = Users
        fields = ['id', 'username', 'email', 'is_staff', 'is_superuser', 'user_folder', 'password']
        extra_kwargs = {'password': {'write_only': True}, 'is_superuser': {'read_only': True}, 'user_folder': {'read_only': True}}

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)
    
    def validate_email(self, value):
        if value == '':
            return value
        
        regex_email = re.search(r'^[a-zA-Z]{1}[a-zA-Z0-9._-]{2,20}@[a-zA-Z0-9-]{1,10}\.[a-zA-Z]{2,3}$', value)
        if regex_email is None:
            raise ValidationError('Некорректный email')
        if Users.objects.filter(email=value).exists():
            raise ValidationError(f'Email {value} уже существует')
        
        return value

    def get_user_folder(self, obj):
        return obj.folders.first().id