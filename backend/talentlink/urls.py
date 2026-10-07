from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse


def home(request):
    return JsonResponse({
        "message": "TalentLink API is running successfully 🚀",
        "status": "online"
    })


urlpatterns = [

    # API HOME
    path('', home, name='home'),

    # ADMIN
    path('admin/', admin.site.urls),

    # API
    path('api/', include('users.urls')),
]
