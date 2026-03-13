const routes = {
    404: {html: "/screens/error.html", js:"./pages/404.js"},
    "/": {html: "/screens/urls.html", js:"./pages/urls.js"},
    "/urls": {html: "/screens/urls.html", js:"./pages/urls.js"},
    "/tags": {html: "/screens/tags.html", js:"./pages/tags.js"},
    "/text": {html: "/screens/text.html", js:"./pages/text.js"},
};

async function navigate(path) {
    window.history.pushState({}, "", path);

    const route = routes[path] || routes[404];

    try {
        const resp = await fetch(route.html);
        const html = await resp.text();
        document.getElementById("index").innerHTML = html;

        const modulo = await import(route.js);
        modulo.init();
    } catch (e) {
        console.error("Erro ao carregar a pagina: ", e);
    }
}

window.onpopstate = () => navigate(window.location.pathname); /* lida com a ação de VOLTAR da pagina */

/* --- Carregar a pagina inicial --- */
navigate(window.location.pathname);

document.getElementById("link_urls").addEventListener("click", (event) => {
    event.preventDefault();
    navigate('/urls');
});

document.getElementById("link_tags").addEventListener("click", (event) => {
    event.preventDefault();
    navigate('/tags');
});

document.getElementById("link_text").addEventListener("click", (event) => {
    event.preventDefault();
    navigate('/text');
});

