import Image from "next/image";
import Login from "./components/Login/Login";
import LoginPage from "./components/Login/Login";
import Homepage from "./components/Homepage/Homepage";

export default function Home() {
  return (
    <div className="w-full h-full flex justify-center">
      <Homepage />
    </div>
  );
}
