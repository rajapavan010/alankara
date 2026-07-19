import { useNavigate } from "react-router-dom";
import supabase from "../../lib/supabase";

function Topbar() {

  const navigate = useNavigate();


  const logout = async () => {

    await supabase.auth.signOut();

    navigate("/admin");

  };


  return (

    <header className="admin-topbar">


      <div>

        <h1>
          Alankara Admin
        </h1>

      </div>



      <button

        className="logout-btn"

        onClick={logout}

      >

        Logout

      </button>



    </header>

  );

}


export default Topbar;