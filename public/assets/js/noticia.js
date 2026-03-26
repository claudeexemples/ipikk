// ===== DADOS DAS NOTÍCIAS COM LOREM IPSUM =====
const noticias = [
    {
        id: 1,
        categoria: 'DESTAQUE',
        titulo: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
        resumo: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
        midia: 'https://picsum.photos/id/1043/1200/800',
        tipo: 'imagem',
        data: '11 de Março, 2026',
        autor: 'Lorem Ipsum',
        visualizacoes: '1.245',
        tags: ['Lorem', 'Ipsum', 'Dolor', 'Sit']
    },
    {
        id: 2,
        categoria: 'CURSOS',
        titulo: 'Consectetur adipiscing elit sed do eiusmod tempor incididunt',
        resumo: 'Ut labore et dolore magna aliqua enim ad minim veniam',
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        midia: 'https://picsum.photos/id/1044/800/600',
        tipo: 'imagem',
        data: '10 de Março, 2026',
        autor: 'Consectetur Team',
        visualizacoes: '892',
        tags: ['Adipiscing', 'Elit', 'Tempor']
    },
    {
        id: 3,
        categoria: 'EVENTOS',
        titulo: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip',
        resumo: 'Ex ea commodo consequat duis aute irure dolor in reprehenderit',
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        midia: 'https://picsum.photos/id/1045/800/600',
        tipo: 'imagem',
        data: '09 de Março, 2026',
        autor: 'Eventos Team',
        visualizacoes: '657',
        tags: ['Exercitation', 'Ullamco', 'Laboris']
    },
    {
        id: 4,
        categoria: 'PARCERIA',
        titulo: 'Duis aute irure dolor in reprehenderit in voluptate velit',
        resumo: 'Esse cillum dolore eu fugiat nulla pariatur excepteur sint',
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        midia: 'https://picsum.photos/id/1047/800/600',
        tipo: 'imagem',
        data: '08 de Março, 2026',
        autor: 'Parcerias Dept',
        visualizacoes: '1.534',
        tags: ['Reprehenderit', 'Voluptate', 'Dolore']
    },
    {
        id: 5,
        categoria: 'SUCESSO',
        titulo: 'Excepteur sint occaecat cupidatat non proident sunt in culpa',
        resumo: 'Qui officia deserunt mollit anim id est laborum perspiciatis',
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        midia: 'https://picsum.photos/id/1048/800/600',
        tipo: 'imagem',
        data: '07 de Março, 2026',
        autor: 'Success Team',
        visualizacoes: '2.187',
        tags: ['Cupidatat', 'Proident', 'Deserunt']
    },
    {
        id: 6,
        categoria: 'BIBLIOTECA',
        titulo: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem',
        resumo: 'Accusantium doloremque laudantium totam rem aperiam',
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        midia: 'https://picsum.photos/id/1049/800/600',
        tipo: 'imagem',
        data: '06 de Março, 2026',
        autor: 'Library Team',
        visualizacoes: '478',
        tags: ['Perspiciatis', 'Voluptatem', 'Laudantium']
    },
    {
        id: 7,
        categoria: 'FORMATURA',
        titulo: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur',
        resumo: 'Aut odit aut fugit sed quia consequuntur magni dolores',
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        midia: 'https://picsum.photos/id/1050/800/600',
        tipo: 'imagem',
        data: '05 de Março, 2026',
        autor: 'Formatura Team',
        visualizacoes: '1.923',
        tags: ['Voluptas', 'Aspernatur', 'Consequuntur']
    }
];

