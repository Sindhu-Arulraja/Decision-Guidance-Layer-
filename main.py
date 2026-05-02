import os
import requests
from flask import Flask, send_from_directory, request, Response

app = Flask(__name__)

GROQ_API_KEY = os.environ.get("GROQ_API_KEY")

@app.route("/")
def index():
    return send_from_directory(".", "index.html")

@app.route("/api/chat", methods=["POST"])
def proxy_chat():
    if not GROQ_API_KEY:
        return {"error": "GROQ_API_KEY not configured on server. Please set it in Render environment variables."}, 500
    
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    
    try:
        response = requests.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers=headers,
            json=request.json,
            timeout=30
        )
        return Response(response.text, status=response.status_code, content_type="application/json")
    except Exception as e:
        return {"error": str(e)}, 500

@app.route("/<path:path>")
def static_proxy(path):
    return send_from_directory(".", path)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
