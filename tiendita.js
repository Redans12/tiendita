// Lista de productos disponibles
const productos = [
    { id: 'arroz', nombre: 'Arroz 900gr', precio: 20.00, cantidad: 50 },
    { id: 'frijoles', nombre: 'Frijoles 1kg', precio: 25.00, cantidad: 30 },
    { id: 'azucar', nombre: 'Azúcar 2kg', precio: 25.00, cantidad: 20 },
    { id: 'platano', nombre: 'Plátano', precio: 40.00, cantidad: 10 },
    { id: 'sal', nombre: 'Sal 1kg', precio: 30.00, cantidad: 20 },
    { id: 'leche', nombre: 'Leche 1lt', precio: 20.00, cantidad: 50 },
    { id: 'coca', nombre: 'CocaCola 3lt', precio: 45.00, cantidad: 30 },
    { id: 'sabritas', nombre: 'Sabritas Originales', precio: 23.00, cantidad: 20 }
];

let carrito = [];

// Función para agregar productos al carrito
function agregarAlCarrito(id, cantidad) {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;

    cantidad = parseInt(cantidad);
    if (cantidad <= 0) {
        alert("Debes agregar al menos 1 unidad.");
        return;
    }

    // Verificar si ya está en el carrito
    let itemEnCarrito = carrito.find(item => item.id === id);
    
    // Si ya está en el carrito, sumamos la cantidad
    if (itemEnCarrito) {
        if (itemEnCarrito.cantidad + cantidad > producto.cantidad) {
            alert(`Solo puedes agregar ${producto.cantidad - itemEnCarrito.cantidad} más.`);
            return;
        }
        itemEnCarrito.cantidad += cantidad;
    } else {
        if (cantidad > producto.cantidad) {
            alert(`Solo hay ${producto.cantidad} unidades disponibles.`);
            return;
        }
        carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad });
    }

    actualizarCarrito();
    actualizarContadorCarrito();
}

// Función para actualizar el carrito en pantalla
function actualizarCarrito() {
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");
    cartItems.innerHTML = "";
    
    let total = 0;
    carrito.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.nombre} x${item.cantidad} - $${(item.cantidad * item.precio).toFixed(2)}`;
        cartItems.appendChild(li);
        total += item.cantidad * item.precio;
    });

    totalPrice.textContent = total.toFixed(2);
}

// Función para actualizar el contador del icono del carrito
function actualizarContadorCarrito() {
    const cartCount = document.getElementById("cart-count");
    if (!cartCount) return;
    
    // Calcular el número total de productos en el carrito
    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
    cartCount.textContent = totalItems;
    
    // Mostrar u ocultar el contador según corresponda
    cartCount.style.display = totalItems > 0 ? "flex" : "none";
}

// Función para realizar la compra
function realizarCompra() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    // Mostrar mensaje de compra exitosa
    const mensajeCompra = document.getElementById("mensaje-compra");
    mensajeCompra.style.display = "block";

    // Limpiar carrito y total
    carrito = [];
    actualizarCarrito();
    actualizarContadorCarrito();

    // Opcionalmente, ocultar el mensaje después de unos segundos
    setTimeout(() => {
        mensajeCompra.style.display = "none";
    }, 3000);
}

// Función para desplazarse al resumen del carrito
function scrollToCart() {
    const cartSummary = document.getElementById("cart-summary");
    if (cartSummary) {
        cartSummary.scrollIntoView({ behavior: 'smooth' });
    }
}

// Función para desplazarse al inicio de la página
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Asignar eventos a los botones de agregar
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", (event) => {
        const productElement = event.target.closest(".product");
        const id = productElement.id;
        const cantidadInput = productElement.querySelector(".quantity");
        const cantidad = cantidadInput.value;

        agregarAlCarrito(id, cantidad);
    });
});

// Asignar evento al botón de realizar compra
document.getElementById("realizar-compra").addEventListener("click", realizarCompra);

// Asignar eventos cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", function() {
    // Evento para el icono del carrito
    const cartIcon = document.getElementById("cart-icon");
    if (cartIcon) {
        cartIcon.addEventListener("click", scrollToCart);
    }
    
    // Evento para el logo (scroll to top)
    const logoContainer = document.querySelector(".logo-container");
    if (logoContainer) {
        logoContainer.style.cursor = "pointer"; // Cambiar el cursor a pointer para indicar que es clickeable
        logoContainer.addEventListener("click", scrollToTop);
    }
    
    // Inicializar el contador del carrito
    actualizarContadorCarrito();
});