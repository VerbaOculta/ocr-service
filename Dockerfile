FROM node:18

# Instalar Tesseract y dependencias
RUN apt-get update && \
    apt-get install -y tesseract-ocr && \
    apt-get clean

# Crear directorio de la app
WORKDIR /app

# Copiar dependencias
COPY package*.json ./
RUN npm install

# Copiar el código fuente
COPY . .

# Exponer puerto y comando de inicio
EXPOSE 3000
CMD ["node", "index.js"]
