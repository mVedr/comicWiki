from models import Comic, engine
from sqlalchemy.orm import sessionmaker

Session = sessionmaker(bind=engine)

session = Session()

comedians = [
    Comic(name="Dave Chappelle", dob="1973-08-24", desc="Stand-up comedian, actor, and writer", age=48, isAlive=True, dod=None, 
             twitterUrl="https://twitter.com/DaveChappelle", instaUrl="https://www.instagram.com/davechappelle", 
             youtubeUrl="https://www.youtube.com/channel/UCOh5eT3yE3SJktcMOGdAbpw", wikifeetUrl=None, 
             onlyFansUrl=None, wikifeetScore=None),
    
    Comic(name="Trevor Noah", dob="1984-02-20", desc="Stand-up comedian, television host, and political commentator", 
             age=40, isAlive=True, dod=None, twitterUrl="https://twitter.com/Trevornoah", 
             instaUrl="https://www.instagram.com/trevornoah", youtubeUrl="https://www.youtube.com/user/trevornoah", 
             wikifeetUrl=None, onlyFansUrl=None, wikifeetScore=None),

    Comic(name="Ellen DeGeneres", dob="1958-01-26", desc="Stand-up comedian, actress, and television host", age=66, 
             isAlive=True, dod=None, twitterUrl="https://twitter.com/TheEllenShow", 
             instaUrl="https://www.instagram.com/theellenshow", youtubeUrl="https://www.youtube.com/channel/UCp0hYYBW6IMayGgR-WeoCvQ", 
             wikifeetUrl=None, onlyFansUrl=None, wikifeetScore=None),

    Comic(name="Kevin Hart", dob="1979-07-06", desc="Stand-up comedian, actor, and producer", age=42, 
             isAlive=True, dod=None, twitterUrl="https://twitter.com/KevinHart4real", 
             instaUrl="https://www.instagram.com/kevinhart4real", youtubeUrl="https://www.youtube.com/user/HartBeatProductions", 
             wikifeetUrl=None, onlyFansUrl=None, wikifeetScore=None),

    Comic(name="Amy Schumer", dob="1981-06-01", desc="Stand-up comedian, actress, and writer", age=42, 
             isAlive=True, dod=None, twitterUrl="https://twitter.com/amyschumer", 
             instaUrl="https://www.instagram.com/amyschumer", youtubeUrl="https://www.youtube.com/user/amyschumer", 
             wikifeetUrl=None, onlyFansUrl=None, wikifeetScore=None),

    Comic(name="Chris Rock", dob="1965-02-07", desc="Stand-up comedian, actor, and producer", age=57, 
             isAlive=True, dod=None, twitterUrl="https://twitter.com/chrisrock", 
             instaUrl="https://www.instagram.com/chrisrock", youtubeUrl="https://www.youtube.com/user/chrisrock", 
             wikifeetUrl=None, onlyFansUrl=None, wikifeetScore=None),

    Comic(name="Jim Carrey", dob="1962-01-17", desc="Stand-up comedian, actor, and writer", age=62, 
             isAlive=True, dod=None, twitterUrl="https://twitter.com/JimCarrey", 
             instaUrl="https://www.instagram.com/jimcarrey", youtubeUrl="https://www.youtube.com/user/JimCarrey", 
             wikifeetUrl=None, onlyFansUrl=None, wikifeetScore=None),

    Comic(name="Jerry Seinfeld", dob="1954-04-29", desc="Stand-up comedian, actor, and writer", age=70, 
             isAlive=True, dod=None, twitterUrl="https://twitter.com/JerrySeinfeld", 
             instaUrl="https://www.instagram.com/jerryseinfeld", youtubeUrl="https://www.youtube.com/user/JerrySeinfeld", 
             wikifeetUrl=None, onlyFansUrl=None, wikifeetScore=None),

    Comic(name="Eddie Murphy", dob="1961-04-03", desc="Stand-up comedian, actor, and singer", age=63, 
             isAlive=True, dod=None, twitterUrl="https://twitter.com/eddiemurphy", 
             instaUrl="https://www.instagram.com/eddiemurphy", youtubeUrl="https://www.youtube.com/user/eddiemurphy", 
             wikifeetUrl=None, onlyFansUrl=None, wikifeetScore=None),

    Comic(name="Louis C.K.", dob="1967-09-12", desc="Stand-up comedian, actor, and writer", age=57, 
             isAlive=True, dod=None, twitterUrl="https://twitter.com/louisck", 
             instaUrl="https://www.instagram.com/louisckofficial", youtubeUrl="https://www.youtube.com/user/louisckofficial", 
             wikifeetUrl=None, onlyFansUrl=None, wikifeetScore=None)
]

session.add_all(comedians)
session.commit()