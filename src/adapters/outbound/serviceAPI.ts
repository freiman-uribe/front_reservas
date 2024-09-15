// src/adapters/outbound/serviceAPI.ts
import api from '../../infrastructure/http/httpClient';

export const getServices = () => {
  return api.get('/service');
};

export const getServicesList = () => {
  return api.get('/service/list');
};

export const getServicesClient = () => {
  return api.get("/service/cliente");
};

export const getServiceById = (id: string) => {
  return api.get(`/service/${id}`);
};

export const createService = (nombre: string) => {
  return api.post('/service', { nombre });
};

export const updateService = (id: string, nombre: string) => {
  return api.put(`/service/${id}`, { nombre });
};

export const deleteService = (id: string) => {
  return api.delete(`/service/${id}`);
};
