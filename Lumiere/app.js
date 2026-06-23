/* ================================================================
   [LUMIÈRE — BOUTIQUE ELEGANTE]
   app.js — INTERATIVIDADE PREMIUM (ESTOQUE, SACOLA E SUPORTE)
   Controlador dinâmico do e-commerce utilizando vanilla JS.
   ================================================================ */

// 1. Banco de Dados de Estoque (Simulação de Backend)
const estoqueProdutos = {
  "vestido-seda": { P: 2, M: 8, G: 0, GG: 5 },
  "blazer-linho": { P: 4, M: 1, G: 6, GG: 3 },
  "trench-coat": { P: 2, M: 5, G: 4, GG: 0 },
  "calca-alfaiataria": { P: 5, M: 0, G: 3, GG: 7 }
};

// 2. Estado Global do Carrinho de Compras
let carrinho = [];

// ================================================================
// DOCUMENT READY / INICIALIZAÇÃO
// ================================================================
document.addEventListener("DOMContentLoaded", () => {
  inicializarVitrine();
  inicializarCarrinho();
  inicializarSuporte();
  inicializarBusca();
});

// ================================================================
// LÓGICA DA VITRINE E SELETOR DE TAMANHOS
// ================================================================
function inicializarVitrine() {
  const cards = document.querySelectorAll(".produto-card");

  cards.forEach(card => {
    const id = card.getAttribute("data-id");
    const botoesTamanho = card.querySelectorAll(".tamanho-opcao");
    const statusTexto = card.querySelector(".status-texto");
    const btnComprar = card.querySelector(".produto-btn-comprar");

    // Verificar tamanhos esgotados nativamente para desabilitar botões inicialmente
    botoesTamanho.forEach(botao => {
      const tamanho = botao.getAttribute("data-tamanho");
      const estoque = estoqueProdutos[id][tamanho];

      if (estoque === 0) {
        botao.disabled = true;
      }

      // Evento ao clicar em um tamanho
      botao.addEventListener("click", () => {
        // Remover classe selecionado de todos os botões do mesmo card
        botoesTamanho.forEach(btn => btn.classList.remove("selecionado"));
        
        // Adicionar classe selecionado ao botão clicado
        botao.classList.add("selecionado");
        
        // Salvar tamanho selecionado no card
        card.setAttribute("data-tamanho-selecionado", tamanho);

        // Atualizar indicador visual de estoque
        atualizarIndicadorEstoque(estoque, statusTexto, btnComprar);
      });
    });

    // Evento de Adicionar à Sacola
    btnComprar.addEventListener("click", () => {
      const tamanho = card.getAttribute("data-tamanho-selecionado");
      if (!tamanho) return;

      const nome = card.getAttribute("data-name");
      const preco = parseFloat(card.getAttribute("data-price"));
      const imagem = card.getAttribute("data-image");

      adicionarAoCarrinho(id, nome, preco, imagem, tamanho);
    });
  });
}

function atualizarIndicadorEstoque(estoque, statusTexto, btnComprar) {
  statusTexto.className = "status-texto"; // Resetar classes

  if (estoque === 0) {
    statusTexto.innerHTML = `<span class="badge badge-erro"><i class="fas fa-times-circle"></i> Esgotado</span>`;
    btnComprar.disabled = true;
  } else if (estoque <= 2) {
    statusTexto.innerHTML = `<span class="badge badge-alerta"><i class="fas fa-exclamation-triangle"></i> Poucas unidades (${estoque})</span>`;
    btnComprar.disabled = false;
  } else {
    statusTexto.innerHTML = `<span class="badge badge-sucesso"><i class="fas fa-check-circle"></i> Em estoque</span>`;
    btnComprar.disabled = false;
  }
}

// ================================================================
// OPERAÇÕES DO CARRINHO DE COMPRAS
// ================================================================
function inicializarCarrinho() {
  const sacolaBtn = document.getElementById("sacola-btn");
  const fecharBtn = document.getElementById("carrinho-fechar");
  const overlay = document.getElementById("carrinho-overlay");
  const continuarBtn = document.getElementById("carrinho-continuar-comprando");
  const finalizarBtn = document.getElementById("carrinho-finalizar");

  // Eventos de Abertura/Fechamento
  if (sacolaBtn) sacolaBtn.addEventListener("click", abrirCarrinho);
  if (fecharBtn) fecharBtn.addEventListener("click", fecharCarrinho);
  if (overlay) overlay.addEventListener("click", fecharCarrinho);
  if (continuarBtn) continuarBtn.addEventListener("click", fecharCarrinho);

  // Finalização do Pedido
  if (finalizarBtn) {
    finalizarBtn.addEventListener("click", () => {
      alert("✨ Pedido Finalizado com Sucesso!\n\nSeu pedido foi registrado na Lumière. A confirmação de compra foi enviada para o seu e-mail.");
      carrinho = [];
      salvarCarrinhoLocal();
      atualizarSacolaUI();
      fecharCarrinho();
    });
  }

  // Carregar carrinho do localStorage, se houver
  const carrinhoSalvo = localStorage.getItem("lumiere_carrinho");
  if (carrinhoSalvo) {
    try {
      carrinho = JSON.parse(carrinhoSalvo);
      atualizarSacolaUI();
    } catch (e) {
      carrinho = [];
    }
  }
}

