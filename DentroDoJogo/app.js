/* ================================================================
   [DENTRO DO JOGO - FIFA WORLD CUP 2026]
   ARQUIVO: app.js — INTERATIVIDADE DO PORTAL PRINCIPAL
   ================================================================ */

// SVG Flags para Seleções (Resoluções de alta fidelidade inline)
const FLAG_SVGS = {
  "Brasil": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 504" width="28" height="20"><rect width="720" height="504" fill="#009b3a"/><polygon points="360,54 666,252 360,450 54,252" fill="#fedf00"/><circle cx="360" cy="252" r="102" fill="#002776"/><path d="M258,252 a102,102 0 0,0 204,0" fill="none" stroke="#ffffff" stroke-width="8"/></svg>`,
  "Argentina": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" width="28" height="20"><rect width="300" height="200" fill="#74acdf"/><rect y="66" width="300" height="68" fill="#ffffff"/><circle cx="150" cy="100" r="18" fill="#f6b40e"/><circle cx="150" cy="100" r="15" fill="#f6b40e"/></svg>`,
  "Alemanha": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" width="28" height="20"><rect width="5" height="1" fill="#000"/><rect y="1" width="5" height="1" fill="#dd0000"/><rect y="2" width="5" height="1" fill="#ffcf00"/></svg>`,
  "França": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" width="28" height="20"><rect width="1" height="2" fill="#002395"/><rect x="1" width="1" height="2" fill="#ffffff"/><rect x="2" width="1" height="2" fill="#ed2939"/></svg>`,
  "Espanha": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 500" width="28" height="20"><rect width="750" height="500" fill="#c60b1e"/><rect y="125" width="750" height="250" fill="#ffc400"/><circle cx="180" cy="250" r="30" fill="#c60b1e"/></svg>`,
  "Itália": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" width="28" height="20"><rect width="1" height="2" fill="#009246"/><rect x="1" width="1" height="2" fill="#ffffff"/><rect x="2" width="1" height="2" fill="#ce2b37"/></svg>`,
  "Portugal": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="28" height="20"><rect width="240" height="400" fill="#006600"/><rect x="240" width="360" height="400" fill="#ff0000"/><circle cx="240" cy="200" r="60" fill="#fedf00"/></svg>`,
  "Japão": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" width="28" height="20"><rect width="900" height="600" fill="#ffffff"/><circle cx="450" cy="300" r="180" fill="#bc002d"/></svg>`,
  "EUA": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7410 3900" width="28" height="20"><rect width="7410" height="3900" fill="#b22234"/><rect width="7410" height="300" fill="#ffffff"/><rect y="600" width="7410" height="300" fill="#ffffff"/><rect y="1200" width="7410" height="300" fill="#ffffff"/><rect y="1800" width="7410" height="300" fill="#ffffff"/><rect y="2400" width="7410" height="300" fill="#ffffff"/><rect y="3000" width="7410" height="300" fill="#ffffff"/><rect y="3600" width="7410" height="300" fill="#ffffff"/><rect width="2964" height="2100" fill="#3c3b6e"/><circle cx="1482" cy="1050" r="400" fill="#ffffff"/></svg>`,
  "México": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7 4" width="28" height="20"><rect width="2.33" height="4" fill="#116843"/><rect x="2.33" width="2.33" height="4" fill="#ffffff"/><rect x="4.66" width="2.33" height="4" fill="#c8102e"/><circle cx="3.5" cy="2" r="0.5" fill="#d4af37"/></svg>`,
  "Canadá": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 1" width="28" height="20"><rect width="2" height="1" fill="#ff0000"/><rect x="0.5" width="1" height="1" fill="#ffffff"/><polygon points="1,0.25 1.1,0.45 1.3,0.45 1.15,0.55 1.25,0.75 1,0.6 0.75,0.75 0.85,0.55 0.7,0.45 0.9,0.45" fill="#ff0000"/></svg>`,
  "Marrocos": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" width="28" height="20"><rect width="3" height="2" fill="#c1272d"/><polygon points="1.5,0.7 1.62,1.07 1.31,0.84 1.69,0.84 1.38,1.07" fill="none" stroke="#006233" stroke-width="0.08"/></svg>`,
  "Uruguai": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 20" width="28" height="20"><rect width="30" height="20" fill="#ffffff"/><rect y="2" width="30" height="2" fill="#0081c6"/><rect y="6" width="30" height="2" fill="#0081c6"/><rect y="10" width="30" height="2" fill="#0081c6"/><rect y="14" width="30" height="2" fill="#0081c6"/><rect y="18" width="30" height="2" fill="#0081c6"/><rect width="10" height="10" fill="#ffffff"/><circle cx="5" cy="5" r="3" fill="#fecd04"/></svg>`,
  "Inglaterra": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" width="28" height="20"><rect width="5" height="3" fill="#ffffff"/><rect x="2" width="1" height="3" fill="#cf142b"/><rect y="1" width="5" height="1" fill="#cf142b"/></svg>`
};

