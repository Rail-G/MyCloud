from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import UsersFolders
from fileApp.serializer import UsersFilesInFolderSerializer

class UsersFolderSerializer(ModelSerializer):
    class Meta:
        model = UsersFolders
        fields = "__all__"

class UsersFolderDetailSerializer(ModelSerializer):
    files = UsersFilesInFolderSerializer(read_only=True, many=True)
    folders = SerializerMethodField()
    class Meta:
        model = UsersFolders
        fields = ['id', 'user', 'folder_name', 'parent_folder', 'files', 'folders']

    def get_folders(self, obj):
        return list(obj.parentfolder.all().values('id', 'folder_name'))
