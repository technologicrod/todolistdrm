from django.db import models

class Profile(models.Model):
    userid = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    isadmin = models.CharField(max_length=1)

class Todo(models.Model):
    todoid = models.AutoField(primary_key=True)
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=255)
    status = models.CharField(max_length=50)

    def __str__(self):
        return self.title
