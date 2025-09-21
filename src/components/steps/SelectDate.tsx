"use client";
import React, { useMemo } from "react";
import { useBooking } from "@/state/BookingContext";
import { uiConfig } from "@/api/client";
import { Select } from "../ui/Select";
import { Input } from "../ui/Input";
import styles from "./Steps.module.css";

function generateTimeSlots(opening: string, closing: string, slotMinutes: number): string[] {
  const [oh, om] = opening.split(":").map(Number);
  const [ch, cm] = closing.split(":").map(Number);
  const open = new Date(0, 0, 0, oh, om, 0);
  const close = new Date(0, 0, 0, ch, cm, 0);
  const slots: string[] = [];
  const t = new Date(open);
  while (t <= close) {
    const h = String(t.getHours()).padStart(2, "0");
    const m = String(t.getMinutes()).padStart(2, "0");
    slots.push(`${h}:${m}`);
    t.setMinutes(t.getMinutes() + slotMinutes);
  }
  return slots;
}

export function SelectDate() {
  const { state, dispatch } = useBooking();
  const times = useMemo(
    () => generateTimeSlots(uiConfig.opening, uiConfig.closing, uiConfig.slotMinutes),
    []
  );

  return (
    <div className="card">
      <div className={styles.stack}>
        <label>Date</label>
        <Input
          type="date"
          value={state.date}
          onChange={(e) => dispatch({ type: "setDate", date: e.target.value })}
        />
      </div>
      <div>
        <label>Time</label>
        <Select
          value={state.time}
          onChange={(e) => dispatch({ type: "setTime", time: e.target.value })}
        >
          <option value="">Select time</option>
          {times.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <label>Guests</label>
        <Input
          type="number"
          min={1}
          value={state.guests}
          onChange={(e) => dispatch({ type: "setGuests", guests: Number(e.target.value) })}
        />
      </div>
      <div>
        <label>Duration (minutes)</label>
        <Input
          type="number"
          min={30}
          max={240}
          step={15}
          value={state.durationMinutes}
          onChange={(e) =>
            dispatch({ type: "setDuration", durationMinutes: Number(e.target.value) })
          }
        />
      </div>
    </div>
  );
}
