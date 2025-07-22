import { AktitvitaetType } from "../constants/activities";

export type Entry = {
  id: string;
  activity: AktitvitaetType;
  start: Date;
  end: Date;
  note?: string;
};
