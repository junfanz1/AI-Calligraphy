
from flask import Flask, request, jsonify, send_file
from PIL import Image, ImageDraw, ImageFont
import io
import os

app = Flask(__name__)

name_dict = {
    "David": "戴维",
    "Alice": "爱丽丝",
    "John": "约翰",
    "Mary": "玛丽"
}

@app.route('/api/translate-name', methods=['POST'])
def translate_name():
    data = request.get_json()
    name = data.get("englishName", "")
    chinese_name = name_dict.get(name, "张三")
    return jsonify({"chineseName": chinese_name})

@app.route('/api/generate-calligraphy', methods=['POST'])
def generate_calligraphy():
    data = request.get_json()
    name = data.get("name", "")
    style = data.get("style", "楷书")
    font_path = f"fonts/{style}.ttf"

    img = Image.new('RGB', (600, 200), color=(255, 255, 255))
    draw = ImageDraw.Draw(img)
    try:
        font = ImageFont.truetype(font_path, 100)
    except IOError:
        return jsonify({"error": "Font not found"}), 400

    w, h = draw.textsize(name, font=font)
    draw.text(((600-w)/2, (200-h)/2), name, font=font, fill=(0, 0, 0))

    buf = io.BytesIO()
    img.save(buf, format='PNG')
    buf.seek(0)
    return send_file(buf, mimetype='image/png')

if __name__ == '__main__':
    os.makedirs('fonts', exist_ok=True)
    app.run(debug=True, port=5000)
