<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="Portifolio/img/Logo%20-%20Letra%20Branca%20V2.png">
    <source media="(prefers-color-scheme: light)" srcset="Portifolio/img/Logo%20-%20Letra%20Preta%20V1.png">
    <img alt="Logo Gabriel Arezi" src="Portifolio/img/Logo%20-%20Letra%20Preta%20V1.png" width="420">
  </picture>
</p>

# Portfólio

## Descrição
Portfólio pessoal de **Gabriel Arezi**, desenvolvedor Full Stack. O site apresenta habilidades, certificações, recomendações profissionais e os repositórios do GitHub de forma responsiva, com tema claro/escuro e tradução automática da página.

## Acesse Online
O site está disponível online para visualização pública. [Portifólio](https://bit.ly/Gabriel-Arezi)

## Funcionalidades
- **Home**: apresentação pessoal, cargo, redes sociais, atalhos para LinkedIn/WhatsApp e card de nível de idiomas
- **Sobre mim**: certificações e experiência resumidas
- **Habilidades**: grid de cards por categoria (Frontend, Backend, Database) e nuvem de tecnologias complementares
- **Recomendações**: carrossel (Swiper) com depoimentos, navegação por botões e swipe no celular
- **Serviços**: cards com os serviços oferecidos (desenvolvimento Full Stack e automações)
- **Cursos e Certificações**: grid com cursos concluídos e em andamento, carga horária e status
- **Projetos do GitHub**: repositórios e favoritos carregados dinamicamente via GitHub REST API, com abas e ordenação por estrelas
- **Dark mode**: alternância de tema com preferência salva no navegador (`localStorage`)
- **Tradução automática**: painel com Google Translate acessível em qualquer seção
- **Design responsivo mobile-first**: layout em grid que se adapta de celulares a telas grandes
- **Scroll reveal**: animações de entrada dos elementos ao rolar a página

## Estrutura do Projeto
```
Portifolio/
├── index.html          # Estrutura principal da página, com todas as seções do portfólio
├── css/
│   └── style.css        # Design tokens, layout responsivo, dark mode e animações
├── js/
│   ├── script.js         # Navegação, Swiper, ScrollReveal e integração com a API do GitHub
│   ├── mobile.js         # Ajustes específicos para dispositivos móveis (altura de viewport, swipe, etc.)
│   ├── theme-mode.js     # Alternância e persistência do tema claro/escuro
│   └── translate.js      # Painel de tradução (Google Translate)
└── img/                 # Imagens utilizadas no site (logo, ícones, fotos de recomendações)
```

## Instruções de Instalação
1. Clone este repositório em sua máquina local:
   ```
   git clone https://github.com/g-arezi/Portifolio.git
   ```
2. Navegue até o diretório do site:
   ```
   cd Portifolio/Portifolio
   ```

## Como Executar o Projeto
Abra o arquivo `index.html` diretamente no navegador — não é necessário build ou servidor, é um site estático.

## Tecnologias Utilizadas
- HTML5 semântico
- CSS3 (custom properties, Grid e Flexbox, mobile-first)
- JavaScript (vanilla, sem frameworks)
- [Swiper](https://swiperjs.com/) para o carrossel de recomendações
- [Boxicons](https://boxicons.com/) e [Font Awesome](https://fontawesome.com/) para os ícones
- [GitHub REST API](https://docs.github.com/en/rest) para listar repositórios e favoritos
- Google Translate para tradução automática da página

## Contribuições
Sinta-se à vontade para contribuir com melhorias ou correções. Para isso, crie um fork do repositório e envie um pull request.
