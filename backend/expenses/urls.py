from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import SignupView, MeView, ExpenseListCreateView, ExpenseDetailView

urlpatterns = [
    # ── Auth ──────────────────────────────────────────────────────────────────
    path("signup/",        SignupView.as_view(),         name="signup"),
    path("login/",         TokenObtainPairView.as_view(),name="login"),   # returns access + refresh
    path("token/refresh/", TokenRefreshView.as_view(),   name="token_refresh"),
    path("me/",            MeView.as_view(),             name="me"),

    # ── Expenses (same paths as before — nothing breaks) ──────────────────────
    path("expenses/",          ExpenseListCreateView.as_view(), name="expense-list-create"),
    path("expenses/<int:pk>/", ExpenseDetailView.as_view(),     name="expense-detail"),
]