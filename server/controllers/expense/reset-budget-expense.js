import { createClient } from '@supabase/supabase-js';

export const resetBudgetExpenses = async (req, res) => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  const supabase = createClient(supabaseUrl, supabaseKey);
  const { userID } = req.body;

  console.log("Request body:", req.body); // Add this line to log the request body

  try {
    // Delete userSpendData
    const { data: spendData, error: spendError } = await supabase
      .from('userSpendData')
      .delete()
      .eq('userID', userID);

    if (spendError) {
      console.error('Error deleting user spend data:', spendError);
      return res.status(500).json({ error: 'Error deleting user spend data' });
    }

    // Delete userBudget
    const { data: budgetData, error: budgetError } = await supabase
      .from('userBudget')
      .delete()
      .eq('userID', userID);

    if (budgetError) {
      console.error('Error deleting user budget:', budgetError);
      return res.status(500).json({ error: 'Error deleting user budget' });
    }

    return res.status(200).json({ message: 'Successfully deleted user spend data and budget', spendData, budgetData });
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ error: 'An unexpected error occurred' });
  }
};