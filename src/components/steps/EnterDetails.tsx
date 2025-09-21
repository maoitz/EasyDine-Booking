"use client";
import React from "react";
import { useBooking } from "@/state/BookingContext";
import { Input } from "../ui/Input";
import styles from "./Steps.module.css";

export function EnterDetails() {
  const { state, dispatch } = useBooking();
  return (
    <div className="card">
      <div className={styles.stack}>
        <label>First name</label>
        <Input
          value={state.firstName}
          onChange={(e) => dispatch({ type: "setCustomer", firstName: e.target.value, lastName: state.lastName, email: state.email, phoneNumber: state.phoneNumber })}
        />
      </div>
      <div>
        <label>Last name</label>
        <Input
          value={state.lastName}
          onChange={(e) => dispatch({ type: "setCustomer", firstName: state.firstName, lastName: e.target.value, email: state.email, phoneNumber: state.phoneNumber })}
        />
      </div>
      <div>
        <label>Email</label>
        <Input
          type="email"
          value={state.email}
          onChange={(e) => dispatch({ type: "setCustomer", firstName: state.firstName, lastName: state.lastName, email: e.target.value, phoneNumber: state.phoneNumber })}
        />
      </div>
      <div>
        <label>Phone (optional)</label>
        <Input
          value={state.phoneNumber ?? ""}
          onChange={(e) => dispatch({ type: "setCustomer", firstName: state.firstName, lastName: state.lastName, email: state.email, phoneNumber: e.target.value })}
        />
      </div>
    </div>
  );
}
