import { createClient } from '@supabase/supabase-js';

export const getExpenses = async (req, res) => {
  // Declare supabase variables
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Delcare expected input from request body
  const { userID } = req.body;
  console.log("Request body:", req.body);

  try {
    // Navigate to userSpendData table and select all data where it is equal to the userID provided in the request body
    const { data, error } = await supabase
      .from('userSpendData')
      .select('spendID, userID, spendAmount, spendCategory, spendDate, isRecurring')
      .eq('userID', userID)

    if (error) {
      // Output any errors on the servers console
      console.error('Error fetching user expenses:', error);
      // Return status 500 telling the client there has been an error fetching the expenses
      return res.status(500).json({ error: 'Error fetching user expenses' });
    }

    // Return status 200 to let the user know that the expenses were successfully fetched
    return res.status(200).json({ message: 'Successfully fetched user expenses', expenses: data});
  } catch (err) {
    // Output any errors to the servers console
    console.error('Unexpected error:', err);
    // Return status 500 telling the client there has been an error on the server
    return res.status(500).json({ error: 'An unexpected error occurred' });
  }
};