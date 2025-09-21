from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import auth, files
from .routes import debug

app = FastAPI(title="Artishine Backend", version="0.1.0")

# CORS - adjust allowed origins for production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(files.router)
app.include_router(debug.router)


@app.get("/health")
def health():
    return {"ok": True}
