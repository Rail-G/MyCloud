import os
import shutil
from django.dispatch import receiver
from django.db.models.signals import post_save, post_delete
from django.conf import settings

from userApp.models import Users
from folderApp.models import UsersFolders

class SignalManager:
    def __init__(self):
        self.disabled = False

    def disable(self):
        self.disabled = True

    def enable(self):
        self.disabled = False

signal_manager = SignalManager()

@receiver(post_save, sender=Users)
def create_folder(sender, instance, created, **kwargs):
    if signal_manager.disabled:
        return
    if created:
        UsersFolders.objects.create(user=instance, folder_name=f'{instance.username}_{instance.id}')
    else:
        folder = UsersFolders.objects.get(user=instance, parent_folder=None)
        if folder.folder_name == f'{instance.username}_{instance.id}':
            return
        folder.folder_name = f'{instance.username}_{instance.id}'
        folder.save()

@receiver(post_delete, sender=Users)
def create_folder(sender, instance, **kwargs):
    path = os.path.join(settings.MEDIA_ROOT, f'{instance.username}_{instance.id}')
    shutil.rmtree(path)
