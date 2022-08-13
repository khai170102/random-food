import { Input, List, Modal } from "antd";
import { useContext, useState } from "react";
import { FoodContext } from "../../context/food";
import { DeleteFilled, EditFilled } from "@ant-design/icons";

export const FoodList = ({ setListFood }: { setListFood: any }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>()
  const [newFoodName, setNewFoodName] = useState<string>()

  const foodContext = useContext(FoodContext);

  const handleDelete = (item: string) => {
    let newData = foodContext.listFood.filter((food) => food != item);

    setListFood(newData);
  };

  const handleEdit = (item: string) => {
    setSelectedItem(item)
    setNewFoodName(item)
    setIsModalVisible(true)
  };

  const handleSave = () => {
    setIsModalVisible(false);

    const updateListFood = foodContext.listFood.map((food) => {
      if (food === selectedItem) {
        return newFoodName
      }
    })

    setListFood(updateListFood)
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
            <List.Item.Meta title={<strong>{item}</strong>} />
          </List.Item>
        )}
      />

      <Modal title="" visible={isModalVisible} onOk={handleSave} cancelText="" okText="Save" onCancel={() => setIsModalVisible(false)} closable={false} okButtonProps={{ disabled: !(newFoodName && newFoodName.length > 0) }}>
        <Input placeholder="Input an Update Food Name" value={newFoodName} onChange={(event) => setNewFoodName(event.currentTarget.value)} />
      </Modal>
    </div>
  );
};
