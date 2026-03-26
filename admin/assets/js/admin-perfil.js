// === CONTADOR DE CARACTERES ===
        const biografia = document.getElementById('biografia');
        const contadorCaracteres = document.getElementById('contadorCaracteres');
        
        if (biografia) {
            biografia.addEventListener('input', function() {
                contadorCaracteres.textContent = this.value.length;
            });
        }
        
        // === MODAL SENHA ===
        function abrirModalSenha() {
            document.getElementById('modalSenha').classList.add('ativo');
            document.body.style.overflow = 'hidden';
            resetarModalSenha();
        }
        
        function fecharModalSenha() {
            document.getElementById('modalSenha').classList.remove('ativo');
            document.body.style.overflow = '';
        }
        
        function resetarModalSenha() {
            document.getElementById('senhaAtual').value = '';
            document.getElementById('novaSenha').value = '';
            document.getElementById('confirmarSenha').value = '';
            document.getElementById('barraForca').style.width = '0%';
            document.getElementById('textoForca').textContent = 'Fraca';
            document.getElementById('encerrarSessoes').checked = true;
            document.getElementById('notificarEmail').checked = true;
            
            // Resetar requisitos
            const requisitos = document.querySelectorAll('.requisito');
            requisitos.forEach(req => {
                req.querySelector('i').className = 'fas fa-circle';
                req.classList.add('pendente');
            });
        }
        
        // === MODAL 2FA ===
        function abrirModal2FA() {
            document.getElementById('modal2FA').classList.add('ativo');
            document.body.style.overflow = 'hidden';
        }
        
        function fecharModal2FA() {
            document.getElementById('modal2FA').classList.remove('ativo');
            document.body.style.overflow = '';
        }
        
        function ativar2FA() {
            mostrarNotificacao('Autenticação de dois fatores ativada com sucesso!', 'sucesso');
            fecharModal2FA();
            
            // Atualizar widget
            const item2FA = document.querySelector('.item-widget .fa-times-circle')?.parentElement;
            if (item2FA) {
                item2FA.innerHTML = '<i class="fas fa-check-circle" style="color: var(--sucesso);"></i> <span>2FA: Ativado</span>';
            }
        }
        
        // === FORÇA DA SENHA ===
        function verificarForcaSenha() {
            const senha = document.getElementById('novaSenha').value;
            const barra = document.getElementById('barraForca');
            const texto = document.getElementById('textoForca');
            
            const req1 = document.getElementById('req1');
            const req2 = document.getElementById('req2');
            const req3 = document.getElementById('req3');
            const req4 = document.getElementById('req4');
            
            // Verificar requisitos individuais
            if (senha.length >= 8) {
                req1.querySelector('i').className = 'fas fa-check-circle';
                req1.classList.remove('pendente');
            } else {
                req1.querySelector('i').className = 'fas fa-circle';
                req1.classList.add('pendente');
            }
            
            if (/[a-z]/.test(senha) && /[A-Z]/.test(senha)) {
                req2.querySelector('i').className = 'fas fa-check-circle';
                req2.classList.remove('pendente');
            } else {
                req2.querySelector('i').className = 'fas fa-circle';
                req2.classList.add('pendente');
            }
            
            if (/[0-9]/.test(senha)) {
                req3.querySelector('i').className = 'fas fa-check-circle';
                req3.classList.remove('pendente');
            } else {
                req3.querySelector('i').className = 'fas fa-circle';
                req3.classList.add('pendente');
            }
            
            if (/[^a-zA-Z0-9]/.test(senha)) {
                req4.querySelector('i').className = 'fas fa-check-circle';
                req4.classList.remove('pendente');
            } else {
                req4.querySelector('i').className = 'fas fa-circle';
                req4.classList.add('pendente');
            }
            
            // Calcular força geral
            let forca = 0;
            if (senha.length >= 8) forca += 25;
            if (/[a-z]/.test(senha) && /[A-Z]/.test(senha)) forca += 25;
            if (/[0-9]/.test(senha)) forca += 25;
            if (/[^a-zA-Z0-9]/.test(senha)) forca += 25;
            
            barra.style.width = forca + '%';
            
            if (forca < 50) {
                barra.style.background = '#dc3545';
                texto.textContent = 'Fraca';
            } else if (forca < 75) {
                barra.style.background = '#ffc107';
                texto.textContent = 'Média';
            } else {
                barra.style.background = '#28a745';
                texto.textContent = 'Forte';
            }
        }
        
        function alterarSenha() {
            const novaSenha = document.getElementById('novaSenha').value;
            const confirmarSenha = document.getElementById('confirmarSenha').value;
            
            if (novaSenha !== confirmarSenha) {
                mostrarNotificacao('As senhas não coincidem!', 'erro');
                return;
            }
            
            if (novaSenha.length < 8) {
                mostrarNotificacao('A senha deve ter pelo menos 8 caracteres!', 'erro');
                return;
            }
            
            mostrarNotificacao('Senha alterada com sucesso!', 'sucesso');
            fecharModalSenha();
        }
        
        // === NOTIFICAÇÃO ===
        function mostrarNotificacao(mensagem, tipo = 'sucesso') {
            const notif = document.createElement('div');
            const corFundo = tipo === 'sucesso' ? '#28a745' : tipo === 'erro' ? '#dc3545' : '#17a2b8';
            
            notif.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 16px 28px;
                background: linear-gradient(135deg, ${corFundo}, ${corFundo}dd);
                color: #fff;
                border-radius: 12px;
                box-shadow: 0 8px 25px ${corFundo}66;
                z-index: 99999;
                font-weight: 600;
                font-size: 15px;
                display: flex;
                align-items: center;
                gap: 10px;
                animation: slideIn 0.3s ease;
            `;
            
            const icone = tipo === 'sucesso' ? 'fa-check-circle' : tipo === 'erro' ? 'fa-exclamation-circle' : 'fa-info-circle';
            notif.innerHTML = `<i class="fas ${icone}"></i> ${mensagem}`;
            
            document.body.appendChild(notif);
            
            setTimeout(() => {
                notif.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notif.remove(), 300);
            }, 3000);
        }
        
        // === GUARDAR PERFIL ===
        function guardarPerfil() {
            const dados = {
                nome: document.getElementById('campoNome')?.value,
                email: document.getElementById('campoEmail')?.value,
                telefone: document.getElementById('campoTelefone')?.value,
                cargo: document.getElementById('campoCargo')?.value,
                departamento: document.getElementById('campoDepartamento')?.value,
                biografia: document.getElementById('biografia')?.value,
                idioma: document.getElementById('idioma')?.value,
                fusoHorario: document.getElementById('fusoHorario')?.value,
                tema: document.getElementById('tema')?.value,
                tamanhoFonte: document.getElementById('tamanhoFonte')?.value
            };
            
            console.log('Dados guardados:', dados);
            mostrarNotificacao('Perfil atualizado com sucesso!', 'sucesso');
        }
        
        function descartarAlteracoes() {
            if (confirm('Tem certeza que deseja descartar todas as alterações?')) {
                location.reload();
            }
        }
        
        // === FECHAR MODAIS COM ESC ===
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                if (document.getElementById('modalSenha').classList.contains('ativo')) {
                    fecharModalSenha();
                }
                if (document.getElementById('modal2FA').classList.contains('ativo')) {
                    fecharModal2FA();
                }
            }
        });
        
        // === FECHAR MODAIS CLICANDO FORA ===
        document.getElementById('modalSenha').addEventListener('click', function(e) {
            if (e.target === this) fecharModalSenha();
        });
        
        document.getElementById('modal2FA').addEventListener('click', function(e) {
            if (e.target === this) fecharModal2FA();
        });
        
        // === INICIALIZAÇÃO ===
        document.addEventListener('DOMContentLoaded', function() {
            console.log('Página Meu Perfil carregada!');
            
            // Adicionar animações CSS
            const style = document.createElement('style');
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        });
