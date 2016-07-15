# Waston NLC Hapi.JS starter kit

A simple Hapi.JS server that provides API endpoints to communicate with a [IBM Watson™ Natural Language Classifier service] (http://www.ibm.com/watson/developercloud/nl-classifier.html)

## Getting started

1. You need a Bluemix account. If you don't have one, [sign up](https://console.ng.bluemix.net/registration/). Experimental Watson Services are free to use.
2. Once you've created your Bluemix account and have logged in, [create a new instance of the Natural Language Classifier ](http://www.ibm.com/watson/developercloud/doc/nl-classifier/get_start.shtml#credentials) to get the credentials for the service.
3. Clone or download the project, then install the dependencies by running the following node command `npm install`
4. While the dependencies are installing you'll need to [get the credentials](http://www.ibm.com/watson/developercloud/doc/nl-classifier/get_start.shtml#credentials) for your `natural-language-classifier` service.

  ```sh
    {
     "natural_language_classifier": [
        {
           "name": "natural-language-classifier-standard",
           "label": "natural_language_classifier",
           "plan": "standard",
           "credentials": {
              "url": "<url>",
              "username": "<username>",
              "password": "<password>"
           }
        }
     ]
  }
  ```
6. Either add 3 new local `env` variables based on the props above, to your `.bash_profile` or enter them into your current working dir through terminal or command line. This gives us access to our new NLC service.
 
  ```sh
  VCAP_NLC_URL=<url>
  VCAP_NLC_USERNAME=<username>
  VCAP_NLC_PASSWORD=<password>
  ```
7. [Create and train](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/nl-classifier/get_start.shtml#create) the NLC service using, for example, the weather training data. Note the value of the `Classifier ID` in the response.
8. Start the server by running the following node command `npm start`
9. Point your browser to https:localhost:8000

## API Endpoints

`:id` refers to the classifer id you created in step #7 above. You'll be able to easily obtain your classifer id using our `list` endpoint.

I've also named the endpoint and params to match how I use them on a daily basis.

### List all classifiers
----
  Returns a `json` object of all classifiers created within your service.

* **URL**

  `/nlc/list`

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 

    ```javascript
      {
        "classifiers": [
          {
            "classifier_id": "10D41B-nlc-1",
            "url": "https://gateway.watsonplatform.net/natural-language-classifier/api/v1/classifiers/10D41B-nlc-1",
            "name": "My Classifier",
            "language": "en",
            "created": "2015-05-28T18:01:57.393Z"
          }
        ]
      }
    ```
 
* **Error Response:**

  * Returns an empty array if no classifiers are available.

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/nlc/list",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```



### Ask a question
----

* **URL**

  `/nlc/ask?:id&:text`

* **Method:**

  `GET`
  
*  **Query Params**

   **Required:**
 
   `id=[string]`
   `question=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 

    ```javascript
      {
        "classifier_id": "10D41B-nlc-1",
        "url": "<url>",
        "text": "How hot will it be today?",
        "top_class": "temperature",
        "classes": [
          {
            "class_name": "temperature",
            "confidence": 0.9998201258549781
          },
          {
            "class_name": "conditions",
            "confidence": 0.00017987414502176904
          }
        ]
      }
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ "description": "Classifier not found." }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/nlc/ask?id=A3FCCBx16-nlc-412732?question=How hot will it be today?",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```

## TODO
---
- Finish documentation of api endpoints (Looking into Lout or Swagger)
- Add 100% unit test coverage
- Set up Travis CI
