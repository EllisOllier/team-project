import { createClient } from '@supabase/supabase-js';

export const resetBudget = async (req, res) => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  const supabase = createClient(supabaseUrl, supabaseKey);
  const { userID } = req.body;

  console.log("Request body:", req.body); // Add this line to log the request body

  try {
    const { data, error } = await supabase
      .from('userBudget')
      .delete('userBudgetID ,userID, userBudget')
      .eq('userID', userID)
      .single();

    if (error) {
      console.error('Error removing user budget:', error);
      return res.status(500).json({ error: 'Error fetching user budget' });
    }

    return res.status(200).json({ message: 'Successfully removed user budget from database'});
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ error: 'An unexpected error occurred' });
  }
};