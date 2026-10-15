require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // Servir arquivos estáticos (HTML, CSS, JS)

// Rotas amigáveis (slugs)
app.get('/diagnostico', (req, res) => {
    res.sendFile(path.join(__dirname, 'diagnostico.html'));
});
app.get('/orion', (req, res) => {
    res.redirect(301, '/diagnostico');
});
app.get('/orion.html', (req, res) => {
    res.redirect(301, '/diagnostico.html');
});

app.get('/marco-zero', (req, res) => {
    res.sendFile(path.join(__dirname, 'marco-zero.html'));
});
app.get('/orion-master', (req, res) => {
    res.redirect(301, '/marco-zero');
});
app.get('/orion-master.html', (req, res) => {
    res.redirect(301, '/marco-zero.html');
});

app.get('/checkout', (req, res) => {
    res.sendFile(path.join(__dirname, 'checkout.html'));
});
app.get('/obrigado', (req, res) => {
    res.sendFile(path.join(__dirname, 'obrigado.html'));
});

// Neon PostgreSQL Connection
const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_1phb6mVOoBuZ@ep-rough-sound-acrq49hl-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require',
});

// Initialize and migrate table
async function initDB() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS orion_leads (
                id SERIAL PRIMARY KEY,
                nome_negocio VARCHAR(255),
                email VARCHAR(255) NOT NULL,
                whatsapp VARCHAR(20),
                q1_destino_link VARCHAR(1),
                q2_impressao_cliente VARCHAR(1),
                q3_controle_design VARCHAR(1),
                q4_taxa_abandono VARCHAR(1),
                q5_dominio_proprio VARCHAR(1),
                q6_resposta VARCHAR(1),
                q7_resposta VARCHAR(1),
                pontuacao_real INT NOT NULL,
                pontuacao_exibida INT NOT NULL,
                media_mercado INT DEFAULT 65,
                utm_source VARCHAR(100),
                utm_medium VARCHAR(100),
                utm_campaign VARCHAR(100),
                ip_address VARCHAR(45),
                user_agent TEXT,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `);
        
        // Add new columns if they don't exist (Migration safe)
        try { await pool.query('ALTER TABLE orion_leads ADD COLUMN nome_negocio VARCHAR(255);'); } catch (e) {}
        try { await pool.query('ALTER TABLE orion_leads ADD COLUMN q6_resposta VARCHAR(1);'); } catch (e) {}
        try { await pool.query('ALTER TABLE orion_leads ADD COLUMN q7_resposta VARCHAR(1);'); } catch (e) {}

        console.log('✅ Tabela orion_leads verificada/migrada no Neon DB');
    } catch (err) {
        console.error('Erro ao verificar/migrar tabela:', err);
    }
}
initDB();

// Route to handle lead submission
app.post('/api/save-lead', async (req, res) => {
    try {
        const { nome_negocio, email, whatsapp, respostas, pontuacao_real, pontuacao_exibida } = req.body;
        
        // Coletar metadados básicos
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const userAgent = req.headers['user-agent'];
        
        const utm_source = req.body.utm_source || null;
        const utm_medium = req.body.utm_medium || null;
        const utm_campaign = req.body.utm_campaign || null;

        const insertQuery = `
            INSERT INTO orion_leads (
                nome_negocio, email, whatsapp, 
                q1_destino_link, q2_impressao_cliente, q3_controle_design, 
                q4_taxa_abandono, q5_dominio_proprio, q6_resposta, q7_resposta,
                pontuacao_real, pontuacao_exibida, media_mercado,
                utm_source, utm_medium, utm_campaign, ip_address, user_agent
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18
            ) RETURNING id;
        `;

        const values = [
            nome_negocio, email, whatsapp,
            respostas.q1, respostas.q2, respostas.q3, respostas.q4, respostas.q5, respostas.q6, respostas.q7,
            pontuacao_real, pontuacao_exibida, 65, // média mercado fixa
            utm_source, utm_medium, utm_campaign, ip, userAgent
        ];

        const result = await pool.query(insertQuery, values);
        console.log(`🚀 Novo Lead Salvo! ID: ${result.rows[0].id} | Empresa: ${nome_negocio} | Nota: ${pontuacao_exibida}`);
        res.status(200).json({ success: true, leadId: result.rows[0].id });
    } catch (error) {
        console.error('❌ Erro ao salvar lead:', error);
        res.status(500).json({ success: false, error: 'Erro interno ao salvar no banco de dados' });
    }
});

// Route to handle checkout user creation
app.post('/api/checkout', async (req, res) => {
    try {
        const { name, email, whatsapp } = req.body;

        if (!name || !email) {
            return res.status(400).json({ success: false, error: 'Nome e e-mail são obrigatórios.' });
        }

        // Generate a random temporary password
        const tempPassword = Math.random().toString(36).slice(-8);

        const insertQuery = `
            INSERT INTO orion_users (name, email, whatsapp, password) 
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (email) 
            DO UPDATE SET name = EXCLUDED.name, whatsapp = EXCLUDED.whatsapp, password = EXCLUDED.password
            RETURNING id;
        `;
        
        const result = await pool.query(insertQuery, [name, email, whatsapp, tempPassword]);

        // Simulação do envio de e-mail com os dados de acesso
        console.log("\n=======================================");
        console.log(`[SIMULAÇÃO DE SISTEMA] E-mail enviado para: ${email}`);
        console.log(`Assunto: Seu acesso VIP à Infraestrutura Orion foi criado!`);
        console.log(`Olá, ${name}. Seu usuário está pronto.`);
        console.log(`Login: ${email}`);
        console.log(`Senha temporária: ${tempPassword}`);
        console.log("=======================================\n");

        res.status(200).json({ 
            success: true, 
            userId: result.rows[0].id,
            redirectUrl: 'https://www.asaas.com/c/kxdlx65tufqnqsfv'
        });
    } catch (err) {
        console.error('❌ Erro ao processar checkout:', err);
        res.status(500).json({ success: false, error: 'Erro interno ao processar dados de acesso.' });
    }
});

// ==========================================
// ROTA: CHECKOUT TRANSPARENTE ASAAS
// ==========================================
app.post('/api/asaas-charge', async (req, res) => {
    try {
        const { 
            name, email, cpf, whatsapp, cep, addressNumber,
            ccNum, ccName, ccExpMonth, ccExpYear, ccCvv 
        } = req.body;

        const ASAAS_KEY = process.env.ASAAS_API_KEY;
        const ASAAS_URL = 'https://api.asaas.com/v3';

        if (!ASAAS_KEY) throw new Error("Chave Asaas não configurada.");

        // 1. Criar Cliente no Asaas
        const customerReq = await fetch(`${ASAAS_URL}/customers`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'access_token': ASAAS_KEY },
            body: JSON.stringify({
                name: name,
                cpfCnpj: cpf,
                email: email,
                phone: whatsapp,
                postalCode: cep,
                addressNumber: addressNumber
            })
        });
        
        const customerData = await customerReq.json();
        if (!customerReq.ok) {
            console.error("Asaas Customer Error:", customerData);
            return res.status(400).json({ success: false, error: 'Erro ao validar dados pessoais/CPF.' });
        }

        const customerId = customerData.id;

        // Formatar ano do cartao (Asaas exige 4 digitos)
        let formattedYear = ccExpYear.length === 2 ? `20${ccExpYear}` : ccExpYear;

        // 2. Criar Cobrança de Cartão de Crédito
        const paymentReq = await fetch(`${ASAAS_URL}/payments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'access_token': ASAAS_KEY },
            body: JSON.stringify({
                customer: customerId,
                billingType: 'CREDIT_CARD',
                value: 149.90,
                dueDate: new Date().toISOString().split('T')[0], // hoje
                description: 'VRTICE - Programa Marco Zero (Base + Mapa + Movimento)',
                creditCard: {
                    holderName: ccName,
                    number: ccNum,
                    expiryMonth: ccExpMonth,
                    expiryYear: formattedYear,
                    ccv: ccCvv
                },
                creditCardHolderInfo: {
                    name: name,
                    email: email,
                    cpfCnpj: cpf,
                    postalCode: cep,
                    addressNumber: addressNumber,
                    phone: whatsapp
                }
            })
        });

        const paymentData = await paymentReq.json();
        
        if (!paymentReq.ok || paymentData.status === 'REJECTED') {
            console.error("Asaas Payment Error:", paymentData);
            return res.status(400).json({ success: false, error: paymentData.errors ? paymentData.errors[0].description : 'Cartão recusado. Verifique o limite e dados digitados.' });
        }

        // 3. Sucesso! Salvar o usuário no Banco VRTICE como PAGO
        const tempPassword = Math.random().toString(36).slice(-8);
        const insertQuery = `
            INSERT INTO orion_users (name, email, whatsapp, password, payment_status) 
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (email) 
            DO UPDATE SET name = EXCLUDED.name, whatsapp = EXCLUDED.whatsapp, password = EXCLUDED.password, payment_status = EXCLUDED.payment_status
            RETURNING id;
        `;
        await pool.query(insertQuery, [name, email, whatsapp, tempPassword, 'PAID']);

        // Log da simulação do email (já enviamos pro cliente na vida real)
        console.log("\n=======================================");
        console.log(`[PAGAMENTO APROVADO] ASAAS: ${paymentData.id}`);
        console.log(`[SIMULAÇÃO] E-mail de ACESSO VIP enviado para: ${email}`);
        console.log(`Senha temporária gerada: ${tempPassword}`);
        console.log("=======================================\n");

        res.status(200).json({ success: true, paymentId: paymentData.id });

    } catch (err) {
        console.error('❌ Erro no checkout transparente:', err);
        res.status(500).json({ success: false, error: 'Erro interno do servidor. Tente novamente mais tarde.' });
    }
});

