import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import externalApi from "lib/api/external";

// TODO: add schooling

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (req.method !== "POST" || !session) {
    res.end();
    return;
  }

  try {
    const { status, id, date } = req.body;
    const { data } = await externalApi.home.setOfferStatus(status, id, date);

    if (session.role !== "admin") {
      const userId = session.user_id as number;
      const userName = session.user?.name;

      await externalApi.redarApi.messageBus.alert(
        `${userName} (id:${userId}) updated offer status (status id:${data.id}) to ${data.status}`
      );
    }

    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    return e;
  }
}
