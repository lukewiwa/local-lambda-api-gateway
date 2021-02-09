import * as express from "express";
import axios from "axios";
import { createAPIGatewayEvent, createAPIGatewayResponse } from "./event";

const app = express();
app.use(express.json());

const port = 9745;
const lambdaHost = process.env.LAMBDA_HOST ?? "localhost";
const lambdaPort = process.env.LAMBDA_PORT ?? 8080;
const lambdaUrl = `http://${lambdaHost}:${lambdaPort}/2015-03-31/functions/function/invocations`;

app.all("/*", async (req, res, next) => {
  const event = createAPIGatewayEvent(req);
  res.type("application/json");
  try {
    const result = await axios.post(lambdaUrl, JSON.stringify(event), {
      timeout: 5000,
    });
    console.log(result);
    const response = createAPIGatewayResponse(result);
    res.json(response);
  } catch (e) {
    console.log(e);
    return next(e);
  }
});

app.listen(port, () => {
  console.log(`API Gateway listening on http://localhost:${port}`);
});
