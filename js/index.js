// URL para la solicitud de la API
const URL_FETCH =
  "https://66269dbf052332d553237ae6.mockapi.io/api/nachogram/reels/Reels";

document.addEventListener("DOMContentLoaded", function () {
  // Función para cargar los datos
  async function fetchData() {
    try {
      const request = await fetch(URL_FETCH);
      const response = await request;

      if (response.ok) {
        let data = await response.json();

        if (data.length > 0) {
          // Convertir las fechas a objetos Date
          data.forEach((item) => {
            item.fecha = new Date(item.fecha);
          });

          // Ordenar los datos por fecha (de más reciente a más antigua)
          data.sort((a, b) => b.fecha - a.fecha);

          // Generar las cards en el DOM
          data.forEach((item) => {
            const cardHtml = createCard(item);
            document.getElementById("cards-container").innerHTML += cardHtml;
          });
        } else {
          showNoReelsCard(); // Mostrar la tarjeta de "No se han encontrado elementos"
        }
      } else {
        showNoReelsCard(); // Mostrar la tarjeta de "No se han encontrado elementos" en caso de respuesta no exitosa
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Función para mostrar la tarjeta de "No se han encontrado elementos"
  function showNoReelsCard() {
    const cardHtml = noReelsCard();
    document.getElementById("cards-container").innerHTML += cardHtml;
  }

  // Función para crear la tarjeta de imagen
  function createCard(data) {
    const formattedDate = formatDate(data.fecha);
    const formattedTime = formatTime(data.fecha);
    return `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${data.url}" class="card-img-top" alt="imagen">
                    <div class="card-body">
                        <h5 class="card-title">${data.descripcion}</h5>
                        <p class="card-text">Fecha: ${formattedDate}</p>
                        <p class="card-text">Hora: ${formattedTime}</p>
                    </div>
                </div>
            </div>
        `;
  }
  // Función para formatear la fecha (DD/MM/YYYY)
  function formatDate(date) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return date.toLocaleDateString("es-ES", options);
  }

  // Función para formatear la hora (HH:MM:SS)
  function formatTime(date) {
    const options = { hour: "2-digit", minute: "2-digit", second: "2-digit" };
    return date.toLocaleTimeString("es-ES", options);
  }
  // Función para crear la tarjeta de "No se han encontrado elementos"
  function noReelsCard() {
    return `
            <div class="col-md-2 mt-5">
                <div class="card mt-3">
                    <img src="./img/NoFound.png" class="card-img-top" alt="imagen">
                    <div class="card-body">
                        <h5 class="card-title">No se han encontrado elementos</h5>
                    </div>
                </div>
            </div>
        `;
  }

  fetchData();

  // Evento click para href y visual
  const btnCapturar = document.querySelector("button#btn-camara");
  btnCapturar.addEventListener("click", () => {
    blueScreen.style.opacity = "0.7";
    // Simular una carga
    setTimeout(function () {
      setTimeout(function () {
        blueScreen.style.opacity = "0";
        loader.style.display = "none";
        window.location.href = "camara.html";
      }, 500);
    }, 1500);
    loader.style.display = "inline-block";
  });
});
