"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createAccount, signInUser } from "@/lib/actions/user.actions";
import OtpModal from "@/components/OTPModal";

type FormType = "sign-in" | "sign-up";

const authFormSchema = (formType: FormType) => {
  return z.object({
    email: z.string().email(),
    fullName:
  formType === "sign-up"
    ? z
        .string()
        .optional()
        .refine((val) => !val || val.length >= 2, {
  message: "Full name must be at least 2 characters",
})

    : z.string().optional(),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [accountId, setAccountId] = useState(null);

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const user =
        type === "sign-up"
          ? await createAccount({
              fullName: values.fullName || "",
              email: values.email,
            })
          : await signInUser({ email: values.email });

      setAccountId(user.accountId);
    } catch {
      setErrorMessage("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex max-h-[800px] w-full max-w-[580px] flex-col justify-center space-y-6 transition-all lg:h-full lg:space-y-8 !important">
          <h1 className="text-[34px] leading-[42px] font-bold text-center text-light-100 md:text-left !important">
            {type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>
          {type === "sign-up" && (
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <div className="flex h-[78px] flex-col justify-center rounded-xl border border-light-300 px-4 shadow-drop-1">
                    <FormLabel className="text-light-100 pt-2 body-2 w-full !important">Full Name</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Enter your full name"
                        className="border-none shadow-none p-0 outline-none ring-offset-transparent focus:ring-transparent focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 !important shad-no-focus placeholder:text-light-200 body-2 !important"
                        {...field}
                      />
                    </FormControl>
                  </div>

                  <FormMessage className="text-red-600 text-[14px] leading-[20px] font-normal ml-4 !important" />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="flex h-[78px] flex-col justify-center rounded-xl border border-light-300 px-4 shadow-drop-1">
                  <FormLabel className="text-light-100 pt-2 text-[14px] leading-[20px] font-normal w-full !important">Email</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      className="border-none shadow-none p-0 outline-none ring-offset-transparent focus:ring-transparent focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 !important placeholder:text-light-200 body-2 !important"
                      {...field}
                    />
                  </FormControl>
                </div>

                <FormMessage className="text-[#FF7474] text-[14px] leading-[20px] font-normal ml-4 !important" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="bg-[#FA7275] hover:bg-[#EA6365] transition-all rounded-full button !important h-[66px] !important"
            disabled={isLoading}
          >
            {type === "sign-in" ? "Sign In" : "Sign Up"}

            {isLoading && (
              <Image
                src="/assets/icons/loader.svg"
                alt="loader"
                width={24}
                height={24}
                className="ml-2 animate-spin"
              />
            )}
          </Button>

          {errorMessage && <p className="text-[14px] leading-[20px] font-normal mx-auto w-fit rounded-xl bg-[#b80000]/5 px-8 py-4 text-center text-[#b80000] !important">*{errorMessage}</p>}

          <div className="body-2 flex justify-center">
            <p className="text-light-100">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="ml-1 font-medium text-[#FA7275]"
            >
              {" "}
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </div>
        </form>
      </Form>

      {accountId && (
        <OtpModal email={form.getValues("email")} accountId={accountId} />
      )}
    </>
  );
};

export default AuthForm;