import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const createAccount = async (req, res) => {
    const {username, password} = req.body;

    console.log("Request Body:", req.body);

    if(!username || !password) {
        return res.status(400).json({error: 'Username and Password are required'});
    }

    try {
        const {data, error} = await supabase
        .from('user')
        .insert([{ userUsername: username, userPassword: password }]);

        if(error) {
            console.error('Error creating account:', error);
            return res.status(201).json({ error: 'Error creating account' });
        }

        return res.status(201).json({ message: 'Account created successfully' });
    } catch (err) {
        console.error('Unexpected error:', err);
        return res.status(500).json({ error: 'An unexpected error occurred' });
    }
};