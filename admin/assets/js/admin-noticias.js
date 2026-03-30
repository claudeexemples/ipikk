let noticias = [];
let noticiaEditandoId = null;

async function api(url, options = {}) {
    const response = await fetch(url, {
        headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
        ...options,
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data?.mensagem || 'Erro de comunicação com o servidor.');
    return data;
}

function formatarData(data) {
    return data ? new Date(data).toLocaleDateString('pt-PT') : '-';
}

function renderizarTabelaNoticias() {
    const tbody = document.getElementById('corpoTabelaNoticias');
    if (!tbody) return;

    tbody.innerHTML = noticias.map((n) => `
        <tr>
            <td><input type="checkbox" class="checkbox-linha" data-id="${n.id}"></td>
            <td>${n.id}</td>
            <td>${n.destaquePrincipal ? '⭐ ' : ''}${n.titulo}</td>
            <td>${formatarData(n.data)}</td>
            <td>${n.estado}</td>
            <td>
                <div class="botoes-acao">
                    <button class="botao-icone" onclick="editarNoticia(${n.id})"><i class="fas fa-edit"></i></button>
                    <button class="botao-icone botao-perigo" onclick="eliminarNoticia(${n.id})"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        </tr>
    `).join('');

    document.getElementById('resumoTotal').textContent = noticias.length;
    document.getElementById('resumoPublicadas').textContent = noticias.filter(n => n.estado === 'publicada').length;
    document.getElementById('resumoRascunhos').textContent = noticias.filter(n => n.estado === 'rascunho').length;
    document.getElementById('resumoArquivadas').textContent = noticias.filter(n => n.estado === 'arquivada').length;
}

async function carregarNoticias() {
    noticias = await api('/api/admin/noticias');
    renderizarTabelaNoticias();
}

function abrirModalNoticia() {
    noticiaEditandoId = null;
    document.getElementById('formNoticia')?.reset();
    document.getElementById('noticiaId').value = '';
    document.getElementById('modalNoticia').style.display = 'flex';
}

function fecharModalNoticia() {
    document.getElementById('modalNoticia').style.display = 'none';
}

function editarNoticia(id) {
    const n = noticias.find(item => item.id === id);
    if (!n) return;

    noticiaEditandoId = id;
    document.getElementById('noticiaId').value = id;
    document.getElementById('noticiaTitulo').value = n.titulo || '';
    document.getElementById('noticiaCategoria').value = n.categoria || '';
    document.getElementById('noticiaData').value = n.data || '';
    document.getElementById('noticiaResumo').value = n.resumo || '';
    document.getElementById('noticiaConteudo').value = n.conteudo || n.descricao || '';
    document.getElementById('noticiaTipoMidia').value = n.tipoMidia || 'imagem';
    document.getElementById('noticiaVideoUrl').value = n.videoUrl || '';
    document.getElementById('noticiaAlt').value = n.alt || '';
    document.getElementById('noticiaAutor').value = n.autor || '';
    document.getElementById('noticiaVisualizacoes').value = n.visualizacoes || 0;
    document.getElementById('noticiaTags').value = Array.isArray(n.tags) ? n.tags.join(', ') : '';
    document.getElementById('noticiaEstado').value = n.estado || 'publicada';
    document.getElementById('noticiaDestaquePrincipal').checked = !!n.destaquePrincipal;
    document.getElementById('modalNoticia').style.display = 'flex';
}

async function salvarNoticia(event) {
    event.preventDefault();

    const payload = {
        titulo: document.getElementById('noticiaTitulo').value.trim(),
        categoria: document.getElementById('noticiaCategoria').value,
        data_publicacao: document.getElementById('noticiaData').value || null,
        resumo: document.getElementById('noticiaResumo').value.trim(),
        descricao: document.getElementById('noticiaConteudo').value.trim(),
        tipo: document.getElementById('noticiaTipoMidia').value,
        imagem: document.getElementById('nomeImagem')?.textContent || null,
        video_url: document.getElementById('noticiaVideoUrl').value.trim() || null,
        alt: document.getElementById('noticiaAlt').value.trim(),
        autor: document.getElementById('noticiaAutor').value.trim(),
        visualizacoes: Number(document.getElementById('noticiaVisualizacoes').value || 0),
        tags: document.getElementById('noticiaTags').value.split(',').map(t => t.trim()).filter(Boolean),
        estado: document.getElementById('noticiaEstado').value,
        destaque_principal: document.getElementById('noticiaDestaquePrincipal').checked,
    };

    const id = document.getElementById('noticiaId').value;
    if (id) {
        await api(`/api/admin/noticias/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
    } else {
        await api('/api/admin/noticias', { method: 'POST', body: JSON.stringify(payload) });
    }

    await carregarNoticias();
    fecharModalNoticia();
    return false;
}

async function eliminarNoticia(id) {
    if (!confirm('Eliminar notícia?')) return;
    await api(`/api/admin/noticias/${id}`, { method: 'DELETE' });
    await carregarNoticias();
}

function visualizarNoticia(id) {
    const noticia = noticias.find(n => n.id === id);
    if (noticia) alert(`${noticia.titulo}\n\n${noticia.resumo || ''}`);
}

function removerImagemNoticia() {
    const nome = document.getElementById('nomeImagem');
    if (nome) nome.textContent = '';
}

document.addEventListener('DOMContentLoaded', () => {
    carregarNoticias().catch(err => alert(err.message));
    document.getElementById('botaoNovaNoticia')?.addEventListener('click', abrirModalNoticia);
});
