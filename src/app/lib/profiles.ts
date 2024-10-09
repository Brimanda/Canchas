// api/profiles.ts

import { supabase } from "./supabase";

export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("user_type")
    .eq("id", userId) 
    .single();

  if (error) {
    console.error("Error al obtener el perfil del usuario:", error);
    return null;
  }

  return data;
};
