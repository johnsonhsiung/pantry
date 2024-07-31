'use client';
import { Box, Stack, Typography, Button, Modal, TextField } from "@mui/material";
import Image from "next/image";
import { firestore } from "@/firebase";
import { useEffect, useState } from "react";
import { query, getDocs, collection, getDoc, setDoc, addDoc, updateDoc, doc, deleteDoc} from "firebase/firestore"; 



export default function Home() {
  const [pantry, setPantry] = useState([])
  const [itemName, setItemName] = useState('')

  // modal state 
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display:"flex",
    flexDirection: "column",
    gap: 3
  };
  const updatePantry = async () => {
    const snapshot = query(collection(firestore, 'pantry'))
    const docs = await getDocs(snapshot)
    const pantryList = []
    docs.forEach((doc) => {
      pantryList.push({name: doc.id, ...doc.data()}) // ... is spread operator, each individual property is pushed 
      
    })
    console.log(pantryList)
    setPantry(pantryList)
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item)
    const docSnapShot = await getDoc(docRef)
    if (docSnapShot.exists()) {
      const {count} = docSnapShot.data() // object desctructuring allows you to get the count field from the document in one step. 
      if (count === 1) {
        await deleteDoc(docRef)
      } else {
        await updateDoc(docRef, {count: count - 1})
      }
    }
    await updatePantry()
  }
  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item)
    const docSnapShot = await getDoc(docRef)
    if (docSnapShot.exists()) {
      const {count} = docSnapShot.data() // object desctructuring allows you to get the count field from the document in one step. 
      await updateDoc(docRef, {count: count + 1})
    } else {
      await setDoc(docRef, {count: 1})
    }
    await updatePantry()
  }
  // updateDoc leaves unspecified fields untouched while setDoc replaces the entire document and creates a new document if it does not exist. 

 
  useEffect(() => {
    updatePantry()
  }, [])
  return ( <Box // similar to div
  width="100vw" // view width and view height
  height="100vh" 
  display="flex"
  justifyContent="center" // align horizontally
  alignItems="center" // align verically
  flexDirection="column" // elements inside are stacked vertically 
  gap={2} // curly bracket just for numbers or javascipt variables or expressions 
  // auto overflow means scrollbar only visible when needed 
  > 
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Item
        </Typography>
        <Stack width="100%" direction="row" spacing={2}>
          <TextField variant='outlined' fullWidth value={itemName} 
          onChange={(e) => {
              setItemName(e.target.value)

          }} 
          // self closing tag 
          /> 
        
          <Button variant='outlined' onClick={()=> {
            addItem(itemName)
            setItemName('')
            handleClose()
          }}> Add
          </Button>

        </Stack>
      </Box>
    </Modal>
    <Button variant="contained" onClick={handleOpen}>
      Add
    </Button>
    <Box border={"1px solid #333"}>



    <Stack width="800px" height="200px" sx={{ backgroundColor: '#FFDBBB' }} display ={"flex"} alignItems={"center"} justifyContent={"center"}>
      <Typography variant={"h3"} color={'#333'} textAlign={'center'} fontWeight={'bold'}>
        Pantry Items 
      </Typography>

    </Stack>
    <Stack width="800px" height="500px" spacing ={2} overflow="auto"> 
      
      {pantry.map(({name, count}) => (
        <Box 
        key={name}
        width="100%" // as wide as the parent container 
        height="100px" 
        display= "flex"
        justifyContent="space-between"
        alignItems="center"
        padding={5}
        byColor="#f0f0f0"
        >
          <Typography variant={"h3"} color={'#333'} textAlign={'center'}>
            {name.charAt(0).toUpperCase() + name.slice(1)} 
          </Typography>
          <Typography variant={"h3"} color={'#333'} textAlign={'center'}>
            {count}
          </Typography>
          <Button variant='outlined' onClick={ () => {
            removeItem(name)

          }}>Remove</Button>

          
        </Box>
      ))}

    </Stack></Box></Box>

  );
}
