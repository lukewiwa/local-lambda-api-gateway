FROM node:14-alpine3.12

ENV LAMBDA_HOST="localhost" \
    LAMBDA_PORT="8080"

WORKDIR /opt/llag/

COPY . /opt/llag/
RUN npm install && npm run build && rm ./src/*.ts

CMD ["node", "./src/index.js" ]
