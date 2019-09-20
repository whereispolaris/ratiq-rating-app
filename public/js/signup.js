var modal = document.getElementById('id01');
    
    // When the user clicks anywhere outside of the modal, close it
function ValidateEmail(inputText)
{

    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(inputText.value.match(mailformat))
    {
    document.form1.email.focus();
    checkForm(); 
    return true;
    }
    else
    {
    alert("You have entered an invalid email address!");
    document.form1.email.focus();
    return false;
    }
   
}

function checkForm() {

   
    if(document.form1.username.value == "") {
      alert("Error: Username cannot be blank!");
      document.form1.username.focus();
      return false;
    }
    re = /^\w+$/;
    if(!re.test(document.form1.username.value)) {
      alert("Error: Username must contain only letters, numbers and underscores!");
      document.form1.username.focus();
      return false;
    }
console.log(document.form1.psw.value)
    if(document.form1.psw.value != "" && document.form1.psw.value == document.form1.pswrepeat.value) {
      if(document.form1.psw.value.length < 6) {
        alert("Error: Password must contain at least six characters!");
        document.form1.psw.focus();
        return false;
      }
      if(document.form1.psw.value == document.form1.username.value) {
        alert("Error: Password must be different from Username!");
        document.form1.psw.focus();
        return false;
      }
      re = /[0-9]/;
      if(!re.test(document.form1.psw.value)) {
        alert("Error: password must contain at least one number (0-9)!");
        document.form1.psw.focus();
        return false;
      }
      re = /[a-z]/;
      if(!re.test(document.form1.psw.value)) {
        alert("Error: password must contain at least one lowercase letter (a-z)!");
        document.form1.psw.focus();
        return false;
      }
      re = /[A-Z]/;
      if(!re.test(document.form1.psw.value)) {
        alert("Error: password must contain at least one uppercase letter (A-Z)!");
        document.form1.psw.focus();
        return false;
      }
    } else {
      alert("Error: Please check that you've entered and confirmed your password!");
     document.form1.psw.focus();
      return false;
    }

    alert("You entered a valid password: " + document.form1.psw.value);
    return true;
  }