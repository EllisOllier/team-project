import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const setBudget = async (req, res) => {
    const { userID, userBudget} = req.body;
    console.log("Request Body:", req.body);

    if (!userID || !userBudget) {
        return res.status(400).json({ error: 'Missing UserID or budget amount!' });
    }

    try {
        const { data, error } = await supabase
            .from('userBudget')
            .insert([{ userID: userID, userBudget: userBudget }]);
        
            if (error) {
                console.error('Error adding budget:', error);
                return res.status(500).json({ error: 'Error adding budget' });
            }
    
            return res.status(201).json({ message: 'Budget successfully added' });
    } catch (err) {
        console.error('Unexpected error:', err);
        return res.status(500).json({ error: 'An unexpected error occurred' });
    }
}