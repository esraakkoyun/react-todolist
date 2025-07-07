from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from databases import Database
import jwt
import datetime
import os
import json
from fastapi import Body
from typing import List
import logging

# Gizli anahtar
SECRET_KEY = os.getenv("SECRET_KEY", "super-secret-key")

# Veritabanı bağlantısı
DATABASE_URL = "postgresql://postgres:esrA727@db:5432/todolist_db"
database = Database(DATABASE_URL)


# OAuth2PasswordBearer ile token doğrulaması
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# Token doğrulama fonksiyonu
def get_user_id_from_token(token: str = Depends(oauth2_scheme)):
    if token in blacklist:  # Eğer token blacklist'te ise
        raise HTTPException(status_code=401, detail="Token geçersiz")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        user_id = payload.get("user_id")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return user_id
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
 

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

class DeleteTasksRequest(BaseModel):
    task_ids: List[int]
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



blacklist = set()
@app.post("/logout")
async def logout(token: str = Depends(oauth2_scheme)):
    #token silme işlemi

    blacklist.add(token)
    return {"message": "Çıkış yapıldı"}



# Kullanıcıya ait görevleri almak
@app.get("/gettasks")
async def get_tasks(user_id: int = Depends(get_user_id_from_token)):
    query = "SELECT todolist FROM users WHERE id = :user_id"
    user = await database.fetch_one(query=query, values={"user_id": user_id})

    if not user:
        raise HTTPException(status_code=404, detail="Kullanıcı bulunamadı")

    # JSON olarak saklanan görevleri çözüp döndür
    return json.loads(user["todolist"]) if user["todolist"] else []


# Yeni görev ekleme

@app.post("/addtasks")
async def add_task(task: TaskRequest, user_id: int = Depends(get_user_id_from_token)):
    # Mevcut todolist'i al
    query = "SELECT todolist FROM users WHERE id = :user_id"
    user = await database.fetch_one(query=query, values={"user_id": user_id})

    if not user:
        raise HTTPException(status_code=404, detail="Kullanıcı bulunamadı")

    # Mevcut listeyi JSON olarak çözümle
    todolist = json.loads(user["todolist"]) if user["todolist"] else []

    # Yeni görevin id'sini belirle
    new_id = max([task["id"] for task in todolist], default=0) + 1  # Eğer liste boşsa id'yi 1 yap

    # Yeni görevi oluştur
    new_task = {"id": new_id, "title": task.title}
    todolist.append(new_task)

    # Güncellenmiş listeyi JSON olarak kaydet
    update_query = "UPDATE users SET todolist = :todolist WHERE id = :user_id"
    await database.execute(query=update_query, values={"todolist": json.dumps(todolist), "user_id": user_id})

    return {"message": "Görev eklendi", "todolist": todolist}




# Görevi güncelleme
@app.put("/updatetasks/{task_id}")
async def update_task(task_id: int, updated_task: dict, user_id: int = Depends(get_user_id_from_token)):
    query = "SELECT todolist FROM users WHERE id = :user_id"
    user = await database.fetch_one(query=query, values={"user_id": user_id})

    if not user:
        raise HTTPException(status_code=404, detail="Kullanıcı bulunamadı")

    todolist = json.loads(user["todolist"]) if user["todolist"] else []

    # ID'ye göre görevi bul ve güncelle
    for task in todolist:
        if task["id"] == task_id:
            task["title"] = updated_task["title"]  # title güncelleniyor

    # Güncellenen listeyi veritabanına kaydet
    update_query = "UPDATE users SET todolist = :todolist WHERE id = :user_id"
    await database.execute(query=update_query, values={"todolist": json.dumps(todolist), "user_id": user_id})

    return {"message": "Görev güncellendi", "todolist": todolist}




# Görevi silme
@app.delete("/deletetasks")
async def delete_task(delete_request: DeleteTasksRequest, user_id: int = Depends(get_user_id_from_token)):
    print("delete_request.task_ids:",delete_request.task_ids)

    query = "SELECT todolist FROM users WHERE id = :user_id"
    user = await database.fetch_one(query=query, values={"user_id": user_id})

    if not user:
        raise HTTPException(status_code=404, detail="Kullanıcı bulunamadı")

    todolist = json.loads(user["todolist"]) if user["todolist"] else []

    # Silinecek ID'leri filtrele
    todolist = [task for task in todolist if task["id"] not in delete_request.task_ids]

    update_query = "UPDATE users SET todolist = :todolist WHERE id = :user_id"
    await database.execute(query=update_query, values={"todolist": json.dumps(todolist), "user_id": user_id})

    return {"message": "Görevler silindi", "todolist": todolist}



# Kullanıcıya ait görevleri almak
@app.get("/getUserById")
async def get_user_by_id(user_id: int = Depends(get_user_id_from_token)):
    query = "SELECT * FROM users WHERE id = :user_id"
    user = await database.fetch_one(query=query, values={"user_id": user_id})

    if not user:
        raise HTTPException(status_code=404, detail="Kullanıcı bulunamadı")

    return {
        "id": user["id"],
        "username": user["username"],
        "todolist": json.loads(user["todolist"])  # Kullanıcının todolist'ini döndür
    }


logging.basicConfig(
    level=logging.INFO,
    filename='/logs/app.log',  # Log dosyasının yolu
    format='%(asctime)s - %(levelname)s - %(message)s'
)

@app.get("/")
def home():
    logging.info("Ana sayfa istendi.")
    return {"message": "Merhaba ELK Stack!"}
