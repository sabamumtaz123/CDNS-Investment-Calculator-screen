import { useMutation, useQuery } from "react-query";
import config from "../configfile";
import axiosInstance from "./axiosInstance";
import queryClient from "./queryClient";
import { encryptedUrl } from "./EncryptedUrl";

//===== GET /api/v1/investment/calculator/getPurchaseProduct/{nature}/{tenureInMonths}/{investmentAmount} ======/

const GetInvestment = async (
  token: any,
  nature: string,
  tenureInMonths: string,
  investmentAmount: string
) => {
  const headers = { "X-Auth-Token": token };
  return axiosInstance.get(
    `${encryptedUrl}` +
      `/api/v1/investment/calculator/getPurchaseProduct/${nature}/${tenureInMonths}/${investmentAmount}?channel=INTERNET_BANKING`,
    { headers }
  );
};

export const GetInvestmentData = (
  token: any,
  nature: string,
  tenureInMonths: string,
  investmentAmount: string
) => {
  return useQuery(
    "GetInvestmentData data",
    () => GetInvestment(token, nature, tenureInMonths, investmentAmount),
    {
      onSuccess: (data) => {
        console.log(
          "GetInvestmentData data in api",
          data?.headers["x-auth-next-token"]
        );
        queryClient.setQueryData("token", data?.headers["x-auth-next-token"]);
      },
      enabled: false,
      cacheTime: 0,
    }
  );
};
