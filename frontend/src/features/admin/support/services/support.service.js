const mockDashboard = {
  statistics: {
    openTickets: 18,
    resolvedToday: 12,
    avgResponseTime: "1h 15m",
    avgResolutionTime: "6h 40m",
    slaCompliance: "95%",
    agentUtilization: "82%",
    csat: "4.7/5",
    escalatedTickets: 2,
    pendingResponses: 9,
    liveChats: 7,
  },
  liveChats: [
    {
      id: 1,
      customer: "Ravi Kumar",
      topic: "Refund request clarification",
      agent: "Aditi Sharma",
      status: "Active",
      lastMessageTime: "5 min ago",
    },
    {
      id: 2,
      customer: "Neha Patel",
      topic: "Order tracking issue",
      agent: "Rahul Desai",
      status: "Waiting",
      lastMessageTime: "12 min ago",
    },
  ],
  slaMetrics: {
    responseSla: 92,
    responseTarget: "< 1h",
    resolutionSla: 88,
    resolutionTarget: "< 8h",
    compliance: 94,
    escalationRate: 4,
  },
  feedback: [
    {
      id: 1,
      customer: "Anita Singh",
      rating: 5,
      category: "Order Issue",
      comment: "Quick response and resolution. Great support!",
    },
    {
      id: 2,
      customer: "Deepak Jain",
      rating: 4,
      category: "Technical Issue",
      comment: "Agent was helpful but I had to wait longer than expected.",
    },
  ],
};

const mockTickets = [
  {
    id: 101,
    ticketNumber: "TCKT-101",
    subject: "Unable to apply coupon code",
    type: "Payment Problem",
    customer: "Shruti Verma",
    priority: "HIGH",
    status: "OPEN",
    assignedAgent: "",
    slaRemaining: "2h 30m",
    description: "I am not able to apply the coupon code during checkout.",
    createdAt: "Today, 09:15 AM",
    updatedAt: "1 hour ago",
    lastUpdated: "30 minutes ago",
    customerEmail: "shruti.verma@example.com",
    tags: ["Payment", "Coupon"],
    sla: "24h",
    thread: [
      {
        id: 1,
        sender: "Customer",
        time: "09:20 AM",
        message: "I tried using the promo code on checkout and it says invalid.",
      },
      {
        id: 2,
        sender: "Agent",
        time: "09:32 AM",
        message: "Thanks for reaching out. Can you share the code you used?",
      },
    ],
    attachments: [],
  },
  {
    id: 102,
    ticketNumber: "TCKT-102",
    subject: "App crashes after login",
    type: "Bug Report",
    customer: "Sahil Rao",
    priority: "CRITICAL",
    status: "IN_PROGRESS",
    assignedAgent: "Priya Nair",
    slaRemaining: "45m",
    description: "The mobile app crashes every time I try to log in.",
    createdAt: "Today, 08:40 AM",
    updatedAt: "30 min ago",
    lastUpdated: "10 minutes ago",
    customerEmail: "sahil.rao@example.com",
    tags: ["Bug", "Login"],
    sla: "8h",
    thread: [
      {
        id: 1,
        sender: "Customer",
        time: "08:42 AM",
        message: "The app immediately closes after I enter my password.",
      },
      {
        id: 2,
        sender: "Agent",
        time: "08:50 AM",
        message: "We are checking the latest build. Can you tell me your device model?",
      },
    ],
    attachments: [
      {
        id: 1,
        name: "crash-log.txt",
        size: "12 KB",
      },
    ],
  },
];

const mockAgents = [
  {
    id: 1,
    name: "Aditi Sharma",
    role: "Support Agent",
    utilization: 85,
    openTickets: 6,
    resolvedToday: 3,
    avgResponseTime: "42m",
  },
  {
    id: 2,
    name: "Rahul Desai",
    role: "Senior Agent",
    utilization: 78,
    openTickets: 5,
    resolvedToday: 4,
    avgResponseTime: "38m",
  },
];

const mockKnowledgeBase = [
  {
    id: 1,
    title: "How to request a refund",
    summary: "Step-by-step guidance for refund eligibility and processing.",
    category: "Refund Request",
    language: "English",
    views: 1284,
    helpful: 92,
    updatedAt: "2 days ago",
  },
  {
    id: 2,
    title: "Troubleshoot delivery delays",
    summary: "Common causes and next steps when a delivery is delayed.",
    category: "Delivery Issue",
    language: "English",
    views: 874,
    helpful: 88,
    updatedAt: "5 days ago",
  },
];

const mockAnalytics = {
  newTickets: 42,
  avgReplyTime: "1h 10m",
  csatTrend: "+8%",
  escalations: 4,
};

export const getDashboard = async () => mockDashboard;
export const getTickets = async () => mockTickets;
export const getAgents = async () => mockAgents;
export const getKnowledgeBase = async () => mockKnowledgeBase;
export const getAnalytics = async () => mockAnalytics;
export const createTicket = async () => ({ success: true });
export const assignAgent = async () => ({ success: true });
export const closeTicket = async () => ({ success: true });
