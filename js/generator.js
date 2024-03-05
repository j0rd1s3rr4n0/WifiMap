// Función para generar un título aleatorio en formato hacker
function generarTitulo() {
    const adjetivos = ['Cyber', 'Net', 'Code', 'Data', 'Mainframe', 'Byte', 'Hack', 'Tech', 'Matrix', 'Virtual'];
    const sustantivos = ['Node', 'Runner', 'Breaker', 'Master', 'Node', 'Hack', 'Realm', 'Portal', 'Nexus', 'Dimension'];
    const adjetivoAleatorio = adjetivos[Math.floor(Math.random() * adjetivos.length)];
    const sustantivoAleatorio = sustantivos[Math.floor(Math.random() * sustantivos.length)];
    return adjetivoAleatorio + sustantivoAleatorio + '_' + Math.floor(Math.random() * 1000);
  }
  
  // Función para generar una descripción aleatoria en formato hacker
  function generarDescripcion() {
    const descripciones = ['Accede al punto de conexión seguro', 'Explora los límites de la red', 'Sumérgete en la red oculta', 'Infiltra el sistema digital', 'Descubre los secretos ocultos'];
    const descripcionAleatoria = descripciones[Math.floor(Math.random() * descripciones.length)];
    const ssid = generarSSID();
    const password = generarPassword();
    return `${descripcionAleatoria}\nUna travesía en el ciberespacio te aguarda\n\n<b>SSID:</b> ${ssid}\n<b>Password:</b> ${password}`;
  }
  
  // Función para generar un SSID aleatorio
  function generarSSID() {
    const adjetivos = ['Cyber', 'Net', 'Code', 'Data', 'Mainframe', 'Byte', 'Hack', 'Tech', 'Matrix', 'Virtual'];
    const sustantivos = ['Node', 'Runner', 'Breaker', 'Master', 'Node', 'Hack', 'Realm', 'Portal', 'Nexus', 'Dimension'];
    const adjetivoAleatorio = adjetivos[Math.floor(Math.random() * adjetivos.length)];
    const sustantivoAleatorio = sustantivos[Math.floor(Math.random() * sustantivos.length)];
    return adjetivoAleatorio + sustantivoAleatorio + '_' + Math.floor(Math.random() * 1000) + '_H4ck3r';
  }
  
  // Función para generar una contraseña aleatoria
  function generarPassword() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return password;
  }
  
  // Función para generar coordenadas aleatorias en Barcelona
  function generarCoordenadas() {
    const latitud = 41.35 + (Math.random() * 0.3); // Latitud entre 41.35 y 41.65
    const longitud = 2.1 + (Math.random() * 0.5); // Longitud entre 2.1 y 2.6
    return { latitud: latitud, longitud: longitud };
  }
  
  // Función para generar un color hexadecimal aleatorio
  function generarColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
  }
  
  // Función para generar un radio aleatorio entre 1 y 100 metros
  function generarRadio() {
    return Math.floor(Math.random() * 100) + 1;
  }
  
  // Función para generar un punto con áreas aleatorio
  function generarPuntoConArea() {
    return {
      latitud: generarCoordenadas().latitud,
      longitud: generarCoordenadas().longitud,
      titulo: generarTitulo(),
      descripcion: generarDescripcion(),
      enlace: 'https://j0rd1s3rr4n0.github.io#wifimap',
      radio_metros: generarRadio(),
      color: generarColor(),
      icono: 'https://cdn4.iconfinder.com/data/icons/technology-9/128/Technology_WiFi-512.png'
    };
  }
  
  // Generar 100 puntos con áreas aleatorios
  const puntos_con_areas = [];
  for (let i = 0; i < 100; i++) {
    puntos_con_areas.push(generarPuntoConArea());
  }
  
  // Mostrar los puntos generados
  console.log(JSON.stringify({ puntos_con_areas }));
  