import { useState, useEffect } from 'react';
import { fetchServices, addService, modifyService, removeService } from '../../application/serviceService';
import { Button, Chip, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from "@mui/material";

const columns = [
  { id: "nombre", label: "Nombre", minWidth: 170 },
  { id: "estado", label: "Estado", minWidth: 100 },
  {
    id: "_id",
    label: "Acciones",
    minWidth: 170,
  },
];


const ServiceManager = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({ nombre: '' });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editingServiceId, setEditingServiceId] = useState(null);
  // Obtener la lista de servicios al cargar el componente
  useEffect(() => {
    const getServices = async () => {
      const serviceList = await fetchServices();
      setServices(serviceList);
      console.log('🚀 ~ ServiceManager ~ services:', services)
    };
    getServices();
  }, [fetchServices]);

  
  // Manejar cambios en los campos del formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, nombre: e.target.value });
  };

  // Manejar el envío del formulario (creación o edición)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingServiceId) {
      await modifyService(editingServiceId, formData.nombre); // Si estamos editando
    } else {
      await addService(formData.nombre); // Si estamos creando
    }

    // Limpiar el formulario y actualizar la lista de servicios
    setFormData({ nombre: '' });
    setEditingServiceId(null);
    const updatedServices = await fetchServices();
    setServices(updatedServices);
  };

  // Seleccionar un servicio para editar
  const handleEdit = (service) => {
    setEditingServiceId(service._id);
    setFormData({ nombre: service.nombre });
  };

  const handleCancel = () => {
    setEditingServiceId(null);
    setFormData({ nombre: '' });
  };

  // Eliminar un servicio
  const handleDelete = async (id) => {
    await removeService(id);
    const updatedServices = await fetchServices();
    setServices(updatedServices);
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
    <>
      <h2>{editingServiceId ? "Editar Servicio" : "Crear Servicio"}</h2>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            fullWidth
            size="small"
            name="nombre"
            label="Nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            required
          />

          <Stack direction="row" spacing={2}>
            <Button variant="contained" type="submit">
              {editingServiceId ? "Guardar Cambios" : "Crear Servicio"}
            </Button>
            {editingServiceId && (
              <Button
                variant="contained"
                color="success"
                type="button"
                onClick={handleCancel}
              >
                Cancelar Edición
              </Button>
            )}
          </Stack>
        </Stack>
      </form>

      <h2>Lista de Servicios</h2>
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
              {services
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
                                      variant="contained"
                                      color="warning"
                                      onClick={() => handleDelete(value)}
                                    >
                                      Inactivar
                                    </Button>
                                  </Stack>
                                ) : column.id === "estado" ? (
                                  <Chip
                                    label={value}
                                    color={
                                      value === "activo" ? "success" : "error"
                                    }
                                  />
                                ) : (
                                  value
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
          count={services.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default ServiceManager;
