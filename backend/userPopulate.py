from models import User, engine
from sqlalchemy.orm import sessionmaker

Session = sessionmaker(bind=engine)

session = Session()

u1 = User(email="vedrecharla@gmail.com",username="mVedr",password="123")
u2 = User(email="ee@yahoo.com",username="EE28",password="908j")
u3 = User(email="uu2@gmail.com",username="uuedp",password="45")
u4 = User(email="unq88@gmail.com",username="unggamer",password="111")

session.add_all([u1,u2,u3,u4])
session.commit()