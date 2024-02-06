from apiModels import ComicRegister, UserRegister
from fastapi import Depends, FastAPI, HTTPException
from functions import *
from models import SessionLocal
from sqlalchemy.orm import Session

app = FastAPI()

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

@app.get("/comics/")
async def getComics(skip: int=0, limit: int=10, db: Session = Depends(get_db)):
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
        return {"data":"success"}
    else:
        raise HTTPException(status_code=500,detail="This action cannot be done")

@app.post("/follow/{comic_id}")
async def unfollow(comic_id :int,id :int,db: Session = Depends(get_db)):
    actionPerfomed = unfollowComic(db,id,comic_id)
    if actionPerfomed:
        return {"data":"success"}
    else:
        raise HTTPException(status_code=500,detail="This action cannot be done")