# DOSSIÊ DO PROJETO PEDAGÓGICO
> Documento gerado para servir de insumo ao gerador de planos de aula.
> Versão: 1.0 | Data: 16/06/2026

## 1. IDENTIFICAÇÃO
- **Nome do Projeto:** DevBlog — Plataforma de Artigos para Desenvolvedores
- **Tipo de Produto/Serviço:** Aplicação Web Estática (Frontend Portal / CMS Client)
- **Problema Resolvido:** Falta de um portal centralizado, responsivo e esteticamente atraente para compartilhamento de conhecimento e tutoriais práticos de programação, servindo simultaneamente como projeto prático integrador para consolidação de conceitos de estruturação (HTML5) e estilização (CSS3) de sites.
- **Público-Alvo:** Estudantes de tecnologia, desenvolvedores iniciantes e entusiastas de desenvolvimento frontend.
- **Cliente:** TechSprint (Empresa de tecnologia fictícia)
- **Duração Total Estimada:** 40 horas (distribuídas em 4 semanas)

## 2. RESUMO EXECUTIVO (até 100 palavras)
O DevBlog é um portal web responsivo e moderno voltado ao compartilhamento de conteúdo tecnológico para desenvolvedores em início de carreira. O projeto resolve a fragmentação de aprendizado integrando uma Landing Page interativa, uma listagem pública de artigos filtrável, telas de autenticação e um painel administrativo funcional de gerenciamento (CMS). Desenvolvido exclusivamente com HTML5 semântico e CSS3 puro, serve como desafio prático para consolidar competências de estruturação web, estilização avançada (Flexbox e Grid), variáveis customizadas (:root) e boas práticas de SEO e acessibilidade, ambientando o aluno no fluxo de entrega do mercado.

## 3. TECNOLOGIAS E FERRAMENTAS
| Categoria | Ferramenta/Tecnologia | Função no projeto |
|---|---|---|
| Linguagem | HTML5 | Marcação semântica da estrutura da página, otimização de SEO e acessibilidade. |
| Linguagem | CSS3 | Estilização visual, responsividade (Media Queries), variáveis nativas (:root), transições de alto desempenho e layouts modernos. |
| Framework | Nenhum (Vanilla HTML/CSS) | Abordagem didática de base para fixar conceitos fundamentais antes da introdução de frameworks. |
| Banco de Dados | Nenhum (Dados simulados em UI) | Simulação visual de contagem de posts, leitores cadastrados, status de publicação e métricas. |
| Versionamento | Git | Controle de versão do código-fonte e histórico de alterações do projeto. |
| Deploy | GitHub Pages ou Netlify | Hospedagem da aplicação estática para validação em ambiente real. |
| Outras | Font Awesome (v6.4.0) | Biblioteca de ícones vetoriais integrada para botões, badges e links de navegação. |
| Outras | Google Fonts | Importação das famílias tipográficas Playfair Display (títulos) e DM Sans (corpo de texto). |

## 4. ETAPAS / SPRINTS DO PROJETO
### Etapa 1: Fundamentos e Landing Page — 10 horas
- **Objetivo:** Estabelecer a base do design system e construir a página inicial (Landing Page) responsiva do portal.
- **Atividades-chave:**
  - Configuração do reset CSS e variáveis de cores/fontes/raios no `:root` de `style.css`.
  - Construção do cabeçalho `<header>` e rodapé `<footer>` semânticos e integrados com Flexbox.
  - Implementação da seção `Hero` dividida em duas colunas assimétricas com CSS Grid.
  - Modelagem do terminal de código interativo 3D simulado com tags `<pre>` e `<code>`.
  - Desenvolvimento do grid de categorias de tecnologia e do formulário de newsletter com efeito glassmorphism.
- **Entregável da etapa:** Landing Page funcional (`index.html`) e folha de estilos globais (`style.css` e `index.css`) responsiva.
- **Capacidades mobilizadas:** Estruturação semântica, seletores básicos e pseudo-classes CSS, declaração de variáveis globais, posicionamento com Flexbox e Grid de uma dimensão, e aplicação de transições.

