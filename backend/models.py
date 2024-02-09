from sqlalchemy import (Boolean, Column, Date, ForeignKey, Integer, String,
                        create_engine)
from sqlalchemy.orm import declarative_base, relationship, sessionmaker

db_url = "sqlite:///database.db"

engine = create_engine(db_url)

Base = declarative_base()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

class BaseModel(Base):
    __abstract__ = True
    __allow_unmapped__ = True

    id = Column(Integer, primary_key=True)


class UserComic(BaseModel):
    __tablename__ = 'user_comic'
    user_id = Column('user_id', Integer,ForeignKey('users.id'))
    comic_id = Column('comic_id', Integer,ForeignKey('comics.id'))

class Moderator(BaseModel):
    __tablename__ = 'mod'
    user_id = Column('user_id',Integer,ForeignKey('users.id'))
    comic_id = Column('comic_id',Integer,ForeignKey('comics.id'))

class Admin(BaseModel):
    __tablename__ = 'admin'
    user_id = Column('user_id',Integer,ForeignKey('users.id'))
    comic_id = Column('comic_id',Integer,ForeignKey('comics.id'))

class ComicGenre(BaseModel):
    __tablename__ = 'comic_genres'
    genre_id = Column('genre_id',Integer,ForeignKey('genres.id'))
    comic_id = Column('comic_id',Integer,ForeignKey('comics.id'))

class User(BaseModel):
    __tablename__ = 'users'

    email = Column(String,unique=True)
    username = Column(String,unique=True)
    password = Column(String)
    favComics = relationship("Comic",secondary='user_comic',back_populates="fans")
    adminOf = relationship("Comic",secondary='admin',back_populates="admins")
    modOf = relationship("Comic",secondary='mod',back_populates="mods")

    def __str__(self):
        return f"{self.email} , {self.username}"

class Shows(BaseModel):
    __tablename__ = 'shows'
    name = Column(String)
    comicCharacterName = Column(String,)
    url = Column(String) # youtube trailer url / full url
    description = Column(String)
    comic_id = Column(ForeignKey("comics.id"))
    comic = relationship("Comic",back_populates="shows")
    def __str__(self):
        return f"{self.name}"
    

class Specials(BaseModel):
    __tablename__ = 'specials'
    name = Column(String)
    comicCharacterName = Column(String,default="Themselves")
    url = Column(String) # youtube trailer url / full url
    description = Column(String)
    comic_id = Column(ForeignKey("comics.id"))
    comic = relationship("Comic",back_populates="specials")
    def __str__(self):
        return f"{self.name} "

class Movies(BaseModel):
    __tablename__ = 'movies'
    name = Column(String)
    comicCharacterName = Column(String)
    url = Column(String) # youtube trailer url / full url
    description = Column(String)
    comic_id = Column(ForeignKey("comics.id"))
    comic = relationship("Comic",back_populates="movies")
    def __str__(self):
        return f"{self.name} "

class Comic(BaseModel):
    __tablename__ = 'comics'

    name = Column(String)
    dob = Column(String)
    desc = Column(String)
    age = Column(Integer)
    isAlive = Column(Boolean)
    dod = Column(String)
    twitterUrl = Column(String)
    instaUrl = Column(String)
    youtubeUrl = Column(String)
    wikifeetUrl = Column(String)
    onlyFansUrl = Column(String)
    wikifeetScore = Column(String)

    specials = relationship(Specials,uselist=True)
    movies = relationship(Movies,uselist=True)
    shows = relationship(Shows,uselist=True)

    country_id = Column(Integer, ForeignKey("countries.id"))  
    country = relationship("Country", back_populates="comics")

    fans = relationship("User",secondary='user_comic',back_populates="favComics")
    admins = relationship("User", secondary='admin',back_populates="adminOf")
    mods = relationship("User", secondary='mod',back_populates='modOf')
    genres = relationship("Genre",secondary='comic_genres',back_populates="comics")

    def __str__(self):
        return f"{self.name} , {self.dob}"
    

class Country(BaseModel):
    __tablename__ = 'countries'

    name = Column(String,unique=True)

    comics = relationship(Comic)

    def __str__(self):
        return self.name
    

class Genre(BaseModel):
    __tablename__ = 'genres'

    name= Column(String,unique=True)
    comics= relationship("Comic",secondary="comic_genres",back_populates='genres')

    def __str__(self):
        return self.name

Base.metadata.create_all(engine)