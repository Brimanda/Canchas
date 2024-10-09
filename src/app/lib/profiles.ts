// api/profiles.ts

import { supabase } from "./supabase";

export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("userType")
    .eq("id", userId) // Asegúrate de que el ID coincide con el que tienes en tu tabla
    .single();

  if (error) {
    console.error("Error al obtener el perfil del usuario:", error);
    return null;
  }

  return data;
};
