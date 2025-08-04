from flask import Flask, Response, request
from hist import plot_histogram, get_bigrams
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/test", methods=["POST"])
def test():
    data = request.get_json()
    put = data["text_input"]
    buf = plot_histogram(get_bigrams(put))
    return Response(buf.getvalue(), mimetype="image/png")


if __name__ == "__main__":
    app.run(port=8000, debug=True)
