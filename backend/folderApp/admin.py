from django.contrib import admin
from .models import UsersFolders

@admin.register(UsersFolders)
class UsersAdmin(admin.ModelAdmin):
    list_display = ['id', 'folder_name', 'user', 'parent_folder']
    list_filter = ['user']
    search_fields = ['folder_name']
