import { createClient } from '@supabase/supabase-js';

export const removeExpense = async (req, res) => {
  // Declare supabase variables
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Declared expected input from request body
  const { spendID } = req.body;
  console.log("Request body:", req.body);

  try {
    const { data: spendData, error: spendError } = await supabase
    // Navigate to the userSpendData table and delete all rows with the userID from the request body
      .from('userSpendData')
      .delete()
      .eq('spendID', spendID);

    if (spendError) {
      // Output any errors to the server console 
      console.error('Error deleting user spend data:', spendError);
      // Return status 500 telling the client that there has been an error deleting user spend data
      return res.status(500).json({ error: 'Error deleting user spend data' });
    }
    return res.status(200).json({ message: 'Successfully deleted user spend data'});
  }
  catch {
    // Output any errors to the server console
    console.error('Unexpected error:', err);
    // Return status 500 to the client saying there has been an unexpected error
    return res.status(500).json({ error: 'An unexpected error occurred' });
  }
};