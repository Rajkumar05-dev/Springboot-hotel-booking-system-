import React from "react";
import { useForm } from "react-hook-form";
function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const password = watch("password");

  const onSubmit = (data) => {
    console.log(data, errors);
    fetch("http://localhost:8080/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).catch((error) => console.log(error));
  };
  return (
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-blue-500"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Minimum 2 character are required",
                  },
                  maxLength: {
                    value: 40,
                    message: "Maximun  60 character are allowed",
                  },
                })}
              />
              <p className="text-danger m-1">
                {errors.name && errors.name.message}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-blue-500"
                {...register("email", {
                  required: "Email is required",
                  validate: async (value) => {
                    const res = await fetch(
                      `http://localhost:8080/users/${value}/check`
                    );
                    const data = await res.json();

                    return data ? "Email is already exists":true;
                  },
                })}
              />
              <p className="text-danger m-1">
                {errors.email && errors.email.message}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-blue-500"
                {...register("password")}
              />
             <p className="text-danger m-1">
                {errors.password && errors.password.message}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Re-enter password"
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-blue-500"
                {...register("confirmPassword", {
                  validate: (value) =>
                    value === password || 
                    "Password and confirmed Password  is not same",
                })}
              />
               <p className="text-danger m-1">
                {errors.confirmPassword && errors.confirmPassword.message}
              </p>
            </div>


            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 duration-200"
            >
              Register
            </button>
            <p className="text-center mt-3  ">
              Already have an account? <a className="text-blue-700" href="#">Login</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
