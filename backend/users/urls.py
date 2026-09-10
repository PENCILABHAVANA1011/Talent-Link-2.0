from django.urls import path

from .views import (
    ProfileView,
    RegisterView,
    ProjectListCreateView,
    ProjectUpdateView,
    FreelancerProjectFeedView,
    ProposalCreateView,
    ClientProposalListView,
    ProposalStatusUpdateView,
)

urlpatterns = [

    path('register/', RegisterView.as_view(), name='register'),

    path('profile/', ProfileView.as_view(), name='profile'),

    path('projects/', ProjectListCreateView.as_view(), name='projects'),

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
        'client/proposals/',
        ClientProposalListView.as_view(),
        name='client-proposals'
    ),

    path(
        'proposals/<int:pk>/status/',
        ProposalStatusUpdateView.as_view(),
        name='proposal-status-update'
    ),
]