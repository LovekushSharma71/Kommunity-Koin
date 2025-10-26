from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'communities', views.CommunityViewSet)
router.register(r'loans', views.LoanViewSet)
router.register(r'syndicates', views.LendingSyndicateViewSet)

urlpatterns = [
    path('', include(router.urls)),
]