
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
COPY ./node_modules ./node_modules
COPY . .

RUN npm install --production
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE ${FRONTEND_PORT}

CMD ["npm", "start"]