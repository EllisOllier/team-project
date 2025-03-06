import { createClient } from "@supabase/supabase-js";



export const addExpense = async (req, res) => {
    // Declare supabase variables
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Declare expected input for the request
    const { userID, spendAmount, spendCategory, spendDate, isRecurring } = req.body;
    console.log("Request Body:", req.body);

    // Check if any of the expected inputs are missing and return status 400
    if (!userID || !spendAmount || !spendCategory || !spendDate || isRecurring === undefined) {
        return res.status(400).json({ error: 'Please enter all required data!' });
    }

    try {
        // Navigate to userSpendData in database and insert the inputs provided from the request body
        const { data, error } = await supabase
            .from('userSpendData')
            .insert([{ userID, spendAmount, spendCategory, spendDate, isRecurring }]);
        
        // If there is an error return status 500 and provide the error message
        if (error) {
            console.error('Error adding expense:', error);
            return res.status(500).json({ error: 'Error adding expense' });
        }

        // Return status 201 to display that the expense was added successfully
        return res.status(201).json({ message: 'Expense successfully added', data });
    } catch (err) {
        // Log any errors to the server console
        console.error('Unexpected error:', err);
        // Return status 500 to the client
        return res.status(500).json({ error: 'An unexpected error occurred' });
    }
};