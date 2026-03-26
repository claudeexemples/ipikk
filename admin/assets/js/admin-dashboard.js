// ============================================
// ADMIN - DASHBOARD
// Funcionalidades específicas do dashboard
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    inicializarAnimacoes();
    inicializarTabelas();
    inicializarContadores();
    inicializarCliqueLinhas();
    inicializarBotoesAcao();
});

// ===== ANIMAÇÕES AO SCROLL =====
function inicializarAnimacoes() {
    const secoes = document.querySelectorAll('.secao-estatisticas, .secao-conteudo');
    
    const observador = new IntersectionObserver(function(entradas) {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.style.opacity = '0';
                entrada.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entrada.target.style.transition = 'all 0.5s ease';
                    entrada.target.style.opacity = '1';
                    entrada.target.style.transform = 'translateY(0)';
                }, 100);
                
                observador.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.1 });
    
    secoes.forEach(secao => observador.observe(secao));
}

// ===== CONTADORES ANIMADOS =====
function inicializarContadores() {
    const numeros = document.querySelectorAll('.numero');
    
    const observador = new IntersectionObserver(function(entradas) {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                animarContador(entrada.target);
                observador.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.5 });
    
    numeros.forEach(numero => observador.observe(numero));
}

function animarContador(elemento) {
    const texto = elemento.textContent;
    let valorFinal;
    let temK = false;
    
    // Verifica se tem K (ex: 1.2K)
    if (texto.includes('K')) {
        temK = true;
        valorFinal = parseFloat(texto.replace('K', '')) * 1000;
    } else {
        valorFinal = parseInt(texto) || 0;
    }
    
    if (valorFinal === 0) return;
    
    const duracao = 1500;
    const incremento = valorFinal / (duracao / 16);
    let valorAtual = 0;
    
    const timer = setInterval(() => {
        valorAtual += incremento;
        
        if (valorAtual >= valorFinal) {
            valorAtual = valorFinal;
            clearInterval(timer);
        }
        
        if (temK) {
            elemento.textContent = (valorAtual / 1000).toFixed(1) + 'K';
        } else {
            elemento.textContent = Math.floor(valorAtual);
        }
    }, 16);
}

// ===== TABELAS - SELEÇÃO DE LINHAS =====
function inicializarTabelas() {
    const linhas = document.querySelectorAll('.tabela-dados tbody tr');
    
    linhas.forEach(linha => {
        linha.addEventListener('click', function(e) {
            // Não seleciona se clicar em botão
            if (e.target.closest('.botao-icone')) return;
            
            // Remove seleção de outras linhas
            linhas.forEach(l => l.classList.remove('selecionada'));
            
            // Adiciona seleção na linha clicada
            this.classList.add('selecionada');
        });
    });
}

// ===== CLIQUE NAS LINHAS (duplo clique) =====
function inicializarCliqueLinhas() {
    const linhas = document.querySelectorAll('.tabela-dados tbody tr');
    
    linhas.forEach(linha => {
        linha.addEventListener('dblclick', function() {
            const tipo = this.closest('table').id || 'registro';
            const id = Array.from(linhas).indexOf(this) + 1;
            
            if (confirm('Deseja visualizar este registro?')) {
                abrirModalVisualizacao(tipo, id);
            }
        });
    });
}

