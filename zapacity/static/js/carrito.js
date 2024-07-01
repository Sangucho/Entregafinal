document.addEventListener('DOMContentLoaded', () => {
    console.log('El DOM ha sido cargado');

    // Selección de elementos del DOM
    const agregarCarritoBtns = document.querySelectorAll('.agregar-carrito');
    const carrito = document.querySelector('.lista-carrito');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
    const procesarPedidoBtn = document.getElementById('procesar-pedido');
    const totalSpan = document.getElementById('total');

    // Agregar eventos a los botones de "Agregar al carrito"
    agregarCarritoBtns.forEach(btn => {
        btn.addEventListener('click', agregarProductoAlCarrito);
    });

    // Función para agregar un producto al carrito
    function agregarProductoAlCarrito(event) {
        console.log('Producto agregado al carrito');
        const btn = event.target;
        const nombre = btn.dataset.nombre;
        const precio = parseFloat(btn.dataset.precio);

        const producto = {
            nombre: nombre,
            precio: precio
        };

        agregarProductoAlHTML(producto);
        calcularTotal();
    }

    // Función para agregar el producto al HTML del carrito
    function agregarProductoAlHTML(producto) {
        const row = document.createElement('li');
        row.innerHTML = `
            <p>${producto.nombre} - $${producto.precio.toFixed(2)}</p>
            <button class="borrar-producto">X</button>
        `;
        carrito.appendChild(row);
    }

    // Función para calcular el total del carrito
    function calcularTotal() {
        let total = 0;
        const productos = carrito.querySelectorAll('li');
        productos.forEach(producto => {
            const precioProducto = parseFloat(producto.textContent.split('-')[1].trim().slice(1));
            total += precioProducto;
        });
        totalSpan.textContent = total.toFixed(2);
    }

    // Evento para vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        carrito.innerHTML = '';
        totalSpan.textContent = '0';
    });

    // Evento para eliminar un producto del carrito
    carrito.addEventListener('click', eliminarProducto);

    function eliminarProducto(event) {
        if (event.target.classList.contains('borrar-producto')) {
            const productoAEliminar = event.target.parentElement;
            productoAEliminar.remove();
            calcularTotal();
        }
    }
});