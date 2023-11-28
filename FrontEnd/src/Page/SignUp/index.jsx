import className from "classnames/bind";
import { Link } from "react-router-dom";

import classes from "./SignUp.module.css";

import images from "../../assets";

import Button from "../../components/Button";

import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

import { useState, useEffect, React } from "react";
import { useDispatch, useSelector } from "react-redux";

import { register } from "../../actions/userActions";

const cx = className.bind(classes);

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userProfile, setUserProfile] = useState({
    gender: 1,
    birthday: "2022-01-01",
    phone: "",
    address: "",
    account_no: "",
  });

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const [check, setCheck] = useState(0);
  const redirect = searchParams.get("redirect")
    ? searchParams.get("redirect").split("=")[1]
    : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  useEffect(() => {
    if (check > 0) {
      navigate("/signin");
    }
  }, [navigate, userInfo, redirect, check]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
    } else {
      dispatch(register(name, email, password, userProfile));
      setCheck((prev) => prev + 1);
    }
  };

  return (
    <div>
      <div className={cx("container-signup")}>
        <header>
          <Link to="/">
            <img src={images.logo} alt="" className={cx("logo")} />
          </Link>
        </header>
        <div className={cx("container")}>
          <div className={cx("logo-center")}>
            <img
              src={images.logo_signup}
              alt=""
              className={cx("logo-center-img")}
            />
          </div>

          <div className={cx("line-gradien")}></div>

          <div className={cx("container-form")}>
            <h1 className={cx("signin")}>Đăng ký</h1>
            <form action="" className={cx("form")}>
              <div className={cx("form-group")}>
                <label htmlFor="name">UserName</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  placeholder="Nhập họ tên"
                />
              </div>
              <div className={cx("form-group")}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Nhập email"
                />
              </div>
              <div className={cx("form-group")}>
                <label htmlFor="password">Mật khẩu</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="Nhập mật khẩu"
                />
              </div>
              <div className={cx("form-group")}>
                <label htmlFor="password">Xác nhận mật khẩu</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  placeholder="Xác nhận mật khẩu"
                />
              </div>
              <Button primary onClick={submitHandler}>
                Đăng ký
              </Button>
            </form>
            <Link className={cx("forgot-password")} to="/forgot-password">
              Quên mật khẩu?
            </Link>
            <Button outline className={cx("btn-login")} primary to="/signin">
              Đăng nhập
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
