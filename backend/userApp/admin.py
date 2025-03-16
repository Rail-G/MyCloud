from django.contrib import admin
from .models import Users

@admin.register(Users)
class UsersAdmin(admin.ModelAdmin):
    list_display = ['id', 'is_staff', 'username', 'first_name', 'last_name']
