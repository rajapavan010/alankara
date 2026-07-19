import supabase from "../../lib/supabase";


// =========================================
// Get Store Settings
// =========================================

export async function getSettings() {

  const { data, error } = await supabase
    .from("store_settings")
    .select("*")
    .single();


  if (error) {
    throw error;
  }


  return data;

}





// =========================================
// Update Store Settings
// =========================================

export async function updateSettings(settings) {


  const { data, error } = await supabase
    .from("store_settings")
    .update({

      store_name:
        settings.store_name,


      email:
        settings.email,


      phone:
        settings.phone,


      whatsapp:
        settings.whatsapp,


      instagram:
        settings.instagram,


      address:
        settings.address,


      updated_at:
        new Date(),

    })
    .eq(
      "id",
      settings.id
    )
    .select()
    .single();



  if (error) {
    throw error;
  }



  return data;

}