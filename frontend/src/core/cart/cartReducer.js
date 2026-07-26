const initialState = {
  items: [],
  totalItems: 0,
  subtotal: 0,
  tax: 0,
  deliveryCharge: 0,
  discount: 0,
  grandTotal: 0,
  loading: false,
  error: null,
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_CART":
      return {
        ...state,
        ...action.payload,
        loading: false,
        error: null,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case "CLEAR_CART":
      return {
        ...initialState,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
}
