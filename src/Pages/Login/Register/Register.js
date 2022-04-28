import React, { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../../firebase.init";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import SocialLogin from "../SocialLogin/SocialLogin";
import { async } from "@firebase/util";
import Loading from "../../Shared/Loading/Loading";
import PageTitle from "../../Shared/PageTitle/PageTitle";

const Register = () => {
  const [agree, setAgree] = useState(false);
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
  const [updateProfile, updating, updatedError] = useUpdateProfile(auth);

  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    //const name = e.target.name.value

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    // const agree = e.target.terms.checked;

    await createUserWithEmailAndPassword(email, password);
    await updateProfile({ displayName: name, updating });
    alert("Updated profile");
    navigate("/home");
    console.log(name, email, password);
  };

  const navigate = useNavigate();
  const navigateLogin = (e) => {
    navigate("/login");
  };
  // if (user) {
  //   navigate("/home");
  // }

  if (loading || updating) {
    return <Loading></Loading>;
  }

  return (
    <div className="contianer w-50 mx-auto">
      <PageTitle title="Register"></PageTitle>
      <h2 className="text-primary text-center">Please Register</h2>

      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Control
            ref={nameRef}
            type="text"
            name="name"
            placeholder="Enter user name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            ref={emailRef}
            type="email"
            name="email"
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            ref={passwordRef}
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            className={agree ? "text-primary" : "text-danger"}
            onClick={() => setAgree(!agree)}
            type="checkbox"
            name="terms"
            label="Accept Terms and Condition"
          />
        </Form.Group>
        <Button
          disabled={!agree}
          variant="primary w-50 mx-auto d-block"
          type="submit"
        >
          Register
        </Button>
      </Form>

      <p>
        Already Registered?{" "}
        <Link
          to="/login"
          className="text-primary pe-auto text-decoration-none"
          onClick={navigateLogin}
        >
          Please Login
        </Link>
      </p>

      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;
