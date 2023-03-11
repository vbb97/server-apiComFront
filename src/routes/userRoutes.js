import express from "express";
import loginRequired from "../middlewares/loginRequired";
import User from "../models/User";
import Contact from "../models/Contact";
const router = express.Router();

/* router.get('/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const user = await User.findOne({ _id: id }, { '_id': 0, 'password': 0, '__v': 0 });
        if(!user) return res.status(200).json({ message: 'Usuário não existe.' });
        return res.status(200).json(user);
    } catch (e) {
        return res.status(500).json({ message: 'Algo deu errado.' });
    };  
}); */

router.post('/', async (req, res) => { 
    const { name, email, password, passwordConfirm } = req.body;

    if(!name) return res.status(400).json({ message: 'O campo nome é obrigatório.' });
    if(!email) return res.status(400).json({ message: 'O campo email é obrigatório.' });
    if(!password) return res.status(400).json({ message: 'O campo nome é obrigatório.' });
    if(password && passwordConfirm != password) return res.status(400).json({ message: 'As senhas precisam ser iguais.' });

    try {
        let user = await User.findOne({ email });
        if(user) return res.status(200).json({ message: 'E-mail já cadastrado.' })
        user = await User.create({ name, email, password });
        return res.status(201).json({ message: 'Usuário criado.' });
    } catch (e) {
        return res.status(500).json({ message: 'Algo deu errado.' });
    };
});

router.delete('/', loginRequired, async (req, res) => {
    try {
        await User.deleteOne({ _id: req.userId });
        await Contact.deleteMany({ userId: req.userId });
        return res.status(200).json({ message: 'Usuário deletado com sucesso.' });
    } catch (e) {
        return res.status(500).json({ message: 'Algo deu errado.' });
    };
});

export default router;