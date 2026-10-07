from rest_framework import serializers
from .models import User, Profile ,Project, Proposal , Contract , Review , Message


class RegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'password',
            'role'
        ]

        extra_kwargs = {
            'password': {
                'write_only': True
            },
            'email': {
                'required': False,
                'allow_blank': True
            }
        }

    def create(self, validated_data):

        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password'],
            role=validated_data.get('role', 'freelancer')
        )

        return user


class ProfileSerializer(serializers.ModelSerializer):

    role = serializers.CharField(
        source='user.role',
        read_only=True
    )

    average_rating = serializers.SerializerMethodField()

    review_count = serializers.SerializerMethodField()

    class Meta:
        model = Profile

        fields = [
            'full_name',
            'bio',
            'location',
            'role',
            'average_rating',
            'review_count',
        ]

    def get_average_rating(self, obj):

        reviews = obj.user.received_reviews.all()

        if not reviews.exists():
            return 0

        total = sum(
            review.rating
            for review in reviews
        )

        return round(
            total / reviews.count(),
            1
        )

    def get_review_count(self, obj):

        return obj.user.received_reviews.count()


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

class ProposalStatusSerializer(serializers.ModelSerializer):

    class Meta:
        model = Proposal
        fields = ['status']

class ContractSerializer(serializers.ModelSerializer):

    class Meta:
        model = Contract
        fields = [
            'id',
            'project',
            'client',
            'freelancer',
            'bid_amount',
            'duration_days',
            'status',
            'created_at'
        ]

        read_only_fields = [
            'id',
            'client',
            'freelancer',
            'bid_amount',
            'duration_days',
            'status',
            'created_at'
        ]
class ContractStatusSerializer(serializers.ModelSerializer):

    class Meta:
        model = Contract
        fields = ['status']


class ReviewSerializer(serializers.ModelSerializer):

    reviewer_name = serializers.CharField(
        source='reviewer.username',
        read_only=True
    )

    reviewee_name = serializers.CharField(
        source='reviewee.username',
        read_only=True
    )

    class Meta:
        model = Review
        fields = [
            'id',
            'contract',
            'reviewer',
            'reviewer_name',
            'reviewee',
            'reviewee_name',
            'rating',
            'comment',
            'created_at'
        ]

        read_only_fields = [
            'id',
            'reviewer',
            'reviewer_name',
            'reviewee',
            'reviewee_name',
            'created_at'
        ]

class MessageSerializer(serializers.ModelSerializer):

    sender_name = serializers.CharField(
        source="sender.username",
        read_only=True
    )

    receiver_name = serializers.CharField(
        source="receiver.username",
        read_only=True
    )

    class Meta:
        model = Message

        fields = [
            "id",
            "contract",
            "sender",
            "sender_name",
            "receiver",
            "receiver_name",
            "content",
            "created_at",
            "is_read",
        ]

        read_only_fields = [
            "id",
            "contract",
            "sender",
            "sender_name",
            "receiver",
            "receiver_name",
            "created_at",
            "is_read",
        ]
