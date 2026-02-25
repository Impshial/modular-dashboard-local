// src/components/IconSearchDialog.tsx

import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const IconSearchDialog = () => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [icons, setIcons] = useState<string[]>([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    // Assuming you have a function to fetch icons based on the search term
    const fetchedIcons = await fetchIconsBySearchTerm(event.target.value);
    setIcons(fetchedIcons);
  };

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <SearchIcon />
      </IconButton>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <TextField
            label="Search Icons"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Grid container spacing={2}>
            {icons.map((icon) => (
              <Grid item xs={4} key={icon}>
                <img src={`https://cdn.jsdelivr.net/npm/phosphor-icons/icons/${icon}.svg`} alt={icon} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default IconSearchDialog;