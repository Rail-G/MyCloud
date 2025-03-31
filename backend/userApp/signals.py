import os
import shutil
from django.dispatch import receiver
from django.db.models.signals import post_save, post_delete
from django.conf import settings

from userApp.models import Users
from folderApp.models import UsersFolders

@receiver(post_save, sender=Users)
def create_folder(sender, instance, created, **kwargs):
    if created:
        UsersFolders.objects.create(user=instance, folder_name=f'{instance.username}_{instance.id}')

@receiver(post_delete, sender=Users)
def create_folder(sender, instance, **kwargs):
    path = os.path.join(settings.MEDIA_ROOT, f'{instance.username}_{instance.id}')
    shutil.rmtree(path)
