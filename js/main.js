// ===== DADOS DOS PRODUTOS =====
const produtos = [
    {
        id: 1,
        nome: 'Coxinha',
        descricao: 'Massa leve e crocante com recheio cremoso de frango desfiado e temperos selecionados.',
        precoCru: 20.00,
        precoFrito: 80.00,
        imagem: 'static/imgs/coxinha-de-frango.jpg'
    },
    {
        id: 2,
        nome: 'Bolinha de Queijo',
        descricao: 'Bolinhas douradas com blend de queijos derretidos e textura perfeitamente crocante.',
        precoCru: 20.00,
        precoFrito: 80.00,
        imagem: 'static/imgs/bolinha-de-queijo.jpg'
    },
    {
        id: 3,
        nome: 'Kibe',
        descricao: 'Receita tradicional com carne bovina premium, trigo especial e hortelã fresca.',
        precoCru: 20.00,
        precoFrito: 80.00,
        imagem: 'static/imgs/kibe.jpg'
    },
    {
        id: 4,
        nome: 'Croquete',
        descricao: 'Massa aveludada recheada com milho e queijo, de textura irresistível.',
        precoCru: 20.00,
        precoFrito: 80.00,
        imagem: 'static/imgs/crooquete.jpg'
    },
    {
        id: 5,
        nome: 'Risoles Variados',
        descricao: 'Massa fina e delicada com opções de recheio: queijo e presunto, Catupiry ou Carne.',
        precoCru: 20.00,
        precoFrito: 80.00,
        imagem: 'static/imgs/risoles.png'
    },
    {
        id: 6,
        nome: 'Salsicha Empanada',
        descricao: 'Salsicha de alta qualidade envolta em massa artesanal levemente adocicada.',
        precoCru: 20.00,
        precoFrito: 80.00,
        imagem: 'static/imgs/Salsicha-empanada.jpg'
    }
];

// ===== ESTADO DO CARRINHO =====
let carrinho = [];
let filtroAtual = 'todos';
let produtoSelecionado = null;
let tipoSelecionado = 'cru'; // 'cru' ou 'frito'

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function () {
    renderizarProdutos();
    carregarCarrinho();
});

// ===== RENDERIZAR PRODUTOS =====
function renderizarProdutos() {
    const grid = document.getElementById('produtos-grid');
    if (!grid) return;

    grid.innerHTML = '';
    preencherGrid(grid, produtos);
}

