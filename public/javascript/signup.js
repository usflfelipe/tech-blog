const validatePassword = (pwd, cPwd) => {
    const disallowedChars = ' ';
    if (pwd !== cPwd) {
        alert(`The passwords do not match.`);
        return false;
    } else if (pwd.includes(disallowedChars)) {
        // if I add disallowed characters other than spaces, change this message to something like:
        // `The following characters, including spaces, are not allowed: ${disallowedChars}` 
        alert('You cannot include spaces in your password.');
        return false;
    }
    return true;
}


async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector("#username").value.trim();
    const password = document.querySelector("#password").value;
    const confirmPassword = document.querySelector("#confirmpassword").value;

    if (username && password && confirmPassword) {
        if (!validatePassword(password, confirmPassword)) {
            // validatePassword already displayed the error message
            return;
        }
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        
        // check the response status
        if (response.ok) {
            document.location.replace('/dashboard'); 
        } else {
            response.json()
            .then(data => {
                alert(data.message);
            })
        }
    }
    else {
        // tell the user we need info
        alert("You must supply a user name and a password");
    }

}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
