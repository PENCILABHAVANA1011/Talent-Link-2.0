from django.urls import path

from .views import (
    ProfileView,
    RegisterView,
    ProjectListCreateView,
    ProjectUpdateView,
    FreelancerProjectFeedView,
    ProposalCreateView,
    FreelancerProposalListView,
    ClientProposalListView,
    ProposalStatusUpdateView,
    ClientContractListView,
    FreelancerContractListView,
    ContractDetailView,
    ContractStatusUpdateView,
    ReviewCreateView,
    ContractReviewListView,
    MessageListCreateView,
)


urlpatterns = [

    path(
        'register/',
        RegisterView.as_view(),
        name='register'
    ),

    path(
        'profile/',
        ProfileView.as_view(),
        name='profile'
    ),

    path(
        'projects/',
        ProjectListCreateView.as_view(),
        name='projects'
    ),

    path(
        'projects/<int:pk>/',
        ProjectUpdateView.as_view(),
        name='project-update'
    ),

    path(
        'freelancer/projects/',
        FreelancerProjectFeedView.as_view(),
        name='freelancer-projects'
    ),

    path(
        'proposals/',
        ProposalCreateView.as_view(),
        name='create-proposal'
    ),

    path(
        'freelancer/proposals/',
        FreelancerProposalListView.as_view(),
        name='freelancer-proposals'
    ),

    path(
        'client/proposals/',
        ClientProposalListView.as_view(),
        name='client-proposals'
    ),

    path(
        'proposals/<int:pk>/status/',
        ProposalStatusUpdateView.as_view(),
        name='proposal-status-update'
    ),

    path(
    'client/contracts/',
    ClientContractListView.as_view(),
    name='client-contracts'
    ),
    path(
    'freelancer/contracts/',
    FreelancerContractListView.as_view(),
    name='freelancer-contracts'
    ),

    path(
    'contracts/<int:pk>/',
    ContractDetailView.as_view(),
    name='contract-detail'
    ),

    path(
    'contracts/<int:pk>/status/',
    ContractStatusUpdateView.as_view(),
    name='contract-status-update'
    ),
        path(
        'reviews/',
        ReviewCreateView.as_view(),
        name='review-create'
    ),

    path(
        'contracts/<int:contract_id>/reviews/',
        ContractReviewListView.as_view(),
        name='contract-reviews'
    ),
    path(
    "contracts/<int:contract_id>/messages/",
    MessageListCreateView.as_view(),
    name="contract-messages"
),
]