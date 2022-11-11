import {Box, Button, InputLabel, TextField, Typography} from "@mui/material";
import React, { useEffect, useState } from 'react'
import {useParams, useNavigate} from "react-router-dom"
import axios from "axios";
const labelStyles = {mb:1,mt:2, fontSize:"24px", fontWeight:"bold"}

const BlogDetail = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState();
  const id = useParams().id;
  console.log(id);

  const [inputs, setInputs] = useState({
  
  })

  const handleChnage = (e) => {
    setInputs((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value
    }));

  }

  const fetchDetails = async () => {
    const res = await axios.get(`http://localhost:7000/api/blog/${id}`).catch(err=>console.log(err))
    const data = await res.data;
    return data
  }
  useEffect(()=>{
    fetchDetails().then((data) => {
    setBlog(data.blog) 
    setInputs({title:data.blog.title, description:data.blog.description,})
  })

  },[id]);
  const sendRequest = async() => {
    const res = await axios.put(`http://localhost:7000/api/blog/update/${id}`, {
      title: inputs.title,
      description: inputs.description,
    }).catch(err=>console.log(err));

    const data = await res.data;
    return data;
  }
  console.log(blog);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(data=>console.log(data)).then(()=>navigate("/myBlogs/"))
  }
  return (
    <div>

      {inputs &&

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
          fontWeight={"bold"} 
          padding={3} 
          color="grey" 
          variant="h2" 
          textAlign={"center"}
          
          >
            Post Your Blog
          
          </Typography>
          <InputLabel sx={labelStyles}>Title</InputLabel>
          <TextField name="title" onChange={handleChnage} value={inputs.title} margin="normal" variant="outlined"/>
          <InputLabel sx={labelStyles}>Description</InputLabel>
          <TextField name="description" onChange={handleChnage} value={inputs.description} margin="normal" variant="outlined"/>
          <Button sx={{mt:2, borderRadius:4,}} variant="contained" color="warning" type="submit" >Submit</Button>
        </Box>
      </form>

      }</div>
  )
}

export default BlogDetail