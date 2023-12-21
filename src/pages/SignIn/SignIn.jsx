/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import Swal from 'sweetalert2'
import app from "../../Firebase/firebase.config";
import { AuthContext } from "../../Providers/Authproviders";

const SignIn = () => {


    const auth = getAuth(app); 
    const provider = new GoogleAuthProvider()

    const location = useLocation();
    const navigate = useNavigate()

    const handleGoogleSignIn = () => {
      signInWithPopup(auth, provider)
      .then(result =>{
        const user = result.user;
        Swal.fire("Login Successful!", "You are now logged in.", "success");
        navigate(location?.state ? location?.state: '/')
      })
      .catch(error =>{
        Swal.fire("Login Error", "Please add a valid email and password.", "error");
      })
    }


    

    const {login} = useContext(AuthContext)
    
    

    const handleLogin = e =>{
        e.preventDefault();
        // console.log(e.currentTarget);
        const form = new FormData(e.currentTarget);

        const email = form.get('email')
        const password = form.get('password')
        // console.log(email, password);

        login(email, password)
        .then(result =>{
            Swal.fire("Login Successful!", "You are now logged in.", "success");

            navigate(location?.state ? location.state: '/')
        })
        .catch(error =>{
            Swal.fire("Login Error", "Please add a valid email and password.", "error");
        })
       
    }




    return (
        <div className="mb-16">
      <h2 className="text-2xl text-center mt-10 font-bold">Please Login</h2>

      <div className="card flex-shrink-0 mx-auto mt-12 w-full max-w-sm shadow-xl bg-base-100">
        <form onSubmit={handleLogin} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              name="password"
              className="input input-bordered"
              required
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Login</button>
          </div>
        </form>
        <p className="mb-5 ml-8">
          Do not have an account? Please
          <Link to="/signUp">
            <span className="text-blue-700 font-bold"> Register</span>
          </Link>

          <div className="flex items-center justify-center mt-8">
        <button onClick={handleGoogleSignIn} className="btn bg-base-300">Login With Google</button>
      </div>
        </p>
        
      </div>
      
    </div>
    );
};

export default SignIn;