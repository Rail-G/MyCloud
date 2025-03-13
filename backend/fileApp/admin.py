from django.contrib import admin
from .models import UsersFiles

@admin.register(UsersFiles)
class UsersAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'file', 'file_name', 'size', 'extensions', 'share_link', 'comment', 'created', 'downloaded']
    readonly_fields  = ['created', 'downloaded', 'size', 'file_name', 'share_link']
    list_filter = ['user']
    search_fields = ['user__username', 'file_name']
