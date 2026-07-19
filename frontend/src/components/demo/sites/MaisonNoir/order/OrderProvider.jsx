import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

import {
  EMPTY_CHECKOUT,
  ORDER_STORAGE_KEY,
  ORDER_STEPS,
  buildCartItemKey,
  calculateOrderTotals,
  generateOrderNumber,
  getDefaultPaymentMethod,
  getMenuItemPayload,
  getRequestedTimeLabel,
  maskEmail,
  maskPhone,
} from "./orderUtils";

const OrderContext = createContext(null);

const cloneCheckout = (checkout = EMPTY_CHECKOUT) => ({
  ...EMPTY_CHECKOUT,
  ...checkout,
  customer: {
    ...EMPTY_CHECKOUT.customer,
    ...(checkout.customer || {}),
  },
  deliveryAddress: {
    ...EMPTY_CHECKOUT.deliveryAddress,
    ...(checkout.deliveryAddress || {}),
  },
  pickupDetails: {
    ...EMPTY_CHECKOUT.pickupDetails,
    ...(checkout.pickupDetails || {}),
  },
  schedule: {
    ...EMPTY_CHECKOUT.schedule,
    ...(checkout.schedule || {}),
  },
});

const getStoredOrderState = () => {
  if (typeof window === "undefined") {
    return {
      cartItems: [],
      checkout: cloneCheckout(),
      checkoutStep: ORDER_STEPS[0],
    };
  }

  try {
    const raw = window.localStorage.getItem(ORDER_STORAGE_KEY);
    if (!raw) {
      return {
        cartItems: [],
        checkout: cloneCheckout(),
        checkoutStep: ORDER_STEPS[0],
      };
    }

    const parsed = JSON.parse(raw);

    return {
      cartItems: Array.isArray(parsed.cartItems) ? parsed.cartItems : [],
      checkout: cloneCheckout(parsed.checkout),
      checkoutStep: ORDER_STEPS.includes(parsed.checkoutStep)
        ? parsed.checkoutStep
        : ORDER_STEPS[0],
    };
  } catch (error) {
    console.warn("Maison Noir order state could not be restored:", error);
    return {
      cartItems: [],
      checkout: cloneCheckout(),
      checkoutStep: ORDER_STEPS[0],
    };
  }
};

