document.addEventListener('DOMContentLoaded', async () => {
    const container = document.querySelector('.container-grade-areas');
    if (!container) return;

    try {
        const response = await fetch('/api/public/cursos', { headers: { 'X-Requested-With': 'XMLHttpRequest' } });
        const cursos = await response.json();
        if (!Array.isArray(cursos) || cursos.length === 0) return;

        const areasMap = new Map();
        cursos.forEach((curso) => {
            const area = curso.area || { nome: 'Sem Área', descricao: '', cor: '#003072', icone: 'fa-graduation-cap' };
            if (!areasMap.has(area.id || area.nome)) {
                areasMap.set(area.id || area.nome, { area, cursos: [] });
            }
            areasMap.get(area.id || area.nome).cursos.push(curso);
        });

        container.innerHTML = Array.from(areasMap.values()).map(({ area, cursos: lista }, idx) => `
            <a href="${(area.slug || '').length ? area.slug + '.html' : 'oferta-formativa.html'}" class="cartao-area-formativa-${(idx % 5) + 1}">
                <div class="capa-area" style="background-image: linear-gradient(135deg, ${area.cor || '#003072'}33, #003072cc)">
                    <div class="overlay-area"></div>
                    <div class="conteudo-capa-area">
                        <div class="icone-area-formativa"><i class="fa-solid ${area.icone || 'fa-graduation-cap'}"></i></div>
                        <h2 class="titulo-area-formativa">${area.nome}</h2>
                        <p class="descricao-area-formativa">${area.descricao || ''}</p>
                    </div>
                </div>
                <div class="rodape-area-formativa">
                    <span class="contagem-cursos">${lista.length} curso(s) disponível(is)</span>
                    <span class="botao-ver-area">Explorar área →</span>
                </div>
            </a>
        `).join('');
    } catch (error) {
        console.error('Falha ao carregar cursos:', error);
    }
});
