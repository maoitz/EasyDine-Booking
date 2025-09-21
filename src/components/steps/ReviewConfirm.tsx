"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useBooking } from "@/state/BookingContext";
import { Alert } from "../ui/Alert";
import { Button } from "../ui/Button";
import { createBookingWithCustomer } from "@/api/bookings";
import styles from "./Steps.module.css";

export function ReviewConfirm() {
  const { state, dispatch } = useBooking();
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState<string | null>(null);
  const router = useRouter();

  const canSubmit =
    !!state.date && !!state.time && !!state.tableId &&
    !!state.firstName && !!state.lastName && !!state.email &&
    state.guests > 0 && state.durationMinutes > 0;

  async function submit() {
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    try {
      const res = await createBookingWithCustomer({
        date: state.date,
        time: state.time,
        durationMinutes: state.durationMinutes,
        totalGuests: state.guests,
        tableId: state.tableId!,
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        phoneNumber: state.phoneNumber ?? undefined,
      });

      const tableNum = res?.tableNumber ?? state.tableNumber ?? "";
      const params = new URLSearchParams({
        date: state.date,
        time: state.time,
        table: String(tableNum),
      }).toString();

      dispatch({ type: "reset" });
      router.push(`/booking/success?${params}`);
    } catch (e: any) {
      const msg = String(e?.message ?? "Failed to create booking.");
      if (/overlap|buffer|conflict/i.test(msg)) {
        setError("Selected time is no longer available. Please pick another slot.");
      } else if (/open|closing|hours/i.test(msg)) {
        setError("Selected time is outside opening hours. Please choose a different time.");
      } else if (/capacity/i.test(msg)) {
        setError("Too many guests for the selected table. Reduce guests or choose a larger table.");
      } else {
        setError(msg);
      }
      console.error("Create booking error:", e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <div className={styles.stack}>
        <div>
          <strong>Review your booking</strong>
        </div>

        <div className={styles.reviewGrid}>
          <div>
            <div className={styles.label}>Date</div>
            <div className={styles.value}>{state.date || "—"}</div>
          </div>
          <div>
            <div className={styles.label}>Time</div>
            <div className={styles.value}>{state.time || "—"}</div>
          </div>
          <div>
            <div className={styles.label}>Guests</div>
            <div className={styles.value}>{state.guests}</div>
          </div>
          <div>
            <div className={styles.label}>Duration</div>
            <div className={styles.value}>{state.durationMinutes} min</div>
          </div>
          <div>
            <div className={styles.label}>Table</div>
            <div className={styles.value}>{state.tableNumber ? `Table ${state.tableNumber}` : "—"}</div>
          </div>
        </div>

        <div className={styles.reviewCard}>
          <div className={styles.labelStrong}>Contact details</div>
          <div className={styles.kvRow}><span>First name</span><span>{state.firstName || "—"}</span></div>
          <div className={styles.kvRow}><span>Last name</span><span>{state.lastName || "—"}</span></div>
          <div className={styles.kvRow}><span>Email</span><span>{state.email || "—"}</span></div>
          <div className={styles.kvRow}><span>Phone</span><span>{state.phoneNumber || "—"}</span></div>
        </div>

        {error && <Alert>{error}</Alert>}

        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <Button type="button" onClick={submit} disabled={!canSubmit || loading}>
            {loading ? "Booking..." : "Confirm booking"}
          </Button>
        </div>
      </div>
    </div>
  );
}
