import React, { useState } from 'react';
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux"
import{AppBar, Toolbar, Typography, Box, Button, Tabs, Tab} from "@mui/material"
import { authActions } from '../store';

const Header = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state=>state.isLoggedIn);
    const [value, setValue] = useState();
  return (
   <AppBar position='sticky' sx={{background:"linear-gradient(90deg, rgba(236,109,5,1) 24%, rgba(151,212,103,1) 100%)"}}>
    <Toolbar>
        <Typography variant='h5'>The Hackathon Blog</Typography>
        {isLoggedIn && <Box display="flex" marginLeft={"auto"} marginRight="auto">
            <Tabs textColor='inherit' value={value} onChange={(e,val)=>setValue(val)}>
                <Tab LinkComponent={Link} to="/blogs" label="All Blogs"/>
                <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs"/>
                <Tab LinkComponent={Link} to="/blogs/add" label="Add Blog"/>
            </Tabs>
        </Box>}
        <Box display="flex" marginLeft="auto">
            {!isLoggedIn && <> <Button LinkComponent={Link} to="/auth" variant='contained' sx={{margin:1,borderRadius:5}} color='warning'>
                Login
                </Button>
            <Button LinkComponent={Link} to="/auth" variant='contained' sx={{margin:1,borderRadius:5}} color='warning'>
                Signup
                </Button> </>}
            {isLoggedIn && <Button onClick={()=>dispatch(authActions.logout())} LinkComponent={Link} to="/auth" variant='contained' sx={{margin:1,borderRadius:5}} color='warning'>
                Logout
                </Button>}
        </Box>
    </Toolbar>
   </AppBar>
  )
}

export default Header;