function obterBandeiraHtml(nomeSelecao) {
  return FLAG_SVGS[nomeSelecao] || `<div class="bandeira-placeholder">${nomeSelecao.substring(0, 3).toUpperCase()}</div>`;
}

// Banco de Dados Inicial (caso não exista no localStorage)
const DADOS_INICIAIS = {
  noticias: [
    {
      id: 1,
      titulo: "Super clássico nas Quartas de Final: Brasil e Argentina se enfrentam em Nova York",
      resumo: "Pela primeira vez em solo americano na Copa de 2026, as duas potências sul-americanas fazem o jogo mais esperado do ano. Expectativa de recorde de audiência mundial.",
      texto: "O clássico que para o mundo terá sua versão mais épica em 2026. A FIFA confirmou que a partida das quartas de final entre Brasil e Argentina acontecerá no MetLife Stadium. Ambas as seleções chegam invictas e embaladas pelas atuações brilhantes de suas jovens estrelas. O técnico da seleção brasileira prometeu um time ofensivo, enquanto a Argentina aposta na sua forte coesão tática e liderança emocional.",
      imagem: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
      categoria: "Destaque",
      data: "23 Jun. 2026",
      leitura: "5 min",
      principal: true
    },
    {
      id: 2,
      titulo: "Como os EUA se prepararam para receber a maior Copa do Mundo da história",
      resumo: "Conheça os estádios ultra-modernos e as inovações tecnológicas preparadas para os torcedores.",
      texto: "A Copa de 2026 promete ser revolucionária. Com 48 seleções participantes, a infraestrutura das cidades-sede americanas passou por melhorias sem precedentes. Sistemas de transporte integrados por trens rápidos e estádios com zero pegada de carbono são as principais apostas do comitê organizador.",
      imagem: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80",
      categoria: "Copa 2026",
      data: "22 Jun. 2026",
      leitura: "4 min",
      principal: false
    },
    {
      id: 3,
      titulo: "Japão surpreende a Alemanha com goleada histórica na fase de grupos",
      resumo: "A seleção asiática mostrou velocidade letal nos contra-ataques e assumiu a liderança do grupo.",
      texto: "O placar de 4 a 1 para o Japão chocou o mundo do futebol. A seleção alemã teve dificuldades para conter a velocidade dos pontas japoneses. Com passes verticais e eficiência máxima nos arremates, o Japão garantiu a classificação antecipada para as oitavas de final.",
      imagem: "https://images.unsplash.com/photo-1540747737956-37872404a821?auto=format&fit=crop&w=600&q=80",
      categoria: "Últimas",
      data: "21 Jun. 2026",
      leitura: "3 min",
      principal: false
    },
    {
      id: 4,
      titulo: "Curiosidades: Os estádios que são verdadeiras obras de arte arquitetônicas",
      resumo: "De coberturas retráteis a painéis solares gigantescos, os estádios de 2026 redefinem a arquitetura.",
      texto: "A arquitetura esportiva atingiu novos patamares. O SoFi Stadium em Los Angeles e o Mercedes-Benz Stadium em Atlanta contam com painéis de LED panorâmicos gigantescos em 360 graus que oferecem estatísticas em tempo real para os torcedores durante as partidas.",
      imagem: "https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=600&q=80",
      categoria: "Curiosidades",
      data: "20 Jun. 2026",
      leitura: "6 min",
      principal: false
    }
  ],
  jogos: [
    {
      id: 1,
      timeA: "Brasil",
      timeB: "Argentina",
      golsA: 2,
      golsB: 1,
      status: "Finalizado",
      data: "23/06/2026",
      horario: "16:00",
      estadio: "MetLife Stadium, NY"
    },
    {
      id: 2,
      timeA: "Alemanha",
      timeB: "Japão",
      golsA: 1,
      golsB: 4,
      status: "Finalizado",
      data: "21/06/2026",
      horario: "13:00",
      estadio: "SoFi Stadium, LA"
    },
    {
      id: 3,
      timeA: "França",
      timeB: "Espanha",
      golsA: 2,
      golsB: 2,
      status: "Finalizado",
      data: "22/06/2026",
      horario: "21:00",
      estadio: "Mercedes-Benz Stadium, Atlanta"
    },
    {
      id: 4,
      timeA: "EUA",
      timeB: "México",
      golsA: null,
      golsB: null,
      status: "Agendado",
      data: "26/06/2026",
      horario: "19:00",
      estadio: "Azteca, Cidade do México"
    },
    {
      id: 5,
      timeA: "Portugal",
      timeB: "Itália",
      golsA: null,
      golsB: null,
      status: "Agendado",
      data: "27/06/2026",
      horario: "15:00",
      estadio: "Hard Rock Stadium, Miami"
    },
    {
      id: 6,
      timeA: "Uruguai",
      timeB: "Marrocos",
      golsA: null,
      golsB: null,
      status: "Agendado",
      data: "28/06/2026",
      horario: "18:00",
      estadio: "BC Place, Vancouver"
    }
  ],
  classificacao: [
    {
      grupo: "Grupo A",
      times: [
        { posicao: 1, selecao: "Brasil", pontos: 9, vitorias: 3, empates: 0, derrotas: 0, saldoGols: 7 },
        { posicao: 2, selecao: "Argentina", pontos: 6, vitorias: 2, empates: 0, derrotas: 1, saldoGols: 3 },
        { posicao: 3, selecao: "Uruguai", pontos: 3, vitorias: 1, empates: 0, derrotas: 2, saldoGols: -2 },
        { posicao: 4, selecao: "EUA", pontos: 0, vitorias: 0, empates: 0, derrotas: 3, saldoGols: -8 }
      ]
    },
    {
      grupo: "Grupo B",
      times: [
        { posicao: 1, selecao: "Japão", pontos: 7, vitorias: 2, empates: 1, derrotas: 0, saldoGols: 5 },
        { posicao: 2, selecao: "França", pontos: 5, vitorias: 1, empates: 2, derrotas: 0, saldoGols: 2 },
        { posicao: 3, selecao: "Espanha", pontos: 4, vitorias: 1, empates: 1, derrotas: 1, saldoGols: 0 },
        { posicao: 4, selecao: "Alemanha", pontos: 0, vitorias: 0, empates: 0, derrotas: 3, saldoGols: -7 }
      ]
    }
  ]
};

