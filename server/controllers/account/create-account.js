import { createClient } from "@supabase/supabase-js";
import bcrypt from 'bcrypt';

export const createAccount = async (req, res) => {
    // Declare supabase variables
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Declared expected inputs from request body
    const { username, password } = req.body;
    console.log("Request Body:", req.body);

    // Check if any expected inputs in request body are missing
    if (!username || !password) {
        // Return status 400 letting the client know that the username or password is missing
        return res.status(400).json({ error: 'Username and Password are required' });
    }

    try {
        // Check if the username already exists
        const { data: existingUser, error: checkError } = await supabase
        // Navigate to the user table and check if the userUsername exists in the database
            .from('user')
            .select('userUsername')
            .eq('userUsername', username)
            .single();

        if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is the code for no rows found
            // Output errors to the server console
            console.error('Error checking existing username:', checkError);
            // Return status 500 to the client letting them know there was an error checking for an existing username
            return res.status(500).json({ error: 'Error checking existing username' });
        }

        if (existingUser) {
            // Return status 409 letting the client know that the username already exists
            return res.status(409).json({ error: 'Username already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Proceed with account creation
        const { data, error } = await supabase
        // Navigate to the user table and insert the username and hashed password
            .from('user')
            .insert([{ userUsername: username, userPassword: hashedPassword }])
            .select('userID'); // Select the userID of the newly created user

        if (error) {
            // Output the error to the server console
            console.error('Error creating account:', error);
            // Return status 500 to the client letting them know there was an error creating an account
            return res.status(500).json({ error: 'Error creating account' });
        }

        // Return status 201 letting the client know that the account was created successfully
        return res.status(201).json({ message: 'Account created successfully', userID: data[0].userID });
    } catch (err) {
        // Output any errors to the server console
        console.error('Unexpected error:', err);
        // Return status 500 to the client letting them know there was an unexpected error
        return res.status(500).json({ error: 'An unexpected error occurred' });
    }
};