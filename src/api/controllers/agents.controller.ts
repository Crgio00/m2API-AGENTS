import { Request, Response } from "express";
import Agents from '../../models/agents.model'

export const getAgents = async (req: Request, res: Response) => {
    try {
        const agents = await Agents.find();
        res.status(200).json(agents);
    } catch (error) {
        res.status(500).send('Error');
    }
}

export const getAgent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const agent = await Agents.findById(id);
        res.status(200).json(agent);
    } catch (error) {
        return res.status(404).send("Agente no encontrado");
    }
}

export const createAgent = async (req: Request, res: Response) => {

    try {
        const { name, description, q, e, c, x, avatar, role, dateOngame } = req.body;
        const hability = {
            q : q,
            e : e,
            c : c,
            x : x,
        };
        const agent = new Agents({ name, description, hability, avatar, role, dateOngame });
        await agent.save();
        res.status(201).json(agent);
      } catch (error) {
        res.status(500).send("Error al crear el usuario");
      }
    };

export const updateAgent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, description, q, e, c, x, avatar, role, dateOngame } = req.body;
        const hability = {
            q : q,
            e : e,
            c : c,
            x : x,
        };
        await Agents.findByIdAndUpdate(id, { name, description, hability, avatar, role, dateOngame });
        res.status(204).send();
    } catch (error) {
        return res.status(404).send("Usuario no encontrada");
    }
}

export const deleteAgent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await Agents.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        return res.status(404).send("Usuario no encontrada");
    }
}