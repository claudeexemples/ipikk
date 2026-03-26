// ===== DADOS DAS NOTÍCIAS =====
const dadosNoticias = [
    {
        id: 0,
        categoria: 'DESTAQUE',
        titulo: 'Cerimónia de Abertura do Ano Lectivo 2026',
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        resumo: 'O Instituto IPIKK deu início mais um ano lectivo com uma cerimónia solene.',
        legenda: 'Cerimónia de abertura do ano lectivo 2026 no auditório principal do IPIKK.',
        midia: 'https://via.placeholder.com/800x450/003072/ffffff?text=Cerimonia+Abertura',
        tipoMidia: 'imagem',
        data: '15 JAN 2026',
        dataCompleta: '15 de Janeiro, 2026',
        autor: 'Gabinete de Comunicação IPIKK',
        visualizacoes: '1.245',
        tags: ['Ano Lectivo', 'Cerimónia', 'IPIKK']
    },
    {
        id: 1,
        categoria: 'EVENTOS',
        titulo: 'Workshop de Inovação Tecnológica',
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        resumo: 'Workshop sobre as últimas tendências em tecnologia industrial.',
        legenda: 'Alunos durante o workshop de inovação tecnológica.',
        midia: 'https://via.placeholder.com/800x450/2e86c1/ffffff?text=Workshop+Tecnologia',
        tipoMidia: 'imagem',
        data: '10 JAN 2026',
        dataCompleta: '10 de Janeiro, 2026',
        autor: 'Departamento de Informática',
        visualizacoes: '892',
        tags: ['Workshop', 'Tecnologia', 'Inovação']
    },
    {
        id: 2,
        categoria: 'PARCERIA',
        titulo: 'Visita de Estudo ao Porto de Luanda',
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        resumo: 'Visita técnica ao Porto de Luanda com alunos de Construção Civil e Electricidade.',
        legenda: 'Grupo de alunos durante visita técnica ao Porto de Luanda.',
        midia: 'https://via.placeholder.com/800x450/e67e22/ffffff?text=Visita+Porto+Luanda',
        tipoMidia: 'imagem',
        data: '05 JAN 2026',
        dataCompleta: '05 de Janeiro, 2026',
        autor: 'Departamento Pedagógico',
        visualizacoes: '657',
        tags: ['Visita de Estudo', 'Porto de Luanda']
    }
];

// ===== FUNÇÕES DAS NOTÍCIAS =====
function renderizarNoticias() {
    const grade = document.getElementById('gradeNoticias');
    if (!grade) return;

    grade.innerHTML = dadosNoticias.map(n => `
        <article class="cartao-noticia">
            <div class="cartao-imagem">
                <img src="${n.midia}" alt="${n.titulo}">
            </div>
            <div class="cartao-conteudo">
                <span class="badge-data"><i class="fa-regular fa-calendar-days"></i> ${n.data}</span>
                <h3 class="cartao-titulo">${n.titulo}</h3>
                <p class="cartao-descricao">${n.resumo}</p>
                <button class="link-ler-mais" onclick="abrirModalNoticia(${n.id})">
                    Ler Mais <i class="fa-solid fa-arrow-right"></i>
                </button>
            </div>
        </article>
    `).join('');
}

// ===== FUNÇÕES DO MODAL =====
window.abrirModalNoticia = function(id) {
    const noticia = dadosNoticias.find(n => n.id === id);
    if (!noticia) return;

    const modal = document.getElementById('modalNoticia');
    const midiaEl = document.getElementById('modalMidia');
    const badgeTexto = document.getElementById('modalBadgeTexto');
    const legendaEl = document.getElementById('modalLegendaTexto');
    const legendaIcone = document.querySelector('#modalLegenda i');

    if (!modal || !midiaEl) return;

    badgeTexto.textContent = noticia.categoria;

    const midiaAnterior = midiaEl.querySelector('img, video');
    if (midiaAnterior) midiaAnterior.remove();

    if (noticia.tipoMidia === 'video') {
        const vid = document.createElement('video');
        vid.src = noticia.midia;
        vid.controls = true;
        vid.autoplay = true;
        vid.style.width = '100%';
        vid.style.height = '100%';
        vid.style.objectFit = 'cover';
        midiaEl.insertBefore(vid, midiaEl.firstChild);
        if (legendaIcone) legendaIcone.className = 'fas fa-video';
    } else {
        const img = document.createElement('img');
        img.src = noticia.midia;
        img.alt = noticia.titulo;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        midiaEl.insertBefore(img, midiaEl.firstChild);
        if (legendaIcone) legendaIcone.className = 'fas fa-camera';
    }

    legendaEl.textContent = noticia.legenda;

    document.getElementById('modalTitulo').textContent = noticia.titulo;
    document.getElementById('modalData').textContent = noticia.dataCompleta;
    document.getElementById('modalAutor').textContent = noticia.autor;
    document.getElementById('modalVisualizacoes').textContent = noticia.visualizacoes + ' visualizações';
    document.getElementById('modalDescricao').textContent = noticia.descricao;

    const tagsContainer = document.getElementById('modalTags');
    if (tagsContainer) {
        tagsContainer.innerHTML = noticia.tags
            .map(t => `<span class="tag-item"><i class="fas fa-hashtag"></i>${t}</span>`)
            .join('');
    }

    modal.classList.add('visivel');
    document.body.style.overflow = 'hidden';
};

