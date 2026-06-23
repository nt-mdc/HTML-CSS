// ================================================================
// [NEXUS ELECTRONICS - ORQUESTRADOR FRONTEND]
// ARQUIVO: app.js — Controla a interatividade da vitrine e carrinho
// ================================================================

// Elementos do DOM
const produtosVitrine = document.getElementById("produtos-vitrine");
const cartOverlay = document.getElementById("cart-overlay");
const cartSidebar = document.getElementById("cart-sidebar");
const cartTrigger = document.getElementById("cart-trigger");
const cartClose = document.getElementById("cart-close");
const cartItemsContainer = document.getElementById("cart-items-container");
const cartTotalElement = document.getElementById("cart-total");
const cartCountElement = document.getElementById("cart-count");
const checkoutBtn = document.getElementById("checkout-btn");
const searchInput = document.getElementById("search-input");
const filtroBtns = document.querySelectorAll(".filtro-btn");
const toast = document.getElementById("toast-notificacao");

// Estado Global da Sessão
let catalogoProdutos = [];
let carrinho = [];
let filtroAtivo = "all";
let termoBusca = "";

// 1. Inicializar a Aplicação
function init() {
  // Carrega produtos do banco de dados local
  catalogoProdutos = JSON.parse(localStorage.getItem("nexus_products")) || [];
  carrinho = JSON.parse(localStorage.getItem("nexus_cart")) || [];

  // Configura event listeners
  configurarEventos();

  // Renderiza vitrine e carrinho
  renderizarVitrine();
  renderizarCarrinho();
}

