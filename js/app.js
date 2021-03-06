// Elementos
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const listaCursos = document.querySelector("#lista-cursos");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");

// Variables
let articulosCarrito = [];

// Funciones
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
      <td class="lista-carrito-row">
        <div class="image-container">
          <img src="${imagen}" class="image-curso" alt="imagen curso">
        </div>
      </td>
      <td class="lista-carrito-row">
        ${titulo}
      </td>
      <td class="lista-carrito-row">
        ${precio}
      </td>
      <td class="lista-carrito-row">
        ${cantidad}
      </td>
      <td>
        <a href="#" class="borrar-curso" data-id=${id}>X</a>
      </td>
      `;

    contenedorCarrito.appendChild(row);
  });
  window.localStorage.setItem("cursos", JSON.stringify(articulosCarrito));
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
      // A??adir al carrito
      articulosCarrito = [...articulosCarrito, infoCurso];
    }
    carritoHTML();
  }
};

const eliminarCurso = (e) => {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");
    const cursos = articulosCarrito.filter((curso) => {
      if (curso.cantidad > 1 && curso.id === cursoId) {
        curso.cantidad--;
        return curso;
      }
      return curso.id !== cursoId;
    });
    articulosCarrito = [...cursos];
    carritoHTML();
  }
};

const vaciarCarrito = () => {
  articulosCarrito = [];
  window.localStorage.setItem("cursos", JSON.stringify(articulosCarrito));
  limpiarHTML();
};

// Eventos
const eventos = () => {
  // Recuperar cursos del localStorage
  document.addEventListener("DOMContentLoaded", () => {
    articulosCarrito = JSON.parse(window.localStorage.getItem("cursos")) || [];
    carritoHTML();
  });
  // Agregar al carrito
  listaCursos.addEventListener("click", agregarCurso);
  // Eliminar del carrito
  carrito.addEventListener("click", eliminarCurso);
  // Vaciar carrito
  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
};
eventos();
