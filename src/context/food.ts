import React from "react";

export const FoodContext = React.createContext<{ listFood: Array<string> }>({
  listFood: [],
});
