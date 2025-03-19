from rest_framework.serializers import ModelSerializer
from .models import UsersFolders
from fileApp.serializer import UsersFilesSerializer

class UsersFolderSerializer(ModelSerializer):
    class Meta:
        model = UsersFolders
        fields = "__all__"

class UsersFolderRetrieveSerializer(ModelSerializer):
    files = UsersFilesSerializer(read_only=True, many=True)
    class Meta:
        model = UsersFolders
        fields = ['id', 'user', 'folder_name', 'parent_folder', 'files']