// src/adapters/outbound/reservationAPI.ts
import api from '../../infrastructure/http/httpClient';

export const getReservations = () => {
  return api.get('/reservation');
};

export const getReservationsList = () => {
  return api.get('/reservation/list');
};

export const getReservationById = (id: string) => {
  return api.get(`/reservation/${id}`);
};

export const createReservation = (servicio: string, cliente: string) => {
  return api.post('/reservation', { servicio, cliente });
};

export const updateReservation = (id: string, servicio: string) => {
  return api.put(`/reservation/${id}`, servicio);
};

export const cancelReservation = (id: string) => {
  return api.delete(`/reservation/${id}`);
};
