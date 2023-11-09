import { useState } from "react";
import {
  PageBody,
  CustomTextInput,
  CustomSelectBox,
  CustomButton,
  CustomCard,
} from "../components/main/custom";
import axios from "axios";
import { useSelector } from "react-redux";

function Order() {
  const [data, setData] = useState("");
  const { itemTypeOptions, orderStateOptions } = useSelector(
    (store) => store.allOrders
  );

  // creating a new order by sending request to db
  const createOrder = async (newOrder) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + `orders`,
        { ...newOrder }
      );
      const data = await response.data;
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  // handle the form data for creating a new order
  const handleOrder = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newOrder = Object.fromEntries(formData);
    e.currentTarget.reset();
    createOrder(newOrder);
  };

  return (
    <PageBody PageTitle={"Create Order"}>
      <div className="flex flex-col gap-5">
        {/* create order form */}
        <div>
          <form onSubmit={handleOrder}>
            <span className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-center">
              <CustomSelectBox
                label={"Item Type"}
                name={"itemType"}
                id={"itemType"}
                options={itemTypeOptions}
              ></CustomSelectBox>
              <CustomSelectBox
                name={"orderState"}
                id={"orderState"}
                label={"Order State"}
                options={orderStateOptions}
              ></CustomSelectBox>
              <CustomTextInput
                name={"branch"}
                id={"branch"}
                label={"Branch Name:"}
                placeholder={"Please enter branch name"}
              ></CustomTextInput>
              <CustomTextInput
                name={"customerID"}
                id={"customerID"}
                label={"Customer ID:"}
                placeholder={`Please enter customer's ID`}
              ></CustomTextInput>
            </span>
            <CustomButton
              btnBGColor={"bg-green-500"}
              label={"Submit"}
              customClass={"hover:bg-green-400"}
              type={"submit"}
            ></CustomButton>
          </form>
        </div>
        {/* newly added data */}
        <div className="mb-5 flex flex-wrap">
          {data && (
            <CustomCard
              {...data}
              badge={true}
              badgeColor={"bg-green-300"}
              badgeText={"New Order"}
            />
          )}
        </div>
      </div>
    </PageBody>
  );
}

export default Order;
