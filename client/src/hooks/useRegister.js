import { useState } from "react";
import {
  registerUser,
  loginUser,
  verifyOtp,
  resetPassword,
  forgotPassword,
  logoutUser,
} from "@/services/registerService";
export function useRegister() {
  const [loading, setLoading] = useState(false);
  const signup = async (data) => {
    setLoading(true);
    try {
      const res = await registerUser(data);
      return res;
    } finally {
      setLoading(false);
    }
  };
  const login = async (data) => {
    setLoading(true);
    try {
      const result = await loginUser(data);
      return result;
    } finally {
      setLoading(false);
    }
  };
  const verify = async (data) => {
    setLoading(true);
    try {
      await verifyOtp(data);
    } finally {
      setLoading(false);
    }
  };
  const reset = async (data) => {
    setLoading(true);
    try {
      const res = await resetPassword(data);
      return res;
    } finally {
      setLoading(false);
    }
  };
  const forgot = async (data) => {
    setLoading(true);
    try {
      const res = await forgotPassword(data);
      return res;
    } finally {
      setLoading(false);
    }
  };
  const logout = async () => {
    setLoading(true);
    try {
      await logoutUser();
    } finally {
      setLoading(false);
    }
  };
  return { signup, verify, login, loading, forgot, reset ,logout};
}
