/* ================================================================
   [DENTRO DO JOGO - FIFA WORLD CUP 2026]
   ARQUIVO: dashboard.js — CONTROLE E LÓGICA DO PAINEL ADMIN
   ================================================================ */

// SVG Flags para Seleções (Sincronizado com app.js)
const FLAG_SVGS = {
  "Brasil": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 504" width="22" height="15"><rect width="720" height="504" fill="#009b3a"/><polygon points="360,54 666,252 360,450 54,252" fill="#fedf00"/><circle cx="360" cy="252" r="102" fill="#002776"/><path d="M258,252 a102,102 0 0,0 204,0" fill="none" stroke="#ffffff" stroke-width="8"/></svg>`,
  "Argentina": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" width="22" height="15"><rect width="300" height="200" fill="#74acdf"/><rect y="66" width="300" height="68" fill="#ffffff"/><circle cx="150" cy="100" r="18" fill="#f6b40e"/><circle cx="150" cy="100" r="15" fill="#f6b40e"/></svg>`,
  "Alemanha": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" width="22" height="15"><rect width="5" height="1" fill="#000"/><rect y="1" width="5" height="1" fill="#dd0000"/><rect y="2" width="5" height="1" fill="#ffcf00"/></svg>`,
  "França": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" width="22" height="15"><rect width="1" height="2" fill="#002395"/><rect x="1" width="1" height="2" fill="#ffffff"/><rect x="2" width="1" height="2" fill="#ed2939"/></svg>`,
  "Espanha": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 500" width="22" height="15"><rect width="750" height="500" fill="#c60b1e"/><rect y="125" width="750" height="250" fill="#ffc400"/><circle cx="180" cy="250" r="30" fill="#c60b1e"/></svg>`,
  "Itália": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" width="22" height="15"><rect width="1" height="2" fill="#009246"/><rect x="1" width="1" height="2" fill="#ffffff"/><rect x="2" width="1" height="2" fill="#ce2b37"/></svg>`,
  "Portugal": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="22" height="15"><rect width="240" height="400" fill="#006600"/><rect x="240" width="360" height="400" fill="#ff0000"/><circle cx="240" cy="200" r="60" fill="#fedf00"/></svg>`,
  "Japão": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" width="22" height="15"><rect width="900" height="600" fill="#ffffff"/><circle cx="450" cy="300" r="180" fill="#bc002d"/></svg>`,
  "EUA": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7410 3900" width="22" height="15"><rect width="7410" height="3900" fill="#b22234"/><rect width="7410" height="300" fill="#ffffff"/><rect y="600" width="7410" height="300" fill="#ffffff"/><rect y="1200" width="7410" height="300" fill="#ffffff"/><rect y="1800" width="7410" height="300" fill="#ffffff"/><rect y="2400" width="7410" height="300" fill="#ffffff"/><rect y="3000" width="7410" height="300" fill="#ffffff"/><rect y="3600" width="7410" height="300" fill="#ffffff"/><rect width="2964" height="2100" fill="#3c3b6e"/><circle cx="1482" cy="1050" r="400" fill="#ffffff"/></svg>`,
  "México": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7 4" width="22" height="15"><rect width="2.33" height="4" fill="#116843"/><rect x="2.33" width="2.33" height="4" fill="#ffffff"/><rect x="4.66" width="2.33" height="4" fill="#c8102e"/><circle cx="3.5" cy="2" r="0.5" fill="#d4af37"/></svg>`,
  "Canadá": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 1" width="22" height="15"><rect width="2" height="1" fill="#ff0000"/><rect x="0.5" width="1" height="1" fill="#ffffff"/><polygon points="1,0.25 1.1,0.45 1.3,0.45 1.15,0.55 1.25,0.75 1,0.6 0.75,0.75 0.85,0.55 0.7,0.45 0.9,0.45" fill="#ff0000"/></svg>`,
  "Marrocos": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" width="22" height="15"><rect width="3" height="2" fill="#c1272d"/><polygon points="1.5,0.7 1.62,1.07 1.31,0.84 1.69,0.84 1.38,1.07" fill="none" stroke="#006233" stroke-width="0.08"/></svg>`,
  "Uruguai": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 20" width="22" height="15"><rect width="30" height="20" fill="#ffffff"/><rect y="2" width="30" height="2" fill="#0081c6"/><rect y="6" width="30" height="2" fill="#0081c6"/><rect y="10" width="30" height="2" fill="#0081c6"/><rect y="14" width="30" height="2" fill="#0081c6"/><rect y="18" width="30" height="2" fill="#0081c6"/><rect width="10" height="10" fill="#ffffff"/><circle cx="5" cy="5" r="3" fill="#fecd04"/></svg>`,
  "Inglaterra": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" width="22" height="15"><rect width="5" height="3" fill="#ffffff"/><rect x="2" width="1" height="3" fill="#cf142b"/><rect y="1" width="5" height="1" fill="#cf142b"/></svg>`
};

