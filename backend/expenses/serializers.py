from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Expense


# ── Auth ──────────────────────────────────────────────────────────────────────
class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model  = User
        fields = ("username", "email", "password")

    def create(self, validated_data):
        # create_user() hashes the password automatically — NEVER store plain text
        return User.objects.create_user(
            username=validated_data["username"],
            email=validated_data.get("email", ""),
            password=validated_data["password"],
        )


# ── Expense ───────────────────────────────────────────────────────────────────
class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Expense
        fields = ["id", "title", "amount", "category", "created_at"]
        read_only_fields = ["id", "created_at"]
        # NOTE: "user" is intentionally excluded from fields.
        # It is set automatically in the view via perform_create(),
        # so the frontend never needs to send it.