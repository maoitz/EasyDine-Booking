"use client";
import React, { useEffect, useState } from "react";
import { getAvailableTables } from "@/api/availability";
import { useBooking } from "@/state/BookingContext";
import type { TableAvailabilityDto } from "@/state/types";
import { Spinner } from "../ui/Spinner";
import { Alert } from "../ui/Alert";
import { Button } from "../ui/Button";
import styles from "./Steps.module.css";

export function SelectTable() {
  const { state, dispatch } = useBooking();
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState<string | null>(null);
  const [tables, setTables] = useState<TableAvailabilityDto[]>([]);

  useEffect(() => {
    async function load() {
      if (!state.date || !state.time || !state.guests || !state.durationMinutes) return;
      setLoading(true);
      setError(null);
      try {
        const res = await getAvailableTables({
          date: state.date,
          time: state.time,
          durationMinutes: state.durationMinutes,
          guests: state.guests,
        });
        setTables(res);
      } catch (e: any) {
        setError(e?.message ?? "Failed to load availability.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [state.date, state.time, state.guests, state.durationMinutes]);

  if (!state.date || !state.time) {
    return <Alert>Please select date and time first.</Alert>;
  }

  return (
    <div className="card">
      {loading && <Spinner />}
      {error && <Alert>{error}</Alert>}

      {!loading && !error && tables.length === 0 && (
        <Alert>No tables available. Try another time or reduce duration/guests.</Alert>
      )}

      <ul className={styles.listCards}>
        {tables.map((t) => {
          const selected = state.tableId === t.id;
          return (
            <li key={t.id} className={`${styles.listItem} ${selected ? styles.listItemActive : ""}`}>
              <div className={styles.listItemMain}>
                <div className={styles.listTitle}>
                  <span className={styles.tableLabel}>Table {t.number}</span>
                  <span className={styles.seats}>{t.seats} seats</span>
                </div>
                <div className={styles.listMeta}>
                  {selected ? <span className={styles.badge}>Selected</span> : <span className={styles.badgeGhost}>Available</span>}
                </div>
              </div>

              <div className={styles.listActions}>
                {selected ? (
                  <Button type="button" variant="ghost" onClick={() => dispatch({ type: "setTable", tableId: 0 as any, tableNumber: 0 as any })}>
                    Unselect
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={() => dispatch({ type: "setTable", tableId: t.id, tableNumber: t.number })}
                  >
                    Select
                  </Button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
