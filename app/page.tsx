import Image from "next/image";
import Login from "./Login/page";
import LoginPage from "./Login/page";
import Homepage from "./Homepage/page";

export default function Home() {
  return (
    <div className="w-full h-full flex justify-center">
      <LoginPage />
    </div>
  );
}
