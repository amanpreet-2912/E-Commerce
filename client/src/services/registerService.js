import { authApi } from "@/api/authApi";
export async function registerUser(data) {
  try {
    const response = await authApi.register(data);
    return response.data;
  } catch (err) {
    console.log("error signing up", err);
    throw new Error(
      err.response?.data?.message || "Something went wrong in registering user",
    );
  }
}
export async function verifyOtp(data) {
  try {
    const response = await authApi.verify(data);
    return response.data;
  } catch (err) {
    console.log("error in verifying otp", err);
    throw new Error(
      err.response?.data?.message || "something went wrong in verifying otp",
    );
  }
}
export async function loginUser(data) {
  try {
    const response = await authApi.login(data);

    return response.data;
  } catch (err) {
    console.log("error logging in");
    console.log(err);
    throw new Error(
      err.response?.data?.message || "Smoething went wrong in logging in",
    );
  }
}
export async function forgotPassword(data) {
  try {
    const response = await authApi.forgotPassword(data);
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.response?.data?.message);
  }
}
export async function resetPassword(data) {
  try {
    const response = await authApi.resetPassword(data);
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
}
