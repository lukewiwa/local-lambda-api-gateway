import { APIGatewayProxyEventV2 } from "aws-lambda";
import { Request } from "express";
import { URL } from "url";

export const createAPIGatewayEvent = (req: Request): APIGatewayProxyEventV2 => {
  const { path, method, url, ip, headers, cookies } = req;
  const {
    accept,
    "accept-encoding": acceptEncoding,
    "accept-language": acceptLanguage,
    "content-length": contentLength,
    host,
    "sec-fetch-dest": secFetchDest,
    "sec-fetch-mode": secFetchMode,
    "sec-fetch-site": secFetchSite,
    "sec-fetch-user": secFetchUser,
    "upgrade-insecure-requests": upgradeInsecureRequests,
    "user-agent": userAgentTmp,
    "x-amzn-trace": xAmznTrace,
    "x-forwarded-for": xForwardedFor,
    "x-forwarded-port": xForwaredPort,
    "x-forwarded-proto": xForwaredProto,
  } = headers;
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
    headers: {
      accept,
      "accept-encoding": acceptEncoding as string,
      "accept-language": acceptLanguage,
      "content-length": contentLength,
      host,
      "sec-fetch-dest": secFetchDest as string,
      "sec-fetch-mode": secFetchMode as string,
      "sec-fetch-site": secFetchSite as string,
      "sec-fetch-user": secFetchUser as string,
      "upgrade-insecure-requests": upgradeInsecureRequests as string,
      "user-agent": userAgent,
      "x-amzn-trace": xAmznTrace as string,
      "x-forwarded-for": xForwardedFor as string,
      "x-forwarded-port": xForwaredPort as string,
      "x-forwarded-proto": xForwaredProto as string,
    },
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
    isBase64Encoded: false,
  };
};
