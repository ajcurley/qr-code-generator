import base64
import io

from flask import Flask, render_template, request
from qrcode import QRCode

from qr.schemas import QRCodeRequest


app = Flask(__name__)


@app.route("/status", methods=["GET"])
def status():
    """Return the health check status"""
    return {"status": "healthy"}


@app.route("/api/generate", methods=["POST"])
def generate():
    """Generate a QR code"""
    req = QRCodeRequest.parse_obj(request.json)

    qr = QRCode(version=req.version, box_size=10, border=2)
    qr.add_data(req.data)
    qr.make(fit=True)

    with io.BytesIO() as f:
        image = qr.make_image(fill_color=req.fill_color, back_color=req.back_color)
        image.save(f)
        encoded = base64.b64encode(f.getvalue())

    return {"image": encoded.decode("utf-8")}


@app.route("/", methods=["GET"])
def index():
    """Render the index template"""
    return render_template("index.html")
