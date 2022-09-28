import connectDB from "../../../config/connectDB";
import Album from "../../../models/albumModel";

import { authOptions } from "../../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
connectDB();

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      await createAlbum(req, res);
      break;
    case "GET":
      await getAlbums(req, res);
      break;
    case "PUT":
      await modAlbum(req, res);
      break;
  }
}

const createAlbum = async (req, res) => {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ msg: "You must be logged in." });
    }

    const { userId } = session;
    const { name, album } = req.body;

    if (!album) return res.status(400).json({ msg: "Please add Album." });

    const newAlbum = new Album({
      name: name.toLowerCase(),
      listFiguritas: album,
      user: userId,
    });

    await newAlbum.save();
    res.json({ msg: "Success! Create a new todo." });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const getAlbums = async (req, res) => {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ msg: "You must be logged in." });
    }

    const { userId } = session;

    const dataAlbum = await Album.find({ user: userId });

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

const modAlbum = async (req, res) => {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ msg: "You must be logged in." });
    }

    const { userId } = session;
    const { album } = req.body;

    if (!album) return res.status(400).json({ msg: "Please add Album." });

    const filter = { user: userId };
    const update = { listFiguritas: album };

    let dataAlbum = await Album.findOneAndUpdate(filter, update, {
      new: true,
    });

    return res.status(200).json(dataAlbum);
  } catch (error) {
    return res.status(500).json({ msg: err.message });
  }
};
