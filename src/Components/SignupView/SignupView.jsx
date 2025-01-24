import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Form, Button, Spinner, Alert, Container } from "react-bootstrap";
import "./SignupView.css";

const SignupView = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        name: "",
        birthday: "",
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const validate = () => {
        const errors = {};
        if (!formData.username.trim()) errors.username = "Username is required.";
        if (formData.password.length < 6) errors.password = "Password must be at least 6 characters.";
        if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Enter a valid email address.";
        if (!formData.name.trim()) errors.name = "Name is required.";
        if (!formData.birthday) errors.birthday = "Please select your birthday.";
        return errors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors({});
        setSuccessMessage("");

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                "https://amy-flix-movie-app-ce4aa0da3eb4.herokuapp.com/users",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                }
            );

            if (!response.ok) throw new Error("Signup failed");

            setSuccessMessage("Signup successful! Please log in.");
            setFormData({
                username: "",
                password: "",
                email: "",
                name: "",
                birthday: "",
            });
        } catch (error) {
            setErrors({ general: "Signup failed. Please try again later." });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <Container className="signup-view-container mt-4 p-3">
            <h2 className="text-center mb-4">Sign Up for AmyFlix</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="row mb-3" controlId="signupUsername">
                    <Form.Label className="col-sm-3 col-form-label">Username</Form.Label>
                    <div className="col-sm-9">
                        <Form.Control
                            type="text"
                            placeholder="Enter your username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            isInvalid={!!errors.username}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.username}
                        </Form.Control.Feedback>
                    </div>
                </Form.Group>

                <Form.Group className="row mb-3" controlId="signupPassword">
                    <Form.Label className="col-sm-3 col-form-label">Password</Form.Label>
                    <div className="col-sm-9">
                        <Form.Control
                            type="password"
                            placeholder="Enter your password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            isInvalid={!!errors.password}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.password}
                        </Form.Control.Feedback>
                    </div>
                </Form.Group>

                <Form.Group className="row mb-3" controlId="signupEmail">
                    <Form.Label className="col-sm-3 col-form-label">Email</Form.Label>
                    <div className="col-sm-9">
                        <Form.Control
                            type="email"
                            placeholder="Enter your email address"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            isInvalid={!!errors.email}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.email}
                        </Form.Control.Feedback>
                    </div>
                </Form.Group>

                <Form.Group className="row mb-3" controlId="signupName">
                    <Form.Label className="col-sm-3 col-form-label">Name</Form.Label>
                    <div className="col-sm-9">
                        <Form.Control
                            type="text"
                            placeholder="Enter your full name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            isInvalid={!!errors.name}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.name}
                        </Form.Control.Feedback>
                    </div>
                </Form.Group>

                <Form.Group className="row mb-3" controlId="signupBirthday">
                    <Form.Label className="col-sm-3 col-form-label">Birthday</Form.Label>
                    <div className="col-sm-9">
                        <Form.Control
                            type="date"
                            placeholder="Select your birthday"
                            name="birthday"
                            value={formData.birthday}
                            onChange={handleChange}
                            isInvalid={!!errors.birthday}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.birthday}
                        </Form.Control.Feedback>
                    </div>
                </Form.Group>

                {errors.general && (
                    <Alert variant="danger" className="mb-3">
                        {errors.general}
                    </Alert>
                )}

                {successMessage && (
                    <Alert variant="success" className="mb-3">
                        {successMessage}
                    </Alert>
                )}

                <div className="text-center">
                    <Button type="submit" variant="primary" disabled={loading}>
                        {loading ? <Spinner animation="border" size="sm" /> : "Sign Up"}
                    </Button>
                </div>
            </Form>
            <p className="text-center mt-3">
                Already have an account?{" "}
                <span
                    onClick={() => navigate("/login")} // Navigate to the login page
                    className="toggle-link"
                    tabIndex={0}
                >
                    Log In
                </span>
            </p>
        </Container>
    );
};

export default SignupView;
