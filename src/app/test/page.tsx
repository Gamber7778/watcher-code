import type { Metadata } from "next";
import PracticeLanding from "./practice-landing";

export const metadata: Metadata = {
  title: "Работа без постоянного контроля | Код Смотрителя",
  description: "Бесплатный гайд по идеям Трансерфинга: одна рабочая ситуация, конкретное решение и карта действий на 7 дней. Получите в Telegram.",
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
