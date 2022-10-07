import connectDB from "../../../config/connectDB";
import Album from "../../../models/albumModel";

import { authOptions } from "../../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
connectDB();

export default async function albumHandler(req, res) {
  switch (req.method) {
    case "GET":
      await getAlbumEmail(req, res);
      break;
  }
}

const getAlbumEmail = async (req, res) => {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ msg: "You must be logged in." });
    }

    const { id } = req.query;

    const dataAlbum = await Album.find({ name: id });

    if (dataAlbum.length === 0) {
      return res
        .status(206)
        .json({ msg: "Album no encontrado", noExiste: true });
    }

    res.status(200).json(dataAlbum);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
