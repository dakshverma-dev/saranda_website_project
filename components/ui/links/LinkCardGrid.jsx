"use client";

import LinkCard from "./LinkCard";

export default function LinkCardGrid({ cards }) {
  if (!cards || cards.length === 0) {
    return (
      <p className="text-center text-neutral-dark-lighter py-12">
        No links available.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card) => (
        <LinkCard key={card._id} card={card} />
      ))}
    </div>
  );
}