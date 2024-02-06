from models import Admin, Comic, Moderator, User, engine
from sqlalchemy.orm import sessionmaker

Session = sessionmaker(bind=engine)

session = Session()

u1 = session.query(User).where(User.id==3).one()
u2  = session.query(User).where(User.id==2).one()

c1 = session.query(Comic).where(Comic.id==3).one()
c2 = session.query(Comic).where(Comic.id==8).one()

u1.adminOf.append(c1)
u2.modOf.append(c2)

session.commit()