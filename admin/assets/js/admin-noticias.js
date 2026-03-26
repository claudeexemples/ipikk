// ============================================
// DADOS DAS NOTÍCIAS
// ============================================
let noticias = [
    {
        id: 42,
        titulo: "IPIKK abre inscrições",
        resumo: "Processo de inscrições para o ano letivo 2024 já está aberto",
        conteudo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        categoria: "INSTITUCIONAL",
        data: "2024-02-10",
        tipoMidia: "imagem",
        imagem: "foto/noticia1.jpg",
        videoUrl: null,
        alt: "Alunos no IPIKK",
        autor: "Gabinete de Comunicação",
        visualizacoes: 1245,
        tags: "Inscrições, Matrículas, 2024",
        estado: "publicada",
        destaquePrincipal: true
    },
    {
        id: 41,
        titulo: "Novos laboratórios",
        resumo: "Inauguração de novos laboratórios de informática e eletricidade",
        conteudo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        categoria: "INSTITUCIONAL",
        data: "2024-02-05",
        tipoMidia: "imagem",
        imagem: "foto/lab.jpg",
        videoUrl: null,
        alt: "Novos laboratórios",
        autor: "Direção",
        visualizacoes: 892,
        tags: "Laboratórios, Infraestrutura",
        estado: "publicada",
        destaquePrincipal: false
    },
    {
        id: 40,
        titulo: "Workshop de Energia",
        resumo: "Workshop sobre energias renováveis e eficiência energética",
        conteudo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        categoria: "EVENTOS",
        data: "2024-02-01",
        tipoMidia: "imagem",
        imagem: "foto/workshop.jpg",
        videoUrl: null,
        alt: "Workshop",
        autor: "Departamento de Energia",
        visualizacoes: 657,
        tags: "Workshop, Energia, Renováveis",
        estado: "rascunho",
        destaquePrincipal: false
    },
    {
        id: 39,
        titulo: "Parceria com empresa X",
        resumo: "Nova parceria para estágios dos alunos",
        conteudo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        categoria: "PARCERIA",
        data: "2024-01-28",
        tipoMidia: "imagem",
        imagem: "foto/parceria.jpg",
        videoUrl: null,
        alt: "Parceria",
        autor: "Gabinete de Estágios",
        visualizacoes: 1534,
        tags: "Parceria, Estágios",
        estado: "publicada",
        destaquePrincipal: true
    },
    {
        id: 38,
        titulo: "Novo curso de Eletricidade",
        resumo: "Lançamento do curso técnico em eletricidade industrial",
        conteudo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        categoria: "CURSOS",
        data: "2024-01-25",
        tipoMidia: "imagem",
        imagem: "foto/curso.jpg",
        videoUrl: null,
        alt: "Curso de Eletricidade",
        autor: "Coordenação Pedagógica",
        visualizacoes: 2187,
        tags: "Cursos, Eletricidade",
        estado: "publicada",
        destaquePrincipal: false
    },
    {
        id: 37,
        titulo: "Semana da Ciência 2024",
        resumo: "Evento com palestras, workshops e exposições",
        conteudo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        categoria: "EVENTOS",
        data: "2024-01-20",
        tipoMidia: "imagem",
        imagem: "foto/ciencia.jpg",
        videoUrl: null,
        alt: "Semana da Ciência",
        autor: "Comissão Organizadora",
        visualizacoes: 478,
        tags: "Ciência, Eventos",
        estado: "rascunho",
        destaquePrincipal: false
    },
    {
        id: 36,
        titulo: "Resultados de exames finais",
        resumo: "Resultados dos exames finais já disponíveis",
        conteudo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        categoria: "INSTITUCIONAL",
        data: "2024-01-15",
        tipoMidia: "imagem",
        imagem: "foto/exames.jpg",
        videoUrl: null,
        alt: "Exames",
        autor: "Secretaria Acadêmica",
        visualizacoes: 1923,
        tags: "Exames, Resultados",
        estado: "publicada",
        destaquePrincipal: false
    }
];

