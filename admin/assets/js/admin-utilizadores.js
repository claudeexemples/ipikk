/* === VARIÁVEIS GLOBAIS === */
const modal = document.getElementById('modalNovoUtilizador');
let passoAtual = 1;
const totalPassos = 4;
let idEdicao = null;

/* === ABRIR/FECHAR MODAL === */
document.getElementById('btnNovoUtilizador').addEventListener('click', () => {
    resetarModalNovo();
    modal.classList.add('ativo');
    document.body.style.overflow = 'hidden';
    irParaPasso(1);
    gerarSenha();
});

const fecharModal = () => {
    modal.classList.remove('ativo');
    document.body.style.overflow = '';
};

document.getElementById('btnFecharModal').addEventListener('click', fecharModal);
modal.addEventListener('click', e => { if (e.target === modal) fecharModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') fecharModal(); });

/* === NAVEGAÇÃO DE PASSOS === */
function irParaPasso(n) {
    // Sair do passo atual
    document.getElementById('passo' + passoAtual).classList.remove('ativo');
    document.querySelector('.item-passo[data-passo="' + passoAtual + '"]').classList.remove('ativo');
    
    if (n > passoAtual) {
        document.querySelector('.item-passo[data-passo="' + passoAtual + '"]').classList.add('concluido');
    } else {
        document.querySelector('.item-passo[data-passo="' + passoAtual + '"]').classList.remove('concluido');
    }

    passoAtual = n;

    // Activar novo passo
    document.getElementById('passo' + passoAtual).classList.add('ativo');
    document.querySelectorAll('.item-passo').forEach(el => {
        const s = parseInt(el.dataset.passo);
        el.classList.remove('ativo');
        if (s < passoAtual) el.classList.add('concluido');
        else el.classList.remove('concluido');
    });
    document.querySelector('.item-passo[data-passo="' + passoAtual + '"]').classList.add('ativo');

    // Botões rodapé
    document.getElementById('btnVoltar').style.display   = passoAtual > 1      ? 'flex' : 'none';
    document.getElementById('btnAvancar').style.display  = passoAtual < totalPassos ? 'flex' : 'none';
    document.getElementById('btnEnviar').style.display   = passoAtual === totalPassos ? 'flex' : 'none';
    document.getElementById('infoRodape').textContent    = 'Passo ' + passoAtual + ' de ' + totalPassos;

    if (passoAtual === totalPassos) preencherRevisao();
}

document.getElementById('btnAvancar').addEventListener('click', () => {
    if (passoAtual < totalPassos) irParaPasso(passoAtual + 1);
});

document.getElementById('btnVoltar').addEventListener('click', () => {
    if (passoAtual > 1) irParaPasso(passoAtual - 1);
});

/* === SELETOR DE AVATAR === */
document.querySelectorAll('.opcao-avatar').forEach(opt => {
    opt.addEventListener('click', function () {
        document.querySelectorAll('.opcao-avatar').forEach(o => o.classList.remove('selecionado'));
        this.classList.add('selecionado');
        const icone = this.dataset.icone;
        document.getElementById('previewAvatar').innerHTML = `<i class="fas fa-${icone}"></i>`;
        document.getElementById('avatarRevisao').innerHTML  = `<i class="fas fa-${icone}"></i>`;
    });
});

/* === CARDS DE NÍVEL === */
document.querySelectorAll('.card-nivel').forEach(card => {
    card.addEventListener('click', function () {
        document.querySelectorAll('.card-nivel').forEach(c => c.classList.remove('selecionado'));
        this.classList.add('selecionado');
    });
});

/* === PERMISSÕES === */
function togglePermissao(el) {
    el.classList.toggle('selecionado');
    const cb = el.querySelector('input[type="checkbox"]');
    cb.checked = !cb.checked;
}

/* === GERAR SENHA === */
function gerarSenha() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%';
    let senha = '';
    for (let i = 0; i < 14; i++) senha += chars[Math.floor(Math.random() * chars.length)];
    document.getElementById('senhaGerada').value = senha;
    avaliarForca(senha);
}

function avaliarForca(senha) {
    const el = document.getElementById('forcaSenha');
    const preenchimento = document.getElementById('preenchimentoForca');
    const rotulo = document.getElementById('rotuloForca');
    
    el.style.display = 'block';
    
    let pontuacao = 0;
    if (senha.length >= 8)  pontuacao++;
    if (senha.length >= 12) pontuacao++;
    if (/[A-Z]/.test(senha)) pontuacao++;
    if (/[0-9]/.test(senha)) pontuacao++;
    if (/[^A-Za-z0-9]/.test(senha)) pontuacao++;
    
    const percentual = (pontuacao / 5) * 100;
    const cor = pontuacao <= 2 ? '#dc3545' : pontuacao <= 3 ? '#ffc107' : '#28a745';
    const texto = pontuacao <= 2 ? '<i class="fas fa-exclamation-circle"></i> Fraca' : 
                  pontuacao <= 3 ? '<i class="fas fa-exclamation-triangle"></i> Média' : 
                  '<i class="fas fa-check-circle"></i> Forte';
    
    preenchimento.style.width = percentual + '%';
    preenchimento.style.background = cor;
    rotulo.innerHTML = texto;
    rotulo.style.color = cor;
}

document.getElementById('btnGerarSenha').addEventListener('click', gerarSenha);

/* === REVISÃO === */
function preencherRevisao() {
    const nivelSelecionado = document.querySelector('.card-nivel.selecionado input');
    const mapaNivel = { 
        admin: '<i class="fas fa-crown"></i> Administrador', 
        editor: '<i class="fas fa-edit"></i> Editor'
    };

    const permissoesAtivas = Array.from(document.querySelectorAll('.item-permissao.selecionado .texto-permissao strong'))
        .map(el => el.textContent);

    const notificacoes = [];
    if (document.getElementById('toggle1').checked) notificacoes.push('<i class="fas fa-sync-alt"></i> Forçar alteração');
    if (document.getElementById('toggle2').checked) notificacoes.push('<i class="fas fa-envelope"></i> Enviar credenciais');
    if (document.getElementById('toggle3').checked) notificacoes.push('<i class="fas fa-check-circle"></i> Conta ativa');

    document.getElementById('revNome').innerHTML   = document.getElementById('campoNome').value    || '—';
    document.getElementById('revEmail').innerHTML  = document.getElementById('campoEmail').value   || '—';
    document.getElementById('revCargo').innerHTML  = document.getElementById('campoCargo').value   || '—';
    document.getElementById('revNivel').innerHTML  = nivelSelecionado ? mapaNivel[nivelSelecionado.value] : '—';
    document.getElementById('revPerms').innerHTML  = permissoesAtivas.length ? permissoesAtivas.join(', ') : 'Nenhuma';
    document.getElementById('revSenha').innerHTML  = document.getElementById('senhaGerada').value ? '••••••••••••••' : '—';
    document.getElementById('revNotif').innerHTML  = notificacoes.join(' · ') || 'Nenhuma';
}

/* === SUBMIT === */
document.getElementById('btnEnviar').addEventListener('click', () => {
    const notificacao = document.createElement('div');
    notificacao.style.cssText = `
        position:fixed;top:20px;right:20px;
        padding:16px 28px;background:linear-gradient(135deg,#28a745,#1a7a2e);
        color:#fff;border-radius:12px;
        box-shadow:0 8px 25px rgba(40,167,69,0.4);
        z-index:99999;font-weight:600;font-size:15px;
        display:flex;align-items:center;gap:10px;
    `;
    notificacao.innerHTML = '<i class="fas fa-check-circle"></i> Utilizador criado com sucesso!';
    document.body.appendChild(notificacao);
    setTimeout(() => { notificacao.remove(); fecharModal(); }, 2500);
});

/* === FILTROS === */
const campoBusca = document.getElementById('campoBusca');
const filtroCargo = document.getElementById('filtroCargo');
const filtroEstado = document.getElementById('filtroEstado');
const corpoTabela = document.getElementById('corpoTabelaUtilizadores');
const contadorUtilizadores = document.getElementById('contadorUtilizadores');

campoBusca.addEventListener('input', function () {
    const termo = this.value.toLowerCase();
    corpoTabela.querySelectorAll('tr').forEach(row => {
        row.style.display = row.textContent.toLowerCase().includes(termo) ? '' : 'none';
    });
    atualizarContador();
});

function aplicarFiltros() {
    const cargo = filtroCargo.value;
    const estado = filtroEstado.value;
    
    corpoTabela.querySelectorAll('tr').forEach(row => {
        const ok = (!cargo || row.dataset.cargo === cargo) && (!estado || row.dataset.estado === estado);
        row.style.display = ok ? '' : 'none';
    });
    atualizarContador();
}

function atualizarContador() {
    const totalVisiveis = Array.from(corpoTabela.querySelectorAll('tr')).filter(
        row => row.style.display !== 'none'
    ).length;
    contadorUtilizadores.innerHTML = `(${totalVisiveis} utilizadores)`;
}

filtroCargo.addEventListener('change', aplicarFiltros);
filtroEstado.addEventListener('change', aplicarFiltros);

/* === EDIÇÃO DE UTILIZADORES === */
function abrirModalEdicao(userId) {
    // Simulação de dados (em produção viria da BD)
    const utilizadores = {
        1: {
            nome: "Admin Principal",
            email: "admin@ipikk.edu",
            telefone: "+258 84 123 4567",
            departamento: "Direção",
            cargo_funcao: "Administrador do Sistema",
            nivel_acesso: "admin",
            avatar: "crown",
            ativo: true,
            permissoes: [1, 2, 3, 4, 5, 6]
        },
        2: {
            nome: "Ana Administradora",
            email: "ana@ipikk.edu",
            telefone: "+258 84 123 4568",
            departamento: "Direção",
            cargo_funcao: "Administradora",
            nivel_acesso: "admin",
            avatar: "user-tie",
            ativo: true,
            permissoes: [1, 2, 3, 4, 5, 6]
        },
        3: {
            nome: "Pedro Gestor",
            email: "pedro@ipikk.edu",
            telefone: "+258 84 123 4569",
            departamento: "Coordenação",
            cargo_funcao: "Coordenador",
            nivel_acesso: "admin",
            avatar: "user-shield",
            ativo: true,
            permissoes: [1, 2, 3, 4, 5, 6]
        },
        4: {
            nome: "Maria Editora",
            email: "maria@ipikk.edu",
            telefone: "+258 84 234 5678",
            departamento: "Comunicação",
            cargo_funcao: "Editora de Conteúdo",
            nivel_acesso: "editor",
            avatar: "user-edit",
            ativo: true,
            permissoes: [1, 2, 3]
        },
        5: {
            nome: "João Conteúdo",
            email: "joao@ipikk.edu",
            telefone: "+258 84 234 5679",
            departamento: "Produção",
            cargo_funcao: "Produtor de Conteúdo",
            nivel_acesso: "editor",
            avatar: "user-graduate",
            ativo: true,
            permissoes: [1, 2]
        },
        6: {
            nome: "Luísa Redação",
            email: "luisa@ipikk.edu",
            telefone: "+258 84 234 5680",
            departamento: "Redação",
            cargo_funcao: "Redatora",
            nivel_acesso: "editor",
            avatar: "user-edit",
            ativo: true,
            permissoes: [1, 3]
        },
        7: {
            nome: "Carlos Antigo",
            email: "carlos@ipikk.edu",
            telefone: "+258 84 345 6789",
            departamento: "Secretaria",
            cargo_funcao: "Secretário",
            nivel_acesso: "editor",
            avatar: "user",
            ativo: false,
            permissoes: [2]
        }
    };

    const utilizador = utilizadores[userId];
    if (!utilizador) return;

    idEdicao = userId;

    // Preencher STEP 1
    document.getElementById('campoNome').value = utilizador.nome;
    document.getElementById('campoEmail').value = utilizador.email;
    document.getElementById('campoTelefone').value = utilizador.telefone || '';
    document.getElementById('campoDepartamento').value = utilizador.departamento || '';
    document.getElementById('campoCargo').value = utilizador.cargo_funcao || '';

    // Selecionar avatar
    document.querySelectorAll('.opcao-avatar').forEach(opt => {
        opt.classList.remove('selecionado');
        if (opt.dataset.icone === utilizador.avatar) {
            opt.classList.add('selecionado');
            document.getElementById('previewAvatar').innerHTML = `<i class="fas fa-${utilizador.avatar}"></i>`;
            document.getElementById('avatarRevisao').innerHTML = `<i class="fas fa-${utilizador.avatar}"></i>`;
        }
    });

    // Preencher STEP 2
    document.querySelectorAll('.card-nivel').forEach(card => {
        const radio = card.querySelector('input');
        if (radio.value === utilizador.nivel_acesso) {
            card.classList.add('selecionado');
            radio.checked = true;
        } else {
            card.classList.remove('selecionado');
            radio.checked = false;
        }
    });

    document.querySelectorAll('.item-permissao').forEach((item, index) => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        const permId = index + 1;
        if (utilizador.permissoes.includes(permId)) {
            item.classList.add('selecionado');
            checkbox.checked = true;
        } else {
            item.classList.remove('selecionado');
            checkbox.checked = false;
        }
    });

    // Preencher STEP 3
    document.getElementById('toggle3').checked = utilizador.ativo;
    document.getElementById('senhaGerada').value = '••••••••••••••';
    document.getElementById('forcaSenha').style.display = 'none';

    // Alterar título do modal
    document.querySelector('.texto-cabecalho h2').textContent = 'Editar Utilizador';
    document.querySelector('.texto-cabecalho p').textContent = 'Altere os dados do utilizador';

    // Esconder botão de gerar senha
    document.getElementById('btnGerarSenha').style.display = 'none';

    irParaPasso(1);
    modal.classList.add('ativo');
    document.body.style.overflow = 'hidden';
}

