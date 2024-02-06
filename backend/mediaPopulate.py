from models import Comic, Movies, Shows, Specials, engine
from sqlalchemy.orm import sessionmaker

Session = sessionmaker(bind=engine)

session = Session()

c1 = session.query(Comic).where(Comic.id == 8).one()

c1.shows.append(Shows(
    comicCharacterName="Jerry Sienfield",
    name="Sienfield",
    url="https://www.youtube.com/@SeinfeldTV",)
)

c2 = session.query(Comic).where(Comic.id == 9).one()
c2.movies.append(Movies(
    comicCharacterName="Randy Watson",
    name="Coming To America",
    url="https://www.youtube.com/watch?v=KFroCRDXw5E"
))

c3 = session.query(Comic).where(Comic.id == 10).one()
c3.specials.append(Specials(
    name="Sorry",
    url="https://www.youtube.com/watch?v=1JtttBKJb9g",
)
)

c4 = session.query(Comic).where(Comic.id == 6).one()
c4.shows.append(Shows(
    comicCharacterName="Chris Rock",
    name="Everybody Hates Chris",
    url="https://www.youtube.com/watch?v=XvPRJ6Q0G3g"
))

c5 = session.query(Comic).where(Comic.id == 7).one()
c5.movies.append(Movies(
    comicCharacterName="Jim Carrey",
    name="The Truman Show",
    url="https://www.youtube.com/watch?v=loTIzXAS7v4"
))


c7 = session.query(Comic).where(Comic.id == 1).one()
c7.shows.append(Shows(
    comicCharacterName="Dave Chappelle",
    name="Chappelle's Show",
    url="https://www.youtube.com/watch?v=_zUFir6CNLs"
))

c8 = session.query(Comic).where(Comic.id == 2).one()
c8.movies.append(Movies(
    comicCharacterName="Trevor Noah",
    name="Trevor Noah: Son of Patricia",
    url="https://www.youtube.com/watch?v=vegYW0w5R48"
))


c10 = session.query(Comic).where(Comic.id == 3).one()
c10.shows.append(Shows(
    comicCharacterName="Ellen DeGeneres",
    name="The Ellen DeGeneres Show",
    url="https://www.youtube.com/user/TheEllenShow"
))

session.commit()
