import express from "express";
import loginRequired from "../middlewares/loginRequired";
import Contact from "../models/Contact";

const router = express.Router();

router.get('/', loginRequired, async (req, res) => {
    try {
        const contacts = await Contact.find({ userId: req.userId });
        return res.status(200).json(contacts)
    } catch (e) {
        return res.status(500).json(e)
    };
});

router.post('/', loginRequired, async (req, res) => {
    const { name, email } = req.body;

    if(!name) return res.status(400).json({ message: 'O campo nome é obrigatório.' });
    if(!email) return res.status(400).json({ message: 'O campo email é obrigatório.' });

    try {
        const contact = await Contact.create({ name, email, userId: req.userId });
        return res.status(201).json(contact);
    } catch (e) {
        return res.status(500).json({ message: 'Algo deu errado.' });
    };
});

router.patch('/:id', loginRequired, async (req, res) => {
    const updatedContact = req.body;
    
    try {
        const contact = await Contact.updateOne({ _id: req.params.id }, updatedContact);
        if(contact.matchedCount === 0) return res.status(200).json({ message: 'Contato não existe.' });
        return res.status(200).json({ message: 'Contato atualizado.' });
    } catch (e) {
        return res.status(500).json({ message: 'Algo deu errado.' });
    };
});

router.delete('/:id', loginRequired, async (req, res) => {
    try {
        await Contact.deleteOne({ _id: req.params.id });
        return res.status(200).json({ message: 'Contato deletado com sucesso.' });
    } catch (e) {
        return res.status(500).json({ message: 'Algo deu errado.' });
    };
});

export default router;