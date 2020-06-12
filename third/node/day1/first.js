
function UserClass(name,age){
    this.name = name;
    this.age =age;
}

UserClass.hobby = ['左右摇摆','玩耍'];

UserClass.prototype.say = function(){
    return this.name + 'shuo:' + this.age;
}
exports.UserClass = UserClass;

function User(name,age,friend){
    UserClass.call(this,name,age);
    this.friend = friend;
}

User.hobby = ['walk','read'];

// User.prototype = new UserClass();

for(var i in UserClass.prototype){
    User.prototype[i] = UserClass.prototype[i];
}

exports.User = User;