// Adicionar evento de clique nas linhas da tabela
document.querySelectorAll('.tabela-dados tbody tr').forEach((row, index) => {
    row.addEventListener('click', function(e) {
        if (e.target.closest('button') || e.target.closest('input')) return;
        const userId = index + 1;
        abrirModalEdicao(userId);
    });
});

function resetarModalNovo() {
    idEdicao = null;
    document.getElementById('formularioNovoUtilizador').reset();
    
    document.querySelectorAll('.opcao-avatar').forEach(opt => opt.classList.remove('selecionado'));
    document.querySelector('.opcao-avatar[data-icone="user"]').classList.add('selecionado');
    document.getElementById('previewAvatar').innerHTML = '<i class="fas fa-user"></i>';
    document.getElementById('avatarRevisao').innerHTML = '<i class="fas fa-user"></i>';
    
    document.querySelectorAll('.card-nivel').forEach(card => card.classList.remove('selecionado'));
    document.getElementById('cardEditor').classList.add('selecionado');
    document.querySelector('input[name="nivel"][value="editor"]').checked = true;
    
    document.querySelectorAll('.item-permissao').forEach((item, index) => {
        if (index < 3) {
            item.classList.add('selecionado');
            item.querySelector('input').checked = true;
        } else {
            item.classList.remove('selecionado');
            item.querySelector('input').checked = false;
        }
    });
    
    document.getElementById('toggle1').checked = true;
    document.getElementById('toggle2').checked = true;
    document.getElementById('toggle3').checked = true;
    
    document.getElementById('btnGerarSenha').style.display = 'flex';
    document.querySelector('.texto-cabecalho h2').textContent = 'Novo Utilizador';
    document.querySelector('.texto-cabecalho p').textContent = 'Preencha os dados para criar uma conta de acesso';
    
    gerarSenha();
}

