import { useState } from "react";
import {
  PageBody,
  CustomTextInput,
  CustomSelectBox,
  CustomButton,
  CustomCard,
} from "../components/main/custom";
import axios from "axios";

import productCost from "../data/productCost";

function Order() {
  const [data, setData] = useState("");

  const itemTypeData = productCost.map((item) => {
    return item.product;
  });

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

  const handleOrder = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newOrder = Object.fromEntries(formData);
    e.currentTarget.reset();
    createOrder(newOrder);
  };

  const orderState = ["created", "shipped", "delivered", "canceled"];

  return (
    <>
      <PageBody PageTitle={"Create Order"}>
        <div className="flex flex-col gap-5">
          <div className="w-4/5">
            <form onSubmit={handleOrder}>
              <span className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-center">
                <CustomSelectBox
                  label={"Item Type"}
                  name={"itemType"}
                  id={"itemType"}
                  options={itemTypeData}
                ></CustomSelectBox>
                <CustomSelectBox
                  name={"orderState"}
                  id={"orderState"}
                  label={"Order State"}
                  options={orderState}
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
          <div className="mb-5 flex flex-wrap">
            {data && <CustomCard {...data} />}
          </div>
        </div>
      </PageBody>
    </>
  );
}

export default Order;
