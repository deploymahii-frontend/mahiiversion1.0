import ApiClient from "../core/api/ApiClient";

export async function login(credentials) {
  const { data } = await ApiClient.post(
    "/auth/login",
    credentials
  );

  return data.data;
}

export async function signup(payload) {
  const { data } = await ApiClient.post(
    "/auth/signup",
    payload
  );

  return data.data;
}

export async function getProfile() {
  const { data } = await ApiClient.get(
    "/users/profile"
  );

  return data.data;
}

export async function logout() {
  return Promise.resolve();
}
