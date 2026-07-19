import { useEffect, useState } from "react";

import {
  getAnnouncement,
} from "../services/announcementService";

import supabase from "../lib/supabase";


function AnnouncementBar() {

  const [message, setMessage] = useState(
    "✨ FREE SHIPPING ON ORDERS ABOVE ₹999 ✨"
  );


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
            event: "UPDATE",
            schema: "public",
            table: "announcements",
          },
          (payload) => {


            if (
              payload.new?.message
            ) {

              setMessage(
                payload.new.message
              );

            }

          }
        )
        .subscribe();



    return () => {

      supabase.removeChannel(
        channel
      );

    };


  }, []);



  return (

    <div className="announcement-bar">

      {message}

    </div>

  );

}


export default AnnouncementBar;