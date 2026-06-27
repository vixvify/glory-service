FROM oven/bun:1-slim

WORKDIR /app
ENV PORT=8000

COPY package.json bun.lock ./

RUN bun install --frozen-lockfile

COPY . .

RUN bunx prisma generate

RUN bun run build

EXPOSE 8000

CMD ["bun", "run", "start"]
