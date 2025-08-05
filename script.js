// --- Guardar y cargar progreso desde localStorage ---
function obtenerAprobados() {
  const data = localStorage.getItem('mallaAprobados');
  return data ? JSON.parse(data) : [];
}

function guardarAprobados(aprobados) {
  localStorage.setItem('mallaAprobados', JSON.stringify(aprobados));
}

// --- Prerrequisitos de cada ramo ---
const prerequisitos = {
  'HIPA088': ['BIMI065'],
  'CIDI077': ['CIDI055'],
  'FSCA093': ['MATM067'],
  'MATM086': ['MATM067'],
  'QFAR090': ['QFAR080'],
  'QUIM098': ['QUIM077'],
  'ELECT12': [],
  'FISL100': ['HIPA088'],
  'FSCA097': ['FSCA093'],
  'QFAR125': ['QFAR090'],
  'QUIM123': ['QUIM098'],
  'QUIM129': ['QUIM098'],
  'CIDI079': ['CIDI077'],
  'BIMI166': ['FISL100', 'QUIM123'],
  'ELECT13': [],
  'QFAR130': ['FISL100', 'QFAR125'],
  'QUIM156': ['QUIM129', 'MATM086'],
  'QUIM160': ['QUIM123'],
  'QUIM169': ['QUIM129', 'FSCA097'],
  'BIMI194': ['BIMI166'],
  'HIPA145': ['BIMI166', 'FISL100'],
  'INMU157': ['BIMI166'],
  'QFAR122': ['CIDI079', 'QFAR130'],
  'QFAR140': ['QUIM169', 'QFAR130'],
  'QFAR207': ['QUIM169', 'QUIM160'],
  'BIMI172': ['BIMI194', 'HIPA145'],
  'CIDI178': ['QFAR130'],
  'PRST169': ['HIPA145', 'INMU157'],
  'QFAR209': ['BIMI166', 'QFAR140'],
  'QFAR217': ['QFAR140', 'QUIM156'],
  'QFAR218': ['BIMI166', 'QFAR207'],
  'ELECT100': [],
  'ESQF173': ['QUIM077', 'DYRE070', 'MATM067', 'QUIM169', 'QUIM129', 'BIMI065', 'BIMI065', 'HIPA088', 'BIMI166', 'BIMI194', 'QFAR218', 'CIDI055', 'QFAR122', 'MATM086', 'QFAR080', 'QUIM098', 'QFAR207', 'QFAR209', 'QFAR140', 'FISL100', 'HIPA145', 'CIDI079', 'CIDI077', 'FSCA093', 'FSCA097', 'INMU157', 'BIMI172', 'ELECT12', 'ELECT13', 'PRST169', 'QFAR130', 'QUIM156', 'QUIM123', 'QUIM160', 'CIDI178', 'QFAR090', 'QFAR125', 'QFAR217'],
  'ESTD157': ['MATM086', 'QFAR209'],
  'QFAR219': ['BIMI194', 'QFAR209'],
  'QFAR223': ['QFAR209', 'BIMI172'],
  'QFAR225': ['QFAR217'],
  'QFAR229': ['QFAR218'],
  'DPUB155': ['QFAR209', 'QFAR229', 'QFAR225'],
  'ELECT101': [],
  'QFAR231': ['QFAR223', 'QFAR219'],
  'QFAR235': ['QFAR219', 'QFAR229', 'PRST169'],
  'QFAR237': ['ESTD157', 'QFAR217'],
  'QFAR239': ['QFAR218', 'QFAR223', 'QFAR219'],
  'QFAR241': ['CIDI178', 'QFAR225'],
  'ELECT112': [],
  'ESQF200': ['ESQF173',  'ESTD157', 'QFAR219', 'QFAR223', 'QFAR225', 'QFAR229',  'ESTD157',  'DPUB155',  'ELECT101',  'QFAR231',  'QFAR235',  'QFAR237',  'QFAR239',  'ELECT100','QFAR241'],
  'QFAR245': ['QFAR237', 'QFAR231', 'QFAR235', 'QFAR239'],
  'QFAR247': ['DPUB155', 'CIDI178', 'QFAR225'],
  'QFAR251': ['QFAR237', 'QFAR231', 'QFAR235', 'QFAR239'],
  'SALP200': ['QFAR231', 'QFAR235', 'DPUB155'],
  'ESQF295': ['ESQF200', 'ELECT112', 'QFAR245', 'QFAR247', 'QFAR251', 'SALP200'],
  'ESQF296': ['ESQF200', 'ELECT112', 'QFAR245', 'QFAR247', 'QFAR251', 'SALP200'],
  'QFAR255': ['ESQF200', 'ELECT112', 'QFAR245', 'QFAR247', 'QFAR251', 'SALP200'],
  'ESQF298': ['ESQF296', 'ESQF295'],
  'QFAR260': ['QFAR255', 'ESQF295']
};

