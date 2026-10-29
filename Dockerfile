FROM node:22-alpine
WORKDIR /app
COPY package.json ./
COPY server.mjs ./
COPY data ./data
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "server.mjs"]
