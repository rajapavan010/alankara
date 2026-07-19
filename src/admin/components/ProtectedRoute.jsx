import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import supabase from "../../lib/supabase";


function ProtectedRoute({ children }) {

  const [session, setSession] = useState(null);

  const [loading, setLoading] = useState(true);



  useEffect(() => {


    async function checkSession() {

      console.log("Checking session...");


      const {
        data,
        error
      } = await supabase.auth.getSession();



      console.log(
        "Session data:",
        data
      );


      console.log(
        "Session error:",
        error
      );



      setSession(
        data.session
      );


      setLoading(false);

    }



    checkSession();



    const {
      data: listener
    } =
    supabase.auth.onAuthStateChange(
      (_event, session) => {


        console.log(
          "Auth state changed:",
          session
        );


        setSession(session);


        setLoading(false);


      }
    );



    return () => {

      listener.subscription.unsubscribe();

    };


  }, []);




  if(loading){

    return (

      <h2>
        Checking access...
      </h2>

    );

  }




  if(!session){

    return (

      <Navigate
        to="/admin"
        replace
      />

    );

  }




  return children;


}


export default ProtectedRoute;