FROM node:20-slim
RUN npx playwright install --with-deps chromium
WORKDIR /app

# Backend
COPY Backend/package*.json ./Backend/
RUN cd Backend && npm ci
COPY Backend ./Backend/

# Frontend
COPY Frontend/package*.json ./Frontend/
RUN cd Frontend && npm ci
COPY Frontend ./Frontend/

# Root e2e (Playwright)
COPY package*.json ./
RUN npm ci
COPY playwright.config.ts ./
COPY e2e ./e2e/

CMD ["npm", "run", "test:docker"]
