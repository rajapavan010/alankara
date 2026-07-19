import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getSubscribers,
  deleteSubscriber,
} from "../services/newsletterService";


function Newsletter(){

  const [subscribers,setSubscribers] = useState([]);

  const [loading,setLoading] = useState(true);

  const [searchTerm,setSearchTerm] = useState("");

  const [dateFilter,setDateFilter] = useState("all");



  useEffect(()=>{

    loadSubscribers();

  },[]);




  async function loadSubscribers(){

    try{

      const data = await getSubscribers();

      setSubscribers(data);


    }catch(error){

      console.error(error);

      toast.error(
        "Failed to load subscribers"
      );


    }finally{

      setLoading(false);

    }

  }





  async function handleDelete(id){


    const confirmDelete =
      window.confirm(
        "Delete this subscriber?"
      );


    if(!confirmDelete)
      return;



    try{


      await deleteSubscriber(id);



      setSubscribers(
        previous =>
          previous.filter(
            item =>
              item.id !== id
          )
      );



      toast.success(
        "Subscriber deleted"
      );


    }catch(error){

      console.error(error);

      toast.error(
        "Delete failed"
      );

    }

  }






  function exportCSV(){


    const csvData = subscribers.map(
      subscriber => ({

        Email:
          subscriber.email,

        Date:
          new Date(
            subscriber.created_at
          )
          .toLocaleDateString()

      })
    );



    const csv = [

      [
        "Email",
        "Date"
      ],


      ...csvData.map(
        row => [
          row.Email,
          row.Date
        ]
      )


    ]
    .map(
      row => row.join(",")
    )
    .join("\n");




    const blob =
      new Blob(
        [csv],
        {
          type:"text/csv"
        }
      );



    const url =
      URL.createObjectURL(blob);



    const link =
      document.createElement("a");


    link.href = url;

    link.download =
      "newsletter_subscribers.csv";


    link.click();

  }





  const filteredSubscribers =
    subscribers.filter(
      subscriber => {


        const matchesSearch =
          subscriber.email
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );



        const date =
          new Date(
            subscriber.created_at
          );



        const now =
          new Date();



        let matchesDate = true;



        if(dateFilter==="month"){


          matchesDate =
            date.getMonth()
            ===
            now.getMonth()
            &&
            date.getFullYear()
            ===
            now.getFullYear();


        }



        if(dateFilter==="30days"){


          const diff =
            now - date;


          matchesDate =
            diff <=
            30 *
            24 *
            60 *
            60 *
            1000;


        }




        return (
          matchesSearch
          &&
          matchesDate
        );


      }
    );






  if(loading){

    return (
      <h2>
        Loading subscribers...
      </h2>
    );

  }





  return (

    <div className="newsletter-page">



      <div className="newsletter-header">


        <div>

          <h2>
            Newsletter
          </h2>


          <p>
            {filteredSubscribers.length}
            subscribers found
          </p>


        </div>



        <button
          className="export-btn"
          onClick={exportCSV}
        >
          Export CSV
        </button>


      </div>






      <div className="dashboard-card newsletter-count-card">

        <h3>
          Total Subscribers
        </h3>


        <p>
          {subscribers.length}
        </p>


      </div>







      <div className="newsletter-filters">


        <input

          className="newsletter-search"

          placeholder="Search email..."

          value={searchTerm}

          onChange={(e)=>
            setSearchTerm(
              e.target.value
            )
          }

        />



        <select

          value={dateFilter}

          onChange={(e)=>
            setDateFilter(
              e.target.value
            )
          }

        >

          <option value="all">
            All Time
          </option>


          <option value="month">
            This Month
          </option>


          <option value="30days">
            Last 30 Days
          </option>


        </select>


      </div>







      <div className="newsletter-table-wrapper">


        <table className="newsletter-table">


          <thead>

            <tr>

              <th>
                Email
              </th>


              <th>
                Joined Date
              </th>


              <th>
                Action
              </th>


            </tr>

          </thead>




          <tbody>


          {
            filteredSubscribers.map(
              subscriber => (

                <tr
                  key={subscriber.id}
                >

                  <td>
                    {subscriber.email}
                  </td>


                  <td>

                    {
                      new Date(
                        subscriber.created_at
                      )
                      .toLocaleDateString()
                    }

                  </td>


                  <td>

                    <button

                      className="delete-order-btn"

                      onClick={()=>
                        handleDelete(
                          subscriber.id
                        )
                      }

                    >
                      Delete
                    </button>


                  </td>


                </tr>

              )
            )
          }


          </tbody>


        </table>


      </div>


    </div>

  );

}


export default Newsletter;