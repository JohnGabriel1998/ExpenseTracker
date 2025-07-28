// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Container,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   Typography,
//   Box,
//   Button,
//   IconButton,
//   TextField,
//   MenuItem,
//   Grid,
//   Chip,
// } from '@mui/material';
// import {
//   Add as AddIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   FilterList as FilterIcon,
// } from '@mui/icons-material';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { format } from 'date-fns';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { Expense, ExpenseCategory } from '../types';

// const categories: ExpenseCategory[] = [
//   'Food & Dining',
//   'Transportation',
//   'Shopping',
//   'Entertainment',
//   'Bills & Utilities',
//   'Healthcare',
//   'Education',
//   'Travel',
//   'Other',
// ];

// const Expenses: React.FC = () => {
//   const navigate = useNavigate();
//   const [expenses, setExpenses] = useState<Expense[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [totalPages, setTotalPages] = useState(0);
//   const [totalExpenses, setTotalExpenses] = useState(0);
  
//   // Filters
//   const [categoryFilter, setCategoryFilter] = useState<string>('');
//   const [startDate, setStartDate] = useState<Date | null>(null);
//   const [endDate, setEndDate] = useState<Date | null>(null);
//   const [showFilters, setShowFilters] = useState(false);

//   useEffect(() => {
//     fetchExpenses();
//   }, [page, rowsPerPage, categoryFilter, startDate, endDate]);

//   const fetchExpenses = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem('token');
//       const params = new URLSearchParams({
//         page: (page + 1).toString(),
//         limit: rowsPerPage.toString(),
//       });

//       if (categoryFilter) {
//         params.append('category', categoryFilter);
//       }
//       if (startDate) {
//         params.append('startDate', format(startDate, 'yyyy-MM-dd'));
//       }
//       if (endDate) {
//         params.append('endDate', format(endDate, 'yyyy-MM-dd'));
//       }

//       const response = await axios.get(`/api/expenses?${params}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       setExpenses(response.data.expenses);
//       setTotalExpenses(response.data.total);
//       setTotalPages(Math.ceil(response.data.total / rowsPerPage));
//     } catch (error) {
//       console.error('Error fetching expenses:', error);
//       toast.error('Failed to fetch expenses');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteExpense = async (id: string) => {
//     if (window.confirm('Are you sure you want to delete this expense?')) {
//       try {
//         const token = localStorage.getItem('token');
//         await axios.delete(`/api/expenses/${id}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         toast.success('Expense deleted successfully');
//         fetchExpenses();
//       } catch (error) {
//         console.error('Error deleting expense:', error);
//         toast.error('Failed to delete expense');
//       }
//     }
//   };

//   const handleChangePage = (event: unknown, newPage: number) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const getCategoryColor = (category: ExpenseCategory) => {
//     const colors = {
//       'Food & Dining': 'primary',
//       'Transportation': 'secondary',
//       'Shopping': 'success',
//       'Entertainment': 'warning',
//       'Bills & Utilities': 'error',
//       'Healthcare': 'info',
//       'Education': 'primary',
//       'Travel': 'secondary',
//       'Other': 'default',
//     } as const;
//     return colors[category] || 'default';
//   };

//   return (
//     <Container maxWidth="lg">
//       <Box sx={{ my: 4 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//           <Typography variant="h4" component="h1">
//             Expenses
//           </Typography>
//           <Box sx={{ display: 'flex', gap: 2 }}>
//             <Button
//               variant="outlined"
//               startIcon={<FilterIcon />}
//               onClick={() => setShowFilters(!showFilters)}
//             >
//               Filters
//             </Button>
//             <Button
//               variant="contained"
//               startIcon={<AddIcon />}
//               onClick={() => navigate('/expenses/add')}
//             >
//               Add Expense
//             </Button>
//           </Box>
//         </Box>

//         {showFilters && (
//           <Paper sx={{ p: 2, mb: 3 }}>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={4}>
//                 <TextField
//                   select
//                   fullWidth
//                   label="Category"
//                   value={categoryFilter}
//                   onChange={(e) => setCategoryFilter(e.target.value)}
//                 >
//                   <MenuItem value="">All Categories</MenuItem>
//                   {categories.map((category) => (
//                     <MenuItem key={category} value={category}>
//                       {category}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <LocalizationProvider dateAdapter={AdapterDateFns}>
//                   <DatePicker
//                     label="Start Date"
//                     value={startDate}
//                     onChange={(newValue) => setStartDate(newValue)}
//                     slotProps={{ textField: { fullWidth: true } }}
//                   />
//                 </LocalizationProvider>
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <LocalizationProvider dateAdapter={AdapterDateFns}>
//                   <DatePicker
//                     label="End Date"
//                     value={endDate}
//                     onChange={(newValue) => setEndDate(newValue)}
//                     slotProps={{ textField: { fullWidth: true } }}
//                   />
//                 </LocalizationProvider>
//               </Grid>
//             </Grid>
//           </Paper>
//         )}

