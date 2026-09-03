from datetime import datetime, timedelta, timezone

import bcrypt

from jose import JWTError, jwt


from backend.config import (
    SECRET_KEY,
    ALGORITHM,
    ACCESS_TOKEN_EXPIRE_MINUTES
)





# =====================================
# Password Hashing
# =====================================


def hash_password(password: str):


    # bcrypt supports max 72 bytes

    password_bytes = password.encode(

        "utf-8"

    )[:72]


    salt = bcrypt.gensalt()



    hashed = bcrypt.hashpw(

        password_bytes,

        salt

    )


    return hashed.decode("utf-8")







def verify_password(

    plain_password: str,

    hashed_password: str

):


    password_bytes = plain_password.encode(

        "utf-8"

    )[:72]



    hashed_bytes = hashed_password.encode(

        "utf-8"

    )



    return bcrypt.checkpw(

        password_bytes,

        hashed_bytes

    )








# =====================================
# JWT Creation
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

            "exp": expire

        }

    )



    return jwt.encode(

        to_encode,

        SECRET_KEY,

        algorithm=ALGORITHM

    )








# =====================================
# JWT Decode
# =====================================


def decode_access_token(

    token: str

):


    try:


        return jwt.decode(

            token,

            SECRET_KEY,

            algorithms=[ALGORITHM]

        )


    except JWTError:


        return None