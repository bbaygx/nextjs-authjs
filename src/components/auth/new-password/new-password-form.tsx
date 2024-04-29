"use client";

import * as z from "zod";
import { CardWrapper } from "../card-wrapper";
import { useForm } from "react-hook-form";
import { NewPasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { useState, useTransition } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Button } from "../../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { register } from "@/actions/register";
import { useSearchParams } from "next/navigation";
import { newPassword } from "@/actions/new-password";
import { useRouter } from "next/navigation";

export const NewPasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const router = useRouter();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      repeatPassword: "",
    },
  });

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  // handle submit
  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setSuccess("");
    setError("");

    if (values.password !== values.repeatPassword) {
      return setError("Password do not match");
    }

    startTransition(() => {
      newPassword(values, token).then((data) => {
        setSuccess(data.success);
        setError(data.error);
      });
    });
  };

  if (success == "Password updated!") {
    router.push("/auth/login");
  }

  return (
    <CardWrapper
      headerLabel="Enter a new password"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="******"
                        type={showPassword ? "text" : "password"}
                        id="password"
                      />
                      <span>
                        <button
                          type="button"
                          onClick={toggleShowPassword}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                        </button>
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="repeatPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="repeatPassword">
                    Repeat Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="******"
                      type={showPassword ? "text" : "password"}
                      id="repeatPassword"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full">
            Update password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
