// Runs the script when document is properly loaded

$(document).ready(function() {

    $("#duplicate_email").hide();

    // Input Form Validation
    validator = $('#form-signup').validate({
        rules: {
            name : {
                required: true,
            },
            signup_email: {
                required: true,
                email: true
            },
            signup_password: {
                required: true,
            },
        },
        // Error messages for wrong Input if given
        messages : {
            name: {
                required: "Please Enter your name"
            },
            signup_email: {
                required: "Please enter Valid Email Id",
            },
            signup_password: {
                required: "Please enter Your Password"
            },
        },
    });
});