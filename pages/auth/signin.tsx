import * as React from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getCsrfToken } from "next-auth/react";
import { Badge, Logo } from "lib/shared-ui";
import { Form } from "lib/forms/core";
import Link from "next/link";

const messageMapping = {
  CredentialsSignin: "Email or password is incorrect",
  SuccessfullSignUp:
    "You successfully signed up. Please sign in now with your email and password.",
};

function messageToText(text: keyof typeof messageMapping) {
  return messageMapping[text] || messageMapping['CredentialsSignin'];
}

export default function SignIn({
  csrfToken,
  message,
  messageType,
}: {
  csrfToken: string;
  message: keyof typeof messageMapping;
  messageType: "error" | "success";
}) {
  const messageText = React.useMemo(() => messageToText(message), [message]);
  const router = useRouter();
  const { callbackUrl } = router.query;

  return (
    <div className="h-full min-h-screen bg-gray-50">
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div>
              <Logo size="2xl" />

              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign in to your account
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Or
                <Link href="/auth/signup">
                  <a className="ml-1 font-medium text-indigo-600 hover:text-indigo-500">
                    Create a new account
                  </a>
                </Link>
              </p>
            </div>
            <Form
              method="POST"
              action="/api/auth/callback/credentials"
              fields={[
                {
                  id: "csrfToken",
                  type: "hidden",
                  defaultValue: csrfToken,
                },
                {
                  id: "callbackUrl",
                  type: "hidden",
                  defaultValue: callbackUrl as string,
                },
                {
                  id: "email",
                  type: "email",
                  label: "Email",
                  errorText:
                    "Email has to be present and be a valid email address",
                  validations: {
                    required: true,
                  }
                },
                {
                  id: "password",
                  type: "password",
                  label: "Password",
                  errorText:
                    "Email has to be present and be a valid email address",
                validations: {
                  required: true,
                }
                },
              ]}
            >
              {messageText && (
                <div className="flex mb-4 justify-center w-full">
                  <Badge
                    className="text-center"
                    color={messageType === "error" ? "red" : "green"}
                  >
                    {messageText}
                  </Badge>
                </div>
              )}
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const error = context.query?.error?.toString();
  return {
    props: {
      csrfToken: await getCsrfToken(context),
      message: error || context.query?.message?.toString() || null,
      messageType: error ? "error" : "success",
    },
  };
};
