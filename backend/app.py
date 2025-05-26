from flask import Flask, request, jsonify, send_from_directory, render_template_string, make_response, send_file
from flask_cors import CORS
import os
import base64
import io

app = Flask(
    __name__,
    static_folder="static",
    static_url_path="/",
    # FOR DEPLOYMENT: 
    # template_folder="backend/templates"
    # FOR DEVELOPMENT: 
    template_folder="templates"
    
)

CORS(app)

SOCIAL_LINKS = {
    "kern": {
        "facebook": "https://www.facebook.com/kernstudiosnola/",
        "linkedin": "https://www.linkedin.com/company/blaine-kern-artists-inc",
        "twitter": "https://twitter.com/KernStudiosNola",
        "instagram": "https://www.instagram.com/kernstudios/"
    },
    "mgw": {
        "facebook": "https://www.facebook.com/MardiGrasWorld",
        "linkedin": "https://www.linkedin.com/company/blaine-kern-artists-inc",
        "instagram": "https://www.instagram.com/mardigrasworld/"
    },
    "rivercity": {
        "facebook": "https://www.facebook.com/RiverCityVenues",
        "linkedin": "https://www.linkedin.com/company/blaine-kern-artists-inc",
        "instagram": "https://www.instagram.com/rivercityvenues/"
    }
}

def format_companies(companies):
    if not companies:
        return ""
    if len(companies) == 1:
        return companies[0]
    elif len(companies) == 2:
        return " & ".join(companies)
    else:
        return ", ".join(companies[:-1]) + ", & " + companies[-1]

@app.route("/api/generate", methods=["POST"])
def generate_signature():
    data = request.json
    associated_companies = data.get("associated_companies", [])
    formatted = format_companies(associated_companies)
    context = {
        "name": data.get("name"),
        "title": data.get("title"),
        "email": data.get("email"),
        "phone_office": data.get("phone_office"),
        "phone_fax": data.get("phone_fax"),
        "phone_mobile": data.get("phone_mobile"),
        "associated_companies_formatted": formatted
        # "social": SOCIAL_LINKS.get(company_key, {})
    }
    with open(os.path.join(app.template_folder, 'signature_test.html')) as f:
        template_str = f.read()
    html = render_template_string(template_str, **context)
    return jsonify({"html": html})

@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")

@app.errorhandler(404)
def not_found(e):
    if app.static_folder:
        index_path = os.path.join(app.static_folder, "index.html")
        if os.path.exists(index_path):
            return send_from_directory(app.static_folder, "index.html")
    return "404 Not Found", 404


if __name__ == "__main__":
    app.run(debug=True, port=5555)
