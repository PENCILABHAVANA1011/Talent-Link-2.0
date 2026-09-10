from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):

    ROLE_CHOICES = (
        ('client', 'Client'),
        ('freelancer', 'Freelancer'),
    )

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES
    )


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    full_name = models.CharField(max_length=100, blank=True)
    bio = models.TextField(blank=True)
    location = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.user.username

    STATUS_CHOICES = (
        ('open', 'Open'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='open'
    )

class Project(models.Model):
    client = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='projects'
    )

    title = models.CharField(max_length=200)
    description = models.TextField()
    budget = models.DecimalField(max_digits=10, decimal_places=2)

    STATUS_CHOICES = (
        ('open', 'Open'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='open'
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    
class Proposal(models.Model):
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name='proposals'
    )

    freelancer = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='proposals'
    )

    cover_letter = models.TextField()

    bid_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    duration_days = models.PositiveIntegerField()

    created_at = models.DateTimeField(auto_now_add=True)

    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending'
    )

    def __str__(self):
        return f"{self.freelancer.username} - {self.project.title}"

