document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("urlForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const urls = document.getElementById("urls").value.split("\n");
      const domains = {};

      urls.forEach((url) => {
        const parser = document.createElement("a");
        parser.href = url;
        const domain = parser.hostname.split("@").pop();
        if (domains[domain]) {
          domains[domain].count += 1;
        } else {
          domains[domain] = { original: url, count: 1 };
        }
      });

      const resultsBody = document.getElementById("resultsBody");
      resultsBody.innerHTML = "";
      for (const domain in domains) {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${domains[domain].original}</td>
        <td>${domain}</td>
        <td>${domains[domain].count}</td>
      `;
        resultsBody.appendChild(row);
      }

      document.getElementById("results").classList.remove("d-none");
    });
});
