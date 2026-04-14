// ===== DADOS DOS PRODUTOS =====
const produtos = [
    {
        id: 1,
        nome: 'Coxinha Crua',
        categoria: 'cru',
        descricao: 'Massa leve e crocante com recheio cremoso de frango desfiado e temperos selecionados.',
        preco: 20.00,
        unidade: 'dúzia',
        imagem: 'static/imgs/coxinha-de-frango.jpg', 
        
    },
    {
        id: 2,
        nome: 'Bolinha de Queijo Crua',
        categoria: 'cru',
        descricao: 'Bolinhas douradas com blend de queijos derretidos e textura perfeitamente crocante.',
        preco: 20.00,
        unidade: 'dúzia',
        imagem: 'static/imgs/bolinha-de-queijo.jpg'
    },
    {
        id: 3,
        nome: 'Kibe Cru',
        categoria: 'cru',
        descricao: 'Receita tradicional com carne bovina premium, trigo especial e hortelã fresca.',
        preco: 20.00,
        unidade: 'dúzia',
        imagem: 'static/imgs/kibe.jpg'
    },
    {
        id: 4,
        nome: 'Croquete Cru',
        categoria: 'cru',
        descricao: 'Massa aveludada recheada com milho e queijo, pronta para fritar.',
        preco: 20.00,
        unidade: 'dúzia',
        imagem: 'static/imgs/crooquete.jpg'
    },
    {
        id: 5,
        nome: 'Risoles Variados Cru',
        categoria: 'cru',
        descricao: 'Massa fina e delicada com opções de recheio: queijo e presunto,Catupiry, Carne',
        preco: 20.00,
        unidade: 'dúzia',
        imagem: 'static/imgs/risoles.png'
    },
    {
        id: 6,
        nome: 'Salsicha Empanada Crua',
        categoria: 'cru',
        descricao: 'Salsicha de alta qualidade empanada.',
        preco: 20.00,
        unidade: 'dúzia',
        imagem: 'static/imgs/Salsicha-empanada.jpg'
    },
    {
        id: 7,
        nome: 'Coxinha Frita',
        categoria: 'frito',
        descricao: 'Nossa clássica coxinha com recheio cremoso de frango, frita na hora.',
        preco: 80.00,
        unidade: 'cento',
        imagem: 'static/imgs/coxinha-de-frango.jpg'
    },
    {
        id: 8,
        nome: 'Bolinha de Queijo Frita',
        categoria: 'frito',
        descricao: 'Bolinhas douradas com blend de queijos derretidos perfeitamente crocantes.',
        preco: 80.00,
        unidade: 'cento',
        imagem: 'static/imgs/bolinha-de-queijo.jpg'
    },
    {
        id: 9,
        nome: 'Kibe Frito',
        categoria: 'frito',
        descricao: 'Kibe tradicional frito, maravilhosamente crocante por fora e macio por dentro.',
        preco: 80.00,
        unidade: 'cento',
        imagem: 'static/imgs/kibe.jpg'
    },
    {
        id: 10,
        nome: 'Croquete de Milho e Queijo Frito',
        categoria: 'frito',
        descricao: 'Massa aveludada de milho verde recheada com queijo, frita até dourar.',
        preco: 80.00,
        unidade: 'cento',
        imagem: 'static/imgs/crooquete.jpg'
    },
    {
        id: 11,
        nome: 'Risoles Frito',
        categoria: 'frito',
        descricao: 'Massa fina e crocante  com recheios variados e deliciosos.',
        preco: 80.00,
        unidade: 'cento',
        imagem: 'static/imgs/risoles.png'
    },
    {
        id: 12,
        nome: 'Salsicha Empanada Frita',
        categoria: 'frito',
        descricao: 'Salsicha de alta qualidade envolta em massa artesanal levemente adocicada, já frita.',
        preco: 80.00,
        unidade: 'cento',
        imagem: 'static/imgs/Salsicha-empanada.jpg'
    }
];

// ===== ESTADO DO CARRINHO =====
let carrinho = [];
let filtroAtual = 'todos';
let produtoSelecionado = null;

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    renderizarProdutos('cru');
    renderizarProdutos('frito');
    carregarCarrinho();
});

// ===== RENDERIZAR PRODUTOS =====
function renderizarProdutos(categoria) {
    if (categoria === 'cru') {
        const grid = document.getElementById('produtos-grid-cru');
        const secao = document.getElementById('secao-cru');
        grid.innerHTML = '';
        
        const produtosCru = produtos.filter(p => p.categoria === 'cru');
        if (produtosCru.length === 0) {
            secao.style.display = 'none';
            return;
        }
        
        secao.style.display = 'block';
        preencherGrid(grid, produtosCru);
        
    } else if (categoria === 'frito') {
        const grid = document.getElementById('produtos-grid-frito');
        const secao = document.getElementById('secao-frito');
        grid.innerHTML = '';
        
        const produtosFrito = produtos.filter(p => p.categoria === 'frito');
        if (produtosFrito.length === 0) {
            secao.style.display = 'none';
            return;
        }
        
        secao.style.display = 'block';
        preencherGrid(grid, produtosFrito);
    }
}

