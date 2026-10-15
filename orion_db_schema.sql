-- ==============================================================================
-- VRTICE - PROJETO ORION
-- SCHEMA DO BANCO DE DADOS PARA CAPTURA DE LEADS E DIAGNÓSTICO
-- ==============================================================================

-- Tabela principal de Leads e Diagnósticos
CREATE TABLE orion_leads (
    id SERIAL PRIMARY KEY,
    
    -- Dados de Contato
    email VARCHAR(255) NOT NULL,
    whatsapp VARCHAR(20),
    
    -- Respostas do Questionário (Armazenando a letra da opção escolhida: A, B ou C)
    q1_destino_link VARCHAR(1) NOT NULL,
    q2_impressao_cliente VARCHAR(1) NOT NULL,
    q3_controle_design VARCHAR(1) NOT NULL,
    q4_taxa_abandono VARCHAR(1) NOT NULL,
    q5_dominio_proprio VARCHAR(1) NOT NULL,
    
    -- Pontuação
    pontuacao_real INT NOT NULL,      -- A nota matematicamente correta baseada nas respostas
    pontuacao_exibida INT NOT NULL,   -- A nota tendenciosa exibida para o lead (sempre < média)
    media_mercado INT DEFAULT 65,     -- A média fictícia do mercado para comparação
    
    -- Metadados
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices para otimizar buscas e relatórios futuros
CREATE INDEX idx_orion_leads_email ON orion_leads(email);
CREATE INDEX idx_orion_leads_pontuacao ON orion_leads(pontuacao_exibida);
CREATE INDEX idx_orion_leads_data ON orion_leads(created_at);

-- Comentários da Tabela
COMMENT ON TABLE orion_leads IS 'Armazena todos os leads capturados no funil Orion, juntamente com suas respostas cirúrgicas e o score de presença digital.';
COMMENT ON COLUMN orion_leads.pontuacao_real IS 'Nota calculada com base no peso real das respostas. Útil para métricas internas.';
COMMENT ON COLUMN orion_leads.pontuacao_exibida IS 'Nota que sofreu decréscimo intencional para ativar o gatilho de dor (Síndrome da Presença Genérica).';