function abrirCarrinho() {
  document.getElementById("carrinho-overlay").classList.add("ativo");
  document.getElementById("carrinho-offcanvas").classList.add("ativo");
}

function fecharCarrinho() {
  document.getElementById("carrinho-overlay").classList.remove("ativo");
  document.getElementById("carrinho-offcanvas").classList.remove("ativo");
}

function adicionarAoCarrinho(id, nome, preco, imagem, tamanho) {
  // Verificar se o item já existe com o mesmo tamanho
  const itemExistente = carrinho.find(item => item.id === id && item.tamanho === tamanho);
  const estoqueMaximo = estoqueProdutos[id][tamanho];

  if (itemExistente) {
    if (itemExistente.quantidade < estoqueMaximo) {
      itemExistente.quantidade++;
    } else {
      mostrarNotificacao(`Desculpe, restam apenas ${estoqueMaximo} unidades deste tamanho no estoque.`);
      return;
    }
  } else {
    carrinho.push({
      id,
      nome,
      preco,
      imagem,
      tamanho,
      quantidade: 1
    });
  }

  salvarCarrinhoLocal();
  atualizarSacolaUI();
  abrirCarrinho();
}

function alterarQuantidade(id, tamanho, delta) {
  const item = carrinho.find(item => item.id === id && item.tamanho === tamanho);
  if (!item) return;

  const estoqueMaximo = estoqueProdutos[id][tamanho];
  const novaQuantidade = item.quantidade + delta;

  if (novaQuantidade <= 0) {
    carrinho = carrinho.filter(i => !(i.id === id && i.tamanho === tamanho));
  } else if (novaQuantidade > estoqueMaximo) {
    mostrarNotificacao(`Não temos unidades adicionais de tamanho ${tamanho} disponíveis no estoque.`);
    return;
  } else {
    item.quantidade = novaQuantidade;
  }

  salvarCarrinhoLocal();
  atualizarSacolaUI();
}

function removerDoCarrinho(id, tamanho) {
  carrinho = carrinho.filter(item => !(item.id === id && item.tamanho === tamanho));
  salvarCarrinhoLocal();
  atualizarSacolaUI();
}