// ============================================
// VARIÁVEIS DE CONTROLE
// ============================================
let paginaAtual = 1;
let itensPorPagina = 10;
let noticiaEditandoId = null;
let linhasSelecionadas = [];

// ============================================
// FUNÇÕES DE RENDERIZAÇÃO
// ============================================
function renderizarTabelaNoticias() {
    const tbody = document.getElementById('corpoTabelaNoticias');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    // Aplicar filtros e ordenação
    let noticiasFiltradas = aplicarFiltros();
    
    // Paginação
    const totalItens = noticiasFiltradas.length;
    const totalPaginas = Math.ceil(totalItens / itensPorPagina);
    const indiceInicio = (paginaAtual - 1) * itensPorPagina;
    const indiceFim = indiceInicio + itensPorPagina;
    const noticiasPagina = noticiasFiltradas.slice(indiceInicio, indiceFim);
    
    // Renderizar linhas
    noticiasPagina.forEach(noticia => {
        const linha = document.createElement('tr');
        linha.dataset.id = noticia.id;
        linha.dataset.estado = noticia.estado;
        linha.dataset.categoria = noticia.categoria;
        
        const dataObj = new Date(noticia.data);
        const dataExibicao = dataObj.toLocaleDateString('pt-PT');
        
        let classeBadge = 'badge-success';
        let iconeBadge = 'fa-check-circle';
        let textoBadge = 'Publicada';
        
        if (noticia.estado === 'rascunho') {
            classeBadge = 'badge-warning';
            iconeBadge = 'fa-clock';
            textoBadge = 'Rascunho';
        } else if (noticia.estado === 'arquivada') {
            classeBadge = 'badge-info';
            iconeBadge = 'fa-archive';
            textoBadge = 'Arquivada';
        }
        
        linha.innerHTML = `
            <td><input type="checkbox" class="checkbox-linha" data-id="${noticia.id}"></td>
            <td>${noticia.id}</td>
            <td>
                ${noticia.destaquePrincipal ? '<span class="badge-star"><i class="fas fa-star"></i></span>' : ''}
                ${noticia.titulo}
            </td>
            <td>${dataExibicao}</td>
            <td><span class="badge ${classeBadge}"><i class="fas ${iconeBadge}"></i> ${textoBadge}</span></td>
            <td>
                <div class="botoes-acao">
                    <button class="botao-icone" onclick="visualizarNoticia(${noticia.id})" title="Visualizar"><i class="fas fa-eye"></i></button>
                    <button class="botao-icone" onclick="editarNoticia(${noticia.id})" title="Editar"><i class="fas fa-edit"></i></button>
                    <button class="botao-icone botao-perigo" onclick="eliminarNoticia(${noticia.id})" title="Eliminar"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        `;
        
        tbody.appendChild(linha);
    });
    
    // Atualizar contadores
    document.querySelector('.contador').textContent = `(${totalItens} encontradas)`;
    document.getElementById('resumoTotal').textContent = noticias.length;
    document.getElementById('resumoPublicadas').textContent = noticias.filter(n => n.estado === 'publicada').length;
    document.getElementById('resumoRascunhos').textContent = noticias.filter(n => n.estado === 'rascunho').length;
    document.getElementById('resumoArquivadas').textContent = noticias.filter(n => n.estado === 'arquivada').length;
    
    // Atualizar paginação
    document.getElementById('paginaAtual').textContent = paginaAtual;
    document.getElementById('totalPaginas').textContent = totalPaginas;
    document.getElementById('botaoAnterior').disabled = paginaAtual === 1;
    document.getElementById('botaoProximo').disabled = paginaAtual === totalPaginas;
    
    // Reatribuir eventos dos checkboxes
    atribuirEventosCheckboxes();
}

function atribuirEventosCheckboxes() {
    const checkboxes = document.querySelectorAll('.checkbox-linha');
    checkboxes.forEach(cb => {
        cb.addEventListener('change', function() {
            const id = parseInt(this.dataset.id);
            if (this.checked) {
                linhasSelecionadas.push(id);
            } else {
                linhasSelecionadas = linhasSelecionadas.filter(i => i !== id);
            }
            atualizarEstadoBotoesMassa();
        });
    });
}

