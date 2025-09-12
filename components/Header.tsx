"use client";
import Link from "next/link";
import { useUsername } from "./UsernameContext";
import React, { useEffect } from "react";
import * as Ariakit from "@ariakit/react";
import styles from "./Header.module.scss";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const { username, setUsername } = useUsername();

  return (
    <header className={styles.header}>
      <div />
      <div className={styles.headerControls}>
        <span className={styles.username}>
          {username ? `Logged in as ${username}` : "Not logged in"}
        </span>
        <ThemeToggle />
        {username ? (
          <Ariakit.Button
            onClick={() => {
              setUsername("");
              document.cookie = "username=; path=/; max-age=0";
            }}
            className={styles.button}
          >
            Logout
          </Ariakit.Button>
        ) : (
          // Should redirect to login page
          <Ariakit.Button
            onClick={() => {
              window.location.href = "/login";
            }}
            className={styles.button}
          >
            Login
          </Ariakit.Button>
        )}
      </div>
    </header>
  );
}
