// Função para abrir o modal
function abrirModal(modalID) {
    const modal = document.getElementById(modalID);
    if (modal) {
        modal.classList.add('active');
        // Impede que a página role atrás do modal
        document.body.style.overflow = 'hidden'; 
    }
}

// Função para fechar pelo botão X
function fecharModalbotao(modalID) {
    const modal = document.getElementById(modalID);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; 
    }
}

// Função para fechar clicando fora do cartão (no fundo escuro)
function fecharModal(event, modalID) {
    if (event.target.classList.contains('modal-overlay')) {
        fecharModalbotao(modalID);
    }
}