// ============================================
// FILTROS
// ============================================
function aplicarFiltros() {
    const termo = document.getElementById('campoBusca')?.value.toLowerCase() || '';
    const estado = document.getElementById('filtroEstado')?.value || '';
    const categoria = document.getElementById('filtroCategoria')?.value || '';
    const dataInicio = document.getElementById('filtroDataInicio')?.value;
    const dataFim = document.getElementById('filtroDataFim')?.value;
    const ordenar = document.getElementById('filtroOrdenar')?.value || 'data-desc';
    
    let filtradas = [...noticias];
    
    // Filtro por texto
    if (termo) {
        filtradas = filtradas.filter(n => 
            n.titulo.toLowerCase().includes(termo) || 
            n.resumo.toLowerCase().includes(termo)
        );
    }
    
    // Filtro por estado
    if (estado) {
        filtradas = filtradas.filter(n => n.estado === estado);
    }
    
    // Filtro por categoria
    if (categoria) {
        filtradas = filtradas.filter(n => n.categoria === categoria);
    }
    
    // Filtro por data
    if (dataInicio) {
        filtradas = filtradas.filter(n => n.data >= dataInicio);
    }
    if (dataFim) {
        filtradas = filtradas.filter(n => n.data <= dataFim);
    }
    
    // Ordenação
    filtradas.sort((a, b) => {
        switch(ordenar) {
            case 'data-desc':
                return new Date(b.data) - new Date(a.data);
            case 'data-asc':
                return new Date(a.data) - new Date(b.data);
            case 'titulo-asc':
                return a.titulo.localeCompare(b.titulo);
            case 'titulo-desc':
                return b.titulo.localeCompare(a.titulo);
            default:
                return 0;
        }
    });
    
    return filtradas;
}

// ============================================
// FUNÇÕES DO MODAL
// ============================================
function abrirModalNoticia(id = null) {
    const modal = document.getElementById('modalNoticia');
    const form = document.getElementById('formNoticia');
    const titulo = document.getElementById('modalTitulo');
    const subtitulo = document.getElementById('modalSubtitulo');
    
    form.reset();
    removerImagemNoticia();
    
    // Reset das seções de mídia
    document.getElementById('secaoImagem').style.display = 'block';
    document.getElementById('secaoVideo').style.display = 'none';
    
    // Reset do contador
    document.getElementById('contadorResumo').textContent = '0 / 200';
    
    if (id) {
        // Editar notícia existente
        const noticia = noticias.find(n => n.id === id);
        if (noticia) {
            titulo.innerHTML = 'Editar Notícia';
            subtitulo.innerHTML = 'Altere os dados da notícia';
            
            document.getElementById('noticiaId').value = noticia.id;
            document.getElementById('noticiaTitulo').value = noticia.titulo;
            document.getElementById('noticiaCategoria').value = noticia.categoria;
            document.getElementById('noticiaData').value = noticia.data;
            document.getElementById('noticiaResumo').value = noticia.resumo;
            document.getElementById('noticiaConteudo').value = noticia.conteudo;
            document.getElementById('noticiaTipoMidia').value = noticia.tipoMidia;
            document.getElementById('noticiaAlt').value = noticia.alt || '';
            document.getElementById('noticiaAutor').value = noticia.autor;
            document.getElementById('noticiaVisualizacoes').value = noticia.visualizacoes;
            document.getElementById('noticiaTags').value = noticia.tags || '';
            document.getElementById('noticiaEstado').value = noticia.estado;
            document.getElementById('noticiaDestaquePrincipal').checked = noticia.destaquePrincipal || false;
            
            // Atualizar contador do resumo
            document.getElementById('contadorResumo').textContent = noticia.resumo.length + ' / 200';
            
            // Mostrar seção correta de mídia
            if (noticia.tipoMidia === 'video' && noticia.videoUrl) {
                document.getElementById('secaoImagem').style.display = 'none';
                document.getElementById('secaoVideo').style.display = 'block';
                document.getElementById('noticiaVideoUrl').value = noticia.videoUrl;
            }
            
            noticiaEditandoId = id;
        }
    } else {
        titulo.innerHTML = 'Nova Notícia';
        subtitulo.innerHTML = 'Preencha os dados para criar uma nova notícia';
        document.getElementById('noticiaId').value = '';
        document.getElementById('noticiaData').value = new Date().toISOString().split('T')[0];
        noticiaEditandoId = null;
    }
    
    modal.classList.add('ativo');
    document.body.style.overflow = 'hidden';
}

