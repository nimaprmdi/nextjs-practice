import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/utils/connectDB";
import User from "@/models/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectDB();
  } catch (err) {
    res.status(500).json({ status: "failed", message: "Internal Server Error" });
  }

  if (req.method === "POST") {
    // Get body from request
    const { name } = req.body;

    // Validation
    if (!name || name.length <= 3) {
      res.status(422).json({ status: "Failed", message: "You Have Entered Wrong Value" });
      return;
    }

    try {
      // !! We can add to mongoDb with 2 ways

      // !! Way ONE
      // const user = new User({ name });
      // await user.save();

      // !! Way TWO - no need for user.save() here
      const user = await User.create({ name, age: 25, email: "nima.gt10@gmail.com" });

      // if was OK
      res.status(201).json({ status: "Success", message: "Value has been added", data: { name } });
    } catch (err) {
      res.status(500).json({ status: "failed", message: "Server Could'nt add item to DB" });
    }
  }
}
