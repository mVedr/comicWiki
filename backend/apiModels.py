from pydantic import BaseModel


class ComicRegister(BaseModel):
    name: str
    dob: str | None
    desc: str 
    age: int
    isAlive: bool
    dod: str | None
    twitterUrl: str | None 
    instaUrl: str | None 
    youtubeUrl: str | None 
    wikifeetUrl: str | None 
    onlyFansUrl: str | None 
    wikifeetScore: str | None 

class UserRegister(BaseModel):
    email: str
    username: str
    password: str

class ShowRegister(BaseModel):
    name: str
    comicCharacterName: str | None 
    url: str | None 
    description: str | None 

class SpecialRegister(BaseModel):
    name: str
    comicCharacterName: str | None 
    url: str | None 
    description: str | None 

class MovieRegister(BaseModel):
    name: str 
    comicCharacterName: str | None 
    url: str | None 
    description: str | None    

class GenreRegister(BaseModel):
    name: str

class CountryRegister(BaseModel):
    name: str