// --- Desbloquear ramos según prerrequisitos ---
function actualizarDesbloqueos(aprobados = obtenerAprobados()) {
  for (const [destino, reqs] of Object.entries(prerequisitos)) {
    const elem = document.getElementById(destino);
    if (!elem) continue;

    const puedeDesbloquear = reqs.every(r => aprobados.includes(r));

    // Manejo de desbloqueo visual
    if (!elem.classList.contains('aprobado')) {
      elem.classList.toggle('bloqueado', !puedeDesbloquear);
    } else {
      elem.classList.remove('bloqueado');
    }

    // Eliminar tooltip anterior si existe
    const existingTooltip = elem.querySelector('.tooltip');
    if (existingTooltip) elem.removeChild(existingTooltip);

    // Solo mostrar tooltip si NO está aprobado
    if (!elem.classList.contains('aprobado')) {  // <--- Esta línea evita que el tooltip salga si está aprobado

      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
if (reqs.length > 0) {
  // Caso especial para ESQF173 y ESQF200
  if (destino === 'ESQF173' || destino === 'ESQF200') {
    const textoRequisito = destino === 'ESQF173'
      ? 'Ramos 1° - 6° semestre aprobados'
      : 'Ramos 1° - 8° semestre aprobados';

    const span = document.createElement('span');
    span.textContent = textoRequisito;
    span.style.display = 'block';
    span.style.fontWeight = 'bold';
    span.style.textAlign = 'center';
    span.style.marginBottom = '4px';

    // Si puede desbloquear, color verde; sino rojo
    if (puedeDesbloquear) {
      span.style.color = '#4CAF50'; // verde suave
    } else {
      span.style.color = '#f44336'; // rojo suave
    }

    tooltip.appendChild(span);
  } else {
    // Lista normal de requisitos
    const requiereTexto = document.createElement('span');
    requiereTexto.textContent = 'Requiere:';
    requiereTexto.style.fontWeight = 'bold';
    requiereTexto.style.display = 'block';
    requiereTexto.style.marginBottom = '4px';
    tooltip.appendChild(requiereTexto);

    const ul = document.createElement('ul');
    ul.style.margin = '0';
    ul.style.paddingLeft = '1em';

    reqs.forEach(id => {
      const ramoReq = document.getElementById(id);
      let nombre = ramoReq ? Array.from(ramoReq.childNodes).find(n => n.nodeType === Node.TEXT_NODE)?.textContent.trim() : id;
      const aprobado = aprobados.includes(id);

      const li = document.createElement('li');
      li.textContent = nombre;
      li.classList.add(aprobado ? 'aprobado' : 'pendiente');
      ul.appendChild(li);
    });

    tooltip.appendChild(ul);
  }
} else {
  const sinReq = document.createElement('div');
  sinReq.textContent = 'Sin requisitos';
  sinReq.style.display = 'inline-block';
  sinReq.style.textAlign = 'center';
  sinReq.style.fontWeight = 'bold';
  sinReq.style.margin = '0 auto';
  tooltip.style.width = 'fit-content'; 
  tooltip.style.minWidth = '0';   
  tooltip.style.maxWidth = '100%';    
  tooltip.appendChild(sinReq);

}



      elem.appendChild(tooltip);
    }
  }
}



// --- Manejar clic de ramo ---
function aprobar(e) {
  const ramo = e.currentTarget;
  if (ramo.classList.contains('bloqueado')) return;

  ramo.classList.toggle('aprobado');

  let aprobados = obtenerAprobados();
  const id = ramo.id;

  if (ramo.classList.contains('aprobado')) {
    if (!aprobados.includes(id)) aprobados.push(id);
  } else {
    aprobados = aprobados.filter(r => r !== id);
  }

  guardarAprobados(aprobados);
  actualizarDesbloqueos(aprobados);
}

// Mostrar tooltip en móviles al tocar
document.addEventListener('touchstart', function (e) {
  document.querySelectorAll('.ramo.touch-show').forEach(el => {
    if (!el.contains(e.target)) el.classList.remove('touch-show');
  });

  const ramo = e.target.closest('.ramo');
  if (ramo && ramo.querySelector('.tooltip')) {
    ramo.classList.add('touch-show');
  }
});

//Resetear malla

document.getElementById("resetMallaBtn").addEventListener("click", function () {
  const ramos = document.querySelectorAll('.ramo');

  // 1. Quitar clases de todos los ramos
  ramos.forEach(ramo => {
    ramo.classList.remove('aprobado');
    ramo.classList.remove('bloqueado');
  });

  // 2. Recalcular el estado de bloqueo según los prerrequisitos
  // Asegúrate de tener un objeto `prerequisitos` como este:
  // const prerequisitos = { 'RAMO_ID': ['PRERREQ1', 'PRERREQ2'], ... };
  for (const codigo in prerequisitos) {
    const prereqs = prerequisitos[codigo];
    const ramo = document.getElementById(codigo);
    if (!ramo) continue;

    const todosAprobados = prereqs.every(pr => {
      const ramoPr = document.getElementById(pr);
      return ramoPr && ramoPr.classList.contains('aprobado');
    });

    if (!todosAprobados && prereqs.length > 0) {
      ramo.classList.add('bloqueado');
    }
  }

  // 3. (Opcional) Borrar del localStorage si estás usando eso
localStorage.removeItem('mallaAprobados');
});

// --- Inicializar al cargar la página ---
window.addEventListener('DOMContentLoaded', () => {
  const todosRamos = document.querySelectorAll('.ramo');
  const aprobados = obtenerAprobados();

  todosRamos.forEach(ramo => {
    if (aprobados.includes(ramo.id)) {
      ramo.classList.add('aprobado');
    }
    ramo.addEventListener('click', aprobar);
  });

  actualizarDesbloqueos(aprobados);
});
