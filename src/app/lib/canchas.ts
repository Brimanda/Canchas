import { supabase } from "./supabase"; // Asegúrate de importar tu cliente Supabase

export async function getCanchas() {
  const { data, error } = await supabase.from("canchas").select("*");
  if (error) throw error;
  return data;
}

export async function getCanchaById(canchaId: number) {
  const { data, error } = await supabase
    .from("canchas")
    .select("*")
    .eq("id", canchaId)
    .single();
  if (error) throw error;
  return data;
}

export async function createCancha(canchaData: any) {
  const { data, error } = await supabase.from("canchas").insert([canchaData]);
  if (error) throw error;
  return data;
}

export async function updateCancha(canchaId: number, updatedData: any) {
  const { data, error } = await supabase
    .from("canchas")
    .update(updatedData)
    .eq("id", canchaId);
  if (error) throw error;
  return data;
}

export async function deleteCancha(canchaId: number) {
  const { data, error } = await supabase.from("canchas").delete().eq("id", canchaId);
  if (error) throw error;
  return data;
}