function preencherGrid(grid, listaProdutos) {
    listaProdutos.forEach(produto => {
        const card = document.createElement('div');
        card.className = 'card-produto';

        let imagemHTML = '';
        if (produto.imagem && produto.imagem.trim() !== '') {
            imagemHTML = `<img src="${produto.imagem}" alt="${produto.nome}" class="produto-img">`;
        } else {
            imagemHTML = `<div class="card-imagem-placeholder"><small>Imagem não disponível</small></div>`;
        }

        card.innerHTML = `
            <div class="card-imagem">${imagemHTML}</div>
            <div class="card-info">
                <h3 class="card-titulo">${produto.nome}</h3>
                <p class="card-descricao">${produto.descricao}</p>
                <div class="card-precos-duplo">
                    <div class="preco-box">
                        <span class="preco-label">Dúzia (Cru)</span>
                        <span class="preco-valor">R$ ${produto.precoCru.toFixed(2)}</span>
                    </div>
                    <div class="preco-divisor"></div>
                    <div class="preco-box">
                        <span class="preco-label">Cento (Frito)</span>
                        <span class="preco-valor">R$ ${produto.precoFrito.toFixed(2)}</span>
                    </div>
                </div>
                <button class="btn-card" onclick="abrirProduto(${produto.id})">Adicionar ao Carrinho</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// ===== FILTRO DE CATEGORIAS =====
function filterCategory(categoria, event) {
    filtroAtual = categoria;

    document.querySelectorAll('.btn-filtro').forEach(btn => {
        btn.classList.remove('ativo');
    });
    if (event && event.target) {
        event.target.classList.add('ativo');
    }

    renderizarProdutos();
}

// ===== MODAL DO PRODUTO =====
function abrirProduto(idProduto) {
    produtoSelecionado = produtos.find(p => p.id === idProduto);
    if (!produtoSelecionado) return;

    document.getElementById('modal-title').textContent = produtoSelecionado.nome;
    document.getElementById('modal-description').textContent = produtoSelecionado.descricao;

    const modalPriceContainer = document.querySelector('.modal-price');
    modalPriceContainer.innerHTML = `
        <div class="modal-tipo-seletor">
            <button type="button" class="btn-tipo selecionado" id="btn-tipo-cru" onclick="selecionarTipo('cru')">
                <span class="tipo-nome">Dúzia (Cru)</span>
                <span class="tipo-preco">R$ ${produtoSelecionado.precoCru.toFixed(2)}</span>
            </button>
            <button type="button" class="btn-tipo" id="btn-tipo-frito" onclick="selecionarTipo('frito')">
                <span class="tipo-nome">Cento (Frito)</span>
                <span class="tipo-preco">R$ ${produtoSelecionado.precoFrito.toFixed(2)}</span>
            </button>
        </div>
    `;

    tipoSelecionado = 'cru';

    // Busca direto pela classe — não depende do #modal-image-placeholder que some após a 1ª abertura
    const modalImageContainer = document.querySelector('.modal-image');
    if (produtoSelecionado.imagem && produtoSelecionado.imagem.trim() !== '') {
        modalImageContainer.innerHTML = `<img src="${produtoSelecionado.imagem}" alt="${produtoSelecionado.nome}" class="produto-img" style="max-width:100%;max-height:100%;width:auto;height:auto;">`;
    } else {
        modalImageContainer.innerHTML = `<div style="display:flex;flex-direction:column;align-items:center;gap:0.5rem;color:#999;justify-content:center;height:100%;"><small style="font-size:0.8rem;font-weight:600;">Imagem não disponível</small></div>`;
    }

    document.getElementById('modal-quantity').value = 1;
    document.getElementById('product-modal').classList.add('show');
}

function selecionarTipo(tipo) {
    tipoSelecionado = tipo;
    document.getElementById('btn-tipo-cru').classList.toggle('selecionado', tipo === 'cru');
    document.getElementById('btn-tipo-frito').classList.toggle('selecionado', tipo === 'frito');
}

// Fecha ao clicar no overlay (backdrop)
function closeProductModal(event) {
    if (event && event.target.id !== 'product-modal') return;
    fecharModal();
}

// Fecha programaticamente (sem checar event)
function fecharModal() {
    document.getElementById('product-modal').classList.remove('show');
    produtoSelecionado = null;
}

function incrementQty() {
    const input = document.getElementById('modal-quantity');
    input.value = parseInt(input.value) + 1;
}

function decrementQty() {
    const input = document.getElementById('modal-quantity');
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
    }
}

// ===== CARRINHO =====
function addToCart() {
    if (!produtoSelecionado) return;

    const quantidade = parseInt(document.getElementById('modal-quantity').value);
    const preco = tipoSelecionado === 'cru' ? produtoSelecionado.precoCru : produtoSelecionado.precoFrito;
    const unidade = tipoSelecionado === 'cru' ? 'dúzia (Cru)' : 'cento (Frito)';
    const nomeParaNotificacao = produtoSelecionado.nome; // ← salva antes de fecharModal() zerar

    const itemID = `${produtoSelecionado.id}-${tipoSelecionado}`;
    const itemExistente = carrinho.find(item => item.uniqueID === itemID);

    if (itemExistente) {
        itemExistente.quantidade += quantidade;
    } else {
        carrinho.push({
            uniqueID: itemID,
            id: produtoSelecionado.id,
            nome: `${produtoSelecionado.nome} - ${tipoSelecionado === 'cru' ? 'Cru' : 'Frito'}`,
            preco: preco,
            quantidade: quantidade,
            unidade: unidade
        });
    }

    salvarCarrinho();
    atualizarCarrinho();
    fecharModal();
    mostrarNotificacao(`${nomeParaNotificacao} adicionado ao carrinho!`); // ← usa a cópia
}

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('show');
    document.getElementById('cart-overlay').classList.toggle('show');
}

function atualizarCarrinho() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    cartCount.textContent = carrinho.length;

    if (carrinho.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Seu carrinho está vazio</p>';
        cartTotal.textContent = 'R$ 0,00';
        return;
    }

    cartItems.innerHTML = '';
    let total = 0;

    carrinho.forEach(item => {
        total += item.preco * item.quantidade;

        const itemHTML = document.createElement('div');
        itemHTML.className = 'cart-item';
        itemHTML.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.nome}</div>
                <div class="cart-item-qty">${item.quantidade}x ${item.unidade}</div>
            </div>
            <div class="cart-item-price">R$ ${(item.preco * item.quantidade).toFixed(2)}</div>
            <button class="cart-item-remove" onclick="removerDoCarrinho('${item.uniqueID}')">Remover</button>
        `; // ← uniqueID como string com aspas simples dentro do onclick
        cartItems.appendChild(itemHTML);
    });

    cartTotal.textContent = `R$ ${total.toFixed(2)}`;
}

