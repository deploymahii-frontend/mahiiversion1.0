import AdminHeader from "../../layout/AdminHeader";
import AdminSidebar from "../../layout/AdminSidebar";

import TicketStatistics from "../components/TicketStatistics";
import TicketQueue from "../components/TicketQueue";
import TicketDetails from "../components/TicketDetails";
import LiveChatCenter from "../components/LiveChatCenter";
import AgentWorkspace from "../components/AgentWorkspace";
import KnowledgeBase from "../components/KnowledgeBase";
import SLAOverview from "../components/SLAOverview";
import CustomerFeedback from "../components/CustomerFeedback";
import SupportAnalytics from "../components/SupportAnalytics";

import useSupport from "../hooks/useSupport";

export default function SupportDashboard() {
  const {
    loading,
    statistics,
    tickets,
    selectedTicket,
    chats,
    agents,
    knowledgeBase,
    sla,
    feedback,
    analytics,
    refresh,
    selectTicket,
    assignAgent,
    closeTicket,
  } = useSupport();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1">
        <AdminHeader />

        <main className="space-y-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Support & Helpdesk</h1>
              <p className="text-gray-500">
                Customer support, ticketing, SLA monitoring and live chat.
              </p>
            </div>

            <button
              onClick={refresh}
              className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
            >
              Refresh Dashboard
            </button>
          </div>

          <TicketStatistics loading={loading} statistics={statistics} />

          <SupportAnalytics loading={loading} analytics={analytics} />

          <SLAOverview loading={loading} sla={sla} />

          <AgentWorkspace loading={loading} agents={agents} />

          <TicketQueue
            loading={loading}
            tickets={tickets}
            onView={selectTicket}
            onAssign={({ id }) => assignAgent(id)}
          />

          <TicketDetails
            loading={loading}
            ticket={selectedTicket}
            onAssign={assignAgent}
            onClose={closeTicket}
          />

          <LiveChatCenter loading={loading} chats={chats} />

          <KnowledgeBase loading={loading} articles={knowledgeBase} />

          <CustomerFeedback loading={loading} feedback={feedback} />
        </main>
      </div>
    </div>
  );
}
