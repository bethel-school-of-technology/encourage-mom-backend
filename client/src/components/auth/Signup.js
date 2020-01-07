// import React, { Fragment, useState } from 'react';
// // import axios from axios

// const Signup = () => {
//     const [formData, setFormData] = useState({
//         name:'',
//         email:'',
//         username: '',
//         password: '',
//         password2: '',
//     });

//     const { name, email, username, password, password2 } = formData

//     const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

//     const onSubmit = async e => {
//         e.preventDefault();
//         if(password !== password2){
//             console.log('Passwords do not match')
//         } else newUser = {
//             name,
//             email,
//             username,
//             password
//         }

//         try {
//             const config = {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             }

//             const body = JSON.stringify(newUser);

//             const es = await axios.post();
//         } catch (err) {

//         }
//     }
//     return <Fragment>
//         {/* Add Signup Form from Frontend */}
//         {/* Don't forget to add value and onchange to input tags and "onSubmit={e => onSubmit(e)} to form tag" */}

//     </Fragment>
// }

// export default Signup