function removerDoCarrinho(uniqueID) {
    carrinho = carrinho.filter(item => item.uniqueID !== uniqueID);
    salvarCarrinho();
    atualizarCarrinho();
    mostrarNotificacao('Produto removido do carrinho');
}

// ===== CHECKOUT =====
function checkout() {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    let mensagem = 'Gostaria de realizar a seguinte encomenda:\n\n';
    let total = 0;

    carrinho.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        total += subtotal;
        mensagem += `${item.nome}\n`;
        mensagem += `  Quantidade: ${item.quantidade}x ${item.unidade}\n`;
        mensagem += `  Subtotal: R$ ${subtotal.toFixed(2)}\n\n`;
    });

    mensagem += `_________________\n`;
    mensagem += `TOTAL: R$ ${total.toFixed(2)}*\n\n`;
    mensagem += `Aguardo retorno para confirmar o pedido. Obrigado! `;

    const mensagemCodificada = encodeURIComponent(mensagem);
    const whatsappLink = `https://wa.me/5514996415625?text=${mensagemCodificada}`;
    window.open(whatsappLink, '_blank');
}

// ===== LOCAL STORAGE =====
function salvarCarrinho() {
    localStorage.setItem('carrinho_claudia', JSON.stringify(carrinho));
}

function carregarCarrinho() {
    const carrinhoSalvo = localStorage.getItem('carrinho_claudia');
    if (carrinhoSalvo) {
        carrinho = JSON.parse(carrinhoSalvo);
        atualizarCarrinho();
    }
}

// ===== NOTIFICAÇÕES =====
function mostrarNotificacao(mensagem) {
    const notificacao = document.createElement('div');
    notificacao.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background-color: #27ae60;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 300;
        animation: slideInRight 0.3s;
        font-weight: 600;
    `;
    notificacao.textContent = mensagem;
    document.body.appendChild(notificacao);

    setTimeout(() => {
        notificacao.style.animation = 'slideOutRight 0.3s';
        setTimeout(() => notificacao.remove(), 300);
    }, 3000);
}

// ===== ANIMAÇÕES =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(400px); opacity: 0; }
        to   { transform: translateX(0);     opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0);     opacity: 1; }
        to   { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ===== SCROLL SUAVE =====
function scrollTo(sectionId) {
    try {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    } catch (error) {
        console.error('Erro ao fazer scroll:', error);
    }
}

// ===== FECHAR MODAL AO CLICAR FORA =====
document.addEventListener('click', function (event) {
    const modal = document.getElementById('product-modal');
    if (event.target === modal) {
        fecharModal();
    }
});