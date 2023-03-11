import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
const router = express.Router();

router.post('/', async (req, res) => {
    const { email, password} = req.body;

    if(!email) return res.status(200).json({ message: 'O campo email é obrigatório.' });
    if(!password) return res.status(200).json({ message: 'O campo senha é obrigatório.' });

    try {
        const user = await User.findOne({ email });
        if(!user) return res.status(200).json({ message: 'E-mail não cadastrado.' });
        if(!bcrypt.compareSync(password, user.password)) return res.status(200).json({ message: 'Senha inválida.' });

        const token = jwt.sign({ id: user._id }, process.env.SECRET);

        return res.status(201).json({ token, id: user._id });
    } catch (e) {
        return res.status(500).json({ message: 'Algo deu errado.' });
    };
});

export default router;