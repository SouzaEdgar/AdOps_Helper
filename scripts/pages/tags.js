export function init() {
    const txtArea = document.getElementById("txtTag");
    const btnVerificar = document.getElementById("btnVerificarTag");
    const preview = document.getElementById("preview");

    btnVerificar.addEventListener("click", () => {
        const tagCodigo = txtArea.value;
        if (!tagCodigo) return alert("Cole uma tag primeiro!");

        preview.innerHTML = "";                                     // --- limpar o container para uma nova tag

        const iframe = document.createElement("iframe");
        iframe.className = "iframeTag";
        iframe.style.width = "100%";
        iframe.style.minHeight = "600px";
        iframe.style.border = "1px dashed #ccc";
        iframe.setAttribute('sandbox', 'allow-scripts allow-popups allow-popups-to-escape-sandbox');

        // --- verifica se está rodando local ou não para montar o caminho correto --- //
        const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
        const basePath = isLocal ? "" : "/AdOps_Helper";

        iframe.src = `${basePath}/screens/preview.html`;            // --- dessa vez aponta para a pasta correta

        // enviar a tag para o preview
        iframe.onload = () => {
            iframe.contentWindow.postMessage(tagCodigo, "*");
        };

        preview.appendChild(iframe);
    });
}
