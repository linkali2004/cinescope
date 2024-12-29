from typing import Generator
from fastapi import FastAPI
from pymongo import MongoClient

app = FastAPI()


client = MongoClient("mongodb+srv://shrey2004:shrey@cluster0.9j4ff.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=Cluster0")

@app.on_event("shutdown")
def shutdown():
    client.close()


def get_db() -> Generator:
    try:
        yield client.sample_mflix
    finally:
        pass