### Etapa 2: Listagem de Artigos e Filtros — 10 horas
- **Objetivo:** Desenvolver a interface pública de busca, filtros de tags e exibição de cartões de publicações.
- **Atividades-chave:**
  - Criação da página `artigos/artigos.html` e configuração das referências relativas a arquivos de estilo.
  - Implementação da barra de buscas com ícone Font Awesome posicionado de forma absoluta dentro do input.
  - Construção de botões de filtragem de tópicos (HTML, CSS, JS, etc.) com estado ativo correspondente.
  - Desenvolvimento do grid de artigos utilizando CSS Grid Layout, definindo o card de destaque com spanning duplo.
  - Criação da barra de paginação centralizada.
- **Entregável da etapa:** Página pública de listagem de artigos (`artigos/artigos.html`) conectada e estilizada.
- **Capacidades mobilizadas:** Navegação relativa entre diretórios, pseudo-seletores avançados, layout bidimensional avançado (Grid Span), alinhamento de elementos e responsividade via Media Queries.

### Etapa 3: Autenticação de Usuários (Login e Cadastro) — 10 horas
- **Objetivo:** Criar o fluxo visual e a estrutura de formulários de login e criação de contas.
- **Atividades-chave:**
  - Estruturação do formulário de Login dividido em dois painéis (visual decorativo à esquerda, formulário ativo à direita).
  - Criação da interface de Cadastro com campos de inputs duplos (Nome/Sobrenome) e termos de uso.
  - Estilização de inputs dinâmicos, com foco visual personalizado, e placeholders modernos.
  - Implementação da barra de indicação de força da senha em 3 níveis usando classes CSS temáticas.
  - Integração de validação nativa de formulários HTML (required, type="email", minlength).
- **Entregável da etapa:** Interfaces de login (`auth/login/login.html`) e cadastro (`auth/cadastro/cadastro.html`) validadas e interativas.
- **Capacidades mobilizadas:** Estruturação semântica de formulários, acessibilidade de labels, estilização de estados de campos de texto (:focus, :invalid), e validação cliente via atributos nativos HTML5.

### Etapa 4: Painel Administrativo e Editor CMS — 10 horas
- **Objetivo:** Desenvolver a interface do dashboard de controle com tabelas de artigos e a página de edição/inserção de novos posts.
- **Atividades-chave:**
  - Desenvolvimento da estrutura de Dashboard (`admin/dashboard.html`) com menu sidebar lateral e área analítica.
  - Criação de cards com estatísticas de acessos e comentários estilizados com ícones específicos.
  - Implementação de um gráfico de barras simulado em CSS puro através de propriedades customizadas inline (`--altura`).
  - Criação de tabela de artigos semântica com botões funcionais de editar/excluir.
  - Desenvolvimento da tela do editor (`admin/novo-artigo/novo-artigo.html`) com barra de ferramentas e painéis de upload de capa.
- **Entregável da etapa:** Dashboard de visualização analítica (`admin/dashboard.html`) e interface do editor de novos artigos (`admin/novo-artigo/novo-artigo.html`).
- **Capacidades mobilizadas:** Criação de layouts de duas colunas assimétricas complexas com CSS Grid, tabelas semânticas estruturadas, manipulação de dropdowns/selects e elementos de preview dinâmico com CSS.

## 5. MAPA DE ATIVIDADES PRÁTICAS
> Lista granular das atividades que os alunos efetivamente farão. Esta lista alimentará as "frases de hora-aula" dos planos de aula.

