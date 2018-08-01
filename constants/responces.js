 export const unauthorized = {
            "code": 403,
            "message": "Forbidden",
            "data": {}
        };

export const loggedIn = {
          "code": 200,
          "message": "OK",
          "data": {
            "user": {
                "email": null,
                "username": null
              }
            },
          "token": null
        };

export const notFound = {
      "code": 404,
      "message": "Not Found",
      "data": {}
    }        