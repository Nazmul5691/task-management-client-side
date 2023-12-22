/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { AuthContext } from "../../Providers/Authproviders";


const SignUp = () => {
  const [registerError, setRegisterError] = useState('');
  const { createUser } = useContext(AuthContext);

  const handleRegister = e => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");

    // Check if the password meets your criteria
    const message = checkPasswordValidity(password);

    if (message) {
      setRegisterError(message);
      return;
    }

    // Create the user in Firebase Authentication
    createUser( email, password)
      .then(result => {
        // Registration was successful
        console.log(result.user);
        const createdAt = result.user?.metadata?.creationTime;
        const user = { email, createdAt: createdAt };

        // Send user data to your server (Assuming you have a server)
        fetch('https://task-management-server-side-orcin.vercel.app/user', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(user)
        })
          .then(res => res.json())
          .then(data => {
            if (data.insertedId) {
              Swal.fire("Registration Successful!", "You are now registered.", "success");
            }
          })
          .catch(error => {
            console.error(error);
          });
      })
      .catch(error => {
        // Registration failed
        if (error.code === 'auth/email-already-in-use') {
          setRegisterError('Email is already in use. Please choose a different one.');
        } else {
          setRegisterError('Registration error. Please try again.');
        }
      });
  };

  // Password validation function
  const checkPasswordValidity = (password) => {
    // Define your password validation criteria here
    const isNonWhiteSpace = /^\S*$/;
    if (!isNonWhiteSpace.test(password)) {
      return "Password must not contain Whitespaces.";
    }

    const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    if (!isContainsUppercase.test(password)) {
      return "Password must have at least one Uppercase Character.";
    }

    const isContainsLowercase = /^(?=.*[a-z]).*$/;
    if (!isContainsLowercase.test(password)) {
      return "Password must have at least one Lowercase Character.";
    }

    const isContainsNumber = /^(?=.*[0-9]).*$/;
    if (!isContainsNumber.test(password)) {
      return "Password must contain at least one Digit.";
    }

    const isContainsSymbol =
      /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
    if (!isContainsSymbol.test(password)) {
      return "Password must contain at least one Special Symbol.";
    }

    const isValidLength = /^.{8,16}$/;
    if (!isValidLength.test(password)) {
      return "Password must be 8-16 Characters Long.";
    }

    return null; // Password is valid
  };

  return (
    <div className="mb-16">
      <h2 className="text-2xl text-center mt-5 font-bold">Please Register</h2>
      <div className="card flex-shrink-0 mx-auto mt-6 w-full max-w-sm shadow-2xl bg-base-100">
        <form onSubmit={handleRegister} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              className="input input-bordered"
              required
            />
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">PhotoURL</span>
            </label>
            <input
              type="text"
              name="photo"
              placeholder="photoURL"
              className="input input-bordered"
              required
            />
          </div>
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
            <button className="btn btn-primary">Register</button>
          </div>
        </form>
        <p className="mb-5 ml-8">
          Already have an account? Please{" "}
          <Link to="/signIn">
            <span className="text-blue-700 font-bold">Sign In</span>
          </Link>
        </p>
      </div>
      <div className="text-center mt-3 text-red-600">
        {registerError && <p>{registerError}</p>}
      </div>
    </div>
  );
};

export default SignUp;
