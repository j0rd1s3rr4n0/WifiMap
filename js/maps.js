// Función para cargar el mapa con Leaflet y los datos del JSON
function cargarMapaYDatos(
  latitudInicial,
  longitudInicial,
  zoomInicial,
  url,
  ciudad
) {
  // Crear un nuevo mapa con Leaflet
  var map = L.map("map").setView(
    [latitudInicial, longitudInicial],
    zoomInicial
  );

  // Agregar capa de OpenStreetMap al mapa
  // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  // }).addTo(map);
  var satelliteLayer = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
      maxZoom: 18,
      attribution:
        "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
    }
  ).addTo(map);

  // Cargar datos del JSON desde la URL
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error de red (" + response.status + ")");
      }
      return response.json();
    })
    .then((data) => {
      // Recorrer los puntos y áreas del JSON
      data.puntos_con_areas.forEach((puntoConArea) => {
        // Crear un icono personalizado para el marcador
        var customIcon = L.icon({
          iconUrl: puntoConArea.icono, // URL del icono personalizado
          iconSize: [38, 38], // Tamaño del icono
          iconAnchor: [19, 38], // Punto de anclaje del icono
          popupAnchor: [0, -38], // Punto de anclaje del popup
        });

        // Crear marcador para el punto con el icono personalizado
        var marker = L.marker([puntoConArea.latitud, puntoConArea.longitud], {
          icon: customIcon,
        }).addTo(map);

        // Crear círculo para el área circular
        var circle = L.circle([puntoConArea.latitud, puntoConArea.longitud], {
          color: puntoConArea.color,
          fillColor: puntoConArea.color,
          fillOpacity: 0.2, // Opacidad del relleno del círculo
          radius: puntoConArea.radio_metros,
          opacity: 0, // Opacidad del contorno del círculo
        }).addTo(map);

        // Agregar popup al marcador con título, descripción y enlace del punto
        marker.bindPopup(
          "<b>" +
            puntoConArea.titulo +
            "</b><br>" +
            puntoConArea.descripcion +
            '<br><a href="' +
            puntoConArea.enlace +
            '">Enlace</a>'
        );
      });
    })
    .catch((error) => console.error("Error cargando datos:", error));

  // Escuchar el evento ciudadCargada
  window.addEventListener("ciudadCargada", function (event) {
    var latitud = event.detail.latitud;
    var longitud = event.detail.longitud;
    // Actualizar el mapa para centrarlo en las nuevas coordenadas de la ciudad
    map.setView([latitud, longitud], zoomInicial);
  });

  // Verificar si se proporciona el parámetro de ciudad
  if (ciudad) {
    // Construir la URL para la solicitud a la API de OpenStreetMap (Nominatim)
    var urlGeocoding =
      "https://nominatim.openstreetmap.org/search?format=json&q=" +
      encodeURIComponent(ciudad);

    // Realizar la solicitud GET para obtener las coordenadas de la ciudad
    fetch(urlGeocoding)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener las coordenadas");
        }
        return response.json();
      })
      .then((data) => {
        // Verificar si se encontraron resultados
        if (data.length > 0) {
          // Obtener las coordenadas de la primera ubicación encontrada
          var latitud = data[0].lat;
          var longitud = data[0].lon;
          // Transmitir las coordenadas al archivo maps.js
          window.dispatchEvent(
            new CustomEvent("ciudadCargada", {
              detail: { latitud: latitud, longitud: longitud },
            })
          );
        } else {
          console.error("No se encontraron resultados para la ciudad:", ciudad);
        }
      })
      .catch((error) => console.error("Error:", error));
  } else {
    // Si no se proporciona el parámetro de ciudad, cargar las coordenadas (0, 0)
    window.dispatchEvent(
      new CustomEvent("ciudadCargada", { detail: { latitud: 0, longitud: 0 } })
    );
  }
}

// Obtener el valor del parámetro GET "ciudad"
const urlParams = new URLSearchParams(window.location.search);
const ciudad = urlParams.get("ciudad");
var latitudInicial = 41.390189;
var longitudInicial = 2.166076;
var zoomInicial = 15;

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function (position) {
    // Ubicación obtenida
    var latitudInicial = position.coords.latitude;
    var longitudInicial = position.coords.longitude;
    // Llamar a la función para cargar el mapa con las coordenadas obtenidas
    cargarMapaYDatos(
      latitudInicial,
      longitudInicial,
      zoomInicial,
      "https://raw.githubusercontent.com/j0rd1s3rr4n0/api/master/wifimap/datos.json",
      ciudad
    );
  });
} else {
  // Si la geolocalización no está disponible, cargar el mapa con las coordenadas predeterminadas
  cargarMapaYDatos(
    latitudInicial,
    longitudInicial,
    zoomInicial,
    "https://raw.githubusercontent.com/j0rd1s3rr4n0/api/master/wifimap/datos.json",
    ciudad
  );
}
