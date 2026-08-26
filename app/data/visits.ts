export type VisitStatus = "upcoming" | "completed";

export interface Visit {
  id: number;
  date: string;
  month: string;
  day: string;
  time: string;
  location: string;
  ward: string;
  title: string;
  description: string;
  status: VisitStatus;
}

export const visits: Visit[] = [
  {
    id: 1,
    date: "26",
    month: "AUG",
    day: "Wednesday",
    time: "10:00 AM",
    location: "Masii Ward",
    ward: "Masii",
    title: "Water Project Launch",
    description:
      "A constituency development engagement focused on the launch of a new water project serving residents of Masii Ward.",
    status: "upcoming",
  },
];