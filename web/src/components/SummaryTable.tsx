import dayjs from "dayjs";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { CircleNotch } from "phosphor-react";
import { getSummary } from "../lib/api";
import { generateDateFromYearBeginning } from "../utils/generateDateFromYearBeginning";
import { HabitDay } from "./HabitDay";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
const summaryDates = generateDateFromYearBeginning();

const minimumSummaryDateSize = 18 * 7; //18 weeks
const amountOfDaysToFill = minimumSummaryDateSize - summaryDates.length;

type Summary = {
  id: string;
  date: string;
  amount: number;
  completed: number;
};

export function SummaryTable() {
  const { data, isLoading } = useQuery({
    queryKey: ["summary"],
    queryFn: getSummary,
    retry: 6,
    onError: () =>
      toast.error("Houve um erro ao carregar seus hábitos", {
        className:
          "flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white  divide-gray-200 rounded-lg shadow top-5 right-5 dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800",
      }),
  });

  const summary = data as Summary[];

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center ">
        <div className="grid grid-rows-7 grid-flow-row gap-3">
          <CircleNotch size={80} className="animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((weekDay, index) => {
          return (
            <div
              key={`${weekDay}-${index}`}
              className="text-zinc-400 text-xl font-bold h-10 w-10 flex items-center justify-center"
            >
              {weekDay}
            </div>
          );
        })}
      </div>
      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summary?.length > 0 &&
          summaryDates.map((date) => {
            const dayInSummary = summary.find((day) => {
              return dayjs(date).isSame(day.date, "day");
            });

            return (
              <HabitDay
                key={date.toString()}
                amount={dayInSummary?.amount}
                completed={dayInSummary?.completed}
                date={date}
              />
            );
          })}

        {amountOfDaysToFill > 0 &&
          Array.from({ length: amountOfDaysToFill }).map((_, index) => {
            return (
              <div
                key={index}
                className="w-10 h-10 bg-zinc-900 border-zinc-800  border-2 rounded-lg opacity-40 cursor-not-allowed"
              />
            );
          })}
      </div>
    </div>
  );
}
