 // ===== TABS (ABAS) =====
        document.addEventListener('DOMContentLoaded', function() {
            const tabBtns = document.querySelectorAll('.tab-btn');
            const tabConteudos = document.querySelectorAll('.tab-conteudo');

            tabBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const tabId = btn.getAttribute('data-tab');
                    
                    tabBtns.forEach(b => b.classList.remove('ativo'));
                    tabConteudos.forEach(c => c.classList.remove('ativo'));
                    
                    btn.classList.add('ativo');
                    document.getElementById(tabId).classList.add('ativo');
                    
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
            });

            // Botão Resultados
            const botaoResultados = document.getElementById('botaoResultados');
            if (botaoResultados) {
                botaoResultados.addEventListener('click', () => {
                    alert('Em breve estará disponível a consulta online dos resultados. Aguarde a data de divulgação oficial.');
                });
            }
        });