"use client";
import React from "react";
import styles from "./Button.module.css";

export function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" }
) {
  const { variant = "primary", className, ...rest } = props;
  const cls = [styles.btn, styles[variant], className].filter(Boolean).join(" ");
  return <button {...rest} className={cls} />;
}