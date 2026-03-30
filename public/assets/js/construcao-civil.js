// Script de compatibilidade da página Construção Civil.
// Mantém espaço para comportamentos específicos sem gerar erro 404.
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.cartao-curso, .card-curso, .curso-card');
    cards.forEach((card) => {
        card.addEventListener('mouseenter', () => card.classList.add('hover'));
        card.addEventListener('mouseleave', () => card.classList.remove('hover'));
    });
});
