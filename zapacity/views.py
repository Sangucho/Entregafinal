from django.shortcuts import render, get_object_or_404
import requests  # Importamos requests aquí para usarlo en la vista home
from .models import Producto

# Vista para la página de inicio
def home(request):
    api_url = 'http://localhost:8000/api/zapatos/'  # Reemplaza con tu URL de API local

    try:
        response = requests.get(api_url)
        if response.status_code == 200:
            zapatos = response.json()
        else:
            zapatos = []
            print(f"Error al obtener datos del API: {response.status_code}")
    except requests.exceptions.RequestException as e:
        print(f"Error de conexión con el API: {str(e)}")
        zapatos = []

    return render(request, 'home.html', {'zapatos': zapatos})

# Vista para la página del catálogo
def catalogo(request):
    # Puedes agregar lógica adicional para mostrar productos del catálogo si es necesario
    return render(request, 'catalogo.html')

# Vista para la página de registro
def registro(request):
    return render(request, 'registro.html')

# Vista para la página de inicio de sesión
def login(request):
    return render(request, 'login.html')

# Vista para una página de información adicional
def infozcZC(request):
    return render(request, 'infozcZC.html')

# Vista para la página de detalles de zapatillas
def zapatillas(request, producto_id):
    producto = get_object_or_404(Producto, pk=producto_id)
    return render(request, 'zapatillas.html', {'producto': producto})

# Vista para la página del carrito de compras
def carrito(request):
    carrito = request.session.get('carrito', {})
    productos_carrito = list(carrito.values())  # Convertimos el diccionario de carrito en una lista de productos
    total = sum(float(producto['precio']) for producto in productos_carrito)  # Calculamos el total del carrito
    return render(request, 'carrito.html', {'productos_carrito': productos_carrito, 'total': total})

def zapatillas(request):
    return render(request, 'zapatillas.html')
