import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, User } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { registerSchema, RegisterFormValues } from "@/utils/validators";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/authStore";
import { UserRole, RegisterFormData } from "@/types";

const roleOptions = [
  { value: UserRole.ADMIN, label: "Admin" },
  { value: UserRole.SALES, label: "Sales" },
];

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: UserRole.SALES },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setServerError("");
    try {
      const result = await authService.register(data as RegisterFormData);
      setAuth(result.user, result.token);
      navigate("/leads");
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Registration failed. Please try again.";
      setServerError(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8 gap-3">
          <div className="h-12 w-12 rounded-xl bg-primary-600 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">SL</span>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Create account
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Get started with SmartLeads
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 space-y-4">
          {serverError && (
            <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-600 dark:text-red-400">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Full Name"
              placeholder="Rahul Sharma"
              autoComplete="name"
              leftIcon={<User className="h-4 w-4" />}
              error={errors.name?.message}
              {...register("name")}
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              leftIcon={<Mail className="h-4 w-4" />}
              error={errors.email?.message}
              {...register("email")}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Min. 6 characters"
              autoComplete="new-password"
              leftIcon={<Lock className="h-4 w-4" />}
              error={errors.password?.message}
              {...register("password")}
            />

            <Select
              label="Role"
              options={roleOptions}
              error={errors.role?.message}
              {...register("role")}
            />

            <Button
              type="submit"
              isLoading={isSubmitting}
              className="w-full justify-center"
              size="lg"
            >
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary-600 dark:text-primary-400 font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
