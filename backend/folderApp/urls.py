from django.contrib import admin
from django.urls import path
from .views import FolderView

urlpatterns = [
    path('folders/', FolderView.as_view({'get': 'list'}), name='folders-list'),
    path("folders/create/", FolderView.as_view({'post': 'create'}), name='folder-create'),
    path('folders/<int:pk>/', FolderView.as_view({'get': 'retrieve', 'patch': 'partial_update', 'delete': 'destroy'}), name='folder-manage'),
]