//         <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Date</TableCell>
//                   <TableCell>Description</TableCell>
//                   <TableCell>Category</TableCell>
//                   <TableCell align="right">Amount</TableCell>
//                   <TableCell align="center">Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {loading ? (
//                   <TableRow>
//                     <TableCell colSpan={5} align="center">
//                       Loading...
//                     </TableCell>
//                   </TableRow>
//                 ) : expenses.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={5} align="center">
//                       No expenses found
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   expenses.map((expense) => (
//                     <TableRow key={expense._id}>
//                       <TableCell>
//                         {format(new Date(expense.date), 'MMM dd, yyyy')}
//                       </TableCell>
//                       <TableCell>{expense.description}</TableCell>
//                       <TableCell>
//                         <Chip
//                           label={expense.category}
//                           color={getCategoryColor(expense.category)}
//                           size="small"
//                         />
//                       </TableCell>
//                       <TableCell align="right">
//                         ${expense.amount.toFixed(2)}
//                       </TableCell>
//                       <TableCell align="center">
//                         <IconButton
//                           size="small"
//                           onClick={() => navigate(`/expenses/edit/${expense._id}`)}
//                         >
//                           <EditIcon />
//                         </IconButton>
//                         <IconButton
//                           size="small"
//                           onClick={() => handleDeleteExpense(expense._id)}
//                           color="error"
//                         >
//                           <DeleteIcon />
//                         </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <TablePagination
//             rowsPerPageOptions={[5, 10, 25]}
//             component="div"
//             count={totalExpenses}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </Paper>
//       </Box>
//     </Container>
//   );
// };

// export default Expenses;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Container,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   Typography,
//   Box,
//   Button,
//   IconButton,
//   TextField,
//   MenuItem,
//   Grid,
//   Chip,
//   CircularProgress,
// } from '@mui/material';
// import {
//   Add as AddIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   FilterList as FilterIcon,
// } from '@mui/icons-material';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { format } from 'date-fns';
// import { toast } from 'react-toastify';
// import api from '../config/api';
// import { Expense, ExpenseCategory } from '../types';

// const categories: ExpenseCategory[] = [
//   'Food & Dining',
//   'Transportation',
//   'Shopping',
//   'Entertainment',
//   'Bills & Utilities',
//   'Healthcare',
//   'Education',
//   'Travel',
//   'Other',
// ];

// const Expenses: React.FC = () => {
//   const navigate = useNavigate();
//   const [expenses, setExpenses] = useState<Expense[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [totalPages, setTotalPages] = useState(0);
//   const [totalExpenses, setTotalExpenses] = useState(0);
  
//   // Filters
//   const [categoryFilter, setCategoryFilter] = useState<string>('');
//   const [startDate, setStartDate] = useState<Date | null>(null);
//   const [endDate, setEndDate] = useState<Date | null>(null);
//   const [showFilters, setShowFilters] = useState(false);

//   useEffect(() => {
//     fetchExpenses();
//   }, [page, rowsPerPage, categoryFilter, startDate, endDate]);

//   const fetchExpenses = async () => {
//     try {
//       setLoading(true);
//       const params: any = {
//         page: page + 1,
//         limit: rowsPerPage,
//       };

//       if (categoryFilter) params.category = categoryFilter;
//       if (startDate) params.startDate = format(startDate, 'yyyy-MM-dd');
//       if (endDate) params.endDate = format(endDate, 'yyyy-MM-dd');

//       const response = await api.get('/api/expenses', { params });
      
//       setExpenses(response.data.expenses);
//       setTotalPages(response.data.totalPages);
//       setTotalExpenses(response.data.totalExpenses);
//     } catch (error) {
//       toast.error('Failed to fetch expenses');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (window.confirm('Are you sure you want to delete this expense?')) {
//       try {
//         await api.delete(`/api/expenses/${id}`);
//         toast.success('Expense deleted successfully');
//         fetchExpenses();
//       } catch (error) {
//         toast.error('Failed to delete expense');
//       }
//     }
//   };

//   const handleChangePage = (event: unknown, newPage: number) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const clearFilters = () => {
//     setCategoryFilter('');
//     setStartDate(null);
//     setEndDate(null);
//   };

//   if (loading && expenses.length === 0) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Container maxWidth="lg">
//         <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <Typography variant="h4">Expenses</Typography>
//           <Button
//             variant="contained"
//             startIcon={<AddIcon />}
//             onClick={() => navigate('/expenses/add')}
//           >
//             Add Expense
//           </Button>
//         </Box>

//         {/* Filters */}
//         <Paper sx={{ p: 2, mb: 3 }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', mb: showFilters ? 2 : 0 }}>
//             <IconButton onClick={() => setShowFilters(!showFilters)}>
//               <FilterIcon />
//             </IconButton>
//             <Typography variant="h6">Filters</Typography>
//             {(categoryFilter || startDate || endDate) && (
//               <Button size="small" onClick={clearFilters} sx={{ ml: 2 }}>
//                 Clear Filters
//               </Button>
//             )}
//           </Box>

//           {showFilters && (
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={4}>
//                 <TextField
//                   select
//                   fullWidth
//                   label="Category"
//                   value={categoryFilter}
//                   onChange={(e) => setCategoryFilter(e.target.value)}
//                 >
//                   <MenuItem value="">All Categories</MenuItem>
//                   {categories.map((category) => (
//                     <MenuItem key={category} value={category}>
//                       {category}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <DatePicker
//                   label="Start Date"
//                   value={startDate}
//                   onChange={(newValue) => setStartDate(newValue)}
//                   renderInput={(params) => <TextField {...params} fullWidth />}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <DatePicker
//                   label="End Date"
//                   value={endDate}
//                   onChange={(newValue) => setEndDate(newValue)}
//                   renderInput={(params) => <TextField {...params} fullWidth />}
//                   minDate={startDate || undefined}
//                 />
//               </Grid>
//             </Grid>
//           )}
//         </Paper>

//         {/* Expenses Table */}
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Title</TableCell>
//                 <TableCell>Category</TableCell>
//                 <TableCell>Date</TableCell>
//                 <TableCell align="right">Amount</TableCell>
//                 <TableCell align="center">Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {expenses.map((expense) => (
//                 <TableRow key={expense._id}>
//                   <TableCell>{expense.title}</TableCell>
//                   <TableCell>
//                     <Chip label={expense.category} size="small" />
//                   </TableCell>
//                   <TableCell>{format(new Date(expense.date), 'MMM dd, yyyy')}</TableCell>
//                   <TableCell align="right">${expense.amount.toFixed(2)}</TableCell>
//                   <TableCell align="center">
//                     <IconButton
//                       size="small"
//                       onClick={() => navigate(`/expenses/edit/${expense._id}`)}
//                     >
//                       <EditIcon />
//                     </IconButton>
//                     <IconButton
//                       size="small"
//                       onClick={() => handleDelete(expense._id)}
//                     >
//                       <DeleteIcon />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//           <TablePagination
//             rowsPerPageOptions={[5, 10, 25]}
//             component="div"
//             count={totalExpenses}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </TableContainer>
//       </Container>
//     </LocalizationProvider>
//   );
// };

// export default Expenses;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  Box,
  Button,
  IconButton,
  TextField,
  MenuItem,
  Grid,
  Chip,
  CircularProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import api from '../config/api';
import { Expense, ExpenseCategory } from '../types';

const categories: ExpenseCategory[] = [
  'Boarding House',
  'Gas',
  'Water',
  'Electric Bill',
  'Foods',
  'Shopping',
  'Travel',
  'Others',
];

const Expenses: React.FC = () => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  
  // Filters
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchExpenses();
  }, [page, rowsPerPage, categoryFilter, startDate, endDate]);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const params: any = {
        page: page + 1,
        limit: rowsPerPage,
      };

      if (categoryFilter) params.category = categoryFilter;
      if (startDate) params.startDate = format(startDate, 'yyyy-MM-dd');
      if (endDate) params.endDate = format(endDate, 'yyyy-MM-dd');

      const response = await api.get('/api/expenses', { params });
      
      setExpenses(response.data.expenses);
      setTotalPages(response.data.totalPages);
      setTotalExpenses(response.data.totalExpenses);
    } catch (error) {
      toast.error('Failed to fetch expenses');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await api.delete(`/api/expenses/${id}`);
        toast.success('Expense deleted successfully');
        fetchExpenses();
      } catch (error) {
        toast.error('Failed to delete expense');
      }
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const clearFilters = () => {
    setCategoryFilter('');
    setStartDate(null);
    setEndDate(null);
  };

  if (loading && expenses.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4">Expenses</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/expenses/add')}
          >
            Add Expense
          </Button>
        </Box>

        {/* Filters */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: showFilters ? 2 : 0 }}>
            <IconButton onClick={() => setShowFilters(!showFilters)}>
              <FilterIcon />
            </IconButton>
            <Typography variant="h6">Filters</Typography>
            {(categoryFilter || startDate || endDate) && (
              <Button size="small" onClick={clearFilters} sx={{ ml: 2 }}>
                Clear Filters
              </Button>
            )}
          </Box>

          {showFilters && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  select
                  fullWidth
                  label="Category"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <MenuItem value="">All Categories</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={4}>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  slotProps={{
                    textField: {
                      fullWidth: true
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  minDate={startDate || undefined}
                  slotProps={{
                    textField: {
                      fullWidth: true
                    }
                  }}
                />
              </Grid>
            </Grid>
          )}
        </Paper>

        {/* Expenses Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense._id}>
                  <TableCell>{expense.title}</TableCell>
                  <TableCell>
                    <Chip label={expense.category} size="small" />
                  </TableCell>
                  <TableCell>{format(new Date(expense.date), 'MMM dd, yyyy')}</TableCell>
                  <TableCell align="right">¥{expense.amount.toFixed(2)}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={() => navigate(`/expenses/edit/${expense._id}`)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(expense._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalExpenses}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Container>
    </LocalizationProvider>
  );
};

export default Expenses;