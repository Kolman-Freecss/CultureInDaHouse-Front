import { Status } from "src/app/shared/enums";

export interface Performance {
    date: Date;
    time: string; // formatear con patrón
    streamingURL: string;
    remainingSeats: number;
    status: Status;
}