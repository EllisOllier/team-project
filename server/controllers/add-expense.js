import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const addExpense = async (req, res) => {
    const { userID, spendAmount, spendCategory, spendDate } = req.body;
    console.log("Request Body:", req.body);

    if (!userID || !spendAmount || !spendCategory || !spendDate) {
        return res.status(400).json({ error: 'Please enter all required data!' });
    }

    try {
        const { data, error } = await supabase
            .from('userSpendData')
            .insert([{ userID: userID, spendAmount: spendAmount, spendCategory: spendCategory, spendDate: spendDate }]);
        
            if (error) {
                console.error('Error adding expense:', error);
                return res.status(500).json({ error: 'Error adding expense' });
            }
    
            return res.status(201).json({ message: 'Expense successfully added' });
    } catch (err) {
        console.error('Unexpected error:', err);
        return res.status(500).json({ error: 'An unexpected error occurred' });
    }
}