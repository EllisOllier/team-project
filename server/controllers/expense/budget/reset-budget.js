import { createClient } from '@supabase/supabase-js';

export const resetBudget = async (req, res) => {
  // Declare supabase variables
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Declare expected inputs from request body
  const { userID } = req.body;
  console.log("Request body:", req.body);

  try {
    const { data, error } = await supabase
    // Navigate to the userBudget table and delete all rows where the userID is equal to the userID from the request body
      .from('userBudget')
      .delete('userBudgetID ,userID, userBudget')
      .eq('userID', userID)
      .single();

    if (error) {
      // Output any errors to the server console
      console.error('Error removing user budget:', error);
      // Return status 500 to the client letting them know that there has been an error fetching the user budget
      return res.status(500).json({ error: 'Error fetching user budget' });
    }

    // Return status 200 letting the client know that their budget was successfully removed from the database
    return res.status(200).json({ message: 'Successfully removed user budget from database'});
  } catch (err) {
    // Output any errors to the server console
    console.error('Unexpected error:', err);
    // Return status 500 to the client letting them know there was an unexpected error
    return res.status(500).json({ error: 'An unexpected error occurred' });
  }
};