function obterBandeiraHtml(nomeSelecao) {
  return FLAG_SVGS[nomeSelecao] || `<div class="bandeira-placeholder-admin">${nomeSelecao.substring(0,2).toUpperCase()}</div>`;
}

// Banco de Dados Inicial de Segurança (Caso o index não tenha rodado antes)
const DADOS_INICIAIS_PADRAO = {
  noticias: [
    {
      id: 1,
      titulo: "Super clássico nas Quartas de Final: Brasil e Argentina se enfrentam em Nova York",
      resumo: "Pela primeira vez em solo americano na Copa de 2026, as duas potências sul-americanas fazem o jogo mais esperado do ano. Expectativa de recorde de audiência mundial.",
      texto: "O clássico que para o mundo terá sua versão mais épica em 2026. A FIFA confirmou que a partida das quartas de final entre Brasil e Argentina acontecerá no MetLife Stadium. Ambas as seleções chegam invictas e embaladas pelas atuações brilhantes de suas jovens estrelas.",
      imagem: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
      categoria: "Destaque",
      data: "23 Jun. 2026",
      leitura: "5 min",
      principal: true
    }
  ],
  jogos: [],
  classificacao: []
};

// Obter banco do localStorage
function obterBancoDados() {
  const dados = localStorage.getItem("DENTRO_DO_JOGO_DATA");
  if (!dados) {
    localStorage.setItem("DENTRO_DO_JOGO_DATA", JSON.stringify(DADOS_INICIAIS_PADRAO));
    return DADOS_INICIAIS_PADRAO;
  }
  return JSON.parse(dados);
}

// Salvar banco no localStorage
function salvarBancoDados(dados) {
  localStorage.setItem("DENTRO_DO_JOGO_DATA", JSON.stringify(dados));
}

// Lógica de Inicialização
document.addEventListener("DOMContentLoaded", () => {
  configurarNavegacaoAbas();
  carregarDashboardGeral();
});

// 1. Configurar alternância de abas da Sidebar
function configurarNavegacaoAbas() {
  const botoesMenu = document.querySelectorAll(".menu-item[data-tab]");
  const abas = document.querySelectorAll(".tab-secao");
  const tituloAba = document.getElementById("titulo-aba");
  const subtituloAba = document.getElementById("subtitulo-aba");

  const titulosAba = {
    "visao-geral": { t: "Painel Geral", s: "Acompanhamento geral de métricas, placares e notícias." },
    "gerenciar-jogos": { t: "Gerenciamento de Jogos", s: "Cadastre novas partidas, edite informações e publique placares em tempo real." },
    "gerenciar-noticias": { t: "Gerenciamento de Notícias", s: "Redija e gerencie artigos, comunicados e matérias especiais da Copa." },
    "gerenciar-classificacao": { t: "Classificação Geral", s: "Atualize pontos, vitórias, empates e saldos dos grupos do Mundial." },
    "preferencias": { t: "Configurações do Portal", s: "Personalize regras de atualização automática e preferências de fuso horário." }
  };

  botoesMenu.forEach(btn => {
    btn.addEventListener("click", () => {
      const tabTarget = btn.getAttribute("data-tab");
      
      // Remove ativos
      botoesMenu.forEach(b => b.classList.remove("ativo"));
      abas.forEach(aba => aba.classList.remove("ativo"));
      
      // Adiciona ativo no selecionado
      btn.classList.add("ativo");
      document.getElementById(`tab-${tabTarget}`).classList.add("ativo");
      
      // Atualiza título do cabeçalho
      if (titulosAba[tabTarget]) {
        tituloAba.textContent = titulosAba[tabTarget].t;
        subtituloAba.textContent = titulosAba[tabTarget].s;
      }

      // Recarrega informações específicas da aba aberta
      recarregarDadosAba(tabTarget);
    });
  });
}

