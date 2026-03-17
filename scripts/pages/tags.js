export function init() {
    const txtArea = document.getElementById("txtTag");
    const btnVerificar = document.getElementById("btnVerificarTag");
    const preview = document.getElementById("preview");


    btnVerificar.addEventListener("click", () => {
        console.log("clicou no botão")
        const tagCodigo = txtArea.value;                            // Trabalhar com a separação para diversar TAGS
        if (!tagCodigo) return alert("Cole uma tag primeiro!");

        // --- Limpar o container para uma nova tag --- //
        preview.innerHTML = "";

        // --- Criar o iframe "avo" (container para isolamento) --- //
        const iframe = document.createElement("iframe");
        iframe.className = "iframeTag"
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.border = "1px dashed #ccc";

        preview.appendChild(iframe);
        console.log("gerou o iframe base");

        const htmlCompleto = `<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="margin:0;">${tagCodigo}</body></html>`;
        if (iframe.src.startsWith('blob:')) {           // limpar antes de criar um novo
            URL.revokeObjectURL(iframe.src);
        }
        const blob = new Blob([htmlCompleto], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        iframe.src = url;
    });
}
