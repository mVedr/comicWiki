from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"])

def convertToHash(password: str):
    return pwd_context.hash(password)

def checkPassword(password: str, hashed_password: str) -> bool:
    return pwd_context.verify(password, hashed_password)

