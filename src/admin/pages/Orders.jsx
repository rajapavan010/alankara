import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getOrders,
  updateOrderStatus,
  deleteOrder,
} from "../services/orderService";

import OrderDetailsModal from "../components/OrderDetailsModal";


function Orders() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
const [showOrderModal, setShowOrderModal] = useState(false);
const [searchTerm, setSearchTerm] = useState("");
const [statusFilter, setStatusFilter] = useState("all");



  useEffect(() => {
    loadOrders();
  }, []);



  async function loadOrders(){

    try {

      const data = await getOrders();

      setOrders(data);

    } catch(error){

      console.error(error);
      toast.error("Failed to load orders");

    } finally {

      setLoading(false);

    }

  }



  async function changeStatus(
  orderId,
  status
){

  try {


    const updatedOrder = await updateOrderStatus(
  orderId,
  status
);

console.log(
  "Updated from service:",
  updatedOrder
);



    setOrders((previousOrders)=>

      previousOrders.map((order)=>

        order.id === orderId

        ? {
            ...order,
            status
          }

        : order

      )

    );



    toast.success(
      "Order status updated"
    );


  } catch(error){

    console.error(error);

    toast.error(
      "Failed to update order status"
    );

  }

}




  if(loading){

    return (
      <h2>
        Loading orders...
      </h2>
    );

  }

  async function handleDelete(orderId){

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this order?"
  );


  if(!confirmDelete)
    return;


  try{


    await deleteOrder(orderId);



    setOrders((previousOrders)=>

      previousOrders.filter(
        (order)=>
          order.id !== orderId
      )

    );


    toast.success(
      "Order deleted successfully"
    );


  }catch(error){

    console.error(error);

    toast.error(
      "Failed to delete order"
    );

  }

}

const filteredOrders = orders.filter((order)=>{


  const search =
    searchTerm.toLowerCase();


  const matchesSearch =

    order.order_number
      ?.toLowerCase()
      .includes(search)

    ||

    order.customer_first_name
      ?.toLowerCase()
      .includes(search)

    ||

    order.customer_last_name
      ?.toLowerCase()
      .includes(search)

    ||

    order.customer_email
      ?.toLowerCase()
      .includes(search)

    ||

    order.customer_phone
      ?.includes(search);



  const matchesStatus =

    statusFilter === "all"

    ||

    order.status === statusFilter;



  return matchesSearch && matchesStatus;

});


  return (

    <div className="orders-page">

      <OrderDetailsModal
  open={showOrderModal}
  order={selectedOrder}
  onClose={()=>{
    setShowOrderModal(false);
    setSelectedOrder(null);
  }}
/>


      <div className="orders-header">

  <div>
    <h2>
      Orders
    </h2>

    <p>
      {filteredOrders.length} orders found
    </p>
  </div>


  <div className="orders-filters">


    <input
      type="text"
      placeholder="Search order, customer, email..."
      value={searchTerm}
      onChange={(e)=>
        setSearchTerm(e.target.value)
      }
    />



    <select
      value={statusFilter}
      onChange={(e)=>
        setStatusFilter(e.target.value)
      }
    >

      <option value="all">
        All Status
      </option>

      <option value="pending">
        Pending
      </option>

      <option value="confirmed">
        Confirmed
      </option>

      <option value="processing">
        Processing
      </option>

      <option value="shipped">
        Shipped
      </option>

      <option value="delivered">
        Delivered
      </option>

      <option value="cancelled">
        Cancelled
      </option>


    </select>


  </div>


</div>




      <div className="orders-table-wrapper">


        <table className="orders-table">


          <thead>

            <tr>

              <th>
                Order ID
              </th>

              <th>
                Customer
              </th>

              <th>
                Email
              </th>

              <th>
                Items
              </th>

              <th>
                Amount
              </th>

              <th>
                Status
              </th>

              <th>
                Date
              </th>
              <th>Action</th>


            </tr>
            


          </thead>



          <tbody>


          {
            filteredOrders.map((order)=>(

              <tr key={order.id}>


                <td>
                  #{order.order_number || order.id}
                </td>



                <td>

                  {order.customer_first_name}
                  {" "}
                  {order.customer_last_name}

                </td>



                <td>
                  {order.customer_email}
                </td>




                <td>

                  {order.order_items?.length || 0}

                </td>



                <td>

                  ₹{order.total}

                </td>




                <td>


                  <select

                    value={order.status}

                    onChange={(e)=>
                      changeStatus(
                        order.id,
                        e.target.value
                      )
                    }

                  >

                    <option value="pending">
                      Pending
                    </option>


                    <option value="confirmed">
                      Confirmed
                    </option>


                    <option value="processing">
                      Processing
                    </option>


                    <option value="shipped">
                      Shipped
                    </option>


                    <option value="delivered">
                      Delivered
                    </option>


                    <option value="cancelled">
                      Cancelled
                    </option>


                  </select>


                </td>




                <td>

                  {
                    new Date(
                      order.created_at
                    ).toLocaleDateString()
                  }

                </td>

                <td>

  <div className="action-buttons">

    <button
      className="view-order-btn"
      onClick={() => {
        setSelectedOrder(order);
        setShowOrderModal(true);
      }}
    >
      View
    </button>


    <button
      className="delete-order-btn"
      onClick={() => handleDelete(order.id)}
    >
      Delete
    </button>

  </div>

</td>



              </tr>


            ))
          }


          </tbody>


        </table>


      </div>


    </div>
    


  );

}


export default Orders;