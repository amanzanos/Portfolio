document.addEventListener("DOMContentLoaded", () => {
  const username = "alejandromanzanos";
  const container = document.getElementById("github-container");

  fetch(`https://api.github.com/users/amanzanos/repos?sort=updated&per_page=6`)
    .then(res => res.json())
    .then(repos => {
      repos.forEach(repo => {
        const card = document.createElement("div");
        card.className = "github-card";
        card.innerHTML = `
          <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
          <p>${repo.description ? repo.description : "Sin descripción"}</p>
          <div class="github-stats">
            <span><i class="fa-solid fa-star"></i> ${repo.stargazers_count}</span>
            <span><i class="fa-solid fa-code-branch"></i> ${repo.forks_count}</span>
          </div>
        `;
        container.appendChild(card);
      });
    })
    .catch(err => {
      container.innerHTML = "<p>No se pudieron cargar los repositorios.</p>";
      console.error(err);
    });
});
