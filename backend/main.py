from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from databases import Database
import jwt
import datetime
import os
import json

# Gizli anahtar
SECRET_KEY = os.getenv("SECRET_KEY", "super-secret-key")

# Veritabanı bağlantısı
DATABASE_URL = "postgresql://postgres:esrA727@localhost:5432/todolist_db"
database = Database(DATABASE_URL)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic modelleri
class User(BaseModel):
    username: str
    password: str
    todolist: list = []

class LoginRequest(BaseModel):
    username: str
    password: str

class TaskRequest(BaseModel):
    title: str

class UpdateTaskRequest(BaseModel):
    title: str

# Lifespan yöneticisi
@app.on_event("startup")
async def startup():
    await database.connect()
    # Ensure the users table exists
    await database.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        todolist TEXT DEFAULT '[]'
    )
    """)

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

# Test endpoint'i
@app.get("/test-db")
async def test_db():
    try:
        users = await database.fetch_all("SELECT * FROM users")
        print("Veritabanı Kullanıcıları:", users)
        return users
    except Exception as e:
        print("Veritabanına bağlanırken bir hata oluştu:", str(e))
        raise HTTPException(status_code=500, detail="Veritabanı bağlantısı hatası")

# Kullanıcı kaydı
@app.post("/register")
async def register(user: User):
    # Kullanıcı adı kontrolü
    existing_user = await database.fetch_one(
        "SELECT * FROM users WHERE username = :username",
        values={"username": user.username}
    )
    
    if existing_user:
        raise HTTPException(status_code=400, detail="Kullanıcı adı zaten mevcut")
    
    # Kullanıcıyı veritabanına ekle
    query = """
    INSERT INTO users (username, password, todolist)
    VALUES (:username, :password, :todolist)
    RETURNING id;
    """
    
    values = {
        "username": user.username,
        "password": user.password,
        "todolist": json.dumps(user.todolist)  # JSON formatında kaydetme
    }
    
    try:
        user_id = await database.execute(query=query, values=values)
        print("🚀 Yeni kullanıcı kaydedildi python :", user_id)
        return {"userId": user_id}
    except Exception as e:
        print("📌 Kayıt sırasında hata oluştu:", str(e))
        raise HTTPException(status_code=500, detail=f"Kayıt sırasında bir hata oluştu: {str(e)}")

# Kullanıcı girişi
@app.post("/login")
async def login(data: LoginRequest):
    query = "SELECT * FROM users WHERE username = :username AND password = :password;"
    user = await database.fetch_one(query=query, values={"username": data.username, "password": data.password})
    
    if user is None:
        raise HTTPException(status_code=401, detail="Kullanıcı adı veya şifre yanlış")
    
    user_dict = dict(user)
    token = create_token(user_dict["id"])
    return {"userId": user["id"], "username": user["username"], "token": token}

# Token oluşturma fonksiyonu
def create_token(user_id: str):
    payload = {
        "user_id": user_id,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")



# OAuth2PasswordBearer ile token doğrulaması
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")
# Token doğrulama fonksiyonu
def get_user_id_from_token(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        user_id = payload.get("user_id")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return user_id
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# Kullanıcıya ait görevleri almak
@app.get("/gettasks")
async def get_tasks(user_id: int = Depends(get_user_id_from_token)):
    query = "SELECT id, title FROM todolist WHERE user_id = :user_id"
    tasks = await database.fetch_all(query=query, values={"user_id": user_id})
    return tasks 

# Yeni görev ekleme

@app.post("/addtasks")
async def add_task(task: TaskRequest, user_id: int = Depends(get_user_id_from_token)):
    query = """
    INSERT INTO todolist (title, user_id)
    VALUES (:title, :user_id)
    RETURNING id;
    """
    values = {"title": task.title, "user_id": user_id}
    task_id = await database.execute(query=query, values=values)
    return {"taskId": task_id}


# Görevi güncelleme
@app.put("/updatetasks/{task_id}")
async def update_task(task_id: int, task: UpdateTaskRequest, user_id: int = Depends(get_user_id_from_token)):
    query = "UPDATE todolist SET title = :title WHERE id = :task_id AND user_id = :user_id"
    values = {"title": task.title, "task_id": task_id, "user_id": user_id}
    await database.execute(query=query, values=values)
    return {"taskId": task_id}


# Görevi silme
@app.delete("/deletetasks/{task_id}")
async def delete_task(task_id: int, user_id: int = Depends(get_user_id_from_token)):
    query = "DELETE FROM todolist WHERE id = :task_id AND user_id = :user_id"
    values = {"task_id": task_id, "user_id": user_id}
    task_id = await database.execute(query=query, values=values)
    return {"taskId": task_id}




"""
import requests  # httpx yerine requests kullanıyoruz
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import jwt
import datetime

SECRET_KEY = "your-secret-key"


def create_token(user_id: str):
    payload = {
        "user_id": user_id,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)  # Token 1 saat geçerli
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")

def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return payload["user_id"]
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token süresi dolmuş")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Geçersiz token")



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
             token = create_token(user["id"])  # Token oluştur
            return {"userId": user["id"], "username": user["username"], "token": token}  # Token'ı döndür
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
        new_user = response.json()  # Yeni kullanıcıyı al
        token = create_token(new_user["id"])  # Token oluştur
        return {"userId": new_user["id"], "username": new_user["username"], "token": token}  # Token'ı döndür
    else:
        raise HTTPException(status_code=response.status_code, detail="Kullanıcı kaydedilemedi")
    

        



"""