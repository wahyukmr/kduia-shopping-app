import React, { createContext, useReducer } from "react";

// 5. Reducer - digunakan untuk memperbarui state berdasarkan aksi
export const AppReducer = (state, action) => {
  let new_expenses = [];

  switch (action.type) {
    case "ADD_QUANTITY":
      // eslint-disable-next-line no-unused-vars
      let updatedqty = false;
      state.expenses.map((expense) => {
        if (expense.name === action.payload.name) {
          expense.quantity = expense.quantity + action.payload.quantity;
          updatedqty = true;
        }
        new_expenses.push(expense);
        return true;
      });
      state.expenses = new_expenses;
      action.type = "DONE";
      return {
        ...state,
      };

    case "RED_QUANTITY":
      state.expenses.map((expense) => {
        if (expense.name === action.payload.name) {
          expense.quantity = expense.quantity - action.payload.quantity;
        }
        expense.quantity = expense.quantity < 0 ? 0 : expense.quantity;
        new_expenses.push(expense);
        return true;
      });
      state.expenses = new_expenses;
      action.type = "DONE";
      return {
        ...state,
      };

    case "DELETE_ITEM":
      state.expenses.map((expense) => {
        if (expense.name === action.payload.name) {
          expense.quantity = 0;
        }
        new_expenses.push(expense);
        return true;
      });
      state.expenses = new_expenses;
      action.type = "DONE";
      return {
        ...state,
      };

    case "CHG_LOCATION":
      action.type = "DONE";
      state.Location = action.payload;
      return {
        ...state,
      };

    default:
      return state;
  }
};

// 1. Menetapkan state awal saat aplikasi dimuat
const initialState = {
  expenses: [
    { id: "Shirt", name: "Shirt", quantity: 0, unitprice: 500 },
    { id: "Jeans", name: "Jeans", quantity: 0, unitprice: 300 },
    { id: "Dress", name: "Dress", quantity: 0, unitprice: 400 },
    { id: "Dinner set", name: "Dinner set", quantity: 0, unitprice: 600 },
    { id: "Bags", name: "Bags", quantity: 0, unitprice: 200 },
  ],
  Location: "£",
};

// 2. Membuat konteks menggunakan fungsi createContext, yang akan digunakan oleh komponen untuk mengakses state
export const AppContext = createContext();

/*
 * 3. Komponen AppProvider
 Pengertian: komponen ini merupakan inti dari manajemen state - melingkupi komponen-komponen yang perlu mengakses state.
 useReducer: digunakan untuk mengelola pembaruan state. Ini menerima dua argumen - fungsi reducer (AppReducer) dan state awal (initialState). Hasil dari hook useReducer adalah objek state (state) dan fungsi dispatch (dispatch) yang digunakan untuk mengirim aksi ke reducer.
*/
export const AppProvider = (props) => {
  // 4. Menyiapkan state aplikasi dengan useReducer dan initialState
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <AppContext.Provider
      value={{
        expenses: state.expenses,
        dispatch,
        Location: state.Location,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
