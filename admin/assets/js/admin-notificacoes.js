        // ============================================
        // ADMIN - NOTIFICAÇÕES
        // Funcionalidades específicas
        // ============================================

        let notificacoesSelecionadas = new Set();

        document.addEventListener('DOMContentLoaded', function() {
            console.log('Página de Notificações carregada!');
        });

        // ===== SELEÇÃO DE NOTIFICAÇÕES =====
        function selecionarNotificacao(event, elemento) {
            const checkbox = elemento.querySelector('.checkbox-notificacao');
            if (checkbox) {
                checkbox.checked = !checkbox.checked;
                
                const id = elemento.dataset.id;
                if (checkbox.checked) {
                    notificacoesSelecionadas.add(id);
                } else {
                    notificacoesSelecionadas.delete(id);
                }
            }
        }

        function selecionarTodas() {
            const checkboxes = document.querySelectorAll('.checkbox-notificacao');
            checkboxes.forEach(cb => {
                cb.checked = true;
                const id = cb.closest('.notificacao-item').dataset.id;
                notificacoesSelecionadas.add(id);
            });
            mostrarNotificacao('Todas as notificações selecionadas', 'info');
        }

        function desmarcarTodas() {
            const checkboxes = document.querySelectorAll('.checkbox-notificacao');
            checkboxes.forEach(cb => {
                cb.checked = false;
            });
            notificacoesSelecionadas.clear();
            mostrarNotificacao('Seleção removida', 'info');
        }

        // ===== MARCAR COMO LIDA =====
        function marcarComoLida(id, event) {
            if (event) event.stopPropagation();
            
            const notificacao = document.querySelector(`.notificacao-item[data-id="${id}"]`);
            if (notificacao) {
                notificacao.classList.remove('nao-lida');
                notificacao.dataset.estado = 'lida';
                
                // Atualizar contador
                atualizarContadores();
                
                mostrarNotificacao('Notificação marcada como lida', 'success');
            }
        }

        function marcarTodasLidas() {
            const naoLidas = document.querySelectorAll('.notificacao-item.nao-lida');
            naoLidas.forEach(item => {
                item.classList.remove('nao-lida');
                item.dataset.estado = 'lida';
            });
            
            atualizarContadores();
            mostrarNotificacao('Todas as notificações foram marcadas como lidas', 'success');
        }

        function marcarSelecionadasLidas() {
            if (notificacoesSelecionadas.size === 0) {
                mostrarNotificacao('Nenhuma notificação selecionada', 'warning');
                return;
            }
            
            notificacoesSelecionadas.forEach(id => {
                const notificacao = document.querySelector(`.notificacao-item[data-id="${id}"]`);
                if (notificacao) {
                    notificacao.classList.remove('nao-lida');
                    notificacao.dataset.estado = 'lida';
                }
            });
            
            notificacoesSelecionadas.clear();
            desmarcarTodas();
            atualizarContadores();
            
            mostrarNotificacao('Notificações selecionadas marcadas como lidas', 'success');
        }

        // ===== ELIMINAR NOTIFICAÇÕES =====
        function eliminarNotificacao(id, event) {
            if (event) event.stopPropagation();
            
            if (confirm('Tem certeza que deseja eliminar esta notificação?')) {
                const notificacao = document.querySelector(`.notificacao-item[data-id="${id}"]`);
                if (notificacao) {
                    notificacao.style.animation = 'fadeOut 0.3s ease';
                    setTimeout(() => {
                        notificacao.remove();
                        atualizarContadores();
                        mostrarNotificacao('Notificação eliminada', 'success');
                    }, 300);
                }
            }
        }

        function eliminarSelecionadas() {
            if (notificacoesSelecionadas.size === 0) {
                mostrarNotificacao('Nenhuma notificação selecionada', 'warning');
                return;
            }
            
            if (confirm(`Tem certeza que deseja eliminar ${notificacoesSelecionadas.size} notificação(ns)?`)) {
                notificacoesSelecionadas.forEach(id => {
                    const notificacao = document.querySelector(`.notificacao-item[data-id="${id}"]`);
                    if (notificacao) {
                        notificacao.remove();
                    }
                });
                
                notificacoesSelecionadas.clear();
                atualizarContadores();
                mostrarNotificacao('Notificações eliminadas', 'success');
            }
        }

        function confirmarLimparTodas() {
            const modalConfirmacao = document.getElementById('modalConfirmacao');
            const corpo = document.getElementById('modalConfirmacaoCorpo');
            const acao = document.getElementById('modalConfirmacaoAcao');
            
            corpo.innerHTML = '<p>Tem certeza que deseja eliminar <strong>TODAS</strong> as notificações?</p><p style="color: #dc3545; font-size: 12px;">Esta ação não pode ser desfeita.</p>';
            acao.onclick = function() {
                const lista = document.getElementById('listaNotificacoes');
                lista.innerHTML = '';
                fecharModalConfirmacao();
                mostrarNotificacao('Todas as notificações foram eliminadas', 'success');
                atualizarContadores();
            };
            
            modalConfirmacao.classList.add('ativo');
            document.body.style.overflow = 'hidden';
        }

        // ===== FILTROS =====
        function filtrarNotificacoes() {
            const tipo = document.getElementById('filtroTipo').value;
            const estado = document.getElementById('filtroEstado').value;
            const periodo = document.getElementById('filtroPeriodo').value;
            
            const notificacoes = document.querySelectorAll('.notificacao-item');
            
            notificacoes.forEach(item => {
                const itemTipo = item.dataset.tipo;
                const itemEstado = item.dataset.estado;
                const itemData = new Date(item.dataset.data);
                
                let mostrar = true;
                
                // Filtro por tipo
                if (tipo !== 'todas' && itemTipo !== tipo) mostrar = false;
                
                // Filtro por estado
                if (estado !== 'todas' && itemEstado !== estado) mostrar = false;
                
                // Filtro por período
                if (periodo !== 'todos') {
                    const hoje = new Date();
                    const inicioDia = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
                    
                    if (periodo === 'hoje' && itemData < inicioDia) mostrar = false;
                    if (periodo === 'semana') {
                        const inicioSemana = new Date(hoje);
                        inicioSemana.setDate(hoje.getDate() - hoje.getDay());
                        if (itemData < inicioSemana) mostrar = false;
                    }
                    if (periodo === 'mes') {
                        const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
                        if (itemData < inicioMes) mostrar = false;
                    }
                }
                
                item.style.display = mostrar ? 'flex' : 'none';
            });
            
            mostrarNotificacao('Filtros aplicados', 'info');
        }

        function ordenarNotificacoes() {
            const criterio = document.getElementById('filtroOrdenar').value;
            const lista = document.getElementById('listaNotificacoes');
            const items = Array.from(document.querySelectorAll('.notificacao-item'));
            
            if (criterio === 'recentes') {
                items.sort((a, b) => new Date(b.dataset.data) - new Date(a.dataset.data));
            } else if (criterio === 'antigas') {
                items.sort((a, b) => new Date(a.dataset.data) - new Date(b.dataset.data));
            } else if (criterio === 'prioridade') {
                const prioridade = { 'alta': 1, 'media': 2, 'baixa': 3 };
                items.sort((a, b) => prioridade[a.dataset.prioridade] - prioridade[b.dataset.prioridade]);
            }
            
            lista.innerHTML = '';
            items.forEach(item => lista.appendChild(item));
        }

        // ===== MODAL DE DETALHES =====
        function abrirModalNotificacao(id, event) {
            if (event) event.stopPropagation();
            
            const modal = document.getElementById('modalNotificacao');
            const corpo = document.getElementById('modalCorpo');
            const acao = document.getElementById('modalAcao');
            
            const notificacao = document.querySelector(`.notificacao-item[data-id="${id}"]`);
            if (!notificacao) return;
            
            const titulo = notificacao.querySelector('.notificacao-titulo').textContent;
            const mensagem = notificacao.querySelector('.notificacao-mensagem').textContent;
            const tempo = notificacao.querySelector('.notificacao-tempo').textContent;
            const tipo = notificacao.dataset.tipo;
            
            let iconeTipo = '';
            if (tipo === 'sistema') iconeTipo = 'fa-shield-alt';
            else if (tipo === 'contacto') iconeTipo = 'fa-envelope';
            else if (tipo === 'noticia') iconeTipo = 'fa-newspaper';
            else if (tipo === 'curso') iconeTipo = 'fa-graduation-cap';
            else if (tipo === 'usuario') iconeTipo = 'fa-user';
            
            corpo.innerHTML = `
                <div class="detalhe-item">
                    <span class="detalhe-rotulo"><i class="fas fa-bell"></i> Título:</span>
                    <span class="detalhe-valor">${titulo}</span>
                </div>
                <div class="detalhe-item">
                    <span class="detalhe-rotulo"><i class="fas fa-tag"></i> Tipo:</span>
                    <span class="detalhe-valor"><i class="fas ${iconeTipo}"></i> ${tipo.charAt(0).toUpperCase() + tipo.slice(1)}</span>
                </div>
                <div class="detalhe-item">
                    <span class="detalhe-rotulo"><i class="far fa-clock"></i> Data:</span>
                    <span class="detalhe-valor">${tempo}</span>
                </div>
                <div class="detalhe-item">
                    <span class="detalhe-rotulo"><i class="fas fa-align-left"></i> Mensagem:</span>
                    <span class="detalhe-valor">${mensagem}</span>
                </div>
            `;
            
            acao.onclick = function() {
                marcarComoLida(id);
                fecharModal();
            };
            
            modal.classList.add('ativo');
            document.body.style.overflow = 'hidden';
        }

        function fecharModal() {
            document.getElementById('modalNotificacao').classList.remove('ativo');
            document.body.style.overflow = '';
        }

        function fecharModalConfirmacao() {
            document.getElementById('modalConfirmacao').classList.remove('ativo');
            document.body.style.overflow = '';
        }

        // ===== AÇÕES ESPECÍFICAS =====
        function responderContacto(id, event) {
            if (event) event.stopPropagation();
            window.location.href = `admin-contactos.html?responder=${id}`;
        }

        function editarNoticia(id, event) {
            if (event) event.stopPropagation();
            window.location.href = `admin-noticias.html?editar=${id}`;
        }

        function editarCurso(id, event) {
            if (event) event.stopPropagation();
            window.location.href = `admin-cursos.html?editar=${id}`;
        }

        function editarUtilizador(id, event) {
            if (event) event.stopPropagation();
            window.location.href = `admin-utilizadores.html?editar=${id}`;
        }

        function descarregarBackup(id, event) {
            if (event) event.stopPropagation();
            mostrarNotificacao('A descarregar backup...', 'info');
        }

        // ===== PAGINAÇÃO =====
        function irParaPagina(pagina) {
            const items = document.querySelectorAll('.paginacao-item');
            items.forEach(item => item.classList.remove('ativo'));
            
            if (pagina === 'anterior') {
                // Lógica para página anterior
            } else if (pagina === 'proximo') {
                // Lógica para próxima página
            } else {
                const elemento = Array.from(items).find(item => item.textContent == pagina);
                if (elemento) elemento.classList.add('ativo');
            }
            
            mostrarNotificacao(`Página ${pagina}`, 'info');
        }

        // ===== CONTADORES =====
        function atualizarContadores() {
            const total = document.querySelectorAll('.notificacao-item').length;
            const naoLidas = document.querySelectorAll('.notificacao-item.nao-lida').length;
            
            // Atualizar contador do header
            const contadorHeader = document.querySelector('.contador');
            if (contadorHeader) {
                contadorHeader.textContent = naoLidas;
                contadorHeader.style.display = naoLidas > 0 ? 'flex' : 'none';
            }
            
            // Atualizar contador pequeno do dropdown
            const contadorPequeno = document.querySelector('.contador-pequeno');
            if (contadorPequeno) {
                contadorPequeno.textContent = naoLidas + ' nova' + (naoLidas !== 1 ? 's' : '');
            }
        }

        // ===== NOTIFICAÇÃO FLUTUANTE =====
        function mostrarNotificacao(mensagem, tipo = 'success') {
            const notificacao = document.createElement('div');
            notificacao.className = 'notificacao-flutuante';
            
            const cores = {
                success: '#28a745',
                error: '#dc3545',
                warning: '#ffc107',
                info: '#17a2b8'
            };
            
            const icones = {
                success: 'fa-check-circle',
                error: 'fa-exclamation-circle',
                warning: 'fa-exclamation-triangle',
                info: 'fa-info-circle'
            };
            
            notificacao.style.background = `linear-gradient(135deg, ${cores[tipo]}, ${cores[tipo]}dd)`;
            notificacao.innerHTML = `<i class="fas ${icones[tipo]}"></i> ${mensagem}`;
            
            document.body.appendChild(notificacao);
            
            setTimeout(() => {
                notificacao.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => notificacao.remove(), 300);
            }, 3000);
        }

        // Adicionar animação de fade out
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeOut {
                from { opacity: 1; transform: translateX(0); }
                to { opacity: 0; transform: translateX(100%); }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);

        // Exportar funções globais
        window.filtrarNotificacoes = filtrarNotificacoes;
        window.ordenarNotificacoes = ordenarNotificacoes;
        window.selecionarTodas = selecionarTodas;
        window.desmarcarTodas = desmarcarTodas;
        window.marcarTodasLidas = marcarTodasLidas;
        window.marcarSelecionadasLidas = marcarSelecionadasLidas;
        window.eliminarSelecionadas = eliminarSelecionadas;
        window.confirmarLimparTodas = confirmarLimparTodas;
        window.abrirModalNotificacao = abrirModalNotificacao;
        window.fecharModal = fecharModal;
        window.fecharModalConfirmacao = fecharModalConfirmacao;
        window.marcarComoLida = marcarComoLida;
        window.eliminarNotificacao = eliminarNotificacao;
        window.responderContacto = responderContacto;
        window.editarNoticia = editarNoticia;
        window.editarCurso = editarCurso;
        window.editarUtilizador = editarUtilizador;
        window.descarregarBackup = descarregarBackup;
        window.irParaPagina = irParaPagina;
        window.selecionarNotificacao = selecionarNotificacao;