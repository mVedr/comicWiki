import apiModels
import models
from sqlalchemy.orm import Session


def get_comic(db: Session,comic_id :int):
    comic =  db.query(models.Comic).where(models.Comic.id == comic_id).one_or_none()
    return comic

def get_user(db: Session,user_id :int) -> models.User| None:
    user = db.query(models.User).where(models.User.id == user_id).one_or_none()
    return user

def get_user_by_username(db: Session, username: str) -> models.User | None:
    user = db.query(models.User).filter(models.User.username == username).first()
    return user


def get_comics(db: Session,limit :int,offset :int):
    comics =  db.query(models.Comic).offset(offset=offset).limit(limit=limit).all()
    return comics

def get_users(db: Session,limit :int,offset :int):
    users = db.query(models.User).offset(offset=offset).limit(limit=limit).all()
    return users

def create_user(db: Session,user : apiModels.UserRegister):
    if checkIfUserExists(db,user.email,user.username): 
        return None
    
    db_user = models.User(
        email = user.email,
        username = user.username,
        password = user.password
    )

    db.add(db_user)
    db.commit()
    return user

def create_comic(db: Session,comic : apiModels.ComicRegister):
    db_comic = models.Comic(**comic.model_dump())
    db.add(db_comic)
    db.commit()
    #print(db_comic)
    return comic

def create_genre(db: Session,genre : apiModels.GenreRegister):
    db_genre = models.Genre(**genre.model_dump())
    db.add(db_genre)
    db.commit()
    return genre

def create_country(db: Session,country : apiModels.CountryRegister):
    db_country = models.Country(**country.model_dump())
    db.add(db_country)
    db.commit()
    return db_country

def checkIfUserExists(db: Session,email : str,username :str):
    res = db.query(models.User).where((models.User.email==email) or (models.User.username==username)).one_or_none()
    return res is not None

def followComic(db: Session,fanId :int,comicId :int)->bool:
    user = db.query(models.User).where((models.User.id==fanId)).one_or_none()
    comic = db.query(models.Comic).where((models.Comic.id==comicId)).one_or_none()
    if (user is None) or (comic is None):
        return False
    try:
        ind = user.favComics.index(comic)
        return False
    except ValueError:
        user.favComics.append(comic)
        db.commit()
        return True

def unfollowComic(db: Session,fanId :int,comicId :int)->bool:
    user = db.query(models.User).where((models.User.id==fanId)).one_or_none()
    comic = db.query(models.Comic).where((models.Comic.id==comicId)).one_or_none()
    if (user is None) or (comic is None):
        return False
    try:
        ind = comic.fans.index(user)
        del comic.fans[ind]
        db.commit()
        return True
    except ValueError:
        return False

def checkIfComicIsFollowed(db: Session,fanId :int,comicId :int)->bool:
    user = db.query(models.User).where((models.User.id==fanId)).one_or_none()
    comic = db.query(models.Comic).where((models.Comic.id==comicId)).one_or_none()
    if (user is None) or (comic is None):
        return False
    try:
        ind = comic.fans.index(user)
        return True
    except ValueError:
        return False

def isAdmin():
    pass

def isMod():
    pass

def getByCountry(db: Session,):
    pass

def getByGenre():
    pass