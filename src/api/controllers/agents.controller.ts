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
        const {
            name,
            description,
            habilidad1,
            habilidad2,
            habilidad3,
            habilidad4,
            avatar,
            rol,
            dateOngame
        } = req.body;

        // Crea el nuevo agente con los datos recibidos en el request body
        const nuevoAgente = new Agents({
            name,
            description,
            hability: {
                habilidad1,
                habilidad2,
                habilidad3,
                habilidad4
            },
            avatar,
            rol,
            dateOngame
        });
        
        // Guarda el nuevo agente en la base de datos
        await nuevoAgente.save();

        // Envía una respuesta exitosa con el nuevo agente creado
        res.status(201).json(nuevoAgente);
    } catch (error) {
        console.error(error);
        // Envía una respuesta de error en caso de fallo
        res.status(500).send("Error al crear el agente");
    }
};

export const updateAgent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const {
            name,
            description,
            habilidad1,
            habilidad2,
            habilidad3,
            habilidad4,
            avatar,
            rol,
            dateOngame
        } = req.body;
        await Agents.findByIdAndUpdate(id, {
            name,
            description,
            hability: {
                habilidad1,
                habilidad2,
                habilidad3,
                habilidad4
            },
            avatar,
            rol,
            dateOngame
        });
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