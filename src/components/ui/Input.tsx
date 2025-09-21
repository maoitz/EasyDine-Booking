"use client";
import React from "react";
import styles from "./Input.module.css";
export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={styles.input} />;
}
