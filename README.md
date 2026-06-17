#   Finance Tracker

Aplicação de controle financeiro pessoal desenvolvida com **Ionic 7**, **Angular 17**, **TypeScript** e **Docker**, permitindo gerenciamento de receitas, despesas, faturas e relatórios financeiros através de uma interface moderna e responsiva.

---

##   Tecnologias Utilizadas

| Categoria | Tecnologia |
|------------|------------|
| Frontend | Ionic 7 |
| Framework | Angular 17 (Standalone Components) |
| Linguagem | TypeScript 5 |
| Gráficos | Chart.js 4 |
| Integração de Gráficos | ng2-charts |
| Containerização | Docker |
| Servidor Web | Nginx |
| Gerenciador de Pacotes | npm |

---

##   Funcionalidades

###   Autenticação

- Login de usuários
- Cadastro de contas
- Validação de formulários
- Proteção de rotas
- Persistência de sessão

###   Dashboard

- Visão geral financeira
- Resumo de receitas
- Resumo de despesas
- Saldo atual
- Indicadores financeiros
- Gráficos interativos

###   Gestão Financeira

- Cadastro de transações
- Controle de receitas
- Controle de despesas
- Gerenciamento de faturas
- Histórico financeiro

###   Relatórios

- Análises financeiras
- Gráficos estatísticos
- Indicadores de desempenho
- Visualização de gastos

###   Perfil

- Configurações do usuário
- Preferências da aplicação
- Personalização de tema

---

##   Estrutura de Páginas

| Página | Rota |
|---------|---------|
| Login | `/login` |
| Cadastro | `/register` |
| Dashboard | `/dashboard` |
| Faturas | `/invoices` |
| Transações | `/transactions` |
| Relatórios | `/reports` |
| Perfil | `/profile` |

---

#   Executando com Docker

## Desenvolvimento (Hot Reload)

O ambiente de desenvolvimento utiliza Docker com sincronização de arquivos em tempo real.

### Subir o ambiente

```bash
docker compose up --build
```

A aplicação ficará disponível em:

```text
http://localhost:4200
```

### Recursos disponíveis

- Hot Reload automático
- Sincronização do código local
- Ambiente isolado
- Node.js 20 Alpine
- Angular CLI
- Ionic CLI

---

## Produção

### Build da imagem

```bash
docker build -t finance-tracker .
```

### Executar container

```bash
docker run -d -p 80:80 finance-tracker
```

A aplicação ficará disponível em:

```text
http://localhost
```

---

#   Arquitetura Docker

O projeto utiliza uma estratégia de build multi-stage:

## Stage 1 — Desenvolvimento

Responsável por:

- Instalar dependências
- Executar Angular Dev Server
- Hot Reload

Base:

```text
node:20-alpine
```

---

## Stage 2 — Build

Responsável por:

- Compilar a aplicação
- Gerar arquivos otimizados
- Produzir artefatos finais

Comando utilizado:

```bash
ionic build --prod
```

---

## Stage 3 — Produção

Responsável por:

- Servir arquivos estáticos
- Configuração SPA Routing
- Melhor desempenho

Base:

```text
nginx:alpine
```

---

#   Executando sem Docker

## Instalar dependências

```bash
npm install
```

## Executar em desenvolvimento

```bash
npm start
```

ou

```bash
npx ng serve
```

Acesse:

```text
http://localhost:4200
```

---

#  Scripts Disponíveis

```bash
npm start
```

Inicia o servidor de desenvolvimento.

```bash
npm run build
```

Gera o build da aplicação.

```bash
npm run build:prod
```

Gera o build otimizado para produção.

```bash
npm run watch
```

Compila automaticamente durante alterações.

```bash
npm test
```

Executa os testes.

```bash
npm run lint
```

Executa a análise estática do código.

---

#   Objetivos do Projeto

Este projeto foi desenvolvido para demonstrar conhecimentos em:

- Angular 17
- Ionic Framework
- TypeScript
- Componentes Standalone
- Roteamento Angular
- Gerenciamento de Estado
- Docker
- Nginx
- Boas práticas de Frontend
- Arquitetura SPA

---

#  Licença

Este projeto é destinado para fins educacionais e demonstração de portfólio.

 