// ============================================
// ADMIN - ÁREA RESTRITA
// Script para Sidebar, Notificações e Perfil
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    inicializarMenuMobile();
    inicializarMenuAtivo();
    inicializarNotificacoes();
    inicializarPerfil();
    inicializarFecharDropdownsAoClicarFora();
});

// ===== MENU MOBILE =====
function inicializarMenuMobile() {
    const botaoMenu = document.getElementById('botaoMenuMobile');
    const sidebar = document.getElementById('sidebar');
    
    if (!botaoMenu || !sidebar) return;
    
    // Criar overlay se não existir
    let overlay = document.querySelector('.overlay-sidebar');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'overlay-sidebar';
        document.body.appendChild(overlay);
    }
    
    function abrirSidebar() {
        sidebar.classList.add('visivel');
        overlay.classList.add('visivel');
        document.body.style.overflow = 'hidden';
    }
    
    function fecharSidebar() {
        sidebar.classList.remove('visivel');
        overlay.classList.remove('visivel');
        document.body.style.overflow = '';
    }
    
    botaoMenu.addEventListener('click', function(e) {
        e.stopPropagation();
        if (sidebar.classList.contains('visivel')) {
            fecharSidebar();
        } else {
            abrirSidebar();
        }
    });
    
    overlay.addEventListener('click', fecharSidebar);
    
    // Fechar sidebar ao redimensionar para desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            if (sidebar.classList.contains('visivel')) {
                fecharSidebar();
            }
        }
    });
}

// ===== MENU ATIVO =====
function inicializarMenuAtivo() {
    const links = document.querySelectorAll('.navegacao-sidebar a');
    const caminhoAtual = window.location.pathname.split('/').pop() || 'admin-dashboard.html';
    
    links.forEach(link => {
        const href = link.getAttribute('href');
        
        // Remove classe ativo de todos
        link.parentElement.classList.remove('ativo');
        
        // Adiciona classe ativo se o href corresponder à página atual
        if (href === caminhoAtual) {
            link.parentElement.classList.add('ativo');
        }
        
        // Previne comportamento padrão apenas para links # (placeholders)
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') {
                e.preventDefault();
            }
            
            // Remove classe ativo de todos e adiciona ao clicado
            links.forEach(l => l.parentElement.classList.remove('ativo'));
            this.parentElement.classList.add('ativo');
            
            // Fecha sidebar no mobile após clicar
            if (window.innerWidth <= 768) {
                const sidebar = document.getElementById('sidebar');
                const overlay = document.querySelector('.overlay-sidebar');
                if (sidebar) sidebar.classList.remove('visivel');
                if (overlay) overlay.classList.remove('visivel');
                document.body.style.overflow = '';
            }
        });
    });
}

// ===== NOTIFICAÇÕES =====
function inicializarNotificacoes() {
    const botaoNotificacao = document.getElementById('botaoNotificacao');
    const dropdownNotificacao = document.getElementById('dropdownNotificacao');
    
    if (!botaoNotificacao || !dropdownNotificacao) return;
    
    botaoNotificacao.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Fecha dropdown do perfil se estiver aberto
        const dropdownPerfil = document.getElementById('dropdownPerfil');
        if (dropdownPerfil && dropdownPerfil.classList.contains('visivel')) {
            dropdownPerfil.classList.remove('visivel');
        }
        
        dropdownNotificacao.classList.toggle('visivel');
    });
}

// ===== PERFIL DO USUÁRIO =====
function inicializarPerfil() {
    const botaoPerfil = document.getElementById('botaoPerfil');
    const dropdownPerfil = document.getElementById('dropdownPerfil');
    
    if (!botaoPerfil || !dropdownPerfil) return;
    
    botaoPerfil.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Fecha dropdown de notificações se estiver aberto
        const dropdownNotificacao = document.getElementById('dropdownNotificacao');
        if (dropdownNotificacao && dropdownNotificacao.classList.contains('visivel')) {
            dropdownNotificacao.classList.remove('visivel');
        }
        
        dropdownPerfil.classList.toggle('visivel');
    });
}

// ===== FECHAR DROPDOWNS AO CLICAR FORA =====
function inicializarFecharDropdownsAoClicarFora() {
    document.addEventListener('click', function(event) {
        // Fechar dropdown de notificações
        const dropdownNotificacao = document.getElementById('dropdownNotificacao');
        const botaoNotificacao = document.getElementById('botaoNotificacao');
        
        if (dropdownNotificacao && dropdownNotificacao.classList.contains('visivel')) {
            if (!dropdownNotificacao.contains(event.target) && !botaoNotificacao.contains(event.target)) {
                dropdownNotificacao.classList.remove('visivel');
            }
        }
        
        // Fechar dropdown do perfil
        const dropdownPerfil = document.getElementById('dropdownPerfil');
        const botaoPerfil = document.getElementById('botaoPerfil');
        
        if (dropdownPerfil && dropdownPerfil.classList.contains('visivel')) {
            if (!dropdownPerfil.contains(event.target) && !botaoPerfil.contains(event.target)) {
                dropdownPerfil.classList.remove('visivel');
            }
        }
    });
    
    // Fechar dropdowns com tecla ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const dropdownNotificacao = document.getElementById('dropdownNotificacao');
            const dropdownPerfil = document.getElementById('dropdownPerfil');
            
            if (dropdownNotificacao && dropdownNotificacao.classList.contains('visivel')) {
                dropdownNotificacao.classList.remove('visivel');
            }
            
            if (dropdownPerfil && dropdownPerfil.classList.contains('visivel')) {
                dropdownPerfil.classList.remove('visivel');
            }
        }
    });
}

// ===== FUNÇÃO PARA MARCAR NOTIFICAÇÕES COMO LIDAS (OPCIONAL) =====
function marcarNotificacaoComoLida(elemento) {
    elemento.classList.remove('nao-lida');
    atualizarContadorNotificacoes();
}

function atualizarContadorNotificacoes() {
    const notificacoesNaoLidas = document.querySelectorAll('.item-notificacao.nao-lida').length;
    const contador = document.querySelector('.contador');
    const contadorPequeno = document.querySelector('.contador-pequeno');
    
    if (contador) {
        contador.textContent = notificacoesNaoLidas;
        contador.style.display = notificacoesNaoLidas > 0 ? 'flex' : 'none';
    }
    
    if (contadorPequeno) {
        contadorPequeno.textContent = notificacoesNaoLidas + ' nova' + (notificacoesNaoLidas !== 1 ? 's' : '');
    }
}

// Exemplo de uso (pode ser chamado quando clicar em uma notificação)
document.querySelectorAll('.item-notificacao').forEach(item => {
    item.addEventListener('click', function() {
        marcarNotificacaoComoLida(this);
    });
});