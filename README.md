# Arkangel Industries — Sitio web

Sitio web de Arkangel Industries: portafolio de plataformas aéreas, sensores, control y sistemas terrestres, con mapa interactivo de zonas de aplicación y solicitud de equipos.

> **Estado:** borrador en revisión legal. No publicar hasta validar el contenido de la línea defensa y los sistemas terrestres.

## Estructura

```
index.html            Página principal
assets/css/styles.css Estilos y animaciones
assets/js/data.js     Datos: productos, precios, configuraciones, zonas del mapa
assets/js/app.js      Interacción: filtros, mapa, carrito, formulario
assets/img/           Imágenes (renders y fotos del portafolio)
```

## Editar contenido

Casi todo el contenido cambiante está en `assets/js/data.js`:

- **Productos y precios:** lista `products`. `p` es el precio en COP antes de IVA (`0` muestra "Bajo solicitud").
- **Imágenes:** campo `img` (archivo dentro de `assets/img/`). `render: true` marca la imagen como "Render de referencia".
- **Validación legal:** `legal: true` muestra la etiqueta roja en la tarjeta.
- **Configuraciones de referencia:** lista `packs` (los totales se calculan solos).
- **Mapa:** lista `zones` con latitud y longitud.
- **Correo de contacto:** `contactEmail`. El formulario abre el correo del visitante con la solicitud ya redactada.

## Ver el sitio en tu computador

Abre `index.html` en el navegador, o desde la carpeta del proyecto:

```bash
python3 -m http.server 8000
```

y entra a `http://localhost:8000`.

## Publicar con GitHub Pages

1. En el repositorio: **Settings → Pages**.
2. En **Source** elige **Deploy from a branch**, rama `main`, carpeta `/ (root)`.
3. Guarda. En uno o dos minutos el sitio queda en `https://<tu-usuario>.github.io/<repositorio>/`.

GitHub Pages en repositorios privados requiere un plan de pago de GitHub.

## Imágenes

- "Imagen del portafolio": renders originales de las plataformas ARKANGEL.
- "Render de referencia": visualizaciones 3D genéricas creadas para este borrador. No son fotografías de producto terminado y deben reemplazarse por imágenes reales cuando existan.

© 2026 Arkangel Industries
