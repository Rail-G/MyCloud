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
