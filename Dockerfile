FROM node:22-bookworm-slim

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends openssl ca-certificates \
    && rm -rf /var/lib/apt/lists/* \
    && mkdir -p /data \
    && chown -R node:node /app /data

USER node

COPY --chown=node:node package.json package-lock.json ./
RUN npm ci

COPY --chown=node:node . .
RUN npx prisma generate && npm run build

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    DATABASE_URL=file:/data/acervoarq.db \
    HOSTNAME=0.0.0.0 \
    PORT=3000

VOLUME ["/data"]
EXPOSE 3000

CMD ["sh", "-c", "if [ -z \"$JWT_SECRET\" ]; then echo 'JWT_SECRET is required' >&2; exit 1; fi; if [ ! -f /data/acervoarq.db ]; then npx prisma migrate deploy && npx prisma db seed || exit 1; else npx prisma migrate deploy || exit 1; fi; exec npm run start -- --hostname 0.0.0.0 --port 3000"]
