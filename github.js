document.addEventListener("DOMContentLoaded", async () => {
  const username = "amanzanos";
  const container = document.getElementById("github-container");

  try {
    // Obtener repositorios más recientes
    const reposRes = await fetch(`https://api.github.com/users/amanzanos/repos?sort=updated&per_page=6`);
    const repos = await reposRes.json();

    for (const repo of repos) {
      // Crear card básica
      const card = document.createElement("div");
      card.className = "github-card";

      // Obtener último commit
      let lastCommitMsg = "Sin commits recientes";
      try {
        const commitsRes = await fetch(`https://api.github.com/repos/amanzanos/${repo.name}/commits?per_page=1`);
        const commits = await commitsRes.json();
        if (Array.isArray(commits) && commits.length > 0) {
          lastCommitMsg = commits[0].commit.message;
        }
      } catch (err) {
        console.error(`Error obteniendo commits de ${repo.name}:`, err);
      }

      // Rellenar contenido
      card.innerHTML = `
        <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
        <p>${repo.description ? repo.description : "Sin descripción"}</p>
        <div class="github-stats">
          <span><i class="fa-solid fa-star"></i> ${repo.stargazers_count}</span>
          <span><i class="fa-solid fa-code-branch"></i> ${repo.forks_count}</span>
        </div>
        <p class="last-commit"><strong>Último commit:</strong> ${lastCommitMsg}</p>
      `;

      container.appendChild(card);
    }
  } catch (err) {
    container.innerHTML = "<p>No se pudieron cargar los repositorios.</p>";
    console.error(err);
  }
});