// ===== CONTROLLER PRINCIPAL =====
const noticiaController = {
    // Variáveis de controle
    indiceAtual: 0,
    intervaloAutomatico: null,
    pausado: false,

    // Inicialização
    init: function() {
        this.renderizarSlider();
        this.iniciarAutoPlay();
        this.configurarEventos();
    },

    // Renderizar slider
    renderizarSlider: function() {
        const lista = document.getElementById('listaSlider');
        if (!lista) return;
        
        lista.innerHTML = noticias.slice(1).map((noticia, index) => `
            <div class="item-slider" onclick="noticiaController.abrirModal(${index + 1})">
                <div class="miniatura-slider">
                    <img src="${noticia.midia}" alt="Imagem de placeholder">
                </div>
                <div class="conteudo-slider">
                    <div class="data-slider">
                        <i class="fas fa-clock"></i>
                        ${noticia.data}
                    </div>
                    <h4 class="titulo-slider">${noticia.titulo}</h4>
                    <p class="resumo-slider">${noticia.resumo}</p>
                </div>
            </div>
        `).join('');
    },

    // Configurar eventos de mouse
    configurarEventos: function() {
        const areaSlider = document.getElementById('areaSlider');
        if (areaSlider) {
            areaSlider.addEventListener('mouseenter', () => {
                this.pausado = true;
            });
            
            areaSlider.addEventListener('mouseleave', () => {
                this.pausado = false;
            });
        }
    },

    // Auto play
    iniciarAutoPlay: function() {
        this.intervaloAutomatico = setInterval(() => {
            if (!this.pausado) {
                this.proximaNoticia();
            }
        }, 7000);
    },

    proximaNoticia: function() {
        const totalNoticias = noticias.length - 1;
        this.indiceAtual = (this.indiceAtual + 1) % totalNoticias;
        this.atualizarPosicao();
    },

    noticiaAnterior: function() {
        const totalNoticias = noticias.length - 1;
        this.indiceAtual = (this.indiceAtual - 1 + totalNoticias) % totalNoticias;
        this.atualizarPosicao();
    },

    atualizarPosicao: function() {
        const lista = document.getElementById('listaSlider');
        if (lista) {
            const deslocamento = -this.indiceAtual * 193;
            lista.style.transform = `translateY(${deslocamento}px)`;
        }
    },

    // Modal functions
    abrirModal: function(index) {
        const noticia = noticias[index];
        const modal = document.getElementById('modalDetalhes');
        
        if (!modal || !noticia) return;
        
        document.getElementById('modalCategoria').innerHTML = `<i class="fas fa-tag"></i> ${noticia.categoria}`;
        document.getElementById('modalTitulo').textContent = noticia.titulo;
        document.getElementById('modalData').textContent = noticia.data;
        document.getElementById('modalAutor').textContent = noticia.autor;
        document.getElementById('modalVisualizacoes').textContent = noticia.visualizacoes + ' visualizações';
        document.getElementById('modalDescricao').textContent = noticia.descricao;
        
        const midiaContainer = document.getElementById('modalMidia');
        if (noticia.tipo === 'video') {
            midiaContainer.innerHTML = `<video src="${noticia.midia}" controls autoplay></video>`;
        } else {
            midiaContainer.innerHTML = `<img src="${noticia.midia}" alt="Imagem de placeholder">`;
        }
        
        const tagsContainer = document.getElementById('modalTags');
        tagsContainer.innerHTML = noticia.tags.map(tag => 
            `<span class="tag-item"><i class="fas fa-hashtag"></i>${tag}</span>`
        ).join('');
        
        modal.classList.add('visivel');
        document.body.style.overflow = 'hidden';
    },

    fecharModal: function() {
        const modal = document.getElementById('modalDetalhes');
        if (modal) {
            modal.classList.remove('visivel');
            document.body.style.overflow = '';
            
            const videos = document.querySelectorAll('.modal-midia video');
            videos.forEach(video => video.pause());
        }
    }
};

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    noticiaController.init();
    
    // Configurar eventos globais do modal
    const modal = document.getElementById('modalDetalhes');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                noticiaController.fecharModal();
            }
        });
    }
    
    // Atalho de teclado ESC para fechar modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            noticiaController.fecharModal();
        }
    });
});