import * as React from "react";
import { Badge, Logo } from "lib/shared-ui";
import { Form } from "lib/forms/core";
import Link from "next/link";
import { useMutation } from "react-query";
import axios from "axios";

export default function SignUp() {
  const [showError, setShowError] = React.useState(false);

  const mutation = useMutation(
    (data) => {
      return axios.post("/api/signup", data);
    },
    {
      onSuccess: () => {
        window.location.href = "/auth/signin?message=SuccessfullSignUp";
      },
      onError: () => {
        setShowError(true);
      },
    }
  );

  return (
    <div className="h-full min-h-screen bg-gray-50">
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="mb-6">
              <Logo size="2xl" />
              <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
                Create a new account
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Or
                <Link href="/auth/signin">
                  <a className="ml-1 font-medium text-indigo-600 hover:text-indigo-500">
                    Sign in to your account
                  </a>
                </Link>
              </p>
            </div>
            <Form
              onSubmit={(data) => mutation.mutate(data)}
              fields={[
                {
                  id: "first_name",
                  type: "text",
                  label: "First Name",
                  validations: {
                    minLength: 5,
                    required: true,
                  },
                },
                {
                  id: "last_name",
                  type: "text",
                  label: "Last Name",
                  validations: {
                    required: true,
                  },
                },
                {
                  id: "email",
                  type: "email",
                  label: "Email",
                  errorText:
                    "Email has to be present and be a valid email address",
                  validations: {
                    required: true,
                  },
                },
                {
                  id: "password",
                  type: "password",
                  label: "Password",
                  errorText:
                    "Email has to be present and be a valid email address",
                  validations: {
                    required: true,
                  },
                },
              ]}
            >
              {showError && (
                <div className="flex mb-4 justify-center w-full">
                  <Badge className="text-center" color="red">
                    Something went wrong, please try again or contact us if the
                    error persists.
                  </Badge>
                </div>
              )}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign Up
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>ƒ
    </div>
  );
}