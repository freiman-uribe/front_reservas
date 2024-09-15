import { useState, useEffect } from "react";
import {
  fetchReservationsClient,
  cancelReservationById,
} from "../../application/reservationService";
// import { fetchServicesList } from "../../application/serviceService";
import {
  Button,
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

const columns = [
  { id: "servicio", label: "Servicio", minWidth: 170 },
  { id: "cliente", label: "Cliente", minWidth: 100 },
  { id: "estado", label: "Estado", minWidth: 100 },
  {
    id: "_id",
    label: "Acciones",
    minWidth: 170,
  },
];

const ReservationManager = () => {
  const [reservations, setReservations] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Obtener reservas, usuarios y servicios al cargar el componente
  useEffect(() => {
    const fetchData = async () => {
      const reservationList = await fetchReservationsClient();
      console.log('🚀 ~ fetchData ~ reservationList:', reservationList)
      setReservations(reservationList);
    };
    fetchData();
  }, [fetchReservationsClient]);


  // Eliminar una reserva
  const handleDelete = async (id) => {
    await cancelReservationById(id);
    const updatedReservations = await fetchReservationsClient();
    setReservations(updatedReservations);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <h2>Lista de Reservas</h2>
      <Paper sx={{ width: "100%" }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {reservations
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <>
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <>
                              <TableCell key={column.id} align={column.align}>
                                {column.id === "_id" ? (
                                  <Stack spacing={1}>
                                    <Button
                                      color="error"
                                      variant="contained"
                                      onClick={() => handleDelete(value)}
                                    >
                                      Cancelar reserva
                                    </Button>
                                  </Stack>
                                ) : column.id === "estado" ? (
                                  <Chip
                                    label={value}
                                    color={
                                      value === "reservado"
                                        ? "success"
                                        : "warning"
                                    }
                                  />
                                ) : (
                                  value.nombre.toString()
                                )}
                              </TableCell>
                            </>
                          );
                        })}
                      </TableRow>
                    </>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={reservations.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default ReservationManager;