// Carregar ou Inicializar Banco de Dados local
function obterBancoDados() {
  const dados = localStorage.getItem("DENTRO_DO_JOGO_DATA");
  if (!dados) {
    localStorage.setItem("DENTRO_DO_JOGO_DATA", JSON.stringify(DADOS_INICIAIS));
    return DADOS_INICIAIS;
  }
  return JSON.parse(dados);
}

// Salva dados no localStorage
function salvarBancoDados(dados) {
  localStorage.setItem("DENTRO_DO_JOGO_DATA", JSON.stringify(dados));
}

// Inicializa a aplicação ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  const bd = obterBancoDados();
  
  // Menu Mobile Interativo
  configurarMenuMobile();

  // Scroll Suave nos links
  configurarScrollSuave();

  // Renderizações Dinâmicas (Apenas se os containers existirem na página pública)
  if (document.getElementById("noticia-destaque-wrapper")) {
    renderizarNoticias(bd.noticias);
  }
  if (document.getElementById("jogos-grid")) {
    renderizarJogos(bd.jogos);
    configurarFiltrosJogos(bd.jogos);
  }
  if (document.getElementById("classificacao-grupos")) {
    renderizarClassificacao(bd.classificacao);
  }
});

// 1. Configuração do Menu Mobile
function configurarMenuMobile() {
  const btnToggle = document.getElementById("btn-menu-toggle");
  const navbar = document.getElementById("navbar-main");
  
  if (btnToggle && navbar) {
    btnToggle.addEventListener("click", () => {
      navbar.classList.toggle("ativo");
      const icone = btnToggle.querySelector("i");
      if (icone) {
        if (navbar.classList.contains("ativo")) {
          icone.className = "fas fa-times";
        } else {
          icone.className = "fas fa-bars";
        }
      }
    });

    // Fechar ao clicar em algum link
    const links = navbar.querySelectorAll(".nav-link");
    links.forEach(link => {
      link.addEventListener("click", () => {
        navbar.classList.remove("ativo");
        const icone = btnToggle.querySelector("i");
        if (icone) icone.className = "fas fa-bars";
      });
    });
  }
}

