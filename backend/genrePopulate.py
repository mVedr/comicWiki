from models import Comic, Genre, engine
from sqlalchemy.orm import sessionmaker

Session = sessionmaker(bind=engine)

session = Session()

obs = Genre(name="observational")
deadpan = Genre(name="deadpan")


comics = session.query(Comic).filter(Comic.id==4 ).all()
comics2 = session.query(Comic).filter( Comic.id==10).all()
for c in comics:
    obs.comics.append(c)

for c in comics2:
    deadpan.comics.append(c)

session.add(obs)
session.add(deadpan)
session.commit()

