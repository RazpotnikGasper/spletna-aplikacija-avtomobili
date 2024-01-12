from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


app.config["MYSQL_CURSORCLASS"] = "DictCursor"
app.config["MYSQL_HOST"] = "mysql_container"
app.config["MYSQL_USER"] = "gapi"
app.config["MYSQL_PASSWORD"] = "Password"
app.config["MYSQL_DB"] = "flaskreact"
app.config["MYSQL_PORT"] = 3306

mysql = MySQL(app)


@app.route("/", methods=['GET'])
def home():
    return jsonify({"message": "Pozdravljenni ! Test"})


@app.route("/api/cars")
def index():
    with mysql.connection.cursor() as cur:
        cur.execute("SELECT * FROM cars")
        data = cur.fetchall()

    return jsonify(data)


@app.route("/api/tip")
def tip():
    with mysql.connection.cursor() as cur:
        cur.execute("SELECT * FROM tipvozila WHERE  active=0")
        data = cur.fetchall()
    return jsonify(data)

@app.route("/api/name")
def name():
    with mysql.connection.cursor() as cur:
        cur.execute("SELECT id,name FROM cars")
        data = cur.fetchall()

    return jsonify(data)


@app.route("/api/cars", methods=["POST"])
def insert():
    if request.method == "POST":
        data = request.get_json()

        name = data.get("name")
        model = data.get("model")
        typecar = data.get("type")

        with mysql.connection.cursor() as cur:
            cur.execute(
                "INSERT INTO cars (name, model, type) VALUES (%s, %s, %s)",
                (name, model, typecar),
            )
            mysql.connection.commit()
        return jsonify({"message": "Avto uspešno vnešen"})


@app.route("/api/cars/<int:car_id>", methods=["PUT", "DELETE"])
def update_or_delete_car(car_id):
    if request.method == "PUT":
        updated_car = request.get_json()
        with mysql.connection.cursor() as cur:
            cur.execute(
                "UPDATE cars SET name=%s, model=%s, type=%s WHERE id=%s",
                (
                    updated_car["name"],
                    updated_car["model"],
                    updated_car["type"],
                    car_id,
                ),
            )
            mysql.connection.commit()
        return jsonify({"message": "Avto uspešno posodobljen"})
    elif request.method == "DELETE":
        with mysql.connection.cursor() as cur:
            cur.execute("DELETE FROM cars WHERE id=%s", (car_id,))
            mysql.connection.commit()
        return jsonify({"message": "Avto uspešno izbrisan"})


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')

