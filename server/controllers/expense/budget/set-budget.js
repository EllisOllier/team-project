import { createClient } from "@supabase/supabase-js";

export const setBudget = async (req, res) => {
    // Declare supabase variables
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Declare expected inputs from request body
    const { userID, userBudget } = req.body;
    console.log("Request Body:", req.body);

    // Check for missing inputs from request body
    if (!userID || !userBudget) {
        return res.status(400).json({ error: 'Missing UserID or budget amount!' });
    }

    try {
        const { data: existingBudget, error: checkError } = await supabase
        // Check if the user already has a budget
            .from('userBudget')
            .select('userID')
            .eq('userID', userID)
            .single();

        if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is the code for no rows found
            // Output to server console if the budget does not exist
            console.error('Error checking existing budget:', checkError);
            // Return status 500 to the client letting them know a budget does not exist
            return res.status(500).json({ error: 'Error checking existing budget' });
        }

        let result;
        if (existingBudget) {
            // Update the existing budget
            const { data, error } = await supabase
            // Navigate to userBudget table and update userBudget where the userID is equal to the userID in the request body
                .from('userBudget')
                .update({ userBudget: userBudget })
                .eq('userID', userID);

            if (error) {
                // Output any errors to server console
                console.error('Error updating budget:', error);
                // Return status 500 to the client letting them know there was an error updating the budget
                return res.status(500).json({ error: 'Error updating budget' });
            }

            result = data;
        } else {
            // Insert a new budget
            const { data, error } = await supabase
            // Navigate to the userBudget table and insert a new row with the userID and userBudget from the request body
                .from('userBudget')
                .insert([{ userID: userID, userBudget: userBudget }]);

            if (error) {
                // Output any errors to the server console
                console.error('Error adding budget:', error);
                // Return status 500 to the client letting them know there was an error adding a new budget
                return res.status(500).json({ error: 'Error adding budget' });
            }

            result = data;
        }

        // Return status 201 letting the client know their budget was successfully added to the database
        return res.status(201).json({ message: 'Budget successfully set', data: result });
    } catch (err) {
        // Output any erros to the servers console
        console.error('Unexpected error:', err);
        // Return status 500 to the client letting them know there was an unexpected error
        return res.status(500).json({ error: 'An unexpected error occurred' });
    }
};