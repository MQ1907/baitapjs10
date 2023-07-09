let employees = [];

//Thêm nhân viên
function addEmployee() {
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

let isValid = validate(employee)
if(!isValid){
  return
}
  
  employees.push(employee);

  display(employees);
  $("#myModal").modal("hide");
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


function isRequired(value){
if (!value.trim()){
  return false
}
return true
}

//Kiểm tra có phải lương hay không 
function isSalary(value) {
  if (typeof value !== 'number'){
    return false
  }
  if (value < 1000000 || value > 20000000) {
    return false;
  }
  return true;
}

//Kiểm tra thời gian làm 
function isHours(value) {
  if (typeof value !== 'number'){
    return false
  }
  if (value < 80 || value > 200) {
    return false;
  }
  return true;
}




function validate(employee){

  let isValid = true

if(!isRequired(employee.account)){
  isValid = false
  document.getElementById("tbTKNV").innerHTML= "Tài khoản không được để trống"
}

if(!isRequired(employee.name)){
  isValid = false
  document.getElementById("tbTen").innerHTML= "Tên không được để trống"
}

if(!isRequired(employee.email)){
  isValid = false
  document.getElementById("tbEmail").innerHTML= "Email không được để trống"
}

if(!isRequired(employee.password)){
  isValid = false
  document.getElementById("tbMatKhau").innerHTML= "Mật khẩu không được để trống"
}

if(!isRequired(employee.dayWork)){
  isValid = false
  document.getElementById("tbNgay").innerHTML= "Ngày làm không được để trống"
}

if(!isSalary(employee.salary)){
  isValid = false
  document.getElementById("tbLuongCB").innerHTML= "Lương không được để trống"
}

if(!isRequired(employee.chucvu)){
  isValid = false
  document.getElementById("tbChucVu").innerHTML= "Chức vụ không được để trống"
}

if(!isHours(employee.timeWork)){
  isValid = false
  document.getElementById("tbGiolam").innerHTML= "Giờ làm không được để trống"
}

return isValid
}