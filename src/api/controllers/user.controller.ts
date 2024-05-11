import { Request, Response } from "express";
import User from "../../models/user.model";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send("Error al crear el usuario");
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, avatar } = req.body;
    const user = new User({ name, email, password, avatar });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).send("Error al crear el usuario");
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send("Error al obtener el usuario");
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, avatar } = req.body;
    const user = await User.findByIdAndUpdate(id, { name, email, avatar });
    res.status(200).json(user);
  } catch (error) {
    return res.status(404).send("Usuario no encontrada");
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    return res.status(404).send("Usuario no encontrada");
  }
};
