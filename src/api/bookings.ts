import { http, toIsoLocal } from "./client";
import type { BookingCreateWithCustomer, BookingResponseDto } from "@/state/types";

export async function createBookingWithCustomer(input: BookingCreateWithCustomer): Promise<BookingResponseDto> {
  const dateBooked = toIsoLocal(new Date(`${input.date}T${input.time}:00`));

  // API expects flat payload (no "customer"/"booking" nesting)
  const payload = {
    firstName: input.firstName,
    lastName: input.lastName,
    email: input.email,
    phoneNumber: input.phoneNumber ?? null,
    tableId: input.tableId,
    dateBooked,
    durationMinutes: input.durationMinutes,
    totalGuests: input.totalGuests,
  };

  return http.post<BookingResponseDto>("bookings/with-customer", payload);
}
