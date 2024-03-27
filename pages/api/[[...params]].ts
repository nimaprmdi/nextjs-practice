import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { params } = req.query;

  console.log("params", params);

  res.status(200).json({ message: "Hello" });
}
