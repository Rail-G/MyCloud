from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import UsersFolders
from .serializer import UsersFolderSerializer, UsersFolderDetailSerializer
from .permissions import IsAdminOrOwner


class FolderView(ModelViewSet):
    queryset = UsersFolders.objects.all()
    def get_permissions(self):
        if self.action in ['partial_update', 'destroy', 'retrieve', 'list']:
            return [IsAuthenticated(), IsAdminOrOwner()]
        elif self.action in ['create']:
            return [IsAuthenticated()]
        return [AllowAny()]
    
    def get_serializer_class(self, *args, **kwargs):
        if self.action in ['list', 'retrieve']:
            return UsersFolderDetailSerializer
        return UsersFolderSerializer

    def list(self, request, *args, **kwargs):
        if (request.user.is_staff):
            user_files = UsersFolders.objects.filter(parent_folder=None)
            serializer = self.get_serializer(user_files, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            user_files = request.user.folders.get(folder_name=f'{request.user.username}_{request.user.id}', parent_folder=None)
            serializer = self.get_serializer(user_files, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