function preencherGrid(grid, listaProdutos) {
    listaProdutos.forEach(produto => {
        const card = document.createElement('div');
        card.className = 'card-produto';
        
        // Gerar conteúdo da imagem
        let imagemHTML = '';
        if (produto.imagem && produto.imagem.trim() !== '') {
            imagemHTML = `<img src="${produto.imagem}" alt="${produto.nome}" class="produto-img">`;
        } else {
            imagemHTML = `<div class="card-imagem-placeholder"><small>Imagem não disponível</small></div>`;
        }
        
        card.innerHTML = `
            <div class="card-imagem">${imagemHTML}</div>
            <div class="card-info">
                <div class="card-categoria">${produto.categoria === 'cru' ? 'Para Fritar' : 'Pronto para Comer'}</div>
                <h3 class="card-titulo">${produto.nome}</h3>
                <p class="card-descricao">${produto.descricao}</p>
                <div class="card-preco">
                    R$ ${produto.preco.toFixed(2)}
                    <span class="card-preco-unidade">por ${produto.unidade}</span>
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
    
    // Atualizar botões de filtro
    document.querySelectorAll('.btn-filtro').forEach(btn => {
        btn.classList.remove('ativo');
    });
    if (event && event.target) {
        event.target.classList.add('ativo');
    }
    
    if (categoria === 'todos') {
        // Mostrar as duas seções
        document.getElementById('secao-cru').style.display = 'block';
        document.getElementById('secao-frito').style.display = 'block';
    } else if (categoria === 'cru') {
        // Mostrar apenas crús
        document.getElementById('secao-cru').style.display = 'block';
        document.getElementById('secao-frito').style.display = 'none';
    } else if (categoria === 'frito') {
        // Mostrar apenas fritos
        document.getElementById('secao-cru').style.display = 'none';
        document.getElementById('secao-frito').style.display = 'block';
    }
}

// ===== MODAL DO PRODUTO =====
function abrirProduto(idProduto) {
    produtoSelecionado = produtos.find(p => p.id === idProduto);
    
    if (!produtoSelecionado) return;
    
    document.getElementById('modal-title').textContent = produtoSelecionado.nome;
    document.getElementById('modal-category').textContent = 
        produtoSelecionado.categoria === 'cru' ? 'Para Fritar em Casa' : 'Pronto para Consumo';
    document.getElementById('modal-description').textContent = produtoSelecionado.descricao;
    document.getElementById('modal-price').textContent = `R$ ${produtoSelecionado.preco.toFixed(2)} por ${produtoSelecionado.unidade}`;
    
    // Renderizar imagem no modal
    if (produtoSelecionado.imagem && produtoSelecionado.imagem.trim() !== '') {
        document.getElementById('modal-image-placeholder').parentElement.innerHTML = 
            `<img src="${produtoSelecionado.imagem}" alt="${produtoSelecionado.nome}" class="produto-img" style="max-width: 100%; max-height: 100%; width: auto; height: auto;">`;
    } else {
        document.getElementById('modal-image-placeholder').parentElement.innerHTML = 
            `<div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem; color: #999; justify-content: center; height: 100%;">
                <small style="font-size: 0.8rem; font-weight: 600;">Imagem não disponível</small>
            </div>`;
    }
    
    document.getElementById('modal-quantity').value = 1;
    
    document.getElementById('product-modal').classList.add('show');
}

function closeProductModal(event) {
    if (event && event.target.id !== 'product-modal') return;
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
    
    const itemExistente = carrinho.find(item => item.id === produtoSelecionado.id);
    
    if (itemExistente) {
        itemExistente.quantidade += quantidade;
    } else {
        carrinho.push({
            id: produtoSelecionado.id,
            nome: produtoSelecionado.nome,
            preco: produtoSelecionado.preco,
            quantidade: quantidade,
            unidade: produtoSelecionado.unidade,
            emoji: produtoSelecionado.emoji
        });
    }
    
    salvarCarrinho();
    atualizarCarrinho();
    closeProductModal();
    
    // Mostrar notificação
    mostrarNotificacao(`${produtoSelecionado.nome} adicionado ao carrinho!`);
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
            <button class="cart-item-remove" onclick="removerDoCarrinho(${item.id})">Remover</button>
        `;
        cartItems.appendChild(itemHTML);
    });
    
    cartTotal.textContent = `R$ ${total.toFixed(2)}`;
}

function removerDoCarrinho(idProduto) {
    carrinho = carrinho.filter(item => item.id !== idProduto);
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
    
    // Codificar a mensagem para URL
    const mensagemCodificada = encodeURIComponent(mensagem);
    
    // Número do WhatsApp (com código de país e DDD)
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
    // Criar elemento de notificação
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
    
    // Remover após 3 segundos
    setTimeout(() => {
        notificacao.style.animation = 'slideOutRight 0.3s';
        setTimeout(() => notificacao.remove(), 300);
    }, 3000);
}

// ===== ANIMAÇÕES =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
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
document.addEventListener('click', function(event) {
    const modal = document.getElementById('product-modal');
    if (event.target === modal) {
        closeProductModal();
    }
});