// Recarrega informações baseadas na aba atual
function recarregarDadosAba(aba) {
  const bd = obterBancoDados();
  if (aba === "visao-geral") {
    carregarDashboardGeral();
  } else if (aba === "gerenciar-jogos") {
    listarJogosAdmin(bd.jogos);
    limparFormJogo();
  } else if (aba === "gerenciar-noticias") {
    listarNoticiasAdmin(bd.noticias);
    limparFormNoticia();
  } else if (aba === "gerenciar-classificacao") {
    carregarClassificacaoAdmin(bd.classificacao);
  }
}

// 2. LOGOUT DO PAINEL
function fazerLogout() {
  localStorage.removeItem("DENTRO_DO_JOGO_LOGADO");
  window.location.href = "../auth/login.html";
}
window.fazerLogout = fazerLogout;

// 3. CARREGAR ABA: VISÃO GERAL
function carregarDashboardGeral() {
  const bd = obterBancoDados();
  
  // Atualiza contadores
  document.getElementById("qtd-noticias").textContent = bd.noticias.length;
  document.getElementById("qtd-jogos").textContent = bd.jogos.length;
  
  // Lista rápida de jogos
  const divJogos = document.getElementById("visao-geral-jogos-lista");
  divJogos.innerHTML = "";
  if (bd.jogos.length === 0) {
    divJogos.innerHTML = `<div class="texto-suave">Nenhum jogo cadastrado.</div>`;
  } else {
    // Pega os 3 últimos jogos cadastrados
    bd.jogos.slice(-3).reverse().forEach(j => {
      const placar = j.status !== "Agendado" ? `(${j.golsA} x ${j.golsB})` : `(${j.horario})`;
      divJogos.innerHTML += `
        <div class="item-rapido-linha">
          <span><strong>${j.timeA} vs ${j.timeB}</strong> ${placar}</span>
          <span class="badge ${j.status === "Finalizado" ? "badge-finalizado" : (j.status === "Ao Vivo" ? "badge-ao-vivo" : "badge-agendado")}">${j.status}</span>
        </div>
      `;
    });
  }

  // Lista rápida de notícias
  const divNoticias = document.getElementById("visao-geral-noticias-lista");
  divNoticias.innerHTML = "";
  if (bd.noticias.length === 0) {
    divNoticias.innerHTML = `<div class="texto-suave">Nenhuma notícia publicada.</div>`;
  } else {
    bd.noticias.slice(-3).reverse().forEach(n => {
      divNoticias.innerHTML += `
        <div class="item-rapido-linha">
          <span class="texto-limite-admin" style="max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${n.titulo}</span>
          <span class="badge badge-principal">${n.categoria}</span>
        </div>
      `;
    });
  }
}

