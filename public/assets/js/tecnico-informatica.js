// ==============================================================
//  DADOS DOS PDFs POR CLASSE
// ==============================================================
const dadosPdf = {
    10: {
        titulo: 'Plano Curricular — 10ª Classe',
        descricao: 'Técnico de Informática · 10ª Classe · Ano Lectivo 2025-2026',
        url: 'documentos/plano-curricular-10-classe.pdf'
    },
    11: {
        titulo: 'Plano Curricular — 11ª Classe',
        descricao: 'Técnico de Informática · 11ª Classe · Ano Lectivo 2025-2026',
        url: 'documentos/plano-curricular-11-classe.pdf'
    },
    12: {
        titulo: 'Plano Curricular — 12ª Classe',
        descricao: 'Técnico de Informática · 12ª Classe · Ano Lectivo 2025-2026',
        url: 'documentos/plano-curricular-12-classe.pdf'
    },
    13: {
        titulo: 'Plano Curricular — 13ª Classe',
        descricao: 'Técnico de Informática · 13ª Classe · Ano Lectivo 2025-2026',
        url: 'documentos/plano-curricular-13-classe.pdf'
    }
};

let classeActiva = 10;

// ==============================================================
//  FUNÇÕES DO PLANO CURRICULAR
// ==============================================================
function atualizarPdf(classe) {
    const dados = dadosPdf[classe];
    const container = document.getElementById('conteudoPlano');

    if (!container || !dados) return;

    container.style.opacity = '0';
    container.style.transform = 'translateY(8px)';

    setTimeout(() => {
        container.innerHTML = `
            <div class="bloco-documento-pdf">
                <div class="info-pdf">
                    <div class="icone-pdf">
                        <i class="fas fa-file-pdf"></i>
                    </div>
                    <div class="textos-pdf">
                        <span class="rotulo-pdf">Documento Oficial</span>
                        <span class="titulo-pdf">${dados.titulo}</span>
                        <span class="descricao-pdf">${dados.descricao}</span>
                    </div>
                </div>
                <a href="${dados.url}" class="botao-ver-documento" target="_blank" download>
                    <i class="fas fa-download"></i>
                    Baixar PDF
                </a>
            </div>
        `;

        container.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
    }, 180);
}

function inicializarAbasPlano() {
    const botoesAba = document.querySelectorAll('.botao-aba');
    
    botoesAba.forEach(btn => {
        btn.addEventListener('click', function () {
            const classe = parseInt(this.dataset.classe);
            if (classe === classeActiva) return;

            botoesAba.forEach(b => b.classList.remove('ativo'));
            this.classList.add('ativo');

            classeActiva = classe;
            atualizarPdf(classe);
        });
    });
}

// ==============================================================
//  DADOS DAS SAÍDAS PROFISSIONAIS COM IMAGENS
// ==============================================================
const dadosSaidas = [
    {
        id: 1,
        titulo: "Técnico de Hardware",
        descricao: "Realiza montagem, manutenção e reparo de computadores e periféricos.",
        competencias: ["Hardware", "Manutenção", "Diagnóstico"],
        imagem: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&q=80",
        imagemFallback: "fas fa-microchip"
    },
    {
        id: 2,
        titulo: "Técnico de Redes",
        descricao: "Instala e configura redes de computadores, roteadores e switches.",
        competencias: ["Redes", "TCP/IP", "Cabeamento"],
        imagem: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
        imagemFallback: "fas fa-network-wired"
    },
    {
        id: 3,
        titulo: "Suporte Técnico",
        descricao: "Presta assistência técnica a utilizadores, resolvendo problemas de software e hardware.",
        competencias: ["Atendimento", "Diagnóstico", "Soluções"],
        imagem: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
        imagemFallback: "fas fa-headset"
    },
    {
        id: 4,
        titulo: "Administrador de Sistemas",
        descricao: "Gerencia servidores, sistemas operativos e infraestrutura de TI.",
        competencias: ["Servidores", "Linux", "Windows Server"],
        imagem: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
        imagemFallback: "fas fa-server"
    },
    {
        id: 5,
        titulo: "Técnico de Segurança Informática",
        descricao: "Implementa medidas de segurança, firewalls e políticas de proteção de dados.",
        competencias: ["Segurança", "Firewall", "Criptografia"],
        imagem: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
        imagemFallback: "fas fa-shield-alt"
    },
    {
        id: 6,
        titulo: "Instalador de Sistemas",
        descricao: "Instala e configura sistemas operativos, softwares e aplicações.",
        competencias: ["SO", "Aplicações", "Configuração"],
        imagem: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
        imagemFallback: "fas fa-download"
    }
];

