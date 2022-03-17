import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

interface SignUpProps {
  password: string;
  email: string;
  first_name: string;
  last_name: string;
}

const SignUpController = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req;
  const { password, email, first_name, last_name } = body;

  try {
    const user = await axios.post(
      "https://nodari.onrender.com/users/sign-up",
      { password, email, name: `${first_name} ${last_name}` },
      { headers: { "Content-Type": "application/json" } }
    );
    if (user.data.id) {
      res.status(200).json({ success: true });
    }
  } catch (err) {}

  res.status(400).json({ success: false });
};

export default SignUpController;