import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Button,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Receipt,
  GetApp,
} from '@mui/icons-material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import axios from 'axios';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { DashboardSummary } from '../types';
import { useAuth } from '../contexts/AuthContext';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Dashboard: React.FC = () => {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('/api/dashboard/summary');
      setSummary(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const response = await axios.get('/api/dashboard/export', {
        responseType: 'blob',
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `expenses_${format(new Date(), 'yyyy-MM-dd')}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      toast.success('Expenses exported successfully!');
    } catch (error) {
      toast.error('Failed to export expenses');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!summary) {
    return (
      <Container>
        <Typography>No data available</Typography>
      </Container>
    );
  }

  const pieChartData = {
    labels: summary.categoryBreakdown.map(cat => cat._id),
    datasets: [
      {
        data: summary.categoryBreakdown.map(cat => cat.total),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FF6384',
          '#C9CBCF',
          '#4BC0C0',
        ],
      },
    ],
  };

  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Monthly Expenses',
        data: Array(12).fill(0).map((_, index) => {
          const monthData = summary.monthlyTotals.find(m => m._id === index + 1);
          return monthData ? monthData.total : 0;
        }),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Welcome back, {user?.name}!
        </Typography>
        <Button
          variant="outlined"
          startIcon={<GetApp />}
          onClick={handleExport}
        >
          Export CSV
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                This Month
              </Typography>
              <Typography variant="h5" component="h2">
                ¥{summary.currentMonthTotal.toFixed(2)}
              </Typography>
              <Box display="flex" alignItems="center" mt={1}>
                <TrendingUp color="success" />
                <Typography variant="body2" color="textSecondary" ml={1}>
                  vs last month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Expenses
              </Typography>
              <Typography variant="h5" component="h2">
                {summary.recentExpenses.length}
              </Typography>
              <Box display="flex" alignItems="center" mt={1}>
                <Receipt color="primary" />
                <Typography variant="body2" color="textSecondary" ml={1}>
                  All time
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Average/Day
              </Typography>
              <Typography variant="h5" component="h2">
                ¥{(summary.currentMonthTotal / 30).toFixed(2)}
              </Typography>
              <Box display="flex" alignItems="center" mt={1}>
                <TrendingDown color="error" />
                <Typography variant="body2" color="textSecondary" ml={1}>
                  This month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Top Category
              </Typography>
              <Typography variant="h5" component="h2">
                {summary.categoryBreakdown[0]?._id || 'N/A'}
              </Typography>
              <Box display="flex" alignItems="center" mt={1}>
                <Typography variant="body2" color="textSecondary">
                  ¥{summary.categoryBreakdown[0]?.total.toFixed(2) || '0'}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Charts */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Monthly Trend
            </Typography>
            <Box sx={{ height: 320 }}>
              <Bar data={barChartData} options={{ 
                responsive: true, 
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }} />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Category Breakdown
            </Typography>
            <Box sx={{ height: 320 }}>
              <Pie data={pieChartData} options={{ 
                responsive: true, 
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom' as const
                  }
                }
              }} />
            </Box>
          </Paper>
        </Grid>

        {/* Recent Expenses */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Expenses
            </Typography>
            <Box sx={{ mt: 2 }}>
              {summary.recentExpenses.map((expense) => (
                <Box
                  key={expense._id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    py: 1,
                    borderBottom: '1px solid #eee',
                  }}
                >
                  <Box>
                    <Typography variant="body1">{expense.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {expense.category} • {format(new Date(expense.date), 'MMM dd, yyyy')}
                    </Typography>
                  </Box>
                  <Typography variant="h6" color="primary">
                    ¥{expense.amount.toFixed(2)}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;