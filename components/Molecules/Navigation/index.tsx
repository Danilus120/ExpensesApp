import { useState } from "react";
import Image from "next/image";
import router from "next/router";
import { MdOutlineDescription, MdDashboard } from "react-icons/md";
import { FiMenu, FiHome, FiStar, FiLogIn, FiLogOut } from "react-icons/fi";
import Button from "@/Atoms/Button";
import StyledLink from "@/Atoms/StyledLink";
import { useAuth } from "@/context/auth/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "config/firebase.config";
import styles from "./styles.module.scss";
import { FaQuestion } from "react-icons/fa";

const menuLinks = [
  { name: "Home", link: "#home", icon: <FiHome /> },
  { name: "Description", link: "#description", icon: <MdOutlineDescription /> },
  { name: "Features", link: "#features", icon: <FiStar /> },
  { name: "FAQ", link: "#faq", icon: <FaQuestion /> },
  //
];

export default function Navigation() {
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const { user } = useAuth();

  const toggleMobileNav = () => {
    setIsMobileMenuOpened((prev) => !prev);
  };

  const logout = () => {
    signOut(auth);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <>
      <nav
        className={`${styles.navigation} ${
          isMobileMenuOpened && styles.active
        }`}
      >
        <ul className={styles.list}>
          <div className={styles["imgBox"]}>
            <Image
              src="/logo.svg"
              alt="Logo Expenses app"
              width="100px"
              height="50px"
            />
          </div>
          {menuLinks.map((item) => (
            <li
              key={item.name}
              onClick={toggleMobileNav}
              className={styles["hide-at-mobile-tablet"]}
            >
              <StyledLink href={item.link} variant="ghost">
                {item.icon}
                <p className={styles["list__item"]}>{item.name}</p>
              </StyledLink>
            </li>
          ))}
          {user ? (
            <>
              <li>
                <StyledLink href="/dashboard" variant="ghost">
                  <MdDashboard />
                  <p>Dashboard</p>
                </StyledLink>
              </li>
              <li>
                <Button variant="ghost" callbackFn={handleLogout}>
                  <FiLogOut />
                  <p>Logout</p>
                </Button>
              </li>
            </>
          ) : (
            <li>
              <StyledLink variant="ghost" href="/login">
                <FiLogIn />
                <p>Log in</p>
              </StyledLink>
            </li>
          )}
        </ul>
        <div
          className={styles["navigation__background"]}
          onClick={toggleMobileNav}
        ></div>
      </nav>
      <div className={styles["main-nav"]}>
        <div className={styles["imgBox"]}>
          <Image
            src="/logo.svg"
            alt="Logo Expenses app"
            width="100px"
            height="50px"
          />
        </div>
        <Button
          variant="ghost"
          callbackFn={toggleMobileNav}
          margin="left"
          iconOnly
        >
          <FiMenu />
        </Button>
      </div>
    </>
  );
}
