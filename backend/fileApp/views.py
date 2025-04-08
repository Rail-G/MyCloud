from django.http import FileResponse
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import UsersFiles
from .serializer import UsersFilesSerializer
from .permissions import IsAdminOrOwner
from datetime import datetime
import os

class FileView(ModelViewSet):
    queryset = UsersFiles.objects.all()
    serializer_class = UsersFilesSerializer

    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy', 'retrieve', 'share_link', 'download']:
            return [IsAuthenticated(), IsAdminOrOwner()]
        elif self.action in ['list', 'create']:
            return [IsAuthenticated()]
        return [AllowAny()]

    def list(self, request, *args, **kwargs):
        if (request.user.is_staff):
            user_files = UsersFiles.objects.all()
        else:
            user_files = request.user.files.all()
        serializer = self.serializer_class(user_files, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    def create(self, request, *args, **kwargs):
        print(request.body)
        return super().create(request, *args, **kwargs)

    def partial_update(self, request, pk=None, *args, **kwargs):
        file = get_object_or_404(self.queryset, pk=pk)
        serializer = self.serializer_class(file, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.validated_data['file_name'] = request.data['file_name']
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    def share_link(self, request, pk, *args, **kwargs):
        file = get_object_or_404(queryset=self.queryset, pk=pk)
        file_link = file.share_link
        if not file_link:
            code = os.urandom(16).hex()
            file_link = request.build_absolute_uri(f'/api/files/shared-file/{code}')
            file.share_link = file_link
            file.skip_update = True
            file.save()
            file.skip_update = False
        return Response({'share_link': file_link}, status=status.HTTP_200_OK)
    
    def share_detail(self, request, code, *args, **kwargs):
        share_link = request.build_absolute_uri(f'/api/files/shared-file/{code}')
        file = get_object_or_404(queryset=self.queryset, share_link=share_link)
        file.downloaded = datetime.now()
        file.skip_update = True
        file.save()
        file.skip_update = False
        return FileResponse(open(file.file.path, 'rb'), as_attachment=True)

    def download(self, request, pk, *args, **kwargs):
        file = get_object_or_404(queryset=self.queryset, pk=pk)
        file.downloaded = datetime.now()
        file.skip_update = True
        file.save()
        file.skip_update = False
        return FileResponse(open(file.file.path, 'rb'), as_attachment=True)