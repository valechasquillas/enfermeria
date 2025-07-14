async function loadJSON(url) {
  const resp = await fetch(url);
  return resp.json();
}

function guardarEstado(sigla, aprobado) {
  localStorage.setItem("ap_" + sigla, aprobado);
}
function leerEstado(sigla) {
  return localStorage.getItem("ap_" + sigla) === "true";
}

async function init() {
  const data = await loadJSON("data/data_1705.json");
  const colors = await loadJSON("data/colors_1705.json");
  const cont = document.getElementById("malla");

  for (let i = 1; i <= 10; i++) {
    let semLabel = document.createElement("div");
    semLabel.className = "semestre-label";
    semLabel.textContent = i + "° Sem.";
    cont.appendChild(semLabel);

    const lista = data["s" + i] || [];
    lista.forEach(ramo => {
      const [nombre, sigla, , , cat] = ramo;
      const cell = document.createElement("div");
      cell.className = "celda";
      cell.textContent = nombre;
      cell.style.background = colors[cat][0];

      if (leerEstado(sigla)) {
        cell.classList.add("tachado");
      }

      cell.onclick = () => {
        const isNowTacho = cell.classList.toggle("tachado");
        guardarEstado(sigla, !isNowTacho);
      };

      cont.appendChild(cell);
    });
  }
}

init();
