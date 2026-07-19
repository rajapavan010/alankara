function OrderDetailsModal({
  open,
  onClose,
  order,
}) {


  if (!open || !order) return null;



  return (

    <div className="modal-overlay">


      <div className="order-details-modal">


        {/* Header */}

        <div className="order-modal-header">


          <h2>
            Order Details
          </h2>


          <button
            onClick={onClose}
            className="modal-close"
          >
            ✕
          </button>


        </div>




        {/* Customer Info */}

        <div className="order-info">


          <h3>
            Order #
            {order.order_number || order.id}
          </h3>



          <p>
            <strong>
              Customer:
            </strong>{" "}
            {order.customer_first_name}{" "}
            {order.customer_last_name}
          </p>



          <p>
            <strong>
              Email:
            </strong>{" "}
            {order.customer_email}
          </p>



          <p>
            <strong>
              Phone:
            </strong>{" "}
            {order.customer_phone}
          </p>



          <p>
            <strong>
              Address:
            </strong>{" "}
            {order.address},{" "}
            {order.city},{" "}
            {order.state} -
            {order.pin_code}
          </p>


        </div>





        {/* Products */}


        <div className="order-products">


          <h3>
            Products
          </h3>



          {
            order.order_items?.map(
              (item)=>(

                <div
                  className="order-item"
                  key={item.id}
                >


                  <div>

                    <p>
                      {item.product_name}
                    </p>


                    <span>
                      Qty: {item.quantity}
                    </span>


                  </div>



                  <p>
                    ₹{item.item_total}
                  </p>


                </div>

              )
            )
          }


        </div>






        {/* Order Summary */}


        <div className="order-summary">


          <div>

            <p>
              Subtotal
            </p>


            <span>
              ₹{order.subtotal}
            </span>

          </div>




          <div>

            <p>
              Shipping
            </p>


            <span>
              ₹{order.shipping}
            </span>

          </div>





          <div className="final-total">


            <p>
              Total
            </p>


            <span>
              ₹{order.total}
            </span>


          </div>


        </div>




      </div>


    </div>

  );

}


export default OrderDetailsModal;