"use client";
import React, { useMemo, useState } from "react";
import { BookingProvider, useBooking } from "@/state/BookingContext";
import { Stepper } from "@/components/Stepper/Stepper";
import { SelectDate } from "@/components/steps/SelectDate";
import { SelectTable } from "@/components/steps/SelectTable";
import { EnterDetails } from "@/components/steps/EnterDetails";
import { ReviewConfirm } from "@/components/steps/ReviewConfirm";
import { Button } from "@/components/ui/Button";

function Wizard() {
  const { state } = useBooking();
  const steps = useMemo(
    () => [
      { key: "date", label: "Select time" },
      { key: "table", label: "Choose table" },
      { key: "details", label: "Your details" },
      { key: "review", label: "Review" },
    ],
    []
  );
  const [active, setActive] = useState(0);

  function canNext(): boolean {
    if (active === 0) return !!state.date && !!state.time && state.guests > 0 && state.durationMinutes > 0;
    if (active === 1) return !!state.tableId;
    if (active === 2) return !!state.firstName && !!state.lastName && !!state.email;
    return true;
  }

  return (
    <main className="container">
      <Stepper steps={steps} active={active} />

      {active === 0 && <SelectDate />}
      {active === 1 && <SelectTable />}
      {active === 2 && <EnterDetails />}
      {active === 3 && <ReviewConfirm />}

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
        <Button variant="ghost" onClick={() => setActive((a) => Math.max(0, a - 1))} disabled={active === 0}>
          Back
        </Button>
        <Button onClick={() => setActive((a) => Math.min(3, a + 1))} disabled={!canNext() || active === 3}>
          Next
        </Button>
      </div>
    </main>
  );
}

export default function BookingPage() {
  return (
    <BookingProvider>
      <Wizard />
    </BookingProvider>
  );
}