| # | Atividade | Tipo (teoria/prática/mista) | Etapa do projeto | Duração estimada |
|---|---|---|---|---|
| 1 | Introdução conceitual sobre o funcionamento da Web: Protocolo HTTP, navegadores, papel do HTML5 e CSS3 no Frontend. | Teoria | Etapa 1 | 1h |
| 2 | Configuração inicial do ambiente de trabalho (VS Code, extensões recomendadas como Live Server) e criação da árvore de diretórios do portal. | Prática | Etapa 1 | 1h |
| 3 | Escrita do arquivo `index.html` básico, estruturando o elemento `<head>` com meta tags UTF-8, Viewport, importação de fontes e Font Awesome. | Prática | Etapa 1 | 1h |
| 4 | Criação do arquivo `style.css` declarando variáveis de cores, fontes, bordas e sombras no bloco `:root` para centralizar a identidade visual. | Prática | Etapa 1 | 1h |
| 5 | Codificação do cabeçalho `<header>` semântico contendo o logotipo do blog e menu de opções de navegação com a tag `<nav>`. | Prática | Etapa 1 | 1h |
| 6 | Estilização do cabeçalho no CSS com `display: flex` para alinhamento horizontal dos elementos e efeitos de transição nos links de navegação. | Prática | Etapa 1 | 1h |
| 7 | Estruturação em HTML da seção `Hero` (banner principal de apresentação) com títulos, subtítulos e botões de chamada para ação. | Prática | Etapa 1 | 1h |
| 8 | Estilização da seção Hero usando Grid Layout (duas colunas no desktop, empilhadas no celular) e aplicação de efeitos de fade-in. | Prática | Etapa 1 | 1h |
| 9 | Construção do terminal VS Code simulado em CSS utilizando as tags estruturais `<pre>` e `<code>` para formatação de código-fonte. | Prática | Etapa 1 | 1h |
| 10 | Criação do painel de captura de Newsletter utilizando formulário de e-mail estilizado com efeito de vidro (Glassmorphism). | Prática | Etapa 1 | 1h |
| 11 | Apresentação teórica sobre caminhos de arquivos relativos e estruturação de links em páginas localizadas em diretórios aninhados. | Teoria | Etapa 2 | 1h |
| 12 | Criação da pasta `artigos` e do arquivo `artigos.html`, linkando corretamente os estilos globais `style.css` da pasta raiz. | Prática | Etapa 2 | 1h |
| 13 | Codificação do banner hero da listagem pública contendo textos destacados e número em background de grandes proporções. | Prática | Etapa 2 | 1h |
| 14 | Criação da barra de busca de artigos integrando um input de texto com ícone de lupa posicionado de forma absoluta. | Prática | Etapa 2 | 1h |
| 15 | Desenvolvimento do menu de botões de filtros de tags de tecnologias com estilização dos estados dinâmicos hover e ativo. | Prática | Etapa 2 | 1h |
| 16 | Implementação da grade de exibição de artigos usando CSS Grid com definição de colunas responsivas via `repeat()` e `1fr`. | Prática | Etapa 2 | 1h |
| 17 | Configuração do card de artigo em destaque ocupando duas colunas do grid através da propriedade `grid-column: span`. | Prática | Etapa 2 | 1h |
| 18 | Estilização dos cards de artigos comuns adicionando imagens de capa placeholder, badges de categorias e resumos com limite de linhas. | Prática | Etapa 2 | 1h |
| 19 | Desenvolvimento da paginação da lista de artigos no rodapé da página centralizada horizontalmente via Flexbox. | Prática | Etapa 2 | 1h |
| 20 | Testes e validações de responsividade das páginas Home e Artigos em simuladores de dispositivos móveis do navegador. | Prática | Etapa 2 | 1h |
| 21 | Explicação teórica sobre acessibilidade em formulários e a importância da correspondência semântica entre tags `<label>` e `<input>`. | Teoria | Etapa 3 | 1h |
| 22 | Estruturação da página de login (`auth/login/login.html`) criando o painel visual esquerdo com efeitos decorativos de grid de pontos. | Prática | Etapa 3 | 1h |
| 23 | Criação dos inputs de preenchimento (E-mail e Senha) com labels descritivas no painel direito da página de Login. | Prática | Etapa 3 | 1h |
| 24 | Estilização do formulário de login centralizando a caixa de dados ao meio do painel com Flexbox e aplicando efeitos de sombra e borda. | Prática | Etapa 3 | 1h |
| 25 | Configuração do arquivo de cadastro (`auth/cadastro/cadastro.html`) com estrutura de topo unificada e links para retorno ao Login. | Prática | Etapa 3 | 1h |
| 26 | Codificação dos campos de Nome e Sobrenome alinhados lado a lado usando Flexbox para melhor usabilidade em formulários. | Prática | Etapa 3 | 1h |
| 27 | Criação da barra de força de senha no cadastro com três blocos horizontais indicativos com variação de cor baseada na classe CSS. | Prática | Etapa 3 | 1h |
| 28 | Adição de atributos nativos de validação cliente no formulário de cadastro (`required`, `minlength`, `type="email"`). | Prática | Etapa 3 | 1h |
| 29 | Estilização dos botões de envio dos formulários e checkbox de aceitação dos termos de privacidade da plataforma. | Prática | Etapa 3 | 1h |
| 30 | Testes práticos de validação cliente simulando tentativas de submissão com dados incorretos e observando mensagens nativas. | Prática | Etapa 3 | 1h |
| 31 | Apresentação teórica sobre design e organização de layouts de painéis administrativos de controle (Dashboards). | Teoria | Etapa 4 | 1h |
| 32 | Criação do arquivo `admin/dashboard.html` e cabeçalho de boas-vindas com simulação de avatar de usuário logado. | Prática | Etapa 4 | 1h |
| 33 | Desenvolvimento do menu Sidebar lateral de controle com ícones da biblioteca Font Awesome alinhados em lista. | Prática | Etapa 4 | 1h |
| 34 | Codificação do grid de estatísticas analíticas e estilização com quatro cores temáticas de acento nos ícones. | Prática | Etapa 4 | 1h |
| 35 | Construção do gráfico de visualizações utilizando propriedades CSS inline (`--altura`) para redimensionamento vertical. | Prática | Etapa 4 | 1h |
| 36 | Criação da tabela de listagem de artigos recentes com cabeçalhos estruturados e células formatadas semânticamente. | Prática | Etapa 4 | 1h |
| 37 | Estilização das ações da tabela com botões coloridos de Editar e Excluir com efeitos de transição visual rápida. | Prática | Etapa 4 | 1h |
| 38 | Criação da página `admin/novo-artigo/novo-artigo.html` e estruturação em duas colunas assimétricas (editor e configurações). | Prática | Etapa 4 | 1h |
| 39 | Construção da barra de botões formatadores de texto e inputs do editor do post usando inputs de textos extensos. | Prática | Etapa 4 | 1h |
| 40 | Elaboração do painel de upload de imagem de capa e bloco inferior de visualização prévia (preview) simulada em CSS. | Prática | Etapa 4 | 1h |

