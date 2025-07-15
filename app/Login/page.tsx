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
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../components/backend/database/firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [stateSignUp, setStateSignUp] = useState(false);
  const [signUpState, setSignUpState] = useState(false);
  //
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorNotification, setErrorNotification] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [disableButton, setDisableButton] = useState(false);

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    // Validasi email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setErrorEmail("Email is invalid");
    } else {
      setErrorEmail("");
    }
  };

  const [errorPassword, setErrorPassword] = useState("");

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    if (value.length < 6) {
      setErrorPassword("Password must 6 numbers");
    } else {
      setErrorPassword("");
    }
  };

  // Handle State Sign Up
  const handleStateSignUp = () => {
    return setStateSignUp(!stateSignUp);
  };

  useEffect(() => {
    console.log(stateSignUp);
  }, [stateSignUp]);

  useEffect(() => {
    if (errorEmail && errorPassword) {
      setDisableButton(true);
      return setErrorNotification(
        "Invalid character or invalid email & password"
      );
    } else if (!errorEmail && errorPassword) {
      setDisableButton(true);
      return setErrorNotification(
        "Invalid character or invalid email & password"
      );
    } else if (errorEmail && !errorPassword) {
      setDisableButton(true);
      return setErrorNotification(
        "Invalid character or invalid email & password"
      );
    } else {
      setDisableButton(false);
    }
  }, [errorEmail, errorPassword, disableButton]);

  const handleSignUp = async () => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await userCredentials;
      setSignUpState(true);
      const user = userCredentials.user;

      await updateProfile(user, {
        displayName: name,
      });
      console.log(userCredentials);
    } catch (e) {
      console.log(e);
      setSignUpState(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const sign = await signInWithEmailAndPassword(auth, email, password);
      console.log(sign);
      router.push("/Homepage");
    } catch (e) {
      console.log(email);
      console.log(e);
    }
  };
  return (
    <div className="w-full max-w-7xl justify-center items-center flex flex-col h-screen">
      {/** Header */}
      <div className="absolute top-0 w-full flex justify-between p-5">
        <h1 className="text-2xl font-thin">App</h1>
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
            {errorEmail && errorPassword && (
              <p className="text-red-500 text-[11px]">{errorNotification}</p>
            )}
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
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="e.g JohnDoe@gmail.com"
                    onChange={(e) => handleChangeEmail(e)}
                    required
                  />
                  {errorEmail && (
                    <p className="text-red-500 text-[11px]">{errorEmail}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => handleChangePassword(e)}
                    required
                  />
                  {errorPassword && (
                    <p className="text-red-500 text-[11px]">{errorPassword}</p>
                  )}
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  disabled={disableButton}
                  variant={"default"}
                  onClick={() => handleSignUp()}
                  className="w-full"
                >
                  Sign Up
                </Button>
              </AlertDialogTrigger>
              {signUpState ? (
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Account has been Created!
                    </AlertDialogTitle>
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
              ) : (
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Failed to Create user Account!
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Back to login page or Report an issue
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleStateSignUp()}>
                      Back
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              )}
            </AlertDialog>

            <Button
              variant={"outline"}
              className="w-full"
              onClick={() => handleStateSignUp()}
            >
              Back
            </Button>
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
                    onChange={(e) => setEmail(e.target.value)}
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
                  <Input
                    id="password"
                    type="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button
              type="submit"
              className="w-full"
              onClick={(e) => handleSignIn(e)}
            >
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
