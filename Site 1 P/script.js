// Memória do Carrinho
let cart = JSON.parse(localStorage.getItem('vibe_store_cart')) || [];

// Elementos da Interface
const sidebar = document.getElementById('cart-sidebar');
const overlay = document.getElementById('overlay');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartCount = document.getElementById('cart-count');
const totalPriceEl = document.getElementById('total-price');

// 1. NAVEGAÇÃO ENTRE PÁGINAS
function showPage(pageId) {
    // Esconde todas as páginas
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    // Mostra a página desejada
    document.getElementById('page-' + pageId).classList.add('active');
    
    // Fecha carrinho se mudar de página
    closeCart();
    // Volta ao topo
    window.scrollTo(0, 0);
}

// 2. CONTROLE DO CARRINHO (ABRIR/FECHAR)
document.getElementById('open-cart').onclick = openCart;
document.getElementById('close-cart').onclick = closeCart;
overlay.onclick = closeCart;

function openCart() {
    sidebar.classList.add('active');
    overlay.classList.add('active');
}

function closeCart() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
}

// 3. LÓGICA DE PRODUTOS
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.onclick = (e) => {
        const card = e.target.closest('.product-card');
        const product = {
            id: card.dataset.id,
            name: card.querySelector('h4').innerText,
            price: parseFloat(card.dataset.price),
            img: card.querySelector('.product-img').style.backgroundImage
        };
        addToCart(product);
    };
});

function addToCart(product) {
    cart.push(product);
    updateUI();
    saveCart();
    openCart(); // Abre o carrinho ao adicionar
}

function removeItem(index) {
    cart.splice(index, 1);
    updateUI();
    saveCart();
}

function updateUI() {
    // Atualiza Lista
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <div style="display:flex; align-items:center; gap:15px">
                    <div style="width:60px; height:60px; background-size:cover; border-radius:5px; background-image: ${item.img}"></div>
                    <div>
                        <h5 style="margin:0">${item.name}</h5>
                        <p style="color:var(--primary); font-weight:bold; margin:0">R$ ${item.price.toFixed(2)}</p>
                    </div>
                </div>
                <i class="fas fa-trash" onclick="removeItem(${index})" style="color:#ff4757; cursor:pointer"></i>
            </div>
        `;
    });

    // Atualiza Contador e Preço Total
    cartCount.innerText = cart.length;
    totalPriceEl.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

function saveCart() {
    localStorage.setItem('vibe_store_cart', JSON.stringify(cart));
}

function checkout() {
    if (cart.length === 0) return alert("Sua sacola está vazia!");
    alert("🚀 Pedido processado! Integrando com sistema de pagamento...");
    cart = [];
    saveCart();
    updateUI();
    closeCart();
}

// Iniciar app
updateUI();