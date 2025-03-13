from django.dispatch import receiver
from django.db.models.signals import post_delete

from fileApp.models import UsersFiles

@receiver(post_delete, sender=UsersFiles)
def delete_file(sender, instance, **kwargs):
    instance.file.delete(save=False)