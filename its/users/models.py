from django.db import models
from django.contrib.auth.models import AbstractBaseUser, UserManager


class User(AbstractBaseUser):
    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=255)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    username = models.CharField(max_length=255, unique=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    # For new possible owner, item checkin, set their user to inactive.
    # Auto generate a unique username for people without odin accounts.
    # For student workers / staff set to to true.
    is_active = models.BooleanField(default=True, blank=True, help_text="Inactive users cannot login")
    # for staff set to true.
    is_staff = models.BooleanField(default=False, blank=True)

    USERNAME_FIELD = 'username'

    objects = UserManager()

    class Meta:
        db_table = "user"
        ordering = ['last_name', 'first_name']

    #
    # These methods are required to work with Django's admin
    #
    def get_full_name(self):
        return self.last_name + ", " + self.first_name

    def get_short_name(self):
        return self.first_name + " " + self.last_name

    # we don't need granular permissions; all staff will have access to
    # everything
    def has_perm(self, perm, obj=None):
        return self.is_staff

    def has_module_perms(self, app_label):
        return self.is_staff

    def __str__(self):
        if self.last_name and self.first_name:
            return self.get_full_name()
        else:
            return self.email
