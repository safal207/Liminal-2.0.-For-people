"use client";

import { useState } from "react";

export default function Evening() {
  const [done, setDone] = useState("");
  const [grat, setGrat] = useState("");
  const [ok, setOk] = useState(false);

  const save = () => {
    console.log({ done, grat, at: new Date().toISOString() });
    setOk(true);
    setTimeout(() => setOk(false), 1600);
  };

  return (
    <main className="min-h-dvh bg-gradient-to-br from-purple-900 to-pink-900 p-8">
      <div className="max-w-3xl mx-auto grid gap-6">
        <h2 className="text-3xl font-bold text-white">Вечерняя свёртка</h2>
        <label className="grid gap-2">
          <span className="text-purple-200">Что получилось / что заметил?</span>
          <textarea
            rows={5}
            className="p-4 rounded bg-white/10 text-white border border-white/20"
            value={done}
            onChange={(e) => setDone(e.target.value)}
            placeholder="Опиши своими словами..."
          />
        </label>
        <label className="grid gap-2">
          <span className="text-purple-200">Чему рад / за что благодарен?</span>
          <textarea
            rows={5}
            className="p-4 rounded bg-white/10 text-white border border-white/20"
            value={grat}
            onChange={(e) => setGrat(e.target.value)}
            placeholder="Даже маленькие вещи имеют значение..."
          />
        </label>
        <button
          disabled={!done || !grat}
          onClick={save}
          className="px-6 py-3 rounded bg-purple-600 text-white disabled:opacity-50"
        >
          {ok ? "✓ Сохранено" : "Сохранить день"}
        </button>
      </div>
    </main>
  );
}
