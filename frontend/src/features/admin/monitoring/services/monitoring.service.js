export async function getHealth() {
  await new Promise((resolve) => setTimeout(resolve, 200));

  return {
    status: "HEALTHY",
    uptime: "18d 12h",
    database: "CONNECTED",
    redis: "CONNECTED",
    storage: "CONNECTED",
    version: "1.2.0",
  };
}

export async function getMetrics() {
  await new Promise((resolve) => setTimeout(resolve, 200));

  return {
    requestsPerMinute: 942,
    errorRate: 0.8,
    avgResponseTime: 265,
    activeUsers: 14_520,
    cpuUsage: 62,
    memoryUsage: 71,
    diskUsage: 58,
  };
}

export async function getApiPerformance() {
  await new Promise((resolve) => setTimeout(resolve, 200));

  return [
    { label: "08:00", latency: 220, throughput: 280 },
    { label: "10:00", latency: 250, throughput: 320 },
    { label: "12:00", latency: 230, throughput: 305 },
    { label: "14:00", latency: 260, throughput: 330 },
    { label: "16:00", latency: 245, throughput: 315 },
    { label: "18:00", latency: 270, throughput: 340 },
  ];
}

export async function getQueues() {
  await new Promise((resolve) => setTimeout(resolve, 200));

  return [
    { name: "Email Dispatch", pending: 12, failed: 0 },
    { name: "Order Processing", pending: 22, failed: 1 },
    { name: "Payment Reconciliation", pending: 7, failed: 0 },
    { name: "Report Generation", pending: 3, failed: 0 },
  ];
}

export async function getIncidents() {
  await new Promise((resolve) => setTimeout(resolve, 200));

  return [
    {
      id: "inc001",
      title: "Payment gateway latency",
      severity: "MEDIUM",
      status: "Investigating",
      startedAt: "2026-07-21T08:30:00Z",
    },
    {
      id: "inc002",
      title: "Worker queue backlog",
      severity: "LOW",
      status: "Monitoring",
      startedAt: "2026-07-21T09:15:00Z",
    },
  ];
}
