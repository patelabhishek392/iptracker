import { pool } from '@/app/lib/Dbconnect'; 


export async function POST(req) {
  const body = await req.json();
  const { username, password } = body;


  if (!username || !password) {
    return new Response(JSON.stringify({ error: 'Username and password are required' }), { status: 400 });
  }

  try {
    // Query the USERS table to find the user by username (use EMAIL instead of NAME if that's the login identifier)
    const [users] = await pool.query('SELECT * FROM USERS WHERE EMAIL = ?', [username]);
    const user = users[0];

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    // Check if the provided password matches
    if (user.PASSWORD !== password) {
      return new Response(JSON.stringify({ error: 'Incorrect password' }), { status: 401 });
    }


    console.log(req.headers)
    
    const publicIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const os = headerData.get('user-agent'); // Get user-agent to identify OS info

    await pool.query('INSERT INTO LOGIN_DATA (PUBLIC_IP, OS, HEADERDATA) VALUES (?, ?, ?)', [
      publicIP,
      os,
      JSON.stringify(headerData),
    ]);

    // Login successful, return user data or token
    return new Response(JSON.stringify({ message: 'Login successful', user: user.NAME }), { status: 200 });
  } catch (error) {
    console.error('Error logging in:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
