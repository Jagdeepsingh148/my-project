document.getElementById("name").addEventListener("keypress", function(e) {
    if (/\d/.test(e.key)) {
      e.preventDefault();
    }
  });
  
  document.getElementById("registrationForm").addEventListener("submit", function(e) {
    e.preventDefault(); 
  
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const age = document.getElementById("age").value;
    if (!name || !email || !age) {
      alert("All fields are required!");
      return;
    }
  
    alert(`Name: ${name}\nEmail: ${email}\nAge: ${age}`);
    console.log("Registered successfully");
  });