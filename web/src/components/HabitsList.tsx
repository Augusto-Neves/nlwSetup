import * as Checkbox from "@radix-ui/react-checkbox";
import { useMutation, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Check, CircleNotch } from "phosphor-react";
import { getHabitDay, toggleHabit } from "../lib/api";
import { queryClient } from "../main";

interface HabitLisProps {
  date: Date;
  onCompletedChanged: (completed: number) => void;
}

interface PossibleHabit {
  id: string;
  title: string;
  created_at: string;
}

interface HabitsInfo {
  possibleHabits: PossibleHabit[];
  completedHabits: string[];
}

export function HabitsList({ date, onCompletedChanged }: HabitLisProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["habitDay"],
    queryFn: () => getHabitDay(date),
    onSuccess: (habitDays) =>
      onCompletedChanged(habitDays?.completedHabits?.length),
  });
  const habitsInfo = data as HabitsInfo;

  const mutation = useMutation({
    mutationKey: ["toggleHabit"],
    mutationFn: (habitId: string) => toggleHabit(habitId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habitDay"] });
    },
  });
  const isDateInPast = dayjs(date).endOf("day").isBefore(new Date());

  if (isLoading) {
    return (
      <div className="mt-6 h-20 w-full flex items-center justify-center">
        <CircleNotch size={40} className="animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-6 h-20 w-full flex items-center justify-center">
        <span className="font-bold text-xl">Houve algo de Errado</span>
      </div>
    );
  }

  return (
    <div className="mt-6 flex flex-col gap-3">
      {habitsInfo?.possibleHabits.map((habit) => {
        return (
          <Checkbox.Root
            key={habit.id}
            onCheckedChange={() => mutation.mutate(habit.id)}
            checked={habitsInfo.completedHabits?.includes(habit.id)}
            disabled={isDateInPast}
            className="flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed"
          >
            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-50 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background">
              <Checkbox.Indicator>
                <Check size={20} className="text-white" />
              </Checkbox.Indicator>
            </div>

            <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
              {habit.title}
            </span>
          </Checkbox.Root>
        );
      })}
    </div>
  );
}
