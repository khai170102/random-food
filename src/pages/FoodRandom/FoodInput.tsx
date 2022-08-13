import { CaretRightFilled } from "@ant-design/icons";
import { Input, Button, message } from "antd";
import { useContext, useState } from "react";
import { FoodContext } from "../../context/food";

export const FoodInput = ({
  setListFood,
  setSelectedFood,
  setIsSelectingFood,
}: {
  setListFood: any;
  setSelectedFood: any;
  setIsSelectingFood: any;
}) => {
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

    setNewFood("");
    setListFood([...foodContext.listFood, newFood]);
  };

  const handleDelete = () => {
    setListFood([]);
  };

  const randomFood = () => {
    setIsSelectingFood(true);
  };

  return (
    <>
      <div className="flex md:flex-row md:space-x-5 space-x-0 flex-col">
        <Input
          placeholder="Name of the new food"
          value={newFood}
          onChange={(value) => setNewFood(value.currentTarget.value)}
        />
        <div className="flex flex-row space-x-3 mt-5 md:mt-0">
          <Button
            type="primary"
            onClick={handleSubmit}
            disabled={!!!newFood || foodContext.isSelectingFood}
          >
            Add New Food
          </Button>
          <Button
            type="primary"
            danger
            onClick={handleDelete}
            disabled={foodContext.isSelectingFood}
          >
            Delete All
          </Button>
        </div>
      </div>

      {foodContext.listFood.length > 0 && (
        <div className="mt-3">
          <Button
            type="primary"
            shape="circle"
            icon={<CaretRightFilled />}
            disabled={foodContext.isSelectingFood}
            onClick={randomFood}
          />
        </div>
      )}
    </>
  );
};
