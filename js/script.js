
const carrito = []

let p1 = {
    codigo:111, 
    nombre:'Lavadora', 
    precio:550000, 
    cantidad:2};
let p2 = {
    codigo:222, 
    nombre:'Tv', 
    precio:450000, 
    cantidad:3};
let p3 = {
    codigo:333, 
    nombre:'Refrigerador', 
    precio:300000, 
    cantidad:5};
let p4 = {
    codigo:444, 
    nombre:'Microondas', 
    precio:10, 
    cantidad:5};

const productos = [p1, p2, p3, p4];

const tablaProductos = document.querySelector('#productos');
const tablaCarrito = document.getElementById('carrito');
const totalVenta = document.getElementById('total');

const DataTable = (element, x) => {
    element.innerHTML = `
        <td>${x.codigo}</td>
        <td>${x.nombre}</td>
        <td>${x.cantidad}</td>
        <td>${x.precio}</td>
        <td>${x.total}</td>
    `; 
    return element;
};

const agregarProducto = (codigo) => {   

    productos.forEach(p => {
        if (codigo === p.codigo) {

            const venta = {
                codigo: p.codigo,
                nombre: p.nombre,
                cantidad: 1,
                precio: p.precio,
                total: p.precio
            };
            
            const fcode = carrito.find(f => f.codigo === codigo);
            let tr = document.createElement('tr'); 
            tr.setAttribute('id', `${p.codigo}`) 

            if (!fcode) {
                console.log(`Codigo ${codigo} NO encontrado`);
                carrito.push(venta);  

                carrito.forEach(c => {
                    if (codigo === c.codigo) {   
                        DataTable(tr, c);
                        p.cantidad -= 1;

                        tablaProductos.innerHTML = '';
                        cargarProductos();
                    };
                });

            } else { 
                console.log('Codigo encontrado');

                if (p.cantidad > 0) {
                    carrito.forEach(c => {
                        if (c.codigo === codigo) {
                            const data = document.getElementById(c.codigo);
                            data.innerHTML = '';
                            console.log(data);
    
                            c.cantidad++;
                            c.total = c.precio * c.cantidad; 
    
                            DataTable(data, c);
                            p.cantidad -= 1; 

                            tablaProductos.innerHTML = '';
                            cargarProductos();
                        };
                    });
                };
            };
            tablaCarrito.appendChild(tr);  
            console.log(productos);         
        };       
    });
    console.log(carrito);
}

const quitarProducto = (codigo) => {
    
}

const cargarProductos = () => {
    tablaProductos.innerHTML = '';
    let tr = document.createElement('tr');

    productos.forEach(p => {
        let tr = document.createElement('tr');

        let fila = `<td>
                        ${p.codigo}
                    </td>
                    <td>
                        ${p.nombre}
                    </td>
                    <td>
                        ${p.precio}
                    </td>
                    <td>
                        ${p.cantidad}
                    </td>
                    <td>
                        <div class="field is-grouped">
                            <div class="control">
                                <button id="agregar" class="button" onclick="agregarProducto(${p.codigo})"><i class="bi bi-plus"></i></button>
                            </div>
                            <div class="control">
                                <button id="quitar" class="button" onclick="quitarProducto(${p.codigo})"><i class="bi bi-dash-lg"></i></button>
                            </div>
                        </div>
                    </td>`;
        tr.innerHTML = fila;
        tablaProductos.appendChild(tr);
    })
}

cargarProductos();




