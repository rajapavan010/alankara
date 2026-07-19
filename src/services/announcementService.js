import supabase from "../lib/supabase";


// =========================================
// Get Active Announcement
// =========================================

export async function getAnnouncement(){


  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .eq(
      "is_active",
      true
    )
    .limit(1)
    .single();



  if(error)
    throw error;



  return data;

}




// =========================================
// Update Announcement
// =========================================

export async function updateAnnouncement(message) {

  const { data, error } = await supabase
    .from("announcements")
    .update({
      message: message,
      updated_at: new Date(),
    })
    .eq(
      "is_active",
      true
    )
    .select();


  console.log(
    "Announcement update data:",
    data
  );


  console.log(
    "Announcement update error:",
    error
  );


  if(error){
    throw error;
  }


  return data;

}