// 2. Configurar Eventos
function configurarEventos() {
  // Abertura/Fechamento do Carrinho
  cartTrigger.addEventListener("click", () => alternarCarrinho(true));
  cartClose.addEventListener("click", () => alternarCarrinho(false));
  cartOverlay.addEventListener("click", () => alternarCarrinho(false));

  // Filtros de Categoria
  filtroBtns.forEach(btn => {
    btn.addEventListener("click", function() {
      filtroBtns.forEach(b => b.classList.remove("ativo"));
      this.classList.add("ativo");
      filtroAtivo = this.getAttribute("data-filter");
      renderizarVitrine();
    });
  });

  // Campo de Busca
  searchInput.addEventListener("input", function() {
    termoBusca = this.value.toLowerCase().trim();
    renderizarVitrine();
  });

  // Finalizar Compra
  checkoutBtn.addEventListener("click", realizarCheckout);

  // Efeito de Header Scrolled
  window.addEventListener("scroll", () => {
    const header = document.getElementById("cabecalho");
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Atualizar link do Minha Conta se estiver logado
  const currentUser = JSON.parse(localStorage.getItem("nexus_current_user"));
  const navClienteLink = document.getElementById("nav-cliente-link");
  if (currentUser) {
    navClienteLink.textContent = `Olá, ${currentUser.nome.split(" ")[0]}`;
  }
}

// 3. Abrir / Fechar Carrinho Sidebar
function alternarCarrinho(abrir) {
  if (abrir) {
    cartSidebar.classList.add("active");
    cartOverlay.classList.add("active");
  } else {
    cartSidebar.classList.remove("active");
    cartOverlay.classList.remove("active");
  }
}

// 4. Renderizar Vitrine de Produtos
function renderizarVitrine() {
  produtosVitrine.innerHTML = "";

  // Filtragem combinada (Categoria + Busca)
  const produtosFiltrados = catalogoProdutos.filter(produto => {
    const correspondeCategoria = filtroAtivo === "all" || produto.categoria === filtroAtivo;
    const correspondeBusca = produto.nome.toLowerCase().includes(termoBusca) || 
                             produto.marca.toLowerCase().includes(termoBusca) ||
                             produto.categoria.toLowerCase().includes(termoBusca);
    return correspondeCategoria && correspondeBusca;
  });

  if (produtosFiltrados.length === 0) {
    produtosVitrine.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; color: var(--cor-texto-suave); padding: 40px;">
        <i class="fas fa-search" style="font-size: 32px; margin-bottom: 12px; opacity: 0.5;"></i>
        <p>Nenhum produto correspondente encontrado.</p>
      </div>
    `;
    return;
  }

  // Criar e inserir cards
  produtosFiltrados.forEach(produto => {
    const card = document.createElement("article");
    card.className = `produto-card ${produto.estoque === 0 ? "esgotado" : ""}`;

    // Badges de estoque
    let badgeHTML = "";
    if (produto.estoque === 0) {
      badgeHTML = `<span class="estoque-badge esgotado">Esgotado</span>`;
    } else if (produto.estoque <= 3) {
      badgeHTML = `<span class="estoque-badge baixo">Estoque Baixo</span>`;
    }

    card.innerHTML = `
      <div class="produto-imagem-wrapper">
        ${badgeHTML}
        <img src="${produto.imagem}" alt="${produto.nome}" class="produto-imagem">
      </div>
      <span class="produto-categoria">${produto.categoria}</span>
      <div class="produto-nome-grupo">
        <span class="produto-marca">${produto.marca}</span>
        <h3 class="produto-nome">${produto.nome}</h3>
      </div>
      <div class="produto-preco-linha">
        <span class="produto-preco">R$ ${produto.preco.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
        <button class="btn-add-carrinho" onclick="adicionarAoCarrinho('${produto.id}')" ${produto.estoque === 0 ? "disabled" : ""} aria-label="Adicionar ao Carrinho">
          <i class="fas fa-plus"></i>
        </button>
      </div>
    `;
    produtosVitrine.appendChild(card);
  });
}

// 5. Adicionar Item ao Carrinho
window.adicionarAoCarrinho = function(id) {
  const produto = catalogoProdutos.find(p => p.id === id);

  if (!produto || produto.estoque === 0) return;

  // Verifica se o item já está no carrinho
  const itemNoCarrinho = carrinho.find(item => item.id === id);

  if (itemNoCarrinho) {
    // Verifica limite de estoque
    if (itemNoCarrinho.quantidade >= produto.estoque) {
      mostrarToast("Limite de estoque do produto atingido!");
      return;
    }
    itemNoCarrinho.quantidade++;
  } else {
    carrinho.push({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      imagem: produto.imagem,
      quantidade: 1
    });
  }

  // Salva no localStorage
  localStorage.setItem("nexus_cart", JSON.stringify(carrinho));

  // Renderiza e atualiza
  renderizarCarrinho();
  mostrarToast(`${produto.nome} adicionado ao carrinho!`);
};

// Adicionar produto destaque (Hero)
window.adicionarProdutoDestaque = function(id) {
  adicionarAoCarrinho(id);
  alternarCarrinho(true); // Abre o carrinho
};

// 6. Renderizar Carrinho Sidebar
function renderizarCarrinho() {
  cartItemsContainer.innerHTML = "";

  if (carrinho.length === 0) {
    cartItemsContainer.innerHTML = `<p class="cart-empty-message">Seu carrinho está vazio.</p>`;
    cartTotalElement.textContent = "R$ 0,00";
    cartCountElement.textContent = "0";
    return;
  }

  let total = 0;
  let totalQtd = 0;

  carrinho.forEach(item => {
    total += item.preco * item.quantidade;
    totalQtd += item.quantidade;

    const divItem = document.createElement("div");
    divItem.className = "carrinho-item";

    divItem.innerHTML = `
      <img src="${item.imagem}" alt="${item.nome}" class="carrinho-item-img">
      <div class="carrinho-item-info">
        <h3 class="carrinho-item-nome">${item.nome}</h3>
        <span class="carrinho-item-preco">R$ ${item.preco.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
        <div class="carrinho-item-controles">
          <button class="qtd-btn" onclick="alterarQuantidade('${item.id}', -1)" aria-label="Remover uma unidade"><i class="fas fa-minus"></i></button>
          <span class="qtd-valor">${item.quantidade}</span>
          <button class="qtd-btn" onclick="alterarQuantidade('${item.id}', 1)" aria-label="Adicionar uma unidade"><i class="fas fa-plus"></i></button>
        </div>
      </div>
      <button class="carrinho-item-remover" onclick="removerDoCarrinho('${item.id}')" aria-label="Remover item"><i class="fas fa-trash-can"></i></button>
    `;
    cartItemsContainer.appendChild(divItem);
  });

  // Atualiza resumos
  cartTotalElement.textContent = `R$ ${total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
  cartCountElement.textContent = totalQtd;
}

// 7. Alterar Quantidade no Carrinho
window.alterarQuantidade = function(id, delta) {
  const item = carrinho.find(item => item.id === id);
  if (!item) return;

  const produto = catalogoProdutos.find(p => p.id === id);

  if (delta > 0) {
    if (item.quantidade >= produto.estoque) {
      mostrarToast("Limite de estoque do produto atingido!");
      return;
    }
    item.quantidade++;
  } else {
    item.quantidade--;
    if (item.quantidade <= 0) {
      removerDoCarrinho(id);
      return;
    }
  }

  localStorage.setItem("nexus_cart", JSON.stringify(carrinho));
  renderizarCarrinho();
};

// 8. Remover item do carrinho
window.removerDoCarrinho = function(id) {
  carrinho = carrinho.filter(item => item.id !== id);
  localStorage.setItem("nexus_cart", JSON.stringify(carrinho));
  renderizarCarrinho();
  mostrarToast("Item removido do carrinho.");
};

// 9. Mostrar Toast
function mostrarToast(mensagem) {
  toast.querySelector(".toast-mensagem").textContent = mensagem;
  toast.classList.add("active");

  setTimeout(() => {
    toast.classList.remove("active");
  }, 3000);
}

// 10. Realizar Checkout (Compra)
function realizarCheckout() {
  if (carrinho.length === 0) {
    mostrarToast("Seu carrinho está vazio!");
    return;
  }

  // Verifica se usuário está logado
  const currentUser = JSON.parse(localStorage.getItem("nexus_current_user"));
  if (!currentUser) {
    alert("Para finalizar a compra, faça o login!");
    window.location.href = "auth/login/login.html";
    return;
  }

  // Verifica estoque uma última vez
  for (const item of carrinho) {
    const produto = catalogoProdutos.find(p => p.id === item.id);
    if (!produto || produto.estoque < item.quantidade) {
      alert(`Desculpe, o produto ${item.nome} não possui estoque suficiente.`);
      return;
    }
  }

  // Atualizar estoque dos produtos
  catalogoProdutos = catalogoProdutos.map(p => {
    const itemNoCarrinho = carrinho.find(item => item.id === p.id);
    if (itemNoCarrinho) {
      return { ...p, estoque: p.estoque - itemNoCarrinho.quantidade };
    }
    return p;
  });

  localStorage.setItem("nexus_products", JSON.stringify(catalogoProdutos));

  // Calcular total
  const total = carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);

  // Registrar pedido
  const orders = JSON.parse(localStorage.getItem("nexus_orders")) || [];
  const novoPedidoId = `NEX-ORD-${Math.floor(1000 + Math.random() * 9000)}`;
  
  const novoPedido = {
    id: novoPedidoId,
    data: new Date().toISOString(),
    status: "Pago",
    total: total,
    itens: carrinho.map(item => ({
      id: item.id,
      nome: item.nome,
      quantidade: item.quantidade,
      preco: item.preco
    }))
  };

  orders.push(novoPedido);
  localStorage.setItem("nexus_orders", JSON.stringify(orders));

  // Limpa carrinho
  carrinho = [];
  localStorage.removeItem("nexus_cart");

  // Atualiza telas
  renderizarCarrinho();
  renderizarVitrine();
  alternarCarrinho(false);

  alert(`Compra finalizada com sucesso!\nID do Pedido: ${novoPedidoId}\nStatus: Pago.\nAcompanhe o envio no Painel do Cliente.`);
  window.location.href = "cliente/pedidos.html";
}

// Iniciar a página
init();
