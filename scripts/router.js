const BASE_PATH = window.location.hostname === 'localhost' ? '' : '/AdOps_Helper';
const routes = {
    404: { html: "/screens/error.html", js: "./pages/urls.js" },
    "/": { html: "/screens/urls.html", js: "./pages/urls.js" },
    "/urls": { html: "/screens/urls.html", js: "./pages/urls.js" },
    "/tags": { html: "/screens/tags.html", js: "./pages/tags.js" },
    "/text": { html: "/screens/text.html", js: "./pages/text.js" },
};

async function navigate(path) {
    window.history.pushState({}, "", path);

    const route = routes[path.replace(BASE_PATH,"")] || routes[404];

    try {
        const resp = await fetch(BASE_PATH + route.html);
        const html = await resp.text();
        document.getElementById("index").innerHTML = html;

        const modulo = await import(`./${route.js}`);
        if(modulo.init) {                                                   // garantir a existencia
            modulo.init();
        }
    } catch (e) {
        console.error("Erro ao carregar a pagina: ", e);
    }
}

window.onpopstate = () => navigate(window.location.pathname);               // lida com a ação de VOLTAR da pagina

const initialPath = window.pathRedirect || window.location.pathname;        // tratar o redirect em caso de 404, ou entregar o caminho normal
navigate(initialPath);

window.pathRedirect = null;                                                 // limpar para não interferir em navegação futura

document.getElementById("link_urls").addEventListener("click", (event) => {
    event.preventDefault();
    navigate(BASE_PATH+'/urls');
});

document.getElementById("link_tags").addEventListener("click", (event) => {
    event.preventDefault();
    navigate(BASE_PATH+'/tags');
});

document.getElementById("link_text").addEventListener("click", (event) => {
    event.preventDefault();
    navigate(BASE_PATH+'/text');
});

