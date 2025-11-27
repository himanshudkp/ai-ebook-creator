# ---- Base builder ----
FROM node:18-alpine AS builder
WORKDIR /app

# Install pnpm
RUN corepack enable

# Copy monorepo files
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY apps/backend ./apps/backend
COPY packages ./packages

# Install only production deps for backend
RUN pnpm install --filter @ai-ebook/backend...

# Build backend
RUN pnpm --filter @ai-ebook/backend build

# ---- Runtime image ----
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy build output
COPY --from=builder /app/apps/backend/dist ./dist
COPY --from=builder /app/apps/backend/package.json ./

# Install only backend production dependencies
RUN corepack enable && pnpm install --prod

EXPOSE 3001

CMD ["node", "dist/index.js"]
