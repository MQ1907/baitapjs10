function Employee(
  account,
  name,
  email,
  password,
  dayWork,
  salary,
  chucvu,
  timeWork
) {
  this.account = account;
  this.name = name;
  this.email = email;
  this.password = password;
  this.dayWork = dayWork;
  this.salary = salary;
  this.chucvu = chucvu;
  this.timeWork = timeWork;
  this.rankA = this.rank()
  this.rateA = this.rate()
}

//Tính tiền lương theo cấp bậc
Employee.prototype.rank = function () {
  if (this.chucvu === "Sếp") {
    return this.salary * 3;
  } else if (this.chucvu === "Trưởng phòng") {
    return this.salary * 2;
  } else {
    return this.salary * 1;
  }
};

//Xếp loại nhân viên
Employee.prototype.rate= function () {
  ratingEmloyee = "";
  if (this.timeWork >= 192) {
    return (ratingEmloyee = "Nhân viên xuất sắc");
  } else if (this.timeWork >= 176) {
    return (ratingEmloyee = "Nhân viên giỏi");
  } else if (this.timeWork >= 160) {
    return (ratingEmloyee = "Nhân viên khá");
  } else {
    return (ratingEmloyee = "Nhân viên trung bình");
  }
};
