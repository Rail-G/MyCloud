from django.contrib import admin
from django.urls import path
from .views import FileView

urlpatterns = [
    path("files/", FileView.as_view({'get': 'list'})),
    path("files/create/", FileView.as_view({'post': 'create'})),
    path("files/<int:pk>/", FileView.as_view({'get': 'retrieve', 'patch': 'partial_update', 'delete': 'destroy'})),
    path("files/share-link/<int:pk>/", FileView.as_view({'get': 'share_link'})),
    path("files/shared-file/<str:code>/", FileView.as_view({'get': 'share_detail'})),
    path("files/download/<int:pk>/", FileView.as_view({'get': 'download'})),
]
