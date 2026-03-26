            function mudarAba(indice) {
            const abas = document.querySelectorAll('.aba');
            const conteudos = document.querySelectorAll('.conteudo-aba');
            
            abas.forEach(aba => aba.classList.remove('ativa'));
            conteudos.forEach(conteudo => conteudo.classList.remove('ativa'));
            
            abas[indice].classList.add('ativa');
            conteudos[indice].classList.add('ativa');
            
            if (indice === 4) carregarPagina(); // Carregar editor quando a aba for aberta
        }
        
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

        function guardarTodasConfiguracoes() {
            guardarEscola();
            guardarRedesSociais();
            guardarAparencia();
            guardarTecnico();
            guardarConfigBackup();
            mostrarNotificacao('Todas as configurações foram guardadas!', 'sucesso');
        }

        // ============================================
        // FUNÇÕES DA ABA ESCOLA
        // ============================================

        function previewLogo(input) {
            if (input.files && input.files[0]) {
                document.getElementById('preview_logo').textContent = input.files[0].name;
            }
        }

        function previewFavicon(input) {
            if (input.files && input.files[0]) {
                document.getElementById('preview_favicon').textContent = input.files[0].name;
            }
        }

        function removerLogo() {
            document.getElementById('preview_logo').textContent = 'Nenhum ficheiro selecionado';
            document.getElementById('input_logo').value = '';
        }

        function removerFavicon() {
            document.getElementById('preview_favicon').textContent = 'Nenhum ficheiro selecionado';
            document.getElementById('input_favicon').value = '';
        }

        function restaurarPadroesEscola() {
            document.getElementById('escola_nome').value = 'Instituto Médio Politécnico Industrial do Kilamba Kiaxi';
            document.getElementById('escola_acronimo').value = 'IPIKK';
            document.getElementById('escola_slogan').value = 'Um diferencial para a sua formação';
            document.getElementById('escola_endereco').value = 'Distrito Urbano da Nova-Vida, Rua 130, Município do Kilamba Kiaxi';
            document.getElementById('escola_cidade').value = 'Luanda';
            document.getElementById('escola_provincia').value = 'Luanda';
            document.getElementById('escola_telefone').value = '933 096 705';
            document.getElementById('escola_email').value = 'geral@ipikk.ao';
            document.getElementById('escola_whatsapp').value = '933 096 705';
            document.getElementById('escola_horario').value = 'Segunda a Sexta: 7:00 - 17:40';
            mostrarNotificacao('Configurações da escola restauradas!', 'info');
        }

        function guardarEscola() {
            mostrarNotificacao('Configurações da escola guardadas!', 'sucesso');
        }

        // ============================================
        // FUNÇÕES DA ABA REDES SOCIAIS
        // ============================================

        function guardarRedesSociais() {
            mostrarNotificacao('Configurações de redes sociais guardadas!', 'sucesso');
        }

        // ============================================
        // FUNÇÕES DA ABA APARÊNCIA
        // ============================================

        function atualizarPreviewCor(cor, valor) {
            const preview = document.getElementById(`preview_cor_${cor}`);
            if (preview) preview.style.background = valor;
        }

        function restaurarPadroesAparencia() {
            // Cores principais
            document.getElementById('cor_primaria').value = '#003072';
            document.getElementById('cor_azul_claro').value = '#2e86c1';
            document.getElementById('cor_azul_escuro').value = '#001a40';
            document.getElementById('cor_verde_acento').value = '#0a9396';
            document.getElementById('cor_verde_claro').value = '#94d2bd';
            document.getElementById('cor_texto').value = '#212529';
            document.getElementById('cor_fundo').value = '#f8f9fa';
            
            // Cores dos cursos
            document.getElementById('cor_construcao').value = '#9FA3A7';
            document.getElementById('cor_eletricidade').value = '#3A7BC0';
            document.getElementById('cor_mecanica').value = '#E67E22';
            document.getElementById('cor_informatica').value = '#1F7A4D';
            document.getElementById('cor_moveis').value = '#e01a1a';
            
            // Tipografia
            document.getElementById('fonte_principal').value = 'Poppins';
            document.getElementById('fonte_secundaria').value = 'Montserrat';
            document.getElementById('tamanho_fonte').value = '16px';
            document.getElementById('altura_linha').value = '1.6';
            
            // Efeitos
            document.getElementById('efeito_animacoes').checked = true;
            document.getElementById('efeito_transicoes').checked = true;
            document.getElementById('efeito_hover').checked = true;
            document.getElementById('efeito_sombras').checked = true;
            document.getElementById('intensidade_sombra').value = '0.1';
            document.getElementById('borda_arredondada').value = '12px';
            
            // Atualizar previews
            atualizarPreviewCor('primaria', '#003072');
            atualizarPreviewCor('azul_claro', '#2e86c1');
            atualizarPreviewCor('azul_escuro', '#001a40');
            atualizarPreviewCor('verde_acento', '#0a9396');
            atualizarPreviewCor('verde_claro', '#94d2bd');
            atualizarPreviewCor('texto', '#212529');
            atualizarPreviewCor('fundo', '#f8f9fa');
            atualizarPreviewCor('construcao', '#9FA3A7');
            atualizarPreviewCor('eletricidade', '#3A7BC0');
            atualizarPreviewCor('mecanica', '#E67E22');
            atualizarPreviewCor('informatica', '#1F7A4D');
            atualizarPreviewCor('moveis', '#e01a1a');
            
            mostrarNotificacao('Aparência restaurada para os padrões!', 'info');
        }

        function guardarAparencia() {
            mostrarNotificacao('Configurações de aparência guardadas!', 'sucesso');
        }

        // ============================================
        // FUNÇÕES DA ABA TÉCNICO
        // ============================================

        function testarEmail() {
            mostrarNotificacao('Email de teste enviado! Verifique a sua caixa de entrada.', 'info');
        }

        function guardarTecnico() {
            mostrarNotificacao('Configurações técnicas guardadas!', 'sucesso');
        }

        // ============================================
        // FUNÇÕES DA ABA BACKUP
        // ============================================

        function executarBackupAgora() {
            mostrarNotificacao('Backup iniciado...', 'info');
            setTimeout(() => {
                mostrarNotificacao('Backup concluído com sucesso!', 'sucesso');
            }, 2000);
        }

        function criarBackupManual() {
            const nome = document.getElementById('backup_nome').value;
            mostrarNotificacao(`Backup "${nome}" criado com sucesso!`, 'sucesso');
        }

        function baixarBackup(id) {
            mostrarNotificacao(`A descarregar backup #${id}...`, 'info');
        }

        function eliminarBackup(id) {
            if (confirm('Tem certeza que deseja eliminar este backup?')) {
                document.querySelector(`.item-backup[data-id="${id}"]`).remove();
                mostrarNotificacao('Backup eliminado!', 'sucesso');
            }
        }

        function restaurarBackup(id) {
            if (confirm('Tem certeza que deseja restaurar este backup? O conteúdo atual será substituído.')) {
                mostrarNotificacao(`Backup #${id} restaurado com sucesso!`, 'sucesso');
            }
        }

        function configurarBackup() {
            alert('Configurações avançadas de backup (em desenvolvimento)');
        }

        function guardarConfigBackup() {
            mostrarNotificacao('Configurações de backup guardadas!', 'sucesso');
        }

        // ============================================
        // DADOS DAS PÁGINAS PARA O EDITOR
        // ============================================

        const dadosPaginas = {
            inicio: {
                titulo: "Página Inicial",
                slider: [
                    { id: 1, titulo: "Lorem ipsum dolor sit amet", imagem: "slide1.jpg", botao: "Saiba mais" },
                    { id: 2, titulo: "Formando profissionais técnicos", imagem: "slide2.jpg", botao: "Saiba mais" },
                    { id: 3, titulo: "Educação moderna para o futuro", imagem: "slide3.jpg", botao: "Saiba mais" }
                ],
                mensagem_director: {
                    foto: "director.jpg",
                    nome: "Ferreira Manuel Fragoso",
                    cargo: "Director do IPIKK",
                    mensagem: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
                    assinatura: "Ferreira Manuel Fragoso"
                },
                cursos_destaque: [
                    { id: 1, nome: "Construção Civil", icone: "fa-helmet-safety", cor: "#6c757d", link: "construcao-civil.html" },
                    { id: 2, nome: "Electricidade", icone: "fa-bolt", cor: "#3A7BC0", link: "electricidade.html" },
                    { id: 3, nome: "Mecânica", icone: "fa-gear", cor: "#E67E22", link: "mecanica.html" },
                    { id: 4, nome: "Informática", icone: "fa-laptop-code", cor: "#1F7A4D", link: "informatica.html" },
                    { id: 5, nome: "Tecnologias de Móveis", icone: "fa-couch", cor: "#e01a1a", link: "tecnologia-moveis.html" }
                ],
                parceiros: [
                    { id: 1, nome: "ITEL", logo: "itel.png" },
                    { id: 2, nome: "PRODEL", logo: "prodel.png" },
                    { id: 3, nome: "ENDE", logo: "ende.png" },
                    { id: 4, nome: "BOAVIDA", logo: "boavida.png" },
                    { id: 5, nome: "FADCOM", logo: "fadcom.png" }
                ]
            },
            director: {
                titulo: "Perfil do Director",
                foto: "director.jpg",
                nome: "Ferreira Manuel Fragoso",
                data_nascimento: "27 de Julho de 1971",
                naturalidade: "Cacongo, Cabinda",
                experiencia: "30+ Anos na Educação",
                resumo: "Profissional com vasta experiência na gestão educacional...",
                formacoes: [
                    { id: 1, titulo: "Doutorando em Sociologia", instituicao: "ISCED – Luanda", periodo: "Em curso" },
                    { id: 2, titulo: "Pós-Graduação em Pedagogia", instituicao: "ISCED Lubango", periodo: "2014 - 2016" },
                    { id: 3, titulo: "Licenciatura em Ciências da Educação", instituicao: "Universidade Federal do Maranhão", periodo: "Concluído em 2014" },
                    { id: 4, titulo: "Bacharel em Ciências Pedagógicas", instituicao: "Universidade de Havana", periodo: "Concluído em 2001" }
                ],
                experiencias: [
                    { id: 1, periodo: "2018 - Pres.", cargo: "Director Geral", local: "IPIKK" },
                    { id: 2, periodo: "2017", cargo: "Secretário Geral", local: "MESCTI" },
                    { id: 3, periodo: "2016", cargo: "Chefe de Gabinete", local: "MESCTI" }
                ],
                realizacoes: [
                    { id: 1, texto: "Autor Aprovado (2008): Manuais de Administração Escolar" },
                    { id: 2, texto: "Vice-Decano (2008–2010): ISCED-Huambo" },
                    { id: 3, texto: "Revisor Técnico (2008): Planos de Estudo" }
                ]
            },
            orgaos: {
                titulo: "Órgãos Directivos",
                direcao: [
                    { id: 1, nome: "Ferreira Manuel Fragoso", cargo: "Diretor Geral", foto: "diretor_fragoso.jpg" },
                    { id: 2, nome: "Carlos A.T Brito da Silva", cargo: "Subdiretor Pedagógico", foto: "sem_foto.png" },
                    { id: 3, nome: "Carlota M da Silva Antonio", cargo: "Subdiretora Administrativa", foto: "sem_foto.png" }
                ],
                coordenadores_curso: [
                    { id: 1, nome: "Manuel Domingos Simão", cargo: "Coordenador de Energia", foto: "sem_foto.png" },
                    { id: 2, nome: "Gilberto Jorge Oloque da Conceição", cargo: "Coordenador de Frio e Climatização", foto: "sem_foto.png" },
                    { id: 3, nome: "Ivete Flora Saluvo Nunes", cargo: "Coordenadora de Informática", foto: "sem_foto.png" },
                    { id: 4, nome: "António Domingos Muxinda", cargo: "Coordenador de Construção Civil", foto: "sem_foto.png" },
                    { id: 5, nome: "Silson Simão Oliveira Borges", cargo: "Coordenador de Móveis", foto: "sem_foto.png" }
                ],
                coordenadores_disciplina: [
                    { id: 1, nome: "Celina de Marcos Antunes", disciplina: "Língua Portuguesa" },
                    { id: 2, nome: "Edson de Sousa Baptista Massukina", disciplina: "Língua Inglesa" },
                    { id: 3, nome: "Isabel António José Mendes Chitangueleca", disciplina: "Matemática" },
                    { id: 4, nome: "Manuel André da Costa Canguezeze", disciplina: "Desenho Técnico" },
                    { id: 5, nome: "Manuel Baptista João", disciplina: "Física" }
                ],
                chefes_area: [
                    { id: 1, nome: "Ivo Miguel da Rocha Gama", area: "Patrimônio" },
                    { id: 2, nome: "Maria João Domingos Manuel", area: "Secretaria Pedagógica" },
                    { id: 3, nome: "Pedro João Antonio", area: "Segurança" }
                ]
            },
            exDirectores: {
                titulo: "Ex-Directores",
                lista: [
                    { id: 1, nome: "António Sebastião", periodo: "2009-2015", foto: "ex-diretor1.jpg" },
                    { id: 2, nome: "Maria Fernanda", periodo: "2015-2020", foto: "ex-diretor2.jpg" },
                    { id: 3, nome: "João Paulo", periodo: "2020-2023", foto: "ex-diretor3.jpg" }
                ]
            },
            normativos: {
                titulo: "Normativos",
                documentos: [
                    { id: 1, titulo: "Regulamento IPIKK 2021–2022", arquivo: "regulamento_2021.pdf" },
                    { id: 2, titulo: "Projecto Educativo de Escola 2018–2022", arquivo: "projecto_educativo.pdf" },
                    { id: 3, titulo: "Lei de Base do Sistema de Educação", arquivo: "lei_base_educacao.pdf" },
                    { id: 4, titulo: "Órgãos Directivos", arquivo: "orgaos_directivos.pdf" },
                    { id: 5, titulo: "Dados Sobre a Escola IPIKK", arquivo: "dados_escola.pdf" }
                ]
            },
            percurso: {
                titulo: "Histórias de Sucesso",
                historias: [
                    {
                        id: 1,
                        nome: "Muntukalendi Miguel",
                        curso: "Técnico de Obras de Construção Civil",
                        ano_conclusao: "2012",
                        foto: "miguel.jpg",
                        percurso: "Concluiu a formação média em 2012. Licenciou-se em Arquitectura pela UAN. Actualmente é Professor no IPIKK."
                    }
                ]
            },
            quadroHonra: {
                titulo: "Quadro de Honra",
                ano_lectivo: "2024/2025",
                melhor_geral: {
                    nome: "Adilson Emanuel Mutindi Mungondue",
                    media: "17 Valores",
                    curso: "Energia e Instalações Eléctricas",
                    foto: "adilson_mungondue.jpg"
                },
                melhores_classe: [
                    { classe: "10ª", nome: "Adilson Emanuel M. Mungondue", media: "17 Valores", curso: "Energia e Instalações Eléctricas", foto: "adilson_mungondue.jpg" },
                    { classe: "11ª", nome: "Isabel Landana Nicolau", media: "16 Valores", curso: "Obras de Construção Civil", foto: "isabel_nicolau.jpg" },
                    { classe: "12ª", nome: "Hélvio Francisco Fuji José", media: "16,55 Valores", curso: "Informática", foto: "helvio_jose.jpg" }
                ]
            },
            funcionarios: {
                titulo: "Funcionários Destacados",
                linha1: [
                    { id: 1, nome: "Ezequiel Mazenzela", cargo: "Coordenador de Energia", foto: "ezequiel_mazenzela.jpg" },
                    { id: 2, nome: "Silson Borges", cargo: "Coordenador de Móveis", foto: "silson_borges.jpg" },
                    { id: 3, nome: "Aires Alexandre", cargo: "Coordenador de Desenho", foto: "aires_alexandre.jpg" },
                    { id: 4, nome: "Rogério João", cargo: "Professor de Matemática", foto: "rogerio_joao.jpg" }
                ],
                linha2: [
                    { id: 5, nome: "Tulembua Zinga", cargo: "Professor de Matemática", foto: "tulembua_zinga.jpg" },
                    { id: 6, nome: "Esperança Bartolomeu", cargo: "Prof.ª de Português", foto: "esperanca_bartolomeu.jpg" },
                    { id: 7, nome: "Angelina Lopes", cargo: "Chefe da Secretaria", foto: "angelina_lopes.jpg" },
                    { id: 8, nome: "Luísa António", cargo: "Auxiliar de Limpeza", foto: "luisa_antonio.jpg" },
                    { id: 9, nome: "Bartolomeu Lucas", cargo: "Agente de Segurança", foto: "bartolomeu_lucas.jpg" }
                ]
            },
            escolas: {
                titulo: "Escolas Afiliadas",
                lista: [
                    {
                        id: 1,
                        nome: "Instituto Politécnico Privado 'Ndombwa'",
                        tipo: "Privado",
                        email: "email@exemplo.com",
                        telefone: "(+244) 999 999 999",
                        endereco: "ESPAÇO À SER PREENCHIDO",
                        logo: "logo_ndombwa.jpg"
                    },
                    {
                        id: 2,
                        nome: "Instituto Politécnico Privado 'Bondo Matuatunguila'",
                        tipo: "Privado",
                        email: "ippbmatuatunguila@hotmail.com",
                        telefone: "(+244) 928 497 433",
                        endereco: "Nova-Vida – Rua 40-Casa 41",
                        logo: "logo_bondo.jpg"
                    }
                ]
            }
        };

        // ============================================
        // FUNÇÕES DO EDITOR DE PÁGINAS
        // ============================================

        function carregarPagina() {
    const pagina = document.getElementById('seletorPagina').value;
    const container = document.getElementById('containerEditor');
    
    switch(pagina) {
        case 'inicio':
            container.innerHTML = renderPaginaInicial();
            break;
        case 'director':
            container.innerHTML = renderPaginaDirector();
            break;
        case 'orgaos':
            container.innerHTML = renderPaginaOrgaos();
            break;
        case 'ex-directores':
            container.innerHTML = renderPaginaExDirectores();
            break;
        case 'normativos':
            container.innerHTML = renderPaginaNormativos();
            break;
        case 'percurso':
            container.innerHTML = renderPaginaPercurso();
            break;
        case 'quadro-honra':
            container.innerHTML = renderPaginaQuadroHonra();
            break;
        case 'funcionarios':
            container.innerHTML = renderPaginaFuncionarios();
            break;
        case 'escolas':
            container.innerHTML = renderPaginaEscolas();
            break;
        case 'galeria': 
            container.innerHTML = renderPaginaGaleria();
            setTimeout(() => {
                carregarGaleriaEditor();
            }, 50);
            break;
        case 'globais':
            container.innerHTML = renderPaginaGlobais();
            break;
        default:
            container.innerHTML = '<p style="text-align: center; padding: 40px; color: #999;">Selecione uma página para começar a editar</p>';
    }
}

        function renderPaginaGlobais() {
            return `
                <div class="editor-pagina" data-pagina="globais">
                    <!-- ===== BARRA SUPERIOR ===== -->
                    <div class="cabecalho-secao">
                        <h4><i class="fas fa-arrow-up"></i> Barra Superior</h4>
                    </div>
                    <div class="item-dinamico">
                        <div class="grupo-form">
                            <label>Texto da Barra Superior</label>
                            <input type="text" class="campo-form" value="Instituto Médio Politécnico Industrial do Kilamba Kiaxi Nº 8056 Nova-vida" id="barra_superior_texto">
                        </div>
                    </div>

                    <!-- ===== LOGÓTIPO ===== -->
                    <div class="cabecalho-secao" style="margin-top: 40px;">
                        <h4><i class="fas fa-image"></i> Logótipo</h4>
                    </div>
                    <div class="item-dinamico">
                        <div class="grupo-form">
                            <label>Logótipo do Site</label>
                            <div class="area-upload" onclick="document.getElementById('logo_site').click()">
                                <i class="fas fa-cloud-upload-alt"></i>
                                <p>Clique para fazer upload do logótipo</p>
                            </div>
                            <input type="file" id="logo_site" accept="image/*" style="display: none;">
                        </div>
                        <div class="grupo-form">
                            <label>Texto Alternativo (alt)</label>
                            <input type="text" class="campo-form" value="IPIKK Logo" id="logo_alt">
                        </div>
                    </div>

                    <!-- ===== MENU DE NAVEGAÇÃO ===== -->
                    <div class="cabecalho-secao" style="margin-top: 40px;">
                        <h4><i class="fas fa-bars"></i> Menu de Navegação</h4>
                        <span class="badge badge-primario">Itens do menu</span>
                    </div>
                    <div class="lista-dinamica" id="listaItensMenu">
                        <div class="item-dinamico" data-id="1">
                            <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                            <div class="linha-form">
                                <div class="grupo-form">
                                    <label>Texto do Menu</label>
                                    <input type="text" class="campo-form" value="Início">
                                </div>
                                <div class="grupo-form">
                                    <label>Link</label>
                                    <input type="text" class="campo-form" value="inicio.html">
                                </div>
                            </div>
                            <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                        <div class="item-dinamico" data-id="2">
                            <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                            <div class="linha-form">
                                <div class="grupo-form">
                                    <label>Texto do Menu</label>
                                    <input type="text" class="campo-form" value="Oferta Formativa">
                                </div>
                                <div class="grupo-form">
                                    <label>Link</label>
                                    <input type="text" class="campo-form" value="ipikk-oferta-formativa.html">
                                </div>
                            </div>
                            <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                        <div class="item-dinamico" data-id="3">
                            <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                            <div class="linha-form">
                                <div class="grupo-form">
                                    <label>Texto do Menu</label>
                                    <input type="text" class="campo-form" value="Sobre">
                                </div>
                                <div class="grupo-form">
                                    <label>Link</label>
                                    <input type="text" class="campo-form" value="#">
                                </div>
                            </div>
                            <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                        <div class="item-dinamico" data-id="4">
                            <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                            <div class="linha-form">
                                <div class="grupo-form">
                                    <label>Texto do Menu</label>
                                    <input type="text" class="campo-form" value="Notícias">
                                </div>
                                <div class="grupo-form">
                                    <label>Link</label>
                                    <input type="text" class="campo-form" value="ipikk-Noticias.html">
                                </div>
                            </div>
                            <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                        <div class="item-dinamico" data-id="5">
                            <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                            <div class="linha-form">
                                <div class="grupo-form">
                                    <label>Texto do Menu</label>
                                    <input type="text" class="campo-form" value="Galeria">
                                </div>
                                <div class="grupo-form">
                                    <label>Link</label>
                                    <input type="text" class="campo-form" value="ipikk-Galeria.html">
                                </div>
                            </div>
                            <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                        <div class="item-dinamico" data-id="6">
                            <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                            <div class="linha-form">
                                <div class="grupo-form">
                                    <label>Texto do Menu</label>
                                    <input type="text" class="campo-form" value="Contactos">
                                </div>
                                <div class="grupo-form">
                                    <label>Link</label>
                                    <input type="text" class="campo-form" value="ipikk-Contactos.html">
                                </div>
                            </div>
                            <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <button class="btn-adicionar" onclick="adicionarItemMenu()">
                        <i class="fas fa-plus"></i> Adicionar Item ao Menu
                    </button>

                    <!-- ===== SUBMENUS ===== -->
                    <div class="cabecalho-secao" style="margin-top: 40px;">
                        <h4><i class="fas fa-chevron-down"></i> Submenus</h4>
                    </div>
                    <div class="lista-dinamica" id="listaItensSubmenu">
                        <div class="item-dinamico" data-id="1">
                            <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                            <div class="linha-form">
                                <div class="grupo-form">
                                    <label>Item Pai</label>
                                    <select class="selecao-form">
                                        <option value="2">Oferta Formativa</option>
                                        <option value="3">Sobre</option>
                                    </select>
                                </div>
                                <div class="grupo-form">
                                    <label>Texto do Submenu</label>
                                    <input type="text" class="campo-form" value="Construção Civil">
                                </div>
                            </div>
                            <div class="linha-form">
                                <div class="grupo-form">
                                    <label>Link</label>
                                    <input type="text" class="campo-form" value="ipikk-construcao-civil.html">
                                </div>
                                <div class="grupo-form">
                                    <label>Cor do Ícone</label>
                                    <input type="color" class="campo-form" value="#9FA3A7">
                                </div>
                            </div>
                            <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                        <div class="item-dinamico" data-id="2">
                            <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                            <div class="linha-form">
                                <div class="grupo-form">
                                    <label>Item Pai</label>
                                    <select class="selecao-form">
                                        <option value="2">Oferta Formativa</option>
                                        <option value="3">Sobre</option>
                                    </select>
                                </div>
                                <div class="grupo-form">
                                    <label>Texto do Submenu</label>
                                    <input type="text" class="campo-form" value="Electricidade">
                                </div>
                            </div>
                            <div class="linha-form">
                                <div class="grupo-form">
                                    <label>Link</label>
                                    <input type="text" class="campo-form" value="ipikk-electricidade.html">
                                </div>
                                <div class="grupo-form">
                                    <label>Cor do Ícone</label>
                                    <input type="color" class="campo-form" value="#3A7BC0">
                                </div>
                            </div>
                            <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <button class="btn-adicionar" onclick="adicionarSubmenu()">
                        <i class="fas fa-plus"></i> Adicionar Submenu
                    </button>

                    <!-- ===== BOTÕES FLUTUANTES ===== -->
                    <div class="cabecalho-secao" style="margin-top: 40px;">
                        <h4><i class="fas fa-circle"></i> Botões Flutuantes</h4>
                    </div>
                    <div class="item-dinamico">
                        <div class="linha-form">
                            <div class="grupo-form">
                                <label>Botão WhatsApp</label>
                                <div class="grupo-checkbox">
                                    <input type="checkbox" id="whatsapp_ativo" checked>
                                    <label>Ativar botão WhatsApp</label>
                                </div>
                            </div>
                            <div class="grupo-form">
                                <label>Número do WhatsApp</label>
                                <input type="text" class="campo-form" value="244933096705" id="whatsapp_numero">
                            </div>
                        </div>
                        <div class="linha-form">
                            <div class="grupo-form">
                                <label>Mensagem Padrão</label>
                                <input type="text" class="campo-form" value="Olá, gostaria de mais informações." id="whatsapp_mensagem">
                            </div>
                            <div class="grupo-form">
                                <label>Cor do Botão</label>
                                <input type="color" class="campo-form" value="#25D366" id="whatsapp_cor">
                            </div>
                        </div>
                    </div>
                    <div class="item-dinamico">
                        <div class="linha-form">
                            <div class="grupo-form">
                                <label>Botão Voltar ao Topo</label>
                                <div class="grupo-checkbox">
                                    <input type="checkbox" id="topo_ativo" checked>
                                    <label>Ativar botão voltar ao topo</label>
                                </div>
                            </div>
                            <div class="grupo-form">
                                <label>Cor do Botão</label>
                                <input type="color" class="campo-form" value="#003072" id="topo_cor">
                            </div>
                        </div>
                        <div class="grupo-form">
                            <label>Mostrar a partir de (px)</label>
                            <input type="number" class="campo-form" value="300" id="topo_scroll">
                        </div>
                    </div>

                    <!-- ===== ÍCONES SOCIAIS ===== -->
                    <div class="cabecalho-secao" style="margin-top: 40px;">
                        <h4><i class="fas fa-share-alt"></i> Ícones Sociais</h4>
                    </div>
                    <div class="lista-dinamica" id="listaIconesSociais">
                        <div class="item-dinamico" data-id="facebook">
                            <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                            <div class="linha-form">
                                <div class="grupo-form">
                                    <label>Rede Social</label>
                                    <select class="selecao-form">
                                        <option value="facebook" selected>Facebook</option>
                                        <option value="instagram">Instagram</option>
                                        <option value="linkedin">LinkedIn</option>
                                        <option value="twitter">Twitter</option>
                                        <option value="youtube">YouTube</option>
                                    </select>
                                </div>
                                <div class="grupo-form">
                                    <label>URL</label>
                                    <input type="url" class="campo-form" value="https://facebook.com/ipikkofficial">
                                </div>
                            </div>
                            <div class="grupo-checkbox">
                                <input type="checkbox" checked>
                                <label>Mostrar no cabeçalho</label>
                            </div>
                            <div class="grupo-checkbox">
                                <input type="checkbox" checked>
                                <label>Mostrar no rodapé</label>
                            </div>
                            <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                        <div class="item-dinamico" data-id="instagram">
                            <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                            <div class="linha-form">
                                <div class="grupo-form">
                                    <label>Rede Social</label>
                                    <select class="selecao-form">
                                        <option value="facebook">Facebook</option>
                                        <option value="instagram" selected>Instagram</option>
                                        <option value="linkedin">LinkedIn</option>
                                        <option value="twitter">Twitter</option>
                                        <option value="youtube">YouTube</option>
                                    </select>
                                </div>
                                <div class="grupo-form">
                                    <label>URL</label>
                                    <input type="url" class="campo-form" value="https://instagram.com/ipikk">
                                </div>
                            </div>
                            <div class="grupo-checkbox">
                                <input type="checkbox" checked>
                                <label>Mostrar no cabeçalho</label>
                            </div>
                            <div class="grupo-checkbox">
                                <input type="checkbox" checked>
                                <label>Mostrar no rodapé</label>
                            </div>
                            <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <button class="btn-adicionar" onclick="adicionarIconeSocial()">
                        <i class="fas fa-plus"></i> Adicionar Ícone Social
                    </button>

                    <!-- ===== RODAPÉ ===== -->
                    <div class="cabecalho-secao" style="margin-top: 40px;">
                        <h4><i class="fas fa-arrow-down"></i> Rodapé</h4>
                    </div>
                    <div class="item-dinamico">
                        <div class="linha-form">
                            <div class="grupo-form">
                                <label>Texto do Rodapé</label>
                                <input type="text" class="campo-form" value="IPIKK 2026 © Todos os direitos reservados by" id="rodape_texto">
                            </div>
                            <div class="grupo-form">
                                <label>Destaque</label>
                                <input type="text" class="campo-form" value="INFOSI" id="rodape_destaque">
                            </div>
                        </div>
                    </div>

                    <div class="cabecalho-secao" style="margin-top: 40px;">
                        <h4><i class="fas fa-link"></i> Links Rápidos do Rodapé</h4>
                    </div>
                    <div class="lista-dinamica" id="listaLinksRodape">
                        <div class="item-dinamico" data-id="1">
                            <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                            <div class="linha-form">
                                <div class="grupo-form">
                                    <label>Texto do Link</label>
                                    <input type="text" class="campo-form" value="Sobre Nós">
                                </div>
                                <div class="grupo-form">
                                    <label>Link</label>
                                    <input type="text" class="campo-form" value="ipikk-sobre-quem-somos.html">
                                </div>
                            </div>
                            <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                        <div class="item-dinamico" data-id="2">
                            <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                            <div class="linha-form">
                                <div class="grupo-form">
                                    <label>Texto do Link</label>
                                    <input type="text" class="campo-form" value="Inscrição">
                                </div>
                                <div class="grupo-form">
                                    <label>Link</label>
                                    <input type="text" class="campo-form" value="inicio.html">
                                </div>
                            </div>
                            <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                        <div class="item-dinamico" data-id="3">
                            <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                            <div class="linha-form">
                                <div class="grupo-form">
                                    <label>Texto do Link</label>
                                    <input type="text" class="campo-form" value="Contactos">
                                </div>
                                <div class="grupo-form">
                                    <label>Link</label>
                                    <input type="text" class="campo-form" value="ipikk-Contactos.html">
                                </div>
                            </div>
                            <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <button class="btn-adicionar" onclick="adicionarLinkRodape()">
                        <i class="fas fa-plus"></i> Adicionar Link no Rodapé
                    </button>

                    <!-- ===== MENU MOBILE ===== -->
                    <div class="cabecalho-secao" style="margin-top: 40px;">
                        <h4><i class="fas fa-mobile-alt"></i> Menu Mobile</h4>
                    </div>
                    <div class="lista-dinamica" id="listaMenuMobile">
                        <div class="item-dinamico" data-id="1">
                            <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                            <div class="linha-form">
                                <div class="grupo-form">
                                    <label>Texto do Link</label>
                                    <input type="text" class="campo-form" value="Início">
                                </div>
                                <div class="grupo-form">
                                    <label>Link</label>
                                    <input type="text" class="campo-form" value="inicio.html">
                                </div>
                            </div>
                            <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                        <div class="item-dinamico" data-id="2">
                            <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                            <div class="linha-form">
                                <div class="grupo-form">
                                    <label>Texto do Link</label>
                                    <input type="text" class="campo-form" value="Oferta Formativa">
                                </div>
                                <div class="grupo-form">
                                    <label>Link</label>
                                    <input type="text" class="campo-form" value="ipikk-oferta-formativa.html">
                                </div>
                            </div>
                            <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                        <div class="item-dinamico" data-id="3">
                            <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                            <div class="linha-form">
                                <div class="grupo-form">
                                    <label>Texto do Link</label>
                                    <input type="text" class="campo-form" value="Sobre">
                                </div>
                                <div class="grupo-form">
                                    <label>Link</label>
                                    <input type="text" class="campo-form" value="ipikk-sobre-quem-somos.html">
                                </div>
                            </div>
                            <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <button class="btn-adicionar" onclick="adicionarLinkMenuMobile()">
                        <i class="fas fa-plus"></i> Adicionar Link no Menu Mobile
                    </button>
                </div>
            `;
        }

        function renderPaginaInicial() {
            const dados = dadosPaginas.inicio;
            return `
                <div class="editor-pagina" data-pagina="inicio">
                    <!-- SLIDER -->
                    <div class="cabecalho-secao">
                        <h4><i class="fas fa-images"></i> Slider Principal</h4>
                        <span class="badge badge-primario">${dados.slider.length} slides</span>
                    </div>
                    <div class="lista-dinamica" id="listaSlider">
                        ${dados.slider.map((slide, indice) => `
                            <div class="item-dinamico" data-id="${slide.id}">
                                <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                                <div class="linha-form">
                                    <div class="grupo-form">
                                        <label>Título do Slide</label>
                                        <input type="text" class="campo-form" value="${slide.titulo}">
                                    </div>
                                    <div class="grupo-form">
                                        <label>Botão</label>
                                        <input type="text" class="campo-form" value="${slide.botao}">
                                    </div>
                                </div>
                                <div class="grupo-form">
                                    <label>Imagem de Fundo</label>
                                    <div class="area-upload" onclick="document.getElementById('slideImg${indice}').click()">
                                        <i class="fas fa-cloud-upload-alt"></i>
                                        <p>Clique para fazer upload</p>
                                    </div>
                                    <input type="file" id="slideImg${indice}" accept="image/*" style="display: none;">
                                </div>
                                <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                    <button class="btn-adicionar" onclick="adicionarSlide()">
                        <i class="fas fa-plus"></i> Adicionar Slide
                    </button>

                    <!-- MENSAGEM DO DIRECTOR -->
                    <div class="cabecalho-secao" style="margin-top: 40px;">
                        <h4><i class="fas fa-user-tie"></i> Mensagem do Director</h4>
                    </div>
                    <div class="item-dinamico">
                        <div class="linha-form">
                            <div class="grupo-form">
                                <label>Foto do Director</label>
                                <div class="area-upload" onclick="document.getElementById('directorFoto').click()">
                                    <i class="fas fa-cloud-upload-alt"></i>
                                    <p>Clique para fazer upload</p>
                                </div>
                                <input type="file" id="directorFoto" accept="image/*" style="display: none;">
                            </div>
                        </div>
                        <div class="linha-form">
                            <div class="grupo-form">
                                <label>Nome</label>
                                <input type="text" class="campo-form" value="${dados.mensagem_director.nome}">
                            </div>
                            <div class="grupo-form">
                                <label>Cargo</label>
                                <input type="text" class="campo-form" value="${dados.mensagem_director.cargo}">
                            </div>
                        </div>
                        <div class="grupo-form">
                            <label>Mensagem</label>
                            <textarea class="area-texto" rows="4">${dados.mensagem_director.mensagem}</textarea>
                        </div>
                    </div>

                    <!-- CURSOS EM DESTAQUE -->
                    <div class="cabecalho-secao" style="margin-top: 40px;">
                        <h4><i class="fas fa-graduation-cap"></i> Cursos em Destaque</h4>
                        <span class="badge badge-primario">${dados.cursos_destaque.length} cursos</span>
                    </div>
                    <div class="lista-dinamica" id="listaCursosDestaque">
                        ${dados.cursos_destaque.map((curso, indice) => `
                            <div class="item-dinamico" data-id="${curso.id}">
                                <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                                <div class="linha-form">
                                    <div class="grupo-form">
                                        <label>Nome do Curso</label>
                                        <input type="text" class="campo-form" value="${curso.nome}">
                                    </div>
                                    <div class="grupo-form">
                                        <label>Link</label>
                                        <input type="text" class="campo-form" value="${curso.link}">
                                    </div>
                                </div>
                                <div class="linha-form">
                                    <div class="grupo-form">
                                        <label>Ícone</label>
                                        <input type="text" class="campo-form" value="${curso.icone}">
                                    </div>
                                    <div class="grupo-form">
                                        <label>Cor</label>
                                        <input type="color" class="campo-form" value="${curso.cor}">
                                    </div>
                                </div>
                                <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                    <button class="btn-adicionar" onclick="adicionarCursoDestaque()">
                        <i class="fas fa-plus"></i> Adicionar Curso
                    </button>

                    <!-- PARCEIROS -->
                    <div class="cabecalho-secao" style="margin-top: 40px;">
                        <h4><i class="fas fa-handshake"></i> Parceiros</h4>
                        <span class="badge badge-primario">${dados.parceiros.length} parceiros</span>
                    </div>
                    <div class="lista-dinamica" id="listaParceiros">
                        ${dados.parceiros.map((parceiro, indice) => `
                            <div class="item-dinamico" data-id="${parceiro.id}">
                                <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                                <div class="linha-form">
                                    <div class="grupo-form">
                                        <label>Nome do Parceiro</label>
                                        <input type="text" class="campo-form" value="${parceiro.nome}">
                                    </div>
                                    <div class="grupo-form">
                                        <label>Logótipo</label>
                                        <div class="area-upload" onclick="document.getElementById('parceiroLogo${indice}').click()">
                                            <i class="fas fa-cloud-upload-alt"></i>
                                            <p>Clique para fazer upload</p>
                                        </div>
                                        <input type="file" id="parceiroLogo${indice}" accept="image/*" style="display: none;">
                                    </div>
                                </div>
                                <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                    <button class="btn-adicionar" onclick="adicionarParceiro()">
                        <i class="fas fa-plus"></i> Adicionar Parceiro
                    </button>
                </div>
            `;
        }

        function renderPaginaDirector() {
            const dados = dadosPaginas.director;
            return `
                <div class="editor-pagina" data-pagina="director">
                    <!-- DADOS PESSOAIS -->
                    <div class="cabecalho-secao">
                        <h4><i class="fas fa-user"></i> Dados Pessoais</h4>
                    </div>
                    <div class="item-dinamico">
                        <div class="linha-form">
                            <div class="grupo-form">
                                <label>Foto do Director</label>
                                <div class="area-upload" onclick="document.getElementById('directorPerfilFoto').click()">
                                    <i class="fas fa-cloud-upload-alt"></i>
                                    <p>Clique para fazer upload</p>
                                </div>
                                <input type="file" id="directorPerfilFoto" accept="image/*" style="display: none;">
                            </div>
                        </div>
                        <div class="linha-form">
                            <div class="grupo-form">
                                <label>Nome Completo</label>
                                <input type="text" class="campo-form" value="${dados.nome}">
                            </div>
                            <div class="grupo-form">
                                <label>Data de Nascimento</label>
                                <input type="text" class="campo-form" value="${dados.data_nascimento}">
                            </div>
                        </div>
                        <div class="linha-form">
                            <div class="grupo-form">
                                <label>Naturalidade</label>
                                <input type="text" class="campo-form" value="${dados.naturalidade}">
                            </div>
                            <div class="grupo-form">
                                <label>Experiência</label>
                                <input type="text" class="campo-form" value="${dados.experiencia}">
                            </div>
                        </div>
                        <div class="grupo-form">
                            <label>Resumo Profissional</label>
                            <textarea class="area-texto" rows="4">${dados.resumo}</textarea>
                        </div>
                    </div>

                    <!-- FORMAÇÃO ACADÉMICA -->
                    <div class="cabecalho-secao" style="margin-top: 40px;">
                        <h4><i class="fas fa-graduation-cap"></i> Formação Académica</h4>
                        <span class="badge badge-primario">${dados.formacoes.length} formações</span>
                    </div>
                    <div class="lista-dinamica" id="listaFormacoes">
                        ${dados.formacoes.map((item) => `
                            <div class="item-dinamico" data-id="${item.id}">
                                <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                                <div class="grupo-form">
                                    <input type="text" class="campo-form" value="${item.titulo}" placeholder="Título">
                                </div>
                                <div class="linha-form">
                                    <div class="grupo-form">
                                        <input type="text" class="campo-form" value="${item.instituicao}" placeholder="Instituição">
                                    </div>
                                    <div class="grupo-form">
                                        <input type="text" class="campo-form" value="${item.periodo}" placeholder="Período">
                                    </div>
                                </div>
                                <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                    <button class="btn-adicionar" onclick="adicionarFormacao()">
                        <i class="fas fa-plus"></i> Adicionar Formação
                    </button>

                    <!-- EXPERIÊNCIA PROFISSIONAL -->
                    <div class="cabecalho-secao" style="margin-top: 40px;">
                        <h4><i class="fas fa-briefcase"></i> Experiência Profissional</h4>
                        <span class="badge badge-primario">${dados.experiencias.length} experiências</span>
                    </div>
                    <div class="lista-dinamica" id="listaExperiencias">
                        ${dados.experiencias.map((item) => `
                            <div class="item-dinamico" data-id="${item.id}">
                                <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                                <div class="linha-form">
                                    <div class="grupo-form">
                                        <input type="text" class="campo-form" value="${item.periodo}" placeholder="Período">
                                    </div>
                                    <div class="grupo-form">
                                        <input type="text" class="campo-form" value="${item.cargo}" placeholder="Cargo">
                                    </div>
                                </div>
                                <div class="grupo-form">
                                    <input type="text" class="campo-form" value="${item.local}" placeholder="Local">
                                </div>
                                <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                    <button class="btn-adicionar" onclick="adicionarExperiencia()">
                        <i class="fas fa-plus"></i> Adicionar Experiência
                    </button>

                    <!-- REALIZAÇÕES -->
                    <div class="cabecalho-secao" style="margin-top: 40px;">
                        <h4><i class="fas fa-trophy"></i> Realizações</h4>
                        <span class="badge badge-primario">${dados.realizacoes.length} realizações</span>
                    </div>
                    <div class="lista-dinamica" id="listaRealizacoes">
                        ${dados.realizacoes.map((item) => `
                            <div class="item-dinamico" data-id="${item.id}">
                                <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                                <div class="grupo-form">
                                    <textarea class="area-texto" rows="2">${item.texto}</textarea>
                                </div>
                                <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                    <button class="btn-adicionar" onclick="adicionarRealizacao()">
                        <i class="fas fa-plus"></i> Adicionar Realização
                    </button>
                </div>
            `;
        }

        function renderPaginaOrgaos() {
            const dados = dadosPaginas.orgaos;
            return `
                <div class="editor-pagina" data-pagina="orgaos">
                    <!-- DIREÇÃO EXECUTIVA -->
                    <div class="cabecalho-secao">
                        <h4><i class="fas fa-users-cog"></i> Direção Executiva</h4>
                        <span class="badge badge-primario">${dados.direcao.length} membros</span>
                    </div>
                    <div class="lista-dinamica" id="listaDirecao">
                        ${dados.direcao.map((membro) => `
                            <div class="item-dinamico" data-id="${membro.id}">
                                <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                                <div class="linha-form">
                                    <div class="grupo-form">
                                        <label>Nome</label>
                                        <input type="text" class="campo-form" value="${membro.nome}">
                                    </div>
                                    <div class="grupo-form">
                                        <label>Cargo</label>
                                        <input type="text" class="campo-form" value="${membro.cargo}">
                                    </div>
                                </div>
                                <div class="grupo-form">
                                    <label>Foto</label>
                                    <div class="area-upload" onclick="this.nextElementSibling.click()">
                                        <i class="fas fa-cloud-upload-alt"></i>
                                        <p>Clique para fazer upload</p>
                                    </div>
                                    <input type="file" accept="image/*" style="display: none;">
                                </div>
                                <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                    <button class="btn-adicionar" onclick="adicionarMembroDirecao()">
                        <i class="fas fa-plus"></i> Adicionar Membro
                    </button>

                    <!-- COORDENADORES DE CURSO -->
                    <div class="cabecalho-secao" style="margin-top: 40px;">
                        <h4><i class="fas fa-book-open"></i> Coordenadores de Curso</h4>
                        <span class="badge badge-primario">${dados.coordenadores_curso.length} coordenadores</span>
                    </div>
                    <div class="lista-dinamica" id="listaCoordenadoresCurso">
                        ${dados.coordenadores_curso.map((coord) => `
                            <div class="item-dinamico" data-id="${coord.id}">
                                <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                                <div class="linha-form">
                                    <div class="grupo-form">
                                        <label>Nome</label>
                                        <input type="text" class="campo-form" value="${coord.nome}">
                                    </div>
                                    <div class="grupo-form">
                                        <label>Cargo</label>
                                        <input type="text" class="campo-form" value="${coord.cargo}">
                                    </div>
                                </div>
                                <div class="grupo-form">
                                    <label>Foto</label>
                                    <div class="area-upload" onclick="this.nextElementSibling.click()">
                                        <i class="fas fa-cloud-upload-alt"></i>
                                        <p>Clique para fazer upload</p>
                                    </div>
                                    <input type="file" accept="image/*" style="display: none;">
                                </div>
                                <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                    <button class="btn-adicionar" onclick="adicionarCoordenadorCurso()">
                        <i class="fas fa-plus"></i> Adicionar Coordenador
                    </button>

                    <!-- COORDENADORES DE DISCIPLINA -->
                    <div class="cabecalho-secao" style="margin-top: 40px;">
                        <h4><i class="fas fa-chalkboard-teacher"></i> Coordenadores de Disciplina</h4>
                        <span class="badge badge-primario">${dados.coordenadores_disciplina.length} coordenadores</span>
                    </div>
                    <div class="lista-dinamica" id="listaCoordenadoresDisciplina">
                        ${dados.coordenadores_disciplina.map((coord) => `
                            <div class="item-dinamico" data-id="${coord.id}">
                                <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                                <div class="linha-form">
                                    <div class="grupo-form">
                                        <label>Nome</label>
                                        <input type="text" class="campo-form" value="${coord.nome}">
                                    </div>
                                    <div class="grupo-form">
                                        <label>Disciplina</label>
                                        <input type="text" class="campo-form" value="${coord.disciplina}">
                                    </div>
                                </div>
                                <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                    <button class="btn-adicionar" onclick="adicionarCoordenadorDisciplina()">
                        <i class="fas fa-plus"></i> Adicionar Coordenador
                    </button>

                    <!-- CHEFES DE ÁREA -->
                    <div class="cabecalho-secao" style="margin-top: 40px;">
                        <h4><i class="fas fa-tasks"></i> Chefes de Área</h4>
                        <span class="badge badge-primario">${dados.chefes_area.length} chefes</span>
                    </div>
                    <div class="lista-dinamica" id="listaChefes">
                        ${dados.chefes_area.map((chefe) => `
                            <div class="item-dinamico" data-id="${chefe.id}">
                                <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                                <div class="linha-form">
                                    <div class="grupo-form">
                                        <label>Nome</label>
                                        <input type="text" class="campo-form" value="${chefe.nome}">
                                    </div>
                                    <div class="grupo-form">
                                        <label>Área</label>
                                        <input type="text" class="campo-form" value="${chefe.area}">
                                    </div>
                                </div>
                                <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                    <button class="btn-adicionar" onclick="adicionarChefeArea()">
                        <i class="fas fa-plus"></i> Adicionar Chefe
                    </button>
                </div>
            `;
        }

        function renderPaginaExDirectores() {
            const dados = dadosPaginas.exDirectores;
            return `
                <div class="editor-pagina" data-pagina="ex-directores">
                    <div class="cabecalho-secao">
                        <h4><i class="fas fa-user-clock"></i> Ex-Directores</h4>
                        <span class="badge badge-primario">${dados.lista.length} registos</span>
                    </div>
                    <div class="lista-dinamica" id="listaExDirectores">
                        ${dados.lista.map((ex) => `
                            <div class="item-dinamico" data-id="${ex.id}">
                                <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                                <div class="linha-form">
                                    <div class="grupo-form">
                                        <label>Nome</label>
                                        <input type="text" class="campo-form" value="${ex.nome}">
                                    </div>
                                    <div class="grupo-form">
                                        <label>Período</label>
                                        <input type="text" class="campo-form" value="${ex.periodo}">
                                    </div>
                                </div>
                                <div class="grupo-form">
                                    <label>Foto</label>
                                    <div class="area-upload" onclick="this.nextElementSibling.click()">
                                        <i class="fas fa-cloud-upload-alt"></i>
                                        <p>Clique para fazer upload</p>
                                    </div>
                                    <input type="file" accept="image/*" style="display: none;">
                                </div>
                                <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                    <button class="btn-adicionar" onclick="adicionarExDirector()">
                        <i class="fas fa-plus"></i> Adicionar Ex-Director
                    </button>
                </div>
            `;
        }

        function renderPaginaNormativos() {
            const dados = dadosPaginas.normativos;
            return `
                <div class="editor-pagina" data-pagina="normativos">
                    <div class="cabecalho-secao">
                        <h4><i class="fas fa-file-pdf"></i> Documentos Normativos</h4>
                        <span class="badge badge-primario">${dados.documentos.length} documentos</span>
                    </div>
                    <div class="lista-dinamica" id="listaNormativos">
                        ${dados.documentos.map((doc, indice) => `
                            <div class="item-dinamico" data-id="${doc.id}">
                                <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                                <div class="linha-form">
                                    <div class="grupo-form">
                                        <label>Título</label>
                                        <input type="text" class="campo-form" value="${doc.titulo}">
                                    </div>
                                    <div class="grupo-form">
                                        <label>Arquivo PDF</label>
                                        <div class="area-upload" onclick="document.getElementById('pdf${indice}').click()">
                                            <i class="fas fa-file-pdf"></i>
                                            <p>Clique para fazer upload</p>
                                        </div>
                                        <input type="file" id="pdf${indice}" accept=".pdf" style="display: none;">
                                    </div>
                                </div>
                                <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                    <button class="btn-adicionar" onclick="adicionarDocumentoNormativo()">
                        <i class="fas fa-plus"></i> Adicionar Documento
                    </button>
                </div>
            `;
        }

        function renderPaginaPercurso() {
            const dados = dadosPaginas.percurso;
            return `
                <div class="editor-pagina" data-pagina="percurso">
                    <div class="cabecalho-secao">
                        <h4><i class="fas fa-history"></i> Histórias de Sucesso</h4>
                        <span class="badge badge-primario">${dados.historias.length} histórias</span>
                    </div>
                    <div class="lista-dinamica" id="listaHistorias">
                        ${dados.historias.map((hist, indice) => `
                            <div class="item-dinamico" data-id="${hist.id}">
                                <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                                <div class="linha-form">
                                    <div class="grupo-form">
                                        <label>Nome</label>
                                        <input type="text" class="campo-form" value="${hist.nome}">
                                    </div>
                                    <div class="grupo-form">
                                        <label>Curso</label>
                                        <input type="text" class="campo-form" value="${hist.curso}">
                                    </div>
                                </div>
                                <div class="linha-form">
                                    <div class="grupo-form">
                                        <label>Ano de Conclusão</label>
                                        <input type="text" class="campo-form" value="${hist.ano_conclusao}">
                                    </div>
                                    <div class="grupo-form">
                                        <label>Foto</label>
                                        <div class="area-upload" onclick="document.getElementById('historiaFoto${indice}').click()">
                                            <i class="fas fa-cloud-upload-alt"></i>
                                            <p>Clique para fazer upload</p>
                                        </div>
                                        <input type="file" id="historiaFoto${indice}" accept="image/*" style="display: none;">
                                    </div>
                                </div>
                                <div class="grupo-form">
                                    <label>Percurso Profissional</label>
                                    <textarea class="area-texto" rows="3">${hist.percurso}</textarea>
                                </div>
                                <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                    <button class="btn-adicionar" onclick="adicionarHistoria()">
                        <i class="fas fa-plus"></i> Adicionar História
                    </button>
                </div>
            `;
        }

        function renderPaginaQuadroHonra() {
            const dados = dadosPaginas.quadroHonra;
            return `
                <div class="editor-pagina" data-pagina="quadro-honra">
                    <div class="cabecalho-secao">
                        <h4><i class="fas fa-calendar-alt"></i> Ano Lectivo</h4>
                    </div>
                    <div class="item-dinamico">
                        <div class="grupo-form">
                            <label>Ano Lectivo</label>
                            <input type="text" class="campo-form" value="${dados.ano_lectivo}">
                        </div>
                    </div>

                    <div class="cabecalho-secao" style="margin-top: 40px;">
                        <h4><i class="fas fa-crown"></i> Melhor Aluno Geral</h4>
                    </div>
                    <div class="item-dinamico">
                        <div class="linha-form">
                            <div class="grupo-form">
                                <label>Foto</label>
                                <div class="area-upload" onclick="document.getElementById('melhorGeralFoto').click()">
                                    <i class="fas fa-cloud-upload-alt"></i>
                                    <p>Clique para fazer upload</p>
                                </div>
                                <input type="file" id="melhorGeralFoto" accept="image/*" style="display: none;">
                            </div>
                        </div>
                        <div class="linha-form">
                            <div class="grupo-form">
                                <label>Nome</label>
                                <input type="text" class="campo-form" value="${dados.melhor_geral.nome}">
                            </div>
                            <div class="grupo-form">
                                <label>Média</label>
                                <input type="text" class="campo-form" value="${dados.melhor_geral.media}">
                            </div>
                        </div>
                        <div class="grupo-form">
                            <label>Curso</label>
                            <input type="text" class="campo-form" value="${dados.melhor_geral.curso}">
                        </div>
                    </div>

                    <div class="cabecalho-secao" style="margin-top: 40px;">
                        <h4><i class="fas fa-users"></i> Melhores Alunos por Classe</h4>
                        <span class="badge badge-primario">${dados.melhores_classe.length} classes</span>
                    </div>
                    <div class="lista-dinamica" id="listaMelhoresClasse">
                        ${dados.melhores_classe.map((aluno, indice) => `
                            <div class="item-dinamico">
                                <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                                <div class="linha-form">
                                    <div class="grupo-form">
                                        <label>Classe</label>
                                        <input type="text" class="campo-form" value="${aluno.classe}">
                                    </div>
                                    <div class="grupo-form">
                                        <label>Nome</label>
                                        <input type="text" class="campo-form" value="${aluno.nome}">
                                    </div>
                                </div>
                                <div class="linha-form">
                                    <div class="grupo-form">
                                        <label>Média</label>
                                        <input type="text" class="campo-form" value="${aluno.media}">
                                    </div>
                                    <div class="grupo-form">
                                        <label>Curso</label>
                                        <input type="text" class="campo-form" value="${aluno.curso}">
                                    </div>
                                </div>
                                <div class="grupo-form">
                                    <label>Foto</label>
                                    <div class="area-upload" onclick="document.getElementById('classeFoto${indice}').click()">
                                        <i class="fas fa-cloud-upload-alt"></i>
                                        <p>Clique para fazer upload</p>
                                    </div>
                                    <input type="file" id="classeFoto${indice}" accept="image/*" style="display: none;">
                                </div>
                                <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                    <button class="btn-adicionar" onclick="adicionarMelhorClasse()">
                        <i class="fas fa-plus"></i> Adicionar Classe
                    </button>
                </div>
            `;
        }

        function renderPaginaFuncionarios() {
            const dados = dadosPaginas.funcionarios;
            return `
                <div class="editor-pagina" data-pagina="funcionarios">
                    <div class="cabecalho-secao">
                        <h4><i class="fas fa-star"></i> Primeira Linha (4 funcionários)</h4>
                        <span class="badge badge-primario">${dados.linha1.length} funcionários</span>
                    </div>
                    <div class="lista-dinamica" id="funcionariosLinha1">
                        ${dados.linha1.map((func, indice) => `
                            <div class="item-dinamico">
                                <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                                <div class="linha-form">
                                    <div class="grupo-form">
                                        <label>Nome</label>
                                        <input type="text" class="campo-form" value="${func.nome}">
                                    </div>
                                    <div class="grupo-form">
                                        <label>Cargo</label>
                                        <input type="text" class="campo-form" value="${func.cargo}">
                                    </div>
                                </div>
                                <div class="grupo-form">
                                    <label>Foto</label>
                                    <div class="area-upload" onclick="document.getElementById('funcLinha1Foto${indice}').click()">
                                        <i class="fas fa-cloud-upload-alt"></i>
                                        <p>Clique para fazer upload</p>
                                    </div>
                                    <input type="file" id="funcLinha1Foto${indice}" accept="image/*" style="display: none;">
                                </div>
                                <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                    <button class="btn-adicionar" onclick="adicionarFuncionarioLinha1()">
                        <i class="fas fa-plus"></i> Adicionar Funcionário
                    </button>

                    <div class="cabecalho-secao" style="margin-top: 40px;">
                        <h4><i class="fas fa-star-half-alt"></i> Segunda Linha (5 funcionários)</h4>
                        <span class="badge badge-primario">${dados.linha2.length} funcionários</span>
                    </div>
                    <div class="lista-dinamica" id="funcionariosLinha2">
                        ${dados.linha2.map((func, indice) => `
                            <div class="item-dinamico">
                                <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                                <div class="linha-form">
                                    <div class="grupo-form">
                                        <label>Nome</label>
                                        <input type="text" class="campo-form" value="${func.nome}">
                                    </div>
                                    <div class="grupo-form">
                                        <label>Cargo</label>
                                        <input type="text" class="campo-form" value="${func.cargo}">
                                    </div>
                                </div>
                                <div class="grupo-form">
                                    <label>Foto</label>
                                    <div class="area-upload" onclick="document.getElementById('funcLinha2Foto${indice}').click()">
                                        <i class="fas fa-cloud-upload-alt"></i>
                                        <p>Clique para fazer upload</p>
                                    </div>
                                    <input type="file" id="funcLinha2Foto${indice}" accept="image/*" style="display: none;">
                                </div>
                                <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                    <button class="btn-adicionar" onclick="adicionarFuncionarioLinha2()">
                        <i class="fas fa-plus"></i> Adicionar Funcionário
                    </button>
                </div>
            `;
        }

        function renderPaginaEscolas() {
            const dados = dadosPaginas.escolas;
            return `
                <div class="editor-pagina" data-pagina="escolas">
                    <div class="cabecalho-secao">
                        <h4><i class="fas fa-school"></i> Escolas Afiliadas</h4>
                        <span class="badge badge-primario">${dados.lista.length} escolas</span>
                    </div>
                    <div class="lista-dinamica" id="listaEscolas">
                        ${dados.lista.map((escola, indice) => `
                            <div class="item-dinamico" data-id="${escola.id}">
                                <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                                <div class="linha-form">
                                    <div class="grupo-form">
                                        <label>Nome da Escola</label>
                                        <input type="text" class="campo-form" value="${escola.nome}">
                                    </div>
                                    <div class="grupo-form">
                                        <label>Tipo</label>
                                        <select class="selecao-form">
                                            <option value="Privado" ${escola.tipo === 'Privado' ? 'selected' : ''}>Privado</option>
                                            <option value="Público" ${escola.tipo === 'Público' ? 'selected' : ''}>Público</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="linha-form">
                                    <div class="grupo-form">
                                        <label>Email</label>
                                        <input type="email" class="campo-form" value="${escola.email}">
                                    </div>
                                    <div class="grupo-form">
                                        <label>Telefone</label>
                                        <input type="text" class="campo-form" value="${escola.telefone}">
                                    </div>
                                </div>
                                <div class="grupo-form">
                                    <label>Endereço</label>
                                    <input type="text" class="campo-form" value="${escola.endereco}">
                                </div>
                                <div class="grupo-form">
                                    <label>Logótipo</label>
                                    <div class="area-upload" onclick="document.getElementById('escolaLogo${indice}').click()">
                                        <i class="fas fa-cloud-upload-alt"></i>
                                        <p>Clique para fazer upload</p>
                                    </div>
                                    <input type="file" id="escolaLogo${indice}" accept="image/*" style="display: none;">
                                </div>
                                <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                    <button class="btn-adicionar" onclick="adicionarEscola()">
                        <i class="fas fa-plus"></i> Adicionar Escola
                    </button>
                </div>
            `;
        }
        //Pagina de Galeria
        
        //Preview da pagina
        function previewPagina() {
            const pagina = document.getElementById('seletorPagina').value;
            const nomesPaginas = {
                'inicio': 'Página Inicial',
                'sobre': 'Quem Somos',
                'director': 'Perfil do Director',
                'orgaos': 'Órgãos Directivos',
                'ex-directores': 'Ex-Directores',
                'normativos': 'Normativos',
                'percurso': 'Histórias de Sucesso',
                'quadro-honra': 'Quadro de Honra',
                'funcionarios': 'Funcionários Destacados',
                'escolas': 'Escolas Afiliadas',
                'globais': 'Elementos Globais'
            };
            mostrarNotificacao(`Pré-visualizar: ${nomesPaginas[pagina]}`, 'info');
        }

        function guardarPagina() {
            const pagina = document.getElementById('seletorPagina').value;
            const nomesPaginas = {
                'inicio': 'Página Inicial',
                'sobre': 'Quem Somos',
                'director': 'Perfil do Director',
                'orgaos': 'Órgãos Directivos',
                'ex-directores': 'Ex-Directores',
                'normativos': 'Normativos',
                'percurso': 'Histórias de Sucesso',
                'quadro-honra': 'Quadro de Honra',
                'funcionarios': 'Funcionários Destacados',
                'escolas': 'Escolas Afiliadas',
                'globais': 'Elementos Globais'
            };
            mostrarNotificacao(`${nomesPaginas[pagina]} guardada com sucesso!`, 'sucesso');
        }

        // ============================================
        // FUNÇÕES PARA ADICIONAR ITENS
        // ============================================

        function adicionarSlide() {
            const lista = document.getElementById('listaSlider');
            if (!lista) return;
            const novoId = Date.now();
            const novoItem = document.createElement('div');
            novoItem.className = 'item-dinamico';
            novoItem.dataset.id = novoId;
            novoItem.innerHTML = `
                <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                <div class="linha-form">
                    <div class="grupo-form">
                        <label>Título do Slide</label>
                        <input type="text" class="campo-form" value="Novo Slide">
                    </div>
                    <div class="grupo-form">
                        <label>Botão</label>
                        <input type="text" class="campo-form" value="Saiba mais">
                    </div>
                </div>
                <div class="grupo-form">
                    <label>Imagem de Fundo</label>
                    <div class="area-upload" onclick="this.nextElementSibling.click()">
                        <i class="fas fa-cloud-upload-alt"></i>
                        <p>Clique para fazer upload</p>
                    </div>
                    <input type="file" accept="image/*" style="display: none;">
                </div>
                <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            lista.appendChild(novoItem);
        }

        function adicionarCursoDestaque() {
            const lista = document.getElementById('listaCursosDestaque');
            if (!lista) return;
            const novoItem = document.createElement('div');
            novoItem.className = 'item-dinamico';
            novoItem.innerHTML = `
                <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                <div class="linha-form">
                    <div class="grupo-form">
                        <label>Nome do Curso</label>
                        <input type="text" class="campo-form" value="Novo Curso">
                    </div>
                    <div class="grupo-form">
                        <label>Link</label>
                        <input type="text" class="campo-form" value="novo-curso.html">
                    </div>
                </div>
                <div class="linha-form">
                    <div class="grupo-form">
                        <label>Ícone</label>
                        <input type="text" class="campo-form" value="fa-graduation-cap">
                    </div>
                    <div class="grupo-form">
                        <label>Cor</label>
                        <input type="color" class="campo-form" value="#003072">
                    </div>
                </div>
                <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            lista.appendChild(novoItem);
        }

        function adicionarParceiro() {
            const lista = document.getElementById('listaParceiros');
            if (!lista) return;
            const novoItem = document.createElement('div');
            novoItem.className = 'item-dinamico';
            novoItem.innerHTML = `
                <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                <div class="linha-form">
                    <div class="grupo-form">
                        <label>Nome do Parceiro</label>
                        <input type="text" class="campo-form" value="Novo Parceiro">
                    </div>
                    <div class="grupo-form">
                        <label>Logótipo</label>
                        <div class="area-upload" onclick="this.nextElementSibling.click()">
                            <i class="fas fa-cloud-upload-alt"></i>
                            <p>Clique para fazer upload</p>
                        </div>
                        <input type="file" accept="image/*" style="display: none;">
                    </div>
                </div>
                <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            lista.appendChild(novoItem);
        }

        function adicionarFormacao() {
            const lista = document.getElementById('listaFormacoes');
            if (!lista) return;
            const novoItem = document.createElement('div');
            novoItem.className = 'item-dinamico';
            novoItem.innerHTML = `
                <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                <div class="grupo-form">
                    <input type="text" class="campo-form" value="Nova Formação" placeholder="Título">
                </div>
                <div class="linha-form">
                    <div class="grupo-form">
                        <input type="text" class="campo-form" placeholder="Instituição">
                    </div>
                    <div class="grupo-form">
                        <input type="text" class="campo-form" placeholder="Período">
                    </div>
                </div>
                <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            lista.appendChild(novoItem);
        }

        function adicionarExperiencia() {
            const lista = document.getElementById('listaExperiencias');
            if (!lista) return;
            const novoItem = document.createElement('div');
            novoItem.className = 'item-dinamico';
            novoItem.innerHTML = `
                <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                <div class="linha-form">
                    <div class="grupo-form">
                        <input type="text" class="campo-form" placeholder="Período">
                    </div>
                    <div class="grupo-form">
                        <input type="text" class="campo-form" placeholder="Cargo">
                    </div>
                </div>
                <div class="grupo-form">
                    <input type="text" class="campo-form" placeholder="Local">
                </div>
                <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            lista.appendChild(novoItem);
        }

        function adicionarRealizacao() {
            const lista = document.getElementById('listaRealizacoes');
            if (!lista) return;
            const novoItem = document.createElement('div');
            novoItem.className = 'item-dinamico';
            novoItem.innerHTML = `
                <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                <div class="grupo-form">
                    <textarea class="area-texto" rows="2" placeholder="Nova realização"></textarea>
                </div>
                <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            lista.appendChild(novoItem);
        }

        function adicionarMembroDirecao() {
            const lista = document.getElementById('listaDirecao');
            if (!lista) return;
            const novoItem = document.createElement('div');
            novoItem.className = 'item-dinamico';
            novoItem.innerHTML = `
                <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                <div class="linha-form">
                    <div class="grupo-form">
                        <label>Nome</label>
                        <input type="text" class="campo-form" value="Novo Membro">
                    </div>
                    <div class="grupo-form">
                        <label>Cargo</label>
                        <input type="text" class="campo-form" value="Cargo">
                    </div>
                </div>
                <div class="grupo-form">
                    <label>Foto</label>
                    <div class="area-upload" onclick="this.nextElementSibling.click()">
                        <i class="fas fa-cloud-upload-alt"></i>
                        <p>Clique para fazer upload</p>
                    </div>
                    <input type="file" accept="image/*" style="display: none;">
                </div>
                <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            lista.appendChild(novoItem);
        }

        function adicionarCoordenadorCurso() {
            const lista = document.getElementById('listaCoordenadoresCurso');
            if (!lista) return;
            const novoItem = document.createElement('div');
            novoItem.className = 'item-dinamico';
            novoItem.innerHTML = `
                <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                <div class="linha-form">
                    <div class="grupo-form">
                        <label>Nome</label>
                        <input type="text" class="campo-form" value="Novo Coordenador">
                    </div>
                    <div class="grupo-form">
                        <label>Cargo</label>
                        <input type="text" class="campo-form" value="Coordenador de Curso">
                    </div>
                </div>
                <div class="grupo-form">
                    <label>Foto</label>
                    <div class="area-upload" onclick="this.nextElementSibling.click()">
                        <i class="fas fa-cloud-upload-alt"></i>
                        <p>Clique para fazer upload</p>
                    </div>
                    <input type="file" accept="image/*" style="display: none;">
                </div>
                <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            lista.appendChild(novoItem);
        }

        function adicionarCoordenadorDisciplina() {
            const lista = document.getElementById('listaCoordenadoresDisciplina');
            if (!lista) return;
            const novoItem = document.createElement('div');
            novoItem.className = 'item-dinamico';
            novoItem.innerHTML = `
                <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                <div class="linha-form">
                    <div class="grupo-form">
                        <label>Nome</label>
                        <input type="text" class="campo-form" value="Novo Coordenador">
                    </div>
                    <div class="grupo-form">
                        <label>Disciplina</label>
                        <input type="text" class="campo-form" value="Disciplina">
                    </div>
                </div>
                <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            lista.appendChild(novoItem);
        }

        function adicionarChefeArea() {
            const lista = document.getElementById('listaChefes');
            if (!lista) return;
            const novoItem = document.createElement('div');
            novoItem.className = 'item-dinamico';
            novoItem.innerHTML = `
                <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                <div class="linha-form">
                    <div class="grupo-form">
                        <label>Nome</label>
                        <input type="text" class="campo-form" value="Novo Chefe">
                    </div>
                    <div class="grupo-form">
                        <label>Área</label>
                        <input type="text" class="campo-form" value="Área">
                    </div>
                </div>
                <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            lista.appendChild(novoItem);
        }

        function adicionarExDirector() {
            const lista = document.getElementById('listaExDirectores');
            if (!lista) return;
            const novoItem = document.createElement('div');
            novoItem.className = 'item-dinamico';
            novoItem.innerHTML = `
                <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                <div class="linha-form">
                    <div class="grupo-form">
                        <label>Nome</label>
                        <input type="text" class="campo-form" value="Novo Ex-Director">
                    </div>
                    <div class="grupo-form">
                        <label>Período</label>
                        <input type="text" class="campo-form" value="2020-2024">
                    </div>
                </div>
                <div class="grupo-form">
                    <label>Foto</label>
                    <div class="area-upload" onclick="this.nextElementSibling.click()">
                        <i class="fas fa-cloud-upload-alt"></i>
                        <p>Clique para fazer upload</p>
                    </div>
                    <input type="file" accept="image/*" style="display: none;">
                </div>
                <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            lista.appendChild(novoItem);
        }

        function adicionarDocumentoNormativo() {
            const lista = document.getElementById('listaNormativos');
            if (!lista) return;
            const novoId = Date.now();
            const novoItem = document.createElement('div');
            novoItem.className = 'item-dinamico';
            novoItem.dataset.id = novoId;
            novoItem.innerHTML = `
                <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                <div class="linha-form">
                    <div class="grupo-form">
                        <label>Título</label>
                        <input type="text" class="campo-form" value="Novo Documento">
                    </div>
                    <div class="grupo-form">
                        <label>Arquivo PDF</label>
                        <div class="area-upload" onclick="this.nextElementSibling.click()">
                            <i class="fas fa-file-pdf"></i>
                            <p>Clique para fazer upload</p>
                        </div>
                        <input type="file" accept=".pdf" style="display: none;">
                    </div>
                </div>
                <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            lista.appendChild(novoItem);
        }

        function adicionarHistoria() {
            const lista = document.getElementById('listaHistorias');
            if (!lista) return;
            const novoId = Date.now();
            const novoItem = document.createElement('div');
            novoItem.className = 'item-dinamico';
            novoItem.dataset.id = novoId;
            novoItem.innerHTML = `
                <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                <div class="linha-form">
                    <div class="grupo-form">
                        <label>Nome</label>
                        <input type="text" class="campo-form" value="Novo Aluno">
                    </div>
                    <div class="grupo-form">
                        <label>Curso</label>
                        <input type="text" class="campo-form" value="Curso">
                    </div>
                </div>
                <div class="linha-form">
                    <div class="grupo-form">
                        <label>Ano de Conclusão</label>
                        <input type="text" class="campo-form" value="2024">
                    </div>
                    <div class="grupo-form">
                        <label>Foto</label>
                        <div class="area-upload" onclick="this.nextElementSibling.click()">
                            <i class="fas fa-cloud-upload-alt"></i>
                            <p>Clique para fazer upload</p>
                        </div>
                        <input type="file" accept="image/*" style="display: none;">
                    </div>
                </div>
                <div class="grupo-form">
                    <label>Percurso Profissional</label>
                    <textarea class="area-texto" rows="3"></textarea>
                </div>
                <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            lista.appendChild(novoItem);
        }

        function adicionarMelhorClasse() {
            const lista = document.getElementById('listaMelhoresClasse');
            if (!lista) return;
            const novoId = Date.now();
            const novoItem = document.createElement('div');
            novoItem.className = 'item-dinamico';
            novoItem.dataset.id = novoId;
            novoItem.innerHTML = `
                <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                <div class="linha-form">
                    <div class="grupo-form">
                        <label>Classe</label>
                        <input type="text" class="campo-form" value="Nova Classe">
                    </div>
                    <div class="grupo-form">
                        <label>Nome</label>
                        <input type="text" class="campo-form" value="Nome do Aluno">
                    </div>
                </div>
                <div class="linha-form">
                    <div class="grupo-form">
                        <label>Média</label>
                        <input type="text" class="campo-form" value="16 Valores">
                    </div>
                    <div class="grupo-form">
                        <label>Curso</label>
                        <input type="text" class="campo-form" value="Curso">
                    </div>
                </div>
                <div class="grupo-form">
                    <label>Foto</label>
                    <div class="area-upload" onclick="this.nextElementSibling.click()">
                        <i class="fas fa-cloud-upload-alt"></i>
                        <p>Clique para fazer upload</p>
                    </div>
                    <input type="file" accept="image/*" style="display: none;">
                </div>
                <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            lista.appendChild(novoItem);
        }

        function adicionarFuncionarioLinha1() {
            const lista = document.getElementById('funcionariosLinha1');
            if (!lista) return;
            const novoId = Date.now();
            const novoItem = document.createElement('div');
            novoItem.className = 'item-dinamico';
            novoItem.dataset.id = novoId;
            novoItem.innerHTML = `
                <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                <div class="linha-form">
                    <div class="grupo-form">
                        <label>Nome</label>
                        <input type="text" class="campo-form" value="Novo Funcionário">
                    </div>
                    <div class="grupo-form">
                        <label>Cargo</label>
                        <input type="text" class="campo-form" value="Cargo">
                    </div>
                </div>
                <div class="grupo-form">
                    <label>Foto</label>
                    <div class="area-upload" onclick="this.nextElementSibling.click()">
                        <i class="fas fa-cloud-upload-alt"></i>
                        <p>Clique para fazer upload</p>
                    </div>
                    <input type="file" accept="image/*" style="display: none;">
                </div>
                <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            lista.appendChild(novoItem);
        }

        function adicionarFuncionarioLinha2() {
            const lista = document.getElementById('funcionariosLinha2');
            if (!lista) return;
            const novoId = Date.now();
            const novoItem = document.createElement('div');
            novoItem.className = 'item-dinamico';
            novoItem.dataset.id = novoId;
            novoItem.innerHTML = `
                <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                <div class="linha-form">
                    <div class="grupo-form">
                        <label>Nome</label>
                        <input type="text" class="campo-form" value="Novo Funcionário">
                    </div>
                    <div class="grupo-form">
                        <label>Cargo</label>
                        <input type="text" class="campo-form" value="Cargo">
                    </div>
                </div>
                <div class="grupo-form">
                    <label>Foto</label>
                    <div class="area-upload" onclick="this.nextElementSibling.click()">
                        <i class="fas fa-cloud-upload-alt"></i>
                        <p>Clique para fazer upload</p>
                    </div>
                    <input type="file" accept="image/*" style="display: none;">
                </div>
                <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            lista.appendChild(novoItem);
        }
        // ============================================
// FUNÇÃO PARA RENDERIZAR A PÁGINA DE GALERIA NO EDITOR (VERSÃO ESTILIZADA)
// ============================================

function renderPaginaGaleria() {
    // Dados padrão da galeria
    const galeriaItens = [
        { id: 1, tipo: 'imagem', categoria: 'fotos-gerais', legenda: 'Sala de Aula – IPIKK', url: 'https://picsum.photos/id/20/1200/800', ordem: 1 },
        { id: 2, tipo: 'imagem', categoria: 'fotos-gerais', legenda: 'Vista do Instituto', url: 'https://picsum.photos/id/104/1200/800', ordem: 2 },
        { id: 3, tipo: 'video', categoria: 'fotos-gerais', legenda: 'Tour pelo Instituto', url: 'https://www.w3schools.com/html/mov_bbb.mp4', ordem: 3 }
    ];

    return `
        <div class="editor-pagina" data-pagina="galeria" style="animation: fadeInUp 0.5s ease;">
            
            <!-- CABEÇALHO COM GRADIENTE -->
            <div style="background: linear-gradient(135deg, #003072 0%, #0a9396 100%); border-radius: 16px; padding: 30px; margin-bottom: 30px; color: white;">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
                    <div>
                        <h2 style="color: white; margin: 0 0 8px 0; font-size: 28px;">
                            <i class="fas fa-images" style="margin-right: 12px;"></i> Galeria de Mídias
                        </h2>
                        <p style="margin: 0; opacity: 0.9;">Gerencie todas as fotos e vídeos do site</p>
                    </div>
                    <button class="btn-adicionar-grande" onclick="adicionarItemGaleriaEditor()" style="background: rgba(255,255,255,0.2); border: 2px solid rgba(255,255,255,0.3); color: white; padding: 12px 28px; border-radius: 50px; font-weight: 600; cursor: pointer; transition: all 0.3s;">
                        <i class="fas fa-plus"></i> Nova Mídia
                    </button>
                </div>
            </div>

            <!-- ESTATÍSTICAS MODERNAS -->
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 30px;">
                <div class="card-estatistica" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 20px; padding: 25px; color: white; text-align: center;">
                    <i class="fas fa-images" style="font-size: 40px; margin-bottom: 12px; display: block;"></i>
                    <div style="font-size: 32px; font-weight: 700;" id="estatisticaTotalGaleria">0</div>
                    <div style="font-size: 14px; opacity: 0.9;">Total de Mídias</div>
                </div>
                <div class="card-estatistica" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border-radius: 20px; padding: 25px; color: white; text-align: center;">
                    <i class="fas fa-image" style="font-size: 40px; margin-bottom: 12px; display: block;"></i>
                    <div style="font-size: 32px; font-weight: 700;" id="estatisticaImagensGaleria">0</div>
                    <div style="font-size: 14px; opacity: 0.9;">Imagens</div>
                </div>
                <div class="card-estatistica" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); border-radius: 20px; padding: 25px; color: white; text-align: center;">
                    <i class="fas fa-video" style="font-size: 40px; margin-bottom: 12px; display: block;"></i>
                    <div style="font-size: 32px; font-weight: 700;" id="estatisticaVideosGaleria">0</div>
                    <div style="font-size: 14px; opacity: 0.9;">Vídeos</div>
                </div>
                <div class="card-estatistica" style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); border-radius: 20px; padding: 25px; color: white; text-align: center;">
                    <i class="fas fa-tags" style="font-size: 40px; margin-bottom: 12px; display: block;"></i>
                    <div style="font-size: 32px; font-weight: 700;" id="estatisticaCategoriasGaleria">8</div>
                    <div style="font-size: 14px; opacity: 0.9;">Categorias</div>
                </div>
            </div>

            <!-- FILTRO MODERNO COM ABAS -->
            <div style="margin-bottom: 30px;">
                <div style="display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 20px; border-bottom: 2px solid #e0e4e8; padding-bottom: 15px;">
                    <button class="filtro-categoria ativo" data-categoria="todos" onclick="filtrarGaleriaCategoria('todos', this)" style="background: #0a9396; color: white; border: none; padding: 10px 24px; border-radius: 40px; font-weight: 600; cursor: pointer; transition: all 0.3s;">
                        <i class="fas fa-th-large"></i> Todas
                    </button>
                    <button class="filtro-categoria" data-categoria="fotos-gerais" onclick="filtrarGaleriaCategoria('fotos-gerais', this)" style="background: #f0f0f0; border: none; padding: 10px 24px; border-radius: 40px; font-weight: 500; cursor: pointer; transition: all 0.3s;">
                        <i class="fas fa-camera"></i> 📸 Fotos Gerais
                    </button>
                    <button class="filtro-categoria" data-categoria="tecnico-obras" onclick="filtrarGaleriaCategoria('tecnico-obras', this)" style="background: #f0f0f0; border: none; padding: 10px 24px; border-radius: 40px; font-weight: 500; cursor: pointer; transition: all 0.3s;">
                        <i class="fas fa-hard-hat"></i> 🏗️ Técnico de Obras
                    </button>
                    <button class="filtro-categoria" data-categoria="desenhador-projectista" onclick="filtrarGaleriaCategoria('desenhador-projectista', this)" style="background: #f0f0f0; border: none; padding: 10px 24px; border-radius: 40px; font-weight: 500; cursor: pointer; transition: all 0.3s;">
                        <i class="fas fa-drafting-compass"></i> ✏️ Desenhador Projectista
                    </button>
                    <button class="filtro-categoria" data-categoria="energia-instalacoes" onclick="filtrarGaleriaCategoria('energia-instalacoes', this)" style="background: #f0f0f0; border: none; padding: 10px 24px; border-radius: 40px; font-weight: 500; cursor: pointer; transition: all 0.3s;">
                        <i class="fas fa-bolt"></i> ⚡ Energia e Instalações
                    </button>
                    <button class="filtro-categoria" data-categoria="frio-climatizacao" onclick="filtrarGaleriaCategoria('frio-climatizacao', this)" style="background: #f0f0f0; border: none; padding: 10px 24px; border-radius: 40px; font-weight: 500; cursor: pointer; transition: all 0.3s;">
                        <i class="fas fa-snowflake"></i> ❄️ Frio e Climatização
                    </button>
                    <button class="filtro-categoria" data-categoria="gestao-sistemas" onclick="filtrarGaleriaCategoria('gestao-sistemas', this)" style="background: #f0f0f0; border: none; padding: 10px 24px; border-radius: 40px; font-weight: 500; cursor: pointer; transition: all 0.3s;">
                        <i class="fas fa-network-wired"></i> 💻 Gestão de Sistemas
                    </button>
                    <button class="filtro-categoria" data-categoria="tecnico-informatica" onclick="filtrarGaleriaCategoria('tecnico-informatica', this)" style="background: #f0f0f0; border: none; padding: 10px 24px; border-radius: 40px; font-weight: 500; cursor: pointer; transition: all 0.3s;">
                        <i class="fas fa-laptop-code"></i> 🖥️ Técnico de Informática
                    </button>
                    <button class="filtro-categoria" data-categoria="tecnologias-moveis" onclick="filtrarGaleriaCategoria('tecnologias-moveis', this)" style="background: #f0f0f0; border: none; padding: 10px 24px; border-radius: 40px; font-weight: 500; cursor: pointer; transition: all 0.3s;">
                        <i class="fas fa-chair"></i> 🪑 Tecnologias de Móveis
                    </button>
                </div>
            </div>

            <!-- LISTA DE ITENS DA GALERIA (GRADE MODERNA) -->
            <div id="listaGaleriaEditor" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); gap: 25px; margin-bottom: 30px;">
                <!-- Itens serão carregados dinamicamente -->
                <div style="grid-column: 1 / -1; text-align: center; padding: 60px; background: #f8f9fa; border-radius: 20px;">
                    <i class="fas fa-spinner fa-spin" style="font-size: 48px; color: #0a9396;"></i>
                    <p style="margin-top: 15px; color: #666;">Carregando galeria...</p>
                </div>
            </div>

            <!-- BOTÕES DE AÇÃO -->
            <div style="display: flex; justify-content: flex-end; gap: 15px; padding-top: 30px; border-top: 2px solid #e0e4e8; margin-top: 20px;">
                <button class="btn-secundario-estilizado" onclick="ordenarGaleriaEditor()" style="background: #f0f0f0; border: none; padding: 12px 28px; border-radius: 50px; font-weight: 600; cursor: pointer; transition: all 0.3s;">
                    <i class="fas fa-sort-amount-down"></i> Reordenar
                </button>
                <button class="btn-secundario-estilizado" onclick="resetarGaleriaEditor()" style="background: #f0f0f0; border: none; padding: 12px 28px; border-radius: 50px; font-weight: 600; cursor: pointer; transition: all 0.3s;">
                    <i class="fas fa-undo"></i> Restaurar Padrões
                </button>
                <button class="btn-primario-estilizado" onclick="guardarGaleriaEditor()" style="background: linear-gradient(135deg, #0a9396, #003072); border: none; padding: 12px 32px; border-radius: 50px; font-weight: 600; color: white; cursor: pointer; transition: all 0.3s;">
                    <i class="fas fa-save"></i> Guardar Galeria
                </button>
            </div>

            <!-- DICA ESTILIZADA -->
            <div style="margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #e8f4fd, #f0f9ff); border-radius: 16px; border-left: 4px solid #0a9396;">
                <div style="display: flex; gap: 15px; align-items: flex-start;">
                    <i class="fas fa-lightbulb" style="font-size: 28px; color: #0a9396;"></i>
                    <div>
                        <strong style="color: #003072; font-size: 16px;">💡 Dicas Profissionais</strong>
                        <p style="margin: 5px 0 0 0; color: #555; font-size: 13px;">
                            • Para melhores resultados, utilize imagens com resolução mínima de 1200x800px.<br>
                            • Vídeos em MP4 são recomendados para melhor compatibilidade.<br>
                            • Arraste os itens para reorganizar a ordem de exibição.<br>
                            • As alterações são salvas automaticamente ao clicar em "Guardar Galeria".
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ============================================
// FUNÇÕES AUXILIARES PARA O EDITOR DE GALERIA (VERSÃO ESTILIZADA)
// ============================================

let galeriaItensEditor = [];
let categoriaAtualGaleria = 'todos';

function carregarGaleriaEditor() {
    const salvo = localStorage.getItem('galeriaItens');
    if (salvo) {
        try {
            galeriaItensEditor = JSON.parse(salvo);
        } catch(e) {
            galeriaItensEditor = [];
        }
    }
    
    if (galeriaItensEditor.length === 0) {
        // Dados padrão completos e bonitos
        galeriaItensEditor = [
            { id: 1, tipo: 'imagem', categoria: 'fotos-gerais', legenda: 'Sala de Aula Moderna', url: 'https://picsum.photos/id/20/1200/800', ordem: 1 },
            { id: 2, tipo: 'imagem', categoria: 'fotos-gerais', legenda: 'Vista Aérea do Campus', url: 'https://picsum.photos/id/104/1200/800', ordem: 2 },
            { id: 3, tipo: 'video', categoria: 'fotos-gerais', legenda: 'Tour Virtual pelo Instituto', url: 'https://www.w3schools.com/html/mov_bbb.mp4', ordem: 3 },
            { id: 4, tipo: 'imagem', categoria: 'tecnico-obras', legenda: 'Aula Prática de Topografia', url: 'https://picsum.photos/id/15/1200/800', ordem: 4 },
            { id: 5, tipo: 'imagem', categoria: 'tecnico-obras', legenda: 'Obra dos Alunos', url: 'https://picsum.photos/id/1/1200/800', ordem: 5 },
            { id: 6, tipo: 'video', categoria: 'tecnico-obras', legenda: 'Técnicas de Construção', url: 'https://www.w3schools.com/html/mov_bbb.mp4', ordem: 6 },
            { id: 7, tipo: 'imagem', categoria: 'desenhador-projectista', legenda: 'Laboratório de Desenho', url: 'https://picsum.photos/id/108/1200/800', ordem: 7 },
            { id: 8, tipo: 'video', categoria: 'desenhador-projectista', legenda: 'Software AutoCAD na Prática', url: 'https://www.w3schools.com/html/mov_bbb.mp4', ordem: 8 },
            { id: 9, tipo: 'imagem', categoria: 'energia-instalacoes', legenda: 'Painéis Solares', url: 'https://picsum.photos/id/122/1200/800', ordem: 9 },
            { id: 10, tipo: 'video', categoria: 'energia-instalacoes', legenda: 'Instalação Elétrica Residencial', url: 'https://www.w3schools.com/html/mov_bbb.mp4', ordem: 10 }
        ];
    }
    
    atualizarListaGaleriaEditor();
    atualizarEstatisticasGaleria();
}

function atualizarListaGaleriaEditor() {
    const container = document.getElementById('listaGaleriaEditor');
    if (!container) return;
    
    let itensFiltrados = [...galeriaItensEditor];
    if (categoriaAtualGaleria !== 'todos') {
        itensFiltrados = itensFiltrados.filter(item => item.categoria === categoriaAtualGaleria);
    }
    
    itensFiltrados.sort((a, b) => a.ordem - b.ordem);
    
    if (itensFiltrados.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px; background: linear-gradient(135deg, #f8f9fa, #fff); border-radius: 24px; border: 2px dashed #dee2e6;">
                <i class="fas fa-images" style="font-size: 64px; color: #adb5bd; margin-bottom: 20px; display: block;"></i>
                <h3 style="color: #495057; margin-bottom: 10px;">Nenhuma mídia encontrada</h3>
                <p style="color: #6c757d; margin-bottom: 20px;">Clique no botão "Nova Mídia" para adicionar fotos ou vídeos à galeria.</p>
                <button class="btn-adicionar-grande" onclick="adicionarItemGaleriaEditor()" style="background: linear-gradient(135deg, #0a9396, #003072); color: white; border: none; padding: 12px 28px; border-radius: 50px; font-weight: 600; cursor: pointer;">
                    <i class="fas fa-plus"></i> Adicionar Primeira Mídia
                </button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = itensFiltrados.map(item => `
        <div class="item-galeria-card" data-id="${item.id}" style="background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.08); transition: all 0.3s; position: relative; border: 1px solid rgba(0,0,0,0.05);">
            <!-- Barra de arrasto -->
            <div class="alca-arrasto" style="position: absolute; top: 15px; left: 15px; background: rgba(0,0,0,0.6); width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; cursor: grab; z-index: 10; backdrop-filter: blur(4px);">
                <i class="fas fa-grip-vertical"></i>
            </div>
            
            <!-- Pré-visualização da mídia -->
            <div style="height: 200px; background: #f0f0f0; position: relative; overflow: hidden;">
                ${item.tipo === 'imagem' 
                    ? `<img src="${item.url}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s;" onerror="this.src='https://via.placeholder.com/400x200?text=Erro+Imagem'">`
                    : `<div style="width: 100%; height: 100%; background: linear-gradient(135deg, #1a1a2e, #16213e); display: flex; align-items: center; justify-content: center; flex-direction: column;">
                        <i class="fas fa-video" style="font-size: 48px; color: #0a9396;"></i>
                        <span style="color: #888; font-size: 12px; margin-top: 8px;">Vídeo</span>
                       </div>`
                }
                <div class="badge-tipo" style="position: absolute; top: 15px; right: 15px; background: rgba(0,0,0,0.7); padding: 6px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; color: white; backdrop-filter: blur(4px);">
                    ${item.tipo === 'imagem' ? '<i class="fas fa-image"></i> Imagem' : '<i class="fas fa-play"></i> Vídeo'}
                </div>
            </div>
            
            <!-- Conteúdo do card -->
            <div style="padding: 20px;">
                <div style="margin-bottom: 15px;">
                    <label style="display: block; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #0a9396; margin-bottom: 6px;">LEGENDA</label>
                    <input type="text" class="campo-form" value="${item.legenda.replace(/"/g, '&quot;')}" id="galeria_legenda_${item.id}" style="width: 100%; padding: 10px; border: 2px solid #e0e4e8; border-radius: 12px; font-size: 14px;">
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 15px;">
                    <div>
                        <label style="display: block; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #0a9396; margin-bottom: 6px;">CATEGORIA</label>
                        <select class="selecao-form" id="galeria_categoria_${item.id}" style="width: 100%; padding: 10px; border: 2px solid #e0e4e8; border-radius: 12px;">
                            <option value="fotos-gerais" ${item.categoria === 'fotos-gerais' ? 'selected' : ''}>📸 Fotos Gerais</option>
                            <option value="tecnico-obras" ${item.categoria === 'tecnico-obras' ? 'selected' : ''}>🏗️ Técnico de Obras</option>
                            <option value="desenhador-projectista" ${item.categoria === 'desenhador-projectista' ? 'selected' : ''}>✏️ Desenhador Projectista</option>
                            <option value="energia-instalacoes" ${item.categoria === 'energia-instalacoes' ? 'selected' : ''}>⚡ Energia e Instalações</option>
                            <option value="frio-climatizacao" ${item.categoria === 'frio-climatizacao' ? 'selected' : ''}>❄️ Frio e Climatização</option>
                            <option value="gestao-sistemas" ${item.categoria === 'gestao-sistemas' ? 'selected' : ''}>💻 Gestão de Sistemas</option>
                            <option value="tecnico-informatica" ${item.categoria === 'tecnico-informatica' ? 'selected' : ''}>🖥️ Técnico de Informática</option>
                            <option value="tecnologias-moveis" ${item.categoria === 'tecnologias-moveis' ? 'selected' : ''}>🪑 Tecnologias de Móveis</option>
                        </select>
                    </div>
                    <div>
                        <label style="display: block; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #0a9396; margin-bottom: 6px;">TIPO</label>
                        <select class="selecao-form" id="galeria_tipo_${item.id}" onchange="alterarTipoGaleriaEditor(${item.id})" style="width: 100%; padding: 10px; border: 2px solid #e0e4e8; border-radius: 12px;">
                            <option value="imagem" ${item.tipo === 'imagem' ? 'selected' : ''}>🖼️ Imagem</option>
                            <option value="video" ${item.tipo === 'video' ? 'selected' : ''}>🎬 Vídeo</option>
                        </select>
                    </div>
                </div>
                
                <div style="margin-bottom: 15px;">
                    <label style="display: block; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #0a9396; margin-bottom: 6px;">URL DA MÍDIA</label>
                    <input type="text" class="campo-form" value="${item.url}" id="galeria_url_${item.id}" style="width: 100%; padding: 10px; border: 2px solid #e0e4e8; border-radius: 12px; font-size: 13px; font-family: monospace;">
                </div>
                
                <div style="margin-bottom: 20px;">
                    <label style="display: block; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #0a9396; margin-bottom: 6px;">ORDEM DE EXIBIÇÃO</label>
                    <input type="number" class="campo-form" value="${item.ordem}" id="galeria_ordem_${item.id}" min="1" max="999" style="width: 100%; padding: 10px; border: 2px solid #e0e4e8; border-radius: 12px;">
                </div>
                
                <div style="display: flex; gap: 12px;">
                    <button class="btn-preview-card" onclick="previewItemGaleriaEditor(${item.id})" style="flex: 1; background: #f0f0f0; border: none; padding: 10px; border-radius: 12px; font-weight: 600; cursor: pointer; transition: all 0.3s;">
                        <i class="fas fa-eye"></i> Pré-visualizar
                    </button>
                    <button class="btn-remover-card" onclick="eliminarItemGaleriaEditor(${item.id})" style="background: #fee; border: none; padding: 10px; border-radius: 12px; color: #dc3545; font-weight: 600; cursor: pointer; transition: all 0.3s;">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Adicionar efeito hover aos cards
    setTimeout(() => {
        document.querySelectorAll('.item-galeria-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
                card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
            });
        });
    }, 50);
}

function filtrarGaleriaCategoria(categoria, elemento) {
    categoriaAtualGaleria = categoria;
    
    // Atualizar estilo dos botões
    document.querySelectorAll('.filtro-categoria').forEach(btn => {
        btn.style.background = '#f0f0f0';
        btn.style.color = '#333';
        btn.classList.remove('ativo');
    });
    elemento.style.background = '#0a9396';
    elemento.style.color = 'white';
    elemento.classList.add('ativo');
    
    atualizarListaGaleriaEditor();
}

function atualizarEstatisticasGaleria() {
    const total = galeriaItensEditor.length;
    const imagens = galeriaItensEditor.filter(i => i.tipo === 'imagem').length;
    const videos = galeriaItensEditor.filter(i => i.tipo === 'video').length;
    
    const totalEl = document.getElementById('estatisticaTotalGaleria');
    const imagensEl = document.getElementById('estatisticaImagensGaleria');
    const videosEl = document.getElementById('estatisticaVideosGaleria');
    
    if (totalEl) totalEl.textContent = total;
    if (imagensEl) imagensEl.textContent = imagens;
    if (videosEl) videosEl.textContent = videos;
}

function adicionarItemGaleriaEditor() {
    const novoId = Date.now();
    const novaOrdem = galeriaItensEditor.length + 1;
    
    const novoItem = {
        id: novoId,
        tipo: 'imagem',
        categoria: categoriaAtualGaleria === 'todos' ? 'fotos-gerais' : categoriaAtualGaleria,
        legenda: 'Nova Mídia',
        url: 'https://picsum.photos/id/100/1200/800',
        ordem: novaOrdem
    };
    
    galeriaItensEditor.push(novoItem);
    atualizarListaGaleriaEditor();
    atualizarEstatisticasGaleria();
    
    mostrarNotificacao('✨ Nova mídia adicionada!', 'sucesso');
    
    // Rolar para o novo item
    setTimeout(() => {
        const novoElemento = document.querySelector(`.item-galeria-card[data-id="${novoId}"]`);
        if (novoElemento) {
            novoElemento.scrollIntoView({ behavior: 'smooth', block: 'center' });
            novoElemento.style.border = '2px solid #0a9396';
            novoElemento.style.transform = 'scale(1.02)';
            setTimeout(() => {
                novoElemento.style.border = '';
                novoElemento.style.transform = '';
            }, 2000);
        }
    }, 100);
}

function eliminarItemGaleriaEditor(id) {
    if (confirm('⚠️ Tem certeza que deseja eliminar este item da galeria? Esta ação não pode ser desfeita.')) {
        galeriaItensEditor = galeriaItensEditor.filter(item => item.id !== id);
        // Reordenar os itens restantes
        galeriaItensEditor.forEach((item, index) => {
            item.ordem = index + 1;
        });
        atualizarListaGaleriaEditor();
        atualizarEstatisticasGaleria();
        mostrarNotificacao('🗑️ Item eliminado com sucesso!', 'sucesso');
    }
}

function alterarTipoGaleriaEditor(id) {
    const selectTipo = document.getElementById(`galeria_tipo_${id}`);
    const item = galeriaItensEditor.find(i => i.id === id);
    if (item && selectTipo) {
        item.tipo = selectTipo.value;
        atualizarListaGaleriaEditor();
        mostrarNotificacao(`🔄 Tipo alterado para ${item.tipo === 'imagem' ? 'Imagem' : 'Vídeo'}`, 'info');
    }
}

function previewItemGaleriaEditor(id) {
    const item = galeriaItensEditor.find(i => i.id === id);
    if (item) {
        if (item.tipo === 'imagem') {
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.9); z-index: 99999;
                display: flex; align-items: center; justify-content: center;
                cursor: pointer;
            `;
            modal.innerHTML = `
                <img src="${item.url}" style="max-width: 90%; max-height: 90%; object-fit: contain; border-radius: 12px;">
                <div style="position: absolute; bottom: 30px; left: 0; right: 0; text-align: center; color: white; background: rgba(0,0,0,0.7); padding: 12px; margin: 0 auto; width: fit-content; border-radius: 50px;">
                    ${item.legenda}
                </div>
            `;
            modal.onclick = () => modal.remove();
            document.body.appendChild(modal);
        } else {
            const videoWindow = window.open('', '_blank');
            videoWindow.document.write(`
                <html>
                <head><title>🎬 Pré-visualização: ${item.legenda}</title></head>
                <body style="margin:0; background:#000; display:flex; justify-content:center; align-items:center; height:100vh;">
                    <video src="${item.url}" controls autoplay style="max-width:90%; max-height:90%; border-radius: 12px;">
                        <source src="${item.url}" type="video/mp4">
                        Seu navegador não suporta vídeo.
                    </video>
                    <div style="position: fixed; bottom: 20px; left: 0; right: 0; text-align: center; color: white; background: rgba(0,0,0,0.6); padding: 10px; font-size: 14px;">
                        🎬 ${item.legenda}
                    </div>
                </body>
                </html>
            `);
        }
    }
}
//GALERIA
function ordenarGaleriaEditor() {
    // Coletar todas as ordens dos inputs
    galeriaItensEditor.forEach(item => {
        const ordemInput = document.getElementById(`galeria_ordem_${item.id}`);
        if (ordemInput) {
            item.ordem = parseInt(ordemInput.value) || item.ordem;
        }
        
        const legendaInput = document.getElementById(`galeria_legenda_${item.id}`);
        const categoriaSelect = document.getElementById(`galeria_categoria_${item.id}`);
        const urlInput = document.getElementById(`galeria_url_${item.id}`);
        const tipoSelect = document.getElementById(`galeria_tipo_${item.id}`);
        
        if (legendaInput) item.legenda = legendaInput.value;
        if (categoriaSelect) item.categoria = categoriaSelect.value;
        if (urlInput) item.url = urlInput.value;
        if (tipoSelect) item.tipo = tipoSelect.value;
    });
    
    // Ordenar o array
    galeriaItensEditor.sort((a, b) => a.ordem - b.ordem);
    
    // Reordenar os IDs das ordens para manter sequência
    galeriaItensEditor.forEach((item, index) => {
        item.ordem = index + 1;
    });
    
    atualizarListaGaleriaEditor();
    mostrarNotificacao('📋 Galeria reordenada com sucesso!', 'sucesso');
}

function resetarGaleriaEditor() {
    if (confirm('⚠️ ATENÇÃO: Esta ação irá restaurar todos os dados padrão da galeria. Todas as suas alterações serão perdidas. Tem certeza?')) {
        // Dados padrão completos e bonitos
        galeriaItensEditor = [
            { id: 1, tipo: 'imagem', categoria: 'fotos-gerais', legenda: 'Sala de Aula Moderna', url: 'https://picsum.photos/id/20/1200/800', ordem: 1 },
            { id: 2, tipo: 'imagem', categoria: 'fotos-gerais', legenda: 'Vista Aérea do Campus', url: 'https://picsum.photos/id/104/1200/800', ordem: 2 },
            { id: 3, tipo: 'video', categoria: 'fotos-gerais', legenda: 'Tour Virtual pelo Instituto', url: 'https://www.w3schools.com/html/mov_bbb.mp4', ordem: 3 },
            { id: 4, tipo: 'imagem', categoria: 'tecnico-obras', legenda: 'Aula Prática de Topografia', url: 'https://picsum.photos/id/15/1200/800', ordem: 4 },
            { id: 5, tipo: 'imagem', categoria: 'tecnico-obras', legenda: 'Obra dos Alunos', url: 'https://picsum.photos/id/1/1200/800', ordem: 5 },
            { id: 6, tipo: 'video', categoria: 'tecnico-obras', legenda: 'Técnicas de Construção', url: 'https://www.w3schools.com/html/mov_bbb.mp4', ordem: 6 },
            { id: 7, tipo: 'imagem', categoria: 'desenhador-projectista', legenda: 'Laboratório de Desenho', url: 'https://picsum.photos/id/108/1200/800', ordem: 7 },
            { id: 8, tipo: 'video', categoria: 'desenhador-projectista', legenda: 'Software AutoCAD na Prática', url: 'https://www.w3schools.com/html/mov_bbb.mp4', ordem: 8 },
            { id: 9, tipo: 'imagem', categoria: 'energia-instalacoes', legenda: 'Painéis Solares', url: 'https://picsum.photos/id/122/1200/800', ordem: 9 },
            { id: 10, tipo: 'video', categoria: 'energia-instalacoes', legenda: 'Instalação Elétrica Residencial', url: 'https://www.w3schools.com/html/mov_bbb.mp4', ordem: 10 }
        ];
        
        atualizarListaGaleriaEditor();
        atualizarEstatisticasGaleria();
        mostrarNotificacao('🔄 Galeria restaurada para os valores padrão!', 'info');
    }
}

function guardarGaleriaEditor() {
    // Coletar todos os dados atualizados dos inputs
    galeriaItensEditor.forEach(item => {
        const legendaInput = document.getElementById(`galeria_legenda_${item.id}`);
        const categoriaSelect = document.getElementById(`galeria_categoria_${item.id}`);
        const urlInput = document.getElementById(`galeria_url_${item.id}`);
        const tipoSelect = document.getElementById(`galeria_tipo_${item.id}`);
        const ordemInput = document.getElementById(`galeria_ordem_${item.id}`);
        
        if (legendaInput) item.legenda = legendaInput.value;
        if (categoriaSelect) item.categoria = categoriaSelect.value;
        if (urlInput) item.url = urlInput.value;
        if (tipoSelect) item.tipo = tipoSelect.value;
        if (ordemInput) item.ordem = parseInt(ordemInput.value) || item.ordem;
    });
    
    // Salvar no localStorage
    localStorage.setItem('galeriaItens', JSON.stringify(galeriaItensEditor));
    
    mostrarNotificacao('✅ Galeria guardada com sucesso! As alterações já estão visíveis.', 'sucesso');
    
    // Efeito visual de confirmação
    const btnGuardar = document.querySelector('.btn-primario-estilizado');
    if (btnGuardar) {
        const textoOriginal = btnGuardar.innerHTML;
        btnGuardar.innerHTML = '<i class="fas fa-check"></i> Guardado!';
        btnGuardar.style.background = '#28a745';
        setTimeout(() => {
            btnGuardar.innerHTML = textoOriginal;
            btnGuardar.style.background = 'linear-gradient(135deg, #0a9396, #003072)';
        }, 2000);
    }
}
        function adicionarEscola() {
            const lista = document.getElementById('listaEscolas');
            if (!lista) return;
            const novoId = Date.now();
            const novoItem = document.createElement('div');
            novoItem.className = 'item-dinamico';
            novoItem.dataset.id = novoId;
            novoItem.innerHTML = `
                <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                <div class="linha-form">
                    <div class="grupo-form">
                        <label>Nome da Escola</label>
                        <input type="text" class="campo-form" value="Nova Escola">
                    </div>
                    <div class="grupo-form">
                        <label>Tipo</label>
                        <select class="selecao-form">
                            <option value="Privado">Privado</option>
                            <option value="Público">Público</option>
                        </select>
                    </div>
                </div>
                <div class="linha-form">
                    <div class="grupo-form">
                        <label>Email</label>
                        <input type="email" class="campo-form" value="escola@email.com">
                    </div>
                    <div class="grupo-form">
                        <label>Telefone</label>
                        <input type="text" class="campo-form" value="(+244) 000 000 000">
                    </div>
                </div>
                <div class="grupo-form">
                    <label>Endereço</label>
                    <input type="text" class="campo-form" value="Endereço da escola">
                </div>
                <div class="grupo-form">
                    <label>Logótipo</label>
                    <div class="area-upload" onclick="this.nextElementSibling.click()">
                        <i class="fas fa-cloud-upload-alt"></i>
                        <p>Clique para fazer upload</p>
                    </div>
                    <input type="file" accept="image/*" style="display: none;">
                </div>
                <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            lista.appendChild(novoItem);
        }

        function adicionarItemMenu() {
            const lista = document.getElementById('listaItensMenu');
            if (!lista) return;
            const novoItem = document.createElement('div');
            novoItem.className = 'item-dinamico';
            novoItem.innerHTML = `
                <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                <div class="linha-form">
                    <div class="grupo-form">
                        <label>Texto do Menu</label>
                        <input type="text" class="campo-form" value="Novo Item">
                    </div>
                    <div class="grupo-form">
                        <label>Link</label>
                        <input type="text" class="campo-form" value="#">
                    </div>
                </div>
                <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            lista.appendChild(novoItem);
        }

        function adicionarSubmenu() {
            const lista = document.getElementById('listaItensSubmenu');
            if (!lista) return;
            const novoItem = document.createElement('div');
            novoItem.className = 'item-dinamico';
            novoItem.innerHTML = `
                <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                <div class="linha-form">
                    <div class="grupo-form">
                        <label>Item Pai</label>
                        <select class="selecao-form">
                            <option value="2">Oferta Formativa</option>
                            <option value="3">Sobre</option>
                        </select>
                    </div>
                    <div class="grupo-form">
                        <label>Texto do Submenu</label>
                        <input type="text" class="campo-form" value="Novo Submenu">
                    </div>
                </div>
                <div class="linha-form">
                    <div class="grupo-form">
                        <label>Link</label>
                        <input type="text" class="campo-form" value="#">
                    </div>
                    <div class="grupo-form">
                        <label>Cor do Ícone</label>
                        <input type="color" class="campo-form" value="#6c757d">
                    </div>
                </div>
                <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            lista.appendChild(novoItem);
        }

        function adicionarIconeSocial() {
            const lista = document.getElementById('listaIconesSociais');
            if (!lista) return;
            const novoItem = document.createElement('div');
            novoItem.className = 'item-dinamico';
            novoItem.innerHTML = `
                <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                <div class="linha-form">
                    <div class="grupo-form">
                        <label>Rede Social</label>
                        <select class="selecao-form">
                            <option value="facebook">Facebook</option>
                            <option value="instagram">Instagram</option>
                            <option value="linkedin">LinkedIn</option>
                            <option value="twitter">Twitter</option>
                            <option value="youtube">YouTube</option>
                        </select>
                    </div>
                    <div class="grupo-form">
                        <label>URL</label>
                        <input type="url" class="campo-form" value="https://">
                    </div>
                </div>
                <div class="grupo-checkbox">
                    <input type="checkbox" checked>
                    <label>Mostrar no cabeçalho</label>
                </div>
                <div class="grupo-checkbox">
                    <input type="checkbox" checked>
                    <label>Mostrar no rodapé</label>
                </div>
                <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            lista.appendChild(novoItem);
        }

        function adicionarLinkRodape() {
            const lista = document.getElementById('listaLinksRodape');
            if (!lista) return;
            const novoItem = document.createElement('div');
            novoItem.className = 'item-dinamico';
            novoItem.innerHTML = `
                <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                <div class="linha-form">
                    <div class="grupo-form">
                        <label>Texto do Link</label>
                        <input type="text" class="campo-form" value="Novo Link">
                    </div>
                    <div class="grupo-form">
                        <label>Link</label>
                        <input type="text" class="campo-form" value="#">
                    </div>
                </div>
                <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            lista.appendChild(novoItem);
        }

        function adicionarLinkMenuMobile() {
            const lista = document.getElementById('listaMenuMobile');
            if (!lista) return;
            const novoItem = document.createElement('div');
            novoItem.className = 'item-dinamico';
            novoItem.innerHTML = `
                <div class="alca-arrasto"><i class="fas fa-grip-vertical"></i></div>
                <div class="linha-form">
                    <div class="grupo-form">
                        <label>Texto do Link</label>
                        <input type="text" class="campo-form" value="Novo Link">
                    </div>
                    <div class="grupo-form">
                        <label>Link</label>
                        <input type="text" class="campo-form" value="#">
                    </div>
                </div>
                <button class="btn-remover" onclick="this.closest('.item-dinamico').remove()">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            lista.appendChild(novoItem);
        }
        // ============================================
// FUNÇÕES DA ABA MANUTENÇÃO DO SITE
// ============================================

let configManutencao = {
    ativo: false,
    modo: 'manual', // manual ou agendado
    dataInicio: null,
    dataFim: null,
    conteudo: {
        titulo: "Site em Manutenção",
        mensagemPrincipal: "Estamos realizando melhorias para lhe servir melhor.",
        detalhes: [
            "O site estará disponível em breve.",
            "Estamos atualizando nossos sistemas e conteúdos.",
            "Agradecemos pela paciência e compreensão."
        ],
        previsaoRetorno: "em breve"
    },
    contactos: {
        telefone: "+244 933 096 705",
        whatsapp: "+244 933 096 705",
        email: "geral@ipikk.ao"
    }
};

function carregarConfigManutencao() {
    const salvo = localStorage.getItem('configManutencao');
    if (salvo) {
        try {
            configManutencao = JSON.parse(salvo);
        } catch(e) {}
    }
    atualizarInterfaceManutencao();
    
    // Verificar agendamento a cada minuto
    setInterval(() => {
        verificarAgendamentoManutencao();
    }, 60000);
}

function atualizarInterfaceManutencao() {
    // Atualizar status
    const statusDiv = document.getElementById('statusManutencao');
    const contadorDiv = document.getElementById('contadorManutencao');
    
    if (configManutencao.ativo) {
        statusDiv.innerHTML = '<i class="fas fa-tools"></i> EM MANUTENÇÃO - Site indisponível';
        statusDiv.className = 'status-badge status-ativo';
        
        if (configManutencao.modo === 'agendado' && configManutencao.dataFim) {
            const dataFim = new Date(configManutencao.dataFim);
            const agora = new Date();
            if (dataFim > agora) {
                const diff = dataFim - agora;
                const horas = Math.floor(diff / (1000 * 60 * 60));
                const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                contadorDiv.innerHTML = `<i class="fas fa-hourglass-half"></i> Previsão de retorno: ${horas}h ${minutos}min`;
            } else {
                contadorDiv.innerHTML = `<i class="fas fa-clock"></i> Aguardando desativação manual...`;
            }
        } else {
            contadorDiv.innerHTML = `<i class="fas fa-clock"></i> Manutenção ativa manualmente`;
        }
    } else if (configManutencao.modo === 'agendado' && configManutencao.dataInicio && new Date(configManutencao.dataInicio) > new Date()) {
        const dataInicio = new Date(configManutencao.dataInicio);
        const agora = new Date();
        const diff = dataInicio - agora;
        const horas = Math.floor(diff / (1000 * 60 * 60));
        const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        statusDiv.innerHTML = '<i class="fas fa-calendar-alt"></i> MANUTENÇÃO AGENDADA';
        statusDiv.className = 'status-badge status-agendado';
        contadorDiv.innerHTML = `<i class="fas fa-hourglass-start"></i> Início em: ${horas}h ${minutos}min`;
    } else {
        statusDiv.innerHTML = '<i class="fas fa-check-circle"></i> SITE OPERACIONAL';
        statusDiv.className = 'status-badge status-inativo';
        contadorDiv.innerHTML = `<i class="fas fa-globe"></i> Site funcionando normalmente`;
    }
    
    // Atualizar campos do formulário
    document.getElementById('manutencaoTitulo').value = configManutencao.conteudo.titulo;
    document.getElementById('manutencaoMsgPrincipal').value = configManutencao.conteudo.mensagemPrincipal;
    document.getElementById('manutencaoDetalhes').value = configManutencao.conteudo.detalhes.join('\n');
    document.getElementById('manutencaoPrevisao').value = configManutencao.conteudo.previsaoRetorno;
    document.getElementById('manutencaoTelefone').value = configManutencao.contactos.telefone;
    document.getElementById('manutencaoWhatsapp').value = configManutencao.contactos.whatsapp;
    document.getElementById('manutencaoEmail').value = configManutencao.contactos.email;
    
    if (configManutencao.dataInicio) document.getElementById('manutencaoInicio').value = configManutencao.dataInicio;
    if (configManutencao.dataFim) document.getElementById('manutencaoFim').value = configManutencao.dataFim;
}

function ativarManutencao() {
    configManutencao.ativo = true;
    configManutencao.modo = 'manual';
    configManutencao.dataInicio = null;
    configManutencao.dataFim = null;
    guardarConfigManutencao();
    atualizarInterfaceManutencao();
    mostrarNotificacao('Modo de manutenção ATIVADO! O site está indisponível.', 'sucesso');
}

function desativarManutencao() {
    configManutencao.ativo = false;
    configManutencao.modo = 'manual';
    guardarConfigManutencao();
    atualizarInterfaceManutencao();
    mostrarNotificacao('Modo de manutenção DESATIVADO! O site está disponível novamente.', 'sucesso');
}

function agendarManutencao() {
    const dataInicio = document.getElementById('manutencaoInicio').value;
    const dataFim = document.getElementById('manutencaoFim').value;
    
    if (!dataInicio) {
        mostrarNotificacao('Defina a data e hora de início da manutenção.', 'erro');
        return;
    }
    
    const inicio = new Date(dataInicio);
    const agora = new Date();
    
    if (inicio <= agora) {
        // Se a data de início já passou, ativar imediatamente
        configManutencao.ativo = true;
        configManutencao.dataInicio = dataInicio;
        configManutencao.dataFim = dataFim || null;
        configManutencao.modo = 'agendado';
        mostrarNotificacao('Manutenção ativada imediatamente conforme agendamento!', 'sucesso');
    } else {
        configManutencao.ativo = false;
        configManutencao.dataInicio = dataInicio;
        configManutencao.dataFim = dataFim || null;
        configManutencao.modo = 'agendado';
        mostrarNotificacao(`Manutenção agendada para ${inicio.toLocaleString('pt-PT')}`, 'sucesso');
    }
    
    guardarConfigManutencao();
    atualizarInterfaceManutencao();
}

function verificarAgendamentoManutencao() {
    if (configManutencao.modo !== 'agendado') return;
    
    const agora = new Date();
    const dataInicio = configManutencao.dataInicio ? new Date(configManutencao.dataInicio) : null;
    const dataFim = configManutencao.dataFim ? new Date(configManutencao.dataFim) : null;
    
    if (dataInicio && agora >= dataInicio && !configManutencao.ativo) {
        configManutencao.ativo = true;
        guardarConfigManutencao();
        atualizarInterfaceManutencao();
        mostrarNotificacao('🔧 A manutenção agendada foi iniciada automaticamente!', 'info');
    }
    
    if (dataFim && agora >= dataFim && configManutencao.ativo) {
        configManutencao.ativo = false;
        guardarConfigManutencao();
        atualizarInterfaceManutencao();
        mostrarNotificacao('✅ A manutenção agendada foi encerrada automaticamente!', 'sucesso');
    }
}

function guardarConfigManutencao() {
    // Coletar dados do formulário
    configManutencao.conteudo.titulo = document.getElementById('manutencaoTitulo').value;
    configManutencao.conteudo.mensagemPrincipal = document.getElementById('manutencaoMsgPrincipal').value;
    configManutencao.conteudo.detalhes = document.getElementById('manutencaoDetalhes').value.split('\n').filter(l => l.trim());
    configManutencao.conteudo.previsaoRetorno = document.getElementById('manutencaoPrevisao').value;
    configManutencao.contactos.telefone = document.getElementById('manutencaoTelefone').value;
    configManutencao.contactos.whatsapp = document.getElementById('manutencaoWhatsapp').value;
    configManutencao.contactos.email = document.getElementById('manutencaoEmail').value;
    
    localStorage.setItem('configManutencao', JSON.stringify(configManutencao));
    
    // Também salvar um arquivo .flag no servidor (opcional, para PHP)
    // Se estiver usando PHP, pode fazer uma requisição AJAX aqui
    mostrarNotificacao('Configurações de manutenção guardadas!', 'sucesso');
}

function restaurarPadroesManutencao() {
    configManutencao = {
        ativo: false,
        modo: 'manual',
        dataInicio: null,
        dataFim: null,
        conteudo: {
            titulo: "Site em Manutenção",
            mensagemPrincipal: "Estamos realizando melhorias para lhe servir melhor.",
            detalhes: [
                "O site estará disponível em breve.",
                "Estamos atualizando nossos sistemas e conteúdos.",
                "Agradecemos pela paciência e compreensão."
            ],
            previsaoRetorno: "em breve"
        },
        contactos: {
            telefone: "+244 933 096 705",
            whatsapp: "+244 933 096 705",
            email: "geral@ipikk.ao"
        }
    };
    
    guardarConfigManutencao();
    atualizarInterfaceManutencao();
    mostrarNotificacao('Configurações de manutenção restauradas para os padrões!', 'info');
}

function previewManutencao() {
    guardarConfigManutencao();
    // Salvar no localStorage para a página de manutenção ler
    localStorage.setItem('configManutencao', JSON.stringify(configManutencao));
    window.open('../area-publica/manutencao.html?preview=true', '_blank');
}
        
        // Inicializar
        document.addEventListener('DOMContentLoaded', () => {
            console.log('Página de Configurações carregada!');
        });

