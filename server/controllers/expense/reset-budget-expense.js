import { createClient } from '@supabase/supabase-js';

export const resetBudgetExpenses = async (req, res) => {
  // Declare supabase variables
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Declared expected input from request body
  const { userID } = req.body;
  console.log("Request body:", req.body);

  try {
    const { data: spendData, error: spendError } = await supabase
    // Navigate to the userSpendData table and delete all rows with the userID from the request body
      .from('userSpendData')
      .delete()
      .eq('userID', userID);

    if (spendError) {
      // Output any errors to the server console 
      console.error('Error deleting user spend data:', spendError);
      // Return status 500 telling the client that there has been an error deleting user spend data
      return res.status(500).json({ error: 'Error deleting user spend data' });
    }

    const { data: budgetData, error: budgetError } = await supabase
    // Navigate to the userBudget table and delete all rows with the userID from the request body
      .from('userBudget')
      .delete()
      .eq('userID', userID);

    if (budgetError) {
      // Output any errors to the server console
      console.error('Error deleting user budget:', budgetError);
      // Return status 500 telling the client that there has been an error deleting the user budget
      return res.status(500).json({ error: 'Error deleting user budget' });
    }

    // Return status 200 letting the client know that the user's budget and spend data has been successfully deleted
    return res.status(200).json({ message: 'Successfully deleted user spend data and budget', spendData, budgetData });
  } catch (err) {
    // Output any errors to the server console
    console.error('Unexpected error:', err);
    // Return status 500 to the client saying there has been an unexpected error
    return res.status(500).json({ error: 'An unexpected error occurred' });
  }
};