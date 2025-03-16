from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserView, UserLoginView

router = DefaultRouter()
router.register(r'user', UserView)

urlpatterns = [
    path('user/login/', UserLoginView.as_view({'post': 'user_authenticate'})),
    path('user/registration/', UserLoginView.as_view({'post': 'user_registration'}))
] + router.urls
