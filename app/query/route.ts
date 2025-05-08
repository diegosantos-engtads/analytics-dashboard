import postgres from 'postgres';

// Usa a variável de ambiente de forma segura e controlada
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error('DATABASE_URL não definida no ambiente');
}

const sql = postgres(connectionString, { ssl: 'require' });

async function listInvoices() {
    const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;
    return data;
}

export async function GET() {
    try {
        const result = await listInvoices();
        return Response.json({
            message: 'Consulta realizada com sucesso! ✅',
            data: result,
        });
    } catch (error) {
        console.error('Erro na consulta:', error);
        return Response.json(
            { error: 'Erro interno ao consultar faturas.' },
            { status: 500 },
        );
    }
}
