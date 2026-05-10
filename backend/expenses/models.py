from django.db import models
from django.contrib.auth.models import User


class Expense(models.Model):
    # Every expense is owned by a user.
    # on_delete=CASCADE → if user is deleted, their expenses go too.
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="expenses",null=True,blank=True)

    title = models.CharField(max_length=225)

    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
    )

    category = models.CharField(max_length=100)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.user.username} — {self.title}"