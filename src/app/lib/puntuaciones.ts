import { supabase } from "./supabase";

type Puntuacion = {
  reserva_id: number | null;
  usuario_id: string;
  cancha_id: number;
  puntuacion: number;
  comentario: string;
};

/**
 * 
 * @param {Puntuacion} puntuacion 
 */
export async function insertarPuntuacion(puntuacion: Puntuacion) {
  const { data, error } = await supabase
    .from('puntuaciones')
    .insert([puntuacion]);

  if (error) {
    console.error('Error al insertar la puntuación:', error);
    throw error;
  }

  return data;
}

/**
 * 
 * @param {number} canchaId - 
 */
export async function getPuntuacionesPorCancha(canchaId: number) {
  const { data, error } = await supabase
    .from('puntuaciones')
    .select('*')
    .eq('cancha_id', canchaId);

  if (error) {
    console.error('Error al obtener las puntuaciones:', error);
    throw error;
  }

  return data;
}
