# Local Lambda API Gateway

A docker image to pretend to be an AWS API Gateway fronting a lambda function. This is designed for local testing as a way to make local AWS lambda containers to output their invocation as if it was behind an API Gateway endpoint.

## Example

A static website uses HTTP calls to fetch data from an AWS Lambda. For local testing we can simulate what API Gateway will do to transform the lamda result using this container as below.

```yaml
version: "3"

services:

  frontend:
    image: node
    # Extra args

  api-gateway:
    image: local-lambda-api-gateway
    environment:
      LAMBDA_HOST: cloud-function
      LAMBDA_PORT: 8080

  cloud-function:
    image: public.ecr.aws/lambda/nodejs
    # extra args

```