from django.db import transaction

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import (
    Profile,
    Project,
    Proposal,
    Contract,
    Review,
    Message,
)

from .serializers import (
    RegisterSerializer,
    ProfileSerializer,
    ProjectSerializer,
    ProposalSerializer,
    ProposalStatusSerializer,
    ContractSerializer,
    ContractStatusSerializer,
    ReviewSerializer,
    MessageSerializer,
)


# =========================================================
# REGISTER
# =========================================================

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer


# =========================================================
# PROFILE
# =========================================================

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        profile, created = Profile.objects.get_or_create(
            user=request.user
        )

        serializer = ProfileSerializer(profile)

        return Response(serializer.data)

    def put(self, request):

        profile, created = Profile.objects.get_or_create(
            user=request.user
        )

        serializer = ProfileSerializer(
            profile,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():

            serializer.save()

            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=400
        )


# =========================================================
# CLIENT PROJECTS
# =========================================================

class ProjectListCreateView(generics.ListCreateAPIView):

    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return Project.objects.filter(
            client=self.request.user
        ).order_by("-created_at")

    def perform_create(self, serializer):

        serializer.save(
            client=self.request.user
        )


# =========================================================
# FREELANCER PERMISSION
# =========================================================

class IsFreelancer(BasePermission):

    def has_permission(self, request, view):

        return (
            request.user.is_authenticated
            and request.user.role == "freelancer"
        )


# =========================================================
# FREELANCER PROJECT FEED
# =========================================================

class FreelancerProjectFeedView(generics.ListAPIView):

    serializer_class = ProjectSerializer
    permission_classes = [IsFreelancer]

    def get_queryset(self):

        return Project.objects.filter(
            status="open"
        ).order_by("-created_at")


# =========================================================
# CREATE PROPOSAL
# =========================================================

class ProposalCreateView(generics.CreateAPIView):

    serializer_class = ProposalSerializer
    permission_classes = [IsFreelancer]

    def perform_create(self, serializer):

        serializer.save(
            freelancer=self.request.user
        )


# =========================================================
# FREELANCER MY PROPOSALS
# =========================================================

class FreelancerProposalListView(generics.ListAPIView):

    serializer_class = ProposalSerializer
    permission_classes = [IsFreelancer]

    def get_queryset(self):

        return Proposal.objects.filter(
            freelancer=self.request.user
        ).order_by("-created_at")


# =========================================================
# CLIENT PROPOSALS
# =========================================================

class ClientProposalListView(generics.ListAPIView):

    serializer_class = ProposalSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return Proposal.objects.filter(
            project__client=self.request.user
        ).order_by("-created_at")


# =========================================================
# ACCEPT / REJECT PROPOSAL
# =========================================================

class ProposalStatusUpdateView(generics.UpdateAPIView):

    serializer_class = ProposalStatusSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return Proposal.objects.filter(
            project__client=self.request.user
        )

    @transaction.atomic
    def perform_update(self, serializer):

        proposal = serializer.save()

        # =================================================
        # ACCEPT PROPOSAL
        # =================================================

        if proposal.status == "accepted":

            project = proposal.project

            # ---------------------------------------------
            # Create Contract
            # ---------------------------------------------

            Contract.objects.get_or_create(

                project=project,

                defaults={
                    "client": project.client,
                    "freelancer": proposal.freelancer,
                    "bid_amount": proposal.bid_amount,
                    "duration_days": proposal.duration_days,
                    "status": "active",
                }
            )

            # ---------------------------------------------
            # Update Project Status
            # ---------------------------------------------

            project.status = "in_progress"

            project.save(
                update_fields=["status"]
            )

            # ---------------------------------------------
            # Reject Other Proposals
            # ---------------------------------------------

            Proposal.objects.filter(
                project=project
            ).exclude(
                id=proposal.id
            ).update(
                status="rejected"
            )


# =========================================================
# UPDATE PROJECT
# =========================================================

class ProjectUpdateView(generics.UpdateAPIView):

    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return Project.objects.filter(
            client=self.request.user
        )

# =========================================================
# CONTRACTS
# =========================================================

class ClientContractListView(generics.ListAPIView):

    serializer_class = ContractSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return Contract.objects.filter(
            client=self.request.user
        ).order_by("-created_at")