## 6. CORRELAÇÃO COM AS UCs DO CURSO
> Cruzamento explícito entre o projeto e as Unidades Curriculares.

| UC do Curso | Como o projeto contribui | Etapas envolvidas |
|---|---|---|
| **Desenvolvimento Frontend - Fundamentos Web (HTML5 & CSS3)** | O aluno exercita a construção estruturada de páginas utilizando tags semânticas, organizando hierarquias de textos e aplicando design system por meio de variáveis customizadas CSS3 (:root), posicionamento flexível (Flexbox), layouts complexos de grids (CSS Grid) e transições. | Etapas 1, 2, 3 e 4 |
| **Design de Interface (UI/UX) e Acessibilidade** | O aluno desenvolve e implementa regras de design responsivo para diferentes tipos de dispositivos, utiliza padrões adequados de contraste, fontes legíveis (Google Fonts) e implementa acessibilidade básica nos formulários criando associação direta entre labels e inputs. | Etapas 1, 2, 3 e 4 |
| **Lógica e Programação Cliente (JavaScript)** | Embora o portal seja estático, o aluno prepara a estrutura visual (inputs, formulários, grids e tabelas) que posteriormente receberá a lógica em JS para carregamento de artigos dinâmicos, validações dinâmicas e atualização de gráficos de dados. | Etapas 1, 2, 3 e 4 |
| **Integração de Sistemas e CMS (Módulos Avançados)** | O aluno desenvolve interfaces para painéis administrativos (CMS) compreendendo o fluxo de adição de conteúdos, status de publicação e controle de dados exibidos em tabelas. | Etapa 4 |