export function OrderProvider({ children }) {
  const storedState = useMemo(() => getStoredOrderState(), []);
  const [cartItems, setCartItems] = useState(storedState.cartItems);
  const [checkout, setCheckout] = useState(storedState.checkout);
  const [checkoutStep, setCheckoutStep] = useState(storedState.checkoutStep);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerView, setDrawerView] = useState("cart");
  const [selectedItem, setSelectedItem] = useState(null);
  const [confirmationDetails, setConfirmationDetails] = useState(null);

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

  const totals = useMemo(
    () => calculateOrderTotals(cartItems, checkout),
    [cartItems, checkout]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const payload = {
      cartItems,
      checkout,
      checkoutStep,
    };

    window.localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(payload));
  }, [cartItems, checkout, checkoutStep]);

  const openDrawer = (view = "cart") => {
    setDrawerView(view);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const openItemCustomizer = ({ category, item }) => {
    setSelectedItem({
      mode: "add",
      item: getMenuItemPayload(category, item),
      quantity: 1,
      customizations: {
        temperature: "",
        addOns: [],
        specialInstructions: "",
      },
    });
  };

  const editCartItem = (id) => {
    const cartItem = cartItems.find((item) => item.id === id);
    if (!cartItem) return;

    setSelectedItem({
      mode: "edit",
      editingId: id,
      item: {
        category: cartItem.category,
        name: cartItem.name,
        price: cartItem.price,
        priceCents: cartItem.priceCents,
        description: cartItem.description,
        image: cartItem.image,
      },
      quantity: cartItem.quantity,
      customizations: {
        temperature: cartItem.customizations?.temperature || "",
        addOns: cartItem.customizations?.addOns || [],
        specialInstructions: cartItem.customizations?.specialInstructions || "",
      },
    });
  };

  const closeItemCustomizer = () => {
    setSelectedItem(null);
  };

  const saveCustomizedItem = ({ item, quantity, customizations }) => {
    const normalizedQuantity = Math.max(1, Number(quantity) || 1);
    const id = buildCartItemKey(item, customizations);
    const nextItem = {
      ...item,
      id,
      quantity: normalizedQuantity,
      customizations,
    };

    setCartItems((current) => {
      const withoutEditedItem =
        selectedItem?.mode === "edit"
          ? current.filter((cartItem) => cartItem.id !== selectedItem.editingId)
          : current;
      const existing = withoutEditedItem.find((cartItem) => cartItem.id === id);

      if (existing) {
        return withoutEditedItem.map((cartItem) =>
          cartItem.id === id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + normalizedQuantity,
              }
            : cartItem
        );
      }

      return [...withoutEditedItem, nextItem];
    });

    setSelectedItem(null);
    openDrawer("cart");
  };

  const updateCartItemQuantity = (id, change) => {
    setCartItems((current) =>
      current.flatMap((item) => {
        if (item.id !== id) return [item];

        const quantity = item.quantity + change;
        return quantity > 0 ? [{ ...item, quantity }] : [];
      })
    );
  };

  const removeCartItem = (id) => {
    setCartItems((current) => current.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const startCheckout = () => {
    if (!cartItems.length) return;
    setCheckoutStep("order-type");
    setDrawerView("checkout");
    setDrawerOpen(true);
  };

  const updateCheckout = (patch) => {
    setCheckout((current) => ({
      ...current,
      ...patch,
    }));
  };

  const updateCustomer = (patch) => {
    setCheckout((current) => ({
      ...current,
      customer: {
        ...current.customer,
        ...patch,
      },
    }));
  };

  const updateDeliveryAddress = (patch) => {
    setCheckout((current) => ({
      ...current,
      deliveryAddress: {
        ...current.deliveryAddress,
        ...patch,
      },
    }));
  };

  const updatePickupDetails = (patch) => {
    setCheckout((current) => ({
      ...current,
      pickupDetails: {
        ...current.pickupDetails,
        ...patch,
      },
    }));
  };

  const updateSchedule = (patch) => {
    setCheckout((current) => ({
      ...current,
      schedule: {
        ...current.schedule,
        ...patch,
      },
    }));
  };

  const setOrderType = (orderType) => {
    setCheckout((current) => ({
      ...current,
      orderType,
      paymentMethod: getDefaultPaymentMethod(orderType),
    }));
  };

  const submitDemoOrder = () => {
    const confirmation = {
      orderNumber: generateOrderNumber(),
      orderType: checkout.orderType,
      requestedTime: getRequestedTimeLabel(checkout.schedule),
      customerName: `${checkout.customer.firstName} ${checkout.customer.lastName}`.trim(),
      maskedEmail: maskEmail(checkout.customer.email),
      maskedPhone: maskPhone(checkout.customer.phone),
      items: cartItems,
      totals,
      allergyNotes: checkout.allergyNotes,
      deliveryAddress: checkout.deliveryAddress,
      pickupDetails: checkout.pickupDetails,
      paymentMethod: checkout.paymentMethod,
      createdAt: new Date().toISOString(),
    };

    setConfirmationDetails(confirmation);
    setCartItems([]);
    setCheckoutStep("confirmation");
    setDrawerView("confirmation");
  };

  const startNewOrder = () => {
    setConfirmationDetails(null);
    setCheckout(cloneCheckout());
    setCheckoutStep(ORDER_STEPS[0]);
    setDrawerView("cart");
  };

  const value = {
    cartItems,
    cartCount,
    checkout,
    checkoutStep,
    confirmationDetails,
    drawerOpen,
    drawerView,
    selectedItem,
    totals,
    clearCart,
    closeDrawer,
    closeItemCustomizer,
    editCartItem,
    openDrawer,
    openItemCustomizer,
    removeCartItem,
    saveCustomizedItem,
    setCheckoutStep,
    setOrderType,
    startCheckout,
    startNewOrder,
    submitDemoOrder,
    updateCartItemQuantity,
    updateCheckout,
    updateCustomer,
    updateDeliveryAddress,
    updatePickupDetails,
    updateSchedule,
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrder() {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }

  return context;
}