window.fecharModalNoticia = function() {
    const modal = document.getElementById('modalNoticia');
    if (!modal) return;
    
    modal.classList.remove('visivel');
    document.body.style.overflow = '';
    modal.querySelectorAll('video').forEach(v => v.pause());
};

// ===== SLIDER HERO COM ANIMAÇÃO DE DIGITAÇÃO =====
(function() {
    console.log('Inicializando Slider Hero...');
    
    const slides = document.querySelectorAll('.slide');
    const pontos = document.querySelectorAll('.ponto');
    const texto1 = document.getElementById('textoDigitado1');
    const texto2 = document.getElementById('textoDigitado2');
    const texto3 = document.getElementById('textoDigitado3');
    
    if (!slides.length || !pontos.length) {
        console.log('Slides não encontrados');
        return;
    }
    
    console.log('Slides encontrados:', slides.length);
    
    let slideAtual = 0;
    let timeoutDigitar;
    let timeoutProximo;
    
    const textosCompletos = [
        'Lorem ipsum dolor sit amet',
        'Formando profissionais técnicos',
        'Educação moderna para o futuro'
    ];
    
    // Função para digitar o texto
    function digitarTexto(elemento, texto, callback) {
        if (!elemento) return;
        
        let i = 0;
        elemento.textContent = '';
        
        function digitar() {
            if (i < texto.length) {
                elemento.textContent += texto.charAt(i);
                i++;
                timeoutDigitar = setTimeout(digitar, 100);
            } else {
                if (callback) callback();
            }
        }
        
        digitar();
    }
    
    // Função para mostrar um slide específico
    function mostrarSlide(indice) {
        console.log('Mostrando slide:', indice);
        
        // Remove classe ativo de todos
        slides.forEach(s => s.classList.remove('ativo'));
        pontos.forEach(p => p.classList.remove('ativo'));
        
        // Adiciona classe ativo ao slide e ponto atual
        slides[indice].classList.add('ativo');
        pontos[indice].classList.add('ativo');
        
        slideAtual = indice;
        
        // Para qualquer digitação em andamento
        if (timeoutDigitar) clearTimeout(timeoutDigitar);
        if (timeoutProximo) clearTimeout(timeoutProximo);
        
        // Digita o texto do slide atual
        const elementoAtual = indice === 0 ? texto1 : indice === 1 ? texto2 : texto3;
        
        digitarTexto(elementoAtual, textosCompletos[indice], function() {
            // Quando terminar de digitar, espera 2 segundos e vai para o próximo
            timeoutProximo = setTimeout(function() {
                let proximo = (slideAtual + 1) % slides.length;
                mostrarSlide(proximo);
            }, 2000);
        });
    }
    
    // Configurar eventos dos pontos
    pontos.forEach((ponto, indice) => {
        ponto.addEventListener('click', function() {
            if (indice !== slideAtual) {
                if (timeoutDigitar) clearTimeout(timeoutDigitar);
                if (timeoutProximo) clearTimeout(timeoutProximo);
                mostrarSlide(indice);
            }
        });
    });
    
    // Iniciar com o primeiro slide
    mostrarSlide(0);
})();

// ===== SLIDER PARCEIROS =====
(function() {
    const slider = document.getElementById('sliderParceiros');
    if (!slider) return;
    
    // Clona os itens para efeito infinito
    Array.from(slider.children).forEach(p => {
        slider.appendChild(p.cloneNode(true));
    });
    
    let pos = 0;
    
    function animar() {
        pos -= 0.5;
        if (pos <= -slider.scrollWidth / 2) {
            pos = 0;
        }
        slider.style.transform = `translateX(${pos}px)`;
        requestAnimationFrame(animar);
    }
    
    animar();
})();

