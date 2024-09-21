from django.urls import path
from .views import TodoView, UserRegistrationView, UserLoginView

urlpatterns = [
    path('todos/', TodoView.as_view(), name='todo_list'),
    path('todos/<int:pk>/', TodoView.as_view(), name='todo_detail'),
    path('register/', UserRegistrationView.as_view(), name='user_register'),
    path('login/', UserLoginView.as_view(), name='user_login'),
]
