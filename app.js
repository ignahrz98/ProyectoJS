// VARIABLES //
let nombreForm = document.querySelector("#nombre");
let correoForm = document.querySelector("#correo");
let carrito = JSON.parse(localStorage.getItem("carrito")) || []

// Archivos LocalStorage //

const addCart = () => {localStorage.setItem("carrito", JSON.stringify(carrito));};

nombreForm.addEventListener("input", function () {
	if (nombreForm.value === "") {
		console.log("Ingrese un nombre válido");
	}
});

correoForm.addEventListener("input", function () {
	if (correoForm.value === "") {
		console.log("Ingrese un correo electrónico válido");
	}
});

let formulario = document.querySelector("#formulario");
let datosCliente = document.querySelector(".datosCliente");

const pintarInfo = formulario.addEventListener("submit", function (e) {
	e.preventDefault();
	datosCliente.innerHTML = `<h5> Muchas gracias ${nombreForm.value} por loguearte en nuestra pagina!!!, te enviaremos un mail a ${correoForm.value} para coordinar los detalles de tu compra.</h5></div>`;
});

// SYNC Y AWAIT //

const lista = document.querySelector("#listado");

const mostrarProd = async () => {
	const resp = await fetch("./data.json");
	const data = await resp.json();

	data.forEach((producto) => {
		const card = document.createElement("card");
		card.innerHTML = `
            <div class="card m-2 mt-2 mb-2 g-3 align-items-center" style="width: 25rem;">
            <img src="${producto.img}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title text-center">${producto.nombre}</h5>
            <p class="card-text text-center">${producto.precio}</p>
            <button id="${producto.id}" class="btn btnComprar btn-primary">AÑADIR AL CARRITO</button>
            </div>
            </div>`;

		lista.append(card);
	});
	let btnComprar = document.querySelectorAll(".btnComprar");
	console.log(btnComprar);
	btnComprar.forEach((el) => {
		el.addEventListener("click", (e) => {
			agregarCarrito(e.target.id, data);
		});
	});
};

mostrarProd();

function agregarCarrito(id, data) {
	console.log(data);
	console.log(id);

	const prendaElejida = data.find((el) => el.id === parseInt(id));
	console.log(prendaElejida);
	carrito.push(prendaElejida);
    addCart();

}


const suCarrito = document.getElementById("carrito");

if(localStorage.getItem("carrito")){
	
	console.log("esta guardado")
}else{ 
	console.log("no esta guardado");
	localStorage.setItem("carrito",JSON.stringify(carrito));
}

let productosUnicos = [];

carrito.forEach(item => {
	if (productosUnicos[item.id]) {
	productosUnicos[item.id].cantidad++;
	} else {
	productosUnicos[item.id] = {...item, cantidad: 1};
	}
	});


// PINTAR CARRITO EN EL DOM //

const productosUnicosContainer = document.querySelector("#productosUnicos");

function mostrarProductos () {
    productosUnicos.forEach((producto) => {
        const div = document.createElement("div");
        div.innerHTML += `
		<div class="d-flex justify-content-between align-items-center p-2">
		<div class="col-3 ">
          <img src="${producto.img}" style="width: 10rem;" alt="">
		</div>
        <div class="col-2 p-3 text-center border">
              <h3>PRODUCTO: ${producto.nombre}</h3>
              <h3>PRECIO: $${producto.precio}</h3>
			  <h3>CANTIDAD: ${producto.cantidad}</h3>
        </div>
		<div class="justify-content-between p-5">
          <button type="button" class="btn btn-danger" id="${producto.id}">ELIMINAR</button>;
          <button type="button" class="btn btn-success">AGREGAR</button>

        </div>
		<hr>
		` 
        productosUnicosContainer.appendChild(div);
 });
 const eliminarCantidad = document.querySelectorAll(".btn-danger");
 eliminarCantidad.forEach((el) => {
 el.addEventListener("click", (e) => {
 const id = e.target.id;
 productosUnicos = productosUnicos.filter((producto) => producto.id != id);
 localStorage.setItem("carrito", JSON.stringify(productosUnicos));
 productosUnicosContainer.innerHTML = "";
mostrarProductos();

});
});
}
mostrarProductos();



// FUNCION BOTON "LIMPIAR TODO"
const borrarTodo = document.querySelector("#borrar-todo");
borrarTodo.addEventListener("click", function(){
    
	document.querySelector("#productosUnicos").innerHTML = "";
	carrito = []
	addCart()
});
