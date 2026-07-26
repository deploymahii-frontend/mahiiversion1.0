import { useEffect, useState } from "react";
import {
  getDashboard,
  getTickets,
  getAgents,
  getKnowledgeBase,
  getAnalytics,
  createTicket as postTicket,
  assignAgent as postAssignAgent,
  closeTicket as postCloseTicket,
} from "../services/support.service";

const DEFAULT_FILTERS = {
  search: "",
  status: "",
  priority: "",
  assignedAgent: "",
};

export default function useSupport() {
  const [loading, setLoading] = useState(false);
  const [statistics, setStatistics] = useState({});
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [chats, setChats] = useState([]);
  const [agents, setAgents] = useState([]);
  const [knowledgeBase, setKnowledgeBase] = useState([]);
  const [sla, setSla] = useState({});
  const [feedback, setFeedback] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  async function loadSupportData() {
    setLoading(true);

    try {
      const [dashboard, ticketList, agentList, kbItems, analyticsData] = await Promise.all([
        getDashboard(),
        getTickets(filters),
        getAgents(),
        getKnowledgeBase(),
        getAnalytics(),
      ]);

      setStatistics(dashboard.statistics);
      setTickets(ticketList);
      setChats(dashboard.liveChats);
      setAgents(agentList);
      setKnowledgeBase(kbItems);
      setSla(dashboard.slaMetrics);
      setFeedback(dashboard.feedback);
      setAnalytics(analyticsData);
      setSelectedTicket(ticketList[0] || null);
    } finally {
      setLoading(false);
    }
  }

  async function selectTicket(ticket) {
    setSelectedTicket(ticket);
  }

  async function createTicket(payload) {
    setLoading(true);

    try {
      await postTicket(payload);
      await loadSupportData();
    } finally {
      setLoading(false);
    }
  }

  async function assignAgent(ticketId, agentId) {
    setLoading(true);

    try {
      await postAssignAgent(ticketId, agentId);
      await loadSupportData();
    } finally {
      setLoading(false);
    }
  }

  async function closeTicket(ticketId) {
    setLoading(true);

    try {
      await postCloseTicket(ticketId);
      await loadSupportData();
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSupportData();
  }, [filters]);

  return {
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
    refresh: loadSupportData,
    selectTicket,
    assignAgent,
    closeTicket,
    createTicket,
    filters,
    setFilters,
  };
}