// ===== BOTÕES DE AÇÃO =====
function inicializarBotoesAcao() {
    // Botões de confirmação
    const botoesExcluir = document.querySelectorAll('.botao-excluir');
    botoesExcluir.forEach(botao => {
        botao.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (confirm('Tem certeza que deseja excluir este item?')) {
                console.log('Item excluído');
                // Aqui vai a lógica de exclusão
                mostrarNotificacao('Item excluído com sucesso!', 'success');
            }
        });
    });
    
    // Botões de edição
    const botoesEditar = document.querySelectorAll('[onclick*="abrirModalEdicao"]');
    botoesEditar.forEach(botao => {
        botao.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
}

// ===== MODAIS =====
function abrirModalVisualizacao(tipo, id) {
    const modal = document.getElementById('modalVisualizacao');
    const titulo = document.getElementById('modalTitulo');
    const corpo = document.getElementById('modalCorpo');
    const botaoAcao = document.getElementById('modalAcao');
    
    if (!modal) return;
    
    // Conteúdo do modal baseado no tipo
    let conteudo = '';
    let acaoTexto = '';
    
    if (tipo === 'contacto') {
        titulo.textContent = 'Visualizar Contacto';
        acaoTexto = 'Responder';
        
        if (id === 1) {
            conteudo = `
                <p><strong>Nome:</strong> Maria Silva</p>
                <p><strong>Email:</strong> maria.silva@email.com</p>
                <p><strong>Assunto:</strong> Informações sobre curso</p>
                <p><strong>Mensagem:</strong> Gostaria de saber mais informações sobre o curso de Informática, como duração, horários e processo de matrícula.</p>
                <p><strong>Data:</strong> 10/02/2024 às 14:30</p>
            `;
        } else if (id === 2) {
            conteudo = `
                <p><strong>Nome:</strong> João Pereira</p>
                <p><strong>Email:</strong> joao.pereira@email.com</p>
                <p><strong>Assunto:</strong> Matrícula</p>
                <p><strong>Mensagem:</strong> Já realizei minha pré-matrícula online. Gostaria de saber quando será a confirmação e quais documentos devo levar.</p>
                <p><strong>Data:</strong> 09/02/2024 às 09:15</p>
            `;
        }
    } else if (tipo === 'noticia') {
        titulo.textContent = 'Editar Notícia';
        acaoTexto = 'Salvar';
        
        if (id === 1) {
            conteudo = `
                <p><strong>Título:</strong> IPIKK abre inscrições 2024</p>
                <p><strong>Conteúdo:</strong> O Instituto Politécnico Industrial do Kilamba Kiaxi informa que estão abertas as inscrições para o ano letivo 2024...</p>
                <p><strong>Data:</strong> 09/02/2024</p>
                <p><strong>Status:</strong> Publicada</p>
            `;
        } else if (id === 3) {
            conteudo = `
                <p><strong>Título:</strong> Workshop de Energia (Rascunho)</p>
                <p><strong>Conteúdo:</strong> [Rascunho] Será realizado um workshop sobre energias renováveis no próximo mês...</p>
                <p><strong>Data:</strong> 01/02/2024</p>
                <p><strong>Status:</strong> Rascunho</p>
            `;
        }
    }
    
    corpo.innerHTML = conteudo;
    botaoAcao.textContent = acaoTexto;
    
    modal.style.display = 'flex';
    
    // Prevenir scroll do body
    document.body.style.overflow = 'hidden';
}

function abrirModalEdicao(tipo, id) {
    abrirModalVisualizacao(tipo, id);
    // Poderia carregar um formulário de edição
}

function fecharModal() {
    const modal = document.getElementById('modalVisualizacao');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

function abrirDetalhesCurso(curso) {
    window.location.href = `admin-cursos.html?curso=${curso}`;
}

// ===== NOTIFICAÇÕES =====
function mostrarNotificacao(mensagem, tipo = 'info') {
    // Criar elemento de notificação
    const notificacao = document.createElement('div');
    notificacao.className = `notificacao notificacao-${tipo}`;
    notificacao.innerHTML = `
        <i class="fas ${tipo === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
        <span>${mensagem}</span>
    `;
    
    // Estilo inline para a notificação
    notificacao.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${tipo === 'success' ? '#28a745' : '#17a2b8'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notificacao);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notificacao.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notificacao.remove(), 300);
    }, 3000);
}

// ===== EXPORTAÇÃO PARA CSV =====
function exportarTabelaParaCSV(idTabela, nomeArquivo) {
    const tabela = document.querySelector(idTabela);
    if (!tabela) return;
    
    const linhas = tabela.querySelectorAll('tr');
    const csv = [];
    
    linhas.forEach(linha => {
        const colunas = linha.querySelectorAll('td, th');
        const dadosLinha = Array.from(colunas).map(col => {
            // Remove conteúdo de botões e ícones
            let texto = col.textContent.trim().replace(/[✓✗]/g, '');
            return `"${texto}"`;
        });
        csv.push(dadosLinha.join(','));
    });
    
    const conteudoCSV = csv.join('\n');
    const blob = new Blob([conteudoCSV], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = nomeArquivo;
    link.click();
    
    mostrarNotificacao('Tabela exportada com sucesso!', 'success');
}

// ===== FUNÇÕES DE FORMATAÇÃO =====
function formatarNumero(numero) {
    return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function formatarData(data) {
    const d = new Date(data);
    const dia = d.getDate().toString().padStart(2, '0');
    const mes = (d.getMonth() + 1).toString().padStart(2, '0');
    const ano = d.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

// ===== EXPOR FUNÇÕES GLOBAIS =====
window.abrirModalVisualizacao = abrirModalVisualizacao;
window.abrirModalEdicao = abrirModalEdicao;
window.fecharModal = fecharModal;
window.abrirDetalhesCurso = abrirDetalhesCurso;
window.exportarTabelaParaCSV = exportarTabelaParaCSV;