import type { Metadata } from "next";
import PracticeLanding from "./practice-landing";

export const metadata: Metadata = {
  title: "Работа без постоянного контроля | Код Смотрителя",
  description: "Бесплатная практика: одна рабочая ситуация, конкретное решение и карта действий на 7 дней.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Работа без постоянного контроля",
    description: "Одна рабочая ситуация. Одно решение. Ваш следующий шаг на 7 дней.",
    url: "https://zeland.it.com/test",
  },
};

export default function TestPage() {
  return <PracticeLanding />;
}
