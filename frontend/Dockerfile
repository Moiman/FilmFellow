FROM node:20-alpine AS builder
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

COPY . .

RUN npm ci
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXTAUTH_SECRET=generatesecretkey

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/package.json /app/package-lock.json ./

RUN npm ci --omit=dev

EXPOSE ${FRONTEND_PORT}

CMD ["npm", "start"]
