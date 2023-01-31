---
title: 'Simple CORS in AWS Lambda - Serverless Architecture'
date: '2017-01-24'
slug: '/2017/01/24/simple-cors-in-aws-lambda-serverless-architecture'
---

## Problem

Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at https://12gddshj.execute-api.us-east-1.amazonaws.com/dev/api/email/send. (Reason: CORS header 'Access-Control-Allow-Origin' missing).

or

XMLHttpRequest cannot load https://12gddshj.execute-api.us-east-1.amazonaws.com/dev/api/email/send. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:8000' is therefore not allowed access. The response had HTTP status code 400.

When calling an AWS Lambda function via the API Gateway from the front-end using jQuery or other Javascript frameworks.

## Solution

Add the `Access-Control-Allow-Origin` header as part of the response.

```js
const response = {
  statusCode: 200,
  headers: {
    "Access-Control-Allow-Origin" : "*" // Required for CORS support to work
  },
  body: JSON.stringify({
      message: body
  }),
};

callback(null, response);
```

Or with the domain you are making the requests from:

```js
const response = {
  statusCode: 200,
  headers: {
    "Access-Control-Allow-Origin" : "www.example.com" // Required for CORS support to work
  },
  body: JSON.stringify({
      message: body
  }),
};

callback(null, response);
```

#### Resources

- [API Gateway](https://serverless.com/framework/docs/providers/aws/events/apigateway/)
- [Github Issue](https://github.com/serverless/serverless/issues/1955)
