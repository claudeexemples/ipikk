/// ===== SCROLL =====
const cabecalho = document.getElementById('cabecalho');
const botaoTopo = document.getElementById('botaoTopo');
window.addEventListener('scroll', () => {
    cabecalho.classList.toggle('rolado', window.scrollY > 60);
    botaoTopo.style.display = window.scrollY > 300 ? 'flex' : 'none';
});
botaoTopo.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== WHATSAPP =====
const botaoWhatsapp = document.getElementById('botaoWhatsapp');
if (botaoWhatsapp) {
    botaoWhatsapp.addEventListener('click', e => {
        e.preventDefault();
        window.open('https://wa.me/244933096705', '_blank');
    });
}

// ===== SIDEBAR — abrir/fechar =====
const botaoMenu = document.getElementById('botaoMenu');
const sidebar   = document.getElementById('sidebarMobile');
const overlay   = document.getElementById('overlaySidebar');
const fecharBtn = document.getElementById('fecharSidebar');

function abrirSidebar() {
    sidebar.classList.add('aberto');
    overlay.classList.add('visivel');
    document.body.style.overflow = 'hidden';
    botaoMenu.classList.add('ativo');
    setTimeout(() => {
        const nav = document.querySelector('.sidebar-nav');
        if (nav) nav.scrollTop = 0;
    }, 50);
}

function fecharSidebar() {
    sidebar.classList.remove('aberto');
    overlay.classList.remove('visivel');
    document.body.style.overflow = '';
    botaoMenu.classList.remove('ativo');
    document.querySelectorAll('.sidebar-submenu').forEach(s => s.classList.remove('aberto'));
    document.querySelectorAll('[data-alvo]').forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        b.classList.remove('aberto');
    });
    document.querySelectorAll('.sidebar-link.has-submenu').forEach(b => {
        b.setAttribute('aria-expanded', 'false');
    });
}

botaoMenu.addEventListener('click', () => sidebar.classList.contains('aberto') ? fecharSidebar() : abrirSidebar());
fecharBtn.addEventListener('click', fecharSidebar);
overlay.addEventListener('click', fecharSidebar);
sidebar.querySelectorAll('a.sidebar-link, a.sidebar-sub-link, a.sidebar-link-pagina').forEach(link => {
    link.addEventListener('click', fecharSidebar);
});

// ===== SIDEBAR — submenus =====
function rolarAteElemento(el) {
    const nav = document.querySelector('.sidebar-nav');
    if (!nav || !el) return;
    setTimeout(() => {
        const elTop    = el.getBoundingClientRect().top - nav.getBoundingClientRect().top + nav.scrollTop;
        const elBottom = elTop + el.offsetHeight;
        if (elTop < nav.scrollTop) {
            nav.scrollTo({ top: Math.max(0, elTop - 20), behavior: 'smooth' });
        } else if (elBottom > nav.scrollTop + nav.clientHeight) {
            nav.scrollTo({ top: elBottom - nav.clientHeight + 20, behavior: 'smooth' });
        }
    }, 120);
}

function toggleSubmenu(btn, alvoId) {
    const submenu = document.getElementById(alvoId);
    if (!submenu) return;
    const abrindo = !submenu.classList.contains('aberto');
    if (abrindo) {
        submenu.classList.add('aberto');
        btn.setAttribute('aria-expanded', 'true');
        btn.classList.add('aberto');
        rolarAteElemento(submenu);
    } else {
        submenu.classList.remove('aberto');
        btn.setAttribute('aria-expanded', 'false');
        btn.classList.remove('aberto');
        submenu.querySelectorAll('.sidebar-submenu').forEach(s => s.classList.remove('aberto'));
        submenu.querySelectorAll('[data-alvo]').forEach(b => {
            b.setAttribute('aria-expanded', 'false');
            b.classList.remove('aberto');
        });
    }
}

// Botões de seta dupla função (Oferta Formativa e filhos)
document.querySelectorAll('.botao-seta-sidebar[data-alvo]').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleSubmenu(this, this.getAttribute('data-alvo'));
    });
});

// Botões has-submenu (Sobre, Institucional, Alumni)
document.querySelectorAll('.sidebar-link.has-submenu[data-alvo]').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleSubmenu(this, this.getAttribute('data-alvo'));
    });
});

// ===== PREVENIR PROPAGAÇÃO =====
document.querySelectorAll('.conteudo-suspenso, .submenu-suspenso, .sidebar-submenu').forEach(m => {
    m.addEventListener('click', e => e.stopPropagation());
});

// ===== TRADUÇÃO COM GOOGLE TRANSLATE =====
let googleTranslateInitialized = false;
let idiomaAtual = 'pt'; // pt = português, en = inglês

// Função para carregar o widget do Google Tradutor
function carregarGoogleTranslate() {
    if (googleTranslateInitialized) return;
    
    // Adiciona o script do Google Translate
    const script = document.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.head.appendChild(script);
    
    // Define a função de callback global
    window.googleTranslateElementInit = function() {
        new google.translate.TranslateElement({
            pageLanguage: 'pt',
            includedLanguages: 'pt,en',
            autoDisplay: false,
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE
        }, 'google_translate_element');
        
        googleTranslateInitialized = true;
        
        // Aplica o idioma atual se já estiver definido
        if (idiomaAtual === 'en') {
            setTimeout(() => traduzirParaIngles(), 500);
        }
    };
}

