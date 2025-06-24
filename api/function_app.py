import azure.functions as func
import json

app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)

@app.function_name(name="quiz_submit")
@app.route(route="quiz_submit", methods=["POST"])
def quiz_submit(req: func.HttpRequest) -> func.HttpResponse:
    req_body = req.get_json()
    answers = req_body.get("answers", [])
    result = {
        "type": "ENFP",
        "description": "You are an enthusiastic people-person!"
    }
    return func.HttpResponse(
        json.dumps(result),
        mimetype="application/json"
    )
