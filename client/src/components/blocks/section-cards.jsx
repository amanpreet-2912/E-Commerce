import { StatCard } from "./stat-cards"

export function SectionCards({ cards = [] }) {
  return (
    <div
      className="grid grid-cols-1 gap-4 px-4
      lg:px-6
      @xl/main:grid-cols-2
      @5xl/main:grid-cols-4"
    >
      {cards.map((card, index) => (
        <StatCard key={index} {...card} />
      ))}
    </div>
  )
}
