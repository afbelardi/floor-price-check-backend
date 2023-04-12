FROM ghcr.io/puppeteer/puppeteer:18.2.1

ENV PUPPETEER_SKIP_CHROMIUIM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci 
COPY . .
CMD ["node", "server.js"]