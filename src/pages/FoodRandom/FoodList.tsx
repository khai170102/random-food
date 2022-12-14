import { Input, List, message, Modal } from "antd";
import { useContext, useState } from "react";
import { FoodContext } from "../../context/food";
import { DeleteFilled, EditFilled } from "@ant-design/icons";

export const FoodList = ({ setListFood }: { setListFood: any }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>();
  const [newFoodName, setNewFoodName] = useState<string>();

  const foodContext = useContext(FoodContext);

  const handleDelete = (item: string) => {
    let newData = foodContext.listFood.filter((food) => food != item);

    setListFood(newData);
  };

  const handleEdit = (item: string) => {
    setSelectedItem(item);
    setNewFoodName(item);
    setIsModalVisible(true);
  };

  const handleSave = () => {
    if (
      foodContext.listFood.some(
        (food) => food.toLowerCase() === newFoodName?.toLowerCase()
      )
    ) {
      message.warning("This product already in the list", 0.5);
      return;
    }

    setIsModalVisible(false);

    const updateListFood = foodContext.listFood.map((food) => {
      if (food === selectedItem) {
        return newFoodName;
      }

      return food;
    });

    setListFood(updateListFood);
  };

  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={foodContext.listFood}
        renderItem={(item) => (
          <List.Item
            actions={
              !foodContext.isSelectingFood
                ? [
                    <EditFilled
                      onClick={() => handleEdit(item)}
                      style={{ fontSize: 16 }}
                    />,
                    <DeleteFilled
                      onClick={() => handleDelete(item)}
                      style={{ fontSize: 16 }}
                    />,
                  ]
                : []
            }
          >
            <List.Item.Meta
              title={
                <strong
                  style={{
                    color:
                      foodContext.selectedFood === item ? "green" : "black",
                  }}
                >
                  {item}
                </strong>
              }
            />
          </List.Item>
        )}
      />

      <Modal
        title=""
        visible={isModalVisible}
        onOk={handleSave}
        cancelText=""
        okText="Save"
        onCancel={() => setIsModalVisible(false)}
        closable={false}
        okButtonProps={{ disabled: !(newFoodName && newFoodName.length > 0) }}
      >
        <Input
          placeholder="Input an Update Food Name"
          value={newFoodName}
          onChange={(event) => setNewFoodName(event.currentTarget.value)}
        />
      </Modal>
    </div>
  );
};
