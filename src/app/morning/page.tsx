type Insight = { microHabit: string; reframing: string; worldTrend: string };

const INSIGHTS: Insight[] = [
  {
    microHabit: "Стакан воды и 3 глубоких вдоха",
    reframing: "Выбери один главный шаг вместо десяти мелких",
    worldTrend: "AI-ассистенты становятся персональными коучами",
  },
  {
    microHabit: "2 минуты растяжки после подъёма",
    reframing: "Ошибки — это данные, а не приговор",
    worldTrend: "Микрообучение вытесняет длинные курсы",
  },
  {
    microHabit: "3 благодарности в заметках",
    reframing: "Прогресс — это движение, не идеал",
    worldTrend: "Удалёнка меняет географию талантов",
  },
];

const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];

export default function Morning() {
  const i = pick(INSIGHTS);
  return (
    <main className="min-h-dvh bg-gradient-to-br from-blue-900 to-indigo-900 p-8">
      <div className="max-w-3xl mx-auto grid gap-6">
        <h2 className="text-3xl font-bold text-white">Твои 3 пункта на утро</h2>
        <section className="bg-white/10 p-6 rounded-xl border border-white/20">
          <h3 className="text-blue-200 text-sm uppercase mb-2">Микропривычка</h3>
          <p className="text-white text-lg">{i.microHabit}</p>
        </section>
        <section className="bg-white/10 p-6 rounded-xl border border-white/20">
          <h3 className="text-blue-200 text-sm uppercase mb-2">Рефрейм</h3>
          <p className="text-white text-lg">{i.reframing}</p>
        </section>
        <section className="bg-white/10 p-6 rounded-xl border border-white/20">
          <h3 className="text-blue-200 text-sm uppercase mb-2">Мировой штрих</h3>
          <p className="text-white text-lg">{i.worldTrend}</p>
        </section>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded bg-blue-600 text-white">Применить</button>
          <button className="px-4 py-2 rounded border border-white/30 text-white">Сохранить</button>
          <button className="px-4 py-2 rounded border border-white/30 text-white">Пропустить</button>
        </div>
      </div>
    </main>
  );
}
