"use client";
import React, { createContext, useContext, useReducer } from "react";
import type { BookingState } from "./types";

const initialState: BookingState = {
  date: "",
  time: "",
  guests: 2,
  durationMinutes: 120,
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
};

type Action =
  | { type: "setDate"; date: string }
  | { type: "setTime"; time: string }
  | { type: "setGuests"; guests: number }
  | { type: "setDuration"; durationMinutes: number }
  | { type: "setTable"; tableId: number; tableNumber: number }
  | { type: "setCustomer"; firstName: string; lastName: string; email: string; phoneNumber?: string }
  | { type: "reset" };

function reducer(state: BookingState, action: Action): BookingState {
  switch (action.type) {
    case "setDate": return { ...state, date: action.date };
    case "setTime": return { ...state, time: action.time };
    case "setGuests": return { ...state, guests: action.guests };
    case "setDuration": return { ...state, durationMinutes: action.durationMinutes };
    case "setTable": return { ...state, tableId: action.tableId, tableNumber: action.tableNumber };
    case "setCustomer":
      return { ...state, firstName: action.firstName, lastName: action.lastName, email: action.email, phoneNumber: action.phoneNumber };
    case "reset": return initialState;
    default: return state;
  }
}

const BookingContext = createContext<{ state: BookingState; dispatch: React.Dispatch<Action> } | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <BookingContext.Provider value={{ state, dispatch }}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}
