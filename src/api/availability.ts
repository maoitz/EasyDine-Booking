import { http, toIsoLocal } from "./client";
import type { TableAvailabilityDto } from "@/state/types";

export async function getAvailableTables(params: {
  date: string;      // "YYYY-MM-DD"
  time: string;      // "HH:mm"
  durationMinutes: number;
  guests: number;
}): Promise<TableAvailabilityDto[]> {
  const start = toIsoLocal(new Date(`${params.date}T${params.time}:00`)); // local ISO
  const qs = new URLSearchParams({
    start,
    durationMinutes: String(params.durationMinutes),
    guests: String(params.guests),
  }).toString();

  return http.get<TableAvailabilityDto[]>(`availability/available?${qs}`);
}
