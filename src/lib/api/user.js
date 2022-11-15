import apiClient from "./apiClient";
import Cookies from "js-cookie"

// サインアップ（新規アカウント作成）
export const signUp = async(params) => {
  const response = await apiClient.post("/auth", params)
  .then((res) => {
    return res
  })
  .catch((err)=> {
    console.log(err)
  })
  console.log(response)
  return response
}

// サインイン(ログイン)
export const signIn = async(params) => {
  await apiClient.post("/auth/sign_in", params)
  .then((res) => {
    return res
  })
  .catch((err) => {
    console.log(err)
  })
}

export const getCurrentUser = async() => {
  if (!Cookies.get("_access_token") || !Cookies.get("_client") || !Cookies.get("_uid")) {
    await apiClient.get("/auth/sessions",  { headers: {
      "access-token": Cookies.get("_access_token"),
      "client": Cookies.get("_client"),
      "uid": Cookies.get("_uid")
    }})
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.log(err)
    })
  }
}

export const apiTest = async() => {
  await apiClient
  .get("/test")
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })
}
