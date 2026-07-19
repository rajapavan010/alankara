import supabase from "../../lib/supabase";


export async function getDashboardData(){


  const [
    products,
    orders,
    subscribers,
    revenue,
    recentOrders,
    lowStock
  ] = await Promise.all([


    supabase
      .from("products")
      .select("*"),


    supabase
      .from("orders")
      .select("status"),


    supabase
      .from("newsletter_subscribers")
      .select("*", {
        count:"exact",
        head:true
      }),


    supabase
      .from("orders")
      .select("total"),



    supabase
      .from("orders")
      .select(`
        id,
        order_number,
        customer_first_name,
        customer_last_name,
        total,
        status,
        created_at
      `)
      .order(
        "created_at",
        {
          ascending:false
        }
      )
      .limit(5),



    supabase
      .from("products")
      .select(`
        name,
        stock
      `)
      .lte(
        "stock",
        5
      )


  ]);



  return {


    products:
      products.data?.length || 0,


    orders:
      orders.data?.length || 0,


    subscribers:
      subscribers.count || 0,


    revenue:
      revenue.data?.reduce(
        (sum,item)=>
          sum + Number(item.total || 0),
        0
      ) || 0,


    orderStatus:{

      pending:
        orders.data?.filter(
          o=>o.status==="pending"
        ).length || 0,


      processing:
        orders.data?.filter(
          o=>o.status==="processing"
        ).length || 0,


      shipped:
        orders.data?.filter(
          o=>o.status==="shipped"
        ).length || 0,


      delivered:
        orders.data?.filter(
          o=>o.status==="delivered"
        ).length || 0,


      cancelled:
        orders.data?.filter(
          o=>o.status==="cancelled"
        ).length || 0,

    },


    recentOrders:
      recentOrders.data || [],


    lowStock:
      lowStock.data || []

  };

}



export async function getSalesOverview(){

  const { data, error } = await supabase
    .from("orders")
    .select(
      "total, created_at"
    )
    .order(
      "created_at",
      {
        ascending:true
      }
    );


  if(error)
    throw error;



  const sales = {};



  data.forEach((order)=>{


    const date =
      new Date(order.created_at)
      .toLocaleDateString(
        "en-IN",
        {
          day:"2-digit",
          month:"short"
        }
      );



    if(!sales[date]){

      sales[date]=0;

    }



    sales[date] += Number(order.total || 0);



  });



  return Object.keys(sales)
    .map((date)=>({

      date,

      revenue:sales[date]

    }));

}