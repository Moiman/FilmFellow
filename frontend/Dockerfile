FROM node:20-alpine AS builder
WORKDIR /app

COPY . .

RUN npm ci
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package.json /app/package-lock.json ./

RUN npm ci --omit=dev

EXPOSE ${FRONTEND_PORT}

CMD ["npm", "start"]
