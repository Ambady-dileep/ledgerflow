from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Expense
from .serializers import ExpenseSerializer, SignupSerializer


# ── POST /api/signup/ ─────────────────────────────────────────────────────────
class SignupView(APIView):
    permission_classes = [AllowAny]  # no token needed to create an account

    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            # Issue tokens right away so the user is immediately logged in
            refresh = RefreshToken.for_user(user)
            return Response(
                {
                    "message": "Account created successfully.",
                    "access":  str(refresh.access_token),
                    "refresh": str(refresh),
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# POST /api/login/         → handled by SimpleJWT's TokenObtainPairView (see urls.py)
# POST /api/token/refresh/ → handled by SimpleJWT's TokenRefreshView   (see urls.py)


# ── GET /api/me/ ──────────────────────────────────────────────────────────────
class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(
            {
                "id":       request.user.id,
                "username": request.user.username,
                "email":    request.user.email,
            }
        )


# ── /api/expenses/ ────────────────────────────────────────────────────────────
class ExpenseListCreateView(generics.ListCreateAPIView):
    serializer_class   = ExpenseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # ONLY return expenses that belong to the currently logged-in user
        return Expense.objects.filter(user=self.request.user).order_by("-created_at")

    def perform_create(self, serializer):
        # Automatically attach the logged-in user when saving a new expense
        serializer.save(user=self.request.user)


class ExpenseDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class   = ExpenseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Users can only read/edit/delete their own expenses
        return Expense.objects.filter(user=self.request.user)