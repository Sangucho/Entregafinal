from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('zapatillas.html', views.zapatillas, name='zapatillas'),
    path('catalogo/', views.catalogo, name='catalogo'),
    path('carrito/', views.carrito, name='carrito'),
    path('registro/', views.registro, name='registro'),
    path('login/', views.login, name='login'),
    path('infozcZC/', views.infozcZC, name='infozcZC'),
    path('zapatillas/<int:producto_id>/', views.zapatillas, name='zapatillas'),

]
