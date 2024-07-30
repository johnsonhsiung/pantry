'use client';
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { firestore } from "@/firebase";
import { useEffect, useState } from "react";
import { query, getDocs, collection} from "firebase/firestore"; 

export default function Home() {
  const [pantry, setPantry] = useState([])
  useEffect(() => {
    const updatePantry = async () => {
      const snapshot = query(collection(firestore, 'pantry'))
      const docs = await getDocs(snapshot)
      const pantryList = []
      docs.forEach((doc) => {
        pantryList.push(doc.id)

      })
      console.log(pantryList)
      setPantry(pantryList)
    }
    updatePantry()
    
  }, [])
  return ( <Box // similar to div
  width="100vw" // view width and view height
  height="100vh" 
  display= {"flex"}
  justifyContent={"center"} // align vertically
  alignItems={"center"} // align horizontally
  flexDirection={"column"} // elements inside are stacked vertically 
  // auto overflow means scrollbar only visible when needed 
  > 
    <Stack width="800px" height="200px" sx={{ backgroundColor: '#FFDBBB' }} display ={"flex"} alignItems={"center"} justifyContent={"center"}>
      <Typography variant={"h3"} color={'#333'} textAlign={'center'} fontWeight={'bold'}>
        Pantry Items 
      </Typography>

    </Stack>
    <Stack width="800px" height="500px" spacing ={2} overflow="auto" border={"1px solid #333"}> 
      
      {pantry.map((i) => (
        <Box 
        key={i}
        width="100%" // as wide as the parent container 
        height="100px" 
        display= {"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        >
          <Typography variant={"h3"} color={'#333'} textAlign={'center'}>
            {i.charAt(0).toUpperCase() + i.slice(1)}


          </Typography>

          
        </Box>
      ))}

       



    
    </Stack></Box>

  );
}
