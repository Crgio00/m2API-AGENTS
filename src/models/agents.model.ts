import mongoose, { Schema, Document } from "mongoose";

interface IAgents extends Document {
    name: String;
    description: String;
    hability: {
        q: String;
        e: String;
        c: String;
        x: String;
    };
    avatar: string;
    rol: string;
    dateOngame: string;
}

const agentsSchema = new Schema<IAgents>({
    name: {type :String, required:true, unique:true},
    description: {type :String, required:true},
    hability: {
        q: {type :String, required:true},
        e: {type :String, required:true},
        c: {type :String, required:true},
        x: {type :String, required:true},
    },
    avatar: {type :String, required:true},
    rol: {type :String, required:true},
    dateOngame: {type :String, required:true},   
});

export default mongoose.model<IAgents>('Agents', agentsSchema)