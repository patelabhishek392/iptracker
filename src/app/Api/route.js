import { pool } from "../lib/Dbconnect";
// POST request to add data to the database
export async function POST(req) {
  const body = await req.json();

  const { column1, column2, column3 } = body;
 
  if (!column1 || !column2 ||!column3) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
  }

  try {
    const result = await pool.query('INSERT INTO LOGIN_DATA (PUBLIC_IP, OS,HEADERDATA) VALUES (?, ?,?)', [
      column1,
      column2,
      column3,
    ]);
    return new Response(JSON.stringify({ message: 'Item Created', result }), { status: 201 });
  } catch (error) {
    console.error('Error creating data:', error);
    return new Response(JSON.stringify({ error: 'Error creating data' }), { status: 500 });
  }
}

// GET request to fetch data from the database
export async function GET(req) {
  try {
    const [rows] = await pool.query('SELECT * FROM USERS');
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    console.error('Error fetching data:', error);
    return new Response(JSON.stringify({ error: 'Error fetching data' }), { status: 500 });
  }
}