// ===== DEPOIMENTOS =====
(function() {
    const depoimentos = [
        { nome: 'João Silva', curso: 'Electricidade (Turma 2018)', empresa: 'ENDE – Electricista', texto: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga illo, iste ducimus sit aspernatur facere eligendi magnam corrupti soluta reprehenderit neque pariatur totam debitis error amet ipsam laboriosam quod doloremque.' },
        { nome: 'Maria Santos', curso: 'Informática (Turma 2019)', empresa: 'ITEL – Gestora de Sistemas', texto: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam fugiat, itaque nesciunt at illum vel soluta minus harum corrupti magni maxime natus atque necessitatibus pariatur consectetur! Dolores ipsam consequatur ratione.' },
        { nome: 'António Ferreira', curso: 'Construção Civil (Turma 2017)', empresa: 'FADCOM – Coordenador de Obras', texto: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione totam quidem corrupti nostrum fugit? Minus autem numquam dolor illum omnis eos nulla inventore quaerat quae quis alias accusantium, error consectetur?' },
        { nome: 'Paulo Gomes', curso: 'Mecânica (Turma 2020)', empresa: 'Auto-Serviço Luanda – Técnico', texto: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque libero voluptates in maiores natus! Eveniet dolor eius cum quis quod magnam alias debitis rerum, optio perferendis ratione? Maiores, quod consequuntur.' }
    ];

    const nomeEl = document.getElementById('nome-alumni');
    const cursoEl = document.getElementById('curso-alumni');
    const empresaEl = document.getElementById('empresa-alumni');
    const textoEl = document.getElementById('texto-depoimento');
    const estrelasEl = document.getElementById('bloco-estrelas');
    const pontosContainer = document.getElementById('pontos-indicadores');
    const botaoAnterior = document.getElementById('botao-anterior');
    const botaoProximo = document.getElementById('botao-proximo');

    if (!nomeEl || !pontosContainer) return;

    let indiceAtual = 0;
    let intervalo;
    let pausar = false;

    // REMOVA a função renderizarEstrelas completamente
    // function renderizarEstrelas(quantidade) { ... }  // APAGUE ESTA FUNÇÃO

    function mostrarDepoimento(indice) {
        const dep = depoimentos[indice];
        nomeEl.textContent = dep.nome;
        cursoEl.textContent = dep.curso;
        empresaEl.textContent = dep.empresa;
        textoEl.textContent = dep.texto;
        // REMOVA ou comente a linha que renderiza as estrelas:
        // estrelasEl.innerHTML = renderizarEstrelas(dep.estrelas);
        estrelasEl.innerHTML = ''; // Deixa o container de estrelas vazio
        
        document.querySelectorAll('.ponto-indicador').forEach((p, i) => {
            p.classList.toggle('ativo', i === indice);
        });
    }

    function proximoDepoimento() {
        if (!pausar) {
            indiceAtual = (indiceAtual + 1) % depoimentos.length;
            mostrarDepoimento(indiceAtual);
        }
    }

    // Criar pontos indicadores
    pontosContainer.innerHTML = '';
    depoimentos.forEach((_, i) => {
        const ponto = document.createElement('span');
        ponto.className = 'ponto-indicador' + (i === 0 ? ' ativo' : '');
        ponto.addEventListener('click', () => {
            indiceAtual = i;
            mostrarDepoimento(indiceAtual);
            pausar = false;
        });
        pontosContainer.appendChild(ponto);
    });

    if (botaoAnterior) {
        botaoAnterior.addEventListener('click', () => {
            indiceAtual = (indiceAtual - 1 + depoimentos.length) % depoimentos.length;
            mostrarDepoimento(indiceAtual);
            pausar = false;
        });
    }

    if (botaoProximo) {
        botaoProximo.addEventListener('click', () => {
            indiceAtual = (indiceAtual + 1) % depoimentos.length;
            mostrarDepoimento(indiceAtual);
            pausar = false;
        });
    }

    // Pausar ao passar o mouse
    const areaSlider = document.querySelector('.area-slider');
    if (areaSlider) {
        areaSlider.addEventListener('mouseenter', () => pausar = true);
        areaSlider.addEventListener('mouseleave', () => pausar = false);
    }

    mostrarDepoimento(0);
    intervalo = setInterval(proximoDepoimento, 5000);
})();

// ===== INICIALIZAR NOTÍCIAS =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado, renderizando notícias...');
    renderizarNoticias();
});

if (document.readyState !== 'loading') {
    renderizarNoticias();
}