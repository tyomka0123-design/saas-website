'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Code, Layout, Rocket, Zap } from 'lucide-react'

type FeatureRow = {
  label: string
  starter: string | boolean
  business: string | boolean
  enterprise: string | boolean
}

type FeatureSection = {
  eyebrow: string
  title: string
  description: string
  groups: {
    title: string
    rows: FeatureRow[]
  }[]
}

const topPlans = [
  {
    key: 'starter' as const,
    title: 'Starter',
    subtitle: 'Ідеально для лендінгів, портфоліо та невеликих бізнес-сайтів.',
    price: 'від $800',
    button: 'Почати проект',
    buttonStyle:
      'border border-white/[0.12] bg-black text-white hover:bg-white/[0.04]',
    features: [
      'Сучасний адаптивний дизайн',
      'До 5 сторінок',
      'Базова SEO оптимізація',
      'Контактна форма',
      'Мобільна адаптація',
      'Швидкий запуск за 7-14 днів',
    ],
  },
  {
    key: 'business' as const,
    title: 'Business',
    badge: 'Популярний',
    subtitle: 'Повноцінний вебсайт з CMS, блогом та розширеним функціоналом.',
    price: 'від $2,500',
    button: 'Обговорити проект',
    buttonStyle: 'bg-[#0A84FF] text-white hover:bg-[#117df0]',
    features: [
      'Все з плану Starter',
      'До 15 сторінок',
      'CMS для управління контентом',
      'Блог з категоріями',
      'Інтеграція з аналітикою',
      'Розширена SEO оптимізація',
    ],
  },
  {
    key: 'enterprise' as const,
    title: 'Enterprise',
    subtitle:
      'Складні SaaS рішення, кастомні платформи та повна автоматизація бізнес-процесів.',
    price: 'від $8,000',
    button: 'Отримати консультацію',
    secondaryButton: 'Запит на демо',
    buttonStyle: 'bg-white text-black hover:bg-white/90',
    features: [
      'Все з плану Business',
      'Необмежена кількість сторінок',
      'Кастомна база даних',
      'Особистий кабінет / дашборд',
      'Платіжні інтеграції',
      'Виділена підтримка',
    ],
  },
]

const sections: FeatureSection[] = [
  {
    eyebrow: 'Розробка',
    title: 'Дизайн та UI/UX',
    description: 'Сучасний дизайн, який виділяє вас серед конкурентів.',
    groups: [
      {
        title: 'Візуальний дизайн',
        rows: [
          { label: 'Унікальний дизайн', starter: true, business: true, enterprise: true },
          { label: 'Адаптивність (mobile-first)', starter: true, business: true, enterprise: true },
          { label: 'Анімації та мікроінтеракції', starter: 'Базові', business: 'Розширені', enterprise: 'Преміум' },
          { label: 'Кастомні ілюстрації', starter: '—', business: 'До 5', enterprise: 'Необмежено' },
          { label: 'Прототипування в Figma', starter: true, business: true, enterprise: true },
          { label: 'Дизайн-система / UI Kit', starter: '—', business: true, enterprise: true },
        ],
      },
      {
        title: 'UX та доступність',
        rows: [
          { label: 'Оптимізація конверсії', starter: 'Базова', business: 'Розширена', enterprise: 'Повна' },
          { label: 'A/B тестування', starter: '—', business: '—', enterprise: true },
          { label: 'WCAG доступність', starter: 'AA', business: 'AA', enterprise: 'AAA' },
          { label: 'Аудит швидкості', starter: true, business: true, enterprise: true },
        ],
      },
    ],
  },
  {
    eyebrow: 'Технології',
    title: 'Розробка та інтеграції',
    description: 'Найсучасніший стек технологій для швидких та надійних рішень.',
    groups: [
      {
        title: 'Frontend',
        rows: [
          { label: 'Next.js / React', starter: true, business: true, enterprise: true },
          { label: 'TypeScript', starter: true, business: true, enterprise: true },
          { label: 'Tailwind CSS', starter: true, business: true, enterprise: true },
          { label: 'Framer Motion анімації', starter: 'Базові', business: 'Розширені', enterprise: 'Кастомні' },
        ],
      },
      {
        title: 'Backend та база даних',
        rows: [
          { label: 'Headless CMS', starter: '—', business: true, enterprise: true },
          { label: 'Кастомний backend', starter: '—', business: '—', enterprise: true },
          { label: 'База даних', starter: '—', business: 'Supabase / Firebase', enterprise: 'Будь-яка' },
          { label: 'API інтеграції', starter: 'До 2', business: 'До 5', enterprise: 'Необмежено' },
          { label: 'Платіжні системи', starter: '—', business: 'Stripe / LiqPay', enterprise: 'Будь-які' },
        ],
      },
    ],
  },
  {
    eyebrow: 'Підтримка',
    title: 'Хостинг та обслуговування',
    description: 'Надійний хостинг та підтримка для вашого проекту.',
    groups: [
      {
        title: 'Інфраструктура',
        rows: [
          { label: 'Vercel / хмарний хостинг', starter: true, business: true, enterprise: true },
          { label: 'SSL сертифікат', starter: true, business: true, enterprise: true },
          { label: 'CDN глобальна мережа', starter: true, business: true, enterprise: true },
          { label: 'Автоматичні бекапи', starter: '—', business: 'Щотижня', enterprise: 'Щодня' },
        ],
      },
      {
        title: 'Підтримка',
        rows: [
          { label: 'Технічна підтримка', starter: 'Email', business: 'Пріоритетна', enterprise: '24/7' },
          { label: 'Час відповіді', starter: '48 годин', business: '24 години', enterprise: '4 години' },
          { label: 'Оновлення та патчі', starter: '30 днів', business: '90 днів', enterprise: '12 місяців' },
          { label: 'Навчання роботі з сайтом', starter: '1 година', business: '3 години', enterprise: 'Необмежено' },
        ],
      },
    ],
  },
]

