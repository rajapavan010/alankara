import { useEffect, useState } from "react";

import {
  getDashboardData,
  getSalesOverview,
} from "../services/dashboardService";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";


function Dashboard() {


  const [dashboard, setDashboard] = useState({

    products: 0,
    orders: 0,
    subscribers: 0,
    revenue: 0,

    orderStatus:{
      pending:0,
      processing:0,
      shipped:0,
      delivered:0,
      cancelled:0,
    },

    recentOrders:[],
    lowStock:[],
salesOverview:[]

  });



  const [loading,setLoading] = useState(true);


  async function loadDashboard(){

    try{

     const data =
  await getDashboardData();


const sales =
  await getSalesOverview();


setDashboard({

  ...data,

  salesOverview:sales

});

    }catch(error){

      console.error(error);

    }finally{

      setLoading(false);

    }

  }


 useEffect(()=>{

    loadDashboard();

  },[]);


  if(loading){

    return (
      <h2>
        Loading dashboard...
      </h2>
    );

  }





  return (

    <div className="dashboard-page">



      <h2>
        Dashboard
      </h2>





      {/* Main Stats */}

      <div className="dashboard-stats">



        <div className="dashboard-card">

          <h3>
            Total Products
          </h3>

          <p>
            {dashboard.products}
          </p>

        </div>




        <div className="dashboard-card">

          <h3>
            Total Orders
          </h3>

          <p>
            {dashboard.orders}
          </p>

        </div>





        <div className="dashboard-card">

          <h3>
            Subscribers
          </h3>

          <p>
            {dashboard.subscribers}
          </p>

        </div>





        <div className="dashboard-card">

          <h3>
            Revenue
          </h3>

          <p>
            ₹{dashboard.revenue}
          </p>

        </div>



      </div>






      {/* Order Status */}

      <h3 className="dashboard-section-title">
        Order Status
      </h3>



      <div className="dashboard-stats">



        <div className="dashboard-card">

          <h3>
            Pending
          </h3>

          <p>
            {dashboard.orderStatus.pending}
          </p>

        </div>





        <div className="dashboard-card">

          <h3>
            Processing
          </h3>

          <p>
            {dashboard.orderStatus.processing}
          </p>

        </div>





        <div className="dashboard-card">

          <h3>
            Shipped
          </h3>

          <p>
            {dashboard.orderStatus.shipped}
          </p>

        </div>





        <div className="dashboard-card">

          <h3>
            Delivered
          </h3>

          <p>
            {dashboard.orderStatus.delivered}
          </p>

        </div>




        <div className="dashboard-card">

          <h3>
            Cancelled
          </h3>

          <p>
            {dashboard.orderStatus.cancelled}
          </p>

        </div>


      </div>







      {/* Low Stock */}


      <h3 className="dashboard-section-title">
        Low Stock Products
      </h3>



      <div className="dashboard-list">


      {
        dashboard.lowStock.length === 0 ? (

          <p>
            All products have enough stock 🎉
          </p>

        ) : (

          dashboard.lowStock.map(
            (product,index)=>(

              <div
                className="dashboard-list-item"
                key={index}
              >

                <span>
                  {product.name}
                </span>


                <strong>
                  {product.stock} left
                </strong>


              </div>

            )

          )

        )
      }


      </div>


      {/* Sales Overview */}


<h3 className="dashboard-section-title">
  Sales Overview
</h3>


<div className="sales-chart-card">


<ResponsiveContainer
  width="100%"
  height={300}
>

<LineChart
  data={dashboard.salesOverview}
>


<CartesianGrid />


<XAxis
  dataKey="date"
/>


<YAxis />


<Tooltip />



<Line
  type="monotone"
  dataKey="revenue"
/>



</LineChart>


</ResponsiveContainer>


</div>



      {/* Recent Orders */}


      <h3 className="dashboard-section-title">
        Recent Orders
      </h3>




      <div className="dashboard-list">



      {
        dashboard.recentOrders.map(
          (order)=>(


            <div
              className="dashboard-list-item"
              key={order.id}
            >


              <span>

                #
                {order.order_number || order.id}

                {" - "}

                {order.customer_first_name}
                {" "}
                {order.customer_last_name}

              </span>



              <strong>

                ₹{order.total}

              </strong>



            </div>


          )
        )
      }



      </div>




    </div>

  );

}


export default Dashboard;