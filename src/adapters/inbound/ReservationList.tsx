import { useState, useEffect } from 'react';
import { fetchReservations, addReservation, modifyReservation, cancelReservationById } from '../../application/reservationService';
import { fetchServicesList } from '../../application/serviceService';
import { fetchUsers } from '../../application/authService';
import { Button, Chip, FormControl, InputLabel, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';


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
  const [formData, setFormData] = useState({ servicio: '', cliente: '' });
  const [editingReservationId, setEditingReservationId] = useState(null); // Para saber si estamos editando
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [services, setServices] = useState([]);
  
  // Obtener reservas, usuarios y servicios al cargar el componente
  useEffect(() => {
      const fetchData = async () => {
      const reservationList = await fetchReservations();
      setReservations(reservationList);

      const userList = await fetchUsers();
      setUsers(userList);

      const serviceList = await fetchServicesList();
      setServices(serviceList);
    };
    fetchData();
  }, [fetchReservations, fetchUsers, fetchServicesList]);

  // Manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Manejar el envío del formulario (creación o edición)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingReservationId) {
      await modifyReservation(editingReservationId, formData); // Si estamos editando
    } else {
      await addReservation(formData); // Si estamos creando
    }

    // Limpiar el formulario y actualizar la lista de reservas
    setFormData({ servicio: '', cliente: '' });
    setEditingReservationId(null);
    const updatedReservations = await fetchReservations();
    setReservations(updatedReservations);
  };

  // Seleccionar una reserva para editar
  const handleEdit = (reservation) => {
    setEditingReservationId(reservation._id);
    setFormData({ servicio: reservation.servicio._id, cliente: reservation.cliente._id });
  };

  // Eliminar una reserva
  const handleDelete = async (id) => {
    await cancelReservationById(id);
    const updatedReservations = await fetchReservations();
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
      <h2>{editingReservationId ? "Editar Reserva" : "Crear Reserva"}</h2>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <FormControl size="small" fullWidth>
            <InputLabel id="demo-simple-select-label">Servicio</InputLabel>
            <Select
              name="servicio"
              value={formData.servicio}
              label="Servicio"
              onChange={handleInputChange}
              required
            >
              {services.map((user) => (
                <MenuItem key={user._id} value={user._id}>
                  {user.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" fullWidth>
            <InputLabel>Cliente</InputLabel>
            <Select
              name="cliente"
              value={formData.cliente}
              label="Age"
              onChange={handleInputChange}
              required
            >
              {users.map((user) => (
                <MenuItem key={user._id} value={user._id}>
                  {user.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" type="submit">
              {editingReservationId ? "Guardar Cambios" : "Crear Reserva"}
            </Button>
            {editingReservationId && (
              <Button
                variant="contained"
                color="error"
                type="button"
                onClick={() => {
                  setFormData({ servicio: "", cliente: "" });
                  setEditingReservationId(null)}}
              >
                Cancelar Edición
              </Button>
            )}
          </Stack>
        </Stack>
      </form>

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
                                      variant="contained"
                                      color="success"
                                      onClick={() => handleEdit(row)}
                                    >
                                      Editar
                                    </Button>
                                    <Button
                                      color="warning"
                                      variant="contained"
                                      onClick={() => handleDelete(value)}
                                    >
                                      Eliminar
                                    </Button>
                                  </Stack>
                                ) : column.id === "estado" ? (
                                  <Chip
                                    label={value}
                                    color={
                                      value === "reservado"
                                        ? "success"
                                        : "error"
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
