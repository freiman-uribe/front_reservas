import { useState, useEffect } from 'react';
import { fetchServicesClient } from "../../application/serviceService";
import { addReservation } from '../../application/reservationService';
import { Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';

const columns = [
  { id: "nombre", label: "Nombre", minWidth: 170 },
  {
    id: "_id",
    label: "Acciones",
    minWidth: 170,
  },
];

const ServiceManager = () => {
  const [services, setServices] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const getServices = async () => {
      const serviceList = await fetchServicesClient();
      setServices(serviceList);
    };
    getServices();
  }, [fetchServicesClient]);

  const handleReservation = async (id) => {
    await addReservation({servicio: id})
    const serviceList = await fetchServicesClient();
    setServices(serviceList);
  }

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
                                      onClick={() => handleReservation(value)}
                                    >
                                      Reservar
                                    </Button>
                                  </Stack>
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
    </div>
  );
};

export default ServiceManager;