// 2. Scroll Suave e Ativação de Links da Navbar
function configurarScrollSuave() {
  const links = document.querySelectorAll(".nav-link");
  const headerHeight = document.querySelector(".cabecalho")?.offsetHeight || 80;

  // Adiciona interseção observer para atualizar o menu ativo ao rolar
  const sections = document.querySelectorAll("section[id]");
  const options = {
    root: null,
    rootMargin: `-${headerHeight}px 0px -40% 0px`,
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        links.forEach(link => {
          link.classList.remove("ativo");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("ativo");
          }
        });
      }
    });
  }, options);

  sections.forEach(section => observer.observe(section));
}

// 3. Renderização das Notícias
function renderizarNoticias(noticias) {
  const principalWrapper = document.getElementById("noticia-destaque-wrapper");
  const gridWrapper = document.getElementById("noticias-grid");
  
  if (!principalWrapper || !gridWrapper) return;

  principalWrapper.innerHTML = "";
  gridWrapper.innerHTML = "";

  // Encontra a notícia principal
  const principal = noticias.find(n => n.principal) || noticias[0];
  const secundarias = noticias.filter(n => n.id !== principal.id);

  // Renderiza Destaque Principal
  if (principal) {
    principalWrapper.innerHTML = `
      <div class="banner-destaque animar-escalar" style="background-image: linear-gradient(180deg, rgba(3, 4, 8, 0.2) 0%, rgba(3, 4, 8, 0.95) 90%), url('${principal.imagem}');">
        <div class="banner-conteudo">
          <span class="badge badge-principal"><i class="fas fa-star"></i> ${principal.categoria}</span>
          <h2 class="banner-titulo">${principal.titulo}</h2>
          <p class="banner-texto">${principal.resumo}</p>
          <div class="banner-rodape">
            <span class="banner-meta"><i class="far fa-calendar"></i> ${principal.data} · <i class="far fa-clock"></i> ${principal.leitura}</span>
            <button class="btn-primario" onclick="abrirModalNoticia(${principal.id})">Ler Matéria Completa <i class="fas fa-arrow-right"></i></button>
          </div>
        </div>
      </div>
    `;
  }

  // Renderiza Grid de Notícias
  secundarias.forEach((n, idx) => {
    const card = document.createElement("article");
    card.className = `noticia-card animar-subir delay-${(idx % 3) + 1}`;
    card.innerHTML = `
      <div class="noticia-card-imagem" style="background-image: url('${n.imagem}');">
        <span class="noticia-card-tag">${n.categoria}</span>
      </div>
      <div class="noticia-card-corpo">
        <h3 class="noticia-card-titulo">${n.titulo}</h3>
        <p class="noticia-card-texto">${n.resumo}</p>
        <div class="noticia-card-rodape">
          <span class="noticia-card-meta"><i class="far fa-calendar"></i> ${n.data}</span>
          <button class="btn-ler-mais" onclick="abrirModalNoticia(${n.id})">Ler Mais <i class="fas fa-chevron-right"></i></button>
        </div>
      </div>
    `;
    gridWrapper.appendChild(card);
  });
}

