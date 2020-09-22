import { City } from "./city";

export interface Reminder {
  description: string;
  city: City;
  date: Date;
  time: string;
  color: string;
  weather?: string;
}