// 4. LÓGICA DE JOGOS (CADASTRO / EDIÇÃO / EXCLUSÃO)
function alternarInputsPlacar() {
  const status = document.getElementById("jogo-status").value;
  const placarRow = document.getElementById("placar-fields-row");
  const golsA = document.getElementById("jogo-golsA");
  const golsB = document.getElementById("jogo-golsB");

  if (status === "Ao Vivo" || status === "Finalizado") {
    placarRow.style.display = "grid";
  } else {
    placarRow.style.display = "none";
    golsA.value = "0";
    golsB.value = "0";
  }
}
window.alternarInputsPlacar = alternarInputsPlacar;

function listarJogosAdmin(jogos) {
  const corpoTabela = document.getElementById("tabela-jogos-corpo");
  corpoTabela.innerHTML = "";

  if (jogos.length === 0) {
    corpoTabela.innerHTML = `<tr><td colspan="5" class="text-center">Nenhuma partida cadastrada.</td></tr>`;
    return;
  }

  jogos.forEach(j => {
    const placarHtml = j.status !== "Agendado" 
      ? `<span class="placar-resumo-admin">${j.golsA} - ${j.golsB}</span>` 
      : `<span class="placar-resumo-admin" style="color: #718096; font-size: 11px;">VS</span>`;

    corpoTabela.innerHTML += `
      <tr>
        <td>
          <div class="tabela-confronto-admin">
            ${obterBandeiraHtml(j.timeA)} <span>${j.timeA}</span> 
            ${placarHtml} 
            <span>${j.timeB}</span> ${obterBandeiraHtml(j.timeB)}
          </div>
        </td>
        <td>${j.data} às ${j.horario}</td>
        <td>${j.estadio}</td>
        <td>
          <span class="badge ${j.status === "Finalizado" ? "badge-finalizado" : (j.status === "Ao Vivo" ? "badge-ao-vivo" : "badge-agendado")}">${j.status}</span>
        </td>
        <td>
          <div class="tabela-admin-acoes">
            <button class="btn-admin-editar" onclick="editarJogo(${j.id})"><i class="fas fa-edit"></i></button>
            <button class="btn-perigo" style="padding: 6px 12px; font-size: 12px; border-radius: var(--raio-sm);" onclick="excluirJogo(${j.id})"><i class="fas fa-trash-alt"></i></button>
          </div>
        </td>
      </tr>
    `;
  });
}

function salvarJogo(event) {
  event.preventDefault();
  const bd = obterBancoDados();
  
  const idVal = document.getElementById("jogo-id").value;
  const timeA = document.getElementById("jogo-timeA").value;
  const timeB = document.getElementById("jogo-timeB").value;
  const status = document.getElementById("jogo-status").value;
  const dataRaw = document.getElementById("jogo-data").value;
  const horario = document.getElementById("jogo-horario").value;
  const estadio = document.getElementById("jogo-estadio").value;
  const golsA = parseInt(document.getElementById("jogo-golsA").value) || 0;
  const golsB = parseInt(document.getElementById("jogo-golsB").value) || 0;

  if (timeA === timeB) {
    alert("Uma seleção não pode jogar contra ela mesma!");
    return;
  }

  // Converter data americana (AAAA-MM-DD) para formato brasileiro (DD/MM/AAAA)
  const partesData = dataRaw.split("-");
  const data = `${partesData[2]}/${partesData[1]}/${partesData[0]}`;

  const dadosJogo = {
    id: idVal ? parseInt(idVal) : Date.now(),
    timeA,
    timeB,
    status,
    data,
    horario,
    estadio,
    golsA: (status === "Ao Vivo" || status === "Finalizado") ? golsA : null,
    golsB: (status === "Ao Vivo" || status === "Finalizado") ? golsB : null
  };

  if (idVal) {
    // Editar
    const index = bd.jogos.findIndex(j => j.id === parseInt(idVal));
    if (index !== -1) {
      bd.jogos[index] = dadosJogo;
    }
  } else {
    // Cadastrar novo
    bd.jogos.push(dadosJogo);
  }

  salvarBancoDados(bd);
  listarJogosAdmin(bd.jogos);
  limparFormJogo();
  alert("Partida salva com sucesso!");
}
window.salvarJogo = salvarJogo;

