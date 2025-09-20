// server.js
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');

const app = express();
const port = process.env.PORT || 3000;

// ------ SendGrid ----------------------------------------------------
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// ------ CORS (igual ao seu) ----------------------------------------
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
}));

app.use(express.json());

// ------ Rota de envio ----------------------------------------------
app.post('/send-email', async (req, res) => {
    const { nome, email, telefone, assunto, mensagem } = req.body;

    if (!nome || !email || !mensagem) {
        return res.status(400).json({
            message: 'Nome, e‑mail e mensagem são campos obrigatórios.',
        });
    }

    const msg = {
            to: process.env.RECEIVER_EMAIL,
            from: process.env.SENDER_EMAIL,
            subject: `Mensagem do Portfólio: ${assunto || 'Novo Contato'}`,
            html: `
        <h3>Detalhes do Contato:</h3>
        <ul>
            <li><strong>Nome:</strong> ${nome}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Telefone:</strong> ${telefone || 'Não informado'}</li>
            <li><strong>Assunto:</strong> ${assunto || 'Não informado'}</li>
        </ul>
        <h3>Mensagem:</h3>
        <p>${mensagem}</p>
        `,
    };

    try {
        await sgMail.send(msg);
        console.log(`Email enviado de ${nome} (${email})`);
        res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
    } catch (error) {
        console.error('Erro ao enviar e‑mail:', error);
        res.status(500).json({
            message: 'Erro ao enviar a mensagem. Tente novamente mais tarde.',
            error: error.message,
        });
    }
});

// ------ Inicialização ----------------------------------------------
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
