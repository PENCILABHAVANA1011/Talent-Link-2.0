from rest_framework import serializers
from .models import User, Profile ,Project, Proposal


class RegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'role']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            role=validated_data['role']
        )
        return user


class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = ['full_name', 'bio', 'location']
class ProjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = Project
        fields = [
            'id',
            'title',
            'description',
            'budget',
            'status',
            'created_at'
        ]
        read_only_fields = ['id', 'created_at']

class ProposalSerializer(serializers.ModelSerializer):

    class Meta:
        model = Proposal
        fields = [
            'id',
            'project',
            'freelancer',
            'cover_letter',
            'bid_amount',
            'duration_days',
            'status',
            'created_at'
        ]
        read_only_fields = [
            'id',
            'freelancer',
            'status',
            'created_at'
        ]