class FreelancerContractListView(generics.ListAPIView):

    serializer_class = ContractSerializer
    permission_classes = [IsFreelancer]

    def get_queryset(self):

        return Contract.objects.filter(
            freelancer=self.request.user
        ).order_by("-created_at")


# =========================================================
# CONTRACT DETAILS
# =========================================================

class ContractDetailView(generics.RetrieveAPIView):

    serializer_class = ContractSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        user = self.request.user

        if user.role == "client":

            return Contract.objects.filter(
                client=user
            )

        elif user.role == "freelancer":

            return Contract.objects.filter(
                freelancer=user
            )

        return Contract.objects.none()

class ContractStatusUpdateView(generics.UpdateAPIView):

    serializer_class = ContractSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return Contract.objects.filter(
            client=self.request.user
        )

    def perform_update(self, serializer):

        contract = serializer.save()

        if contract.status == "completed":

            project = contract.project

            project.status = "completed"

            project.save(
                update_fields=["status"]
            )

        elif contract.status == "cancelled":

            project = contract.project

            project.status = "cancelled"

            project.save(
                update_fields=["status"]
            )

class ContractStatusUpdateView(generics.UpdateAPIView):

    serializer_class = ContractStatusSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return Contract.objects.filter(
            client=self.request.user
        )

    def perform_update(self, serializer):

        contract = serializer.save()

        if contract.status == "completed":

            project = contract.project

            project.status = "completed"

            project.save(
                update_fields=["status"]
            )

        elif contract.status == "cancelled":

            project = contract.project

            project.status = "cancelled"

            project.save(
                update_fields=["status"]
            )

# =========================================================
# REVIEWS
# =========================================================

class ReviewCreateView(generics.CreateAPIView):

    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):

        contract = serializer.validated_data['contract']
        reviewer = self.request.user

        # Reviewer must be part of the contract
        if reviewer != contract.client and reviewer != contract.freelancer:
            from rest_framework.exceptions import PermissionDenied

            raise PermissionDenied(
                "You are not part of this contract."
            )

        # Contract must be completed
        if contract.status != "completed":
            from rest_framework.exceptions import ValidationError

            raise ValidationError(
                "You can review only completed contracts."
            )

        # Determine who receives the review
        if reviewer == contract.client:
            reviewee = contract.freelancer
        else:
            reviewee = contract.client

        # Prevent duplicate reviews
        if Review.objects.filter(
            contract=contract,
            reviewer=reviewer
        ).exists():

            from rest_framework.exceptions import ValidationError

            raise ValidationError(
                "You have already reviewed this contract."
            )

        serializer.save(
            reviewer=reviewer,
            reviewee=reviewee
        )


class ContractReviewListView(generics.ListAPIView):

    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return Review.objects.filter(
            contract__id=self.kwargs['contract_id']
        ).order_by("-created_at")
# =========================================================
# MESSAGES
# =========================================================

# =========================================================
# MESSAGES
# =========================================================

class MessageListCreateView(generics.ListCreateAPIView):

    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        contract_id = self.kwargs['contract_id']

        contract = Contract.objects.filter(
            id=contract_id
        ).first()

        if not contract:
            return Message.objects.none()

        # Only people belonging to the contract
        # can see its messages

        if (
            self.request.user != contract.client
            and self.request.user != contract.freelancer
        ):
            return Message.objects.none()

        return Message.objects.filter(
            contract=contract
        ).order_by("created_at")

    def perform_create(self, serializer):

        contract_id = self.kwargs['contract_id']

        contract = Contract.objects.filter(
            id=contract_id
        ).first()

        if not contract:
            from rest_framework.exceptions import NotFound

            raise NotFound("Contract not found.")

        sender = self.request.user

        # Sender must belong to the contract

        if (
            sender != contract.client
            and sender != contract.freelancer
        ):
            from rest_framework.exceptions import PermissionDenied

            raise PermissionDenied(
                "You are not part of this contract."
            )

        # Determine receiver

        if sender == contract.client:

            receiver = contract.freelancer

        else:

            receiver = contract.client

        serializer.save(
            contract=contract,
            sender=sender,
            receiver=receiver
        )
