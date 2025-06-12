FROM node:18

# SSH server kurulumu(sonradan)
RUN apt-get update && \
    apt-get install -y openssh-server && \
    mkdir /var/run/sshd

WORKDIR /usr/src/app

# Sadece package.json ve package-lock.json dosyalarını kopyala (sonradan)
COPY package*.json ./

RUN npm install
COPY . .

# Root parolası belirle ve SSH yapılandırması yap
RUN echo 'root:rootpassword' | chpasswd && \
    sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config



EXPOSE 3000

CMD ["node", "app.js", "service ssh start"]