function atualizarSacolaUI() {
  const container = document.getElementById("carrinho-items-container");
  const subtotalTexto = document.getElementById("carrinho-subtotal");
  const sacolaCount = document.getElementById("sacola-count");
  const finalizarBtn = document.getElementById("carrinho-finalizar");

  // Atualizar contador da sacola
  const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  sacolaCount.textContent = totalItens;

  if (carrinho.length === 0) {
    container.innerHTML = `
      <div class="carrinho-vazio">
        <i class="fas fa-shopping-basket"></i>
        <p>Sua sacola está vazia por enquanto.</p>
        <button class="btn-secundario" onclick="fecharCarrinho()" style="margin-top: 8px;">Continuar Comprando</button>
      </div>
    `;
    subtotalTexto.textContent = "R$ 0,00";
    finalizarBtn.disabled = true;
    return;
  }

  finalizarBtn.disabled = false;
  let subtotal = 0;
  let html = "";

  carrinho.forEach(item => {
    const itemSubtotal = item.preco * item.quantidade;
    subtotal += itemSubtotal;

    html += `
      <div class="carrinho-item">
        <div class="carrinho-item-imagem">
          <img src="${item.imagem}" alt="${item.nome}">
        </div>
        <div class="carrinho-item-info">
          <div class="carrinho-item-nome-tamanho">
            <span class="carrinho-item-nome">${item.nome}</span>
            <span class="carrinho-item-tamanho">Tamanho: ${item.tamanho}</span>
          </div>
          <div class="carrinho-item-rodape">
            <span class="carrinho-item-preco">R$ ${item.preco.toFixed(2).replace(".", ",")}</span>
            
            <div class="quantidade-controle">
              <button class="btn-quantidade" onclick="alterarQuantidade('${item.id}', '${item.tamanho}', -1)" aria-label="Diminuir">&minus;</button>
              <span class="quantidade-valor">${item.quantidade}</span>
              <button class="btn-quantidade" onclick="alterarQuantidade('${item.id}', '${item.tamanho}', 1)" aria-label="Aumentar">&plus;</button>
            </div>

            <button class="carrinho-item-remover" onclick="removerDoCarrinho('${item.id}', '${item.tamanho}')" title="Remover item">
              <i class="far fa-trash-alt"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
  subtotalTexto.textContent = `R$ ${subtotal.toFixed(2).replace(".", ",")}`;
}

function salvarCarrinhoLocal() {
  localStorage.setItem("lumiere_carrinho", JSON.stringify(carrinho));
}

// Notificação toast simplificada na tela
function mostrarNotificacao(mensagem) {
  const div = document.createElement("div");
  div.style.position = "fixed";
  div.style.bottom = "100px";
  div.style.right = "24px";
  div.style.backgroundColor = "var(--cor-8)";
  div.style.color = "var(--cor-2)";
  div.style.padding = "16px var(--espaco-lg)";
  div.style.borderRadius = "var(--raio-sm)";
  div.style.boxShadow = "var(--sombra-media)";
  div.style.zIndex = "2000";
  div.style.fontSize = "14px";
  div.style.fontWeight = "500";
  div.style.border = "1.5px solid var(--cor-3)";
  div.style.animation = "subirFadeIn 0.3s cubic-bezier(0.25, 1, 0.5, 1) both";

  div.innerHTML = `<i class="fas fa-info-circle" style="color: var(--cor-4); margin-right: 8px;"></i> ${mensagem}`;
  document.body.appendChild(div);

  setTimeout(() => {
    div.style.transition = "opacity 0.4s ease, transform 0.4s ease";
    div.style.opacity = "0";
    div.style.transform = "translateY(10px)";
    setTimeout(() => div.remove(), 400);
  }, 4000);
}

// ================================================================
// SUPORTE CHAT WIDGET & FAQs
// ================================================================
function inicializarSuporte() {
  const trigger = document.getElementById("suporte-trigger");
  const widget = document.getElementById("suporte-widget");
  const faqPerguntas = document.querySelectorAll(".faq-pergunta");
  const suporteForm = document.getElementById("suporte-form");
  const navSuporteLink = document.getElementById("nav-suporte-link");
  const footerFaqLink = document.getElementById("footer-faq-link");

  // Toggle Widget de Suporte
  if (trigger && widget) {
    trigger.addEventListener("click", () => {
      trigger.classList.toggle("ativo");
      widget.classList.toggle("ativo");
    });
  }

  // Facilitar acesso do cabeçalho
  if (navSuporteLink && trigger) {
    navSuporteLink.addEventListener("click", (e) => {
      e.preventDefault();
      trigger.click();
    });
  }

  // Facilitar acesso do rodapé
  if (footerFaqLink && trigger) {
    footerFaqLink.addEventListener("click", (e) => {
      e.preventDefault();
      if (!widget.classList.contains("ativo")) {
        trigger.click();
      }
      widget.scrollIntoView({ behavior: "smooth" });
    });
  }

  // Sanfonas (Accordion) de FAQs
  faqPerguntas.forEach(pergunta => {
    pergunta.addEventListener("click", () => {
      const item = pergunta.parentElement;
      const resposta = item.querySelector(".faq-resposta");
      const isAtivo = item.classList.contains("ativo");

      // Fechar outros FAQs abertos
      document.querySelectorAll(".faq-item").forEach(i => {
        i.classList.remove("ativo");
        i.querySelector(".faq-resposta").style.display = "none";
      });

      if (!isAtivo) {
        item.classList.add("ativo");
        resposta.style.display = "block";
      }
    });
  });

  // Formulário de Suporte
  if (suporteForm) {
    suporteForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("✉ Mensagem Enviada!\n\nAgradecemos seu contato. Nossa equipe de concierge responderá você por e-mail em até 24 horas.");
      suporteForm.reset();
      trigger.click(); // Fechar widget
    });
  }
}

// ================================================================
// BUSCA E FILTRAGEM DE PRODUTOS
// ================================================================
function inicializarBusca() {
  const buscaInput = document.getElementById("busca-produtos");
  if (!buscaInput) return;

  buscaInput.addEventListener("input", (e) => {
    const termo = e.target.value.toLowerCase().trim();
    const cards = document.querySelectorAll(".produto-card");
    let algumEncontrado = false;

    cards.forEach(card => {
      const nome = card.getAttribute("data-name").toLowerCase();
      if (nome.includes(termo)) {
        card.style.display = "flex";
        algumEncontrado = true;
      } else {
        card.style.display = "none";
      }
    });

    // Feedback visual se nenhum produto for encontrado
    let aviso = document.getElementById("busca-aviso-vazio");
    if (!algumEncontrado) {
      if (!aviso) {
        aviso = document.createElement("div");
        aviso.id = "busca-aviso-vazio";
        aviso.style.gridColumn = "1 / -1";
        aviso.style.textAlign = "center";
        aviso.style.padding = "var(--espaco-2xl) 0";
        aviso.style.color = "var(--cor-7)";
        aviso.innerHTML = `<i class="fas fa-search-minus" style="font-size: 36px; margin-bottom: 12px; color: var(--cor-4)"></i><p>Nenhuma peça encontrada com "${e.target.value}"</p>`;
        document.querySelector(".vitrine-grid").appendChild(aviso);
      }
    } else {
      if (aviso) aviso.remove();
    }
  });
}
