document.addEventListener("DOMContentLoaded", () => {
    const modalOverlay = document.querySelector(".modal-overlay");
    const modalTitle = document.querySelector(".modal-title");
    const modalContent = document.querySelector(".modal-content");
    const closeBtn = document.querySelector(".close-btn");

    // Verifique se os elementos existem antes de adicionar event listeners
    if (!modalOverlay || !modalTitle || !modalContent || !closeBtn) {
        console.error("Algum elemento do modal não foi encontrado no DOM.");
        return; // interrompe a execução para evitar erros
    }

    document.querySelectorAll(".btn").forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault();

            const serviceBox = button.parentElement;
            if (!serviceBox) {
                console.warn("Botão não tem um elemento pai (serviceBox).");
                return;
            }

            const h3 = serviceBox.querySelector("h3");
            const title = h3 ? h3.textContent : "Título não encontrado";
            const details = button.getAttribute("data-details") || "Detalhes não disponíveis";

            modalTitle.textContent = title;
            modalContent.textContent = details;
            
            modalOverlay.classList.add("active");
        });
    });

    closeBtn.addEventListener("click", () => {
        modalOverlay.classList.remove("active");
    });

    modalOverlay.addEventListener("click", (event) => {
        if (event.target === modalOverlay) {
            modalOverlay.classList.remove("active");
        }
    });
});
