import "antd/dist/antd.css";
import { useState } from "react";
import { FoodContext } from "./context/food";

import { FoodList, FoodInput } from "./pages/FoodRandom";

function App() {
  const [listFood, setListFood] = useState([]);
  const [selectedFood, setSelectedFood] = useState<string | undefined>();
  const [isSelectingFood, setIsSelectingFood] = useState<boolean>(false);

  return (
    <div className="py-5 px-3 max-w-screen-md w-sm-100">
      <FoodContext.Provider value={{ listFood, selectedFood, isSelectingFood }}>
        <div className="mb-5">
          <FoodInput
            setListFood={setListFood}
            setSelectedFood={setSelectedFood}
            setIsSelectingFood={setIsSelectingFood}
          />
        </div>

        <FoodList setListFood={setListFood} />
      </FoodContext.Provider>
    </div>
  );
}

export default App;
