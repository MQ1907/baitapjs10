let employees = [];

//Thêm nhân viên
function addEmployee() {
  let employee = validate();
  if (!employee) {
    return;
  }

  employees.push(employee);

  display(employees);
  $("#myModal").modal("hide");
  //Reset form
  document.getElementById("account").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("dayWork").value = "";
  document.getElementById("salary").value = "";
  document.getElementById("chucvu").value = "";
  document.getElementById("timeWork").value = "";
}

document.getElementById("btnThem").onclick = () =>{
  //Reset form
  document.getElementById("account").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("dayWork").value = "";
  document.getElementById("salary").value = "";
  document.getElementById("chucvu").value = "";
  document.getElementById("timeWork").value = "";

  document.getElementById("account").disabled = false;
}

//Tìm kiếm nhân viên
function searchEmployee() {
  let search = document.getElementById("searchName").value;
  search = search.trim().toLowerCase();

  let newEmployees = employees.filter((value) => {
    let name = value.name.trim().toLowerCase();
    return name.includes(search);
  });
  display(newEmployees);
}

//Xóa nhân viên
function deleteEmployee(employeeId) {
  let index = employees.findIndex((value) => {
    return value.account === employeeId;
  });
  if (index !== -1) {
    employees.splice(index, 1);
  }
  display(employees);
}

//chỉnh sửa
function changeEmployee(employeeId) {
  let employee = employees.find((value) => {
    return value.account === employeeId;
  });

  document.getElementById("account").value = employee.account;
  document.getElementById("name").value = employee.name;
  document.getElementById("email").value = employee.email;
  document.getElementById("password").value = employee.password;
  document.getElementById("dayWork").value = employee.dayWork;
  document.getElementById("salary").value = employee.salary;
  document.getElementById("chucvu").value = employee.chucvu;
  document.getElementById("timeWork").value = employee.timeWork;

  document.getElementById("account").disabled = true;
  document.getElementById("btnThemNV").disabled = true;
  $("#myModal").modal("show");
}

//Cập nhật
function updateEmployee() {
  let account = document.getElementById("account").value;
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let dayWork = document.getElementById("dayWork").value;
  let salary = +document.getElementById("salary").value;
  let chucvu = document.getElementById("chucvu").value;
  let timeWork = +document.getElementById("timeWork").value;

  let employee = new Employee(
    account,
    name,
    email,
    password,
    dayWork,
    salary,
    chucvu,
    timeWork
  );

  let index = employees.findIndex((value) => {
    return value.account === account;
  });
  employees[index] = employee;

  display(employees);
  $("#myModal").modal("hide");
  //Reset form
  document.getElementById("account").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("dayWork").value = "";
  document.getElementById("salary").value = "";
  document.getElementById("chucvu").value = "";
  document.getElementById("timeWork").value = "";
  document.getElementById("account").disabled = false;
  document.getElementById("btnThemNV").disabled = false;
}

function closeEmployee() {
  document.getElementById("tbTKNV").innerHTML = "";
  document.getElementById("tbTen").innerHTML = "";
  document.getElementById("tbEmail").innerHTML = "";
  document.getElementById("tbMatKhau").innerHTML = "";
  document.getElementById("tbNgay").innerHTML = "";
  document.getElementById("tbLuongCB").innerHTML = "";
  document.getElementById("tbChucVu").innerHTML = "";
  document.getElementById("tbGiolam").innerHTML = "";
}

function display(employees) {
  let html = employees.reduce((result, value) => {
    return (
      result +
      `
      <tr>
         <td>${value.account}</td>
         <td>${value.name}</td>
         <td>${value.email}</td>
         <td>${value.dayWork}</td>
         <td>${value.chucvu}</td>
         <td>${value.rank()}</td>
         <td>${value.rate()}</td>
         <td>
           <button class="btn btn-warning" onclick="changeEmployee('${
             value.account
           }')">Chỉnh Sửa</button>   
           <button class="btn btn-danger" onclick="deleteEmployee('${
             value.account
           }')">Xóa</button>   

         </td>
      </tr>
      `
    );
  }, "");
  document.getElementById("tableDanhSach").innerHTML = html;
}

