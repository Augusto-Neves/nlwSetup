import { Check } from "phosphor-react";
import { FormEvent, useState } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { useMutation } from "@tanstack/react-query";
import { createHabit } from "../lib/api";
import { queryClient } from "../main";
import toast from "react-hot-toast";

const availableWeekDays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

interface NawHabitFormProps {
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function NewHabitForm({ setModalIsOpen }: NawHabitFormProps) {
  const [title, setTitle] = useState("");
  const [weekDays, setWeekDays] = useState<number[]>([]);
  const mutation = useMutation({
    mutationKey: ["createHabit"],
    mutationFn: () => createHabit(title, weekDays),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["summary"] });
      setModalIsOpen(false);
      toast.success("Hábito criado com sucesso", {
        className:
          "flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white  divide-gray-200 rounded-lg shadow top-5 right-5 dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800",
      });
    },
    onError: () =>
      toast.error("Houve um erro ao inserir seu hábito", {
        className:
          "flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white  divide-gray-200 rounded-lg shadow top-5 right-5 dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800",
      }),
  });

  function handleToggleWeekDay(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      const weekDaysWithRemovedOne = weekDays.filter((day) => day !== weekDay);
      setWeekDays(weekDaysWithRemovedOne);
    } else {
      const weekDaysWithAddedOne = [...weekDays, weekDay];
      setWeekDays(weekDaysWithAddedOne);
    }
  }

  function createNewHabit(event: FormEvent) {
    event.preventDefault();

    if (!title || weekDays.length === 0) {
      return;
    }

    mutation.mutate();
    setTitle("");
    setWeekDays([]);
  }
  return (
    <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
      <label className="font-semibold leading-tight" htmlFor="habit">
        Qual o seu comprometimento?
      </label>
      <input
        type="text"
        id="title"
        placeholder="ex.: Exercícios, dormir 8h por noite, etc..."
        autoFocus
        className="p-4 rounded-lg mt-12 bg-zinc-800 text-white placeholder:text-zinc-400"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
      />

      <label className="font-semibold leading-tight mt-4 mb-4" htmlFor="">
        Qual a recorrência?
      </label>
      <div className="flex flex-col gap-3">
        {availableWeekDays.map((day, index) => (
          <Checkbox.Root
            key={day}
            className="flex items-center gap-3 group focus:outline-none"
            checked={weekDays.includes(index)}
            onCheckedChange={() => handleToggleWeekDay(index)}
          >
            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-50 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background">
              <Checkbox.Indicator>
                <Check size={20} className="text-white" />
              </Checkbox.Indicator>
            </div>

            <span className="text-white leading-tight">{day}</span>
          </Checkbox.Root>
        ))}
      </div>
      <button
        type="submit"
        className="mt-6 rounded-lg p-4 gap-3 flex items-center justify-center font-semibold bg-green-600 hover:bg-green-500"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  );
}
