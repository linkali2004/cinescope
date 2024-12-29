from fastapi import APIRouter,Depends,Body,HTTPException,Request,Response
from database.config import get_db
from fastapi.responses import JSONResponse
from pymongo import MongoClient
from datetime import datetime
from typing import List

from auth.auth import create_access_token,verify_password,get_password_hash,decoded_access_token
from schemas.schema import Login_Struct,Register_Struct,Movies

cinescope = APIRouter()



@cinescope.post("/login")
def login(data:Login_Struct = Body(...),db:MongoClient = Depends(get_db)) -> JSONResponse:
    try:
        user = db.users.find_one({"username":data.username})
        if user:
                    token = create_access_token(data.dict())
                    if verify_password(data.password,user['password']):
                          print(token['expires'])
                          expires = datetime.strptime(token['expires'], '%Y-%m-%dT%H:%M:%S.%f').strftime('%a, %d %b %Y %H:%M:%S GMT')
                          response = JSONResponse(content={"message": "Login successful", "access_token": token['token']})
                          response.set_cookie(key="Authorization",value=token['token'],httponly=True,samesite="lax",secure=True,expires=expires)
                          return response
                    else:
                          raise HTTPException(status_code=404,detail="Username / Password are not right")
        else:
              raise HTTPException(status_code=404,detail="User not found")
    except Exception as e:
          raise HTTPException(status_code=500, detail=f"Error: {str(e)}")



@cinescope.post("/register")
async def register(data:Register_Struct = Body(...),db:MongoClient = Depends(get_db)) -> JSONResponse:
      hashed_password = get_password_hash(data.password)
      try:
            db.users.insert_one({"username":data.username,"email":data.email,"password":hashed_password})
            token = create_access_token({"username":data.username,"password":data.password})
            response = JSONResponse(content={"message": "Register successful", "access_token": token['token']})
            response.set_cookie(key="Authorization",value=token['token'],httponly=True,samesite="lax",secure=True,expires=token['expires'])
            return response
      except Exception as e:
            raise HTTPException(status_code=500,detail=f"Error: {str(e)}")


@cinescope.get("/who")
async def get_username(request:Request):
      cookie = request.cookies
      token = cookie.get("Authorization","Default")
      payload = decoded_access_token(token)
      return payload['username']


@cinescope.get("/genres/{genre}",response_model = List[Movies])
async def get_action_movies(genre:str,db:MongoClient = Depends(get_db)):
      try:
            movies = db.movies.find({"genres":genre},{"title": 1, "poster": 1, "plot": 1, "runtime": 1, "released": 1, "year": 1, "countries": 1, "languages": 1}).limit(10)
            res = []
            for movie in movies:
                  movie["_id"] = str(movie["_id"])
                  try:
                        res.append(Movies(**movie))  
                  except Exception as e:
                        print(f"Error creating Movies schema for {movie}: {e}")  
            return res
      except Exception as e:
            return e


@cinescope.get("/logout")
def logout(response: Response):
    response.delete_cookie(key="Authorization",secure=True,httponly=True)
    return {"message": "Logged out successfully"}
