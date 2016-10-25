function hello(compiler: string) {
    console.log(`Hello from ${compiler}`);
}

hello("Prasanjeet");


interface Person {
    firstName: string;
    lastName: string;
}

class Student  {
    fullName: string;
    constructor(public firstName, public middleInitial, public lastName) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

function greeter(person : Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}


(function(){

    let $greetingDiv = document.getElementById("greetingDiv");

    var user = new Student("Deepak", "P.", "Dhirhe");

    $greetingDiv.innerHTML = greeter(user);

})();


