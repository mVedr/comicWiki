from models import Comic, Country, engine
from sqlalchemy.orm import sessionmaker

Session = sessionmaker(bind=engine)

session = Session()

c1 = Country(name="USA")

comics = session.query(Comic).all()

for c in comics:
    c1.comics.append(c)

session.add(c1)
session.commit()