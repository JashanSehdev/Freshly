"use client";
import { Avatar, Box, Button, Typography } from "@mui/material";
import styles from "./navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import logo from "@/../public/logo.png";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import AccountMenu from "./account-menu/account-menu";

const avatar =
  "https://imgs.search.brave.com/ohAuTp3hK89mgurwQr18x7s-vbzmC8bs0Cu6ZuQZSlQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjcv/OTUxLzEzNy9zbWFs/bC9zdHlsaXNoLXNw/ZWN0YWNsZXMtZ3V5/LTNkLWF2YXRhci1j/aGFyYWN0ZXItaWxs/dXN0cmF0aW9ucy1w/bmcucG5n";
export default function Navbar() {
  const pathname = usePathname();

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);
  return (
    <Box className={styles.container}>
      <Box className={styles.sub_container}>
        <Box className={styles.section1}>
          <Link href={"/"}>
            <Image src={logo} alt="logo" className={styles.image} />
          </Link>

          {["Recipes", "Categories", "Favourites"].map((item) => (
            <Link href={"#"} key={item} className={styles.link}>
              <Typography variant="body1">{item}</Typography>
            </Link>
          ))}
          <Link href={"/my-collection"} className={styles.link}>
              <Typography variant="body1">My collection</Typography>
            </Link>
        </Box>
            {
              pathname==='login' || pathname ==='signup' ? <Box> </Box> : (
                <Box className={styles.section2}>
          {pathname !== "/add-recipe" ? (
            <Link href={"/add-recipe"}>
              <Button variant="contained">+ Add Recipe</Button>
            </Link>
          ) : (
            <Link href={"/"}>
              <Button variant="contained">Home</Button>
            </Link>
          )}

         <AccountMenu/>
        </Box>
              )
            }
        
      </Box>
    </Box>
  );
}
