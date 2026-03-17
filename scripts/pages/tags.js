export function init() {
    const txtArea = document.getElementById("txtTag");
    const btnVerificar = document.getElementById("btnVerificarTag");
    const preview = document.getElementById("preview");


    btnVerificar.addEventListener("click", () => {
        const tagCodigo = txtArea.value;
        if (!tagCodigo) return alert("Cole uma tag primeiro!");

        preview.innerHTML = "";                                     // --- limpar o container para uma nova tag
        localStorage.setItem('tag_preview', tagCodigo);             // --- salvar as tags

        // --- Criar o iframe "avo" (container para isolamento) --- //
        const iframe = document.createElement("iframe");
        iframe.className = "iframeTag"
        iframe.style.width = "100%";
        iframe.style.minHeight = "250px";
        iframe.style.border = "1px dashed #ccc";
        iframe.setAttribute('sandbox', 'allow-scripts allow-popups allow-popups-to-escape-sandbox');
        //iframe.setAttribute('sandbox', 'allow-scripts allow-popups allow-same-origin');               // para teste

        iframe.src = "preview.html";

        preview.appendChild(iframe);
    });
}
