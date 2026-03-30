let areas = [];
let cursos = [];
let filtroAreaAtual = null;
let idEdicaoAtual = null;

async function api(url, options = {}) {
    const response = await fetch(url, {
        headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
        ...options,
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data?.mensagem || 'Erro no servidor');
    return data;
}

async function carregarDados() {
    [areas, cursos] = await Promise.all([
        api('/api/admin/areas'),
        api('/api/admin/cursos'),
    ]);
    renderizarAreas();
    renderizarCursos();
    atualizarSelectAreas();
}

function renderizarAreas() {
    const container = document.getElementById('containerAreas');
    if (!container) return;
    container.innerHTML = areas.map((area) => `
        <div class="card-area ${filtroAreaAtual === area.id ? 'ativo' : ''}" data-area-id="${area.id}" onclick="filtrarPorArea(${area.id})">
            <div class="barra-cor-area" style="background:${area.cor || '#003072'}"></div>
            <div class="icone-area" style="background:${area.cor || '#003072'}"><i class="fas ${area.icone || 'fa-graduation-cap'}"></i></div>
            <div class="info-area"><h4>${area.nome}</h4><p>${area.descricao || ''}</p></div>
            <div class="contador-area">${cursos.filter(c => c.area_id === area.id).length}</div>
        </div>
    `).join('');
}

function renderizarCursos() {
    const container = document.getElementById('containerCursos');
    if (!container) return;

    const filtrados = filtroAreaAtual ? cursos.filter(c => c.area_id === filtroAreaAtual) : [...cursos];

    container.innerHTML = filtrados.map((curso) => {
        const area = areas.find(a => a.id === curso.area_id);
        return `
        <div class="card-curso">
            <div class="barra-cor-curso" style="background:${area?.cor || '#003072'}"></div>
            <div class="conteudo-curso">
                <div class="cabecalho-curso">
                    <div class="icone-curso"><i class="fas ${curso.icone || 'fa-graduation-cap'}"></i></div>
                    <div class="info-curso">
                        <h3>${curso.nome}</h3>
                        <p><i class="fas fa-tag"></i> ${area?.nome || 'Sem área'}</p>
                    </div>
                </div>
                <p class="descricao-curso">${curso.descricao_curta || ''}</p>
                <div class="metadados-curso">
                    <span class="item-metadado"><i class="fas fa-clock"></i> ${curso.duracao || '-'}</span>
                    <span class="item-metadado"><i class="fas fa-users"></i> ${curso.vagas || 0} vagas</span>
                </div>
                <div class="rodape-curso">
                    <span class="badge-curso badge-${curso.estado}">${curso.estado}</span>
                    <div class="acoes-curso">
                        <button class="btn-icone" onclick="editarCurso(${curso.id})"><i class="fas fa-edit"></i></button>
                        <button class="btn-icone" onclick="eliminarCurso(${curso.id})"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            </div>
        </div>`;
    }).join('');

    document.getElementById('contadorCursos').innerHTML = `(${filtrados.length} cursos)`;
    document.getElementById('estatisticaTotal').textContent = cursos.length;
    document.getElementById('estatisticaAtivos').textContent = cursos.filter(c => c.estado === 'ativo').length;
    document.getElementById('estatisticaPausados').textContent = cursos.filter(c => c.estado === 'pausado').length;
    document.getElementById('estatisticaArquivados').textContent = cursos.filter(c => c.estado === 'arquivado').length;
    document.getElementById('estatisticaDestaques').textContent = cursos.filter(c => c.destaque).length;
    document.getElementById('estatisticaVagas').textContent = cursos.reduce((acc, c) => acc + Number(c.vagas || 0), 0);
}

function atualizarSelectAreas() {
    const selects = [document.getElementById('filtroArea'), document.getElementById('cursoAreaId')].filter(Boolean);
    selects.forEach((select, index) => {
        select.innerHTML = index === 0 ? '<option value="">Todas</option>' : '<option value="">Selecione...</option>';
        areas.forEach(area => {
            select.innerHTML += `<option value="${area.id}">${area.nome}</option>`;
        });
    });
}

function filtrarPorArea(areaId) {
    filtroAreaAtual = filtroAreaAtual === areaId ? null : areaId;
    renderizarAreas();
    renderizarCursos();
}

function abrirModalArea(id = null) {
    const form = document.getElementById('formularioArea');
    form.reset();
    document.getElementById('areaId').value = '';
    if (id) {
        const area = areas.find(a => a.id === id);
        if (area) {
            document.getElementById('areaId').value = area.id;
            document.getElementById('areaNome').value = area.nome || '';
            document.getElementById('areaDescricao').value = area.descricao || '';
            document.getElementById('areaCor').value = area.cor || '#003072';
            document.getElementById('areaIcone').value = area.icone || 'fa-graduation-cap';
            document.getElementById('areaClasseBotao').value = area.classe_botao || 'botao-azul';
        }
    }
    document.getElementById('modalArea').style.display = 'flex';
}

function fecharModalArea() {
    document.getElementById('modalArea').style.display = 'none';
}

async function salvarArea(e) {
    e.preventDefault();
    const id = document.getElementById('areaId').value;
    const payload = {
        nome: document.getElementById('areaNome').value.trim(),
        descricao: document.getElementById('areaDescricao').value.trim(),
        cor: document.getElementById('areaCor').value,
        icone: document.getElementById('areaIcone').value,
        classe_botao: document.getElementById('areaClasseBotao').value,
    };

    if (id) {
        await api(`/api/admin/areas/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
    } else {
        await api('/api/admin/areas', { method: 'POST', body: JSON.stringify(payload) });
    }

    await carregarDados();
    fecharModalArea();
    return false;
}

function abrirModalCurso(id = null) {
    idEdicaoAtual = id;
    const form = document.getElementById('formularioCurso');
    form.reset();
    document.getElementById('cursoId').value = '';

    if (id) {
        const curso = cursos.find(c => c.id === id);
        if (curso) {
            document.getElementById('cursoId').value = curso.id;
            document.getElementById('cursoNome').value = curso.nome || '';
            document.getElementById('cursoAreaId').value = curso.area_id || '';
            document.getElementById('cursoDuracao').value = curso.duracao || '';
            document.getElementById('cursoDescricaoCurta').value = curso.descricao_curta || '';
            document.getElementById('cursoDescricaoLonga').value = curso.descricao_longa || '';
            document.getElementById('cursoObjetivo').value = curso.objetivo || '';
            document.getElementById('cursoCompetencias').value = curso.competencias || '';
            document.getElementById('cursoCertificacao').value = curso.certificacao || '';
            document.getElementById('cursoVagas').value = curso.vagas || 0;
            document.getElementById('cursoEstado').value = curso.estado || 'ativo';
            document.getElementById('cursoIcone').value = curso.icone || 'fa-graduation-cap';
            document.getElementById('cursoDestaque').checked = !!curso.destaque;
        }
    }

    document.getElementById('modalCurso').style.display = 'flex';
}

function fecharModalCurso() {
    document.getElementById('modalCurso').style.display = 'none';
}

function editarCurso(id) {
    abrirModalCurso(id);
}

async function salvarCurso(e) {
    e.preventDefault();
    const id = document.getElementById('cursoId').value;
    const payload = {
        nome: document.getElementById('cursoNome').value.trim(),
        area_id: Number(document.getElementById('cursoAreaId').value || 0) || null,
        duracao: document.getElementById('cursoDuracao').value.trim(),
        descricao_curta: document.getElementById('cursoDescricaoCurta').value.trim(),
        descricao_longa: document.getElementById('cursoDescricaoLonga').value.trim(),
        objetivo: document.getElementById('cursoObjetivo').value.trim(),
        competencias: document.getElementById('cursoCompetencias').value.trim(),
        certificacao: document.getElementById('cursoCertificacao').value.trim(),
        vagas: Number(document.getElementById('cursoVagas')?.value || 0),
        estado: document.getElementById('cursoEstado')?.value || 'ativo',
        icone: document.getElementById('cursoIcone')?.value || 'fa-graduation-cap',
        destaque: document.getElementById('cursoDestaque')?.checked || false,
    };

    if (id) {
        await api(`/api/admin/cursos/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
    } else {
        await api('/api/admin/cursos', { method: 'POST', body: JSON.stringify(payload) });
    }

    await carregarDados();
    fecharModalCurso();
    return false;
}

async function eliminarCurso(id) {
    if (!confirm('Eliminar curso?')) return;
    await api(`/api/admin/cursos/${id}`, { method: 'DELETE' });
    await carregarDados();
}

function visualizarCurso(id) {
    const curso = cursos.find(c => c.id === id);
    if (curso) alert(`${curso.nome}\n\n${curso.descricao_curta || ''}`);
}

function exportarCursos() { alert('Exportação disponível após integração completa de relatórios.'); }
function gerarRelatorio() { alert('Relatório de vagas em preparação.'); }
function imprimirCatalogo() { window.print(); }

document.addEventListener('DOMContentLoaded', () => {
    carregarDados().catch(err => alert(err.message));
    document.getElementById('botaoNovaArea')?.addEventListener('click', () => abrirModalArea());
    document.getElementById('botaoNovoCurso')?.addEventListener('click', () => abrirModalCurso());
});

// Compatibilidade com botões já existentes no HTML legado
function adicionarSaida() {
    alert('Adição de saídas profissionais estará disponível na próxima fase.');
}

function adicionarProjecto() {
    alert('Adição de projectos estará disponível na próxima fase.');
}

function removerPDF(classe) {
    const nome = document.getElementById(`pdf${classe}Nome`);
    if (nome) nome.textContent = '';
    const input = document.getElementById(`pdf${classe}Input`);
    if (input) input.value = '';
}

function removerImagem(tipo) {
    const preview = document.getElementById(`${tipo}ImagemPreview`);
    if (preview) preview.style.display = 'none';
    const nome = document.getElementById(`${tipo}ImagemNome`);
    if (nome) nome.textContent = '';
}
