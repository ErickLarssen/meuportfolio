console.log('📦 email.js carregado');
// Seleciona o formulário pelo seu elemento ou classe, se houver
const contactForm = document.querySelector('.contact form'); // Ajuste o seletor se seu form tiver um ID específico

contactForm.addEventListener('submit', async (event) => {
    console.log('🟢 Formulário capturado');
    event.preventDefault(); // Impede o envio padrão do formulário (que recarregaria a página)

    const formData = new FormData(contactForm); // Coleta todos os dados do formulário
    const data = Object.fromEntries(formData.entries()); // Converte FormData para um objeto JavaScript

    console.log('Dados a enviar:', data);

    try {
        const response = await fetch('http://localhost:3000/send-email', { // URL do seu servidor Node.js
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // Envia os dados como JSON
        });

        const result = await response.json(); // Pega a resposta do servidor

        if (response.ok) {
            // Mostra a modal de confirmação
            document.getElementById('modal-confirm').classList.add('active');
            contactForm.reset(); // Limpa o formulário após o envio
        } else {
            alert(`Erro ao enviar mensagem: ${result.message || 'Erro desconhecido'}`);
        }
        // ...existing code...
        // Fechar a modal de confirmação
        document.getElementById('close-confirm').onclick = function () {
            document.getElementById('modal-confirm').classList.remove('active');
        };
        document.getElementById('modal-confirm').onclick = function (e) {
            if (e.target === this) this.classList.remove('active');
        };
    } catch (error) {
        console.error('Erro de rede ou servidor:', error);
        alert('Erro ao conectar com o servidor. Tente novamente mais tarde.');
    }
});