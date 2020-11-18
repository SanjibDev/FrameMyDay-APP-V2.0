import { config } from "./../config";
import { trackPromise } from "react-promise-tracker";

export const GET = async (URL: string) => {
  return await trackPromise(
    fetch(config.APIBaseURL + URL, {
      method: "GET",
    })
  );
};

export const POST = async (URL: string, body: any) => {
  return await trackPromise(
    fetch(config.APIBaseURL + URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(body),
    })
  );
};
