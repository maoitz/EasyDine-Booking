// Availability DTOs (mirror API)
export type TableAvailabilityDto = {
    id: number;
    number: number;
    seats: number;
  };
  
  // Booking response (mirror API)
  export type BookingResponseDto = {
    id: number;
    tableId: number;
    tableNumber: number;
    dateBooked: string;      // ISO
    durationMinutes: number;
    totalGuests: number;
    status: string;
    customerFirstName: string;
    customerLastName?: string | null;
    customerEmail: string;
    customerPhoneNumber?: string | null;
  };
  
  // SPA booking state
  export type BookingState = {
    date: string;   // "YYYY-MM-DD"
    time: string;   // "HH:mm"
    guests: number;
    durationMinutes: number;
    tableId?: number;
    tableNumber?: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
  };
  
  export type BookingCreateWithCustomer = {
    date: string;
    time: string;
    durationMinutes: number;
    totalGuests: number;
    tableId: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
  };
  