function fecharModalNoticia() {
    document.getElementById('modalNoticia').classList.remove('ativo');
    document.body.style.overflow = '';
}

// Alternar entre upload de imagem e vídeo
document.getElementById('noticiaTipoMidia')?.addEventListener('change', function() {
    if (this.value === 'imagem') {
        document.getElementById('secaoImagem').style.display = 'block';
        document.getElementById('secaoVideo').style.display = 'none';
    } else {
        document.getElementById('secaoImagem').style.display = 'none';
        document.getElementById('secaoVideo').style.display = 'block';
    }
});

// Upload de imagem
document.getElementById('inputImagem')?.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        document.getElementById('nomeImagem').textContent = file.name;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('miniaturaImagem').src = e.target.result;
            document.getElementById('previaImagem').classList.add('ativa');
        };
        reader.readAsDataURL(file);
    }
});

function removerImagemNoticia() {
    document.getElementById('inputImagem').value = '';
    document.getElementById('previaImagem').classList.remove('ativa');
}

// Contador de caracteres
document.getElementById('noticiaResumo')?.addEventListener('input', function() {
    document.getElementById('contadorResumo').textContent = this.value.length + ' / 200';
});

// ============================================
// CRUD OPERATIONS
// ============================================
function salvarNoticia(event) {
    event.preventDefault();
    
    const id = document.getElementById('noticiaId').value;
    const titulo = document.getElementById('noticiaTitulo').value;
    const categoria = document.getElementById('noticiaCategoria').value;
    const data = document.getElementById('noticiaData').value;
    const resumo = document.getElementById('noticiaResumo').value;
    const conteudo = document.getElementById('noticiaConteudo').value;
    const tipoMidia = document.getElementById('noticiaTipoMidia').value;
    const alt = document.getElementById('noticiaAlt').value;
    const autor = document.getElementById('noticiaAutor').value;
    const visualizacoes = parseInt(document.getElementById('noticiaVisualizacoes').value) || 0;
    const tags = document.getElementById('noticiaTags').value;
    const estado = document.getElementById('noticiaEstado').value;
    const destaquePrincipal = document.getElementById('noticiaDestaquePrincipal').checked;
    
    if (id) {
        // Editar notícia existente
        const index = noticias.findIndex(n => n.id == id);
        if (index !== -1) {
            noticias[index] = {
                ...noticias[index],
                titulo,
                categoria,
                data,
                resumo,
                conteudo,
                tipoMidia,
                alt,
                autor,
                visualizacoes,
                tags,
                estado,
                destaquePrincipal
            };
        }
        mostrarNotificacao('Notícia atualizada com sucesso!', 'success');
    } else {
        // Criar nova notícia
        const novoId = Math.max(...noticias.map(n => n.id), 0) + 1;
        const novaNoticia = {
            id: novoId,
            titulo,
            categoria,
            data,
            resumo,
            conteudo,
            tipoMidia,
            imagem: tipoMidia === 'imagem' ? 'foto/placeholder.jpg' : null,
            videoUrl: tipoMidia === 'video' ? document.getElementById('noticiaVideoUrl').value : null,
            alt,
            autor,
            visualizacoes,
            tags,
            estado,
            destaquePrincipal
        };
        noticias.push(novaNoticia);
        mostrarNotificacao('Notícia criada com sucesso!', 'success');
    }
    
    renderizarTabelaNoticias();
    fecharModalNoticia();
}

