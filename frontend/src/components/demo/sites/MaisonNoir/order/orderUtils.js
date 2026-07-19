export const ORDER_STORAGE_KEY = "maison-noir-order-demo-v1";

export const TAX_RATE = 0.14;
export const DELIVERY_FEE_CENTS = 650;
export const PROMO_CODE = "MAISON10";

export const ORDER_STEPS = [
  "order-type",
  "customer",
  "details",
  "schedule",
  "review",
  "confirmation",
];

export const ORDER_STEP_LABELS = {
  "order-type": "Order type",
  customer: "Guest details",
  details: "Delivery / pickup",
  schedule: "Schedule",
  review: "Review",
  confirmation: "Confirmation",
};

export const PAYMENT_OPTIONS = {
  pickup: [
    { id: "pay-at-pickup", label: "Pay at pickup", disabled: false },
    { id: "online-coming-soon", label: "Online payment coming soon", disabled: true },
  ],
  delivery: [
    { id: "pay-on-delivery", label: "Pay on delivery", disabled: false },
    { id: "online-coming-soon", label: "Online payment coming soon", disabled: true },
  ],
};

export const PICKUP_LOCATION = {
  name: "Maison Noir",
  address: "17 Bishop's Landing",
  city: "Halifax",
  province: "Nova Scotia",
  hours: "Open Daily, 5:00 PM - Midnight",
  phone: "(902) 555-0198",
};

export const EMPTY_CUSTOMER = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

export const EMPTY_DELIVERY_ADDRESS = {
  street: "",
  apartment: "",
  city: "",
  province: "Nova Scotia",
  postalCode: "",
  buzzer: "",
  deliveryInstructions: "",
  contactless: false,
};

export const EMPTY_PICKUP_DETAILS = {
  pickupInstructions: "",
};

export const EMPTY_SCHEDULE = {
  timing: "asap",
  date: "",
  time: "",
};

export const EMPTY_CHECKOUT = {
  orderType: "delivery",
  customer: EMPTY_CUSTOMER,
  deliveryAddress: EMPTY_DELIVERY_ADDRESS,
  pickupDetails: EMPTY_PICKUP_DETAILS,
  schedule: EMPTY_SCHEDULE,
  tipOption: "18",
  customTipCents: 0,
  promoCode: "",
  paymentMethod: "pay-on-delivery",
  allergyNotes: "",
  allergyAcknowledged: false,
};

const STEAK_TEMPERATURES = [
  "Rare",
  "Medium rare",
  "Medium",
  "Medium well",
  "Well done",
];

const steakAddOns = [
  { id: "peppercorn-jus", label: "Peppercorn jus", priceCents: 400 },
  { id: "truffle-butter", label: "Black truffle butter", priceCents: 900 },
  { id: "roasted-garlic", label: "Roasted garlic", priceCents: 300 },
];

export const ITEM_CUSTOMIZATION_CONFIG = {
  "45-Day Dry-Aged Ribeye": {
    temperatures: STEAK_TEMPERATURES,
    defaultTemperature: "Medium rare",
    addOns: steakAddOns,
  },
  "Black Truffle Filet Mignon": {
    temperatures: STEAK_TEMPERATURES,
    defaultTemperature: "Medium rare",
    addOns: steakAddOns,
  },
  "A5 Japanese Wagyu": {
    temperatures: STEAK_TEMPERATURES,
    defaultTemperature: "Medium rare",
    addOns: [
      { id: "smoked-salt", label: "Extra smoked salt", priceCents: 200 },
      { id: "truffle-butter", label: "Black truffle butter", priceCents: 900 },
    ],
  },
  "Tomahawk for Two": {
    temperatures: STEAK_TEMPERATURES,
    defaultTemperature: "Medium rare",
    addOns: [
      { id: "house-sauce", label: "Extra house sauce", priceCents: 300 },
      { id: "roasted-garlic", label: "Roasted garlic", priceCents: 300 },
      { id: "truffle-butter", label: "Black truffle butter", priceCents: 900 },
    ],
  },
  "Prime New York Strip": {
    temperatures: STEAK_TEMPERATURES,
    defaultTemperature: "Medium rare",
    addOns: steakAddOns,
  },
};

export function parsePriceToCents(price) {
  const value = Number(String(price || "").replace(/[^0-9.]/g, ""));
  return Number.isFinite(value) ? Math.round(value * 100) : 0;
}

export function formatCurrency(cents) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
  }).format((Number(cents) || 0) / 100);
}

