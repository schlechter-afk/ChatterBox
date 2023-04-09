// import React from 'react';
// import {useEffect} from 'react';
// import { GoogleLogin } from 'react-google-login';
// // refresh token
// import { refreshTokenSetup } from './refreshtoken';
// import {gapi} from 'gapi-script';


// function Login() {
//     const clientId = '909887563894-bbp3lm706p3t0pd5173gaerbijfar93i.apps.googleusercontent.com';
//     useEffect(()=>{
//         gapi.load("client:auth2",()=>{
//             gapi.auth2.init({clientId:clientId});
//         })
//     },[])
//   const onSuccess = (res) => {
//     console.log('Login Success: currentUser:', res.profileObj);
//     console.log(res);
//     return (
//       <div><input/></div>
//     )
//     // approval_prompt = true;
//     // localStorage.setItem("loginWith", "Google")
//     // localStorage.setItem("email", res.profileObj.email);
//     // refreshTokenSetup(res);
//   };

//   const onFailure = (res) => {
//     console.log('Login failed: res:', res);
//   };

//   return (
//     <div>
//       <GoogleLogin
//         clientId={clientId}
//         buttonText="Login"
//         onSuccess={onSuccess}
//         onFailure={onFailure}
//         // cookiePolicy={'single_host_origin'}
//         style={{ marginTop: '100px' }}
//         // isSignedIn={true}
//       />
//     </div>
//   );
// }

// export default Login;