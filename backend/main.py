import json
from typing import List

import countryCode
import redis
from apiModels import (ComicRegister, MovieRegister, ShowRegister,
                       SpecialRegister, UserIdRegister, UserLogin,
                       UserRegister)
from fastapi import (Depends, FastAPI, HTTPException, WebSocket,
                     WebSocketDisconnect)
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
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

r = redis.Redis(host="localhost", port=6379,db=0)

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
    cache = r.get(f"comics/{comic_id}")
    if cache:
        # print("Cache hit")
        # print(cache)
        return json.loads(cache)
    user = get_comic(db,comic_id)
    if user is None:
        raise HTTPException(status_code=404,detail="Comic not found")
    cmc = {
        "id": user.id,
        "name": user.name,
        "dob": user.dob,
        "desc": user.desc,
        "age": user.age,
        "isAlive": user.isAlive,
        "dod": user.dod,
        "twitterUrl": user.twitterUrl,
        "instaUrl": user.instaUrl,
        "youtubeUrl": user.youtubeUrl,
        "wikifeetUrl": user.wikifeetUrl,
        "onlyFansUrl": user.onlyFansUrl,
        "wikifeetScore": user.wikifeetScore
    }
    #userD = dict(**user)
    str = json.dumps(cmc)
    r.set(f"comics/{comic_id}",str,ex=24*60*60)
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

@app.get("/admin/{usrId}")
async def getAdmin(usrId : int,db: Session = Depends(get_db)):
    lst = get_adminsOf(db,usrId)
    if lst is None:
        raise HTTPException(404,"No Such User Exists")
    return lst

    
@app.get("/mod/{usrId}")
async def getMod(usrId : int,db: Session = Depends(get_db)):
    lst = get_modsOf(db,usrId)
    if lst is None:
        raise HTTPException(404,"No Such User Exists")
    return lst   

@app.post("/becomeAdmin/{comic_id}")
async def requestAdminPermission(comic_id :int,usr : UserIdRegister,db: Session = Depends(get_db)):
    id = usr.id
    user = get_user(db, user_id=id)
    comic = get_comic(db,comic_id)
    comic.admins.append(user)
    db.commit()

@app.post("/becomeMod/{comic}")
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

@app.get("/favourites/{user_id}")
async def getFavourites(user_id: int,db: Session = Depends(get_db)):
    comics = get_fav_comics(db, user_id)
    if comics is None:
        raise HTTPException(404,"No Such User Exists")
    return comics

@app.get("/search/{comic_name}")
async def search(comic_name: str, db: Session = Depends(get_db)):
    cc = r.get(f"/search/{comic_name}")
    if cc is not None:
        #print("search cache found : ",cc)
        return json.loads(cc)
    comics = searchForComics(db, comic_name)
    lst = [{
         "id": user.id,
        "name": user.name,
        "dob": user.dob,
        "desc": user.desc,
        "age": user.age,
        "isAlive": user.isAlive,
        "dod": user.dod,
        "twitterUrl": user.twitterUrl,
        "instaUrl": user.instaUrl,
        "youtubeUrl": user.youtubeUrl,
        "wikifeetUrl": user.wikifeetUrl,
        "onlyFansUrl": user.onlyFansUrl,
        "wikifeetScore": user.wikifeetScore,
    } for user in comics]
    ans = []
    if not comics:
        ans = []
    else:
        ans = comics
    str = json.dumps(lst)
    r.set(f"/search/{comic_name}",str,ex=24*60*60)
    return ans

@app.get("/movies/{comic_id}")
async def get_movies(comic_id :int, db : Session = Depends(get_db)):
    ans = getMovies(db,comic_id)
    if ans is not None:
        return ans
    raise HTTPException(404,detail="No such comic exists")

@app.post("/comic/movies/{comic_id}")
async def add_movie(comic_id: int,req: MovieRegister, db : Session = Depends(get_db)):
    res = addMovie(db,comic_id,req)
    if res is None:
        raise HTTPException(404,detail="No such comic exists")
    return res

@app.patch("/comic/movies/{comic_id}")
async def update_movie(comic_id:int,req:MovieRegister, db : Session = Depends(get_db)):
    pass

@app.get("/shows/{comic_id}")
async def get_shows(comic_id:int,db : Session = Depends(get_db)):
    ans = getShows(db,comic_id)
    if ans is not None:
        return ans
    raise HTTPException(404,detail="No such comic exists")

@app.post("/comic/shows/{comic_id}")
async def add_show(comic_id: int,req: ShowRegister, db : Session = Depends(get_db)):
    res = addShow(db,comic_id,req)
    if res is None:
        raise HTTPException(404,detail="No such comic exists")
    return res

@app.get("/specials/{comic_id}")
async def get_specials(comic_id:int,db : Session = Depends(get_db)):
    ans = getSpecials(db,comic_id)
    if ans is not None:
        return ans
    raise HTTPException(404,detail="No such comic exists")

@app.post("/comic/specials/{comic_id}")
async def add_special(comic_id: int,req: ShowRegister, db : Session = Depends(get_db)):
    res = addSpecial(db,comic_id,req)
    if res is None:
        raise HTTPException(404,detail="No such comic exists")
    return res

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)


manager = ConnectionManager()

@app.websocket("/ws/greenroom/{comic_id}/{user_id}")
async def websocket_endpoint(websocket: WebSocket, comic_id:int, user_id:int,db :Session = Depends(get_db)):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            user = get_user(db,user_id)
            await manager.broadcast(f"{user.username}: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast(f"{user.username} left the chat")

@app.get("/genres/")
async def getAllGenres(db:Session = Depends(get_db)):
    gs = get_all_genres(db)
    arr = [
        {
            "id":g.id,
            "name":g.name
        }
        for g in gs
    ]
    return arr

@app.get("/comic/{comic_id}/country/")
async  def getCountry(comic_id : int,db:Session = Depends(get_db)):
    ans = get_country(db,comic_id)
    if ans is None:
        raise HTTPException(404,"No info found")
    return {"name" : countryCode.codeToName[ans]}

@app.get("/country/{code}")
async def getComicsByCountryCode(code : str,db:Session = Depends(get_db)):
    ans = get_comics_by_country(db,code)
    return ans