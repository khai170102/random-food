import { Input, Button, message } from "antd";
import { useContext, useState } from "react";
import { FoodContext } from "../../context/food";

export const FoodInput = ({ setListFood }: { setListFood: any }) => {
  const [newFood, setNewFood] = useState<string>();
  const foodContext = useContext(FoodContext);
  const handleSubmit = () => {
    if (!newFood || newFood.length === 0) {
      return;
    }

    if (
      foodContext.listFood.find(
        (food) => food.toLowerCase() === newFood.toLowerCase()
      )
    ) {
      message.warning("This product already in the list", 0.5);
      return;
    }

    setListFood([...foodContext.listFood, newFood]);
  };

  const handleDelete = () => {
    setListFood([]);
  };

  return (
    <div className="flex md:flex-row md:space-x-5 space-x-0 flex-col">
      <Input
        placeholder="Name of the new food"
        onChange={(value) => setNewFood(value.currentTarget.value)}
      />
      <div className="flex flex-row space-x-3 mt-5 md:mt-0">
        <Button type="primary" onClick={handleSubmit}>
          Add New Food
        </Button>
        <Button type="primary" danger onClick={handleDelete}>
          Delete All
        </Button>
      </div>
    </div>
  );
};