class Person {
      constructor(name, age) {
        this.name = name;
        this.age = age;
      }

      displayInfo() {
        return `Name: ${this.name}, Age: ${this.age}`;
      }
    }

    class Student extends Person {
      constructor(name, age, grade) {
        super(name, age);
        this.grade = grade;
      }

      displayInfo() {
        return `${super.displayInfo()}, Grade: ${this.grade}`;
      }
    }

    class Teacher extends Person {
      constructor(name, age, subject) {
        super(name, age);
        this.subject = subject;
      }

      displayInfo() {
        return `${super.displayInfo()}, Subject: ${this.subject}`;
      }
    }

    const student1 = new Student("Aman", 20, "B+");
    const teacher1 = new Teacher("Mr. Sharma", 40, "Mathematics");

    const outputDiv = document.getElementById("output");

    function showDetails(obj, title) {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h2>${title}</h2>
        <p>${obj.displayInfo()}</p>
        <button class="btn" onclick="alert('${obj.displayInfo()}')">Show Alert</button>
      `;
      outputDiv.appendChild(card);
    }

    showDetails(student1, "Student Details");
    showDetails(teacher1, "Teacher Details");