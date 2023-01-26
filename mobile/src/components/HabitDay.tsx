import clsx from "clsx";
import dayjs from "dayjs";
import {
  TouchableOpacity,
  Dimensions,
  TouchableOpacityProps,
} from "react-native";
import { generateProgressPercentage } from "../utils/generete-progress-percentege";

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;

export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE =
  Dimensions.get("screen").width / WEEK_DAYS - (SCREEN_HORIZONTAL_PADDING + 5);

interface Props extends TouchableOpacityProps {
  amountOfHabits?: number;
  completed?: number;
  date: Date;
}

export function HabitDay({
  amountOfHabits = 0,
  completed = 0,
  date,
  ...rest
}: Props) {
  const completedHabits =
    amountOfHabits > 0
      ? generateProgressPercentage(amountOfHabits, completed)
      : 0;

  const today = dayjs().startOf("day").toDate();
  const isCurrentDay = dayjs(date).isSame(today);

  return (
    <TouchableOpacity
      className={clsx("bg-zinc-900  rounded-lg border-2 m-1", {
        " border-zinc-800": completedHabits === 0,
        "bg-violet-900 border-violet-700":
          completedHabits > 0 && completedHabits < 20,
        "bg-violet-800 border-violet-600":
          completedHabits >= 20 && completedHabits < 40,
        "bg-violet-700 border-violet-500":
          completedHabits >= 40 && completedHabits < 60,
        "bg-violet-600 border-violet-500":
          completedHabits >= 60 && completedHabits < 80,
        "bg-violet-500 border-violet-400": completedHabits >= 80,
        "border-white border-4": isCurrentDay,
      })}
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
      activeOpacity={0.7}
      {...rest}
    />
  );
}
