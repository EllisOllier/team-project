import { createClient } from '@supabase/supabase-js'

export const validateLogin = async (req, res) => {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { username, password } = req.body;

    try {
        const { data, error } = await supabase
            .from('user')
            .select('userID, userPassword, userUsername')
            .eq('userUsername', username)
            .single();

        if (error) {
            return res.status(500).json({ error: 'Error fetching user data' });
        }

        if (data && data.userPassword === password) {
            // Login successful
            return res.status(200).json({ message: 'Login successful', userID: data.userID });
        } else {
            // Login failed
            return res.status(401).json({ error: 'Invalid username or password' });
        }
    } catch (err) {
        console.error('Unexpected error:', err);
        return res.status(500).json({ error: 'An unexpected error occurred' });
    }
};