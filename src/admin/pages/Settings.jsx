import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getSettings,
  updateSettings,
} from "../services/settingsService";

import {
  getAnnouncement,
  updateAnnouncement,
} from "../../services/announcementService";


function Settings() {


  const [settings, setSettings] = useState(null);

  const [announcement, setAnnouncement] = useState("");

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);


  async function loadSettings() {

    try {


      const data = await getSettings();


      console.log(
        "Store settings:",
        data
      );


      setSettings(data);



      try {

        const announcementData =
          await getAnnouncement();


        console.log(
          "Announcement:",
          announcementData
        );


        setAnnouncement(
          announcementData?.message || ""
        );


      } catch(error) {


        console.error(
          "Announcement error:",
          error
        );


        setAnnouncement("");

      }



    } catch(error) {


      console.error(
        "Settings error:",
        error
      );


      toast.error(
        "Failed to load store settings"
      );


    } finally {


      setLoading(false);


    }

  }



  useEffect(() => {

    loadSettings();

  }, []);



  function handleChange(e) {


    setSettings({

      ...settings,

      [e.target.name]:
        e.target.value

    });


  }







  async function handleSave(){

  try{

    setSaving(true);


    await updateSettings(
      settings
    );


    toast.success(
      "Store settings updated"
    );


  }catch(error){

    console.error(
      "Settings update error:",
      error
    );


    toast.error(
      "Failed to update store settings"
    );


  }finally{

    setSaving(false);

  }

}







  if(loading) {


    return (

      <h2>
        Loading settings...
      </h2>

    );


  }






  if(!settings) {


    return (

      <h2>
        Settings not found
      </h2>

    );


  }








  return (

    <div className="settings-page">


      <h2>
        Settings
      </h2>






      <div className="settings-card">


        <h3>
          Store Information
        </h3>




        <div className="settings-grid">



          <div>

            <label>
              Store Name
            </label>


            <input

              name="store_name"

              value={
                settings?.store_name || ""
              }

              onChange={handleChange}

            />

          </div>







          <div>

            <label>
              Email
            </label>


            <input

              name="email"

              value={
                settings?.email || ""
              }

              onChange={handleChange}

            />

          </div>







          <div>

            <label>
              Phone
            </label>


            <input

              name="phone"

              value={
                settings?.phone || ""
              }

              onChange={handleChange}

            />

          </div>







          <div>

            <label>
              WhatsApp
            </label>


            <input

              name="whatsapp"

              value={
                settings?.whatsapp || ""
              }

              onChange={handleChange}

            />

          </div>







          <div>

            <label>
              Instagram
            </label>


            <input

              name="instagram"

              value={
                settings?.instagram || ""
              }

              onChange={handleChange}

            />

          </div>







          <div className="full-width">

            <label>
              Address
            </label>


            <textarea

              name="address"

              value={
                settings?.address || ""
              }

              onChange={handleChange}

            />

          </div>



        </div>



      </div>









      <div className="settings-card">


  <h3>
    Announcement Bar
  </h3>


  <div className="settings-field full-width">

    <label>
      Announcement Text
    </label>


    <input

      type="text"

      value={announcement}

      onChange={(e)=>
        setAnnouncement(
          e.target.value
        )
      }

      placeholder="Enter announcement text"

    />


    <button
  className="save-settings-btn"
  onClick={async()=>{

    try{

      await updateAnnouncement(
        announcement
      );

      toast.success(
        "Announcement updated"
      );

    }catch(error){

      console.error(
        "Announcement update error:",
        error
      );

      toast.error(
        "Failed to update announcement"
      );

    }

  }}
>
  Save Announcement
</button>

  </div>


</div>








      <button

        className="save-settings-btn"

        onClick={handleSave}

        disabled={saving}


      >

        {
          saving
          ?
          "Saving..."
          :
          "Save Changes"
        }


      </button>




    </div>

  );

}


export default Settings;