import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loging } from "../features/auth/authSlice";
import { useAppDispatch } from "../hooks";
import Button from "../components/Button";
import Input from "../components/Input";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email) {
      // Generate Id
      let id = Date.now();
      dispatch(loging({ email, id }));
      localStorage.setItem("user", JSON.stringify({ id, email }));
      navigate("/");
    }
  };
  return (
    <div className="min-w-[300px] p-6 bg-white border border-gray-200 rounded-lg shadow flex flex-col items-center justify-center">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-[#f33f40]">
        Login
      </h5>
      <div className="mt-2 w-full">
        <Input value={email} onChange={setEmail} placeholder="Email" name="email" />
        <Button value="Login" onClick={handleLogin} className="mt-2" />
      </div>
    </div>
  );
}
