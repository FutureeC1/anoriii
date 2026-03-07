from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

# Using standard SimpleJWT views for login/refresh
# No custom logic needed for now, but we can wrap them if required
