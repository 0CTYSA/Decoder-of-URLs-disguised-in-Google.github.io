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
    const baseDomain = "https://" + parser.hostname;

    if (!domainMap[baseDomain]) {
      domainMap[baseDomain] = {
        count: 0,
        urls: new Set(), // Utilizamos un Set para evitar duplicados de URLs completas
      };
    }
    domainMap[baseDomain].count += 1;
    domainMap[baseDomain].urls.add(decodedUrl); // Agrega la URL completa al conjunto
  });

  const resultsBody = document.getElementById("resultsBody");
  resultsBody.innerHTML = "";
  Object.keys(domainMap).forEach((domain) => {
    const info = domainMap[domain];
    const urlsList = Array.from(info.urls).join("<br>"); // Convierte el conjunto en un string separado por saltos de línea
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${urlsList}</td>
      <td>${domain}</td>
      <td>${info.count}</td>
    `;
    resultsBody.appendChild(row);
  });

  document.getElementById("results").classList.remove("d-none");
}
