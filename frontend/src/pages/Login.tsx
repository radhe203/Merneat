import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import {
  showHero,
  signInFailure,
  signInStart,
  signInSuccess,
} from "@/redux/slices/userSlice";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
type loginData = {
  email: string;
  password: string;
};

const Login = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { error, loading, baseUrl } = useAppSelector((state) => state.User);

  useEffect(() => {
    dispatch(showHero());
  }, []);

  const navigate = useNavigate();
  const [user, setUser] = useState<loginData>({
    email: "",
    password: "",
  });
  async function LoginHandle(e: any) {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch(`${baseUrl}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(signInFailure(data.message));
        toast.error(data.message);
      }

      if (res.ok) {
        dispatch(signInSuccess(data.user));
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success(data.message);

        const redirectUrl = location.state?.url || "/";

        //using settimeout to assign a task in event loop
        //before react updates the state . if switch the url then it conflicts with react
        //to avoid conflict , assignt redirect as a task in event loop

        setTimeout(() => {
          navigate(redirectUrl, { replace: true });
        }, 0);
      }
    } catch (error: any) {
      dispatch(signInFailure(error.message));
      toast.error(error.message);
    }
  }

  return (
    <div className=" max-w-[430px] flex flex-col bg-white shadow-2xl rounded-md  py-8 px-4 md:py-12 md:px-6 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <h1 className=" text-3xl font-semibold border-b-4 border-orange-500 w-fit">
        Login
      </h1>
      <form className=" mt-6 flex flex-col gap-3" onSubmit={LoginHandle}>
        <input
          type="email"
          value={user?.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter your email here"
          className=" text-xl outline-none min-w-80 border-2 border-gray-600 rounded-sm p-3"
        />
        <input
          type="password"
          value={user?.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter your password here"
          className=" outline-none min-w-80 md:min-w-96 border-2 border-gray-500 rounded-sm p-3"
        />
        <button
          disabled={loading}
          className=" disabled:opacity-85 w-full bg-orange-500 text-white text-xl font-semibold py-3 "
        >
          {loading ? "Loading..." : "Log in"}
        </button>
      </form>
      <div className=" mt-3">
        <h3>
          Dont't have an account{" "}
          <Link to={"/signup"} className=" font-semibold text-blue-800">
            Sign up
          </Link>
        </h3>
      </div>
      {error && <p className=" text-sm text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default Login;
