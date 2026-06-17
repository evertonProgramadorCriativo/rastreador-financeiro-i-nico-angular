# ═══════════════════════════════════════════════════
# STAGE 1 — Desenvolvimento com hot-reload
# ═══════════════════════════════════════════════════
FROM node:20-alpine AS dev

WORKDIR /app

# Copia manifests primeiro (melhor cache de camadas)
COPY package*.json ./

# Instala Ionic CLI, Angular CLI e dependências do projeto
RUN npm install -g @ionic/cli @angular/cli && \
    npm install

# Copia o restante do código
COPY . .

# Porta padrão do ionic serve
EXPOSE 4200

# Usa "ng serve" diretamente em vez de "ionic serve --external".
# Motivo: o Ionic CLI repassa --host/--port para o builder configurado
# em angular.json (architect.serve). Se esse builder for customizado
# (ex.: não for o @angular-devkit/build-angular:dev-server padrão),
# ele pode não reconhecer essas flags e quebrar com "Unknown arguments".
# "ng serve" usa o builder padrão e aceita --host/--port de forma confiável.
CMD ["npx", "ng", "serve", "--host=0.0.0.0", "--port=4200", "--disable-host-check"]


# ═══════════════════════════════════════════════════
# STAGE 2 — Build de produção
# ═══════════════════════════════════════════════════
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install -g @ionic/cli @angular/cli && \
    npm ci

COPY . .

# Gera os arquivos otimizados em /app/www
RUN ionic build --prod


# ═══════════════════════════════════════════════════
# STAGE 3 — Produção com Nginx (imagem mínima)
# ═══════════════════════════════════════════════════
FROM nginx:alpine AS prod

# Remove config padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia nossa config customizada (SPA routing)
COPY nginx.conf /etc/nginx/conf.d/app.conf

# Copia apenas os arquivos compilados do stage build
COPY --from=build /app/www /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]