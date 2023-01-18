/*
  Warnings:

  - You are about to drop the column `habits_id` on the `HabitsWeekDays` table. All the data in the column will be lost.
  - Added the required column `habit_id` to the `HabitsWeekDays` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_HabitsWeekDays" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "habit_id" TEXT NOT NULL,
    "week_day" INTEGER NOT NULL,
    CONSTRAINT "HabitsWeekDays_habit_id_fkey" FOREIGN KEY ("habit_id") REFERENCES "habits" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_HabitsWeekDays" ("id", "week_day") SELECT "id", "week_day" FROM "HabitsWeekDays";
DROP TABLE "HabitsWeekDays";
ALTER TABLE "new_HabitsWeekDays" RENAME TO "HabitsWeekDays";
CREATE UNIQUE INDEX "HabitsWeekDays_habit_id_week_day_key" ON "HabitsWeekDays"("habit_id", "week_day");
CREATE TABLE "new_DayHabits" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "day_id" TEXT NOT NULL,
    "habit_id" TEXT NOT NULL,
    CONSTRAINT "DayHabits_day_id_fkey" FOREIGN KEY ("day_id") REFERENCES "Days" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DayHabits_habit_id_fkey" FOREIGN KEY ("habit_id") REFERENCES "habits" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DayHabits" ("day_id", "habit_id", "id") SELECT "day_id", "habit_id", "id" FROM "DayHabits";
DROP TABLE "DayHabits";
ALTER TABLE "new_DayHabits" RENAME TO "DayHabits";
CREATE UNIQUE INDEX "DayHabits_day_id_habit_id_key" ON "DayHabits"("day_id", "habit_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
