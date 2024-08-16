import React, { useState } from "react";
import { useMutation } from "react-query";
import { createUser } from "../../services/UserService";
import { useUserStore } from "../../store/UseUserStore";

const AddUser: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
  });

  const addUser = useUserStore((state) => state.addUser);
  const { mutate, isLoading, error } = useMutation(createUser, {
    onSuccess: (data) => {
      addUser({
        id: data.id,
        firstName,
        lastName,
        email,
        phone,
        position,
      });

      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setPosition("");
      setErrors({ firstName: "", lastName: "", email: "", phone: "", position: "" });
    },
  });

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors = {
      firstName: firstName ? "" : "First Name is required*",
      lastName: lastName ? "" : "Last Name is required*",
      email: !email ? "Email is required*" : !emailRegex.test(email) ? "Invalid email format" : "",
      phone: phone ? "" : "Phone is required*",
      position: position ? "" : "Position is required*",
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      mutate({ firstName, lastName, email, phone, position });
    }
  };

  function isError(error: unknown): error is Error {
    return error instanceof Error;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="card">
          <div className="card-header text-center">
            <h5>Add User</h5>
          </div>
          <div className="card-body">
            <div className="form-floating mb-2">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="form-control"
              />
              <label>First Name</label>
              {errors.firstName && (
                <p className="text-danger">{errors.firstName}</p>
              )}
            </div>
            <div className="form-floating mb-2">
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="form-control"
              />
              <label>Last Name</label>
              {errors.lastName && (
                <p className="text-danger">{errors.lastName}</p>
              )}
            </div>
            <div className="form-floating mb-2">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
              />
              <label>Email</label>
              {errors.email && (
                <p className="text-danger">{errors.email}</p>
              )}
            </div>
            <div className="form-floating mb-2">
              <input
                type="number"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-control"
              />
              <label>Phone</label>
              {errors.phone && (
                <p className="text-danger">{errors.phone}</p>
              )}
            </div>
            <div className="form-floating mb-2">
              <input
                type="text"
                placeholder="Position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="form-control"
              />
              <label>Position</label>
              {errors.position && (
                <p className="text-danger">{errors.position}</p>
              )}
            </div>
          </div>
          <div className="card-footer">
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary btn-sm w-100"
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>

            {isError(error) && (
              <p className="text-warning">Error adding user: {error.message}</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