## 7. CAPACIDADES TÉCNICAS EXERCITADAS PELO PROJETO
- Codificar páginas de internet utilizando a linguagem de marcação HTML5.
- Aplicar folhas de estilo CSS3 para formatação de layouts, fontes, cores e decorações de páginas web.
- Estruturar layouts de páginas web utilizando sistemas modernos de grids e caixas flexíveis (CSS Grid e Flexbox).
- Implementar responsividade e adaptabilidade em layouts para diferentes resoluções e dispositivos móveis (mídia queries).
- Utilizar variáveis CSS customizadas para modularizar e gerenciar a identidade visual da aplicação.
- Codificar formulários HTML integrando validação nativa de tipos de dados (required, email, pattern).
- Estruturar dados tabulares e layouts de painéis de controle analíticos com tabelas semânticas e gráficos puramente estilizados em CSS.
- Aplicar padrões de acessibilidade web (relação ID e labels, uso de tags estruturais, atributos descritivos) de acordo com diretrizes do W3C.
- Organizar e estruturar arquivos do projeto utilizando diretórios lógicos específicos para imagens, estilos e páginas internas.

## 8. CAPACIDADES SOCIOEMOCIONAIS EXERCITADAS PELO PROJETO
- **Organização e Planejamento:** Estruturação lógica de arquivos e pastas no projeto e separação de estilos globais (`style.css`) e específicos (`index.css`, `artigos.css`).
- **Resolução de Problemas:** Depuração de layouts quebrados e depuração de alinhamentos com Flexbox/Grid em diferentes dispositivos.
- **Atenção aos Detalhes:** Implementação de micro-animações (como efeitos de hover, escalonamento suave e transições) e consistência visual de cores e fontes.
- **Trabalho em Equipe e Colaboração:** Utilização de ferramentas de versionamento (Git) para divisão de tarefas na codificação de diferentes páginas do portal.
- **Autonomia de Aprendizado:** Resolução dos desafios práticos propostos (alterar a cor de destaque, mudar bordas e ajustar colunas do Grid).

## 9. ENTREGÁVEIS E MARCOS DE AVALIAÇÃO
| Entregável | Sprint/Etapa | Vincula-se à avaliação | Pontuação prevista |
|---|---|---|---|
| Landing Page Principal (`index.html` e `style.css`/`index.css`) com seção Hero animada, categorias e formulário newsletter | Etapa 1 | 1ª Avaliação Parcial (Estruturação e Design System) | 30 pts |
| Página de Artigos (`artigos/artigos.html` e `artigos.css`) com barra de buscas estilizada, filtros e listagem responsiva | Etapa 2 | 2ª Avaliação Parcial (Componentização e Layouts Avançados) | 20 pts |
| Telas de Autenticação (`auth/login/` e `auth/cadastro/`) com formulários validados e responsivos | Etapa 3 | 3ª Avaliação Parcial (Acessibilidade e Formulários) | 20 pts |
| Dashboard Admin (`admin/dashboard.html`) com painel analítico, gráfico CSS e Editor de Novo Artigo (`admin/novo-artigo/`) | Etapa 4 | Projeto Integrador Final (Módulo Completo & CMS) | 30 pts |

