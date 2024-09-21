from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from rest_framework import exceptions
from django.contrib.auth.hashers import make_password, check_password

# TodoView for CRUD
class TodoView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk=None):
        # Print if the user is authenticated
        print(f"User authenticated: {request.user.is_authenticated}")

        # Print the token
        token = request.auth
        print(f"Token: {token}")

        if pk is not None:
            # Fetch a specific todo item by ID
            try:
                todo = Todo.objects.get(pk=pk)
                serializer = TodoSerializer(todo)
                return Response(serializer.data)
            except Todo.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)

        # Fetch all todo items
        todos = Todo.objects.all()
        serializer = TodoSerializer(todos, many=True)
        return Response(serializer.data)


    def post(self, request):
        serializer = TodoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            todo = Todo.objects.get(pk=pk)
        except Todo.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = TodoSerializer(todo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            todo = Todo.objects.get(pk=pk)
            todo.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Todo.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

# User Registration View
class UserRegistrationView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        confirm_password = request.data.get('confirmPassword')
        is_superuser = 1 if request.data.get('is_superuser') == 1 else 0
        
        print(f"Is Superuser1: {request.data.get('is_superuser')}")
        print(f"Username: {username}")
        print(f"Password: {password}")
        print(f"Confirm Password: {confirm_password}")
        print(f"Is Superuser: {is_superuser}")
        if not username or not password or not confirm_password:
            return Response({'error': 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)

        if password != confirm_password:
            return Response({'error': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

        # Hash the password before saving
        user = User.objects.create(
            username=username,
            password=make_password(password),  # Hash the password
            is_superuser=is_superuser
        )

        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'message': 'User created successfully'}, status=status.HTTP_201_CREATED)


# User Login View
class UserLoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        try:
            # Query your custom User model
            user = User.objects.get(username=username)

            # Check if the provided password matches the stored hashed password
            if not check_password(password, user.password):
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        except Profile.DoesNotExist:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        if user.is_superuser == 0:
            return Response({'error': 'You do not have access to the TODO list'}, status=status.HTTP_403_FORBIDDEN)
        # Create a token for the user
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'isadmin': user.is_superuser}, status=status.HTTP_200_OK)