export function getMenuItemPayload(category, item) {
  const [name, price, description, image] = item || [];

  return {
    category,
    name,
    price,
    priceCents: parsePriceToCents(price),
    description,
    image,
  };
}

export function getItemCustomizationConfig(item) {
  if (!item?.name) return { temperatures: [], addOns: [] };

  return {
    temperatures: [],
    addOns: [],
    ...(ITEM_CUSTOMIZATION_CONFIG[item.name] || {}),
  };
}

export function getAddOnTotalCents(addOns = []) {
  return addOns.reduce((total, addOn) => total + (addOn.priceCents || 0), 0);
}

export function getItemUnitTotalCents(item) {
  return (item.priceCents || 0) + getAddOnTotalCents(item.customizations?.addOns);
}

export function getCartItemLineTotalCents(item) {
  return getItemUnitTotalCents(item) * (item.quantity || 1);
}

export function buildCartItemKey(item, customizations = {}) {
  const addOnIds = (customizations.addOns || [])
    .map((addOn) => addOn.id)
    .sort()
    .join(",");
  const temperature = customizations.temperature || "";
  const instructions = (customizations.specialInstructions || "").trim().toLowerCase();

  return [item.category, item.name, temperature, addOnIds, instructions].join("|");
}

export function calculateCartSubtotalCents(items = []) {
  return items.reduce((total, item) => total + getCartItemLineTotalCents(item), 0);
}

export function calculateDiscountCents(subtotalCents, promoCode) {
  if (String(promoCode || "").trim().toUpperCase() !== PROMO_CODE) return 0;
  return Math.round(subtotalCents * 0.1);
}

export function calculateTipCents(foodAfterDiscountCents, tipOption, customTipCents) {
  if (tipOption === "none") return 0;
  if (tipOption === "custom") return Math.max(0, Number(customTipCents) || 0);

  const percentage = Number(tipOption);
  return Number.isFinite(percentage)
    ? Math.round(foodAfterDiscountCents * (percentage / 100))
    : 0;
}

export function calculateOrderTotals(items = [], checkout = EMPTY_CHECKOUT) {
  const subtotalCents = calculateCartSubtotalCents(items);
  const discountCents = calculateDiscountCents(subtotalCents, checkout.promoCode);
  const foodAfterDiscountCents = Math.max(subtotalCents - discountCents, 0);
  const deliveryFeeCents =
    checkout.orderType === "delivery" && items.length > 0 ? DELIVERY_FEE_CENTS : 0;
  const taxCents = Math.round((foodAfterDiscountCents + deliveryFeeCents) * TAX_RATE);
  const tipCents = calculateTipCents(
    foodAfterDiscountCents,
    checkout.tipOption,
    checkout.customTipCents
  );
  const totalCents =
    foodAfterDiscountCents + deliveryFeeCents + taxCents + tipCents;

  return {
    subtotalCents,
    discountCents,
    foodAfterDiscountCents,
    deliveryFeeCents,
    taxCents,
    tipCents,
    totalCents,
  };
}

export function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

export function validateCanadianPhone(value) {
  const digits = String(value || "").replace(/\D/g, "");
  return digits.length === 10 || (digits.length === 11 && digits.startsWith("1"));
}

export function validateCanadianPostalCode(value) {
  return /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i.test(
    String(value || "").trim()
  );
}

export function getTodayDateValue() {
  const today = new Date();
  const offset = today.getTimezoneOffset();
  const localToday = new Date(today.getTime() - offset * 60 * 1000);
  return localToday.toISOString().slice(0, 10);
}

export function isPastDate(dateValue) {
  if (!dateValue) return false;
  return dateValue < getTodayDateValue();
}

export function getRequestedTimeLabel(schedule = EMPTY_SCHEDULE) {
  if (schedule.timing === "later" && schedule.date && schedule.time) {
    return `${schedule.date} at ${schedule.time}`;
  }

  return "As soon as possible";
}

export function maskEmail(email) {
  const [name, domain] = String(email || "").split("@");
  if (!name || !domain) return "";
  return `${name.slice(0, 1)}***@${domain}`;
}

export function maskPhone(phone) {
  const digits = String(phone || "").replace(/\D/g, "");
  if (digits.length < 4) return "";
  return `***-***-${digits.slice(-4)}`;
}

export function generateOrderNumber() {
  return `MN-${Math.floor(1000 + Math.random() * 9000)}`;
}

export function getDefaultPaymentMethod(orderType) {
  return orderType === "pickup" ? "pay-at-pickup" : "pay-on-delivery";
}

export function normalizePromoCode(value) {
  return String(value || "").trim().toUpperCase();
}
