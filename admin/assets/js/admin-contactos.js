
        document.addEventListener('DOMContentLoaded', function() {
            
            // ============================================
            // MENU MOBILE - Toggle Sidebar
            // ============================================
            
            const barraLateral = document.querySelector('.barra-lateral');
            const esquerdaBarraTopo = document.querySelector('.esquerda-barra-topo');
            
            if (esquerdaBarraTopo && window.innerWidth <= 768) {
                const botaoMenu = document.createElement('button');
                botaoMenu.className = 'btn-menu-mobile';
                botaoMenu.innerHTML = '<i class="fas fa-bars"></i>';
                botaoMenu.style.marginRight = '15px';
                botaoMenu.style.background = 'var(--cinza-claro)';
                botaoMenu.style.width = '40px';
                botaoMenu.style.height = '40px';
                botaoMenu.style.borderRadius = '50%';
                botaoMenu.style.border = '2px solid var(--cinza-medio)';
                botaoMenu.style.color = 'var(--azul-primario)';
                botaoMenu.style.fontSize = '18px';
                botaoMenu.style.cursor = 'pointer';
                
                esquerdaBarraTopo.insertBefore(botaoMenu, esquerdaBarraTopo.firstChild);
                
                botaoMenu.addEventListener('click', function() {
                    barraLateral.classList.toggle('ativo');
                    
                    let overlay = document.querySelector('.overlay-sidebar');
                    if (!overlay) {
                        overlay = document.createElement('div');
                        overlay.className = 'overlay-sidebar';
                        overlay.style.position = 'fixed';
                        overlay.style.top = '0';
                        overlay.style.left = '0';
                        overlay.style.width = '100%';
                        overlay.style.height = '100%';
                        overlay.style.background = 'rgba(0,0,0,0.5)';
                        overlay.style.zIndex = '999';
                        document.body.appendChild(overlay);
                        
                        overlay.addEventListener('click', function() {
                            barraLateral.classList.remove('ativo');
                            overlay.remove();
                        });
                    }
                });
            }
            
            // ============================================
            // MENU ATIVO - Highlight da página atual
            // ============================================
            
            const linksMenu = document.querySelectorAll('.navegacao-sidebar a');
            const paginaAtual = window.location.pathname.split('/').pop();
            
            linksMenu.forEach(link => {
                const href = link.getAttribute('href');
                if (href === paginaAtual) {
                    link.parentElement.classList.add('ativo');
                }
            });
            
            // ============================================
            // NOTIFICAÇÕES
            // ============================================
            
            const btnNotificacao = document.querySelector('.btn-notificacao');
            if (btnNotificacao) {
                btnNotificacao.addEventListener('click', function() {
                    alert('Sistema de notificações em desenvolvimento');
                });
            }
            
            // ============================================
            // PERFIL DO USUÁRIO
            // ============================================
            
            const perfilUsuario = document.querySelector('.perfil-usuario');
            if (perfilUsuario) {
                perfilUsuario.addEventListener('click', function(e) {
                    e.stopPropagation();
                    
                    let dropdown = document.querySelector('.dropdown-perfil');
                    
                    if (!dropdown) {
                        dropdown = document.createElement('div');
                        dropdown.className = 'dropdown-perfil';
                        dropdown.style.position = 'absolute';
                        dropdown.style.top = '60px';
                        dropdown.style.right = '30px';
                        dropdown.style.background = 'var(--branco)';
                        dropdown.style.border = '2px solid var(--cinza-medio)';
                        dropdown.style.borderRadius = 'var(--borda-arredondada)';
                        dropdown.style.boxShadow = 'var(--sombra-forte)';
                        dropdown.style.zIndex = '1000';
                        dropdown.style.minWidth = '200px';
                        dropdown.style.overflow = 'hidden';
                        
                        dropdown.innerHTML = `
                            <a href="perfil.html" style="display: flex; align-items: center; gap: 10px; padding: 12px 15px; transition: var(--transicao);">
                                <i class="fas fa-user"></i> Meu Perfil
                            </a>
                            <a href="configuracoes.html" style="display: flex; align-items: center; gap: 10px; padding: 12px 15px; transition: var(--transicao);">
                                <i class="fas fa-cog"></i> Configurações
                            </a>
                            <hr style="border: none; border-top: 1px solid var(--cinza-medio); margin: 5px 0;">
                            <a href="login.html" style="display: flex; align-items: center; gap: 10px; padding: 12px 15px; color: var(--perigo); transition: var(--transicao);">
                                <i class="fas fa-sign-out-alt"></i> Sair
                            </a>
                        `;
                        
                        dropdown.querySelectorAll('a').forEach(link => {
                            link.addEventListener('mouseenter', function() {
                                this.style.background = 'var(--cinza-claro)';
                            });
                            link.addEventListener('mouseleave', function() {
                                this.style.background = 'transparent';
                            });
                        });
                        
                        document.body.appendChild(dropdown);
                        
                        document.addEventListener('click', function fecharDropdown(e) {
                            if (!dropdown.contains(e.target) && !perfilUsuario.contains(e.target)) {
                                dropdown.remove();
                                document.removeEventListener('click', fecharDropdown);
                            }
                        });
                    }
                });
            }
            
            // ============================================
            // CONTACTOS - Funções Específicas
            // ============================================
            
            const campoBusca = document.getElementById('campoBusca');
            const filtroEstado = document.getElementById('filtroEstado');
            const botoesPasta = document.querySelectorAll('.btn-pasta');
            const selecionarTodos = document.getElementById('selecionarTodos');
            const checkboxesLinha = document.querySelectorAll('.checkbox-linha');
            const linhasTabela = document.querySelectorAll('#tabelaContactos tbody tr');
            const btnAtualizar = document.getElementById('btnAtualizar');
            const btnMarcarLida = document.getElementById('btnMarcarLida');
            const btnEliminar = document.getElementById('btnEliminar');
            const btnSelecionarTodos = document.getElementById('btnSelecionarTodos');
            const contadorMensagens = document.getElementById('contadorMensagens');
            
            // Atualizar contador de mensagens
            function atualizarContadorMensagens() {
                if (contadorMensagens) {
                    const totalVisiveis = Array.from(linhasTabela).filter(linha => 
                        linha.style.display !== 'none'
                    ).length;
                    contadorMensagens.textContent = `(${totalVisiveis} mensagens)`;
                }
            }
            
            // BUSCA
            if (campoBusca) {
                campoBusca.addEventListener('input', function() {
                    const termo = this.value.toLowerCase();
                    linhasTabela.forEach(linha => {
                        const texto = linha.textContent.toLowerCase();
                        linha.style.display = texto.includes(termo) ? '' : 'none';
                    });
                    atualizarContadorMensagens();
                });
            }
            
            // FILTROS
            if (filtroEstado) {
                filtroEstado.addEventListener('change', function() {
                    const estado = this.value;
                    linhasTabela.forEach(linha => {
                        if (!estado || linha.dataset.estado === estado) {
                            linha.style.display = '';
                        } else {
                            linha.style.display = 'none';
                        }
                    });
                    atualizarContadorMensagens();
                });
            }
            
            // FILTRO POR DATA (simplificado)
            const filtroDataInicio = document.getElementById('filtroDataInicio');
            const filtroDataFim = document.getElementById('filtroDataFim');
            
            function aplicarFiltroData() {
                const dataInicio = filtroDataInicio?.value ? new Date(filtroDataInicio.value) : null;
                const dataFim = filtroDataFim?.value ? new Date(filtroDataFim.value) : null;
                
                if (!dataInicio && !dataFim) return;
                
                linhasTabela.forEach(linha => {
                    const dataCelula = linha.cells[3]?.textContent.trim();
                    if (dataCelula) {
                        const partes = dataCelula.split('/');
                        const dataMsg = new Date(partes[2], partes[1]-1, partes[0]);
                        
                        let mostrar = true;
                        if (dataInicio && dataMsg < dataInicio) mostrar = false;
                        if (dataFim && dataMsg > dataFim) mostrar = false;
                        
                        linha.style.display = mostrar ? '' : 'none';
                    }
                });
                atualizarContadorMensagens();
            }
            
            if (filtroDataInicio) filtroDataInicio.addEventListener('change', aplicarFiltroData);
            if (filtroDataFim) filtroDataFim.addEventListener('change', aplicarFiltroData);
            
            // PASTAS
            botoesPasta.forEach(btn => {
                btn.addEventListener('click', function() {
                    botoesPasta.forEach(b => b.classList.remove('ativo'));
                    this.classList.add('ativo');
                    
                    const pasta = this.dataset.pasta;
                    console.log('Pasta selecionada:', pasta);
                    // Aqui você pode adicionar lógica para filtrar por pasta
                });
            });
            
            // SELEÇÃO
            if (selecionarTodos) {
                selecionarTodos.addEventListener('change', function() {
                    checkboxesLinha.forEach(cb => cb.checked = this.checked);
                });
            }

            // BOTÃO SELECIONAR TODOS
            if (btnSelecionarTodos) {
                btnSelecionarTodos.addEventListener('click', function() {
                    checkboxesLinha.forEach(cb => cb.checked = true);
                    if (selecionarTodos) selecionarTodos.checked = true;
                });
            }
            
            // ATUALIZAR
            if (btnAtualizar) {
                btnAtualizar.addEventListener('click', function() {
                    const icone = this.querySelector('i');
                    icone.style.animation = 'spin 1s linear';
                    setTimeout(() => icone.style.animation = '', 1000);
                    
                    // Simular atualização
                    mostrarNotificacao('Dados atualizados com sucesso!', 'sucesso');
                });
            }
            
            // MARCAR COMO LIDA
            if (btnMarcarLida) {
                btnMarcarLida.addEventListener('click', function() {
                    let contador = 0;
                    checkboxesLinha.forEach(cb => {
                        if (cb.checked) {
                            const linha = cb.closest('tr');
                            linha.classList.remove('nao-lida');
                            linha.dataset.estado = 'lida';
                            
                            const badgeNovo = linha.querySelector('.badge-novo');
                            if (badgeNovo) badgeNovo.remove();
                            
                            const iconeEstado = linha.querySelector('.icone-estado i');
                            if (iconeEstado) {
                                iconeEstado.className = 'fas fa-envelope-open';
                                iconeEstado.style.color = '#6c757d';
                            }
                            
                            contador++;
                        }
                    });
                    
                    if (contador > 0) {
                        mostrarNotificacao(`${contador} mensagem(ns) marcada(s) como lida`, 'sucesso');
                    }
                });
            }
            
            // ELIMINAR
            if (btnEliminar) {
                btnEliminar.addEventListener('click', function() {
                    const selecionadas = Array.from(checkboxesLinha).filter(cb => cb.checked);
                    
                    if (selecionadas.length === 0) {
                        mostrarNotificacao('Nenhuma mensagem selecionada', 'aviso');
                        return;
                    }
                    
                    if (confirm(`Eliminar ${selecionadas.length} mensagem(ns) selecionada(s)?`)) {
                        selecionadas.forEach(cb => {
                            cb.closest('tr').remove();
                        });
                        mostrarNotificacao('Mensagens eliminadas com sucesso!', 'sucesso');
                        atualizarContadorMensagens();
                    }
                });
            }
            
            // ABRIR MENSAGEM AO CLICAR NA LINHA
            linhasTabela.forEach(linha => {
                linha.addEventListener('click', function(e) {
                    if (e.target.closest('input[type="checkbox"]')) return;
                    abrirModalMensagem(this.dataset.id);
                });
            });
            
            // PAGINAÇÃO (simulada)
            const btnAnterior = document.getElementById('btnAnterior');
            const btnProximo = document.getElementById('btnProximo');
            const textoPaginacao = document.querySelector('.texto-paginacao');
            let paginaAtualPaginacao = 1;
            const totalPaginas = 3;
            
            if (btnAnterior) {
                btnAnterior.addEventListener('click', function() {
                    if (paginaAtualPaginacao > 1) {
                        paginaAtualPaginacao--;
                        atualizarPaginacao();
                    }
                });
            }
            
            if (btnProximo) {
                btnProximo.addEventListener('click', function() {
                    if (paginaAtualPaginacao < totalPaginas) {
                        paginaAtualPaginacao++;
                        atualizarPaginacao();
                    }
                });
            }
            
            function atualizarPaginacao() {
                if (textoPaginacao) {
                    textoPaginacao.innerHTML = `Página <strong>${paginaAtualPaginacao}</strong> de <strong>${totalPaginas}</strong>`;
                }
                // Aqui você carregaria os dados da página
            }
            
            // ============================================
            // FUNÇÕES DOS MODAIS
            // ============================================
            
            function abrirModalMensagem(id) {
                const modal = document.getElementById('modalMensagem');
                if (modal) {
                    modal.classList.add('ativo');
                    document.body.style.overflow = 'hidden';
                    console.log('Abrir mensagem ID:', id);
                    
                    // Marcar como lida ao abrir
                    const linha = document.querySelector(`tr[data-id="${id}"]`);
                    if (linha && linha.classList.contains('nao-lida')) {
                        linha.classList.remove('nao-lida');
                        linha.dataset.estado = 'lida';
                        
                        const badgeNovo = linha.querySelector('.badge-novo');
                        if (badgeNovo) badgeNovo.remove();
                        
                        const iconeEstado = linha.querySelector('.icone-estado i');
                        if (iconeEstado) {
                            iconeEstado.className = 'fas fa-envelope-open';
                            iconeEstado.style.color = '#6c757d';
                        }
                    }
                }
            }

            function fecharModalMensagem() {
                const modal = document.getElementById('modalMensagem');
                if (modal) {
                    modal.classList.remove('ativo');
                    document.body.style.overflow = '';
                }
            }

            function abrirModalResposta() {
                const modalResposta = document.getElementById('modalResposta');
                const modalMensagem = document.getElementById('modalMensagem');
                if (modalResposta) {
                    modalMensagem.classList.remove('ativo');
                    modalResposta.classList.add('ativo');
                }
            }

            function fecharModalResposta() {
                const modal = document.getElementById('modalResposta');
                if (modal) {
                    modal.classList.remove('ativo');
                    document.body.style.overflow = '';
                }
            }

            function mostrarNotificacao(mensagem, tipo) {
                const notificacao = document.createElement('div');
                notificacao.className = 'notificacao';
                notificacao.style.position = 'fixed';
                notificacao.style.top = '20px';
                notificacao.style.right = '20px';
                notificacao.style.padding = '15px 25px';
                notificacao.style.borderRadius = 'var(--borda-arredondada)';
                notificacao.style.background = tipo === 'sucesso' ? 'linear-gradient(135deg, #28a745, #218838)' : 
                                                tipo === 'aviso' ? 'linear-gradient(135deg, #ffc107, #d39e00)' : 
                                                'linear-gradient(135deg, #17a2b8, #138496)';
                notificacao.style.color = '#fff';
                notificacao.style.fontWeight = '600';
                notificacao.style.boxShadow = 'var(--sombra-forte)';
                notificacao.style.zIndex = '10001';
                notificacao.style.animation = 'slideIn 0.3s ease';
                notificacao.innerHTML = `<i class="fas fa-${tipo === 'sucesso' ? 'check-circle' : 'info-circle'}"></i> ${mensagem}`;
                
                document.body.appendChild(notificacao);
                
                setTimeout(() => {
                    notificacao.style.animation = 'slideOut 0.3s ease';
                    setTimeout(() => notificacao.remove(), 300);
                }, 3000);
            }

            // EVENT LISTENERS DOS MODAIS
            const btnFecharMensagem = document.getElementById('btnFecharMensagem');
            const btnResponderModal = document.getElementById('btnResponderModal');
            const btnFecharResposta = document.getElementById('btnFecharResposta');
            const btnCancelarResposta = document.getElementById('btnCancelarResposta');
            const btnMarcarLidaModal = document.getElementById('btnMarcarLidaModal');
            const btnArquivar = document.getElementById('btnArquivar');
            const btnFavoritar = document.getElementById('btnFavoritar');
            const btnImprimir = document.getElementById('btnImprimir');
            const btnMoverLixeira = document.getElementById('btnMoverLixeira');
            const modalMensagem = document.getElementById('modalMensagem');
            const modalResposta = document.getElementById('modalResposta');
            const formularioResposta = document.getElementById('formularioResposta');

            if (btnFecharMensagem) {
                btnFecharMensagem.addEventListener('click', fecharModalMensagem);
            }

            if (btnResponderModal) {
                btnResponderModal.addEventListener('click', abrirModalResposta);
            }

            if (btnFecharResposta) {
                btnFecharResposta.addEventListener('click', fecharModalResposta);
            }

            if (btnCancelarResposta) {
                btnCancelarResposta.addEventListener('click', fecharModalResposta);
            }

            if (btnMarcarLidaModal) {
                btnMarcarLidaModal.addEventListener('click', function() {
                    mostrarNotificacao('Mensagem marcada como lida', 'sucesso');
                    fecharModalMensagem();
                });
            }

            if (btnArquivar) {
                btnArquivar.addEventListener('click', function() {
                    mostrarNotificacao('Mensagem arquivada', 'sucesso');
                    fecharModalMensagem();
                });
            }

            if (btnFavoritar) {
                btnFavoritar.addEventListener('click', function() {
                    this.classList.toggle('ativo');
                    const icone = this.querySelector('i');
                    if (this.classList.contains('ativo')) {
                        icone.className = 'fas fa-star';
                        this.style.background = 'var(--aviso)';
                        this.style.color = 'var(--branco)';
                        mostrarNotificacao('Mensagem adicionada aos favoritos', 'sucesso');
                    } else {
                        icone.className = 'far fa-star';
                        this.style.background = '';
                        this.style.color = '';
                        mostrarNotificacao('Mensagem removida dos favoritos', 'info');
                    }
                });
            }

            if (btnImprimir) {
                btnImprimir.addEventListener('click', function() {
                    window.print();
                });
            }

            if (btnMoverLixeira) {
                btnMoverLixeira.addEventListener('click', function() {
                    if (confirm('Mover esta mensagem para a lixeira?')) {
                        mostrarNotificacao('Mensagem movida para a lixeira', 'sucesso');
                        fecharModalMensagem();
                    }
                });
            }

            if (formularioResposta) {
                formularioResposta.addEventListener('submit', function(e) {
                    e.preventDefault();
                    mostrarNotificacao('Resposta enviada com sucesso!', 'sucesso');
                    fecharModalResposta();
                });
            }

            // Fechar modais ao clicar fora
            if (modalMensagem) {
                modalMensagem.addEventListener('click', function(e) {
                    if (e.target === modalMensagem) fecharModalMensagem();
                });
            }

            if (modalResposta) {
                modalResposta.addEventListener('click', function(e) {
                    if (e.target === modalResposta) fecharModalResposta();
                });
            }

            // Tecla ESC
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    if (modalMensagem?.classList.contains('ativo')) fecharModalMensagem();
                    if (modalResposta?.classList.contains('ativo')) fecharModalResposta();
                }
            });

            // ============================================
            // ANIMAÇÕES
            // ============================================
            
            // Adicionar estilo para animação de slideOut
            const style = document.createElement('style');
            style.textContent = `
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
                
                .notificacao {
                    animation: slideIn 0.3s ease;
                }
            `;
            document.head.appendChild(style);

            console.log('%c IPIKK - Área Restrita ', 'background: #003072; color: #fff; font-size: 16px; padding: 10px;');
            console.log('%c Página de Contactos carregada! ', 'background: #28a745; color: #fff; font-size: 12px; padding: 5px;');
        });