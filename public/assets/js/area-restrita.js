document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formularioLogin');
    const botao = document.getElementById('botaoSubmeter');
    const campoEmail = document.getElementById('campoEmail');
    const campoSenha = document.getElementById('campoSenha');

    if (!form || !botao) return;

    if (botao.tagName.toLowerCase() === 'a') {
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.className = botao.className;
        submitButton.id = botao.id;
        submitButton.innerHTML = botao.innerHTML;
        botao.replaceWith(submitButton);
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const submit = document.getElementById('botaoSubmeter');
        submit.disabled = true;

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: JSON.stringify({
                    email: campoEmail.value.trim(),
                    password: campoSenha.value
                })
            });

            const data = await response.json();
            if (!response.ok || !data.ok) {
                throw new Error(data?.mensagem ?? 'Falha no login.');
            }

            window.location.href = data.redirect;
        } catch (error) {
            alert(error.message);
        } finally {
            submit.disabled = false;
        }
    });
});
