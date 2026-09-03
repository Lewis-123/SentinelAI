from datetime import datetime, timedelta, timezone


from passlib.context import CryptContext


from jose import JWTError, jwt



from backend.config import (

    SECRET_KEY,

    ALGORITHM,

    ACCESS_TOKEN_EXPIRE_MINUTES

)





# =====================================
# Password Hashing Configuration
# =====================================

pwd_context = CryptContext(

    schemes=["bcrypt"],

    deprecated="auto"

)





# =====================================
# Hash Password
# =====================================

def hash_password(password: str):

    return pwd_context.hash(

        password

    )







# =====================================
# Verify Password
# =====================================

def verify_password(

    plain_password: str,

    hashed_password: str

):


    return pwd_context.verify(

        plain_password,

        hashed_password

    )








# =====================================
# Create JWT Token
# =====================================

def create_access_token(

    data: dict,

    expires_delta: timedelta | None = None

):


    to_encode = data.copy()



    if expires_delta:


        expire = datetime.now(

            timezone.utc

        ) + expires_delta



    else:


        expire = datetime.now(

            timezone.utc

        ) + timedelta(

            minutes=

            ACCESS_TOKEN_EXPIRE_MINUTES

        )






    to_encode.update(

        {

            "exp":

            expire

        }

    )





    encoded_jwt = jwt.encode(

        to_encode,

        SECRET_KEY,

        algorithm=ALGORITHM

    )





    return encoded_jwt







# =====================================
# Decode JWT Token
# =====================================

def decode_access_token(

    token: str

):


    try:


        payload = jwt.decode(

            token,

            SECRET_KEY,

            algorithms=[

                ALGORITHM

            ]

        )



        return payload




    except JWTError:


        return None