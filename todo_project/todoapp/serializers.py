from rest_framework import serializers
from .models import *

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ['todoid', 'title', 'description', 'status']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile  
        fields = ['userid', 'username', 'password', 'isadmin'] 

    def create(self, validated_data):
        user = Profile.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            isadmin=validated_data.get('isadmin', '0')
        )
        return user