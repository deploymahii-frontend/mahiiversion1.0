import { useState } from "react";
import useTickets from "../hooks/useTickets";
import SupportHero from "../components/SupportHero";
import QuickHelpGrid from "../components/QuickHelpGrid";
import TicketCard from "../components/TicketCard";
import ContactOptions from "../components/ContactOptions";

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data = [], isLoading } = useTickets();

  const tickets = data;

  return (
    <div className="space-y-6">
      <SupportHero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <QuickHelpGrid onSelectCategory={(cat) => alert(`Selected category: ${cat}`)} />

      <section className="space-y-3">
        <h3 className="font-bold text-slate-800 text-base">Your Active Support Tickets</h3>
        {isLoading ? (
          <div className="h-20 bg-slate-200 rounded-2xl animate-pulse" />
        ) : (
          <div className="space-y-2">
            {tickets.map((ticket) => (
              <TicketCard key={ticket._id} ticket={ticket} />
            ))}
          </div>
        )}
      </section>

      <ContactOptions />
    </div>
  );
}
