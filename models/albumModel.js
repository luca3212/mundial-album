import mongoose from "mongoose";

const figuritas = new mongoose.Schema({
  idFigurita: { type: String, required: true },
  laTengo: { type: Boolean },
  esRepetida: { type: Boolean },
  nroRepetida: { type: Number },
});

const categorias = new mongoose.Schema({
  id: { type: Number, require: true },
  nombre: { type: String },
  abre: { type: String },
  cantidad: { type: Number },
  figus: [figuritas],
});

const albumSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    listFiguritas: [categorias],
    user: { type: mongoose.Types.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

let Dataset = mongoose.models.album || mongoose.model("album", albumSchema);

export default Dataset;
