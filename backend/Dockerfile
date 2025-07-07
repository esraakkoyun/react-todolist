# backend/Dockerfile
# konteynerin için bu python sürümü yüklü olacak.
FROM python:3.10  

# konteyner içindeki çalışma dizini
WORKDIR /app

# sistemdeki dosyaları konteynerin içine kopyala. requirements.txt dosyası bağımlılıkları içeriyor.bunları kopyalar 
COPY requirements.txt .

#bağımlılıkları yükler.
RUN pip install -r requirements.txt
RUN mkdir /logs

# uygulama dosyalarını kopyalar. ilk nokta bilgisayardaki klasörümüzü, ikinci nokta konteynerin içindeki app klasörü
COPY . .

#fastapi adresi. dışarıya bu port ile açılır
EXPOSE 8000

# fastapi sunucusunu çalıştırır. conatiner başladığında otomatik olarak çalışır. --host ile tarayıcıdan erişim sağlıyoruz aksi halde sadece container içinde çalışır.
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