function editarJogo(id) {
  const bd = obterBancoDados();
  const jogo = bd.jogos.find(j => j.id === id);
  if (!jogo) return;

  document.getElementById("jogo-id").value = jogo.id;
  document.getElementById("jogo-timeA").value = jogo.timeA;
  document.getElementById("jogo-timeB").value = jogo.timeB;
  document.getElementById("jogo-status").value = jogo.status;
  document.getElementById("jogo-horario").value = jogo.horario;
  document.getElementById("jogo-estadio").value = jogo.estadio;

  // Tratar a data de DD/MM/AAAA para AAAA-MM-DD
  const partesData = jogo.data.split("/");
  document.getElementById("jogo-data").value = `${partesData[2]}-${partesData[1]}-${partesData[0]}`;

  alternarInputsPlacar();
  if (jogo.status !== "Agendado") {
    document.getElementById("jogo-golsA").value = jogo.golsA || 0;
    document.getElementById("jogo-golsB").value = jogo.golsB || 0;
  }

  document.getElementById("form-jogo-titulo").textContent = "Editar Partida";
  document.getElementById("btn-salvar-jogo").textContent = "Salvar Alterações";
}
window.editarJogo = editarJogo;

function excluirJogo(id) {
  if (!confirm("Tem certeza que deseja excluir esta partida?")) return;
  const bd = obterBancoDados();
  bd.jogos = bd.jogos.filter(j => j.id !== id);
  salvarBancoDados(bd);
  listarJogosAdmin(bd.jogos);
}
window.excluirJogo = excluirJogo;

function limparFormJogo() {
  document.getElementById("jogo-id").value = "";
  document.getElementById("form-jogo").reset();
  document.getElementById("form-jogo-titulo").textContent = "Cadastrar Partida";
  document.getElementById("btn-salvar-jogo").textContent = "Cadastrar Jogo";
  document.getElementById("placar-fields-row").style.display = "none";
}
window.limparFormJogo = limparFormJogo;

// 5. LÓGICA DE NOTÍCIAS (CRUD COMPLETO)
function listarNoticiasAdmin(noticias) {
  const corpoTabela = document.getElementById("tabela-noticias-corpo");
  corpoTabela.innerHTML = "";

  if (noticias.length === 0) {
    corpoTabela.innerHTML = `<tr><td colspan="5" class="text-center">Nenhuma notícia publicada.</td></tr>`;
    return;
  }

  noticias.forEach(n => {
    const estiloBadge = n.principal ? '<span class="badge badge-ao-vivo">Principal</span>' : '<span class="badge badge-cinza">Secundário</span>';
    corpoTabela.innerHTML += `
      <tr>
        <td><strong class="texto-limite-admin" style="max-width: 280px; display: inline-block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${n.titulo}</strong></td>
        <td><span class="badge badge-principal">${n.categoria}</span></td>
        <td>${n.data}</td>
        <td>${estiloBadge}</td>
        <td>
          <div class="tabela-admin-acoes">
            <button class="btn-admin-editar" onclick="editarNoticia(${n.id})"><i class="fas fa-edit"></i></button>
            <button class="btn-perigo" style="padding: 6px 12px; font-size: 12px; border-radius: var(--raio-sm);" onclick="excluirNoticia(${n.id})"><i class="fas fa-trash-alt"></i></button>
          </div>
        </td>
      </tr>
    `;
  });
}

