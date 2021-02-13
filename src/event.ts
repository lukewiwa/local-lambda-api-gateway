import {
  APIGatewayProxyEventV2,
  APIGatewayProxyEventHeaders,
} from "aws-lambda";
import { Request } from "express";
import { URL } from "url";

export const createAPIGatewayEvent = (req: Request): APIGatewayProxyEventV2 => {
  const { path, method, url, ip, headers, cookies, body } = req;
  const { "user-agent": userAgentTmp } = headers;
  const userAgent = userAgentTmp ?? "";
  const rawQueryString = new URL(url, "http://example.com").search;
  const currentDate = new Date(Date.now());
  const time = currentDate.toLocaleString("en-US", { timeZone: "UTC" });
  const timeEpoch = Math.floor(currentDate.getTime() / 1000);

  return {
    version: "2.0",
    routeKey: `ANY ${path}`,
    rawPath: path,
    rawQueryString,
    cookies,
    headers: headers as APIGatewayProxyEventHeaders,
    requestContext: {
      accountId: "123456789012",
      apiId: "",
      domainName: "localhost",
      domainPrefix: "",
      http: {
        method,
        path,
        protocol: "HTTP/1.1",
        sourceIp: ip,
        userAgent,
      },
      requestId: "JKJaXmPLvHcESHA=",
      routeKey: `ANY ${path}`,
      stage: "default",
      // time: "10/Mar/2020:05:16:23 +0000",
      time,
      timeEpoch,
    },
    body: JSON.stringify(body),
    isBase64Encoded: false,
  };
};
