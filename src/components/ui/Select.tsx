"use client";
import React from "react";
import styles from "./Select.module.css";
export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={styles.select} />;
}
