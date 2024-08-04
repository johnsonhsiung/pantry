'use client';

import { Box, Button, Grid, Card, CardMedia } from "@mui/material";
import React from 'react';
import Link from 'next/link';

const Butt = () => {
  return (
    <Link href="/pantry" passHref>
      <Button
        style={{
          position: 'relative',
          bottom: '50%', // Adjust as needed
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1, // Ensure it appears on top of other elements
          paddingLeft: '32px',
          paddingRight: '32px',
          paddingTop: '16px',
          paddingBottom: '16px', 
          borderRadius: '8px' ,// Optional: Adjust border radius

        }}
        variant="contained"
      >
        Visit Pantry
      </Button>
    </Link>
  );
};



  export default function TestPage() {
    return (
      <Box
        p={0} // Remove padding to ensure full coverage
        m={0} // Remove margin if needed
        height="100%" // Full viewport height
        width="100%" // Full viewport width
        display="flex"
        alignItems="center"
        justifyContent="center"
        overflow="hidden" // prevent scrollbars
      >
        <Grid
          container
          spacing={0} // Remove spacing to ensure full coverage
          height="100vh" // Full height of Box
          width="100%" // Full width of Box
        >
          <Grid item xs={12}>
            
            <Card
              sx={{ minWidth: 0, borderRadius: 0, overflow: 'hidden' }} // Full coverage with no minimum width
              style={{ position: 'relative', width: '100%', height: '100%' }}
            >
              <CardMedia
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover', // Cover the entire area of the Card
                }}
                component="img"
                image="/assets/bread.jpg"
                alt="work portfolio"
              />
              <Butt/>
            </Card>
          </Grid>
        </Grid>
      </Box>
    );
  }