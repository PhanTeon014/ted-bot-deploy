FROM node:20-bookworm-slim
RUN apt-get update && apt-get install -y --no-install-recommends ffmpeg imagemagick libwebp-dev \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
ENV NODE_ENV=production
CMD ["sh", "-c", "if [ -n \"$NUMERO\" ]; then ( printf '%s\\n' \"$NUMERO\" ; tail -f /dev/null ) | node start.js; else node start.js; fi"]
