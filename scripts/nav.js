const ROUTES = [
  { label: "Overall Capstone", href: "overall-capstone.html" },
  { label: "The User", href: "the-user.html" },
  { label: "Capstone Experience", href: "capstone-experience.html" },
  { label: "Annotated Bibliography", href: "annotated-bibliography.html" }
];

function currentPageFile() {
  const path = window.location.pathname;
  const file = path.split('/').pop();
  return file === "" ? "index.html" : file;
}

function buildNavLinks(activeFile) {
  return ROUTES.map((route) => {
    const isActive = route.href === activeFile;
    return `
      <li>
        <a class="nav-link" href="${route.href}"${isActive ? ' aria-current="page"' : ""}>${route.label}</a>
      </li>
    `;
  }).join("");
}

function renderHeader() {
  const mount = document.getElementById("site-header");
  if (!mount) return;

  const activeFile = currentPageFile();
  const brandCurrent = activeFile === "index.html" ? ' aria-current="page"' : "";

  mount.innerHTML = `
    <header class="site-header">
      <div class="nav-shell">
        <a class="brand" href="index.html"${brandCurrent}><img class="brand-logo" src="images/nl-logo-trans.png" alt="NetLearner"></a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">Menu</button>
        <ul id="site-nav" class="nav-menu">
          ${buildNavLinks(activeFile)}
        </ul>
      </div>
    </header>
  `;

  const toggle = mount.querySelector(".nav-toggle");
  const menu = mount.querySelector(".nav-menu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.classList.contains("open")) {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.focus();
    }
  });
}

document.addEventListener("DOMContentLoaded", renderHeader);