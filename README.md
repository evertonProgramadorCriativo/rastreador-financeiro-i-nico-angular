# Finance Tracker

App de controle financeiro pessoal feito com **Ionic 7 + Angular 17 + TypeScript**
(standalone components), containerizado com **Docker**.

## Tecnologias

| Camada        | Tecnologia                  |
|---------------|-----------------------------|
| Framework UI  | Ionic 7                     |
| Framework Web | Angular 17 (standalone)     |
| Linguagem     | TypeScript 5 (strict mode)  |
| Gráficos      | Chart.js 4 + ng2-charts     |
| Container     | Docker + Nginx              |

## Rodar com Docker (recomendado)

```bash
# Desenvolvimento com hot-reload
docker compose up --build

# Acessar em: http://localhost:8100
```

## Rodar localmente

```bash
npm install
ionic serve
```

## Páginas

| # | Página       | Rota            |
|---|--------------|-----------------|
| 1 | Login        | /login          |
| 2 | Cadastro     | /register       |
| 3 | Dashboard    | /dashboard      |
| 4 | Faturas      | /invoices       |
| 5 | Transações   | /transactions   |
| 6 | Relatórios   | /reports        |
| 7 | Perfil       | /profile        |