import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Switch,
  Button,
  Divider,
} from '@mui/material';
import { toast } from 'react-toastify';
import api from '../config/api';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Settings: React.FC = () => {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const [language, setLanguage] = useState(user?.preferences?.language || 'en');
  const [currency, setCurrency] = useState(user?.preferences?.currency || 'USD');
  const [saving, setSaving] = useState(false);

  const handleSavePreferences = async () => {
    try {
      setSaving(true);
      await api.put('/api/auth/preferences', {
        language,
        darkMode,
        currency,
      });
      toast.success('Preferences saved successfully');
    } catch (error) {
      toast.error('Failed to save preferences');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      <Paper sx={{ p: 4, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Appearance
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <FormControlLabel
            control={
              <Switch
                checked={darkMode}
                onChange={toggleDarkMode}
              />
            }
            label="Dark Mode"
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Language
        </Typography>
        
        <FormControl component="fieldset" sx={{ mb: 3 }}>
          <RadioGroup
            value={language}
            onChange={(e) => setLanguage(e.target.value as 'en' | 'jp')}
          >
            <FormControlLabel value="en" control={<Radio />} label="English" />
            <FormControlLabel value="jp" control={<Radio />} label="Japanese (日本語)" />
          </RadioGroup>
        </FormControl>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Currency
        </Typography>
        
        <FormControl component="fieldset" sx={{ mb: 3 }}>
          <RadioGroup
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <FormControlLabel value="USD" control={<Radio />} label="USD ($)" />
            <FormControlLabel value="EUR" control={<Radio />} label="EUR (€)" />
            <FormControlLabel value="GBP" control={<Radio />} label="GBP (£)" />
            <FormControlLabel value="JPY" control={<Radio />} label="JPY (¥)" />
          </RadioGroup>
        </FormControl>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            onClick={handleSavePreferences}
            disabled={saving}
          >
            Save Preferences
          </Button>
        </Box>
      </Paper>

      <Paper sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom color="error">
          Danger Zone
        </Typography>
        
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Once you logout, you'll need to login again to access your data.
        </Typography>
        
        <Button
          variant="outlined"
          color="error"
          onClick={logout}
          sx={{ mt: 2 }}
        >
          Logout
        </Button>
      </Paper>
    </Container>
  );
};

export default Settings;