import { useEffect, useState } from "react";

import {
  getAnnouncement,
} from "../services/announcementService";

import supabase from "../lib/supabase";


function AnnouncementBar() {

  const [message, setMessage] = useState(null);

  const [loading, setLoading] = useState(true);



  useEffect(() => {


    async function loadAnnouncement() {

      try {

        const data =
          await getAnnouncement();


        if (data?.message) {

          setMessage(
            data.message
          );

        }


      } catch(error) {

        console.error(
          "Announcement load error:",
          error
        );


        // fallback only if Supabase fails

        setMessage(
          "✨ FREE SHIPPING ON ORDERS ABOVE ₹999 ✨"
        );


      } finally {

        setLoading(false);

      }

    }



    loadAnnouncement();




    const channel =
      supabase
        .channel(
          "announcement-realtime"
        )
        .on(
          "postgres_changes",
          {
            event:"UPDATE",
            schema:"public",
            table:"announcements",
          },

          (payload)=>{


            if(payload.new?.message){

              setMessage(
                payload.new.message
              );

            }


          }

        )
        .subscribe();



    return ()=>{

      supabase.removeChannel(
        channel
      );

    };


  }, []);




  if(loading || !message){

    return null;

  }




  return (

    <div className="announcement-bar">

      {message}

    </div>

  );

}


export default AnnouncementBar;