function CellValue({ value }: { value: string | boolean }) {
  if (value === true) {
    return <Check className="h-4 w-4 text-white/70" />
  }

  if (value === false || value === '—') {
    return <span className="text-white/20">—</span>
  }

  return (
    <span className="text-center text-sm leading-6 text-white/70">
      {value}
    </span>
  )
}

function PlanButton({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className: string
}) {
  return (
    <Link
      href={href}
      className={`inline-flex h-12 items-center justify-between rounded-full px-5 text-[15px] font-medium transition ${className}`}
    >
      <span>{children}</span>
      <ArrowRight className="ml-4 h-4 w-4" />
    </Link>
  )
}

export function Pricing() {
  return (
    <section id="pricing" className="relative bg-black px-4 pb-20 pt-12 text-white md:pb-28">
      {/* Vercel-style grid lines background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative mx-auto max-w-[1100px] border-x border-white/[0.08]">
        <div className="border-b border-t border-white/[0.08] px-6 py-20 md:px-10 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-[36px] font-semibold tracking-[-0.06em] md:text-[64px] md:leading-[1.02]">
              Прозорі ціни для вашого проекту.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-7 text-white/50 md:text-[17px] md:leading-8">
              Від простих лендінгів до складних SaaS платформ — оберіть план, що відповідає вашим потребам.
            </p>
          </div>
        </div>

        <div className="grid border-b border-white/[0.08] md:grid-cols-3">
          {topPlans.map((plan, index) => (
            <div
              key={plan.key}
              className={`relative border-white/[0.08] px-6 pb-8 pt-10 md:px-8 ${
                index !== topPlans.length - 1 ? 'md:border-r' : ''
              } ${plan.key === 'business' ? 'bg-white/[0.02]' : ''}`}
            >
              {plan.badge && (
                <div className="absolute left-0 top-0 rounded-br-lg bg-white px-4 py-2 text-sm font-medium text-black">
                  {plan.badge}
                </div>
              )}

              <h3 className="text-[22px] font-semibold">{plan.title}</h3>
              <p className="mt-4 text-[15px] leading-8 text-white/55">{plan.subtitle}</p>
              <p className="mt-2 text-[18px] font-medium text-white">{plan.price}</p>

              <div className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <div className="mt-[3px]">
                      <Check className="h-4 w-4 text-white/75" />
                    </div>
                    <p className="text-[15px] leading-7 text-white/65">{feature}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <PlanButton href="/contact" className={plan.buttonStyle}>
                  {plan.button}
                </PlanButton>

                {plan.secondaryButton && (
                  <Link
                    href="/contact"
                    className="inline-flex h-12 items-center justify-center rounded-full border border-white/[0.12] bg-black px-5 text-[15px] font-medium text-white/80 transition hover:bg-white/[0.04]"
                  >
                    {plan.secondaryButton}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="border-b border-white/[0.08] px-6 py-12 md:px-10">
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <h3 className="text-[18px] font-semibold tracking-[-0.03em] md:text-[22px]">
                Гнучкі умови оплати.
                <span className="font-normal text-white/55">
                  {' '}
                  50% передоплата, 50% після завершення. Можливість розбити платіж на етапи для великих проектів.
                </span>
              </h3>

              <Link
                href="/contact"
                className="mt-8 inline-flex h-12 items-center justify-center rounded-full border border-white/[0.12] bg-black px-5 text-[15px] font-medium text-white/80 transition hover:bg-white/[0.04] md:w-fit"
              >
                Дізнатися більше
              </Link>
            </div>

            <div className="relative h-[180px] overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
              {/* Vercel-style equal grid lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />
              
              <div className="absolute inset-x-6 top-6 h-[2px] rounded-full bg-[#0A84FF]" />
              <div className="absolute left-6 top-4 rounded-full border border-[#0A84FF] bg-[#0A84FF]/10 px-2 py-0.5 text-[10px] font-medium text-[#72AEFF]">
                БЮДЖЕТ
              </div>

              <div className="absolute bottom-6 left-6 right-6 flex items-end gap-3">
                {[22, 44, 78, 112, 132, 148, 148, 148].map((height, i) => (
                  <motion.div
                    key={i}
                    className={`flex-1 rounded-t-md border ${
                      i >= 5
                        ? 'border-[#0A84FF] bg-[#0A84FF]/10'
                        : 'border-white/[0.18] bg-white/[0.03]'
                    }`}
                    initial={{ height: 10, opacity: 0.5 }}
                    animate={{
                      height: [18, height, Math.max(height - 18, 24), height],
                      opacity: [0.5, 1, 0.75, 1],
                    }}
                    transition={{
                      duration: 2.8,
                      repeat: Infinity,
                      delay: i * 0.08,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-white/[0.08] px-6 py-12 md:px-10">
          <div className="grid gap-8 md:grid-cols-[0.95fr_1.05fr] md:items-center">
            <div className="relative h-[180px] overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
              {/* Vercel-style equal grid lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />

              <div className="relative flex h-full items-end gap-4 md:gap-6">
                {[
                  { labels: ['Дизайн'], active: true, h: 116 },
                  { labels: [''], active: false, h: 150 },
                  { labels: ['Код'], active: true, h: 86 },
                  { labels: [''], active: false, h: 150 },
                  { labels: ['Тест'], active: true, h: 58 },
                  { labels: [''], active: false, h: 150 },
                  { labels: ['Запуск'], active: true, h: 40 },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className={`relative flex w-full items-end justify-center rounded-md border ${
                      item.active
                        ? 'border-[#0A84FF] bg-[#0A84FF]/10'
                        : 'border-white/[0.08] bg-white/[0.03]'
                    }`}
                    initial={{ height: 30, opacity: 0.65 }}
                    animate={{
                      height: [Math.max(item.h - 18, 28), item.h, Math.max(item.h - 10, 28), item.h],
                      opacity: [0.65, 1, 0.8, 1],
                    }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      delay: i * 0.12,
                      ease: 'easeInOut',
                    }}
                    style={{ height: item.h }}
                  >
                    <motion.span
                      className={`mb-3 rounded-md px-2 py-1 text-xs ${
                        item.active
                          ? 'border border-[#0A84FF] bg-[#0A84FF]/10 text-[#72AEFF]'
                          : 'text-white/30'
                      }`}
                      animate={item.active ? { opacity: [1, 0.8, 1] } : { opacity: 1 }}
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        delay: i * 0.12,
                      }}
                    >
                      {item.labels[0]}
                    </motion.span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[18px] font-semibold tracking-[-0.03em] md:text-[22px]">
                Чіткий процес розробки.
                <span className="font-normal text-white/55">
                  {' '}
                  Від брифу до запуску — ви завжди знаєте, на якому етапі знаходиться ваш проект.
                </span>
              </h3>

              <Link
                href="/contact"
                className="mt-8 inline-flex h-12 items-center justify-center rounded-full border border-white/[0.12] bg-black px-5 text-[15px] font-medium text-white/80 transition hover:bg-white/[0.04] md:w-fit"
              >
                Дізнатися про процес
              </Link>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[880px]">
            <div className="sticky top-14 z-20 border-b border-white/[0.08] bg-black/95 backdrop-blur">
              <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr]">
                <div className="border-r border-white/[0.08] px-6 py-5 text-[14px] text-white/55">
                  Що входить
                </div>

                <div className="border-r border-white/[0.08] px-6 py-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[15px] font-semibold">Starter</span>
                    <Link
                      href="/contact"
                      className="inline-flex h-9 items-center justify-center rounded-full border border-white/[0.12] bg-black px-4 text-[14px] font-medium text-white/80 transition hover:bg-white/[0.04]"
                    >
                      Почати
                    </Link>
                  </div>
                </div>

                <div className="border-r border-white/[0.08] px-6 py-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[15px] font-semibold">Business</span>
                    <Link
                      href="/contact"
                      className="inline-flex h-9 items-center justify-center rounded-full bg-[#0A84FF] px-4 text-[14px] font-medium text-white transition hover:bg-[#117df0]"
                    >
                      Обговорити
                    </Link>
                  </div>
                </div>

                <div className="px-6 py-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[15px] font-semibold">Enterprise</span>
                    <Link
                      href="/contact"
                      className="inline-flex h-9 items-center justify-center rounded-full bg-white px-4 text-[14px] font-medium text-black transition hover:bg-white/90"
                    >
                      Консультація
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {sections.map((section) => (
              <div key={section.title} className="border-b border-white/[0.08]">
                <div className="border-b border-white/[0.08] px-8 py-12 md:px-10">
                  <p className="font-mono text-[13px] text-white/35">{section.eyebrow}</p>
                  <h3 className="mt-3 flex items-center gap-2 text-[22px] font-semibold tracking-[-0.03em]">
                    {section.title === 'Дизайн та UI/UX' && <Layout className="h-5 w-5 text-white/70" />}
                    {section.title === 'Розробка та інтеграції' && <Code className="h-5 w-5 text-white/70" />}
                    {section.title === 'Хостинг та обслуговування' && <Rocket className="h-5 w-5 text-white/70" />}
                    {section.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-[17px] leading-8 text-white/50">
                    {section.description}
                  </p>
                </div>

                {section.groups.map((group) => (
                  <div key={group.title}>
                    <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr] border-b border-white/[0.08]">
                      <div className="border-r border-white/[0.08] px-6 py-5">
                        <p className="text-[15px] font-semibold text-white">{group.title}</p>
                      </div>
                      <div className="border-r border-white/[0.08]" />
                      <div className="border-r border-white/[0.08]" />
                      <div />
                    </div>

                    {group.rows.map((row) => (
                      <div
                        key={row.label}
                        className="grid grid-cols-[1.2fr_1fr_1fr_1fr] border-b border-white/[0.08] last:border-b-0"
                      >
                        <div className="border-r border-white/[0.08] px-6 py-4">
                          <p className="text-[15px] leading-7 text-white/82">{row.label}</p>
                        </div>

                        <div className="flex items-center justify-center border-r border-white/[0.08] px-6 py-4 text-center">
                          <CellValue value={row.starter} />
                        </div>

                        <div className="flex items-center justify-center border-r border-white/[0.08] px-6 py-4 text-center">
                          <CellValue value={row.business} />
                        </div>

                        <div className="flex items-center justify-center px-6 py-4 text-center">
                          <CellValue value={row.enterprise} />
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}

            <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr]">
              <div className="border-r border-white/[0.08] px-6 py-5 text-[15px] text-white/55">
                Що входить
              </div>

              <div className="border-r border-white/[0.08] px-6 py-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[15px] font-semibold">Starter</span>
                  <Link
                    href="/contact"
                    className="inline-flex h-9 items-center justify-center rounded-full border border-white/[0.12] bg-black px-4 text-[14px] font-medium text-white/80 transition hover:bg-white/[0.04]"
                  >
                    Почати
                  </Link>
                </div>
              </div>

              <div className="border-r border-white/[0.08] px-6 py-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[15px] font-semibold">Business</span>
                  <Link
                    href="/contact"
                    className="inline-flex h-9 items-center justify-center rounded-full bg-[#0A84FF] px-4 text-[14px] font-medium text-white transition hover:bg-[#117df0]"
                  >
                    Обговорити
                  </Link>
                </div>
              </div>

              <div className="px-6 py-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[15px] font-semibold">Enterprise</span>
                  <Link
                    href="/contact"
                    className="inline-flex h-9 items-center justify-center rounded-full bg-white px-4 text-[14px] font-medium text-black transition hover:bg-white/90"
                  >
                    Консультація
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
