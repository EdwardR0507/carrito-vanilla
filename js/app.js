const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const listaCursos = document.querySelector("#lista-cursos");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");

let articulosCarrito = [];

const limpiarHTML = () => {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
};

const carritoHTML = () => {
  limpiarHTML();
  // Imprimir articulos del carrito
  articulosCarrito.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
        <img src="${imagen}" width="100">
      </td>
      <td>
        ${titulo}
      </td>
      <td>
        ${precio}
      </td>
      <td>
        ${cantidad}
      </td>
      <td>
        <a href="#" class="borrar-curso" data-id=${id}> X </a>
      </td>
      `;

    contenedorCarrito.appendChild(row);
  });
};

// Extraer datos del curso
const leerDatosCurso = (curso) => {
  return {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };
};

const agregarCurso = (e) => {
  e.preventDefault();
  // Verificar si el elemento contiene la clase agregar-carrito
  if (e.target.classList.contains("agregar-carrito")) {
    const curso = e.target.parentElement.parentElement;
    const infoCurso = leerDatosCurso(curso);
    const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
    if (existe) {
      // Actualizar cantidad
      const curso = articulosCarrito.find((curso) => curso.id === infoCurso.id);
      curso.cantidad++;
    } else {
      // Añadir al carrito
      articulosCarrito = [...articulosCarrito, infoCurso];
    }
    carritoHTML();
  }
};

const eliminarCurso = (e) => {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");
    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);
    carritoHTML();
  }
};

const vaciarCarrito = () => {
  articulosCarrito = [];
  limpiarHTML();
};

// Agregar elementos al carrito
const agregar = () => {
  listaCursos.addEventListener("click", agregarCurso);
  carrito.addEventListener("click", eliminarCurso);
  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
};
agregar();