/* === EXPORTAÇÃO DE LISTA === */
function exportarUtilizadoresCSV() {
    const utilizadores = [];
    const linhas = document.querySelectorAll('.tabela-dados tbody tr');
    
    linhas.forEach(linha => {
        if (linha.style.display !== 'none') {
            utilizadores.push({
                nome: linha.cells[1].textContent.trim(),
                email: linha.cells[2].textContent.trim(),
                cargo: linha.cells[3].textContent.trim(),
                estado: linha.cells[4].textContent.trim().replace(/\s+/g, ' ')
            });
        }
    });

    if (utilizadores.length === 0) {
        mostrarNotificacao('Nenhum utilizador para exportar', 'aviso');
        return;
    }

    const cabecalho = ['Nome', 'Email', 'Cargo', 'Estado'];
    const linhasCSV = [cabecalho.join(';')];
    
    utilizadores.forEach(u => {
        linhasCSV.push(`"${u.nome}";${u.email};"${u.cargo}";"${u.estado}"`);
    });

    const conteudoCSV = linhasCSV.join('\n');
    const blob = new Blob(["\uFEFF" + conteudoCSV], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    const dataAtual = new Date().toISOString().slice(0,10).replace(/-/g, '');
    link.setAttribute('href', url);
    link.setAttribute('download', `utilizadores_${dataAtual}.csv`);
    link.click();
    URL.revokeObjectURL(url);

    mostrarNotificacao(`${utilizadores.length} utilizador(es) exportado(s) com sucesso!`, 'sucesso');
}

function mostrarNotificacao(mensagem, tipo = 'sucesso') {
    const notif = document.createElement('div');
    
    const cores = {
        sucesso: '#28a745',
        erro: '#dc3545',
        aviso: '#ffc107',
        info: '#17a2b8'
    };

    const icones = {
        sucesso: 'fa-check-circle',
        erro: 'fa-exclamation-circle',
        aviso: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };

    notif.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 28px;
        background: linear-gradient(135deg, ${cores[tipo] || cores.sucesso}, ${cores[tipo]}dd);
        color: ${tipo === 'aviso' ? '#000' : '#fff'};
        border-radius: 12px;
        box-shadow: 0 8px 25px ${cores[tipo] || cores.sucesso}66;
        z-index: 99999;
        font-weight: 600;
        font-size: 15px;
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    
    notif.innerHTML = `<i class="fas ${icones[tipo] || icones.sucesso}"></i> ${mensagem}`;
    document.body.appendChild(notif);
    
    setTimeout(() => {
        notif.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

// Adicionar animação de saída
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(styleSheet);

// Ligar botões de ação rápida
document.getElementById('btnExportarLista').addEventListener('click', (e) => {
    e.preventDefault();
    exportarUtilizadoresCSV();
});

document.getElementById('btnReenviarCredenciais').addEventListener('click', () => {
    mostrarNotificacao('Credenciais reenviadas com sucesso!', 'sucesso');
});

document.getElementById('btnForcarMudancaSenha').addEventListener('click', () => {
    if (confirm('Forçar mudança de senha para utilizadores selecionados?')) {
        mostrarNotificacao('Pedido de alteração de senha enviado!', 'sucesso');
    }
});

document.getElementById('btnRelatorioAtividades').addEventListener('click', () => {
    window.open('relatorio-atividades.pdf', '_blank');
});

// Ordenação
document.getElementById('filtroOrdenar').addEventListener('change', function() {
    const criterio = this.value;
    const linhas = Array.from(corpoTabela.querySelectorAll('tr'));
    
    if (criterio === 'nome') {
        linhas.sort((a, b) => {
            const nomeA = a.cells[1].textContent.trim();
            const nomeB = b.cells[1].textContent.trim();
            return nomeA.localeCompare(nomeB);
        });
    } else if (criterio === 'login') {
        // Simulação - em produção ordenaria por data de último login
        mostrarNotificacao('Ordenação por último login em desenvolvimento', 'info');
        return;
    }
    
    // Reordenar na tabela
    linhas.forEach(linha => corpoTabela.appendChild(linha));
});

console.log('Página de Utilizadores carregada!');
