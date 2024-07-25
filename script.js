document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("urlForm");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    analyzeURLs();
  });
});

function analyzeURLs() {
  const urls = document.getElementById("urls").value.trim().split("\n");
  const domainMap = {};

  urls.forEach((url) => {
    const decodedUrl = decodeURIComponent(url);
    const parser = document.createElement("a");
    parser.href = decodedUrl;
    const domainAndPath = "https://" + parser.hostname + parser.pathname; // Combina dominio y camino

    if (!domainMap[domainAndPath]) {
      domainMap[domainAndPath] = {
        count: 0,
        originalUrls: new Set(), // Para mostrar las URLs tal como se ingresaron
        uniqueParams: new Set(), // Para guardar solo los parámetros únicos
      };
    }
    domainMap[domainAndPath].count += 1;
    domainMap[domainAndPath].originalUrls.add(url); // Agrega la URL original
    domainMap[domainAndPath].uniqueParams.add(parser.search); // Agrega solo los parámetros
  });

  const resultsBody = document.getElementById("resultsBody");
  resultsBody.innerHTML = "";
  Object.keys(domainMap).forEach((domainPath) => {
    const info = domainMap[domainPath];
    const originalUrlsList = Array.from(info.originalUrls).join("<br>"); // Lista de URLs originales
    const fullUrlsList = Array.from(info.uniqueParams)
      .map((params) => `${domainPath}${params}`)
      .join("<br>"); // Lista de URLs decodificadas con parámetros
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${originalUrlsList}</td>
      <td>${fullUrlsList}</td>
      <td>${info.count}</td>
    `;
    resultsBody.appendChild(row);
  });

  document.getElementById("results").classList.remove("d-none");
}
