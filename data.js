/*
 * Arkangel Industries — datos del sitio.
 * Para cambiar productos, precios, configuraciones o zonas del mapa, edita solo este archivo.
 * p: precio en COP antes de IVA (0 = "Bajo solicitud").  img: archivo en assets/img/.
 * render: true = visualización 3D de referencia (no foto de producto).  legal: true = requiere validación legal.
 */
window.ARK = {
  contactEmail: 'contacto@grupoarkangel.aero',

  cats: [
    { id: 'all', n: 'Todo el portafolio' }, { id: 'aer', n: 'Aeronaves' }, { id: 'vis', n: 'Cámaras y visión' },
    { id: 'mis', n: 'Misión y sensores' }, { id: 'ctl', n: 'Control y pantallas' }, { id: 'est', n: 'Chasis' },
    { id: 'con', n: 'Conectividad' }, { id: 'ter', n: 'Sistemas terrestres' }, { id: 'def', n: 'Línea defensa' }
  ],

  products: [
    { id: 'a1', c: 'aer', code: 'AKG / 01', n: 'ARKANGEL 1', s: 'Mini dron de inspección', sp: [['Formato', 'Una mano'], ['Carga', 'Ligera'], ['Estructura', 'Fibra de carbono']], p: 88000000, img: 'a1.jpg' },
    { id: 'a2', c: 'aer', code: 'AKG / 02', n: 'ARKANGEL 2', s: 'Inspección y carga', sp: [['Dimensión', '≈ 20 cm'], ['Carga declarada', '10 kg'], ['Estructura', 'Fibra de carbono']], p: 145000000, img: 'a2.jpg' },
    { id: 'a3', c: 'aer', code: 'AKG / 03', n: 'ARKANGEL 3', s: 'Plataforma industrial', sp: [['Dimensión', '≈ 45 cm'], ['Carga declarada', '30 kg'], ['Estructura', 'Fibra de carbono']], p: 200000000, img: 'a3.jpg' },
    { id: 'a4', c: 'aer', code: 'AKG / ALA FIJA', n: 'THÁNOS', s: 'Plataforma de largo alcance', sp: [['Alcance propuesto', '2.500+ km'], ['Autonomía', '12 h'], ['Carga declarada', '1 tonelada']], p: 382000000, note: 'Concepto en desarrollo', img: 'thanos.jpg' },
    { id: 'v1', c: 'vis', code: 'VIS / 01', n: 'Cámara 4K', s: 'Documentación visual', sp: [['Captura', 'Video 4K'], ['Uso', 'Inspección RGB'], ['Integración', 'A definir']], p: 4000000, img: 'cam4k.jpg', render: true },
    { id: 'v2', c: 'vis', code: 'VIS / 02', n: 'Cámara 8K', s: 'Captura de detalle', sp: [['Formato', '8K'], ['Uso', 'Detalle visual'], ['Modelo', 'Por definir']], p: 8000000, img: 'cam8k.jpg', render: true },
    { id: 'v3', c: 'vis', code: 'VIS / 03', n: 'Cámara térmica 4K*', s: 'Inspección infrarroja', sp: [['Tecnología', 'Infrarrojo'], ['Uso', 'Contraste térmico'], ['Sensor', 'Por definir']], p: 8000000, img: 'thermal.jpg', render: true },
    { id: 'v4', c: 'vis', code: 'VIS / 04', n: 'Multisensor + térmica', s: 'Visión complementaria', sp: [['Visión', 'Visible + térmica'], ['Formato', 'Multisensor'], ['Integración', 'Especializada']], p: 78000000, img: 'multi.jpg', render: true },
    { id: 'm1', c: 'mis', code: 'MIS / 01', n: 'Sistema de cartografía', s: 'Mapas y modelos 3D', sp: [['Resultado', 'Mapas / 3D'], ['Datos', 'Geoespaciales'], ['Flujo', 'A definir']], p: 150000000, img: 'lidar.jpg', render: true },
    { id: 'm2', c: 'mis', code: 'MIS / 02', n: 'Reflector profesional', s: 'Iluminación dirigida', sp: [['Función', 'Iluminación'], ['Uso', 'Baja luz'], ['Montaje', 'Configurable']], p: 10000000, img: 'reflector.jpg', render: true },
    { id: 'm3', c: 'mis', code: 'MIS / 03', n: 'Altavoz aéreo', s: 'Comunicación desde el aire', sp: [['Función', 'Voz y avisos'], ['Uso', 'Comunicación'], ['Modelo', 'Por definir']], p: 10000000, img: 'speaker.jpg', render: true },
    { id: 'c1', c: 'ctl', code: 'CTL / 01', n: 'Gafas', s: 'Visualización FPV', sp: [['Vista', 'Inmersiva / FPV'], ['Señal', 'Video del dron'], ['Enlace', 'A verificar']], p: 20000000, img: 'goggles.jpg', render: true },
    { id: 'c2', c: 'ctl', code: 'CTL / 02', n: 'Control de piloto', s: 'Mando y telemetría', sp: [['Función', 'Pilotaje'], ['Datos', 'Telemetría'], ['Enlace', 'A definir']], p: 25000000, img: 'control.jpg', render: true },
    { id: 'c3', c: 'ctl', code: 'CTL / 03', n: 'Pantalla tipo tableta', s: 'Monitor adicional', sp: [['Tamaño', '≈ 15 cm'], ['Uso', 'Monitor adicional'], ['Conexión', 'A definir']], p: 10000000, img: 'tablet.jpg', render: true },
    { id: 'c4', c: 'ctl', code: 'CTL / 04', n: 'Pantalla tipo celular', s: 'Monitor compacto', sp: [['Tamaño', '≈ 8 cm'], ['Formato', 'Compacto'], ['Uso', 'Vista auxiliar']], p: 6000000, img: 'phone.jpg', render: true },
    { id: 'e1', c: 'est', code: 'EST / 01', n: 'Chasis ARKANGEL 1', s: 'Estructura de reposición', sp: [['Material', 'Fibra de carbono'], ['Plataforma', 'ARKANGEL 1'], ['Venta', 'Por separado']], p: 25000000, img: 'a1.jpg' },
    { id: 'e2', c: 'est', code: 'EST / 02', n: 'Chasis ARKANGEL 2', s: 'Estructura de reposición', sp: [['Material', 'Fibra de carbono'], ['Plataforma', 'ARKANGEL 2'], ['Venta', 'Por separado']], p: 48000000, img: 'a2.jpg' },
    { id: 'e3', c: 'est', code: 'EST / 03', n: 'Chasis ARKANGEL 3', s: 'Estructura de reposición', sp: [['Material', 'Fibra de carbono'], ['Plataforma', 'ARKANGEL 3'], ['Venta', 'Por separado']], p: 84000000, img: 'a3.jpg' },
    { id: 'k1', c: 'con', code: 'CON / 01', n: 'Fibra óptica base', s: 'Configuración de conectividad', sp: [['Área indicada', '3 ha'], ['Integración', 'Personalizada'], ['Longitud', 'Por definir']], p: 20000000, img: 'fiber.jpg', render: true },
    { id: 'k2', c: 'con', code: 'CON / 02', n: 'Área adicional de fibra', s: 'Ampliación por hectárea', sp: [['Unidad', 'Hectárea adicional'], ['Tarifa', '8 M COP / ha'], ['Viabilidad', 'A evaluar']], p: 8000000, unit: ' / ha adicional', img: 'fiber2.jpg', render: true },
    { id: 'k3', c: 'con', code: 'CON / 03', n: 'Ampliación de capacidad', s: 'Módulo configurable', sp: [['Tarifa indicada', '10 M COP'], ['Módulo', 'A definir'], ['Mejora', 'A validar']], p: 10000000, note: 'Alcance por confirmar', img: 'a3.jpg' },
    { id: 't1', c: 'ter', code: 'TER / 01', n: 'Detector Defender', s: 'Detección y conciencia situacional', sp: [['Rango declarado', 'Hasta 5 km'], ['Detección', '10 aeronaves'], ['Autonomía', '2 h']], p: 195000000, note: 'Precio por confirmar', img: 'detector.jpg', render: true },
    { id: 't2', c: 'ter', code: 'TER / 02', n: 'Neutralizador portátil', s: 'Mitigación bajo autorización', sp: [['Alcance declarado', 'Hasta 1,5 km'], ['Autonomía', 'Hasta 3 h'], ['Formato', 'Portátil']], p: 288000000, note: 'Sujeto a autorización', legal: true, img: 'handheld.jpg', render: true },
    { id: 't3', c: 'ter', code: 'TER / 03', n: 'Neutralizador estacionario', s: 'Sistema fijo de protección', sp: [['Radio declarado', '1,5 km'], ['Altura declarada', '1 km'], ['Operación', '24 h']], p: 336000000, note: 'Sujeto a autorización', legal: true, img: 'stationary.jpg', render: true },
    { id: 'd0', c: 'def', code: 'DEF / 01', n: 'ARKANGEL VIGIL', s: 'Vigilancia y reconocimiento (ISR)', sp: [['Sensor', 'Día + térmico'], ['Enlace', 'Cifrado'], ['Venta', 'Institucional']], p: 0, note: 'Precio bajo solicitud', img: 'vigil.jpg', render: true },
    { id: 'd1', c: 'def', code: 'DEF / 02', n: 'ARKANGEL GHOST 7"', s: 'Plataforma táctica FPV', sp: [['Formato', 'FPV 7"'], ['Despliegue', 'Rápido'], ['Venta', 'Autorizada']], p: 0, note: 'Sujeto a validación legal', legal: true, img: 'ghost.jpg', render: true },
    { id: 'd2', c: 'def', code: 'DEF / 03', n: 'ARKANGEL TITAN SWARM', s: 'Operación coordinada multi-aeronave', sp: [['Control', 'Una estación'], ['Misión', 'Compartida'], ['Venta', 'Autorizada']], p: 0, note: 'Sujeto a validación legal', legal: true, img: 'swarm.jpg', render: true }
  ],

  packs: [
    { code: '01 / Documentación visual', n: 'Inspección esencial', items: ['a1', 'v1', 'c2'] },
    { code: '02 / Visión infrarroja', n: 'Observación térmica', items: ['a2', 'v3', 'c1', 'c2'] },
    { code: '03 / Datos geoespaciales', n: 'Cartografía avanzada', items: ['a3', 'm1', 'c3', 'c2'] }
  ],

  missions: [
    { code: '01 / Inspección visual', t: 'Acércate<br>al detalle.', s: 'ARKANGEL 1 + cámara 4K + control', img: 'adn.jpg', tag: '4K · Detalle' },
    { code: '02 / Visión térmica', t: 'Ve más allá<br>de lo visible.', s: 'ARKANGEL 2 + térmica + gafas + control', img: 'thermal.jpg', tag: 'IR · Térmica', scan: true },
    { code: '03 / Cartografía', t: 'Convierte el<br>terreno en datos.', s: 'ARKANGEL 3 + cartografía + tableta + control', img: 'lidar.jpg', tag: '3D · Cartografía' }
  ],

  platforms: {
    1: { label: 'ARKANGEL 1 / Inspección compacta', tag: 'Compacto', a: 'Formato: una mano', b: 'Carga ligera', img: 'a1.jpg', pos: '50% 50%' },
    2: { label: 'ARKANGEL 2 / Inspección y carga', tag: 'Versátil', a: 'Dimensión ≈ 20 cm', b: 'Carga 10 kg', img: 'hero.jpg', pos: '50% 45%' },
    3: { label: 'ARKANGEL 3 / Plataforma industrial', tag: 'Industrial', a: 'Dimensión ≈ 45 cm', b: 'Carga 30 kg', img: 'a3.jpg', pos: '50% 55%' }
  },

  industries: [
    { id: 'all', n: 'Todas' }, { id: 'min', n: 'Minería' }, { id: 'pet', n: 'Petróleo y gas' }, { id: 'ene', n: 'Energía' },
    { id: 'seg', n: 'Seguridad' }, { id: 'agr', n: 'Agro' }, { id: 'geo', n: 'Geomática' }, { id: 'amb', n: 'Ambiental' }
  ],
  marquee: ['Minería', 'Petróleo y gas', 'Energía', 'Seguridad', 'Agro', 'Geomática', 'Infraestructura', 'Búsqueda y rescate', 'Ambiental'],
  kits: { min: 'Cartografía avanzada · ARKANGEL 3', pet: 'Observación térmica · ARKANGEL 2', ene: 'Observación térmica · ARKANGEL 2', seg: 'Detector Defender + ARKANGEL 2', agr: 'Cartografía avanzada · ARKANGEL 3', geo: 'Cartografía avanzada · ARKANGEL 3', amb: 'Observación térmica · ARKANGEL 2' },

  hq: { lat: 6.2442, lon: -75.5812 },
  zones: [
    { id: 'p1', n: 'Segovia', r: 'Antioquia', ind: 'min', lat: 7.08, lon: -74.70, m: 'Inspección de frentes mineros y estabilidad de taludes.' },
    { id: 'p2', n: 'La Guajira', r: 'Región Caribe', ind: 'min', lat: 11.08, lon: -72.62, m: 'Cartografía de tajos y control de volúmenes de material.' },
    { id: 'p3', n: 'Barrancabermeja', r: 'Santander', ind: 'pet', lat: 7.07, lon: -73.86, m: 'Inspección térmica de refinería, tanques y ductos.' },
    { id: 'p4', n: 'Puerto Gaitán', r: 'Meta', ind: 'pet', lat: 4.31, lon: -72.08, m: 'Vigilancia de campos de producción y líneas de flujo.' },
    { id: 'p5', n: 'Hidroituango', r: 'Antioquia', ind: 'ene', lat: 7.13, lon: -75.68, m: 'Inspección de presa, casa de máquinas y líneas de transmisión.' },
    { id: 'p6', n: 'El Quimbo', r: 'Huila', ind: 'ene', lat: 2.13, lon: -75.58, m: 'Monitoreo de embalse y estructuras hidráulicas.' },
    { id: 'p7', n: 'Buenaventura', r: 'Valle del Cauca', ind: 'seg', lat: 3.88, lon: -77.03, m: 'Vigilancia portuaria y control de perímetro.' },
    { id: 'p8', n: 'Cúcuta', r: 'Norte de Santander', ind: 'seg', lat: 7.89, lon: -72.60, m: 'Observación de corredores y protección de infraestructura.' },
    { id: 'p9', n: 'Eje Cafetero', r: 'Caldas · Quindío · Risaralda', ind: 'agr', lat: 4.81, lon: -75.68, m: 'Mapeo de cultivos y seguimiento del estado de los lotes.' },
    { id: 'p10', n: 'Bogotá', r: 'Distrito Capital', ind: 'geo', lat: 4.71, lon: -74.08, m: 'Levantamiento urbano y modelos 3D de superficie.' },
    { id: 'p11', n: 'Amazonas', r: 'Sur del país', ind: 'amb', lat: -3.8, lon: -70.0, m: 'Monitoreo forestal y apoyo a búsqueda y rescate.' }
  ],

  components: [
    { id: 'prop', n: 'Hélices', d: 'Generan sustentación' }, { id: 'motor', n: 'Motores', d: 'Proporcionan empuje' },
    { id: 'bat', n: 'Batería', d: 'Suministra energía' }, { id: 'fc', n: 'Controlador', d: 'Estabiliza el vuelo' },
    { id: 'cam', n: 'Cámara', d: 'Captura imágenes' }, { id: 'ant', n: 'Antenas', d: 'Transmiten datos' },
    { id: 'arm', n: 'Chasis', d: 'Soporta la estructura' }, { id: 'gear', n: 'Tren de aterrizaje', d: 'Protege en tierra' }
  ],

  tests: [
    { n: 'Video prueba 01' }, { n: 'Video prueba 02' }, { n: 'Video prueba 03' }
  ]
};
