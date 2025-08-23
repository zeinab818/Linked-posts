// Pages/ChangePassword.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {userChangePasswordApi} from './../Services/profileServices'
import { useNavigate } from "react-router-dom";
import { schemaChangePassword } from './../Schema/ChangePasswordShema';

export default function ChangePassword() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schemaChangePassword),
  });

  const onSubmit = async (data) => {
    try {
      const res = await userChangePasswordApi(data);

      if (res?.message === "success") {
        // مسح التوكين علشان يعيد تسجيل الدخول
        localStorage.removeItem("token");

        // مسح الـ form
        reset();

        // توجيه لصفحة الـ login
        navigate("/login");
      } else {
        alert(res?.error || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to change password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-2xl shadow-lg w-96 space-y-4"
      >
        <h2 className="text-xl font-semibold text-center">Change Password</h2>

        <div>
          <label className="block text-sm font-medium mb-1">Old Password</label>
          <input
            type="password"
            {...register("oldPassword")}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
          {errors.oldPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.oldPassword.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">New Password</label>
          <input
            type="password"
            {...register("newPassword")}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {isSubmitting ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
}
