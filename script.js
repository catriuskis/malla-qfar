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

    if (!elem.classList.contains('aprobado')) {
      elem.classList.toggle('bloqueado', !puedeDesbloquear);
    } else {
      elem.classList.remove('bloqueado');
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