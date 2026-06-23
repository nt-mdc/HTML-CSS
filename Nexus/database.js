// ================================================================
// [NEXUS ELECTRONICS - BANCO DE DADOS LOCAL]
// ARQUIVO: database.js — Inicializador de dados no localStorage
// ================================================================

// Produtos Padrão
const PRODUTOS_INICIAIS = [
  {
    id: "NEX-001",
    nome: "Nexus Phone Pro",
    categoria: "Smartphones",
    marca: "Nexus",
    descricao: "O smartphone definitivo. Processador neural de última geração, câmera de 200MP e tela AMOLED LTPO de 120Hz com brilho de 3000 nits.",
    preco: 5499.00,
    estoque: 15,
    imagem: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600"
  },
  {
    id: "NEX-002",
    nome: "Nexus Fold X",
    categoria: "Smartphones",
    marca: "Nexus",
    descricao: "Inovação dobrável. Tela flexível Ultra Thin Glass, dobradiça reforçada e multitarefas avançado com design ultrafino de luxo.",
    preco: 8999.00,
    estoque: 3, // Estoque baixo!
    imagem: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=600"
  },
  {
    id: "NEX-003",
    nome: "Nexus Book Carbon",
    categoria: "Notebooks",
    marca: "Nexus",
    descricao: "Ultraportabilidade e potência. Construído em fibra de carbono, chip M4 PRO, 32GB RAM e bateria com até 22 horas de duração.",
    preco: 10299.00,
    estoque: 5,
    imagem: "https://images.unsplash.com/photo-1496181130204-7552cc14ac1a?q=80&w=600"
  },
  {
    id: "NEX-004",
    nome: "Nexus Book Air",
    categoria: "Notebooks",
    marca: "Nexus",
    descricao: "Leve como o ar, poderoso como sempre. Design fanless totalmente silencioso, tela Liquid Retina de 14 polegadas e som espacial.",
    preco: 7899.00,
    estoque: 0, // Esgotado!
    imagem: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600"
  },
  {
    id: "NEX-005",
    nome: "Nexus Sound Earbuds",
    categoria: "Fones",
    marca: "SoundLab",
    descricao: "Cancelamento ativo de ruído inteligente de 50dB, drivers de áudio de alta resolução banhados a ouro e até 40 horas de reprodução total.",
    preco: 899.00,
    estoque: 22,
    imagem: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=600"
  },
  {
    id: "NEX-006",
    nome: "Nexus Sound Max",
    categoria: "Fones",
    marca: "SoundLab",
    descricao: "Fones Over-Ear premium. Acabamento em alumínio anodizado, som Hi-Fi de nível de estúdio e almofadas magnéticas ultra confortáveis.",
    preco: 2499.00,
    estoque: 2, // Estoque baixo!
    imagem: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600"
  }
];

// Usuário Padrão (Nathan)
const USUARIO_PADRAO = {
  nome: "Nathan",
  email: "nathan@nexus.com.br",
  senha: "123",
  endereco: "Av. Paulista, 1000 - Bela Vista - São Paulo, SP",
  telefone: "(11) 98765-4321"
};

// Pedidos Iniciais
const PEDIDOS_INICIAIS = [
  {
    id: "NEX-ORD-1042",
    data: "2026-06-10T14:30:00.000Z",
    status: "Entregue",
    total: 899.00,
    itens: [
      { id: "NEX-005", nome: "Nexus Sound Earbuds", quantidade: 1, preco: 899.00 }
    ]
  },
  {
    id: "NEX-ORD-1089",
    data: "2026-06-22T09:15:00.000Z",
    status: "Pago",
    total: 5499.00,
    itens: [
      { id: "NEX-001", nome: "Nexus Phone Pro", quantidade: 1, preco: 5499.00 }
    ]
  }
];

// Inicializador
function inicializarBancoDeDados() {
  // Inicializa produtos se não existirem
  if (!localStorage.getItem("nexus_products")) {
    localStorage.setItem("nexus_products", JSON.stringify(PRODUTOS_INICIAIS));
  }

  // Inicializa usuários se não existirem
  if (!localStorage.getItem("nexus_users")) {
    localStorage.setItem("nexus_users", JSON.stringify([USUARIO_PADRAO]));
  }

  // Inicializa usuário logado se não houver nenhum
  if (!localStorage.getItem("nexus_current_user")) {
    localStorage.setItem("nexus_current_user", JSON.stringify(USUARIO_PADRAO));
  }

  // Inicializa pedidos se não existirem
  if (!localStorage.getItem("nexus_orders")) {
    localStorage.setItem("nexus_orders", JSON.stringify(PEDIDOS_INICIAIS));
  }
}

// Executa a inicialização
inicializarBancoDeDados();
