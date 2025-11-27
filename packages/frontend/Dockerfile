# ---- Builder ----
FROM node:18-alpine AS builder
WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/frontend ./apps/frontend
COPY packages ./packages

RUN pnpm install --filter @ai-ebook/frontend...
RUN pnpm --filter @ai-ebook/frontend build

# ---- Production Runner ----
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/apps/frontend/.next ./.next
COPY --from=builder /app/apps/frontend/public ./public
COPY --from=builder /app/apps/frontend/package.json ./

RUN corepack enable && pnpm install --prod

EXPOSE 3000
CMD ["pnpm", "start"]
