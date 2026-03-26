/* ===== DADOS DA GALERIA COM IMAGENS E VÍDEOS ===== */
        const galeriaItens = [
            // Fotos Gerais
            { tipo: 'imagem', categoria: 'fotos-gerais', legenda: 'Sala de Aula – IPIKK', url: 'https://picsum.photos/id/20/1200/800' },
            { tipo: 'imagem', categoria: 'fotos-gerais', legenda: 'Vista do Instituto', url: 'https://picsum.photos/id/104/1200/800' },
            { tipo: 'imagem', categoria: 'fotos-gerais', legenda: 'Pátio do Instituto', url: 'https://picsum.photos/id/96/1200/800' },
            { tipo: 'video', categoria: 'fotos-gerais', legenda: 'Tour pelo Instituto', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
            
            // Técnico de Obras
            { tipo: 'imagem', categoria: 'tecnico-obras', legenda: 'Curso Técnico de Obras', url: 'https://picsum.photos/id/15/1200/800' },
            { tipo: 'imagem', categoria: 'tecnico-obras', legenda: 'Prática de Obras', url: 'https://picsum.photos/id/1/1200/800' },
            { tipo: 'video', categoria: 'tecnico-obras', legenda: 'Aula Prática de Topografia', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
            
            // Desenhador Projectista
            { tipo: 'imagem', categoria: 'desenhador-projectista', legenda: 'Desenhador Projectista', url: 'https://picsum.photos/id/108/1200/800' },
            { tipo: 'video', categoria: 'desenhador-projectista', legenda: 'Software de Desenho Técnico', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
            
            // Energia e Instalações
            { tipo: 'imagem', categoria: 'energia-instalacoes', legenda: 'Curso de Energia e Instalações', url: 'https://picsum.photos/id/122/1200/800' },
            { tipo: 'video', categoria: 'energia-instalacoes', legenda: 'Instalação Elétrica na Prática', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
            
            // Frio e Climatização
            { tipo: 'imagem', categoria: 'frio-climatizacao', legenda: 'Curso de Frio e Climatização', url: 'https://picsum.photos/id/30/1200/800' },
            { tipo: 'video', categoria: 'frio-climatizacao', legenda: 'Manutenção de Ar Condicionado', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
            
            // Gestão de Sistemas
            { tipo: 'imagem', categoria: 'gestao-sistemas', legenda: 'Curso de Gestão de Sistemas', url: 'https://picsum.photos/id/0/1200/800' },
            { tipo: 'video', categoria: 'gestao-sistemas', legenda: 'Aula de Redes de Computadores', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
            
            // Técnico de Informática
            { tipo: 'imagem', categoria: 'tecnico-informatica', legenda: 'Curso Técnico de Informática', url: 'https://picsum.photos/id/26/1200/800' },
            { tipo: 'video', categoria: 'tecnico-informatica', legenda: 'Manutenção de Computadores', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
            
            // Tecnologias de Móveis
            { tipo: 'imagem', categoria: 'tecnologias-moveis', legenda: 'Curso de Tecnologias de Móveis', url: 'https://picsum.photos/id/18/1200/800' },
            { tipo: 'video', categoria: 'tecnologias-moveis', legenda: 'Oficina de Marcenaria', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        ];

        /* ===== CONTROLLER PRINCIPAL DA GALERIA ===== */
        const galeriaController = {
            elementos: {
                filtroSelect: null,
                galeria: null,
                semResultados: null,
                lightbox: null,
                conteudoLightbox: null,
                legendaLightbox: null,
                fecharLightbox: null,
                setaAnterior: null,
                setaProximo: null,
                botaoTopo: null
            },

            itensVisiveis: [],
            indiceAtual: 0,

            init: function() {
                this.capturarElementos();
                this.configurarEventos();
                this.renderizarGaleria('todos');
                this.estadoInicial();
            },

            capturarElementos: function() {
                this.elementos.filtroSelect = document.getElementById('filtroSelect');
                this.elementos.galeria = document.getElementById('galeria');
                this.elementos.lightbox = document.getElementById('lightbox');
                this.elementos.conteudoLightbox = document.getElementById('conteudoLightbox');
                this.elementos.legendaLightbox = document.getElementById('legendaLightbox');
                this.elementos.fecharLightbox = document.getElementById('fecharLightbox');
                this.elementos.setaAnterior = document.getElementById('setaAnterior');
                this.elementos.setaProximo = document.getElementById('setaProximo');
                this.elementos.botaoTopo = document.getElementById('botaoTopo');
            },

            estadoInicial: function() {
                if (this.elementos.botaoTopo) {
                    this.elementos.botaoTopo.style.opacity = '0';
                    this.elementos.botaoTopo.style.pointerEvents = 'none';
                }
                if (this.elementos.lightbox) {
                    this.elementos.lightbox.classList.remove('ativo');
                }
            },

            configurarEventos: function() {
                this.eventoScroll();
                this.eventoBotaoTopo();
                this.eventoFiltro();
                this.eventoLightbox();
            },

            eventoScroll: function() {
                window.addEventListener('scroll', () => {
                    this.controlarBotaoTopo();
                });
            },

            controlarBotaoTopo: function() {
                if (this.elementos.botaoTopo) {
                    const mostrar = window.scrollY > 300;
                    this.elementos.botaoTopo.style.opacity = mostrar ? '1' : '0';
                    this.elementos.botaoTopo.style.pointerEvents = mostrar ? 'auto' : 'none';
                }
            },

            eventoBotaoTopo: function() {
                if (this.elementos.botaoTopo) {
                    this.elementos.botaoTopo.addEventListener('click', () => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    });
                }
            },

            eventoFiltro: function() {
                if (this.elementos.filtroSelect) {
                    this.elementos.filtroSelect.addEventListener('change', (e) => {
                        this.renderizarGaleria(e.target.value);
                    });
                }
            },

            renderizarGaleria: function(categoria) {
                const itensFiltrados = galeriaItens.filter(item => 
                    categoria === 'todos' || item.categoria === categoria
                );

                this.itensVisiveis = itensFiltrados;

                if (itensFiltrados.length === 0) {
                    this.elementos.galeria.innerHTML = `
                        <div class="sem-resultados" style="display: block;">
                            <i class="fas fa-images"></i>
                            Nenhuma mídia encontrada nesta categoria.
                        </div>
                    `;
                    return;
                }

                this.elementos.galeria.innerHTML = itensFiltrados.map((item, index) => {
                    const badgeClass = this.getBadgeClass(item.categoria);
                    const badgeNome = this.getBadgeNome(item.categoria);
                    
                    return `
                        <div class="item-galeria" data-categoria="${item.categoria}" data-legenda="${item.legenda}" data-index="${index}" data-tipo="${item.tipo}" data-url="${item.url}">
                            <div class="envoltorio-midia">
                                ${item.tipo === 'imagem' 
                                    ? `<img src="${item.url}" alt="${item.legenda}" loading="lazy">`
                                    : `<video src="${item.url}" loading="lazy" muted></video>`
                                }
                                <div class="sobreposicao-midia">
                                    <button class="botao-acao botao-expandir" title="Ver em tamanho completo"><i class="fas fa-expand"></i></button>
                                    ${item.tipo === 'imagem' ? `<button class="botao-acao botao-baixar" title="Baixar foto"><i class="fas fa-download"></i></button>` : ''}
                                </div>
                                ${item.tipo === 'video' ? '<div class="indicador-video"><i class="fas fa-play"></i></div>' : ''}
                                <span class="badge-categoria ${badgeClass}">${badgeNome}</span>
                            </div>
                            <div class="legenda-midia">${item.legenda}</div>
                        </div>
                    `;
                }).join('');

                this.configurarBotoesAcao();
            },

            getBadgeClass: function(categoria) {
                const classes = {
                    'fotos-gerais': 'badge-fotos-gerais',
                    'tecnico-obras': 'badge-tecnico-obras',
                    'desenhador-projectista': 'badge-desenhador-projectista',
                    'energia-instalacoes': 'badge-energia-instalacoes',
                    'frio-climatizacao': 'badge-frio-climatizacao',
                    'gestao-sistemas': 'badge-gestao-sistemas',
                    'tecnico-informatica': 'badge-tecnico-informatica',
                    'tecnologias-moveis': 'badge-tecnologias-moveis'
                };
                return classes[categoria] || 'badge-fotos-gerais';
            },

            getBadgeNome: function(categoria) {
                const nomes = {
                    'fotos-gerais': 'Fotos Gerais',
                    'tecnico-obras': 'Técnico de Obras',
                    'desenhador-projectista': 'Desenhador Projectista',
                    'energia-instalacoes': 'Energia e Instalações',
                    'frio-climatizacao': 'Frio e Climatização',
                    'gestao-sistemas': 'Gestão de Sistemas',
                    'tecnico-informatica': 'Técnico de Informática',
                    'tecnologias-moveis': 'Tecnologias de Móveis'
                };
                return nomes[categoria] || 'Fotos Gerais';
            },

            configurarBotoesAcao: function() {
                document.querySelectorAll('.botao-expandir').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        const item = btn.closest('.item-galeria');
                        if (item) {
                            const index = parseInt(item.dataset.index);
                            const categoriaAtual = this.elementos.filtroSelect.value;
                            const itensAtuais = galeriaItens.filter(i => 
                                categoriaAtual === 'todos' || i.categoria === categoriaAtual
                            );
                            this.itensVisiveis = itensAtuais;
                            this.indiceAtual = index;
                            this.abrirLightbox();
                        }
                    });
                });

                document.querySelectorAll('.botao-baixar').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        const item = btn.closest('.item-galeria');
                        if (item) {
                            const url = item.dataset.url;
                            const legenda = item.dataset.legenda;
                            this.baixarImagem(url, legenda);
                        }
                    });
                });

                document.querySelectorAll('.item-galeria').forEach(item => {
                    const wrapper = item.querySelector('.envoltorio-midia');
                    if (wrapper) {
                        wrapper.addEventListener('click', (e) => {
                            if (e.target.closest('.botao-acao')) return;
                            const index = parseInt(item.dataset.index);
                            const categoriaAtual = this.elementos.filtroSelect.value;
                            const itensAtuais = galeriaItens.filter(i => 
                                categoriaAtual === 'todos' || i.categoria === categoriaAtual
                            );
                            this.itensVisiveis = itensAtuais;
                            this.indiceAtual = index;
                            this.abrirLightbox();
                        });
                    }
                });
            },

            baixarImagem: function(url, nomeArquivo) {
                fetch(url)
                    .then(response => response.blob())
                    .then(blob => {
                        const blobUrl = URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = blobUrl;
                        link.download = nomeArquivo.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.jpg';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        URL.revokeObjectURL(blobUrl);
                    })
                    .catch(() => window.open(url, '_blank'));
            },

            eventoLightbox: function() {
                if (!this.elementos.lightbox) return;

                if (this.elementos.setaAnterior) {
                    this.elementos.setaAnterior.addEventListener('click', (e) => {
                        e.stopPropagation();
                        this.navegarLightbox('anterior');
                    });
                }

                if (this.elementos.setaProximo) {
                    this.elementos.setaProximo.addEventListener('click', (e) => {
                        e.stopPropagation();
                        this.navegarLightbox('proximo');
                    });
                }

                if (this.elementos.fecharLightbox) {
                    this.elementos.fecharLightbox.addEventListener('click', (e) => {
                        e.stopPropagation();
                        this.fecharLightbox();
                    });
                }

                this.elementos.lightbox.addEventListener('click', (e) => {
                    if (e.target === this.elementos.lightbox) this.fecharLightbox();
                });

                document.addEventListener('keydown', (e) => {
                    if (!this.elementos.lightbox.classList.contains('ativo')) return;
                    if (e.key === 'Escape') this.fecharLightbox();
                    if (e.key === 'ArrowLeft') this.navegarLightbox('anterior');
                    if (e.key === 'ArrowRight') this.navegarLightbox('proximo');
                });
            },

            abrirLightbox: function() {
                this.renderizarLightbox();
                this.elementos.lightbox.classList.add('ativo');
                document.body.style.overflow = 'hidden';
            },

            renderizarLightbox: function() {
                const item = this.itensVisiveis[this.indiceAtual];
                if (!item) return;

                const legenda = item.legenda;

                if (item.tipo === 'imagem') {
                    this.elementos.conteudoLightbox.innerHTML = `<img src="${item.url}" alt="${legenda}" class="imagem-lightbox" onclick="event.stopPropagation()">`;
                } else {
                    this.elementos.conteudoLightbox.innerHTML = `<video src="${item.url}" controls autoplay class="video-lightbox" onclick="event.stopPropagation()"></video>`;
                }

                this.elementos.legendaLightbox.textContent = legenda;

                if (this.elementos.setaAnterior && this.elementos.setaProximo) {
                    const temSetas = this.itensVisiveis.length > 1;
                    this.elementos.setaAnterior.style.display = temSetas ? 'flex' : 'none';
                    this.elementos.setaProximo.style.display = temSetas ? 'flex' : 'none';
                }
            },

            navegarLightbox: function(direcao) {
                if (this.itensVisiveis.length === 0) return;
                if (direcao === 'anterior') {
                    this.indiceAtual = (this.indiceAtual - 1 + this.itensVisiveis.length) % this.itensVisiveis.length;
                } else {
                    this.indiceAtual = (this.indiceAtual + 1) % this.itensVisiveis.length;
                }
                this.renderizarLightbox();
            },

            fecharLightbox: function() {
                this.elementos.lightbox.classList.remove('ativo');
                document.body.style.overflow = '';
                const video = this.elementos.conteudoLightbox.querySelector('video');
                if (video) video.pause();
                setTimeout(() => {
                    if (!this.elementos.lightbox.classList.contains('ativo')) {
                        this.elementos.conteudoLightbox.innerHTML = '';
                    }
                }, 300);
            }
        };

        document.addEventListener('DOMContentLoaded', function() {
            galeriaController.init();
        });