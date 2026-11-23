/* 

Traditionally this would be a PHP file or similar server-side-only executable 
Since we dont want the Client layer to interact with the server side layer. 
In our project we are pretending that this file is a PHP file and that the user 
is Authorized. Therefore we dont need any deeper authentication than the user and pass 

*/

const db = pool();

function loginUser(user, pass) {

    const userExists = db.query(`
        SELECT username 
        FROM users 
        WHERE 
        EXISTS (
            SELECT username 
            FROM users 
            WHERE username = ${user});`);

    if (userExists === false){
        throw new console.error("User doesn't exist in Database!");
    }

    /* 
        This would actually be a mathmatic challenge where the server is trying to calculate 
        a value with the hash that it has associated with the user! It's facinating stuff!
    */
    // Look up switch case statements here; https://www.w3schools.com/js/js_switch.asp
        switch(user){
        case 'FooBar':
            if (pass === '1234FooBar'){
                // Some code to resolve login!
            }
            // Uh oh! Some code here to resolve wrong password!
        break;

        default: 
            // Logs you in as a default user... i cant be bothered to make up passwords for each user lol
        break;
    }
}