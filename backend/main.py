from apiModels import ComicRegister, UserIdRegister, UserLogin, UserRegister
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from functions import *
from models import SessionLocal
from sqlalchemy.orm import Session

app = FastAPI()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

origins = [
    "http://localhost:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
async def root():
    return {"message": "Hello ComicWiki"}

@app.get("/comics/{comic_id}")
async def getInfo(comic_id :int, db: Session = Depends(get_db)):
    user = get_comic(db,comic_id)
    if user is None:
        raise HTTPException(status_code=404,detail="Comic not found")
    return user

@app.get("/users/{user_id}")
async def getUsers(user_id :int, db: Session = Depends(get_db)):
    user = get_user(db,user_id)
    if user is None:
        raise HTTPException(status_code=404,detail="User not found")
    return user

@app.get("/user/{username}")
async def getUserByUsername(username :str, db: Session = Depends(get_db)):
    user = get_user_by_username(db,username)
    if user is None:
        raise HTTPException(status_code=404,detail="User not found")
    return user

@app.get("/comics/")
async def getComics(skip: int=0, limit: int=5, db: Session = Depends(get_db)):
    comics = get_comics(db=db,offset=skip, limit=limit)
    return comics

@app.get("/users/")
async def getUsers(skip: int=0, limit: int=10,db: Session = Depends(get_db)):
    users = get_users(db=db,offset=skip, limit=limit)
    return users

@app.post("/comics/")
async def createComic(comic : ComicRegister,db: Session = Depends(get_db)):
    new_comic = create_comic(db,comic)
    return new_comic

@app.post("/users/")
async def createUser(user : UserRegister,db: Session = Depends(get_db)):
    new_user = create_user(db,user)
    if new_user is None:
        raise HTTPException(status_code=409,detail = "User Already Exists")
    return new_user

@app.post("/follow/{comic_id}")
async def follow(comic_id :int,id :int,db: Session = Depends(get_db)):
    actionPerformed = followComic(db,id,comic_id)
    if actionPerformed:
        return True
    else:
        raise HTTPException(status_code=500,detail="This action cannot be done")

@app.get("/isFollowed/{comic_id}")
async def isFollowed(comic_id:int,user_id :int,db: Session = Depends(get_db)):
    ok = checkIfComicIsFollowed(db,user_id,comic_id)
    return ok

@app.post("/unfollow/{comic_id}")
async def unfollow(comic_id :int,id :int,db: Session = Depends(get_db)):
    actionPerfomed = unfollowComic(db,id,comic_id)
    if actionPerfomed:
        return True
    else:
        raise HTTPException(status_code=500,detail="This action cannot be done")

@app.post("/genre/")
async def addGenre():
    pass

@app.post("/admin/{comic_id}")
async def requestAdminPermission(comic_id :int,usr : UserIdRegister,db: Session = Depends(get_db)):
    id = usr.id
    user = get_user(db, user_id=id)
    comic = get_comic(db,comic_id)
    comic.admins.append(user)
    db.commit()

@app.post("/mod/{comic}")
async def requestModeratorPermission(comic_id :int,usr : UserIdRegister,db: Session = Depends(get_db)):
    id = usr.id
    user = get_user(db, user_id=id)
    comic = get_comic(db,comic_id)
    comic.admins.append(user)
    db.commit()

@app.post("/login/")
async def login(req :UserLogin,db: Session = Depends(get_db)):
    pass

@app.get("/token/")
async def func(token: str = Depends(oauth2_scheme)):
    return {"token": token}