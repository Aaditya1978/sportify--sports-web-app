document.getElementById("login").addEventListener("click", function(){
    document.querySelector(".signup-form-popup").style.display = "none";
    document.querySelector(".login-form-popup").style.display = "flex";
})

document.querySelector(".login-close").addEventListener("click", function(){
    document.querySelector(".login-form-popup").style.display = "none";
})

document.getElementById("signup").addEventListener("click", function(){
    document.querySelector(".login-form-popup").style.display = "none";
    document.querySelector(".signup-form-popup").style.display = "flex";
})

document.querySelector(".signup-close").addEventListener("click", function(){
    document.querySelector(".signup-form-popup").style.display = "none";
})