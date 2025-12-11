import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const navigate = useNavigate(); // for redirect
  const [success, setSuccess] = React.useState(false);
  const password = watch("password");

  const onSubmit = (data) => {
    fetch("http://localhost:8080/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          setSuccess(true); // Show popup
        } else {
          alert("Registration failed!");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      {/* SUCCESS POPUP */}
      {success && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-xl text-center w-80">
            <h2 className="text-2xl font-bold text-green-600 mb-3">
              Registration Successful!
            </h2>
            <p className="text-gray-700 mb-4">
              Your account has been created successfully.
            </p>

            <button
              onClick={() => navigate("/login")} // redirect to login
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* MAIN REGISTER FORM */}
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white shadow-xl rounded-xl flex max-w-5xl w-full overflow-hidden">
          <div className="hidden md:block w-1/2">
            <img
              src="https://media.istockphoto.com/id/903175876/photo/deluxe-hotel-and-casino-resort-in-macao.jpg?s=612x612&w=0&k=20&c=x9SLdBX2sKUsNjQbTFbio_oqVAQ5pO5NhL82S9hxLVI="
              alt="Hotel"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
              Register
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Minimum 2 characters required",
                    },
                    maxLength: {
                      value: 60,
                      message: "Maximum 60 characters allowed",
                    },
                  })}
                />
                <p className="text-red-500 text-sm mt-1">
                  {errors.name?.message}
                </p>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                  {...register("email", {
                    required: "Email is required",
                    validate: async (value) => {
                      const res = await fetch(
                        `http://localhost:8080/users/${value}/check`
                      );
                      const data = await res.json();
                      return data ? "Email already exists" : true;
                    },
                  })}
                />
                <p className="text-red-500 text-sm mt-1">
                  {errors.email?.message}
                </p>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter password"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters required",
                    },
                  })}
                />
                <p className="text-red-500 text-sm mt-1">
                  {errors.password?.message}
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Re-enter password"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                  {...register("confirmPassword", {
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword?.message}
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
              >
                Register
              </button>

              <p className="text-center mt-3">
                Already have an account?
                <a className="text-blue-700" href="/login">
                  {" "}
                  Login
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