function editarNoticia(id) {
    abrirModalNoticia(id);
}

function visualizarNoticia(id) {
    const noticia = noticias.find(n => n.id === id);
    alert(`Visualizar notícia: ${noticia.titulo}\n\nEm produção, abriria a página pública da notícia.`);
}

function eliminarNoticia(id) {
    if (confirm('Tem certeza que deseja eliminar esta notícia?')) {
        noticias = noticias.filter(n => n.id !== id);
        renderizarTabelaNoticias();
        mostrarNotificacao('Notícia eliminada com sucesso!', 'success');
    }
}

// ============================================
// AÇÕES EM MASSA
// ============================================
document.getElementById('selecionarTodos')?.addEventListener('change', function() {
    const checkboxes = document.querySelectorAll('.checkbox-linha');
    checkboxes.forEach(cb => {
        cb.checked = this.checked;
        if (this.checked) {
            linhasSelecionadas.push(parseInt(cb.dataset.id));
        }
    });
    if (!this.checked) linhasSelecionadas = [];
    atualizarEstadoBotoesMassa();
});

document.getElementById('botaoSelecionarTodas')?.addEventListener('click', function() {
    const checkboxes = document.querySelectorAll('.checkbox-linha');
    checkboxes.forEach(cb => {
        cb.checked = true;
        linhasSelecionadas.push(parseInt(cb.dataset.id));
    });
    document.getElementById('selecionarTodos').checked = true;
    atualizarEstadoBotoesMassa();
});

document.getElementById('botaoEliminarSelecionadas')?.addEventListener('click', function() {
    if (linhasSelecionadas.length === 0) {
        alert('Selecione pelo menos uma notícia.');
        return;
    }
    
    if (confirm(`Eliminar ${linhasSelecionadas.length} notícia(s)?`)) {
        noticias = noticias.filter(n => !linhasSelecionadas.includes(n.id));
        linhasSelecionadas = [];
        renderizarTabelaNoticias();
        mostrarNotificacao('Notícias eliminadas com sucesso!', 'success');
    }
});

document.getElementById('botaoPublicarSelecionadas')?.addEventListener('click', function() {
    if (linhasSelecionadas.length === 0) {
        alert('Selecione pelo menos uma notícia.');
        return;
    }
    
    if (confirm(`Publicar ${linhasSelecionadas.length} notícia(s)?`)) {
        noticias.forEach(n => {
            if (linhasSelecionadas.includes(n.id)) {
                n.estado = 'publicada';
            }
        });
        linhasSelecionadas = [];
        renderizarTabelaNoticias();
        mostrarNotificacao('Notícias publicadas com sucesso!', 'success');
    }
});

document.getElementById('botaoExportarCSV')?.addEventListener('click', function() {
    exportarParaCSV();
});

function atualizarEstadoBotoesMassa() {
    const temSelecao = linhasSelecionadas.length > 0;
    document.getElementById('botaoEliminarSelecionadas').disabled = !temSelecao;
    document.getElementById('botaoPublicarSelecionadas').disabled = !temSelecao;
}

// ============================================
// PAGINAÇÃO
// ============================================
document.getElementById('botaoAnterior')?.addEventListener('click', function() {
    if (paginaAtual > 1) {
        paginaAtual--;
        renderizarTabelaNoticias();
    }
});

document.getElementById('botaoProximo')?.addEventListener('click', function() {
    const totalNoticias = aplicarFiltros().length;
    const totalPaginas = Math.ceil(totalNoticias / itensPorPagina);
    if (paginaAtual < totalPaginas) {
        paginaAtual++;
        renderizarTabelaNoticias();
    }
});

document.getElementById('itensPorPagina')?.addEventListener('change', function() {
    itensPorPagina = parseInt(this.value);
    paginaAtual = 1;
    renderizarTabelaNoticias();
});

// ============================================
// FILTROS
// ============================================
document.getElementById('campoBusca')?.addEventListener('input', function() {
    paginaAtual = 1;
    renderizarTabelaNoticias();
});

