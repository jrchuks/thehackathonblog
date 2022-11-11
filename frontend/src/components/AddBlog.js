import {Box, Button, InputLabel, TextField, Typography} from "@mui/material";
import React,{useState} from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";
// import {useStyles} from "./utils";


const labelStyles = {mb:1,mt:2, fontSize:"24px", fontWeight:"bold"}

const AddBlog = () => {
  // const classes = useStyles();
  const navigate = useNavigate();
;
  const [inputs, setInputs] = useState({
    title:"",
    description:"",
    imageURL:""
  })

  const handleChnage = (e) => {
    setInputs((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value
    }));

  }

  const sendRequest = async() => {
    const res = await axios
      .post(`http://localhost:7000/api/blog/add`, {
      title:inputs.title,
      description:inputs.description,
      image:inputs.imageURL,
      user:localStorage.getItem("userId")
    }).catch(err => console.log(err));
    const data = await res.data;
    return data
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(data=>console.log(data)).then(()=>navigate("/blogs"))
  }
  return (
    (<div>
      <form onSubmit={handleSubmit}>
        <Box
         border={3} 
         borderColor="linear-gradient(90deg, rgba(236,109,5,1) 24%, rgba(151,212,103,1) 100%)" 
         borderRadius={10} 
         boxShadow="10px 10px 20px #ccc" 
         padding={3}         
         margin={"auto"} 
         marginTop={3}
         display="flex" 
         flexDirection={"column"} 
         width={"80%"}>

          <Typography 
          // className={classes.font}
          fontWeight={"bold"} 
          padding={3} 
          color="grey" 
          variant="h2" 
          textAlign={"center"}
          
          >
            Post Your Blog
          
          </Typography>
          <InputLabel sx={labelStyles}>Title</InputLabel>

          <TextField  name="title" onChange={handleChnage} value={inputs.title} margin="normal" variant="outlined"/>

          <InputLabel sx={labelStyles}>Description</InputLabel>

          <TextField name="description" onChange={handleChnage} value={inputs.description} margin="normal" variant="outlined"/>

          <InputLabel sx={labelStyles}>imageURL</InputLabel>

          <TextField name="imageURL" onChange={handleChnage} value={inputs.imageURL}  margin="normal" variant="outlined"/>
          
          <Button sx={{mt:2, borderRadius:4,}} variant="contained" color="warning" type="submit" >Submit</Button>
        </Box>
      </form>
    </div>)
  )
}

export default AddBlog