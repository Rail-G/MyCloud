import shutil
from django.conf import settings
from django.db import models

import os

from rest_framework.serializers import ValidationError
from folderApp.models import UsersFolders

def customDir(instance, filename):
    renamed_file_name, new_file_path = renamer(instance.user, filename, instance.folder)
    instance.file_name = renamed_file_name
    instance.extensions = renamed_file_name.split('.')[-1]
    return new_file_path

def renamer(user, filename, folder=None):
    file_name, file_ext = filename.split('.')
    copyed_file_name = file_name
    counter = 1
    while user.files.filter(file_name=f'{copyed_file_name}.{file_ext}', folder=folder).exists():
        copyed_file_name = f'{file_name}_{counter}'
        counter += 1
    folders = ''
    while folder is not None:
        folders = f'{folder.folder_name}/{folders}'
        if folder.parent_folder is not None:
            folder = folder.parent_folder
        else: 
            break
    file_path = f'{folders}{copyed_file_name}.{file_ext}'
    return f'{copyed_file_name}.{file_ext}', file_path

class UsersFiles(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='files', verbose_name='Пользователь')
    file = models.FileField(upload_to=customDir, verbose_name='Файл')
    folder = models.ForeignKey(UsersFolders, blank=True, null=True, on_delete=models.CASCADE, related_name='files', verbose_name='Папка')
    file_name = models.CharField(max_length=50, blank=True, verbose_name='Название файла')
    size = models.IntegerField(verbose_name='Размер файла')
    extensions = models.CharField(max_length=10, blank=True, verbose_name='Расширения файла')
    share_link = models.CharField(max_length=256, blank=True, verbose_name='Поделиться')
    comment = models.CharField(max_length=50, blank=True, verbose_name='Комментарий')
    created = models.DateTimeField(auto_now_add=True, verbose_name='Загружено')
    downloaded = models.DateTimeField(blank=True, null=True, verbose_name='Дата скачивания')

    skip_update = False
    def save(self, *args, **kwargs):
        if self.pk and not self.skip_update: 
            new_file_name = '_'.join(os.path.basename(self.file_name).split())
            folder = self.folder
            folders = ''
            while folder is not None:
                folders = f'{folder.folder_name}/{folders}'
                if folder.parent_folder is not None:
                    folder = folder.parent_folder
                else: 
                    break
            file_path = f'{folders}{new_file_name}'
            new_full_file_path = os.path.join(settings.MEDIA_ROOT, file_path)
            if os.path.exists(new_full_file_path):
                raise ValidationError(f"Файл с именем '{new_file_name}' уже существует. Пожалуйста, переименуйте файл.")
        if self.file_name:
            self_file_name = '_'.join(self.file_name.split())
            original_file_name = '_'.join(os.path.basename(self.file.name).split())
            if self_file_name != original_file_name:
                if self.id:
                    old_full_file_path = self.file.path
                    file_path = customDir(self, self_file_name)
                    self.file_name = self_file_name
                    self.file.name = file_path
                    new_full_file_path = os.path.normpath(os.path.join(settings.MEDIA_ROOT, file_path))
                    print(old_full_file_path, new_full_file_path)
                    if os.path.exists(new_full_file_path):
                        raise ValidationError(f"Файл с именем '{self_file_name}' уже существует. Пожалуйста, переименуйте файл.")
                    os.rename(old_full_file_path, new_full_file_path)
        self.size = self.file.size
        return super().save(*args, **kwargs)
    
    class Meta:
        verbose_name = 'Файл пользователя'
        verbose_name_plural = 'Файлы пользователей'