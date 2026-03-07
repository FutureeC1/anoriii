from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, ProductViewSet, health_check, AdminProductViewSet, AdminImageViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='categories')
router.register(r'products', ProductViewSet, basename='products')

# Admin routers
admin_router = DefaultRouter()
admin_router.register(r'products', AdminProductViewSet, basename='admin-products')
admin_router.register(r'images', AdminImageViewSet, basename='admin-images')

urlpatterns = [
    path('health/', health_check, name='health'),
    path('', include(router.urls)),
    path('admin-api/', include(admin_router.urls)),
]
