        // ===== DADOS INICIAIS =====
        let configInscricoes = {
            status: "fechadas",
            modo: "manual",
            dataAbertura: "",
            dataEncerramento: "",
            conteudoDisponivel: {
                titulo: "Processo de Inscrição",
                msgAbertura: "Saiba como fazer parte do Instituto Médio Politécnico Industrial do Kilamba Kiaxi. Siga os passos abaixo e garanta sua vaga!",
                documentos: [
                    "Fotocópia do Bilhete de Identidade (ou Certidão de Nascimento)",
                    "Certificado de Habilitações (6ª ou 9ª classe)",
                    "2 Fotos tipo passe (recentes)",
                    "Declaração de residência (atualizada)",
                    "Atestado Médico (físico e mental)",
                    "Processo de candidatura preenchido (fornecido na escola)"
                ],
                passos: [
                    "Dirija-se à Escola",
                    "Escolha o Curso",
                    "Entrega dos Documentos",
                    "Aguarde o Teste"
                ],
                textoTeste: "Todos os candidatos inscritos deverão realizar o teste de admissão, que avaliará os conhecimentos nas disciplinas de Língua Portuguesa e Matemática.",
                dataTeste: "",
                horarioTeste: "8h às 12h"
            },
            conteudoIndisponivel: {
                titulo: "Inscrições Indisponíveis",
                msgPrincipal: "O período de inscrições ainda não foi aberto ou já foi encerrado.",
                textoInfo: "As inscrições para o Instituto Médio Politécnico Industrial do Kilamba Kiaxi ocorrem em períodos específicos do ano letivo.\n\nComo se inscrever quando estiver disponível: Dirija-se à secretaria da escola com os documentos necessários, escolha o curso pretendido e aguarde a data do teste de admissão.\n\nDocumentos necessários: Bilhete de Identidade, Certificado de Habilitações, 2 fotos tipo passe, Declaração de residência e Atestado Médico.\n\nFique atento às nossas redes sociais e comunicados oficiais para saber quando as inscrições serão abertas.",
                proximoPeriodo: "A ser divulgado em breve"
            },
            contactos: {
                telefone: "+244 933 096 705",
                email: "geral@ipikk.ao",
                horario: "Segunda a Sexta, 8h às 16h",
                endereco: "Nova Vida, Kilamba Kiaxi, Luanda - Angola"
            }
        };

        // ===== FUNÇÕES DE INICIALIZAÇÃO =====
        function carregarConfiguracoes() {
            const salvo = localStorage.getItem('configInscricoes');
            if (salvo) {
                try {
                    configInscricoes = JSON.parse(salvo);
                } catch(e) {}
            }
            
            atualizarInterface();
        }

        function atualizarInterface() {
            // Atualizar status
            const statusIndicador = document.getElementById('statusIndicador');
            const statusMap = {
                'abertas': '<i class="fas fa-check-circle"></i> INSCRIÇÕES ABERTAS',
                'fechadas': '<i class="fas fa-ban"></i> INSCRIÇÕES FECHADAS',
                'agendadas': '<i class="fas fa-calendar-alt"></i> INSCRIÇÕES AGENDADAS'
            };
            statusIndicador.innerHTML = statusMap[configInscricoes.status] || statusMap.fechadas;
            statusIndicador.className = `status-indicador status-${configInscricoes.status}`;
            
            // Atualizar modo
            document.getElementById('modoManual').checked = configInscricoes.modo === 'manual';
            document.getElementById('modoAgendado').checked = configInscricoes.modo === 'agendado';
            
            // Mostrar/esconder seções
            document.getElementById('controleManual').style.display = configInscricoes.modo === 'manual' ? 'flex' : 'none';
            const controleAgendado = document.getElementById('controleAgendado');
            controleAgendado.classList.toggle('ativo', configInscricoes.modo === 'agendado');
            
            // Atualizar datas
            document.getElementById('dataAbertura').value = configInscricoes.dataAbertura || '';
            document.getElementById('dataEncerramento').value = configInscricoes.dataEncerramento || '';
            
            // Atualizar info do agendamento
            atualizarInfoAgendamento();
            
            // Atualizar conteúdo da página disponível
            document.getElementById('tituloDisponivel').value = configInscricoes.conteudoDisponivel.titulo;
            document.getElementById('msgAbertura').value = configInscricoes.conteudoDisponivel.msgAbertura;
            document.getElementById('textoTeste').value = configInscricoes.conteudoDisponivel.textoTeste;
            document.getElementById('dataTeste').value = configInscricoes.conteudoDisponivel.dataTeste || '';
            document.getElementById('horarioTeste').value = configInscricoes.conteudoDisponivel.horarioTeste;
            
            // Atualizar lista de documentos
            renderizarLista('listaDocumentos', configInscricoes.conteudoDisponivel.documentos, 'documento');
            renderizarLista('listaPassos', configInscricoes.conteudoDisponivel.passos, 'passo');
            
            // Atualizar conteúdo da página indisponível
            document.getElementById('tituloIndisponivel').value = configInscricoes.conteudoIndisponivel.titulo;
            document.getElementById('msgIndisponivel').value = configInscricoes.conteudoIndisponivel.msgPrincipal;
            document.getElementById('textoInfoIndisponivel').value = configInscricoes.conteudoIndisponivel.textoInfo;
            document.getElementById('proximoPeriodo').value = configInscricoes.conteudoIndisponivel.proximoPeriodo;
            
            // Atualizar contactos
            document.getElementById('contactoTelefone').value = configInscricoes.contactos.telefone;
            document.getElementById('contactoEmail').value = configInscricoes.contactos.email;
            document.getElementById('contactoHorario').value = configInscricoes.contactos.horario;
            document.getElementById('contactoEndereco').value = configInscricoes.contactos.endereco;
        }

        function renderizarLista(containerId, itens, tipo) {
            const container = document.getElementById(containerId);
            if (!container) return;
            
            container.innerHTML = itens.map((item, index) => `
                <div class="item-dinamico" data-index="${index}">
                    <span class="alca-arrasto"><i class="fas fa-grip-vertical"></i></span>
                    <input type="text" value="${item.replace(/"/g, '&quot;')}" data-tipo="${tipo}" data-index="${index}" onchange="atualizarItemLista(this, '${tipo}')">
                    <button class="btn-remover" onclick="removerItemLista(${index}, '${tipo}')"><i class="fas fa-trash"></i></button>
                </div>
            `).join('');
        }

        function atualizarInfoAgendamento() {
            const info = document.getElementById('infoAgendamento');
            if (configInscricoes.modo === 'agendado' && configInscricoes.dataAbertura && configInscricoes.dataEncerramento) {
                const dataAbertura = new Date(configInscricoes.dataAbertura);
                const dataEncerramento = new Date(configInscricoes.dataEncerramento);
                const agora = new Date();
                
                let statusMsg = '';
                if (agora < dataAbertura) {
                    statusMsg = `⏳ As inscrições abrirão em ${dataAbertura.toLocaleString('pt-PT')}`;
                } else if (agora >= dataAbertura && agora <= dataEncerramento) {
                    statusMsg = `✅ INSCRIÇÕES ABERTAS! Período: ${dataAbertura.toLocaleString('pt-PT')} até ${dataEncerramento.toLocaleString('pt-PT')}`;
                } else {
                    statusMsg = `⏰ Período de inscrições encerrado. Próximo período: a ser divulgado`;
                }
                info.innerHTML = `<i class="fas fa-info-circle"></i> ${statusMsg}`;
            } else if (configInscricoes.modo === 'agendado') {
                info.innerHTML = `<i class="fas fa-exclamation-triangle"></i> Defina as datas de abertura e encerramento para ativar o agendamento.`;
            } else {
                info.innerHTML = `<i class="fas fa-hand-pointer"></i> Modo manual ativo. Use os botões acima para controlar as inscrições.`;
            }
        }

        // ===== FUNÇÕES DE CONTROLE =====
        function abrirInscricoesManual() {
            configInscricoes.status = 'abertas';
            configInscricoes.modo = 'manual';
            atualizarInterface();
            mostrarNotificacao('Inscrições abertas manualmente!', 'sucesso');
            guardarTudo();
        }

        function fecharInscricoesManual() {
            configInscricoes.status = 'fechadas';
            configInscricoes.modo = 'manual';
            atualizarInterface();
            mostrarNotificacao('Inscrições fechadas manualmente!', 'sucesso');
            guardarTudo();
        }

        function verificarAgendamento() {
            if (configInscricoes.modo !== 'agendado') return;
            
            const agora = new Date();
            const dataAbertura = new Date(configInscricoes.dataAbertura);
            const dataEncerramento = new Date(configInscricoes.dataEncerramento);
            
            if (agora >= dataAbertura && agora <= dataEncerramento) {
                if (configInscricoes.status !== 'abertas') {
                    configInscricoes.status = 'abertas';
                    guardarTudo();
                    mostrarNotificacao('📢 As inscrições foram abertas automaticamente conforme agendamento!', 'info');
                }
            } else if (agora > dataEncerramento && configInscricoes.dataEncerramento) {
                if (configInscricoes.status !== 'fechadas') {
                    configInscricoes.status = 'fechadas';
                    guardarTudo();
                    mostrarNotificacao('🔒 As inscrições foram encerradas automaticamente conforme agendamento.', 'info');
                }
            } else if (agora < dataAbertura && configInscricoes.dataAbertura) {
                if (configInscricoes.status !== 'agendadas') {
                    configInscricoes.status = 'agendadas';
                    guardarTudo();
                }
            }
        }

        // ===== FUNÇÕES DE LISTA DINÂMICA =====
        function adicionarDocumento() {
            configInscricoes.conteudoDisponivel.documentos.push('Novo Documento');
            renderizarLista('listaDocumentos', configInscricoes.conteudoDisponivel.documentos, 'documento');
        }

        function adicionarPasso() {
            configInscricoes.conteudoDisponivel.passos.push('Novo Passo');
            renderizarLista('listaPassos', configInscricoes.conteudoDisponivel.passos, 'passo');
        }

        function removerItemLista(index, tipo) {
            if (tipo === 'documento') {
                configInscricoes.conteudoDisponivel.documentos.splice(index, 1);
                renderizarLista('listaDocumentos', configInscricoes.conteudoDisponivel.documentos, 'documento');
            } else if (tipo === 'passo') {
                configInscricoes.conteudoDisponivel.passos.splice(index, 1);
                renderizarLista('listaPassos', configInscricoes.conteudoDisponivel.passos, 'passo');
            }
        }

        function atualizarItemLista(input, tipo) {
            const index = parseInt(input.dataset.index);
            const novoValor = input.value;
            if (tipo === 'documento' && configInscricoes.conteudoDisponivel.documentos[index]) {
                configInscricoes.conteudoDisponivel.documentos[index] = novoValor;
            } else if (tipo === 'passo' && configInscricoes.conteudoDisponivel.passos[index]) {
                configInscricoes.conteudoDisponivel.passos[index] = novoValor;
            }
        }

        // ===== FUNÇÕES DE SALVAMENTO =====
        function coletarDados() {
            // Modo e status
            configInscricoes.modo = document.querySelector('input[name="modo"]:checked').value;
            configInscricoes.dataAbertura = document.getElementById('dataAbertura').value;
            configInscricoes.dataEncerramento = document.getElementById('dataEncerramento').value;
            
            // Conteúdo disponível
            configInscricoes.conteudoDisponivel.titulo = document.getElementById('tituloDisponivel').value;
            configInscricoes.conteudoDisponivel.msgAbertura = document.getElementById('msgAbertura').value;
            configInscricoes.conteudoDisponivel.textoTeste = document.getElementById('textoTeste').value;
            configInscricoes.conteudoDisponivel.dataTeste = document.getElementById('dataTeste').value;
            configInscricoes.conteudoDisponivel.horarioTeste = document.getElementById('horarioTeste').value;
            
            // Conteúdo indisponível
            configInscricoes.conteudoIndisponivel.titulo = document.getElementById('tituloIndisponivel').value;
            configInscricoes.conteudoIndisponivel.msgPrincipal = document.getElementById('msgIndisponivel').value;
            configInscricoes.conteudoIndisponivel.textoInfo = document.getElementById('textoInfoIndisponivel').value;
            configInscricoes.conteudoIndisponivel.proximoPeriodo = document.getElementById('proximoPeriodo').value;
            
            // Contactos
            configInscricoes.contactos.telefone = document.getElementById('contactoTelefone').value;
            configInscricoes.contactos.email = document.getElementById('contactoEmail').value;
            configInscricoes.contactos.horario = document.getElementById('contactoHorario').value;
            configInscricoes.contactos.endereco = document.getElementById('contactoEndereco').value;
            
            // Se modo agendado, verificar status automaticamente
            if (configInscricoes.modo === 'agendado' && configInscricoes.dataAbertura && configInscricoes.dataEncerramento) {
                const agora = new Date();
                const dataAbertura = new Date(configInscricoes.dataAbertura);
                const dataEncerramento = new Date(configInscricoes.dataEncerramento);
                
                if (agora >= dataAbertura && agora <= dataEncerramento) {
                    configInscricoes.status = 'abertas';
                } else if (agora < dataAbertura) {
                    configInscricoes.status = 'agendadas';
                } else {
                    configInscricoes.status = 'fechadas';
                }
            }
        }

        function guardarTudo() {
            coletarDados();
            localStorage.setItem('configInscricoes', JSON.stringify(configInscricoes));
            mostrarNotificacao('Todas as configurações foram guardadas com sucesso!', 'sucesso');
            atualizarInterface();
        }

        function previewPagina(tipo) {
            coletarDados();
            localStorage.setItem('configInscricoes', JSON.stringify(configInscricoes));
            
            let url;
            if (tipo === 'disponivel') {
                url = '../area-publica/inscricoes.html?preview=disponivel';
            } else {
                url = '../area-publica/inscricoes.html?preview=indisponivel';
            }
            window.open(url, '_blank');
        }

        // ===== NOTIFICAÇÃO =====
        function mostrarNotificacao(mensagem, tipo) {
            const notif = document.createElement('div');
            notif.className = `notificacao ${tipo}`;
            notif.innerHTML = `<i class="fas ${tipo === 'sucesso' ? 'fa-check-circle' : tipo === 'erro' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i> ${mensagem}`;
            document.body.appendChild(notif);
            
            setTimeout(() => {
                notif.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notif.remove(), 300);
            }, 3000);
        }

        // ===== EVENTOS =====
        document.getElementById('modoManual').addEventListener('change', function() {
            if (this.checked) {
                configInscricoes.modo = 'manual';
                atualizarInterface();
            }
        });
        
        document.getElementById('modoAgendado').addEventListener('change', function() {
            if (this.checked) {
                configInscricoes.modo = 'agendado';
                atualizarInterface();
            }
        });
        
        document.getElementById('dataAbertura').addEventListener('change', function() {
            if (configInscricoes.modo === 'agendado') {
                coletarDados();
                verificarAgendamento();
                atualizarInterface();
            }
        });
        
        document.getElementById('dataEncerramento').addEventListener('change', function() {
            if (configInscricoes.modo === 'agendado') {
                coletarDados();
                verificarAgendamento();
                atualizarInterface();
            }
        });

        // ===== ABAS DO EDITOR =====
        document.querySelectorAll('.aba-edit').forEach(aba => {
            aba.addEventListener('click', function() {
                document.querySelectorAll('.aba-edit').forEach(a => a.classList.remove('ativa'));
                document.querySelectorAll('.conteudo-edit').forEach(c => c.classList.remove('ativo'));
                
                this.classList.add('ativa');
                const abaId = this.dataset.aba;
                document.getElementById(`conteudo${abaId.charAt(0).toUpperCase() + abaId.slice(1)}`).classList.add('ativo');
            });
        });

        // ===== MENU MOBILE =====
        const botaoMenu = document.getElementById('botaoMenuMobile');
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');
        
        function abrirSidebar() {
            sidebar.style.transform = 'translateX(0)';
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
        
        function fecharSidebar() {
            sidebar.style.transform = '';
            overlay.style.display = 'none';
            document.body.style.overflow = '';
        }
        
        if (botaoMenu) botaoMenu.addEventListener('click', abrirSidebar);
        if (overlay) overlay.addEventListener('click', fecharSidebar);
        
        // Fechar ao redimensionar para desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 992) {
                fecharSidebar();
            }
        });

        // ===== INICIALIZAÇÃO =====
        document.addEventListener('DOMContentLoaded', () => {
            carregarConfiguracoes();
            
            // Verificar agendamento a cada minuto
            setInterval(() => {
                if (configInscricoes.modo === 'agendado') {
                    coletarDados();
                    verificarAgendamento();
                    atualizarInterface();
                }
            }, 60000);
        });
    