function salvarNoticia(event) {
  event.preventDefault();
  const bd = obterBancoDados();

  const idVal = document.getElementById("noticia-id").value;
  const titulo = document.getElementById("noticia-titulo").value.trim();
  const resumo = document.getElementById("noticia-resumo").value.trim();
  const texto = document.getElementById("noticia-texto").value.trim();
  const imagem = document.getElementById("noticia-imagem").value.trim();
  const categoria = document.getElementById("noticia-categoria").value;
  const principal = document.getElementById("noticia-principal").checked;

  // Gerar data atual formatada (Ex: 23 Jun. 2026)
  const meses = ["Jan.", "Fev.", "Mar.", "Abr.", "Mai.", "Jun.", "Jul.", "Ago.", "Set.", "Out.", "Nov.", "Dez."];
  const hoje = new Date();
  const dataFormatada = `${hoje.getDate()} ${meses[hoje.getMonth()]} ${hoje.getFullYear()}`;

  // Se a nova notícia é definida como principal, limpa a flag principal de todas as outras notícias
  if (principal) {
    bd.noticias.forEach(n => n.principal = false);
  }

  const dadosNoticia = {
    id: idVal ? parseInt(idVal) : Date.now(),
    titulo,
    resumo,
    texto,
    imagem,
    categoria,
    data: dataFormatada,
    leitura: `${Math.ceil(texto.split(" ").length / 200)} min`,
    principal
  };

  if (idVal) {
    const index = bd.noticias.findIndex(n => n.id === parseInt(idVal));
    if (index !== -1) {
      // Se era principal e foi editado para não ser principal, precisamos garantir que pelo menos uma seja principal
      const antigoPrincipal = bd.noticias[index].principal;
      bd.noticias[index] = dadosNoticia;
      
      if (antigoPrincipal && !principal) {
        // Seleciona o primeiro da lista para ser principal de backup
        const outro = bd.noticias.find(n => n.id !== dadosNoticia.id);
        if (outro) outro.principal = true;
      }
    }
  } else {
    // Se a primeira notícia estiver sendo cadastrada, força ser principal
    if (bd.noticias.length === 0) {
      dadosNoticia.principal = true;
    }
    bd.noticias.push(dadosNoticia);
  }

  salvarBancoDados(bd);
  listarNoticiasAdmin(bd.noticias);
  limparFormNoticia();
  alert("Matéria publicada com sucesso!");
}
window.salvarNoticia = salvarNoticia;

function editarNoticia(id) {
  const bd = obterBancoDados();
  const n = bd.noticias.find(not => not.id === id);
  if (!n) return;

  document.getElementById("noticia-id").value = n.id;
  document.getElementById("noticia-titulo").value = n.titulo;
  document.getElementById("noticia-resumo").value = n.resumo;
  document.getElementById("noticia-texto").value = n.texto;
  document.getElementById("noticia-imagem").value = n.imagem;
  document.getElementById("noticia-categoria").value = n.categoria;
  document.getElementById("noticia-principal").checked = n.principal;

  document.getElementById("form-noticia-titulo").textContent = "Editar Notícia";
  document.getElementById("btn-salvar-noticia").textContent = "Salvar Alterações";
}
window.editarNoticia = editarNoticia;

function excluirNoticia(id) {
  if (!confirm("Excluir esta notícia permanentemente?")) return;
  const bd = obterBancoDados();
  const n = bd.noticias.find(not => not.id === id);
  
  bd.noticias = bd.noticias.filter(not => not.id !== id);

  // Se a deletada era a principal, atribui principal ao próximo elemento disponível
  if (n && n.principal && bd.noticias.length > 0) {
    bd.noticias[0].principal = true;
  }

  salvarBancoDados(bd);
  listarNoticiasAdmin(bd.noticias);
}
window.excluirNoticia = excluirNoticia;

function limparFormNoticia() {
  document.getElementById("noticia-id").value = "";
  document.getElementById("form-noticia").reset();
  document.getElementById("form-noticia-titulo").textContent = "Publicar Nova Notícia";
  document.getElementById("btn-salvar-noticia").textContent = "Publicar Notícia";
}
window.limparFormNoticia = limparFormNoticia;