document.getElementById('filtroEstado')?.addEventListener('change', function() {
    paginaAtual = 1;
    renderizarTabelaNoticias();
});

document.getElementById('filtroCategoria')?.addEventListener('change', function() {
    paginaAtual = 1;
    renderizarTabelaNoticias();
});

document.getElementById('filtroDataInicio')?.addEventListener('change', function() {
    paginaAtual = 1;
    renderizarTabelaNoticias();
});

document.getElementById('filtroDataFim')?.addEventListener('change', function() {
    paginaAtual = 1;
    renderizarTabelaNoticias();
});

document.getElementById('filtroOrdenar')?.addEventListener('change', function() {
    renderizarTabelaNoticias();
});

// ============================================
// EXPORTAR CSV
// ============================================
function exportarParaCSV() {
    const csv = [];
    const headers = ['ID', 'Título', 'Data', 'Categoria', 'Estado', 'Autor', 'Visualizações'];
    csv.push(headers.join(','));
    
    noticias.forEach(n => {
        const row = [
            n.id,
            `"${n.titulo.replace(/"/g, '""')}"`,
            n.data,
            n.categoria,
            n.estado,
            `"${n.autor}"`,
            n.visualizacoes
        ];
        csv.push(row.join(','));
    });
    
    const csvContent = csv.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `noticias_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    mostrarNotificacao('Exportação concluída!', 'success');
}

// ============================================
// NOTIFICAÇÕES
// ============================================
function mostrarNotificacao(mensagem, tipo = 'success') {
    const notif = document.createElement('div');
    const bgColor = tipo === 'success' ? '#28a745' : tipo === 'error' ? '#dc3545' : '#17a2b8';
    
    notif.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 28px;
        background: linear-gradient(135deg, ${bgColor}, ${bgColor}dd);
        color: #fff;
        border-radius: 12px;
        box-shadow: 0 8px 25px ${bgColor}66;
        z-index: 99999;
        font-weight: 600;
        font-size: 15px;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideIn 0.3s ease;
    `;
    
    const icon = tipo === 'success' ? 'fa-check-circle' : tipo === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
    notif.innerHTML = `<i class="fas ${icon}"></i> ${mensagem}`;
    
    document.body.appendChild(notif);
    
    setTimeout(() => {
        notif.remove();
    }, 3000);
}

// ============================================
// MENU MOBILE
// ============================================
function configurarMenuMobile() {
    const topbar = document.querySelector('.esquerda-barra');
    if (topbar && window.innerWidth <= 768) {
        const menuToggle = document.createElement('button');
        menuToggle.className = 'menu-toggle';
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        menuToggle.style.cssText = `
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: var(--light-gray);
            color: var(--primary-blue);
            font-size: 18px;
            margin-right: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        topbar.insertBefore(menuToggle, topbar.firstChild);
        
        menuToggle.addEventListener('click', function() {
            const sidebar = document.querySelector('.sidebar');
            sidebar.classList.toggle('ativo');
            
            let overlay = document.querySelector('.sidebar-overlay');
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.className = 'sidebar-overlay';
                overlay.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.5);
                    z-index: 999;
                `;
                document.body.appendChild(overlay);
                
                overlay.addEventListener('click', function() {
                    sidebar.classList.remove('ativo');
                    overlay.remove();
                });
            }
        });
    }
}

// ============================================
// INICIALIZAÇÃO
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    renderizarTabelaNoticias();
    configurarMenuMobile();
    
    document.getElementById('botaoNovaNoticia').addEventListener('click', () => abrirModalNoticia());
    
    // Fechar modal clicando fora
    document.getElementById('modalNoticia').addEventListener('click', function(e) {
        if (e.target === this) fecharModalNoticia();
    });
    
    // Fechar com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && document.getElementById('modalNoticia').classList.contains('ativo')) {
            fecharModalNoticia();
        }
    });
    
    console.log('Página de Notícias carregada!');
});