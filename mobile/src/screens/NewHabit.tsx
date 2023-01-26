import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Checkbox } from "../components/Checkbox";
import { GoBackButton } from "../components/GoBackButton";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { api } from "../lib/api";
import Loading from "../components/Loading";

const availableWeekDays = [
  "Domingo",
  "Segunda-Feira",
  "Terça-Feira",
  "Quarta-Feira",
  "Quinta-Feira",
  "Sexta-Feira",
  "Sábado",
];

export function NewHabit() {
  const [weekDays, setWeekDays] = useState<number[]>([]);
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleToggleWeekDay(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays((prevState) =>
        prevState.filter((weekDay) => weekDay !== weekDayIndex)
      );
    } else {
      setWeekDays((prevState) => [...prevState, weekDayIndex]);
    }
  }

  async function createNewHabit() {
    try {
      if (!title.trim() || weekDays.length === 0) {
        return Alert.alert(
          "Novo hábito",
          "Informe o nome do hábito e escolha a periodicidade."
        );
      }
      setIsLoading(true);

      await api.post("/habits", { title, weekDays });

      setIsLoading(false);

      Alert.alert("Sucesso!", "Hábito criado com sucesso!");

      setTitle("");
      setWeekDays([]);
    } catch (error) {
      Alert.alert(
        "Ops",
        "Houve algo algo de errado ao tentar criar seu hábito."
      );
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <GoBackButton />
        <Text className="text-white mt-6 font-extrabold text-3xl">
          Criar hábito
        </Text>
        {isLoading ? (
          <View className="flex items-center justify-center h-full">
            <Loading />
          </View>
        ) : (
          <>
            <Text className="text-white mt-6 font-semibold text-base">
              Qual seu comprometimento?
            </Text>
            <TextInput
              className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-2 focus:border-violet-500"
              placeholder="Beber 2L de água, dormir 8h por dia e etc..."
              placeholderTextColor={colors.zinc[400]}
              onChangeText={setTitle}
              value={title}
            />

            <Text className="text-white mt-4 mb-3 font-semibold text-base">
              Qual a recorrência?
            </Text>
            {availableWeekDays.map((weekDay, index) => (
              <Checkbox
                key={weekDay}
                title={weekDay}
                checked={weekDays.includes(index)}
                onPress={() => handleToggleWeekDay(index)}
              />
            ))}

            <TouchableOpacity
              activeOpacity={0.7}
              className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
              onPress={createNewHabit}
            >
              <Feather name="check" size={20} color={colors.white} />
              <Text className="font-semibold text-base text-white ml-2">
                Confirmar
              </Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </View>
  );
}
