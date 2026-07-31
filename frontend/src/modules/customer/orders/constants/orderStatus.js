export const ORDER_STATUS = {
  PLACED: "PLACED",
  ACCEPTED: "ACCEPTED",
  PREPARING: "PREPARING",
  READY: "READY",
  PICKED_UP: "PICKED_UP",
  OUT_FOR_DELIVERY: "OUT_FOR_DELIVERY",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
};

export const ORDER_STATUS_LABELS = {
  PLACED: "Order Placed",
  ACCEPTED: "Accepted",
  PREPARING: "Preparing Food",
  READY: "Ready for Pickup",
  PICKED_UP: "Picked Up",
  OUT_FOR_DELIVERY: "Out for Delivery",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

// Ordered for timeline rendering
export const ORDER_TIMELINE_STEPS = [
  ORDER_STATUS.PLACED,
  ORDER_STATUS.ACCEPTED,
  ORDER_STATUS.PREPARING,
  ORDER_STATUS.READY,
  ORDER_STATUS.PICKED_UP,
  ORDER_STATUS.OUT_FOR_DELIVERY,
  ORDER_STATUS.DELIVERED,
];

// Statuses where cancellation is still allowed
export const CANCELLABLE_STATUSES = [
  ORDER_STATUS.PLACED,
  ORDER_STATUS.ACCEPTED,
];

// Statuses where order is still active (show ActiveOrder banner)
export const ACTIVE_STATUSES = [
  ORDER_STATUS.PLACED,
  ORDER_STATUS.ACCEPTED,
  ORDER_STATUS.PREPARING,
  ORDER_STATUS.READY,
  ORDER_STATUS.PICKED_UP,
  ORDER_STATUS.OUT_FOR_DELIVERY,
];

export const SOCKET_EVENTS = {
  ACCEPTED: "order:accepted",
  PREPARING: "order:preparing",
  READY: "order:ready",
  PICKED_UP: "order:picked-up",
  OUT_FOR_DELIVERY: "order:out-for-delivery",
  DELIVERED: "order:delivered",
  CANCELLED: "order:cancelled",
};
