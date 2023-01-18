-- CreateTable
CREATE TABLE "HabitsWeekDays" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "habits_id" TEXT NOT NULL,
    "week_day" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Days" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "DayHabits" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "day_id" TEXT NOT NULL,
    "habit_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "HabitsWeekDays_habits_id_week_day_key" ON "HabitsWeekDays"("habits_id", "week_day");

-- CreateIndex
CREATE UNIQUE INDEX "Days_date_key" ON "Days"("date");

-- CreateIndex
CREATE UNIQUE INDEX "DayHabits_day_id_habit_id_key" ON "DayHabits"("day_id", "habit_id");
