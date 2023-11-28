import React from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import { PhoneIcon } from "../Icons";
import classes from "./Menu.module.css";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(classes);

const MENU_ITEMS = [
  {
    id: 1,
    name: "Điện thoại",
    icon: <PhoneIcon />,
  },
  {
    id: 2,
    name: "Laptop",
    icon: <PhoneIcon />,
  },
  {
    id: 3,
    name: "Máy tính bảng",
    icon: <PhoneIcon />,
  },
  {
    id: 4,
    name: "Đồng hồ",
    icon: <PhoneIcon />,
  },
  {
    id: 5,
    name: "Loa, âm thanh",
    icon: <PhoneIcon />,
  },
  {
    id: 6,
    name: "Tivi",
    icon: <PhoneIcon />,
  },
  {
    id: 7,
    name: "Khác",
    icon: <PhoneIcon />,
  },
];

function Menu() {
  const navigate = useNavigate();

  const redirectMobile = () => navigate("/listProduct");
  return (
    <div className={cx("wrapper")}>
      <ul className={cx("menu-list")}>
        {MENU_ITEMS.map((item) => (
          <li key={item.id} className={cx("menu-item")}>
            <span className={cx("menu-icon")} onClick={redirectMobile}>
              {item.icon}
            </span>
            <span> {item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;
