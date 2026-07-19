import supabase from "../../lib/supabase";


export async function getSubscribers(){

  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .select("*")
    .order(
      "created_at",
      {
        ascending:false
      }
    );


  if(error)
    throw error;


  return data;

}



export async function deleteSubscriber(id){

  const { error } = await supabase
    .from("newsletter_subscribers")
    .delete()
    .eq(
      "id",
      id
    );


  if(error)
    throw error;

}