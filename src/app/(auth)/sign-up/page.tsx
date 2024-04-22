"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import axios from "axios";
const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export default function SignUp() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    fullname: "",
    email: "",
    password: "",
    username: "",
  });
  // Register Process
  const onRegister = async () => {
    try {

      const response = await axios
        .post("/api/sign-up", user)
        .then(async (response) => {
          console.log("Response:", response);
          if (response.statusText === "OK") {
            router.push("/sign-in");
          }
        })
        
      // router.push("/login");
    } catch (error: any) {
      console.log("Registered failed", error.response.data.message);
      alert(error.response.data.message)
      // toast.error(error.message);
    }
  };

const form = useForm<z.infer<typeof FormSchema>>({
  resolver: zodResolver(FormSchema),
  defaultValues: {
    pin: "",
  },
});
function onSubmit(data: z.infer<typeof FormSchema>) {
  console.log(data.pin);
  toast({
    title: "You submitted the following values:",
    description: (
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      </pre>
    ),
  });
}

const response = false;
return (
  <Card className="mx-auto max-w-sm">
    <CardHeader>
      <CardTitle className="text-xl">Sign Up</CardTitle>
      <CardDescription>
        Enter your information to create an account
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid gap-4">
        <div className="">
          <div className="grid gap-2">
            <Label htmlFor="first-name">Full Name</Label>
            <Input
              value={user.fullname}
              onChange={(e) => setUser({ ...user, fullname: e.target.value })}
              id="first-name" placeholder="Max" required />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            value={user.email}
            onChange={(e)=>setUser({...user,email:e.target.value})}
            id="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input 
          value={user.password}
          onChange={(e)=>setUser({...user,password:e.target.value})}
          id="password" type="password" />
        </div>
        {response && (
          <>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-4"
              >
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One-Time Password</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormDescription>
                        Please enter the one-time password sent to your Email.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </>
        )}
        {!response && (
          <>
            <Button 
            onClick={onRegister}
            type="submit" className="w-full">
              Create an account
            </Button>
          </>
        )}

        <Button variant="outline" className="w-full">
          Sign up with GitHub
        </Button>
      </div>
      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link href="#" className="underline">
          Sign in
        </Link>
      </div>
    </CardContent>
  </Card>
);
}