// 4. Renderização dos Jogos e Resultados
function renderizarJogos(jogos, filtro = "todos") {
  const container = document.getElementById("jogos-grid");
  if (!container) return;

  container.innerHTML = "";
  
  let jogosFiltrados = jogos;
  if (filtro === "resultados") {
    jogosFiltrados = jogos.filter(j => j.status === "Finalizado");
  } else if (filtro === "proximos") {
    jogosFiltrados = jogos.filter(j => j.status === "Agendado" || j.status === "Ao Vivo");
  }

  if (jogosFiltrados.length === 0) {
    container.innerHTML = `<div class="sem-jogos">Nenhuma partida encontrada para este filtro.</div>`;
    return;
  }

  jogosFiltrados.forEach((j, idx) => {
    const card = document.createElement("div");
    card.className = `partida-card animar-subir delay-${(idx % 3) + 1}`;
    
    const badgeClass = j.status === "Finalizado" ? "badge-finalizado" : (j.status === "Ao Vivo" ? "badge-ao-vivo" : "badge-agendado");
    const placarHtml = j.status === "Finalizado" || j.status === "Ao Vivo" 
      ? `<div class="partida-placar-valores">
          <span class="placar-gols">${j.golsA}</span>
          <span class="placar-divisor">:</span>
          <span class="placar-gols">${j.golsB}</span>
         </div>`
      : `<div class="partida-placar-horario">
          <span class="placar-hora">${j.horario}</span>
         </div>`;

    card.innerHTML = `
      <div class="partida-header">
        <span class="badge ${badgeClass}">${j.status}</span>
        <span class="partida-data"><i class="far fa-calendar-alt"></i> ${j.data}</span>
      </div>
      <div class="partida-confronto">
        <div class="time-container">
          <div class="bandeira-wrapper">${obterBandeiraHtml(j.timeA)}</div>
          <span class="time-nome">${j.timeA}</span>
        </div>
        
        <div class="placar-container">
          ${placarHtml}
        </div>
        
        <div class="time-container">
          <div class="bandeira-wrapper">${obterBandeiraHtml(j.timeB)}</div>
          <span class="time-nome">${j.timeB}</span>
        </div>
      </div>
      <div class="partida-footer">
        <i class="fas fa-map-marker-alt"></i> <span>${j.estadio}</span>
      </div>
    `;
    container.appendChild(card);
  });
}

// Configurar Abas/Filtros de Jogos
function configurarFiltrosJogos(jogos) {
  const botoes = document.querySelectorAll(".filtro-btn");
  botoes.forEach(btn => {
    btn.addEventListener("click", () => {
      botoes.forEach(b => b.classList.remove("ativo"));
      btn.classList.add("ativo");
      const filtro = btn.getAttribute("data-filtro");
      renderizarJogos(jogos, filtro);
    });
  });
}

