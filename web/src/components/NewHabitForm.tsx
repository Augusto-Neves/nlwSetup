import { Check } from "phosphor-react";
import { useState } from "react";

export function NewHabitForm() {
  const [title, setTitle] = useState("");

  return (
    <form className="w-full flex flex-col mt-6">
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
      />

      <label className="font-semibold leading-tight mt-4" htmlFor="">
        Qual a recorrência?
      </label>
      
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
