from pydantic import BaseModel,EmailStr,Field
from typing import List
from datetime import datetime
class Login_Struct(BaseModel):
    username:str
    password:str



class Register_Struct(BaseModel):
    username:str
    password:str
    email:EmailStr



class Movies(BaseModel):
    id: str = Field(..., alias="_id")
    title:str
    poster:str
    plot:str
    runtime:int
    released:datetime
    year:int
    countries:List[str]
    languages:List[str]

    class Config:
        populate_by_name = True