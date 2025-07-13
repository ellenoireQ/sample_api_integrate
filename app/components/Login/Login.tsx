"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [stateSignUp, setStateSignUp] = useState(false);

  // Handle State Sign Up
  const handleStateSignUp = () => {
    return setStateSignUp(!stateSignUp);
  };

  useEffect(() => {
    console.log(stateSignUp);
  }, [stateSignUp]);

  return (
    <div className="w-full max-w-7xl justify-center items-center flex flex-col h-screen">
      {/** Header */}
      <div className="absolute top-0 w-full flex justify-between p-5">
        <h1 className="text-2xl font-thin">Ecommerce</h1>
        <div className="flex gap-2">
          <Button variant={"default"}>Login</Button>
          <Button variant={"outline"}>SIgn in</Button>
        </div>
      </div>
      {stateSignUp ? (
        // Sign Up state when True
        <Card className={`w-full max-w-sm `}>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>Please fill the needed forms</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="text"
                    type="text"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="e.g JohnDoe@gmail.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    required
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <AlertDialog>
              <AlertDialogTrigger className="w-full bg-black p-2 rounded-md text-white">
                Sign Up
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Account has been Created!</AlertDialogTitle>
                  <AlertDialogDescription>
                    You can Back to Login Page
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleStateSignUp()}>
                    Back
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
              <Button
                variant={"outline"}
                className="w-full"
                onClick={() => handleStateSignUp()}
              >
                Back
              </Button>
            </AlertDialog>
          </CardFooter>
        </Card>
      ) : (
        <Card className={`w-full max-w-sm `}>
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
            <CardAction>
              <Button variant="link" onClick={() => handleStateSignUp()}>
                Sign Up
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input id="password" type="password" required />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Report an issue
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
