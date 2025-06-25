# Node.js image'inden başla. React projeleri çalışmak için node.js ister.
FROM node:20.19.0

# 2. Çalışma klasörünü ayarla
WORKDIR /app

# 3. package.json ve package-lock.json'u app klasörüne kopyalar bunlar bağımlılıkalrı içerdiği için
# bu dosyaları kopyalamadan bağımlılıkları yüklemeye çalışırsak her seferinde bağımlılıkları yükleyecektir.
COPY package*.json ./

# 4. Bağımlılıkları yükle uyumsuzları göz ardı et 
RUN npm install --legacy-peer-deps


# 5. Tüm projeyi app e kopyala. ilk nokta bilgisayardaki klasörümüzü, ikinci nokta konteynerin içindeki app klasörü
COPY . .

# 6. Portu aç. proje bu porttan dışarıya açılacak.
EXPOSE 5173

# 7. React uygulamasını başlat . konteyner çalıştığında bu komut çalışacak. --host ile tarayıcıdan erişim sağlıyoruz aksi halde sadece container içinde çalışır.
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# Uygulamayı build et. cmd den sonra yazılan komutlar çalışmaz. ŞU AN GEREKLİ DEĞİL SONRA ARAŞTIR.
RUN npm run build