'use client';
import { Box, Stack, Typography, Button, Modal, TextField, Grid } from "@mui/material";
import { firestore } from "../../firebase";
import { useEffect, useState } from "react";
import { query, getDocs, collection, getDoc, setDoc, updateDoc, doc, deleteDoc, where} from "firebase/firestore"; 
import SearchIcon from '@mui/icons-material/Search';
import { StyledInputBase, Search, SearchIconWrapper } from "../../components/SearchBar";
import { Item } from "../../components/Item";
import Divider from '@mui/material/Divider';
import SquareButton from "../../components/SquareButton";
import Tooltip from '@mui/material/Tooltip';





// https://groups.google.com/g/firebase-talk/c/EFWTGivfApw?pli=1
// to query for strings that start with that prefix. 
// https://firebase.google.com/docs/firestore/query-data/queries
// firebase where queries 
// use setPantry to get queried items
// add a reset search button and call updatePantry again. 


export default function Home() {
  const [pantry, setPantry] = useState([])
  const [itemName, setItemName] = useState('')
  const [searchPrefix, setSearchPrefix] = useState('')


  // modal state 
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Debounced search effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchPantry(searchPrefix);
    }, 300); // 300ms debounce
    return () => clearTimeout(delayDebounceFn);
  }, [searchPrefix]); // Add searchTerm as a dependency


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
      pantryList.push({...doc.data()}) // ... is spread operator, each individual property is pushed 
    })
    console.log(pantryList)
    setPantry(pantryList)
  }

  const searchPantry = async (prefix) => {
    if (prefix === '') {
      await updatePantry()
      return
    }
    const lower_case_prefix = prefix.toLocaleLowerCase()
    const nextEndLetter = lower_case_prefix.substring(0, lower_case_prefix.length - 1) + String.fromCharCode(lower_case_prefix.charCodeAt(lower_case_prefix.length - 1) + 1)
    const q = query(collection(firestore, 'pantry'), where('name', '>=', lower_case_prefix), where('name', '<', nextEndLetter))
    const qSnapshot = await getDocs(q)
    const pantryList = []
    qSnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      pantryList.push({...doc.data()})
    });
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
      const {count} = docSnapShot.data() 
      await updateDoc(docRef, {count: count + 1})
    } else {
      await setDoc(docRef, { name: item, count: 1 })
    }
    await updatePantry()
  }
  // updateDoc leaves unspecified fields untouched while setDoc replaces the entire document and creates a new document if it does not exist. 

 
  useEffect(() => {
    updatePantry()
  }, [])

  return ( <Box // similar to div
  width="100%"
  height="100%" 
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
          placeholder="Enter item name"
          onChange={(e) => {
              setItemName(e.target.value)

          }} 
          // self closing tag 
          /> 
        
          <Button variant='outlined' onClick={()=> {
            if (itemName.trim() != '') {
              addItem(itemName.toLocaleLowerCase())
            }
            setItemName('')
            handleClose()
          }}> Add
          </Button>
        </Stack>
      </Box>
    </Modal>
    
    
    <Box border={"1px solid #333"} width='80%' height='700px' overflow="auto" padding="32px" marginTop="16px">  
  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent='flex-start'
    width='100%'
    height='100%'
    overflow="auto"
  > 
    {pantry.map(({name, count}) => (
      <Grid item key={name} xs={1} sm={2} md={2}>
        <Stack>
          <Item 
            sx={{ 
              padding: '8px',
              maxWidth: '100%',
            }}
          >
            <Stack justifyContent='space-between' direction='row' alignItems='center'>
              
            <SquareButton  onClick={ () => removeItem(name)} color='red'>
              <Typography variant={"h5"} color='lightgray' textAlign={'center'}>-</Typography>
            </SquareButton>
            <Typography variant={"h6"} color={'#333'} textAlign={'center'}>
              {count}
            </Typography>  
            <SquareButton onClick={ () => addItem(name)} color = 'green'>
              <Typography variant={"h6"} color='lightgray' textAlign={'center'}>+</Typography>
            </SquareButton>

            </Stack>

            <Divider flexItem />

            <Tooltip title={name}>
              <Typography 
                variant={"h5"} 
                color={'#333'} 
                textAlign={'center'}
                sx={{
                  fontSize: 'clamp(8px, 2vw, 20px)', // Dynamically adjusts font size
                  overflow: 'hidden',
                  textOverflow: 'ellipsis', // Optional: Truncate with ellipsis if needed
                  whiteSpace: 'nowrap',
                }}
                >
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
            </Tooltip>





          </Item>
        </Stack>
      </Grid>
    ))}
  </Grid>
</Box>

    <Stack direction='row' spacing={2} alignItems="center" justifyContent="space-between" width='80%'>
      {/* <Stack width="800px" height="200px" sx={{ backgroundColor: '#FFDBBB' }} display ={"flex"} alignItems={"center"} justifyContent={"center"}>
          <Typography variant={"h3"} color={'#333'} textAlign={'center'} fontWeight={'bold'}>
            Pantry Items 
          </Typography>

      </Stack> */}
      <Button variant="contained">
        PlaceHolder
      </Button>
      <Search>
        <SearchIconWrapper>
          <SearchIcon/>
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          onChange={(e) => {
            setSearchPrefix(e.target.value)
            searchPantry(searchPrefix)
          }} 
          value={searchPrefix}
        />
      </Search>
      <Button variant="contained" onClick={handleOpen}>
        Add
      </Button>




    </Stack>


  </Box>

  );
}
