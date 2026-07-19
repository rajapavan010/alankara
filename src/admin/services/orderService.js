import supabase from "../../lib/supabase";


export async function getOrders(){

  const {data,error}=await supabase
    .from("orders")
    .select(`
      *,
      order_items(*)
    `)
    .order(
      "created_at",
      {
        ascending:false
      }
    );


  if(error)
    throw error;


  return data;

}



export async function updateOrderStatus(
  orderId,
  status
){


  // Get current order details

  const { data: order, error: fetchError } =
    await supabase
      .from("orders")
      .select(`
        id,
        status,
        stock_updated,
        order_items(
          product_id,
          quantity
        )
      `)
      .eq(
        "id",
        orderId
      )
      .single();



  if(fetchError)
    throw fetchError;



  // Reduce stock only when confirming first time

  if(
    order.status === "pending" &&
    status === "confirmed" &&
    !order.stock_updated
  ){


    for(
      const item of order.order_items
    ){


      // Get current stock

      const { data: product, error: productError } =
        await supabase
          .from("products")
          .select("stock")
          .eq(
            "id",
            item.product_id
          )
          .single();



      if(productError)
        throw productError;



      const newStock =
        Number(product.stock) -
        Number(item.quantity);



      // Update stock

      const { error:updateError } =
        await supabase
          .from("products")
          .update({

            stock:newStock

          })
          .eq(
            "id",
            item.product_id
          );



      if(updateError)
        throw updateError;


    }



    // Mark stock as updated

    const { error:stockError } =
      await supabase
        .from("orders")
        .update({

          stock_updated:true

        })
        .eq(
          "id",
          orderId
        );



    if(stockError)
      throw stockError;


  }





  // Update order status

  const { data,error } =
    await supabase
      .from("orders")
      .update({

        status:status,

        updated_at:
          new Date().toISOString(),

      })
      .eq(
        "id",
        orderId
      )
      .select();



  if(error)
    throw error;



  return data;

} 

export async function deleteOrder(orderId){

  console.log(
    "Deleting order:",
    orderId
  );


  const { data, error } = await supabase
    .from("orders")
    .delete()
    .eq(
      "id",
      orderId
    )
    .select();



  console.log(
    "Delete response:",
    data
  );


  console.log(
    "Delete error:",
    error
  );



  if(error)
    throw error;


  return data;

}