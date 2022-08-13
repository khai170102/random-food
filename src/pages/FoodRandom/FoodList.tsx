import { Button, Card, Input, List, Spin } from "antd";
import { IconMap } from "antd/lib/result";
import { useContext, useState } from "react";
import { FoodContext } from "../../context/food";
import { DeleteFilled, EditFilled } from "@ant-design/icons";

export const FoodList = ({ setListFood }: { setListFood: any }) => {
  const foodContext = useContext(FoodContext);
  const [needUpdated, setNeedUpdate] = useState<string>();

  const [updatedFood, setUpdatedFood] = useState("");
  const [displayEdit, setDisplayEdit] = useState(true);

  console.log(foodContext);
  const handleDelete = (item: string) => {
    setDisplayEdit(true);
    let newData = foodContext.listFood.filter((food) => food != item);

    setListFood(newData);
  };
  const handleEdit = (item: string) => {
    setDisplayEdit(false);
    setNeedUpdate(item);
  };
  const handleSubmit = () => {
    setDisplayEdit(true);
    let newEdit = foodContext.listFood.map((food) => {
      if (food === needUpdated) {
        food = updatedFood;
      }
      return food;
    });
    setListFood(newEdit);
  };

  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={foodContext.listFood}
        renderItem={(item) => (
          <List.Item
            actions={[
              <EditFilled
                onClick={() => handleEdit(item)}
                style={{ fontSize: 16 }}
              />,
              <DeleteFilled
                onClick={() => handleDelete(item)}
                style={{ fontSize: 16 }}
              />,
            ]}
          >
            <List.Item.Meta title={<a>{item}</a>} />
          </List.Item>
        )}
      />
      <div className={`${displayEdit ? "hidden" : "block"}`}>
        <Input
          placeholder="Name of the new food"
          onChange={(value) => setUpdatedFood(value.currentTarget.value)}
        />
        <Button type="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};
