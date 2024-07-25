document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("urlForm");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    analyzeURLs();
  });

  const copyButton = document.getElementById("copyButton");
  copyButton.addEventListener("click", function () {
    copyURLs();
  });
});

function analyzeURLs() {
  const urls = document.getElementById("urls").value.trim().split("\n");
  const domainMap = {};

  urls.forEach((url) => {
    const decodedUrl = decodeURIComponent(url);
    const parser = document.createElement("a");
    parser.href = decodedUrl;
    const domainAndPath = "https://" + parser.hostname + parser.pathname; // Combine domain and path

    if (!domainMap[domainAndPath]) {
      domainMap[domainAndPath] = {
        count: 0,
        originalUrls: new Set(), // To display the URLs as entered
        uniqueParams: new Set(), // To save only the unique parameters
      };
    }
    domainMap[domainAndPath].count += 1;
    domainMap[domainAndPath].originalUrls.add(url); // Add the original URL
    domainMap[domainAndPath].uniqueParams.add(parser.search); // Add only the parameters
  });

  const resultsBody = document.getElementById("resultsBody");
  resultsBody.innerHTML = "";
  Object.keys(domainMap).forEach((domainPath) => {
    const info = domainMap[domainPath];
    const originalUrlsList = Array.from(info.originalUrls).join("<br>"); // List of original URLs
    const fullUrlsList = Array.from(info.uniqueParams)
      .map((params) => `${domainPath}${params}`)
      .join("<br>"); // List of decoded URLs with parameters
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${originalUrlsList}</td>
      <td>${fullUrlsList}</td>
      <td>${info.count}</td>
    `;
    resultsBody.appendChild(row);
  });

  document.getElementById("results").classList.remove("d-none");
  document.getElementById("copyButton").classList.remove("d-none"); // Show the button
}

function copyURLs() {
  const resultsBody = document.getElementById("resultsBody");
  const rows = resultsBody.getElementsByTagName("tr");
  let urls = [];

  for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].getElementsByTagName("td");
    if (cells.length > 1) {
      urls.push(cells[1].textContent.split("<br>").join("\n"));
    }
  }

  const urlsText = urls.join("\n");

  // Create a textarea element to copy the URLs
  const textArea = document.createElement("textarea");
  textArea.value = urlsText;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);

  alert("URLs copied to clipboard");
}
