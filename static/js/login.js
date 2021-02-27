// Runs the script when document is properly loaded

$(document).ready(function() {

    $("#wrong").hide();

    // Input Form Validation
    validator = $('#form-login').validate({
        rules: {
            login_email: {
                required: true,
                email: true
            },
            login_password: {
                required: true,
            },
        },
        // Error messages for wrong Input if given
        messages : {
            slogin_email: {
                required: "Please enter Valid Email Id",
            },
            login_password: {
                required: "Please enter Your Password"
            },
        },
    });
});