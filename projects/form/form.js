document.getElementById('myform').addEventListener('submit', processForm);
function processForm(event) {
    event.preventDefault();

    const form = document.getElementById('myform');
    const studentID = document.getElementById('studentid').value.trim();
    const email = document.getElementById('email').value.trim();
    const ageInput = document.getElementById('age').value.trim();
    const classification = document.getElementById('classification').value;
    const consent = document.getElementById('consent').checked;
    const age = parseInt(ageInput, 10);

    let isValid = true;
    if (!studentID || !email || !ageInput) {
        alert('ERROR: Please fill in your Student ID, Email, and Age.');
        isValid = false;
    } 
    else if (age < 18 || age > 99) {
        alert('ERROR: Age must be a number between 18 and 99 for this survey.');
        isValid = false;
    }
    else if (studentID.length < 7) {
        alert('ERROR: Student ID must be at least 7 characters long.');
        isValid = false;
    }
    else if (classification === 'blank') {
        alert('ERROR: Please select your Class Standing.');
        isValid = false;
    }
    else if (!consent) {
        alert('ERROR: You must provide consent to submit your responses.');
        isValid = false;
    }
    if (!isValid) {
        return;
    }
    const formData = {
        student_id: studentID,
        email: email,
        age: age,
        classification: classification,
        gender: document.querySelector('input[name="gender"]:checked') ? document.querySelector('input[name="gender"]:checked').value : 'N/A',
        date_submitted: document.getElementById('bday').value,
        q1_motivation_stress: document.getElementById('q1').value.trim(),
        q2_effects: document.getElementById('q2').value.trim(),
        q3_healthy_use: document.getElementById('q3').value.trim(),
        consent: consent
    };
    console.log('Form Data Object:', formData);
    sendAjax(formData, form);
}

function sendAjax(data, formElement) {
    const xhr = new XMLHttpRequest();
    const mockResponseUrl = 'submit.json'; 
    xhr.open('GET', mockResponseUrl, true); 
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 400) {
            try {
                const response = JSON.parse(xhr.responseText);             
                displaySuccessMessage(response.message, formElement);               
                disableForm(formElement);
            } catch (e) {
                console.error('Error parsing JSON response:', e);
                alert('An error occurred while reading the server response.');
            }
        } else {
            console.error('Server returned an error status:', xhr.status);
            alert('Error submitting survey. Status: ' + xhr.status);
        }
    };
    xhr.onerror = function() {
        console.error('XHR request failed due to network error.');
        alert('Network error. Could not connect to the mock server.');
    };
    xhr.send();
}
function displaySuccessMessage(message, formElement) {
    const messageDiv = document.getElementById('submission-message');
    formElement.innerHTML = ''; 
    
    messageDiv.innerHTML = '<h2>🎉 Survey Submitted!</h2><p>' + message + '</p>';
}
function disableForm(formElement) {
    const fields = formElement.querySelectorAll('input, select, textarea, button');
    fields.forEach(field => {
        field.disabled = true;
    });
}