function isRequired(value) {
  if (!value.trim()) {
    return false;
  }
  return true;
}

//Kiểm tra có phải lương hay không
function isSalary(value) {
  if (typeof value !== "number") {
    return false;
  }
  if (value < 1000000 || value > 20000000) {
    return false;
  }
  return true;
}

//Kiểm tra thời gian làm
function isHours(value) {
  if (typeof value !== "number") {
    return false;
  }
  if (value < 80 || value > 200) {
    return false;
  }
  return true;
}

//Điều kiện cho tài khoản
function isAccount(value) {
  // all characters with limited 4 - 6 length
  let regex = /^.{4,6}$/;
  return regex.test(value);
}

//Điều kiện cho tên
function isName(value) {
  // letter a-z, A-Z without limited length. Accept spacing between word
  let regex = /^[a-zA-Z]+( [a-zA-Z]+)*$/;
  return regex.test(value);
}

//Điều kiện cho email
function isEmail(value) {
  let regex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;
  return regex.test(value);
}

//Điều kiện cho password
function isPassword(value) {
  let regex =
    /^(?=.*[A-Z])(?=.*[!&%\/()=\?\^\*\+\]\[#><;:,\._-|@])(?=.*[0-9])(?=.*[a-z]).{8,40}$/;

  return regex.test(value);
}

function validate() {
  let account = document.getElementById("account").value;
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let dayWork = document.getElementById("dayWork").value;
  let salary = document.getElementById("salary").value;
  let chucvu = document.getElementById("chucvu").value;
  let timeWork = document.getElementById("timeWork").value;

  let isValid = true;

  if (!isRequired(account)) {
    isValid = false;
    document.getElementById("tbTKNV").innerHTML =
      "Tài khoản không được để trống";
    document.getElementById("tbTKNV").style.display = "block";
  } else if (!isAccount(account)) {
    document.getElementById("tbTKNV").innerHTML = "Tài khoản không hợp lệ";
    document.getElementById("tbTKNV").style.display = "block";
  } else {
    document.getElementById("tbNgay").innerHTML = "";
    document.getElementById("tbNgay").style.display = "none";
  }

  if (!isRequired(name)) {
    isValid = false;
    document.getElementById("tbTen").innerHTML = "Tên không được để trống";
    document.getElementById("tbTen").style.display = "block";
  } else if (!isName(name)) {
    isValid = false;
    document.getElementById("tbTen").innerHTML = "Tên không hợp lệ";
    document.getElementById("tbTen").style.display = "block";
  } else {
    document.getElementById("tbTen").innerHTML = "";
    document.getElementById("tbTen").style.display = "none";
  }

  if (!isRequired(email)) {
    isValid = false;
    document.getElementById("tbEmail").innerHTML = "Email không được để trống";
    document.getElementById("tbEmail").style.display = "block";
  } else if (!isEmail(email)) {
    isValid = false;
    document.getElementById("tbEmail").innerHTML = "Email không hợp lệ";
    document.getElementById("tbEmail").style.display = "block";
  } else {
    document.getElementById("tbEmail").innerHTML = "";
    document.getElementById("tbEmail").style.display = "none";
  }

  if (!isRequired(password)) {
    isValid = false;
    document.getElementById("tbMatKhau").innerHTML =
      "Mật khẩu không được để trống";
    document.getElementById("tbMatKhau").style.display = "block";
  } else if (!isPassword(password)) {
    isValid = false;
    document.getElementById("tbMatKhau").innerHTML = "Mật khẩu không hợp lệ";
    document.getElementById("tbMatKhau").style.display = "block";
  } else {
    document.getElementById("tbMatKhau").innerHTML = "";
    document.getElementById("tbMatKhau").style.display = "none";
  }

  if (!isRequired(dayWork)) {
    isValid = false;
    document.getElementById("tbNgay").innerHTML =
      "Ngày làm không được để trống";
    document.getElementById("tbNgay").style.display = "block";
  } else {
    document.getElementById("tbNgay").innerHTML = "";
    document.getElementById("tbNgay").style.display = "none";
  }

  let spanSalary = document.getElementById("tbLuongCB");
  if (!isRequired(salary)) {
    isValid = false;
    spanSalary.innerHTML = "Lương không được để trống";
    spanSalary.style.display = "block";
  } else if (!isSalary(+salary)) {
    isValid = false;
    spanSalary.innerHTML = "Lương không hợp lệ";
    spanSalary.style.display = "block";
  } else {
    spanSalary.innerHTML = "";
    spanSalary.style.display = "none";
  }

  if (!isRequired(chucvu)) {
    isValid = false;
    document.getElementById("tbChucVu").innerHTML =
      "Chức vụ không được để trống";
    document.getElementById("tbChucVu").style.display = "block";
  } else {
    document.getElementById("tbChucVu").innerHTML = "";
    document.getElementById("tbChucVu").style.display = "none";
  }

  let spanTime = document.getElementById("tbGiolam");
  if (!isRequired(timeWork)) {
    isValid = false;
    spanTime.innerHTML = "Giờ làm không được để trống";
    spanTime.style.display = "block";
  } else if (!isHours(+timeWork)) {
    isValid = false;
    spanTime.innerHTML = "Giờ làm không hợp lệ";
    spanTime.style.display = "block";
  } else {
    spanTime.innerHTML = "";
    spanTime.style.display = "none";
  }

  if (isValid) {
    let employee = new Employee(
      account,
      name,
      email,
      password,
      dayWork,
      +salary,
      chucvu,
      +timeWork
    );
    return employee;
  }
  return undefined;
}

document.getElementById("account").oninput = (event) => {
  let idSpan = document.getElementById("tbTKNV");
  if (isRequired(event.target.value)) {
    idSpan.innerHTML = "";
  } else {
    idSpan.innerHTML = "Tài khoản không được để trống";
  }
};

document.getElementById("name").oninput = (event) => {
  let idSpan = document.getElementById("tbTen");
  if (isRequired(event.target.value)) {
    idSpan.innerHTML = "";
  } else {
    idSpan.innerHTML = "Tên không được để trống";
  }
  document.getElementById("btnThemNV").disabled = false;
};

document.getElementById("email").oninput = (event) => {
  let idSpan = document.getElementById("tbEmail");
  if (isRequired(event.target.value)) {
    idSpan.innerHTML = "";
  } else {
    idSpan.innerHTML = "Email không được để trống";
  }
};

document.getElementById("password").oninput = (event) => {
  let idSpan = document.getElementById("tbMatKhau");
  if (isRequired(event.target.value)) {
    idSpan.innerHTML = "";
  } else {
    idSpan.innerHTML = "Mật khẩu không được để trống";
  }
};

document.getElementById("dayWork").oninput = (event) => {
  let idSpan = document.getElementById("tbNgay");
  if (isRequired(event.target.value)) {
    idSpan.innerHTML = "";
  } else {
    idSpan.innerHTML = "Ngày không được để trống";
  }
};

document.getElementById("salary").oninput = (event) => {
  let idSpan = document.getElementById("tbLuongCB");
  if (isRequired(event.target.value)) {
    idSpan.innerHTML = "";
  } else {
    idSpan.innerHTML = "Lương không được để trống";
  }
};

document.getElementById("chucvu").oninput = (event) => {
  let idSpan = document.getElementById("tbChucVu");
  if (isRequired(event.target.value)) {
    idSpan.innerHTML = "";
  } else {
    idSpan.innerHTML = "Chức vụ không được để trống";
  }
};

document.getElementById("timeWork").oninput = (event) => {
  console.log("he");
  let idSpan = document.getElementById("tbGiolam");
  if (isRequired(event.target.value)) {
    idSpan.innerHTML = "";
  } else {
    idSpan.innerHTML = "Giờ làm không được để trống";
  }
};
