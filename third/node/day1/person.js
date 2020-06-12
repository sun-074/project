

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    say() {
        return this.name + "说 : " + this.age;
    }
}

Person.hobby = ['singings', 'swimming']
exports.Person = Person;

class Student extends Person {
    constructor(name, age, score) {
        super(name, age);
        this.score = score;
    }

    say() {
        return super.say() + " 我这次考试 的分数 = " + this.score
    }
}

Student.hobby = ['running'];
exports.Student=Student;