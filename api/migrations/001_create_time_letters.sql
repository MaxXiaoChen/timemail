-- 创建时光邮件表
CREATE TABLE IF NOT EXISTS time_letters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content TEXT NOT NULL,
    delivery_email VARCHAR(255) NOT NULL,
    delivery_time TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(20) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'sent', 'failed')),
    sent_at TIMESTAMP WITH TIME ZONE,
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_time_letters_delivery_time ON time_letters(delivery_time);
CREATE INDEX IF NOT EXISTS idx_time_letters_status ON time_letters(status);
CREATE INDEX IF NOT EXISTS idx_time_letters_delivery_email ON time_letters(delivery_email);
CREATE INDEX IF NOT EXISTS idx_time_letters_email_status ON time_letters(delivery_email, status);
CREATE INDEX IF NOT EXISTS idx_time_letters_created_at ON time_letters(created_at DESC);

-- 创建更新时间触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER IF NOT EXISTS update_time_letters_updated_at 
    BEFORE UPDATE ON time_letters 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();