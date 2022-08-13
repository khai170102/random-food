import React from "react";

export const FoodContext = React.createContext<{
  listFood: Array<string>;
  selectedFood: string | undefined;
  isSelectingFood: boolean;
}>({
  listFood: [],
  selectedFood: undefined,
  isSelectingFood: false,
});
