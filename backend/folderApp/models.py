from django.db import models
from rest_framework.serializers import ValidationError
from django.conf import settings
import os
import shutil

class UsersFolders(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='folders', verbose_name='Пользователь')
    folder_name = models.CharField(max_length=25, verbose_name='Названия папки')
    parent_folder = models.ForeignKey('self', on_delete=models.CASCADE, blank=True, null=True, related_name='parentfolder', verbose_name='Родительская папка')
    
    def __str__(self):
        return self.folder_name
    
    def get_absolute_path(self):
        folder_name = self.folder_name
        next_parent_folder = self.parent_folder
        while next_parent_folder:
            folder_name = f"{next_parent_folder.folder_name}/{folder_name}"
            next_parent_folder = next_parent_folder.parent_folder
        return os.path.join(settings.MEDIA_ROOT, folder_name)
    
    def save(self, *args, **kwargs):
        if not self.pk:
            parent_path = ''
            if self.parent_folder:
                parent_path = self.parent_folder.get_absolute_path()
            folder_path = os.path.join(settings.MEDIA_ROOT, parent_path, self.folder_name)
            if os.path.exists(folder_path):
                raise ValidationError("Папка с таким именем уже существует на файловой системе.")
            os.makedirs(folder_path)
        else:
            parent_path = self.parent_folder.get_absolute_path()
            old_folder_name = UsersFolders.objects.get(pk=self.id).folder_name
            new_folder_path = os.path.join(settings.MEDIA_ROOT, parent_path, self.folder_name)
            old_folder_path = os.path.join(settings.MEDIA_ROOT, parent_path, old_folder_name)
            if os.path.exists(new_folder_path):
                raise ValidationError("Папка с таким именем уже существует на файловой системе.")
            os.rename(old_folder_path, new_folder_path)
        
        return super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        folder_path = self.get_absolute_path()
        if os.path.exists(folder_path):
            shutil.rmtree(folder_path)
        return super().delete(*args, **kwargs)
    class Meta:
        verbose_name = 'Папка пользователя'
        verbose_name_plural = 'Папки пользователей'
