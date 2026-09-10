from rest_framework import generics
from rest_framework.permissions import IsAuthenticated,BasePermission
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Profile ,Project , Proposal
from .serializers import RegisterSerializer, ProfileSerializer ,ProjectSerializer , ProposalSerializer


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = Profile.objects.get(user=request.user)
        serializer = ProfileSerializer(profile)

        return Response(serializer.data)

class ProjectListCreateView(generics.ListCreateAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Project.objects.all()

    def perform_create(self, serializer):
        serializer.save(client=self.request.user)


class IsFreelancer(BasePermission):

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and request.user.role == 'freelancer'
        )


class FreelancerProjectFeedView(generics.ListAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [IsFreelancer]

    def get_queryset(self):
        return Project.objects.all().order_by('-created_at')

class ProposalCreateView(generics.CreateAPIView):
    serializer_class = ProposalSerializer
    permission_classes = [IsFreelancer]

    def perform_create(self, serializer):
        serializer.save(freelancer=self.request.user)

class ClientProposalListView(generics.ListAPIView):
    serializer_class = ProposalSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Proposal.objects.filter(
            project__client=self.request.user
        ).order_by('-created_at')

class ProposalStatusUpdateView(generics.UpdateAPIView):
    serializer_class = ProposalSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Proposal.objects.filter(
            project__client=self.request.user
        )

    def perform_update(self, serializer):
        serializer.save()


class ProjectUpdateView(generics.UpdateAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Project.objects.filter(
            client=self.request.user
        )


