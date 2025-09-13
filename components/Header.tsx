"use client";
import Link from "next/link";
import React from "react";
import { useSession, signOut } from 'next-auth/react';
import * as Ariakit from "@ariakit/react";
import styles from "./Header.module.scss";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const session = useSession();
  const player = (session.data as any)?.player as string | undefined;

  return (
    <header className={styles.header}>
      <div />
      <div className={styles.headerControls}>
        <span className={styles.username}>
          {player ? `Logged in as ${player}` : "Not logged in"}
        </span>
        <ThemeToggle />
        {player ? (
          <Ariakit.Button
            onClick={() => {
              signOut({ callbackUrl: '/login' });
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
