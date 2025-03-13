from rest_framework.serializers import ModelSerializer
from .models import UsersFiles
class UsersFilesSerializer(ModelSerializer):
    class Meta: 
        model = UsersFiles
        fields = '__all__'
        read_only_fields = ['created', 'downloaded', 'size', 'file_name', 'share_link', 'extensions']

