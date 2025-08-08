from fastapi import Request
from fastapi.responses import JSONResponse
from fastapi import status

async def http_error_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=getattr(exc, "status_code", status.HTTP_500_INTERNAL_SERVER_ERROR),
        content={"detail": getattr(exc, "detail", "Internal Server Error")},
    )