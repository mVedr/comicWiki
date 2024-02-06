from models import Comic, User, engine
from sqlalchemy.orm import sessionmaker

Session = sessionmaker(bind=engine)

session = Session()

f1 = session.query(User).where(User.id==1).one()
f2 = session.query(User).where(User.id==3).one()

c1 = session.query(Comic).where(Comic.id==7).one()
c2 = session.query(Comic).where(Comic.id==5).one()
c3 = session.query(Comic).where(Comic.id==2).one()
c4 = session.query(Comic).where(Comic.id==9).one()

f1.favComics.append(c1)
f2.favComics.append(c2)
f1.favComics.append(c3)
f1.favComics.append(c4)

session.commit()