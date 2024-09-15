import { getServices, getServiceById, createService, updateService, deleteService, getServicesList, getServicesClient } from '../adapters/outbound/serviceAPI';

export const fetchServices = async () => {
  const response = await getServices();
  return response.data;
};

export const fetchServicesList = async () => {
  const response = await getServicesList();
  return response.data;
};

export const fetchServicesClient = async () => {
  const response = await getServicesClient();
  return response.data;
};

export const fetchServiceById = async (id: string) => {
  const response = await getServiceById(id);
  return response.data;
};

export const addService = async (nombre: string) => {
  const response = await createService(nombre);
  return response.data;
};

export const modifyService = async (id: string, nombre: string) => {
  const response = await updateService(id, nombre);
  return response.data;
};

export const removeService = async (id: string) => {
  const response = await deleteService(id);
  return response.data;
};
