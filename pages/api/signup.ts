import type { NextApiRequest, NextApiResponse } from "next";
import { externalApis } from 'lib/api'

const SignUpController = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body: { password, email, first_name, last_name } } = req;

  try {
    const user = await externalApis.redarApi.signUp({
      password,
      email,
      name: `${first_name} ${last_name}`
    })

    if (user.data?.id) {
      res.status(200).json({ success: true });
    }
  } catch (err) {}

  res.status(400).json({ success: false });
};

export default SignUpController;