// ==============================================================
//  FUNÇÃO PARA RENDERIZAR SAÍDAS PROFISSIONAIS
// ==============================================================
function renderizarSaidas() {
    const grade = document.getElementById('gradeSaidas');
    if (!grade) return;

    grade.innerHTML = dadosSaidas.map(saida => {
        const temImagem = saida.imagem && saida.imagem !== 'null' && saida.imagem !== null;
        
        let imagemHtml;
        if (temImagem) {
            imagemHtml = `<div class="imagem-saida"><img src="${saida.imagem}" alt="${saida.titulo}" onerror="this.parentElement.innerHTML='<div class=imagem-saida-fallback><i class=${saida.imagemFallback}></i></div>'"></div>`;
        } else {
            imagemHtml = `<div class="imagem-saida-fallback"><i class="${saida.imagemFallback}"></i></div>`;
        }
        
        const competenciasHtml = saida.competencias
            .map(comp => `<span class="etiqueta-competencia">${comp}</span>`)
            .join('');

        return `
            <div class="cartao-saida" data-id="${saida.id}">
                ${imagemHtml}
                <div class="cabecalho-saida">
                    <h3 class="titulo-saida">${saida.titulo}</h3>
                </div>
                <div class="corpo-saida">
                    <p class="descricao-saida">${saida.descricao}</p>
                    <div class="competencias-saida">
                        ${competenciasHtml}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ==============================================================
//  FUNÇÃO PARA INICIALIZAR DEPOIMENTOS
// ==============================================================
// ==============================================================
//  FUNÇÃO PARA INICIALIZAR DEPOIMENTOS (SEM ESTRELAS)
// ==============================================================
function inicializarDepoimentos() {
    const depoimentos = [
        {
            nome: "João Silva",
            curso: "Desenhador Projectista (Turma 2018)",
            empresa: "Estúdio Arquitetura - Projetista",
            texto: "O curso de Desenhador Projectista no IPIKK me deu as ferramentas necessárias para atuar no mercado de projetos. Hoje trabalho com AutoCAD e Revit diariamente."
        },
        {
            nome: "Maria Santos",
            curso: "Desenhador Projectista (Turma 2019)",
            empresa: "Construtora Moderna - Modeladora BIM",
            texto: "A formação em BIM foi fundamental para minha carreira. O IPIKK tem excelentes laboratórios e professores atualizados com as tendências do mercado."
        },
        {
            nome: "António Ferreira",
            curso: "Desenhador Projectista (Turma 2017)",
            empresa: "Projeta - Projetista de Estruturas",
            texto: "Excelente curso! A parte prática de modelagem 3D é muito completa. Recomendo a todos que desejam atuar na área de projetos."
        },
        {
            nome: "Paulo Gomes",
            curso: "Desenhador Projectista (Turma 2020)",
            empresa: "Visual Studio - Renderizador 3D",
            texto: "O IPIKK me deu a base necessária para atuar com visualização arquitetônica. Hoje crio renderizações para grandes projetos."
        }
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

    // REMOVIDA a função renderizarEstrelas() - não é mais necessária

    function mostrarDepoimento(i) {
        const dep = depoimentos[i];
        nomeEl.textContent = dep.nome;
        cursoEl.textContent = dep.curso;
        empresaEl.textContent = dep.empresa;
        textoEl.textContent = dep.texto;
        
        // Remove as estrelas - deixa o bloco vazio
        if (estrelasEl) {
            estrelasEl.innerHTML = '';
        }
        
        document.querySelectorAll('.ponto').forEach((ponto, j) => {
            if (j === i) {
                ponto.classList.add('ativo');
            } else {
                ponto.classList.remove('ativo');
            }
        });
    }

    function iniciarLoop() {
        if (intervalo) clearInterval(intervalo);
        intervalo = setInterval(() => {
            indiceAtual = (indiceAtual + 1) % depoimentos.length;
            mostrarDepoimento(indiceAtual);
        }, 5000);
    }

    pontosContainer.innerHTML = '';
    depoimentos.forEach((_, i) => {
        const p = document.createElement('span');
        p.className = 'ponto' + (i === 0 ? ' ativo' : '');
        p.addEventListener('click', () => {
            indiceAtual = i;
            mostrarDepoimento(i);
            clearInterval(intervalo);
            iniciarLoop();
        });
        pontosContainer.appendChild(p);
    });

    if (botaoAnterior) {
        botaoAnterior.addEventListener('click', () => {
            indiceAtual = (indiceAtual - 1 + depoimentos.length) % depoimentos.length;
            mostrarDepoimento(indiceAtual);
            clearInterval(intervalo);
            iniciarLoop();
        });
    }

    if (botaoProximo) {
        botaoProximo.addEventListener('click', () => {
            indiceAtual = (indiceAtual + 1) % depoimentos.length;
            mostrarDepoimento(indiceAtual);
            clearInterval(intervalo);
            iniciarLoop();
        });
    }

    mostrarDepoimento(0);
    iniciarLoop();
}

// ==============================================================
//  FUNÇÃO PARA CORRIGIR LINKS
// ==============================================================
function corrigirLinks() {
    const mapeamentoLinks = {
        'ipikk-oferta-formativa.html': 'oferta-formativa.html',
        'ipikk-construcao-civil.html': 'construcao-civil.html',
        'ipikk-tecnico-de-obras.html': 'construcao-civil-obras.html',
        'ipikk-desenhador-de-projectista.html': 'construcao-civil-desenhador.html',
        'ipikk-electricidade.html': 'eletricidade.html',
        'ipikk-energia-instalacoes-electricas.html': 'eletricidade-instalacoes.html',
        'ipikk-mecanica.html': 'mecanica.html',
        'ipikk-frio-climatizacao.html': 'mecanica-climatizacao.html',
        'ipikk-informatica-area.html': 'informatica.html',
        'ipikk-gestao-sistemas-informaticos.html': 'informatica-gestao-sistemas.html',
        'ipikk-informatica.html': 'informatica-tecnico.html',
        'ipikk-Tecnologia-moveis.html': 'tecnologia-moveis.html',
        'ipikk-sobre-quem-somos.html': 'sobre-nos.html',
        'ipikk-institucional-perfil-dir.html': 'diretor.html',
        'ipikk-institucional-orgao-directivo.html': 'orgaos-diretivos.html',
        'ipikk-institucional-ex-directores.html': 'ex-diretores.html',
        'ipikk-normativos.html': 'normativos.html',
        'ipikk-escolas-afiliadas.html': 'escolas-afiliadas.html',
        'ipikk-galeria-percurso.html': 'percurso.html',
        'ipikk-Galeria-Alumni.html': 'galeria-alumni.html',
        'ipikk-Noticias.html': 'noticias.html',
        'ipikk-Galeria.html': 'galeria.html',
        'ipikk-Contactos.html': 'contatos.html',
        'ipikk-area-restrita.html': 'area-restrita.html'
    };
    
    document.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        
        for (const [antigo, novo] of Object.entries(mapeamentoLinks)) {
            if (href && href.includes(antigo)) {
                link.setAttribute('href', novo);
                break;
            }
        }
    });
}

// ==============================================================
//  FUNÇÃO DE INICIALIZAÇÃO
// ==============================================================
function inicializar() {
    if (document.getElementById('conteudoPlano')) {
        atualizarPdf(classeActiva);
        inicializarAbasPlano();
    }

    if (document.getElementById('gradeSaidas')) {
        renderizarSaidas();
    }

    if (document.getElementById('nome-alumni')) {
        inicializarDepoimentos();
    }

    corrigirLinks();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.cartao-sobre, .cartao-saida, .cartao-projecto').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializar);
} else {
    inicializar();
}