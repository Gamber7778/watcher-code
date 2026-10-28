export const formats = [
  {id: 'self', name: 'Самостоятельное прохождение', prices: {USD: '95 USD', RUB: '7 900 ₽'}},
  {id: 'personal', name: 'Персональная работа с Вадимом', prices: {USD: '600 USD', RUB: '49 000 ₽'}},
] as const;
export type FormatId = typeof formats[number]['id'];
export type Currency = 'USD' | 'RUB';
export type CheckoutLinks = Partial<Record<`${FormatId}_${Currency}`, string>>;

// Server configuration: approved checkout destinations only. There are no live
// checkout URLs in the repository; absent/invalid values keep a truthful fallback.
export function checkoutLinks(): CheckoutLinks {
  return {self_USD: process.env.CHECKOUT_SELF_USD, self_RUB: process.env.CHECKOUT_SELF_RUB,
    personal_USD: process.env.CHECKOUT_PERSONAL_USD, personal_RUB: process.env.CHECKOUT_PERSONAL_RUB};
}
export function paymentAction(format: FormatId, currency: Currency, links: CheckoutLinks) {
  const plan = formats.find(p => p.id === format)!;
  const raw = links[`${format}_${currency}`]?.trim();
  if (raw) {
    try {
      const url = new URL(raw);
      if (url.protocol === 'https:' && !url.username && !url.password &&
          !/(?:your[-_]|example\.|localhost|placeholder)/i.test(raw))
        return {href: url.href, direct: true, label: `Оплатить ${plan.prices[currency]}`};
    } catch { /* Keep the contact option if configuration is incomplete. */ }
  }
  const text = `Здравствуйте! Выбираю «${plan.name}», ${plan.prices[currency]}. Пришлите, пожалуйста, ссылку для оплаты.`;
  return {href: `https://t.me/vadim_official_z?text=${encodeURIComponent(text)}`, direct: false,
    label: `Получить ссылку · ${plan.prices[currency]}`};
}
