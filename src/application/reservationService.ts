import { getReservations, getReservationsList, getReservationById, createReservation, updateReservation, cancelReservation } from '../adapters/outbound/reservationAPI';

export const fetchReservations = async () => {
  const response = await getReservations();
  return response.data;
};

export const fetchReservationsList = async () => {
  const response = await getReservationsList();
  return response.data;
};

export const fetchReservationById = async (id: string) => {
  const response = await getReservationById(id);
  return response.data;
};

export const addReservation = async ({servicio, cliente}) => {
  const response = await createReservation(servicio, cliente);
  return response.data;
};

export const modifyReservation = async (id: string, servicio: string) => {
  const response = await updateReservation(id, servicio);
  return response.data;
};

export const cancelReservationById = async (id: string) => {
  const response = await cancelReservation(id);
  return response.data;
};
