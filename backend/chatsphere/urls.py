from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# Create a router for our API viewsets
router = DefaultRouter()

# Core API endpoints
router.register(r'users', views.UserViewSet)
router.register(r'profiles', views.UserProfileViewSet)
router.register(r'subscription-plans', views.SubscriptionPlanViewSet)
router.register(r'bots', views.BotViewSet)
router.register(r'documents', views.DocumentViewSet)
router.register(r'chunks', views.ChunkViewSet)
router.register(r'conversations', views.ConversationViewSet)
router.register(r'messages', views.MessageViewSet)

# Legacy API endpoints (for backward compatibility)
router.register(r'rooms', views.ChatRoomViewSet)
router.register(r'legacy-messages', views.LegacyMessageViewSet)

urlpatterns = [
    path('', include(router.urls)),
    # Include authentication URLs for browsable API
    path('auth/', include('rest_framework.urls')),
] 