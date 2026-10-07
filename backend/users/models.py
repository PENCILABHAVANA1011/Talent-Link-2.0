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

class Contract(models.Model):

    project = models.OneToOneField(
        Project,
        on_delete=models.CASCADE,
        related_name='contract'
    )

    client = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='client_contracts'
    )

    freelancer = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='freelancer_contracts'
    )

    bid_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    duration_days = models.PositiveIntegerField()

    STATUS_CHOICES = (
        ('active', 'Active'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='active'
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.project.title} - {self.freelancer.username}"



class Review(models.Model):

    contract = models.ForeignKey(
        Contract,
        on_delete=models.CASCADE,
        related_name='reviews'
    )

    reviewer = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='given_reviews'
    )

    reviewee = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='received_reviews'
    )

    rating = models.PositiveIntegerField()

    comment = models.TextField(blank=True)

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.reviewer.username} → {self.reviewee.username} ({self.rating}/5)"

class Message(models.Model):

    contract = models.ForeignKey(
        Contract,
        on_delete=models.CASCADE,
        related_name='messages'
    )

    sender = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='sent_messages'
    )

    receiver = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='received_messages'
    )

    content = models.TextField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    is_read = models.BooleanField(
        default=False
    )

    def __str__(self):
        return (
            f"{self.sender.username} → "
            f"{self.receiver.username}"
        )