"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SuccessPage() {
  const q = useSearchParams();
  const date = q.get("date");
  const time = q.get("time");
  const table = q.get("table");

  return (
    <main className="container">
      <div className="card">
        <h1>Booking confirmed 🎉</h1>
        <p>See you at EasyDine!</p>
        <ul>
          <li><strong>Date:</strong> {date}</li>
          <li><strong>Time:</strong> {time}</li>
          <li><strong>Table:</strong> {table ? `Table ${table}` : "—"}</li>
        </ul>
        <p style={{ marginTop: 16 }}>
          <Link className="btn" href="/booking">Make another booking</Link>
        </p>
      </div>
    </main>
  );
}