// 6. LÓGICA DE CLASSIFICAÇÃO (TABELA ESTATÍSTICA EDITÁVEL)
function carregarClassificacaoAdmin(classificacao) {
  const container = document.getElementById("classificacao-editor-grupos");
  container.innerHTML = "";

  if (classificacao.length === 0) {
    container.innerHTML = `<div class="texto-suave">Nenhum grupo ativo.</div>`;
    return;
  }

  classificacao.forEach((grupo, idxG) => {
    const cardGrupo = document.createElement("div");
    cardGrupo.className = "grupo-admin-card";
    
    let linhasTabelaHtml = "";
    grupo.times.forEach((t, idxT) => {
      linhasTabelaHtml += `
        <tr>
          <td><span class="col-pos">${t.posicao}</span></td>
          <td>
            <div class="selecao-info" style="gap: 8px;">
              ${obterBandeiraHtml(t.selecao)} <strong>${t.selecao}</strong>
            </div>
          </td>
          <td><input type="number" class="input-num-admin" data-grupo="${idxG}" data-time="${idxT}" data-campo="pontos" value="${t.pontos}" min="0"></td>
          <td><input type="number" class="input-num-admin" data-grupo="${idxG}" data-time="${idxT}" data-campo="vitorias" value="${t.vitorias}" min="0"></td>
          <td><input type="number" class="input-num-admin" data-grupo="${idxG}" data-time="${idxT}" data-campo="empates" value="${t.empates}" min="0"></td>
          <td><input type="number" class="input-num-admin" data-grupo="${idxG}" data-time="${idxT}" data-campo="derrotas" value="${t.derrotas}" min="0"></td>
          <td><input type="number" class="input-num-admin" data-grupo="${idxG}" data-time="${idxT}" data-campo="saldoGols" value="${t.saldoGols}"></td>
        </tr>
      `;
    });

    cardGrupo.innerHTML = `
      <h4>${grupo.grupo}</h4>
      <table class="tabela-input-admin">
        <thead>
          <tr>
            <th class="col-pos">#</th>
            <th class="text-left">Seleção</th>
            <th>P</th>
            <th>V</th>
            <th>E</th>
            <th>D</th>
            <th>SG</th>
          </tr>
        </thead>
        <tbody>
          ${linhasTabelaHtml}
        </tbody>
      </table>
    `;
    container.appendChild(cardGrupo);
  });
}

function salvarClassificacao(event) {
  event.preventDefault();
  const bd = obterBancoDados();
  const inputs = document.querySelectorAll(".input-num-admin");

  inputs.forEach(input => {
    const idxG = parseInt(input.getAttribute("data-grupo"));
    const idxT = parseInt(input.getAttribute("data-time"));
    const campo = input.getAttribute("data-campo");
    const valor = parseInt(input.value);

    if (bd.classificacao[idxG] && bd.classificacao[idxG].times[idxT]) {
      bd.classificacao[idxG].times[idxT][campo] = valor;
    }
  });

  // Re-ordenar e re-atribuir posições com base nos novos pontos e saldo de gols
  bd.classificacao.forEach(grupo => {
    grupo.times.sort((a, b) => {
      if (b.pontos !== a.pontos) return b.pontos - a.pontos;
      return b.saldoGols - a.saldoGols;
    });
    
    // Atualiza campo posicao físico do objeto ordenado
    grupo.times.forEach((t, i) => {
      t.posicao = i + 1;
    });
  });

  salvarBancoDados(bd);
  carregarClassificacaoAdmin(bd.classificacao);
  alert("Classificação de grupos atualizada com sucesso!");
}
window.salvarClassificacao = salvarClassificacao;

// Restaura classificações originais da Copa
function restaurarClassificacaoPadrao() {
  if (!confirm("Deseja mesmo redefinir todas as estatísticas para os valores padrões?")) return;
  const bd = obterBancoDados();
  
  // Reseta estatísticas dos times de volta ao mockup inicial
  bd.classificacao = [
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
  ];

  salvarBancoDados(bd);
  carregarClassificacaoAdmin(bd.classificacao);
  alert("Classificações redefinidas!");
}
window.restaurarClassificacaoPadrao = restaurarClassificacaoPadrao;
