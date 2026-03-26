  // ============================================
    // DADOS INICIAIS
    // ============================================
    let areas = [
        { id: 1, nome: "Construção Civil", cor: "#6c757d", icone: "fa-helmet-safety", classe_botao: "botao-azul", descricao: "Execução e planeamento de obras" },
        { id: 2, nome: "Electricidade", cor: "#3A7BC0", icone: "fa-bolt", classe_botao: "botao-azul-bebe", descricao: "Instalações elétricas e automação" },
        { id: 3, nome: "Mecânica", cor: "#E67E22", icone: "fa-gear", classe_botao: "botao-laranja", descricao: "Manutenção industrial e sistemas mecânicos" },
        { id: 4, nome: "Informática", cor: "#1F7A4D", icone: "fa-laptop-code", classe_botao: "botao-verde", descricao: "Programação e redes" },
        { id: 5, nome: "Tecnologias de Móveis", cor: "#e01a1a", icone: "fa-couch", classe_botao: "botao-vermelho", descricao: "Design e produção moveleira" }
    ];

    let cursos = [
        {
            id: 1, area_id: 1, nome: "Técnico de Obras", duracao: "4 anos", vagas: 30, estado: "ativo",
            descricao: "Formação completa em construção civil", icone: "fa-helmet-safety", destaque: false,
            objetivo: "Formar técnicos qualificados para o setor da construção",
            competencias: "Gestão de obras, fiscalização, interpretação de projetos",
            certificacao: "Diploma de Técnico Médio em Construção Civil",
            pdfs: {
                10: "plano_obras_10.pdf",
                11: "plano_obras_11.pdf",
                12: null,
                13: null
            },
            saidas: [
                { 
                    titulo: "Técnico de Obras", 
                    descricao: "Atua em obras civis", 
                    competencias: ["Gestão", "Execução"], 
                    imagem: "foto/saida_obras.jpg" 
                }
            ],
            projectos: [
                { 
                    titulo: "Casa Familiar", 
                    categoria: "Projecto Final", 
                    ano: 2023, 
                    autor: "Carlos M.", 
                    descricao: "Projecto residencial",
                    imagem: "foto/projecto_casa.jpg"
                }
            ]
        },
        {
            id: 2, area_id: 1, nome: "Desenhador Projectista", duracao: "4 anos", vagas: 25, estado: "ativo",
            descricao: "Desenho técnico e modelagem 3D", icone: "fa-edit", destaque: true,
            pdfs: { 10: null, 11: null, 12: null, 13: null },
            saidas: [],
            projectos: []
        },
        {
            id: 3, area_id: 2, nome: "Energia e Instalações Eléctricas", duracao: "3 anos", vagas: 30, estado: "ativo",
            descricao: "Instalações elétricas e energias renováveis", icone: "fa-bolt", destaque: false,
            pdfs: { 10: null, 11: null, 12: null, 13: null },
            saidas: [],
            projectos: []
        }
    ];

    // ============================================
    // VARIÁVEIS DE CONTROLE
    // ============================================
    let filtroAreaAtual = null;
    let idEdicaoAtual = null;

    // ============================================
    // FUNÇÕES DE RENDERIZAÇÃO
    // ============================================
    function renderizarAreas() {
        const container = document.getElementById('containerAreas');
        if (!container) return;
        container.innerHTML = '';
        
        areas.forEach(area => {
            const totalCursos = cursos.filter(c => c.area_id === area.id).length;
            const card = document.createElement('div');
            card.className = `card-area ${filtroAreaAtual === area.id ? 'ativo' : ''}`;
            card.dataset.areaId = area.id;
            card.onclick = () => filtrarPorArea(area.id);
            card.innerHTML = `
                <div class="barra-cor-area" style="background: ${area.cor};"></div>
                <div class="icone-area" style="background: ${area.cor};"><i class="fas ${area.icone}"></i></div>
                <div class="info-area"><h4>${area.nome}</h4><p>${area.descricao}</p></div>
                <div class="contador-area">${totalCursos}</div>
            `;
            container.appendChild(card);
        });
        atualizarSelectAreas();
    }

    function renderizarCursos() {
        const container = document.getElementById('containerCursos');
        if (!container) return;
        container.innerHTML = '';

        let cursosFiltrados = [...cursos];
        if (filtroAreaAtual) {
            cursosFiltrados = cursosFiltrados.filter(c => c.area_id === filtroAreaAtual);
        }

        cursosFiltrados.forEach(curso => {
            const area = areas.find(a => a.id === curso.area_id);
            const card = document.createElement('div');
            card.className = 'card-curso';
            card.innerHTML = `
                <div class="barra-cor-curso" style="background: ${area ? area.cor : '#003072'};"></div>
                <div class="conteudo-curso">
                    <div class="cabecalho-curso">
                        <div class="icone-curso"><i class="fas ${curso.icone}"></i></div>
                        <div class="info-curso">
                            <h3>${curso.nome}</h3>
                            <p><i class="fas fa-tag"></i> ${area ? area.nome : 'Sem área'}</p>
                        </div>
                    </div>
                    <p class="descricao-curso">${curso.descricao}</p>
                    <div class="metadados-curso">
                        <span class="item-metadado"><i class="fas fa-clock"></i> ${curso.duracao}</span>
                        <span class="item-metadado"><i class="fas fa-users"></i> ${curso.vagas} vagas</span>
                    </div>
                    <div class="rodape-curso">
                        <span class="badge-curso badge-${curso.estado}"><i class="fas fa-${curso.estado === 'ativo' ? 'check-circle' : 'pause-circle'}"></i> ${curso.estado}</span>
                        <div class="acoes-curso">
                            <button class="btn-icone" onclick="editarCurso(${curso.id})"><i class="fas fa-edit"></i></button>
                            <button class="btn-icone" onclick="visualizarCurso(${curso.id})"><i class="fas fa-eye"></i></button>
                            <button class="btn-icone" onclick="eliminarCurso(${curso.id})"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });

        document.getElementById('contadorCursos').innerHTML = `(${cursosFiltrados.length} cursos)`;
        atualizarEstatisticas();
    }

    function atualizarEstatisticas() {
        document.getElementById('estatisticaTotal').textContent = cursos.length;
        document.getElementById('estatisticaAtivos').textContent = cursos.filter(c => c.estado === 'ativo').length;
        document.getElementById('estatisticaPausados').textContent = cursos.filter(c => c.estado === 'pausado').length;
        document.getElementById('estatisticaArquivados').textContent = cursos.filter(c => c.estado === 'arquivado').length;
        document.getElementById('estatisticaDestaques').textContent = cursos.filter(c => c.destaque).length;
        document.getElementById('estatisticaVagas').textContent = cursos.reduce((acc, c) => acc + (c.vagas || 0), 0);
    }

    function atualizarSelectAreas() {
        const select = document.getElementById('filtroArea');
        const cursoSelect = document.getElementById('cursoAreaId');
        select.innerHTML = '<option value="">Todas</option>';
        cursoSelect.innerHTML = '<option value="">Selecione...</option>';
        
        areas.forEach(area => {
            select.innerHTML += `<option value="${area.id}">${area.nome}</option>`;
            cursoSelect.innerHTML += `<option value="${area.id}">${area.nome}</option>`;
        });
    }

    // ============================================
    // FILTROS
    // ============================================
    function filtrarPorArea(areaId) {
        filtroAreaAtual = filtroAreaAtual === areaId ? null : areaId;
        document.querySelectorAll('.card-area').forEach(card => {
            card.classList.toggle('ativo', card.dataset.areaId == areaId && filtroAreaAtual === areaId);
        });
        document.getElementById('filtroArea').value = filtroAreaAtual || '';
        renderizarCursos();
    }

    document.getElementById('campoBusca')?.addEventListener('input', function() {
        const termo = this.value.toLowerCase();
        document.querySelectorAll('.card-curso').forEach(card => {
            const texto = card.textContent.toLowerCase();
            card.style.display = texto.includes(termo) ? 'block' : 'none';
        });
    });

    document.getElementById('filtroArea')?.addEventListener('change', function() {
        filtroAreaAtual = this.value || null;
        renderizarCursos();
        document.querySelectorAll('.card-area').forEach(card => {
            card.classList.toggle('ativo', card.dataset.areaId == filtroAreaAtual);
        });
    });

    document.getElementById('filtroEstado')?.addEventListener('change', function() {
        const estado = this.value;
        document.querySelectorAll('.card-curso').forEach(card => {
            const cardEstado = card.querySelector('.badge-curso').textContent.trim().toLowerCase();
            card.style.display = !estado || cardEstado === estado ? 'block' : 'none';
        });
    });

    // ============================================
    // FUNÇÕES DO MODAL ÁREA
    // ============================================
    function abrirModalArea(id = null) {
        document.getElementById('modalArea').classList.add('ativo');
        document.body.style.overflow = 'hidden';
        if (id) {
            const area = areas.find(a => a.id === id);
            if (area) {
                document.getElementById('tituloModalArea').textContent = 'Editar Área';
                document.getElementById('areaId').value = area.id;
                document.getElementById('areaNome').value = area.nome;
                document.getElementById('areaDescricao').value = area.descricao;
                document.getElementById('areaCor').value = area.cor;
                document.getElementById('areaIcone').value = area.icone;
                document.getElementById('areaClasseBotao').value = area.classe_botao;
            }
        } else {
            document.getElementById('tituloModalArea').textContent = 'Nova Área';
            document.getElementById('formularioArea').reset();
            document.getElementById('areaId').value = '';
        }
    }

    function fecharModalArea() {
        document.getElementById('modalArea').classList.remove('ativo');
        document.body.style.overflow = '';
    }

    function salvarArea(e) {
        e.preventDefault();
        const id = document.getElementById('areaId').value;
        const nome = document.getElementById('areaNome').value;
        const descricao = document.getElementById('areaDescricao').value;
        const cor = document.getElementById('areaCor').value;
        const icone = document.getElementById('areaIcone').value;
        const classe_botao = document.getElementById('areaClasseBotao').value;

        if (id) {
            const index = areas.findIndex(a => a.id == id);
            if (index !== -1) areas[index] = { ...areas[index], nome, descricao, cor, icone, classe_botao };
            mostrarNotificacao('Área atualizada!', 'success');
        } else {
            const novaArea = { id: areas.length + 1, nome, descricao, cor, icone, classe_botao };
            areas.push(novaArea);
            mostrarNotificacao('Área criada!', 'success');
        }
        renderizarAreas();
        fecharModalArea();
    }

    // ============================================
    // FUNÇÕES DO MODAL CURSO
    // ============================================
    function abrirModalCurso(id = null) {
        const modal = document.getElementById('modalCurso');
        document.getElementById('formularioCurso').reset();
        document.querySelectorAll('.aba-modal').forEach(t => t.classList.remove('ativo'));
        document.querySelectorAll('.conteudo-aba').forEach(t => t.classList.remove('ativo'));
        document.querySelector('[data-aba="basico"]').classList.add('ativo');
        document.querySelector('[data-aba="basico"]').classList.add('ativo');

        // Limpar previews de PDF
        for (let classe = 10; classe <= 13; classe++) {
            const preview = document.getElementById(`pdf${classe}Preview`);
            if (preview) preview.classList.remove('ativo');
        }

        if (id) {
            const curso = cursos.find(c => c.id === id);
            if (curso) {
                document.getElementById('tituloModalCurso').textContent = 'Editar Curso';
                document.getElementById('cursoId').value = curso.id;
                document.getElementById('cursoNome').value = curso.nome;
                document.getElementById('cursoAreaId').value = curso.area_id;
                document.getElementById('cursoDuracao').value = curso.duracao;
                document.getElementById('cursoDescricaoCurta').value = curso.descricao;
                document.getElementById('cursoDescricaoLonga').value = curso.descricao_longa || '';
                document.getElementById('cursoObjetivo').value = curso.objetivo || '';
                document.getElementById('cursoCompetencias').value = curso.competencias || '';
                document.getElementById('cursoCertificacao').value = curso.certificacao || '';
                document.getElementById('cursoVagas').value = curso.vagas;
                document.getElementById('cursoEstado').value = curso.estado;
                document.getElementById('cursoDestaque').checked = curso.destaque;
                if (curso.cor) {
                    document.getElementById('cursoCor').value = curso.cor;
                }
                
                // Carregar PDFs
                if (curso.pdfs) {
                    for (let classe = 10; classe <= 13; classe++) {
                        if (curso.pdfs[classe]) {
                            document.getElementById(`pdf${classe}Nome`).textContent = curso.pdfs[classe];
                            document.getElementById(`pdf${classe}Preview`).classList.add('ativo');
                        }
                    }
                }
                
                carregarSaidas(curso.saidas || []);
                carregarProjectos(curso.projectos || []);
            }
        } else {
            document.getElementById('tituloModalCurso').textContent = 'Novo Curso';
            document.getElementById('cursoId').value = '';
            document.getElementById('containerSaidas').innerHTML = '';
            document.getElementById('containerProjectos').innerHTML = '';
        }

        modal.classList.add('ativo');
        document.body.style.overflow = 'hidden';
    }

    function fecharModalCurso() {
        document.getElementById('modalCurso').classList.remove('ativo');
        document.body.style.overflow = '';
    }

    // Abas do modal
    document.querySelectorAll('.aba-modal').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.aba-modal').forEach(t => t.classList.remove('ativo'));
            document.querySelectorAll('.conteudo-aba').forEach(t => t.classList.remove('ativo'));
            this.classList.add('ativo');
            document.querySelector(`.conteudo-aba[data-aba="${this.dataset.aba}"]`).classList.add('ativo');
        });
    });

    // ============================================
    // UPLOADS DE PDF POR CLASSE
    // ============================================
    function setupPDFUploads() {
        for (let classe = 10; classe <= 13; classe++) {
            const input = document.getElementById(`pdf${classe}Input`);
            if (input) {
                input.addEventListener('change', function(e) {
                    const file = e.target.files[0];
                    if (file) {
                        document.getElementById(`pdf${classe}Nome`).textContent = file.name;
                        document.getElementById(`pdf${classe}Preview`).classList.add('ativo');
                    }
                });
            }
        }
    }

    function removerPDF(classe) {
        document.getElementById(`pdf${classe}Input`).value = '';
        document.getElementById(`pdf${classe}Preview`).classList.remove('ativo');
    }

    // ============================================
    // SAÍDAS PROFISSIONAIS (COM UPLOAD DE IMAGEM)
    // ============================================
    function adicionarSaida(dados = null) {
        const container = document.getElementById('containerSaidas');
        const div = document.createElement('div');
        div.className = 'item-dinamico';
        div.innerHTML = `
            <div class="grupo-form">
                <input type="text" class="controle-form" placeholder="Título da saída profissional" value="${dados?.titulo || ''}">
            </div>
            <div class="grupo-form">
                <textarea class="controle-form" placeholder="Descrição da saída profissional" rows="2">${dados?.descricao || ''}</textarea>
            </div>
            <div class="grupo-form">
                <input type="text" class="controle-form" placeholder="Competências (separadas por vírgula)" value="${dados?.competencias?.join(', ') || ''}">
            </div>
            <div class="grupo-form">
                <label>Imagem representativa</label>
                <div class="area-upload-arquivo" onclick="this.nextElementSibling.click()">
                    <i class="fas fa-image"></i>
                    <p>Clique para fazer upload da imagem</p>
                </div>
                <input type="file" accept="image/*" style="display: none;" onchange="previewImagem(this, '${dados?.imagem || ''}')">
                <div class="preview-arquivo">
                    <img src="${dados?.imagem || ''}" style="max-width: 80px;">
                </div>
            </div>
            <button type="button" class="btn-remover" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>
        `;
        container.appendChild(div);
    }

    function carregarSaidas(saidas) {
        const container = document.getElementById('containerSaidas');
        container.innerHTML = '';
        saidas.forEach(s => adicionarSaida(s));
    }

    // ============================================
    // PROJECTOS (COM UPLOAD DE IMAGEM)
    // ============================================
    function adicionarProjecto(dados = null) {
        const container = document.getElementById('containerProjectos');
        const div = document.createElement('div');
        div.className = 'item-dinamico';
        div.innerHTML = `
            <div class="linha-form">
                <div class="grupo-form">
                    <input type="text" class="controle-form" placeholder="Título do projecto" value="${dados?.titulo || ''}">
                </div>
                <div class="grupo-form">
                    <select class="controle-form">
                        <option value="final" ${dados?.categoria === 'final' ? 'selected' : ''}>Projecto Final</option>
                        <option value="estruturas" ${dados?.categoria === 'estruturas' ? 'selected' : ''}>Estruturas</option>
                        <option value="reabilitacao" ${dados?.categoria === 'reabilitacao' ? 'selected' : ''}>Reabilitação</option>
                    </select>
                </div>
            </div>
            <div class="grupo-form">
                <textarea class="controle-form" placeholder="Descrição do projecto" rows="2">${dados?.descricao || ''}</textarea>
            </div>
            <div class="linha-form">
                <div class="grupo-form">
                    <input type="text" class="controle-form" placeholder="Ano" value="${dados?.ano || ''}">
                </div>
                <div class="grupo-form">
                    <input type="text" class="controle-form" placeholder="Autor" value="${dados?.autor || ''}">
                </div>
            </div>
            <div class="grupo-form">
                <label>Imagem do projecto</label>
                <div class="area-upload-arquivo" onclick="this.nextElementSibling.click()">
                    <i class="fas fa-image"></i>
                    <p>Clique para fazer upload da imagem</p>
                </div>
                <input type="file" accept="image/*" style="display: none;" onchange="previewImagem(this, '${dados?.imagem || ''}')">
                <div class="preview-arquivo">
                    <img src="${dados?.imagem || ''}" style="max-width: 80px;">
                </div>
            </div>
            <button type="button" class="btn-remover" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>
        `;
        container.appendChild(div);
    }

    function carregarProjectos(projectos) {
        const container = document.getElementById('containerProjectos');
        container.innerHTML = '';
        projectos.forEach(p => adicionarProjecto(p));
    }

    // Função para preview de imagem
    function previewImagem(input, imagemAtual) {
        const preview = input.previousElementSibling.querySelector('.preview-arquivo');
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                preview.innerHTML = `<img src="${e.target.result}" style="max-width: 80px;">`;
                preview.style.display = 'flex';
            };
            reader.readAsDataURL(input.files[0]);
        } else if (imagemAtual) {
            preview.innerHTML = `<img src="${imagemAtual}" style="max-width: 80px;">`;
            preview.style.display = 'flex';
        }
    }

    // ============================================
    // UPLOADS (IMAGEM DE CAPA)
    // ============================================
    document.getElementById('imagemInput')?.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('miniaturaImagem').src = e.target.result;
                document.getElementById('previewImagem').classList.add('ativo');
            };
            reader.readAsDataURL(file);
        }
    });

    function removerImagem() {
        document.getElementById('imagemInput').value = '';
        document.getElementById('previewImagem').classList.remove('ativo');
    }

    // ============================================
    // ÍCONES
    // ============================================
    document.querySelectorAll('.opcao-icone').forEach(icon => {
        icon.addEventListener('click', function() {
            document.querySelectorAll('.opcao-icone').forEach(i => i.classList.remove('selecionado'));
            this.classList.add('selecionado');
            document.getElementById('cursoIcone').value = this.dataset.icone;
        });
    });

    // ============================================
    // CRUD
    // ============================================
    function salvarCurso(e) {
        e.preventDefault();
        
        const id = document.getElementById('cursoId').value;
        const area_id = parseInt(document.getElementById('cursoAreaId').value);
        const nome = document.getElementById('cursoNome').value;
        const duracao = document.getElementById('cursoDuracao').value;
        const descricao = document.getElementById('cursoDescricaoCurta').value;
        const vagas = parseInt(document.getElementById('cursoVagas').value) || 0;
        const estado = document.getElementById('cursoEstado').value;
        const destaque = document.getElementById('cursoDestaque').checked;
        const icone = document.getElementById('cursoIcone').value;
        const cor = document.getElementById('cursoCor').value;

        // Recolher nomes dos PDFs
        const pdfs = {
            10: document.getElementById('pdf10Input').files[0]?.name || null,
            11: document.getElementById('pdf11Input').files[0]?.name || null,
            12: document.getElementById('pdf12Input').files[0]?.name || null,
            13: document.getElementById('pdf13Input').files[0]?.name || null
        };

        const curso = {
            id: id ? parseInt(id) : cursos.length + 1,
            area_id, nome, duracao, vagas, estado, destaque, icone, cor,
            descricao,
            descricao_longa: document.getElementById('cursoDescricaoLonga').value,
            objetivo: document.getElementById('cursoObjetivo').value,
            competencias: document.getElementById('cursoCompetencias').value,
            certificacao: document.getElementById('cursoCertificacao').value,
            pdfs,
            saidas: [],
            projectos: []
        };

        // Recolher saídas
        document.querySelectorAll('#containerSaidas .item-dinamico').forEach(item => {
            const inputs = item.querySelectorAll('input, textarea');
            const previewImg = item.querySelector('.preview-arquivo img');
            
            curso.saidas.push({
                titulo: inputs[0]?.value || '',
                descricao: inputs[1]?.value || '',
                competencias: inputs[2]?.value.split(',').map(c => c.trim()),
                imagem: previewImg?.src || null
            });
        });

        // Recolher projectos
        document.querySelectorAll('#containerProjectos .item-dinamico').forEach(item => {
            const selects = item.querySelectorAll('select');
            const inputs = item.querySelectorAll('input, textarea');
            const previewImg = item.querySelector('.preview-arquivo img');
            
            curso.projectos.push({
                titulo: inputs[0]?.value || '',
                categoria: selects[0]?.value || '',
                descricao: inputs[1]?.value || '',
                ano: inputs[2]?.value || '',
                autor: inputs[3]?.value || '',
                imagem: previewImg?.src || null
            });
        });

        if (id) {
            const index = cursos.findIndex(c => c.id == id);
            if (index !== -1) cursos[index] = curso;
            mostrarNotificacao('Curso atualizado!', 'success');
        } else {
            cursos.push(curso);
            mostrarNotificacao('Curso criado!', 'success');
        }

        renderizarAreas();
        renderizarCursos();
        fecharModalCurso();
    }

    function editarCurso(id) {
        abrirModalCurso(id);
    }

    function visualizarCurso(id) {
        const curso = cursos.find(c => c.id === id);
        alert(`Visualizar: ${curso.nome}\n(Em produção, abriria a página pública)`);
    }

    function eliminarCurso(id) {
        if (confirm('Eliminar este curso?')) {
            cursos = cursos.filter(c => c.id !== id);
            renderizarAreas();
            renderizarCursos();
            mostrarNotificacao('Curso eliminado!', 'success');
        }
    }

    // ============================================
    // AÇÕES RÁPIDAS
    // ============================================
    function exportarCursos() {
        const csv = [['ID', 'Nome', 'Área', 'Duração', 'Vagas', 'Estado']];
        cursos.forEach(c => {
            const area = areas.find(a => a.id === c.area_id)?.nome || '';
            csv.push([c.id, c.nome, area, c.duracao, c.vagas, c.estado]);
        });
        const content = csv.map(row => row.join(',')).join('\n');
        const blob = new Blob([content], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'cursos.csv';
        a.click();
        mostrarNotificacao('Exportação concluída!', 'success');
    }

    function gerarRelatorio() {
        alert('Relatório de vagas: ' + cursos.reduce((acc, c) => acc + (c.vagas || 0), 0) + ' vagas disponíveis');
    }

    function imprimirCatalogo() {
        window.print();
    }

    // ============================================
    // NOTIFICAÇÕES
    // ============================================
    function mostrarNotificacao(msg, tipo) {
        const notif = document.createElement('div');
        notif.className = 'notificacao';
        notif.innerHTML = `<i class="fas fa-${tipo === 'success' ? 'check-circle' : 'info-circle'}"></i> ${msg}`;
        notif.style.background = tipo === 'success' ? 'linear-gradient(135deg, #28a745, #218838)' : 'linear-gradient(135deg, #17a2b8, #138496)';
        document.body.appendChild(notif);
        setTimeout(() => notif.remove(), 3000);
    }

    // ============================================
    // INICIALIZAÇÃO
    // ============================================
    document.addEventListener('DOMContentLoaded', function() {
        renderizarAreas();
        renderizarCursos();
        setupPDFUploads();

        document.getElementById('btnNovoCurso').addEventListener('click', () => abrirModalCurso());

        // Fechar modais ao clicar fora
        document.getElementById('modalArea').addEventListener('click', e => e.target === document.getElementById('modalArea') && fecharModalArea());
        document.getElementById('modalCurso').addEventListener('click', e => e.target === document.getElementById('modalCurso') && fecharModalCurso());

        // Tecla ESC
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                if (document.getElementById('modalCurso').classList.contains('ativo')) fecharModalCurso();
                if (document.getElementById('modalArea').classList.contains('ativo')) fecharModalArea();
            }
        });

        // Contador de caracteres
        document.getElementById('cursoDescricaoCurta')?.addEventListener('input', function() {
            document.getElementById('contadorDescricaoCurta').textContent = this.value.length + ' / 200';
        });

        console.log('Página de Cursos carregada!');
    });