// Função para traduzir para inglês
function traduzirParaIngles() {
    const select = document.querySelector('.goog-te-combo');
    if (select) {
        select.value = 'en';
        select.dispatchEvent(new Event('change'));
    } else {
        // Aguarda o elemento ser carregado
        const observer = new MutationObserver(function(mutations, obs) {
            const select = document.querySelector('.goog-te-combo');
            if (select) {
                select.value = 'en';
                select.dispatchEvent(new Event('change'));
                obs.disconnect();
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
        
        // Timeout para evitar loop infinito
        setTimeout(() => observer.disconnect(), 3000);
    }
}

// Função para traduzir para português
function traduzirParaPortugues() {
    const select = document.querySelector('.goog-te-combo');
    if (select) {
        select.value = 'pt';
        select.dispatchEvent(new Event('change'));
    } else {
        // Aguarda o elemento ser carregado
        const observer = new MutationObserver(function(mutations, obs) {
            const select = document.querySelector('.goog-te-combo');
            if (select) {
                select.value = 'pt';
                select.dispatchEvent(new Event('change'));
                obs.disconnect();
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
        
        // Timeout para evitar loop infinito
        setTimeout(() => observer.disconnect(), 3000);
    }
}

// Função para remover a barra do Google Tradutor
function removerBarraGoogleTranslate() {
    setTimeout(() => {
        const frame = document.querySelector('.goog-te-banner-frame');
        if (frame) {
            frame.style.display = 'none';
        }
        const body = document.body;
        if (body) {
            body.style.top = '0px';
            body.style.position = 'static';
        }
        
        // Remove também a notificação de cookies
        const cookieMessage = document.querySelector('.goog-te-spinner-pos');
        if (cookieMessage) {
            cookieMessage.style.display = 'none';
        }
    }, 500);
}

// Função para mudar o idioma
function mudarIdioma(idioma) {
    if (!googleTranslateInitialized) {
        carregarGoogleTranslate();
    }
    
    idiomaAtual = idioma;
    
    // Atualiza o texto do botão
    const spanIdioma = document.getElementById('idiomaAtual');
    if (spanIdioma) {
        spanIdioma.textContent = idioma === 'pt' ? 'Português' : 'English';
    }
    
    // Atualiza a classe ativa no dropdown
    document.querySelectorAll('.opcao-idioma').forEach(opt => {
        const lang = opt.getAttribute('data-lang');
        if (lang === idioma) {
            opt.classList.add('ativo');
        } else {
            opt.classList.remove('ativo');
        }
    });
    
    // Aplica a tradução
    if (idioma === 'en') {
        traduzirParaIngles();
    } else {
        traduzirParaPortugues();
    }
    
    // Remove a barra do Google Tradutor
    removerBarraGoogleTranslate();
    
    // Salva a preferência no localStorage
    localStorage.setItem('idioma_ipikk', idioma);
}

// Inicializa o tradutor e carrega o idioma salvo
function inicializarTradutor() {
    // Cria o elemento oculto para o Google Tradutor
    let divGoogle = document.getElementById('google_translate_element');
    if (!divGoogle) {
        divGoogle = document.createElement('div');
        divGoogle.id = 'google_translate_element';
        divGoogle.style.display = 'none';
        document.body.appendChild(divGoogle);
    }
    
    // Carrega o idioma salvo
    const idiomaSalvo = localStorage.getItem('idioma_ipikk');
    const spanIdioma = document.getElementById('idiomaAtual');
    const opcaoPt = document.querySelector('.opcao-idioma[data-lang="pt"]');
    const opcaoEn = document.querySelector('.opcao-idioma[data-lang="en"]');
    
    if (idiomaSalvo === 'en') {
        idiomaAtual = 'en';
        if (spanIdioma) spanIdioma.textContent = 'English';
        if (opcaoPt) opcaoPt.classList.remove('ativo');
        if (opcaoEn) opcaoEn.classList.add('ativo');
        
        // Carrega o tradutor e aplica o inglês
        carregarGoogleTranslate();
        
        // Aguarda o tradutor carregar e aplica
        setTimeout(() => {
            if (googleTranslateInitialized) {
                traduzirParaIngles();
            } else {
                // Se ainda não inicializou, aguarda mais um pouco
                const checkInterval = setInterval(() => {
                    if (googleTranslateInitialized) {
                        traduzirParaIngles();
                        clearInterval(checkInterval);
                    }
                }, 200);
                setTimeout(() => clearInterval(checkInterval), 5000);
            }
        }, 800);
    } else {
        idiomaAtual = 'pt';
        if (spanIdioma) spanIdioma.textContent = 'Português';
        if (opcaoPt) opcaoPt.classList.add('ativo');
        if (opcaoEn) opcaoEn.classList.remove('ativo');
        
        // Carrega o tradutor em background
        carregarGoogleTranslate();
    }
}

// Eventos do seletor de idioma
document.addEventListener('DOMContentLoaded', () => {
    inicializarTradutor();
    
    // Eventos dos botões de idioma
    const opcoesIdioma = document.querySelectorAll('.opcao-idioma');
    opcoesIdioma.forEach(opcao => {
        opcao.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const lang = opcao.getAttribute('data-lang');
            mudarIdioma(lang);
        });
    });
    
    // Remove a barra do Google Tradutor periodicamente
    setInterval(removerBarraGoogleTranslate, 1000);
    
    // Inicialização da sidebar
    botaoTopo.style.display = 'none';
    document.querySelectorAll('.sidebar-submenu').forEach(s => s.classList.remove('aberto'));
});

// Remove a barra do Google Tradutor também quando a página carrega
window.addEventListener('load', () => {
    setTimeout(removerBarraGoogleTranslate, 500);
    setTimeout(removerBarraGoogleTranslate, 1000);
    setTimeout(removerBarraGoogleTranslate, 2000);
});