## 10. RUBRICAS / CRITÉRIOS DE AVALIAÇÃO
- **Marcação HTML Semântica (25%):** Uso adequado de tags estruturais (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`) e hierarquia de títulos (`<h1>` a `<h3>`).
- **Estilização e Design Responsivo (30%):** Aplicação de CSS Grid e Flexbox para layouts fluidos, uso correto de media queries para responsividade em smartphones, e implementação de efeitos visuais (gradientes, box-shadows, transições).
- **Acessibilidade e Usabilidade (15%):** Relação correta de labels e inputs por meio do atributo `for` e `id`, contraste de cores adequado e links com áreas de clique amigáveis.
- **Validação de Formulários (15%):** Configuração de inputs com validação nativa de tipo, restrição de tamanho de texto e feedback visual de preenchimento.
- **Organização de Código (15%):** Código limpo e recuado (indentação), comentários explicativos sobre regras pedagógicas e separação correta de arquivos em diretórios apropriados.

## 11. STORYTELLING DE CONTEXTUALIZAÇÃO
> Pequena narrativa que o instrutor pode usar para introduzir o projeto aos alunos. Inspire-se em casos reais do mundo do trabalho.

Você acaba de ser contratado pela startup de tecnologia **TechSprint**, que está desenvolvendo um novo portal comunitário de compartilhamento de artigos técnicos, o **DevBlog**. A equipe de design entregou os wireframes de alta fidelidade e cabe a você, desenvolvedor frontend júnior, codificar a estrutura do site em HTML5 e implementar a identidade visual com CSS3 de forma impecável, garantindo que o portal seja responsivo para desenvolvedores que leem no celular a caminho do trabalho. Seus superiores estão atentos à qualidade do seu código: eles exigem HTML semântico para otimização SEO e um design premium com micro-animações interativas e gráficos fluidos. O futuro do portal e a sua contratação definitiva dependem da precisão e elegância das suas entregas!

## 12. RECURSOS NECESSÁRIOS
- **Software:** Editor de código-fonte (Visual Studio Code ou similar), Navegador Web moderno (Google Chrome, Firefox ou Safari) com Ferramentas do Desenvolvedor (DevTools).
- **Hardware:** Computador com acesso à internet para instalação de dependências e consulta a documentações.
- **Materiais:** Acesso às bibliotecas externas via CDN (Font Awesome 6.4.0, Google Fonts).
- **Ambientes pedagógicos:** Laboratório de informática equipado com computadores individuais para os alunos.
- **Bibliografia de apoio:** Documentação Web da MDN (HTML e CSS), Guia de Acessibilidade Web (WCAG), e repositório de suporte com código-fonte base.

## 13. RISCOS E PONTOS DE ATENÇÃO
- **Caminhos de Arquivos Relativos:** Alunos costumam confundir a importação de CSS em pastas aninhadas (como usar `../../style.css` em vez de `style.css`). Isso causa layouts quebrados.
- **Flexbox vs. Grid Layout:** Entendimento sobre quando usar cada sistema (ex: Flexbox para menu linear, Grid para grade multidimensional). Alunos podem tentar centralizar elementos forçando valores absolutos.
- **Nomenclatura de Classes (BEM sutil):** O projeto utiliza nomenclatura de classes como `.categoria-card` e `.artigo-card`. Alunos podem errar a digitação e quebrar a associação do CSS.
- **Preenchimento dos Formulários:** Erros de digitação nos atributos de formulário (ex: esquecer do atributo `required` ou do atributo `type` adequado) quebrando a validação nativa.
- **Responsividade e Quebras de Layout:** Omissão de `flex-wrap` ou uso de tamanhos fixos em pixel (`px`) em vez de unidades relativas (`%`, `fr`, `rem`) impedindo a fluidez da tela no celular.

## 14. GLOSSÁRIO DE TERMOS DO PROJETO
- **HTML Semântico:** Uso de tags HTML que descrevem o significado do conteúdo (ex: `<article>` para um artigo, `<aside>` para barra lateral), facilitando a leitura por mecanismos de busca (SEO) e leitores de tela.
- **Flexbox:** Modelo de layout unidimensional do CSS ideal para distribuir espaço e alinhar itens em uma única direção (linha ou coluna).
- **CSS Grid Layout:** Sistema de layout bidimensional para a web, permitindo alinhar elementos em linhas e colunas simultaneamente.
- **Variáveis CSS (:root):** Propriedades customizadas definidas globalmente que guardam valores reutilizáveis (como cores e espaçamentos) e simplificam alterações de estilo.
- **Glassmorphism:** Efeito visual moderno que imita vidro fosco translúcido, muito utilizado na seção de newsletter e no terminal 3D.
- **CMS (Content Management System):** Sistema de Gerenciamento de Conteúdo utilizado para criar, editar e organizar publicações na web (representado pelo dashboard e tela de novo artigo).
- **Viewport:** A área visível da página web no dispositivo do usuário, controlada por meta tag para otimização em telas móveis.

---
**Fim do dossiê.**
