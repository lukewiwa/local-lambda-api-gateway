import * as express from "express";
import * as cors from "cors";
import axios from "axios";
import { createAPIGatewayEvent } from "./event";

const app = express();
app.use(express.json());
app.use(cors());

const port = 9745;
const lambdaHost = process.env.LAMBDA_HOST ?? "localhost";
const lambdaPort = process.env.LAMBDA_PORT ?? 8080;
const lambdaUrl = `http://${lambdaHost}:${lambdaPort}/2015-03-31/functions/function/invocations`;

app.all("/*", async (req, res, next) => {
  const event = createAPIGatewayEvent(req);
  try {
    const result = await axios.post(lambdaUrl, JSON.stringify(event), {
      timeout: 5000,
    });
    const { statusCode = 200, body, headers } = result.data;
    res
      .status(statusCode)
      .header(headers)
      .type("text/plain; charset=utf-8")
      .json(body);
  } catch (e) {
    console.log(e);
    return next(e);
  }
});

app.listen(port, () => {
  console.log(`API Gateway listening on http://localhost:${port}`);
});
