import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { showHero, signInFailure, signInStart, signUpSuccess } from "@/redux/slices/userSlice";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

type loginData = {
  username: string;
  email: string;
  password: string;
};

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { error, loading,baseUrl } = useAppSelector((state) => state.User)
  const [user, setUser] = useState<loginData>({
    username: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    dispatch(showHero())
  }, [])
  async function SignupHandle(e: any) {
    dispatch(signInStart());
    e.preventDefault();
    try {
      const res = await fetch(`${baseUrl}/api/auth/signup`, {
        method: "POST",
        credentials:"include",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();
      if (res.ok) {
        dispatch(signUpSuccess())
        toast.success(data.message)
        navigate("/login");
      }
      if (!res.ok) {
        dispatch(signInFailure(data.message));
        toast.error(data.message)
      }

    } catch (error: any) {
      dispatch(signInFailure(error.message));
      toast.error(error.message)
    }
  }

  return (
    <div className=" max-w-[430px] flex flex-col bg-white shadow-2xl rounded-md  py-8 px-4 md:py-12 md:px-6 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <h1 className=" text-3xl font-semibold border-b-4 border-orange-500 w-fit">
        Sign up
      </h1>
      <form className=" mt-6 flex flex-col gap-3" onSubmit={SignupHandle}>
        <input
          type="text"
          value={user?.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Enter your username here"
          className=" text-xloutline-none min-w-80 border-2 border-gray-600 rounded-sm p-3 outline-none"
        />
        <input
          type="email"
          value={user?.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter your email here"
          className=" text-xloutline-none min-w-80 border-2 border-gray-600 rounded-sm p-3 outline-none"
        />
        <input
          type="password"
          value={user?.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter your password here"
          className=" outline-none min-w-80 md:min-w-96 border-2 border-gray-500 rounded-sm p-3"
        />
        <button disabled={loading} className=" disabled:opacity-85 w-full bg-orange-500 text-white text-xl font-semibold py-3 ">
          {loading ? "Loading..." : " Sign up"}
        </button>
      </form>
      <div className=" mt-3">
        <h3>
          have an account{" "}
          <Link to={"/login"} className=" font-semibold text-blue-800">
            Log in
          </Link>
        </h3>
      </div>
      {error && <p className=" text-sm text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default Signup;
