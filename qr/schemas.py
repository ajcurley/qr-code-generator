from pydantic import BaseModel, Field, conint


class QRCodeRequest(BaseModel):
    """API request to generate a QR code"""

    version: conint(ge=1, le=40) = Field(default=1)
    data: str
    fill_color: str = "black"
    back_color: str = "white"
