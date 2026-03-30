const galeriaController = {
    itens: [],
    itensVisiveis: [],
    indiceAtual: 0,

    async init() {
        this.capturarElementos();
        this.configurarEventos();
        await this.carregarGaleria();
        this.renderizarGaleria('todos');
    },

    capturarElementos() {
        this.filtro = document.getElementById('filtroSelect');
        this.galeria = document.getElementById('galeria');
        this.lightbox = document.getElementById('lightbox');
        this.conteudoLightbox = document.getElementById('conteudoLightbox');
        this.legendaLightbox = document.getElementById('legendaLightbox');
        this.fecharLightbox = document.getElementById('fecharLightbox');
        this.setaAnterior = document.getElementById('setaAnterior');
        this.setaProximo = document.getElementById('setaProximo');
    },

    configurarEventos() {
        this.filtro?.addEventListener('change', (e) => this.renderizarGaleria(e.target.value));
        this.fecharLightbox?.addEventListener('click', () => this.fechar());
        this.setaAnterior?.addEventListener('click', () => this.navegar(-1));
        this.setaProximo?.addEventListener('click', () => this.navegar(1));
        this.lightbox?.addEventListener('click', (e) => { if (e.target === this.lightbox) this.fechar(); });
    },

    async carregarGaleria() {
        try {
            const response = await fetch('/api/public/galeria', { headers: { 'X-Requested-With': 'XMLHttpRequest' } });
            const data = await response.json();
            this.itens = Array.isArray(data) ? data.filter(i => i.tipo === 'imagem') : [];
        } catch (_) {
            this.itens = [];
        }
    },

    renderizarGaleria(categoria) {
        const filtrados = this.itens.filter(item => categoria === 'todos' || item.categoria === categoria);
        this.itensVisiveis = filtrados;

        if (!this.galeria) return;
        if (!filtrados.length) {
            this.galeria.innerHTML = '<div class="sem-resultados" style="display:block"><i class="fas fa-images"></i>Nenhuma imagem disponível nesta categoria.</div>';
            return;
        }

        this.galeria.innerHTML = filtrados.map((item, index) => `
            <div class="item-galeria" data-index="${index}">
                <div class="envoltorio-midia">
                    <img src="${item.url}" alt="${item.legenda || 'Imagem da galeria'}" loading="lazy">
                    <div class="sobreposicao-midia">
                        <button class="botao-acao botao-expandir" title="Ver"><i class="fas fa-expand"></i></button>
                    </div>
                    <span class="badge-categoria badge-fotos-gerais">${item.categoria}</span>
                </div>
                <div class="legenda-midia">${item.legenda || ''}</div>
            </div>
        `).join('');

        this.galeria.querySelectorAll('.item-galeria').forEach((card) => {
            card.addEventListener('click', () => {
                this.indiceAtual = Number(card.dataset.index);
                this.abrir();
            });
        });
    },

    abrir() {
        const item = this.itensVisiveis[this.indiceAtual];
        if (!item || !this.lightbox) return;
        this.conteudoLightbox.innerHTML = `<img src="${item.url}" alt="${item.legenda || ''}">`;
        this.legendaLightbox.textContent = item.legenda || '';
        this.lightbox.classList.add('ativo');
    },

    fechar() {
        this.lightbox?.classList.remove('ativo');
    },

    navegar(dir) {
        if (!this.itensVisiveis.length) return;
        this.indiceAtual = (this.indiceAtual + dir + this.itensVisiveis.length) % this.itensVisiveis.length;
        this.abrir();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    galeriaController.init();
});
