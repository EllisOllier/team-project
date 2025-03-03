import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const setBudget = async (req, res) => {
    const { userID, userBudget } = req.body;
    console.log("Request Body:", req.body);

    if (!userID || !userBudget) {
        return res.status(400).json({ error: 'Missing UserID or budget amount!' });
    }

    try {
        // Check if the user already has a budget
        const { data: existingBudget, error: checkError } = await supabase
            .from('userBudget')
            .select('userID')
            .eq('userID', userID)
            .single();

        if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is the code for no rows found
            console.error('Error checking existing budget:', checkError);
            return res.status(500).json({ error: 'Error checking existing budget' });
        }

        let result;
        if (existingBudget) {
            // Update the existing budget
            const { data, error } = await supabase
                .from('userBudget')
                .update({ userBudget: userBudget })
                .eq('userID', userID);

            if (error) {
                console.error('Error updating budget:', error);
                return res.status(500).json({ error: 'Error updating budget' });
            }

            result = data;
        } else {
            // Insert a new budget
            const { data, error } = await supabase
                .from('userBudget')
                .insert([{ userID: userID, userBudget: userBudget }]);

            if (error) {
                console.error('Error adding budget:', error);
                return res.status(500).json({ error: 'Error adding budget' });
            }

            result = data;
        }

        return res.status(201).json({ message: 'Budget successfully set', data: result });
    } catch (err) {
        console.error('Unexpected error:', err);
        return res.status(500).json({ error: 'An unexpected error occurred' });
    }
};