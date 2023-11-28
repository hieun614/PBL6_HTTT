import className from "classnames/bind";
import { Link } from "react-router-dom";

import classes from "./SignIn.module.css";

import images from "../../assets";

import Button from "../../components/Button";

import { useState, useEffect, React } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const cx = className.bind(classes);
function SignIn() {
  //   function handleSubmit(e) {
  //     e.preventDefault();

  //     const user = {
  //       username: "user02",
  //       password: "user02",
  //     };

  //     const requestOptions = {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(user),
  //     };

  //     fetch("http://127.0.0.1:8000/auth/login/", requestOptions)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log(data);
  //         if (data.message === "login is success!") {
  //           console.log("login is success!");
  //         } else {
  //           console.log("login fail!");
  //         }
  //       });
  //   }
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();

  const redirect = searchParams.get("redirect")
    ? searchParams.get("redirect").split("=")[1]
    : "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("In");
    console.log(name, password);
    dispatch(login(name, password));
    // await fetch("http://127.0.0.1:8000/auth/login/", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     username: "spyrke0",
    //     password: "PBL6TechE",
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     console.log(res);
    //   });
  };

  return (
    <div>
      <header>
        <Link to="/">
          <img src={images.logo} alt="" className={cx("logo")} />
        </Link>
      </header>
      <form>
        <div className={cx("container")}>
          <div className={cx("logo-center")}>
            <img src={images.logo} alt="" className={cx("logo-center-img")} />
          </div>
          <h1 className={cx("signin")}>Đăng nhập</h1>

          <div className={cx("form-group")}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className={cx("form-group")}>
            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <Button type="submit" primary onClick={submitHandler}>
            Đăng nhập
          </Button>

          <Link className={cx("forgot-password")} to="/forgot-password">
            Quên mật khẩu?
          </Link>
          <Button outline primary to="/signup">
            Đăng ký
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
