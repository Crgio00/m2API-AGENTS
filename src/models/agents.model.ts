import mongoose, { Schema, Document } from "mongoose";

interface IHabilidad {
    nombre: string;
    descripcion: string;
    imagen: string;
}

interface IAgents extends Document {
    name: string;
    description: string;
    hability: {
        habilidad1: IHabilidad;
        habilidad2: IHabilidad;
        habilidad3: IHabilidad;
        habilidad4: IHabilidad;
    };
    avatar: string;
    rol: string;
    dateOngame: string;
}

const habilidadSchema = new Schema<IHabilidad>({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    imagen: { type: String, required: true }
});

const agentsSchema = new Schema<IAgents>({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    hability: {
        habilidad1: { type: habilidadSchema, required: true },
        habilidad2: { type: habilidadSchema, required: true },
        habilidad3: { type: habilidadSchema, required: true },
        habilidad4: { type: habilidadSchema, required: true },
    },
    avatar: { type: String, required: true },
    rol: { type: String, required: true },
    dateOngame: { type: String, required: true },
});

export default mongoose.model<IAgents>('Agents', agentsSchema);
