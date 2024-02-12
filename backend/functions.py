import apiModels
import countryCode
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
    return comic

def update_comic(db: Session, comic: apiModels.ComicRegister, comic_id: int):
    db_comic = db.query(models.Comic).filter(models.Comic.id == comic_id).one_or_none()
    if db_comic is None:
        return None

    comic_data = comic.model_dump()
    for key, value in comic_data.items():
        setattr(db_comic, key, value)

    db.commit()
    
    return db_comic

def create_genre(db: Session,genre : apiModels.GenreRegister):
    db_genre = models.Genre(**genre.model_dump())
    db.add(db_genre)
    db.commit()
    return genre

def get_all_genres(db: Session):
    db_genres = db.query(models.Genre).all()
    return db_genres

def create_country(db: Session,country : apiModels.CountryRegister):
    db_country = models.Country(**country.model_dump())
    db.add(db_country)
    db.commit()
    return db_country

def checkIfUserExists(db: Session,email : str,username :str):
    res = db.query(models.User).where((models.User.email==email) or (models.User.username==username)).one_or_none()
    return res is not None

def followComic(db: Session,fanId :int,comicId :int)->bool:
    user = db.query(models.User).where((models.User.id==fanId)).first()
    comic = db.query(models.Comic).where((models.Comic.id==comicId)).first()
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
    user = db.query(models.User).where((models.User.id==fanId)).first()
    comic = db.query(models.Comic).where((models.Comic.id==comicId)).first()
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
    user = db.query(models.User).where((models.User.id==fanId)).first()
    comic = db.query(models.Comic).where((models.Comic.id==comicId)).first()
    if (user is None) or (comic is None):
        return False
    try:
        ind = comic.fans.index(user)
        return True
    except ValueError:
        return False

def get_fav_comics(db: Session,userId :int):
    user = db.query(models.User).where((models.User.id==userId)).first()
    if user is None:
        return None
    comics = list(user.favComics)
    return comics

def get_adminsOf(db: Session,myid :int)->None | list:
    user = db.query(models.User).where((models.User.id==myid)).first()
    if user is None:
        return None
    return list(user.adminOf)

def get_modsOf(db: Session,myid :int)->None | list:
    user = db.query(models.User).where((models.User.id==myid)).first()
    if user is None:
        return None
    return list(user.modOf)

def searchForComics(db: Session, name: str) -> list[models.Comic]:
    ans = db.query(models.Comic).filter(models.Comic.name.like(f'%{name}%')).all()
    return ans

def getMovies(db: Session, id: int) -> list[models.Movies]:
    ans = db.query(models.Comic).filter(models.Comic.id == id).one_or_none()
    if ans is None:
        return None
    return list(ans.movies)

def addMovie(db: Session, id: int,mv : apiModels.MovieRegister):
    cmc = db.query(models.Comic).filter(models.Comic.id == id).one_or_none()
    if cmc is None:
        return None
    cmc.movies.append(
        models.Movies(
            comicCharacterName = mv.comicCharacterName,
            name = mv.name,
            url = mv.url,
            description = mv.description
        )
    )
    db.commit()
    return True

def getShows(db: Session, id: int) -> list[models.Shows]:
    ans = db.query(models.Comic).filter(models.Comic.id == id).one_or_none()
    if ans is None:
        return None
    return list(ans.shows)

def addShow(db: Session, id: int,mv : apiModels.ShowRegister):
    cmc = db.query(models.Comic).filter(models.Comic.id == id).one_or_none()
    if cmc is None:
        return None
    cmc.movies.append(
        models.Shows(
            comicCharacterName = mv.comicCharacterName,
            name = mv.name,
            url = mv.url,
            description = mv.description
        )
    )
    db.commit()
    return True

def getSpecials(db: Session, id: int) -> list[models.Specials]:
    ans = db.query(models.Comic).filter(models.Comic.id == id).one_or_none()
    if ans is None:
        return None
    return list(ans.specials)

def addSpecial(db: Session, id: int,mv : apiModels.SpecialRegister):
    cmc = db.query(models.Comic).filter(models.Comic.id == id).one_or_none()
    if cmc is None:
        return None
    cmc.movies.append(
        models.Specials(
            comicCharacterName = mv.comicCharacterName,
            name = mv.name,
            url = mv.url,
            description = mv.description
        )
    )
    db.commit()
    return True

def updateMovie(db: Session, mv: apiModels.MovieRegister,id: int):
    res = db.query(models.Movies).filter(models.Movies.id == id).one_or_none()
    if res is None:
        return None
    res.comicCharacterName = mv.comicCharacterName
    res.name = mv.name
    res.description = mv.description
    res.url = mv.url
    db.commit()
    return True

def updateShow(db: Session, mv: apiModels.ShowRegister,id: int):
    res = db.query(models.Shows).filter(models.Shows.id == id).one_or_none()
    if res is None:
        return None
    res.comicCharacterName = mv.comicCharacterName
    res.name = mv.name
    res.description = mv.description
    res.url = mv.url
    db.commit()
    return True

def updateSpecial(db: Session, mv: apiModels.SpecialRegister,id: int):
    res = db.query(models.Specials).filter(models.Specials.id == id).one_or_none()
    if res is None:
        return None
    res.comicCharacterName = mv.comicCharacterName
    res.name = mv.name
    res.description = mv.description
    res.url = mv.url
    db.commit()
    return True

def get_country(db : Session,id :int):
    usr = db.query(models.Comic).filter(models.Comic.id == id).one_or_none()
    if usr is None:
        return None
    return usr.country.name

def change_country(db : Session,id :int,code :str):
    key = code.upper()
    if key not in countryCode.codeToName:
        return False
    usr = db.query(models.Comic).filter(models.Comic.id == id).one_or_none()
    if usr is None:
        return None
    usr.country.name = key
    db.commit()
    return True

def get_comics_by_country(db : Session,code : str):
    q = db.query(models.Country).filter(models.Country.name == code).one_or_none()
    if q is None:
        return q
    return list(q.comics)

def get_movie_by_id(db : Session,id : int):
    q = db.query(models.Movies).filter(models.Movies.id == id).one_or_none()
    if q is None:
        return None
    return q
    
def get_show_by_id(db : Session,id : int):
    q = db.query(models.Shows).filter(models.Shows.id == id).one_or_none()
    if q is None:
        return None
    return q

def get_special_by_id(db: Session,id :int):
    q = db.query(models.Specials).filter(models.Specials.id == id).one_or_none()
    if q is None:
        return None
    return q

def isAdmin(comic_id:int,user_id:int,db:Session):
    cmc = db.query(models.Comic).filter(models.Comic.id == comic_id).one_or_none()
    usr = db.query(models.User).filter(models.User.id == user_id).one_or_none()
    if (cmc is None) or (usr is None):
        return None
    return cmc in usr.adminOf

def isMod(comic_id:int,user_id:int,db:Session):
    cmc = db.query(models.Comic).filter(models.Comic.id == comic_id).one_or_none()
    usr = db.query(models.User).filter(models.User.id == user_id).one_or_none()
    if (cmc is None) or (usr is None):
        return None
    return cmc in usr.modOf


def get_adminsFor():
    pass

def get_modsFor():
    pass

def getByGenre():
    pass