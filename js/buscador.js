(() => {
    // Catálogo local: revisar estos enlaces cuando cambien las páginas de EcoRuta.
    const catalogo = [
        ['Pucón', 'Destino', 'Accesos, horarios y tarifas pendientes de verificar.', 'destinos volcan lago', 'pages/explorar.html#destinos'],
        ['Villarrica', 'Destino', 'Información de visita pendiente de verificar.', 'destinos lago', 'pages/explorar.html#destinos'],
        ['Parque Nacional Conguillío', 'Destino', 'Acceso específico y condiciones pendientes de confirmar.', 'destinos naturaleza araucarias', 'pages/explorar.html#destinos'],
        ['Cerro Ñielol', 'Lugar de interés', 'Consulta la ficha de este lugar en Temuco.', 'lugares cerro naturaleza', 'pages/lugares.html'],
        ['Museo Regional de la Araucanía', 'Lugar de interés', 'Consulta la ficha del museo en Temuco.', 'lugares museo cultura', 'pages/lugares.html'],
        ['Pabellón Araucanía', 'Lugar de interés', 'Consulta la ficha del espacio cultural.', 'lugares arquitectura cultura', 'pages/lugares.html'],
        ['Festival de Gastronomía Mapuche MOGEKONMEN', 'Evento', 'Consulta la información del festival en Curarrehue.', 'eventos festival comida gastronomia cultura', 'pages/eventos.html#evento-mogekonmen'],
        ['EXPOSOFO 2026', 'Evento', 'Feria agrícola y ganadera en Parque SOFO, Temuco.', 'eventos exposofo feria', 'pages/eventos.html#evento-exposofo'],
        ['Trekking Guiado', 'Evento', 'Fecha e información oficial pendientes de confirmación.', 'eventos trekking senderismo', 'pages/eventos.html#evento-trekking'],
        ['Senderismo por definir', 'Ruta pendiente', 'No representa un itinerario habilitado ni un recorrido oficial.', 'rutas actividades trekking caminata', 'pages/explorar.html#actividades'],
        ['Ciclismo por definir', 'Ruta pendiente', 'Trazado, distancia y dificultad pendientes de confirmar.', 'rutas actividades bicicleta', 'pages/explorar.html#actividades'],
        ['Alojamiento', 'Servicios', 'Los alojamientos publicados son ejemplos ficticios.', 'servicios cabañas hospedaje hostal hotel', 'pages/servicios.html#alojamiento'],
        ['Transporte', 'Servicios', 'Los servicios publicados son ejemplos ficticios.', 'servicios traslados viaje', 'pages/servicios.html#transporte'],
        ['Restaurantes y cafeterías en Temuco', 'Servicios', 'Consulta locales y direcciones en el catálogo gastronómico.', 'gastronomia restaurantes cafeterias comida donde comer temuco', 'pages/gastronomia.html'],
        ['Restaurant La Caleta', 'Restaurante · Temuco', 'Ubicado en Avenida San Martín 0204, Barrio Dreves.', 'gastronomia restaurante comida temuco', 'pages/gastronomia.html#restaurant-la-caleta'],
        ['Restaurant Don Pedro', 'Restaurante · Temuco', 'Ubicado en calle San Guillermo, Barrio Dreves.', 'gastronomia restaurante comida temuco', 'pages/gastronomia.html#restaurant-don-pedro'],
        ['Restaurant A La Antigua', 'Restaurante · Temuco', 'Ubicado en General Mackenna, sector Centro.', 'gastronomia restaurante comida temuco', 'pages/gastronomia.html#restaurant-a-la-antigua'],
        ['Cafetería Marriet', 'Cafetería · Temuco', 'Ubicada en Avenida Alemania 0671, Portal Temuco.', 'gastronomia cafeteria cafe temuco', 'pages/gastronomia.html#cafeteria-marriet'],
        ['Cafetería Di Gatto', 'Cafetería · Temuco', 'Ubicada en Francisco Salazar 01145, Villa Andrés Bello.', 'gastronomia cafeteria cafe temuco', 'pages/gastronomia.html#cafeteria-di-gatto'],
        ['Raíces del Ñielol', 'Emprendimiento · Ejemplo ficticio', 'Ficha ilustrativa; no corresponde a un negocio verificado.', 'emprendimientos artesanias sustentabilidad', 'pages/emprendimientos.html#raices-del-nielol'],
        ['Sabores del Volcán', 'Emprendimiento · Ejemplo ficticio', 'Ficha ilustrativa; no corresponde a un negocio verificado.', 'emprendimientos miel comida gastronomia productos', 'pages/emprendimientos.html#gastronomia'],
        ['Guías de viaje', 'Guías', 'Información de guías y zonas de recorrido por definir.', 'guias turismo recorridos', 'pages/guias.html'],
        ['Clima', 'Clima', 'Datos estáticos de ejemplo; no es un pronóstico en tiempo real.', 'clima pronostico tiempo temperatura ciudades', 'pages/clima.html'],
        ['Mapa de La Araucanía', 'Mapa provisional', 'El mapa interactivo está pendiente de implementación.', 'mapa ubicacion destinos', 'index.html#mapa']
    ].map(([titulo, categoria, descripcion, etiquetas, href]) => ({ titulo, categoria, descripcion, etiquetas, href }));

    const normalizar = (texto) => texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim().replace(/\s+/g, ' ');
    const buscar = (consulta) => {
        const query = normalizar(consulta);
        if (!query) return [];
        const palabras = query.split(' ');
        return catalogo.map((item) => {
            const titulo = normalizar(item.titulo);
            const texto = normalizar(`${item.titulo} ${item.categoria} ${item.etiquetas}`);
            const puntos = palabras.every((palabra) => texto.includes(palabra))
                ? (titulo === query ? 100 : titulo.includes(query) ? 50 : 10) : 0;
            return { item, puntos };
        }).filter(({ puntos }) => puntos > 0)
            .sort((a, b) => b.puntos - a.puntos).map(({ item }) => item);
    };

    const form = document.getElementById('buscador-ecoruta');
    if (!form) return;
    const input = document.getElementById('destino');
    const panel = document.getElementById('buscador-resultados');
    const lista = document.getElementById('buscador-lista');
    const estado = document.getElementById('buscador-estado');
    input.setAttribute('role', 'combobox');
    input.setAttribute('aria-autocomplete', 'list');
    input.setAttribute('aria-haspopup', 'listbox');
    input.setAttribute('aria-controls', lista.id);
    input.setAttribute('aria-expanded', 'false');
    lista.setAttribute('role', 'listbox');
    let enlaces = [];
    let activo = -1;
    const seleccionar = (indice, desplazar = false) => {
        activo = indice;
        enlaces.forEach((link, i) => link.setAttribute('aria-selected', String(i === activo)));
        if (activo < 0) {
            input.removeAttribute('aria-activedescendant');
            return;
        }
        const link = enlaces[activo];
        input.setAttribute('aria-activedescendant', link.id);
        if (desplazar) {
            const destino = link.getBoundingClientRect();
            const visible = panel.getBoundingClientRect();
            if (destino.top < visible.top) panel.scrollTop -= visible.top - destino.top;
            else if (destino.bottom > visible.bottom) panel.scrollTop += destino.bottom - visible.bottom;
        }
    };
    const cerrar = () => {
        seleccionar(-1);
        panel.hidden = true;
        input.setAttribute('aria-expanded', 'false');
    };
    const mostrar = () => {
        const resultados = buscar(input.value);
        seleccionar(-1);
        enlaces = [];
        lista.replaceChildren();
        estado.textContent = !normalizar(input.value) ? 'Escribe qué te gustaría encontrar'
            : resultados.length ? `${resultados.length} resultados. Usa ↑ y ↓ para navegar y Enter para seleccionar. También puedes usar Tab o hacer clic.`
                : 'No encontramos resultados. Prueba con otro destino, evento o servicio.';
        resultados.forEach((item, indice) => {
            const li = document.createElement('li');
            const link = document.createElement('a');
            const titulo = document.createElement('strong');
            const contexto = document.createElement('small');
            link.href = item.href;
            li.setAttribute('role', 'none');
            link.id = `buscador-opcion-${indice}`;
            link.setAttribute('role', 'option');
            link.setAttribute('aria-selected', 'false');
            link.addEventListener('pointermove', () => seleccionar(indice));
            link.addEventListener('focus', () => seleccionar(indice));
            enlaces.push(link);
            titulo.textContent = item.titulo;
            contexto.textContent = `${item.categoria} · ${item.descripcion}`;
            link.append(titulo, contexto);
            li.append(link);
            lista.append(li);
        });
        panel.hidden = false;
        panel.scrollTop = 0;
        input.setAttribute('aria-expanded', 'true');
    };
    let timer;
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        clearTimeout(timer);
        mostrar();
    });
    input.addEventListener('input', () => {
        clearTimeout(timer);
        cerrar();
        if (normalizar(input.value)) timer = setTimeout(mostrar, 180);
    });
    input.addEventListener('keydown', (event) => {
        if (event.isComposing) return;
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            clearTimeout(timer);
            if (panel.hidden && normalizar(input.value)) mostrar();
            if (panel.hidden || !enlaces.length) return;
            const siguiente = activo < 0 ? (event.key === 'ArrowDown' ? 0 : enlaces.length - 1)
                : Math.max(0, Math.min(enlaces.length - 1, activo + (event.key === 'ArrowDown' ? 1 : -1)));
            seleccionar(siguiente, true);
        } else if (event.key === 'Enter' && !panel.hidden && activo >= 0) {
            event.preventDefault();
            clearTimeout(timer);
            enlaces[activo].click();
        }
    });
    form.parentElement.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            clearTimeout(timer);
            cerrar();
            input.focus();
        }
    });
    document.addEventListener('pointerdown', (event) => {
        if (!form.parentElement.contains(event.target)) {
            clearTimeout(timer);
            cerrar();
        }
    });
    form.parentElement.addEventListener('focusout', (event) => {
        if (!form.parentElement.contains(event.relatedTarget)) {
            clearTimeout(timer);
            cerrar();
        }
    });
    input.disabled = false;
    form.querySelector('button').disabled = false;
})();
