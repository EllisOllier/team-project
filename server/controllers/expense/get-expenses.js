import { createClient } from '@supabase/supabase-js';

export const getExpenses = async (req, res) => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  const supabase = createClient(supabaseUrl, supabaseKey);
  const { userID } = req.body;

  console.log("Request body:", req.body); // Add this line to log the request body

  try {
    const { data, error } = await supabase
      .from('userSpendData')
      .select('userID, spendAmount, spendCategory, spendDate, isRecurring')
      .eq('userID', userID)

    if (error) {
      console.error('Error fetching user expenses:', error);
      return res.status(500).json({ error: 'Error fetching user expenses' });
    }

    return res.status(200).json({ message: 'Successfully fetched user expenses', expenses: data});
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ error: 'An unexpected error occurred' });
  }
};