// 5. Renderização da Classificação
function renderizarClassificacao(classificacao) {
  const container = document.getElementById("classificacao-grupos");
  if (!container) return;

  container.innerHTML = "";

  classificacao.forEach((grupoObj, idx) => {
    const classCard = document.createElement("div");
    classCard.className = `grupo-card animar-subir delay-${idx + 1}`;
    
    let linhasTabelaHtml = "";
    
    // Ordena os times por pontos desc, saldoGols desc
    const timesOrdenados = [...grupoObj.times].sort((a, b) => {
      if (b.pontos !== a.pontos) return b.pontos - a.pontos;
      return b.saldoGols - a.saldoGols;
    });

    timesOrdenados.forEach((t, i) => {
      const classLinha = i < 2 ? "zona-classificacao" : ""; // G-2 (Primeiro e segundo classificam)
      linhasTabelaHtml += `
        <tr class="${classLinha}">
          <td class="col-pos">${i + 1}</td>
          <td class="col-selecao">
            <div class="selecao-info">
              ${obterBandeiraHtml(t.selecao)}
              <span class="selecao-nome">${t.selecao}</span>
            </div>
          </td>
          <td class="col-pts"><strong>${t.pontos}</strong></td>
          <td>${t.vitorias}</td>
          <td>${t.empates}</td>
          <td>${t.derrotas}</td>
          <td class="col-sg">${t.saldoGols > 0 ? "+" + t.saldoGols : t.saldoGols}</td>
        </tr>
      `;
    });

    classCard.innerHTML = `
      <h3 class="grupo-titulo">${grupoObj.grupo}</h3>
      <div class="tabela-responsiva">
        <table class="tabela-classificacao">
          <thead>
            <tr>
              <th class="col-pos">#</th>
              <th class="col-selecao text-left">Seleção</th>
              <th class="col-pts">P</th>
              <th>V</th>
              <th>E</th>
              <th>D</th>
              <th class="col-sg">SG</th>
            </tr>
          </thead>
          <tbody>
            ${linhasTabelaHtml}
          </tbody>
        </table>
      </div>
      <div class="grupo-legenda">
        <span class="legenda-quadrado"></span> Classificados para Oitavas de Final
      </div>
    `;
    container.appendChild(classCard);
  });
}

// 6. Modal de Notícia Completa (Simulação Visual)
function abrirModalNoticia(id) {
  const bd = obterBancoDados();
  const noticia = bd.noticias.find(n => n.id === id);
  if (!noticia) return;

  // Cria elemento modal
  const modal = document.createElement("div");
  modal.className = "modal-noticia-wrapper animar-fade";
  modal.innerHTML = `
    <div class="modal-noticia-content">
      <button class="modal-close" onclick="fecharModalNoticia()"><i class="fas fa-times"></i></button>
      <div class="modal-header-imagem" style="background-image: url('${noticia.imagem}');"></div>
      <div class="modal-corpo">
        <span class="badge badge-principal">${noticia.categoria}</span>
        <h2 class="modal-titulo">${noticia.titulo}</h2>
        <div class="modal-meta">
          <span><i class="far fa-calendar"></i> ${noticia.data}</span> · 
          <span><i class="far fa-clock"></i> Tempo de leitura: ${noticia.leitura}</span>
        </div>
        <p class="modal-introducao">${noticia.resumo}</p>
        <div class="modal-texto-completo">
          <p>${noticia.texto}</p>
          <p>A cobertura completa da Copa do Mundo FIFA 2026 você acompanha aqui no <strong>Dentro do Jogo</strong>, trazendo análises táticas, entrevistas exclusivas e o tempo real de todos os confrontos que definirão o campeão do mundo.</p>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  document.body.style.overflow = "hidden"; // Desativa scroll da página
}

function fecharModalNoticia() {
  const modal = document.querySelector(".modal-noticia-wrapper");
  if (modal) {
    modal.classList.add("saindo");
    setTimeout(() => {
      modal.remove();
      document.body.style.overflow = "auto";
    }, 300);
  }
}
window.fecharModalNoticia = fecharModalNoticia;
window.abrirModalNoticia = abrirModalNoticia;
