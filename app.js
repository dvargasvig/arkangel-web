/* Arkangel Industries — interacción del sitio (sin dependencias) */
(function () {
  'use strict';
  var D = window.ARK;
  var ACCENT = '#C8261F';
  var IMG = '';
  var $ = function (id) { return document.getElementById(id); };
  var fmt = function (n) { return '$' + n.toLocaleString('es-CO'); };
  var byId = {};
  D.products.forEach(function (p) { byId[p.id] = p; });
  var catName = function (id) { var c = D.cats.find(function (x) { return x.id === id; }); return c ? c.n : ''; };
  var indName = function (id) { var c = D.industries.find(function (x) { return x.id === id; }); return c ? c.n : ''; };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };

  var state = { plat: 2, cat: 'all', q: '', cart: {}, ind: 'all', hov: null, part: null, view: 'foto' };
  try { var saved = JSON.parse(localStorage.getItem('ark-cart') || '{}'); if (saved && typeof saved === 'object') state.cart = saved; } catch (e) {}
  function saveCart() { try { localStorage.setItem('ark-cart', JSON.stringify(state.cart)); } catch (e) {} }

  document.querySelectorAll('[data-total]').forEach(function (el) { el.textContent = D.products.length; });

  /* ---------- marquesina ---------- */
  var mq = D.marquee.map(function (t) { return '<span>' + esc(t) + '</span><span style="color:' + ACCENT + '">◆</span>'; }).join('');
  $('marquee').innerHTML = mq + mq;

  /* ---------- misiones ---------- */
  $('missions').innerHTML = D.missions.map(function (m) {
    return '<a href="#configuraciones" class="hl rv" style="text-decoration:none;color:#F2F2F2;border:1px solid #262626;background:#111;display:flex;flex-direction:column">' +
      '<div style="height:210px;position:relative;overflow:hidden;border-bottom:1px solid #262626;background:#111">' +
      '<img src="' + IMG + m.img + '" alt="" loading="lazy" class="kb2" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">' +
      (m.scan ? '<div class="scan"></div>' : '') +
      '<span class="mono" style="position:absolute;right:12px;bottom:10px;font-size:9px;padding:3px 6px;background:rgba(10,10,10,.7);color:#CFCFCF">' + m.tag + '</span></div>' +
      '<div style="padding:26px;display:flex;flex-direction:column;gap:14px;flex-grow:1"><span class="mono" style="font-size:10px;color:#8A8A8A">' + m.code + '</span>' +
      '<h3 style="margin:0;font-size:30px;font-weight:800;line-height:1.05">' + m.t + '</h3><p style="margin:0;font-size:14px;color:#A8A8A8">' + m.s + '</p>' +
      '<div style="margin-top:auto;border-top:1px solid #262626;padding-top:16px;display:flex;justify-content:space-between;font-weight:600;font-size:14px"><span>Explorar configuración</span><span class="arw" aria-hidden="true">↗</span></div></div></a>';
  }).join('');

  /* ---------- pruebas de campo ---------- */
  $('tests').innerHTML = D.tests.map(function (t, i) {
    return '<div class="hl rv" style="border:1px solid #262626;color:#F2F2F2;display:flex;flex-direction:column">' +
      '<div style="height:180px;position:relative;overflow:hidden;background:#141414;display:flex;align-items:center;justify-content:center"><div class="scan" style="animation-delay:' + (-1.2 * i) + 's"></div><span class="mono" style="font-size:11px;color:#8A8A8A">▶ [' + esc(t.n) + ']</span></div>' +
      '<div class="mono" style="padding:20px;display:flex;flex-direction:column;gap:10px;font-size:11px">' +
      '<div style="display:flex;justify-content:space-between"><span style="color:#8A8A8A">Fecha</span><span>[DD/MM/AAAA]</span></div>' +
      '<div style="display:flex;justify-content:space-between"><span style="color:#8A8A8A">Condición</span><span>[Viento / clima]</span></div>' +
      '<div style="display:flex;justify-content:space-between"><span style="color:#8A8A8A">Resultado</span><span>[Dato medido]</span></div></div></div>';
  }).join('');

  /* ---------- hero ---------- */
  function renderHero() {
    var p = D.platforms[state.plat], img = $('heroImg');
    img.src = IMG + p.img; img.style.objectPosition = p.pos; img.alt = p.label;
    $('platLabel').textContent = p.label; $('platA').textContent = p.a; $('platB').textContent = p.b;
    $('platBtns').innerHTML = [1, 2, 3].map(function (i) {
      var on = state.plat === i;
      return '<button type="button" data-plat="' + i + '" aria-pressed="' + on + '" class="btn" style="border:1px solid #333;background:' + (on ? '#F2F2F2' : 'transparent') + ';color:' + (on ? '#0A0A0A' : '#8A8A8A') + ';padding:12px 14px;display:flex;justify-content:space-between;align-items:center;min-height:48px"><span style="font-weight:800;font-size:18px">0' + i + '</span><span class="mono" style="font-size:9px">' + D.platforms[i].tag + '</span></button>';
    }).join('');
  }
  $('platBtns').addEventListener('click', function (e) {
    var b = e.target.closest('[data-plat]'); if (!b) return;
    state.plat = +b.dataset.plat; renderHero();
  });

  /* ---------- mapa ---------- */
  function km(a, b, c, d) {
    var R = 6371, t = function (x) { return x * Math.PI / 180; };
    var h = Math.pow(Math.sin(t(c - a) / 2), 2) + Math.cos(t(a)) * Math.cos(t(c)) * Math.pow(Math.sin(t(d - b) / 2), 2);
    return Math.round(2 * R * Math.asin(Math.sqrt(h)));
  }
  var HQX = 221.5, HQY = 337.5;
  function renderMap() {
    var lines = '', pts = '', list = '', active = 0;
    D.zones.forEach(function (p) {
      var x = (p.lon + 80) * 50, y = (13 - p.lat) * 50;
      var match = state.ind === 'all' || state.ind === p.ind, on = state.hov === p.id;
      var show = on || (state.ind !== 'all' && match);
      if (show) active++;
      var col = on ? ACCENT : (match ? '#F2F2F2' : '#5A5A5A');
      lines += '<line x1="' + HQX + '" y1="' + HQY + '" x2="' + x + '" y2="' + y + '" stroke="' + ACCENT + '" stroke-width="1.8" class="route" style="opacity:' + (show ? 0.9 : 0) + '"></line>';
      pts += '<g data-zone="' + p.id + '" style="cursor:pointer;opacity:' + (match ? 1 : 0.18) + ';transition:opacity .4s"><circle cx="' + x + '" cy="' + y + '" r="18" fill="transparent"></circle><circle cx="' + x + '" cy="' + y + '" r="9" fill="none" stroke="' + col + '" class="ring"></circle><circle cx="' + x + '" cy="' + y + '" r="' + (on ? 8 : 5) + '" fill="' + col + '"></circle></g>';
      if (match) list += '<button type="button" class="row" data-zone="' + p.id + '" style="text-align:left;border:0;border-bottom:1px solid #1E1E1E;background:' + (on ? '#1A1A1A' : 'transparent') + ';color:#F2F2F2;padding:12px 16px;display:flex;align-items:center;gap:12px;min-height:48px"><span style="width:8px;height:8px;background:' + (on ? ACCENT : '#5A5A5A') + ';transform:rotate(45deg);flex-shrink:0"></span><span style="flex-grow:1;font-size:14px;font-weight:600">' + esc(p.n) + '<span style="display:block;font-weight:400;font-size:12px;color:#8A8A8A">' + esc(indName(p.ind) + ' · ' + p.r) + '</span></span><span class="mono" style="font-size:11px;color:#A8A8A8">' + km(D.hq.lat, D.hq.lon, p.lat, p.lon) + ' km</span></button>';
    });
    $('mapDyn').innerHTML = lines + pts;
    $('mapList').innerHTML = list;
    $('activeRoutes').textContent = active;
    $('inds').innerHTML = D.industries.map(function (c) {
      var on = state.ind === c.id;
      return '<button type="button" data-ind="' + c.id + '" aria-pressed="' + on + '" class="chip mono" style="font-size:11px;padding:10px 14px;min-height:40px;border:1px solid ' + (on ? '#F2F2F2' : '#333') + ';background:' + (on ? '#F2F2F2' : 'transparent') + ';color:' + (on ? '#0A0A0A' : '#A8A8A8') + '">' + c.n + '</button>';
    }).join('');
    var hp = D.zones.find(function (z) { return z.id === state.hov; });
    var mi = hp ? {
      tag: indName(hp.ind), title: hp.n, region: hp.r, mission: hp.m, dist: km(D.hq.lat, D.hq.lon, hp.lat, hp.lon) + ' km',
      coords: Math.abs(hp.lat).toFixed(2) + '° ' + (hp.lat >= 0 ? 'N' : 'S') + ' · ' + Math.abs(hp.lon).toFixed(2) + '° W', kit: D.kits[hp.ind]
    } : {
      tag: 'Centro de operaciones', title: 'Medellín', region: 'Antioquia · Base de ingeniería',
      mission: 'Desde aquí diseñamos, ensamblamos y despachamos cada plataforma. Pasa el cursor por una zona para trazar la ruta.',
      dist: '0 km', coords: '6.24° N · 75.58° W', kit: 'Según la misión'
    };
    $('mapInfo').innerHTML = '<span class="mono" style="font-size:10px;color:' + (hp ? ACCENT : '#8A8A8A') + '">' + esc(mi.tag) + '</span>' +
      '<div><div style="font-size:32px;font-weight:900;text-transform:uppercase;letter-spacing:-.01em;line-height:1">' + esc(mi.title) + '</div><div style="font-size:14px;color:#8A8A8A;margin-top:6px">' + esc(mi.region) + '</div></div>' +
      '<p style="margin:0;font-size:15px;line-height:1.55;color:#BDBDBD">' + esc(mi.mission) + '</p>' +
      '<div class="mono" style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;font-size:11px;border-top:1px solid #262626;padding-top:14px">' +
      '<div><div style="color:#8A8A8A;font-size:9px">Distancia a base</div><div style="margin-top:4px">' + mi.dist + '</div></div>' +
      '<div><div style="color:#8A8A8A;font-size:9px">Coordenadas</div><div style="margin-top:4px">' + mi.coords + '</div></div>' +
      '<div style="grid-column:1/-1"><div style="color:#8A8A8A;font-size:9px">Configuración sugerida</div><div style="margin-top:4px;text-transform:none;letter-spacing:.02em">' + esc(mi.kit) + '</div></div></div>';
  }
  function setHov(id) { if (state.hov !== id) { state.hov = id; renderMap(); } }
  ['mapDyn', 'mapList'].forEach(function (id) {
    var el = $(id);
    el.addEventListener('mouseover', function (e) { var z = e.target.closest('[data-zone]'); if (z) setHov(z.dataset.zone); });
    el.addEventListener('click', function (e) { var z = e.target.closest('[data-zone]'); if (z) setHov(z.dataset.zone); });
    el.addEventListener('focusin', function (e) { var z = e.target.closest('[data-zone]'); if (z) setHov(z.dataset.zone); });
  });
  $('mapSvg').addEventListener('mouseleave', function () { setHov(null); });
  $('mapList').addEventListener('mouseleave', function () { setHov(null); });
  $('inds').addEventListener('click', function (e) {
    var b = e.target.closest('[data-ind]'); if (!b) return;
    state.ind = b.dataset.ind; state.hov = null; renderMap();
  });

  /* ---------- portafolio ---------- */
  function cardHTML(p) {
    var qty = state.cart[p.id] || 0;
    var specs = p.sp.map(function (x) { return '<div><div class="mono" style="font-size:8.5px;color:#7A7A7A">' + esc(x[0]) + '</div><div style="font-size:13px;font-weight:600;margin-top:5px">' + esc(x[1]) + '</div></div>'; }).join('');
    return '<article class="hl" style="background:#111;border:1px solid #262626;color:#F2F2F2;display:flex;flex-direction:column">' +
      '<div style="height:200px;position:relative;overflow:hidden;border-bottom:1px solid #262626;background:#0D0D0D">' +
      '<img src="' + IMG + p.img + '" alt="' + esc(p.n) + '" loading="lazy" class="kb2" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">' +
      '<span class="mono" style="position:absolute;left:12px;top:10px;z-index:2;font-size:9px;color:#CFCFCF;background:rgba(10,10,10,.65);padding:3px 6px">' + esc(p.code) + '</span>' +
      (p.legal ? '<span class="mono" style="position:absolute;right:12px;top:10px;z-index:2;font-size:9px;padding:4px 8px;border:1px solid #F04438;color:#F04438;background:rgba(10,10,10,.65)">Validación legal</span>' : '') +
      '<span class="mono" style="position:absolute;left:12px;bottom:10px;z-index:2;font-size:8.5px;padding:3px 6px;background:rgba(10,10,10,.7);color:#A8A8A8">' + (p.render ? 'Render de referencia' : 'Imagen del portafolio') + '</span></div>' +
      '<div style="padding:22px;display:flex;flex-direction:column;gap:14px;flex-grow:1">' +
      '<span class="mono" style="font-size:9px;color:#8A8A8A">' + esc(catName(p.c)) + '</span>' +
      '<div><h3 style="margin:0;font-size:26px;font-weight:800;letter-spacing:-.01em;line-height:1.05">' + esc(p.n) + '</h3><p style="margin:6px 0 0;font-size:14px;color:#A8A8A8">' + esc(p.s) + '</p></div>' +
      '<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;border-bottom:1px solid #262626;padding-bottom:16px">' + specs + '</div>' +
      '<div><div style="display:flex;flex-wrap:wrap;align-items:baseline;gap:8px"><span style="font-size:30px;font-weight:900;letter-spacing:-.02em">' + (p.p ? fmt(p.p) : 'Bajo solicitud') + '</span><span class="mono" style="font-size:9px;color:#7A7A7A">' + (p.p ? 'COP + IVA' + (p.unit || '') : '') + '</span></div>' +
      (p.note ? '<div class="mono" style="font-size:10px;color:#A8A8A8;border-left:1px solid #5A5A5A;padding-left:8px;margin-top:6px;text-transform:none;letter-spacing:.04em">' + esc(p.note) + '</div>' : '') + '</div>' +
      '<div style="margin-top:auto;display:flex;justify-content:space-between;align-items:center;gap:12px">' +
      '<a href="#solicitud" class="ln" style="font-size:13px;font-weight:500;padding:12px 0">Ver ficha técnica <span class="arw" aria-hidden="true">↗</span></a>' +
      '<button type="button" data-add="' + p.id + '" class="btn" style="border:1px solid #5A5A5A;background:' + (qty ? '#F2F2F2' : 'transparent') + ';color:' + (qty ? '#0A0A0A' : '#F2F2F2') + ';padding:12px 16px;font-size:13px;font-weight:600;min-height:44px">' + (qty ? '✓ Agregado · ' + qty : '+ Agregar') + '</button>' +
      '</div></div></article>';
  }
  function renderCatalog() {
    var q = state.q.toLowerCase().trim();
    var list = D.products.filter(function (p) {
      return (state.cat === 'all' || p.c === state.cat) && (!q || (p.n + ' ' + p.s + ' ' + catName(p.c)).toLowerCase().indexOf(q) !== -1);
    });
    $('prods').innerHTML = list.map(cardHTML).join('');
    $('prodCount').textContent = list.length;
    $('noProds').hidden = list.length > 0;
    $('cats').innerHTML = D.cats.map(function (c) {
      var on = state.cat === c.id;
      var n = c.id === 'all' ? D.products.length : D.products.filter(function (p) { return p.c === c.id; }).length;
      return '<button type="button" data-cat="' + c.id + '" aria-pressed="' + on + '" class="chip" style="font-size:13px;font-weight:500;padding:10px 12px;min-height:40px;background:transparent;border:0;border-bottom:2px solid ' + (on ? '#F2F2F2' : 'transparent') + ';color:' + (on ? '#F2F2F2' : '#8A8A8A') + '">' + c.n + ' <span class="mono" style="font-size:9px;letter-spacing:0;color:#6A6A6A">' + n + '</span></button>';
    }).join('');
  }
  $('cats').addEventListener('click', function (e) { var b = e.target.closest('[data-cat]'); if (!b) return; state.cat = b.dataset.cat; renderCatalog(); });
  $('search').addEventListener('input', function (e) { state.q = e.target.value; renderCatalog(); });

  /* ---------- configuraciones ---------- */
  function renderPacks() {
    $('packs').innerHTML = D.packs.map(function (k, i) {
      var total = 0;
      var rows = k.items.map(function (id) { var p = byId[id]; total += p.p; return '<div style="display:flex;justify-content:space-between;gap:12px;font-size:14px;color:#3A3A3A"><span>' + esc(p.n) + '</span><span class="mono" style="letter-spacing:0">' + fmt(p.p) + '</span></div>'; }).join('');
      return '<div class="hl rv" style="border:1px solid #C8C8C8;background:#F5F5F5;padding:28px;display:flex;flex-direction:column;gap:22px">' +
        '<span class="mono" style="font-size:9px;color:#555">' + esc(k.code) + '</span><h3 style="margin:0;font-size:30px;font-weight:800;letter-spacing:-.01em">' + esc(k.n) + '</h3>' +
        '<div style="display:flex;flex-direction:column;gap:10px;min-height:140px">' + rows + '</div>' +
        '<div style="border-top:1px solid #C8C8C8;padding-top:18px"><div style="font-size:40px;font-weight:900;letter-spacing:-.02em">' + fmt(total) + '</div><div class="mono" style="font-size:9px;color:#555;margin-top:4px">COP + IVA</div></div>' +
        '<button type="button" data-pack="' + i + '" class="btn" style="border:0;background:#1A1A1A;color:#F2F2F2;padding:16px 18px;display:flex;justify-content:space-between;font-size:14px;font-weight:600;min-height:48px">Usar configuración <span aria-hidden="true">↗</span></button></div>';
    }).join('');
  }
  $('packs').addEventListener('click', function (e) {
    var b = e.target.closest('[data-pack]'); if (!b) return;
    var k = D.packs[+b.dataset.pack];
    k.items.forEach(function (id) { state.cart[id] = (state.cart[id] || 0) + 1; });
    cartChanged(k.n);
  });

  /* ---------- ADN ---------- */
  function droneHTML(c) {
    var arms = '';
    for (var i = 0; i < 6; i++) {
      var deg = 30 + i * 60;
      arms += '<div style="position:absolute;left:50%;top:50%;width:128px;height:7px;margin-top:-3.5px;transform-origin:0 50%;transform:rotate(' + deg + 'deg);background:' + c.arm + ';border-radius:4px;transition:background .3s">' +
        '<div style="position:absolute;right:-18px;top:50%;width:36px;height:36px;margin-top:-18px">' +
        '<div style="position:absolute;left:50%;top:50%;width:100px;height:100px;margin:-50px 0 0 -50px;border-radius:50%;border:1px solid ' + c.prop + ';opacity:.4"></div>' +
        '<div class="blade" style="position:absolute;left:50%;top:50%;width:96px;height:5px;margin:-2.5px 0 0 -48px;border-radius:3px;background:linear-gradient(90deg,transparent,' + c.prop + ' 22%,' + c.prop + ' 78%,transparent);animation-delay:' + (-i * 0.07) + 's"></div>' +
        '<div style="position:absolute;inset:0;border-radius:50%;background:#161616;border:2px solid ' + c.motor + ';transition:border-color .3s"></div></div></div>';
    }
    return '<div class="dz" style="position:absolute;left:50%;top:54%;width:340px;height:340px;margin:-170px 0 0 -170px">' +
      '<div style="position:absolute;left:50%;top:50%;width:10px;height:210px;margin:-105px 0 0 -84px;border:1px dashed ' + c.gear + '"></div>' +
      '<div style="position:absolute;left:50%;top:50%;width:10px;height:210px;margin:-105px 0 0 74px;border:1px dashed ' + c.gear + '"></div>' + arms +
      '<div style="position:absolute;left:50%;top:50%;width:104px;height:104px;margin:-52px 0 0 -52px;border-radius:22px;background:#141414;border:2px solid ' + c.body + ';display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px">' +
      '<div style="width:58px;height:22px;border:2px solid ' + c.bat + ';border-radius:4px"></div><div style="width:18px;height:18px;border:2px solid ' + c.fc + '"></div></div>' +
      '<div style="position:absolute;left:50%;top:50%;width:3px;height:34px;margin:-84px 0 0 -16px;background:' + c.ant + ';border-radius:2px"></div>' +
      '<div style="position:absolute;left:50%;top:50%;width:3px;height:34px;margin:-84px 0 0 13px;background:' + c.ant + ';border-radius:2px"></div>' +
      '<div style="position:absolute;left:50%;top:50%;width:30px;height:30px;margin:54px 0 0 -15px;border-radius:50%;border:2px solid ' + c.cam + ';background:#0D0D0D;display:flex;align-items:center;justify-content:center"><span style="width:10px;height:10px;border-radius:50%;background:' + c.cam + '"></span></div></div>';
  }
  function renderADN() {
    var P = state.part;
    var hc = function (id, base) { return P === id ? ACCENT : (P ? '#262626' : base); };
    var c = { arm: hc('arm', '#4A4A4A'), motor: hc('motor', '#BDBDBD'), prop: hc('prop', '#8A8A8A'), bat: hc('bat', '#6A6A6A'), fc: hc('fc', '#9A9A9A'), cam: hc('cam', '#BDBDBD'), ant: hc('ant', '#9A9A9A'), gear: hc('gear', '#3A3A3A'), body: hc('arm', '#3A3A3A') };
    if (state.view === 'foto') {
      $('adnView').innerHTML = '<img src="' + IMG + 'adn.jpg" alt="Plataforma ARKANGEL en fibra de carbono" class="kb" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"><div style="position:absolute;inset:0;pointer-events:none;background:linear-gradient(180deg,rgba(10,10,10,.55) 0%,transparent 25%,transparent 70%,rgba(10,10,10,.8) 100%)"></div><div class="scan"></div>';
    } else {
      $('adnView').innerHTML = droneHTML(c);
    }
    var info = D.components.find(function (x) { return x.id === P; }) || { n: 'Arquitectura común', d: 'Pasa el cursor sobre un componente para resaltarlo en la plataforma.' };
    $('partInfo').innerHTML = '<div class="mono" style="font-size:10px;color:' + (P ? ACCENT : '#8A8A8A') + '">' + esc(info.n) + '</div><div style="font-size:12px;color:#A8A8A8;margin-top:4px;line-height:1.4">' + esc(info.d) + '</div>';
    $('comps').innerHTML = D.components.map(function (cp) {
      var on = P === cp.id;
      return '<button type="button" data-part="' + cp.id + '" class="btn" style="text-align:left;background:transparent;border:0;border-left:2px solid ' + (on ? ACCENT : '#262626') + ';padding:8px 14px;color:' + (on ? '#F2F2F2' : '#BDBDBD') + ';min-height:56px"><span style="display:block;font-size:18px;font-weight:800">' + esc(cp.n) + '</span><span style="display:block;font-size:12px;color:#8A8A8A;margin-top:4px">' + esc(cp.d) + '</span></button>';
    }).join('');
    document.querySelectorAll('[data-view]').forEach(function (b) {
      var on = b.dataset.view === state.view;
      b.style.background = on ? '#F2F2F2' : 'transparent'; b.style.color = on ? '#0A0A0A' : '#A8A8A8';
      b.setAttribute('aria-pressed', on);
    });
  }
  function setPart(id) { if (state.part !== id || state.view !== 'desp') { state.part = id; state.view = 'desp'; renderADN(); } }
  ['mouseover', 'focusin', 'click'].forEach(function (ev) {
    $('comps').addEventListener(ev, function (e) { var b = e.target.closest('[data-part]'); if (b) setPart(b.dataset.part); });
  });
  $('comps').addEventListener('mouseleave', function () { state.part = null; renderADN(); });
  document.querySelectorAll('[data-view]').forEach(function (b) {
    b.addEventListener('click', function () { state.view = b.dataset.view; if (state.view === 'foto') state.part = null; renderADN(); });
  });

  /* ---------- carrito / solicitud ---------- */
  var toastTimer;
  function toast(name) {
    var t = $('toast');
    t.innerHTML = '<span style="width:8px;height:8px;background:' + ACCENT + ';transform:rotate(45deg)"></span><span><strong>' + esc(name) + '</strong> agregado a tu solicitud</span><a href="#solicitud" style="color:#0A0A0A;font-weight:600">Ver</a>';
    t.hidden = false; t.classList.remove('in'); void t.offsetWidth; t.classList.add('in');
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { t.hidden = true; }, 2400);
  }
  function cartTotals() {
    var ids = Object.keys(state.cart).filter(function (id) { return byId[id]; });
    var count = 0, total = 0, pending = 0;
    ids.forEach(function (id) { var p = byId[id], n = state.cart[id]; count += n; if (p.p) total += p.p * n; else pending++; });
    return { ids: ids, count: count, total: total, pending: pending };
  }
  function renderCart() {
    var t = cartTotals();
    var badge = $('cartBadge');
    badge.textContent = t.count; badge.style.background = t.count ? ACCENT : '#F2F2F2'; badge.style.color = t.count ? '#fff' : '#0A0A0A';
    var rows = t.ids.map(function (id) {
      var p = byId[id], n = state.cart[id];
      return '<div class="row" style="display:flex;align-items:center;gap:12px;padding:12px 20px;border-bottom:1px solid #1E1E1E">' +
        '<div style="flex-grow:1;min-width:0"><div style="font-size:14px;font-weight:600">' + esc(p.n) + '</div><div class="mono" style="font-size:9px;color:#7A7A7A;margin-top:3px">' + esc(p.code) + '</div></div>' +
        '<div style="display:flex;align-items:center;border:1px solid #333"><button type="button" data-dec="' + id + '" aria-label="Quitar uno de ' + esc(p.n) + '" style="width:36px;height:36px;border:0;background:transparent;color:#F2F2F2">−</button><span class="mono" style="min-width:26px;text-align:center;font-size:12px">' + n + '</span><button type="button" data-add="' + id + '" aria-label="Agregar uno de ' + esc(p.n) + '" style="width:36px;height:36px;border:0;background:transparent;color:#F2F2F2">+</button></div>' +
        '<span class="mono" style="font-size:12px;min-width:120px;text-align:right;letter-spacing:0">' + (p.p ? fmt(p.p * n) : 'Bajo solicitud') + '</span></div>';
    }).join('');
    $('cart').innerHTML =
      '<div style="display:flex;justify-content:space-between;align-items:center;padding:16px 20px;border-bottom:1px solid #262626"><span class="mono" style="font-size:11px">Tu solicitud</span><span class="mono" style="font-size:11px;color:#8A8A8A">' + t.count + ' ítems</span></div>' +
      (t.count ? rows : '<div style="padding:32px 20px;font-size:14px;color:#8A8A8A;line-height:1.6">Aún no has agregado equipos. Explora el <a href="#portafolio" class="ln">portafolio</a> o usa una <a href="#configuraciones" class="ln">configuración de referencia</a>.</div>') +
      '<div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:baseline;gap:8px;padding:18px 20px"><span class="mono" style="font-size:11px;color:#8A8A8A">Total estimado · COP + IVA</span><span style="font-size:30px;font-weight:900;letter-spacing:-.02em">' + fmt(t.total) + '</span></div>' +
      (t.pending ? '<div style="padding:0 20px 18px;font-size:12px;color:#A8A8A8">+ ' + t.pending + ' referencia(s) con precio bajo solicitud, sujetas a validación.</div>' : '');
  }
  function cartChanged(name) {
    saveCart(); renderCart(); renderCatalog();
    if (name) toast(name);
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-add]');
    if (a) { var id = a.dataset.add; state.cart[id] = (state.cart[id] || 0) + 1; cartChanged(byId[id].n); return; }
    var d = e.target.closest('[data-dec]');
    if (d) { var k = d.dataset.dec; state.cart[k] = (state.cart[k] || 0) - 1; if (state.cart[k] <= 0) delete state.cart[k]; cartChanged(); }
  });

  $('requestForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var f = e.target, t = cartTotals();
    var ref = 'ARK-' + String(Date.now()).slice(-6);
    var lines = t.ids.map(function (id) { var p = byId[id]; return '- ' + p.n + ' (' + p.code + ') x' + state.cart[id] + ': ' + (p.p ? fmt(p.p * state.cart[id]) : 'Bajo solicitud'); });
    var body = 'Referencia: ' + ref + '\n\nNombre: ' + f.nombre.value + '\nEntidad: ' + f.entidad.value + '\nCorreo: ' + f.correo.value + '\nTipo de entidad: ' + f.tipo.value +
      '\n\nMisión:\n' + f.mision.value + '\n\nEquipos solicitados:\n' + (lines.length ? lines.join('\n') : '(ninguno)') + '\n\nTotal estimado: ' + fmt(t.total) + ' COP + IVA';
    window.location.href = 'mailto:' + D.contactEmail + '?subject=' + encodeURIComponent('Solicitud ' + ref + ' — ' + f.entidad.value) + '&body=' + encodeURIComponent(body);
    $('refCode').textContent = ref;
    f.hidden = true; $('sent').hidden = false;
  });

  /* ---------- inicio ---------- */
  renderHero(); renderMap(); renderCatalog(); renderPacks(); renderADN(); renderCart();
})();
