import { Box, Stack, Typography, Button, Modal, TextField, Grid, List, ListItem, Card, CardMedia} from "@mui/material";
import Divider from '@mui/material/Divider';

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
          overflow="hidden" // Prevent scrollbars
          position="relative"
        >
          <Grid
            container
            spacing={0} // Remove spacing to ensure full coverage
            height="100vh" // Full height of Box
            width="100%" // Full width of Box
          >
            <Grid item xs={12}>
              <Card
                sx={{ minWidth: 0, borderRadius: 0, overflow: "hidden" }} // Full coverage with no minimum width
                style={{ position: "relative", width: "100%", height: "100%" }}
              >
                <CardMedia
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover", // Cover the entire area of the Card
                  }}
                  component="img"
                  image="/assets/bread.jpg"
                  alt="work portfolio"
                />
                <Box
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the opacity as needed
                        zIndex: 2,
                    }}
                />
                <Box
                  position="absolute"
                  top="50%"
                  left="50%"
                  style={{
                    transform: "translate(-50%, -50%)",
                    color: "white",
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    bgcolor: "#000000",
                    padding: "1em", 
                    zIndex: 3
                  }}
                >
                  <Typography>
                    As a programmer who was most comfortable with backend languages
                    such as Python and Java, I wanted to explore some front-end
                    technologies as well. This project was done using Next.js with
                    Material UI React components with Firebase as the database.
                    Current features include adding items, deleting items, and
                    searching items. Soon, I plan on adding authentication and
                    recipe generation!
                  </Typography>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Box>
      );

  }