// ==========================================
// ROTA: WEBHOOK ASAAS (Receber atualizações de pagamento)
// ==========================================
app.post('/api/asaas-webhook', async (req, res) => {
    try {
        // 🔒 BLINDAGEM DE SEGURANÇA: Validação do Token do Webhook
        const tokenRecebido = req.headers['asaas-access-token'];
        const tokenOficial = process.env.ASAAS_WEBHOOK_TOKEN;

        if (tokenRecebido !== tokenOficial) {
            console.warn(`\n⚠️ [ALERTA DE SEGURANÇA] Tentativa de injeção bloqueada. Token de webhook inválido: ${tokenRecebido}`);
            return res.status(403).send('Forbidden: Invalid Authentication Token');
        }

        const event = req.body.event;
        const payment = req.body.payment;

        if (!event || !payment) {
            return res.status(400).send('Invalid Webhook Payload');
        }

        console.log(`\n🔔 [WEBHOOK ASAAS AUTENTICADO] Evento recebido: ${event} | Fatura: ${payment.id}`);

        if (event === 'PAYMENT_RECEIVED' || event === 'PAYMENT_CONFIRMED') {
            // No Transparent Checkout, enviamos o email no campo creditCardHolderInfo ou geramos nós mesmos.
            // Pelo webhook, podemos buscar o usuário no nosso DB pelo Customer ID, ou se passamos ExternalReference.
            
            // Para simplificar: buscar no Asaas ou usar o que tá no payment.
            // Geralmente o Asaas envia o email se o customer tiver cadastrado.
            
            console.log("==================================================================");
            console.log("🚀 PAGAMENTO APROVADO - INICIANDO ONBOARDING DO CLIENTE");
            console.log(`Cliente ID: ${payment.customer}`);
            console.log(`Valor: R$ ${payment.value}`);
            console.log("------------------------------------------------------------------");
            console.log(`[SIMULAÇÃO Z-API / WHATSAPP] Enviando mensagem automática...`);
            console.log(`"Olá! Identificamos o seu pagamento do Programa Marco Zero | VRTICE. 🏛️`);
            console.log(`Suas credenciais de acesso à Central VRTICE foram geradas.`);
            console.log(`Para darmos início, por favor preencha o Briefing Inicial na Área do Cliente:`);
            console.log(`👉 https://seusite.com.br/obrigado.html"`);
            console.log("==================================================================\n");

            // Aqui você conectaria uma Evolution API ou Z-API para disparar o WhatsApp real,
            // ou disparar um email via Nodemailer/Resend usando os dados de user resgatados do DB.
        }

        res.status(200).send('Webhook Processed');
    } catch (err) {
        console.error('❌ Erro no processamento do Webhook:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`\n======================================================`);
    console.log(`🌌 Servidor Orion rodando na porta http://localhost:${port}`);
    console.log(`🔗 Conectado ao Neon DB (PostgreSQL)`);
    console.log(`======================================================\n`);
});
