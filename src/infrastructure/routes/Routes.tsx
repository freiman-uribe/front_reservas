import { createBrowserRouter, Navigate } from "react-router-dom";
import Auth from '../../adapters/inbound/AuthForm'
import DashboardAdmin from "../../adapters/inbound/DashboardAdmin.js";
import Service from "../../adapters/inbound/ServiceList.js";
import ReservationList from '../../adapters/inbound/ReservationList.js'
import ReservationService from '../../adapters/inbound/ReservationService.js'
import { ProtectedRoute } from "../routes/ProtectedRouter";
import DashboardCliente from "../../adapters/inbound/DashboardCliente.js";
import ReservationReservation from "../../adapters/inbound/ReservationReservation.js";


export const router = createBrowserRouter([
  {
    path: "/dashboard",
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute allowedRoles={["administrador"]}>
            <DashboardAdmin>
              <Service />
            </DashboardAdmin>
          </ProtectedRoute>
        ),
      },
      {
        path: "reservas",
        element: (
          <ProtectedRoute allowedRoles={["administrador"]}>
            <DashboardAdmin>
              <ReservationList />
            </DashboardAdmin>
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboardCliente",
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute allowedRoles={["usuario"]}>
            <DashboardCliente>
              <ReservationService />
            </DashboardCliente>
          </ProtectedRoute>
        ),
      },
      {
        path: "reservas",
        element: (
          <ProtectedRoute allowedRoles={["usuario"]}>
            <DashboardCliente>
              <ReservationReservation />
            </DashboardCliente>
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/",
    element: <Navigate to="/auth" replace={true} />, // Redirección de /auth a /
  },
  {
    path: "/register",
    element: <Auth isRegister={true} />,
  },
]);