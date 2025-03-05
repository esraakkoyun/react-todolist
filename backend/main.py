#"""
import requests  # httpx yerine requests kullanıyoruz
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi.security import OAuth2PasswordBearer
import jwt

# JWT ayarları
SECRET_KEY = "your_secret_key"  # Güvenli bir anahtar belirleyin
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30  # Token süresi

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Token oluşturma fonksiyonu
def create_token(user_id, username, password):
    payload = {
        "id": user_id,
        "username": username,
        "password": password,
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
    return token

# Token doğrulama fonksiyonu
def verify_jwt(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError:
        return "Hata: Token süresi dolmuş!"
    except jwt.InvalidTokenError:
        return "Hata: Geçersiz token!"

app = FastAPI()

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LoginRequest(BaseModel):
    username: str
    password: str

# Mock API URL
USERS_URL = "https://67a4a35cc0ac39787a1bf756.mockapi.io/api/v1/users"


@app.get("/")
def get_users():
    response = requests.get(USERS_URL)  # Senkron istek
    return response.json()

@app.post("/login")
def login(data: LoginRequest):
    response = requests.get(USERS_URL)  # Tüm kullanıcıları al
    users = response.json()  # Kullanıcıları JSON formatında al

    # Kullanıcı adı ve şifre kontrolü
    for user in users:
        if user['username'] == data.username and user['password'] == data.password:
            # Token oluştur
            access_token = create_token(user["id"], user["username"], user["password"])
            return {"access_token": access_token}

    raise HTTPException(status_code=401, detail="Kullanıcı adı veya şifre yanlış")

@app.post("/register")
def register(data: LoginRequest):
    # Kullanıcı adı zaten mevcut mu kontrol et
    response = requests.get(USERS_URL)  # Tüm kullanıcıları al
    users = response.json()  # Kullanıcıları JSON formatında al

    for user in users:
        if user['username'] == data.username:
            raise HTTPException(status_code=400, detail="Kullanıcı zaten mevcut")

    # Mock API'ye kullanıcı kaydetme isteği
    response = requests.post(USERS_URL, json={
        "username": data.username,
        "password": data.password
    })

    if response.status_code == 201:  # 201: kayıt başarılı
        return {"message": "Kullanıcı kaydedildi"}
    else:
        raise HTTPException(status_code=response.status_code, detail="Kullanıcı kaydedilemedi")
    


@app.get("/protected")
def protected(token: str = Depends(oauth2_scheme)):
    try:
        decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return {"message": "Erişim başarılı!", "user": decoded}
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token süresi dolmuş!")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Geçersiz token!")
    

#"""















