document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formularioContato');
    const feedback = document.getElementById('feedbackFormulario');
    const button = document.getElementById('botaoEnviar');

    if (!form) return;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const payload = {
            nome: document.getElementById('nome')?.value?.trim() ?? '',
            email: document.getElementById('email')?.value?.trim() ?? '',
            assunto: document.getElementById('assunto')?.value?.trim() ?? '',
            mensagem: document.getElementById('mensagem')?.value?.trim() ?? ''
        };

        feedback.textContent = '';
        button.disabled = true;
        button.textContent = 'A enviar...';

        try {
            const response = await fetch('/api/contactos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (!response.ok || !data.ok) {
                throw new Error(data?.mensagem ?? 'Não foi possível enviar a mensagem.');
            }

            feedback.textContent = data.mensagem;
            feedback.style.color = '#16a34a';
            form.reset();
        } catch (error) {
            feedback.textContent = error.message;
            feedback.style.color = '#dc2626';
        } finally {
            button.disabled = false;
            button.textContent = 'Enviar Mensagem';
        }
    });
});
