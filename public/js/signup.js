
    // Get the modal
    var modal = document.getElementById('id01');
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
    $.post(URL,data,callback);
    $("#submit").click(function(){
        //URL of the servr goes here, whatever routs takes in that info
        $.post("/api/signup",
        {
        email:"",
        password:""
        },
        function(data, status){
          alert("Data: " + data + "\nStatus: " + status);
        });
      })