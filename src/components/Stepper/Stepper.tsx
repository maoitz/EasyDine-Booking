"use client";
import React from "react";
import s from "./Stepper.module.css";

type Step = { key: string; label: string };
export function Stepper({ steps, active }: { steps: Step[]; active: number }) {
  return (
    <ol className={s.wrap} aria-label="Progress">
      {steps.map((st, i) => {
        const cls = [s.step, i === active ? s.active : i < active ? s.done : ""].join(" ");
        return (
          <li key={st.key} aria-current={i === active ? "step" : undefined} className={cls}>
            <span className={s.num}>{i + 1}.</span> {st.label}
          </li>
        );
      })}
    </ol>
  );
}
