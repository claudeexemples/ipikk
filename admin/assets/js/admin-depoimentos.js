        // ============================================
        // DADOS DOS DEPOIMENTOS (SEM AVALIAÇÕES)
        // ============================================
        let depoimentos = [
            {
                id: 1,
                nome: "João Silva",
                curso_id: 1,
                turma: "2018",
                empresa: "ENDE - Electricista",
                texto: "O curso no IPIKK transformou minha carreira profissional. A formação técnica de qualidade me preparou para os desafios do mercado de trabalho.",
                foto: null,
                destaque: true
            },
            {
                id: 2,
                nome: "Maria Santos",
                curso_id: 5,
                turma: "2019",
                empresa: "ITEL - Gestora de Sistemas",
                texto: "A formação em Gestão de Sistemas Informáticos foi fundamental para minha carreira. Os professores são excelentes.",
                foto: null,
                destaque: true
            },
            {
                id: 3,
                nome: "António Ferreira",
                curso_id: 1,
                turma: "2017",
                empresa: "FADCOM - Coordenador de Obras",
                texto: "Sou grato ao IPIKK pela formação sólida que recebi. O curso de Técnico de Obras me proporcionou as competências necessárias.",
                foto: null,
                destaque: false
            }
        ];

        // Cursos
        let cursos = [
            { id: 1, nome: "Técnico de Obras" },
            { id: 2, nome: "Desenhador Projectista" },
            { id: 3, nome: "Energia e Instalações Eléctricas" },
            { id: 4, nome: "Frio e Climatização" },
            { id: 5, nome: "Gestão de Sistemas Informáticos" },
            { id: 6, nome: "Técnico de Informática" },
            { id: 7, nome: "Tecnologias de Móveis" }
        ];

        // ============================================
        // FUNÇÕES DE RENDERIZAÇÃO
        // ============================================

        function renderizarDepoimentos() {
            const container = document.getElementById('containerDepoimentos');
            if (!container) return;

            container.innerHTML = '';

            const filtroCurso = document.getElementById('filtroCurso')?.value;
            
            let depoimentosFiltrados = [...depoimentos];
            
            if (filtroCurso) {
                depoimentosFiltrados = depoimentosFiltrados.filter(d => d.curso_id == filtroCurso);
            }

            depoimentosFiltrados.forEach(dep => {
                const curso = cursos.find(c => c.id === dep.curso_id);
                
                const linha = document.createElement('tr');

                linha.innerHTML = `
                     <td>
                        ${dep.foto ? 
                            `<img src="${dep.foto}" class="avatar-pequeno">` : 
                            `<div class="avatar-placeholder"><i class="fas fa-user"></i></div>`
                        }
                     </td>
                     <td><strong>${dep.nome}</strong></td>
                     <td>${curso ? curso.nome : 'N/A'} <br><small style="color: #666;">Turma ${dep.turma}</small></td>
                     <td>${dep.empresa}</td>
                     <td>${dep.destaque ? '<i class="fas fa-star" style="color: #f6ad55;" title="Em destaque"></i>' : '-'}</td>
                     <td>
                        <button class="btn-icone" onclick="editarDepoimento(${dep.id})" title="Editar"><i class="fas fa-edit"></i></button>
                        <button class="btn-icone" onclick="visualizarDepoimento(${dep.id})" title="Visualizar"><i class="fas fa-eye"></i></button>
                        <button class="btn-icone vermelho" onclick="eliminarDepoimento(${dep.id})" title="Eliminar"><i class="fas fa-trash"></i></button>
                     </td>
                `;
                
                container.appendChild(linha);
            });

            atualizarEstatisticas();
        }

        function atualizarSelectCursos() {
            const select = document.getElementById('campoCursoId');
            const filtroSelect = document.getElementById('filtroCurso');
            
            if (select) {
                select.innerHTML = '<option value="">Selecione...</option>';
                cursos.forEach(curso => {
                    select.innerHTML += `<option value="${curso.id}">${curso.nome}</option>`;
                });
            }

            if (filtroSelect) {
                filtroSelect.innerHTML = '<option value="">Todos os Cursos</option>';
                cursos.forEach(curso => {
                    filtroSelect.innerHTML += `<option value="${curso.id}">${curso.nome}</option>`;
                });
            }
        }

        function atualizarEstatisticas() {
            const total = depoimentos.length;
            const totalAlumni = [...new Set(depoimentos.map(d => d.nome))].length;
            const empresas = [...new Set(depoimentos.map(d => d.empresa))].length;

            document.getElementById('estatisticaTotal').textContent = total;
            document.getElementById('estatisticaAlumni').textContent = totalAlumni;
            document.getElementById('estatisticaEmpresas').textContent = empresas;
        }

        // ============================================
        // FUNÇÕES DO MODAL
        // ============================================

        function abrirModal(depoimentoId = null) {
            const modal = document.getElementById('modalDepoimento');
            const formulario = document.getElementById('formularioDepoimento');
            const titulo = document.getElementById('modalTitulo');
            const subtitulo = document.getElementById('modalSubtitulo');
            
            formulario.reset();
            removerFoto();
            
            if (depoimentoId) {
                const dep = depoimentos.find(d => d.id === depoimentoId);
                if (dep) {
                    titulo.innerHTML = 'Editar Depoimento';
                    subtitulo.innerHTML = 'Altere os dados do depoimento';
                    document.getElementById('depoimentoId').value = dep.id;
                    document.getElementById('campoNome').value = dep.nome;
                    document.getElementById('campoCursoId').value = dep.curso_id;
                    document.getElementById('campoTurma').value = dep.turma;
                    document.getElementById('campoEmpresa').value = dep.empresa;
                    document.getElementById('campoTexto').value = dep.texto;
                    document.getElementById('campoDestaque').checked = dep.destaque;
                }
            } else {
                titulo.innerHTML = 'Novo Depoimento';
                subtitulo.innerHTML = 'Preencha os dados do depoimento';
                document.getElementById('depoimentoId').value = '';
            }
            
            modal.classList.add('ativo');
            document.body.style.overflow = 'hidden';
        }

        function fecharModal() {
            document.getElementById('modalDepoimento').classList.remove('ativo');
            document.body.style.overflow = '';
        }

        // ============================================
        // UPLOAD DE FOTO
        // ============================================
        document.getElementById('inputFoto')?.addEventListener('change', function(e) {
            const arquivo = e.target.files[0];
            if (arquivo) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById('miniaturaFoto').src = e.target.result;
                    document.getElementById('previewFoto').classList.add('ativo');
                };
                reader.readAsDataURL(arquivo);
            }
        });

        function removerFoto() {
            document.getElementById('inputFoto').value = '';
            document.getElementById('previewFoto').classList.remove('ativo');
        }

        // ============================================
        // CRUD OPERATIONS
        // ============================================

        function salvarDepoimento(event) {
            event.preventDefault();
            
            const id = document.getElementById('depoimentoId').value;
            const nome = document.getElementById('campoNome').value;
            const curso_id = parseInt(document.getElementById('campoCursoId').value);
            const turma = document.getElementById('campoTurma').value;
            const empresa = document.getElementById('campoEmpresa').value;
            const texto = document.getElementById('campoTexto').value;
            const destaque = document.getElementById('campoDestaque').checked;
            
            if (!curso_id) {
                alert('Selecione um curso!');
                return;
            }
            
            if (id) {
                const index = depoimentos.findIndex(d => d.id == id);
                if (index !== -1) {
                    depoimentos[index] = { 
                        ...depoimentos[index], 
                        nome, 
                        curso_id, 
                        turma, 
                        empresa, 
                        texto, 
                        destaque 
                    };
                }
                mostrarNotificacao('Depoimento atualizado com sucesso!', 'sucesso');
            } else {
                const novoDep = {
                    id: depoimentos.length + 1,
                    nome,
                    curso_id,
                    turma,
                    empresa,
                    texto,
                    foto: null,
                    destaque
                };
                depoimentos.push(novoDep);
                mostrarNotificacao('Depoimento criado com sucesso!', 'sucesso');
            }
            
            renderizarDepoimentos();
            fecharModal();
        }

        function editarDepoimento(id) {
            abrirModal(id);
        }

        function visualizarDepoimento(id) {
            const dep = depoimentos.find(d => d.id === id);
            if (dep) {
                const curso = cursos.find(c => c.id === dep.curso_id)?.nome || 'N/A';
                alert(`
                    👤 ${dep.nome}
                    🎓 ${curso} (Turma ${dep.turma})
                    🏢 ${dep.empresa}
                    
                    📝 Depoimento:
                    ${dep.texto}
                `);
            }
        }

        function eliminarDepoimento(id) {
            if (confirm('Tem certeza que deseja eliminar este depoimento?')) {
                depoimentos = depoimentos.filter(d => d.id !== id);
                renderizarDepoimentos();
                mostrarNotificacao('Depoimento eliminado com sucesso!', 'sucesso');
            }
        }

        function mostrarNotificacao(mensagem, tipo) {
            const notif = document.createElement('div');
            const corFundo = tipo === 'sucesso' ? '#28a745' : '#dc3545';
            
            notif.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 16px 28px;
                background: ${corFundo};
                color: #fff;
                border-radius: 12px;
                box-shadow: 0 8px 25px rgba(0,0,0,0.2);
                z-index: 99999;
                font-weight: 600;
                font-size: 15px;
                display: flex;
                align-items: center;
                gap: 10px;
                animation: slideIn 0.3s ease;
            `;
            
            notif.innerHTML = `<i class="fas fa-check-circle"></i> ${mensagem}`;
            
            document.body.appendChild(notif);
            
            setTimeout(() => {
                notif.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notif.remove(), 300);
            }, 2500);
        }

        // Adicionar animações
        const styleSheet = document.createElement("style");
        styleSheet.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(styleSheet);

        // ============================================
        // FILTROS
        // ============================================
        document.getElementById('filtroCurso')?.addEventListener('change', renderizarDepoimentos);

        // ============================================
        // INICIALIZAÇÃO
        // ============================================
        document.addEventListener('DOMContentLoaded', function() {
            atualizarSelectCursos();
            renderizarDepoimentos();
            
            document.getElementById('btnNovoDepoimento').addEventListener('click', () => abrirModal());
            document.getElementById('formularioDepoimento').addEventListener('submit', salvarDepoimento);
            
            // Fechar modal clicando fora
            document.getElementById('modalDepoimento').addEventListener('click', function(e) {
                if (e.target === this) fecharModal();
            });
            
            // Fechar com ESC
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && document.getElementById('modalDepoimento').classList.contains('ativo')) {
                    fecharModal();
                }
            });
            
            console.log('Página de Depoimentos carregada!');
        });