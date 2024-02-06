from sqlalchemy.orm import sessionmaker

from models import Comic, User, engine

Session = sessionmaker(bind=engine)

session = Session()

u1 = session.query(User).all()
c1 = session.query(Comic).where(Comic.id==9).one()

print(u1)
print(c1)

#fans of c1
def findFans(comic :Comic)->None:
    for fns in comic.fans:
        print(fns)

findFans(c1)

def numberOfFans(comic :Comic)->int:
    return len(comic.fans)


session.commit()