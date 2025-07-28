// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useForm, Controller } from 'react-hook-form';
// import {
//   Container,
//   Paper,
//   TextField,
//   Button,
//   Typography,
//   Box,
//   MenuItem,
//   Grid,
//   CircularProgress,
// } from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { toast } from 'react-toastify';
// import api from '../config/api';
// import { ExpenseCategory } from '../types';

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

// interface ExpenseFormData {
//   title: string;
//   amount: number;
//   category: ExpenseCategory;
//   date: Date;
//   description?: string;
// }

// const EditExpense: React.FC = () => {
//   const navigate = useNavigate();
//   const { id } = useParams<{ id: string }>();
//   const [loading, setLoading] = useState(true);
  
//   const { register, handleSubmit, control, reset, formState: { errors, isSubmitting } } = useForm<ExpenseFormData>();

//   useEffect(() => {
//     fetchExpense();
//   }, [id]);

//   const fetchExpense = async () => {
//     try {
//       const response = await api.get(`/api/expenses/${id}`);
//       const expense = response.data.expense;
      
//       reset({
//         title: expense.title,
//         amount: expense.amount,
//         category: expense.category,
//         date: new Date(expense.date),
//         description: expense.description || '',
//       });
//     } catch (error) {
//       toast.error('Failed to fetch expense');
//       navigate('/expenses');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onSubmit = async (data: ExpenseFormData) => {
//     try {
//       await api.put(`/api/expenses/${id}`, data);
//       toast.success('Expense updated successfully');
//       navigate('/expenses');
//     } catch (error) {
//       toast.error('Failed to update expense');
//     }
//   };

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Container maxWidth="sm">
//         <Paper sx={{ p: 4, mt: 4 }}>
//           <Typography variant="h4" gutterBottom>
//             Edit Expense
//           </Typography>
          
//           <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
//             <Grid container spacing={3}>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Title"
//                   {...register('title', { required: 'Title is required' })}
//                   error={!!errors.title}
//                   helperText={errors.title?.message}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Amount"
//                   type="number"
//                   inputProps={{ step: '0.01' }}
//                   {...register('amount', {
//                     required: 'Amount is required',
//                     min: { value: 0.01, message: 'Amount must be greater than 0' },
//                   })}
//                   error={!!errors.amount}
//                   helperText={errors.amount?.message}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   select
//                   fullWidth
//                   label="Category"
//                   defaultValue=""
//                   {...register('category', { required: 'Category is required' })}
//                   error={!!errors.category}
//                   helperText={errors.category?.message}
//                 >
//                   {categories.map((category) => (
//                     <MenuItem key={category} value={category}>
//                       {category}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </Grid>

//               <Grid item xs={12}>
//                 <Controller
//                   name="date"
//                   control={control}
//                   rules={{ required: 'Date is required' }}
//                   render={({ field }) => (
//                     <DatePicker
//                       label="Date"
//                       value={field.value}
//                       onChange={(newValue) => field.onChange(newValue)}
//                       renderInput={(params) => (
//                         <TextField
//                           {...params}
//                           fullWidth
//                           error={!!errors.date}
//                           helperText={errors.date?.message}
//                         />
//                       )}
//                     />
//                   )}
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   multiline
//                   rows={3}
//                   label="Description (optional)"
//                   {...register('description')}
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
//                   <Button
//                     variant="outlined"
//                     onClick={() => navigate('/expenses')}
//                     disabled={isSubmitting}
//                   >
//                     Cancel
//                   </Button>
//                   <Button
//                     type="submit"
//                     variant="contained"
//                     disabled={isSubmitting}
//                   >
//                     Update Expense
//                   </Button>
//                 </Box>
//               </Grid>
//             </Grid>
//           </Box>
//         </Paper>
//       </Container>
//     </LocalizationProvider>
//   );
// };

// export default EditExpense;

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Grid,
  CircularProgress,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { toast } from 'react-toastify';
import api from '../config/api';
import { ExpenseCategory } from '../types';

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

interface ExpenseFormData {
  title: string;
  amount: number;
  category: ExpenseCategory;
  date: Date;
  description?: string;
}

const EditExpense: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  
  const { register, handleSubmit, control, reset, formState: { errors, isSubmitting } } = useForm<ExpenseFormData>();

  useEffect(() => {
    fetchExpense();
  }, [id]);

  const fetchExpense = async () => {
    try {
      const response = await api.get(`/api/expenses/${id}`);
      const expense = response.data.expense;
      
      reset({
        title: expense.title,
        amount: expense.amount,
        category: expense.category,
        date: new Date(expense.date),
        description: expense.description || '',
      });
    } catch (error) {
      toast.error('Failed to fetch expense');
      navigate('/expenses');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: ExpenseFormData) => {
    try {
      await api.put(`/api/expenses/${id}`, data);
      toast.success('Expense updated successfully');
      navigate('/expenses');
    } catch (error) {
      toast.error('Failed to update expense');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="sm">
        <Paper sx={{ p: 4, mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            Edit Expense
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  {...register('title', { required: 'Title is required' })}
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Amount"
                  type="number"
                  inputProps={{ step: '0.01' }}
                  {...register('amount', {
                    required: 'Amount is required',
                    min: { value: 0.01, message: 'Amount must be greater than 0' },
                  })}
                  error={!!errors.amount}
                  helperText={errors.amount?.message}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Category"
                  defaultValue=""
                  {...register('category', { required: 'Category is required' })}
                  error={!!errors.category}
                  helperText={errors.category?.message}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="date"
                  control={control}
                  rules={{ required: 'Date is required' }}
                  render={({ field }) => (
                    <DatePicker
                      label="Date"
                      value={field.value}
                      onChange={(newValue) => field.onChange(newValue)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!errors.date,
                          helperText: errors.date?.message
                        }
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Description (optional)"
                  {...register('description')}
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/expenses')}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                  >
                    Update Expense
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </LocalizationProvider>
  );
};

export default EditExpense;