"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useDebounceCallback } from "usehooks-ts";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Loader2} from 'lucide-react'
import { signInSchema } from "@/schemas/signInSchema";
import { signIn } from "next-auth/react";
export default function SignIn() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const debounced = useDebounceCallback(setEmail, 500);
  const router = useRouter();

  // Zod implementation
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  useEffect(() => {
    const checkemailUnique = async () => {
      if (email) {
        setIsCheckingEmail(true);
        setEmailMessage("");

        try {
          const response = await axios.get(
            `/api/check-email-register?email=${email}`
          );
          // console.log(response.data.message)
          let message=response.data.message
          setEmailMessage(message);
        } catch (error: any) {
          const axiosError = error as AxiosError<ApiResponse>;
          setEmailMessage(
            axiosError.response?.data.message ?? "Error checking Email Please try again"
          );
        } finally {
          setIsCheckingEmail(false);
        }
      }
    };
    checkemailUnique();
  }, [email]);

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmiting(true);
    const password=data.password;
    const email=data.email;
    try {
        const response = await signIn('credentials', { email: email, password: password })
      toast({
        title: "Success",
        description:"Login successfull",
      });
      router.replace(`/`);
    } catch (error: any) {
      console.error("Error in SIgnUp of User", error);
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message;
      toast({
        title: "Signin failed",
        description: errorMessage,
        variant: "destructive",
      });
      setIsSubmiting(false);
    }
  };
  return (
    <>
      <span className="">the anant</span>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl text-center">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="email"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          debounced(e.target.value);
                        }}
                      />
                    </FormControl>
                    {isCheckingEmail && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                    <p className={`text-sm ${emailMessage==="email is Valid"?'text-green-500':'text-red-500'}`}>{emailMessage}</p>
                    
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="password"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      />
                      
                    </FormControl>
                    
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isSubmiting}>
               {isSubmiting?(<>
               <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please Wait ....  
               </>):('Crate an Account')}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="#" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
