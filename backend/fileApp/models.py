from django.conf import settings
from django.db import models
import os

def customDir(instance, filename):
    renamed_file_name, new_file_path = renamer(instance.user, filename)
    instance.file_name = renamed_file_name
    instance.extensions = renamed_file_name.split('.')[-1]
    return new_file_path

def renamer(user, filename):
    file_name, file_ext = filename.split('.')
    copyed_file_name = file_name
    counter = 1
    while user.files.filter(file_name=f'{copyed_file_name}.{file_ext}').exists():
        copyed_file_name = f'{file_name}_{counter}'
        counter += 1
    file_path = f'{user}/{copyed_file_name}.{file_ext}'
    return f'{copyed_file_name}.{file_ext}', file_path

class UsersFiles(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='files', verbose_name='Пользователь')
    file = models.FileField(upload_to=customDir, verbose_name='Файл')
    file_name = models.CharField(max_length=50, blank=True, verbose_name='Название файла')
    size = models.IntegerField(verbose_name='Размер файла')
    extensions = models.CharField(max_length=10, blank=True, verbose_name='Расширения файла')
    share_link = models.CharField(max_length=256, blank=True, verbose_name='Поделиться')
    comment = models.CharField(max_length=50, blank=True, verbose_name='Комментарий')
    created = models.DateTimeField(auto_now_add=True, verbose_name='Загружено')
    downloaded = models.DateTimeField(blank=True, null=True, verbose_name='Дата скачивания')

    def save(self, *args, **kwargs):
        if self.file_name:
            self_file_name = self.file_name
            original_file_name = os.path.basename(self.file.name)
            if self_file_name != original_file_name:
                if self.id:
                    old_full_file_path = self.file.path
                    file_name, file_path = renamer(self.user, self_file_name)
                    self.file_name = file_name
                    self.file.name = file_path
                    new_full_file_path = os.path.join(settings.MEDIA_ROOT, file_path)
                    os.rename(old_full_file_path, new_full_file_path)
        self.size = self.file.size
        return super().save(*args, **kwargs)
    
    class Meta:
        verbose_name = 'Файл пользователя'
        verbose_name_plural = 'Файлы пользователей'
    
    