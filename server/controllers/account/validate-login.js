import { createClient } from '@supabase/supabase-js';

export const validateLogin = async (req, res) => {
  // Declare supabase variables
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Declared expected inputs from request body
  const { username, password } = req.body;
  console.log("Request body:", req.body);

  try {
    const { data, error } = await supabase
    // Navigate to the user table and select the row where the userUsername is equal to the username in the request body
      .from('user')
      .select('userID, userPassword, userUsername')
      .eq('userUsername', username)
      .single();

    if (error) {
      // Output the error to the server console
      console.error('Error fetching user data:', error);
      // Return status 500 to the client letting them know there was an error fetching user data
      return res.status(500).json({ error: 'Error fetching user data' });
    }

    // Checks if the userPassword associated with the userUsername is equal to the password in the request body
    if (data && data.userPassword === password) {
      // Login successful - Return status 200 letting the client know the login was successful
      return res.status(200).json({ message: 'Login successful', userUsername: data.userUsername, userID: data.userID});
    } else {
      // Login failed - Return status 401 letting the client know the username or password was invalid
      return res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (err) {
    // Output errors to the server console
    console.error('Unexpected error:', err);
    // Return status 500 to the client letting them know an unexpected error occured
    return res.status(500).json({ error: 'An unexpected error occurred' });
  }
};