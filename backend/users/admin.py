from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User ,Profile, Project , Proposal


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ("Role Information", {"fields": ("role",)}),
    )

    add_fieldsets = UserAdmin.add_fieldsets + (
        ("Role Information", {"fields": ("role",)}),
    )
@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'full_name', 'location')

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'client', 'budget', 'created_at')

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "client":
            kwargs["queryset"] = User.objects.filter(role="client")
        return super().formfield_for_foreignkey(db_field, request, **kwargs)


admin.site.register(Proposal)

# Register your models here.
