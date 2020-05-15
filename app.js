const readLineSync = require("readline-sync");
const fs = require("fs");

let students = [];

const loadData = () => {
  let data = fs.readFileSync("./data.json", { encoding: "UTF-8" });
  students = JSON.parse(data);
};

const showStudents = () => {
  let id = 0;
  for (student of students) {
    let maSV = student.maSV;
    let firstName = student.firstName;
    let middleName = student.middleName;
    let lastName = student.lastName;
    let dateOfBirth = student.dateOfBirth;
    let className = student.className;
    console.log(
      `${id}. Mã SV: ${maSV} | Họ và tên: ${lastName} ${middleName} ${firstName} | Ngày sinh: ${dateOfBirth} | Tên Lớp: ${className}.`
    );
    id++;
  }
};

const addStudents = () => {
  let maSV = readLineSync.question("Ma SV: ");
  maSV = maSV.trim();
  let firstName = readLineSync.question("Ten: ");
  firstName = firstName.trim();
  let middleName = readLineSync.question("Dem: ");
  middleName = middleName.trim();
  let lastName = readLineSync.question("Ho: ");
  lastName = lastName.trim();
  let dateOfBirth = readLineSync.question("Ngay sinh: ");
  dateOfBirth = dateOfBirth.trim();
  let className = readLineSync.question("Ten lop: ");
  className = className.trim();
  let student = {
    maSV: parseInt(maSV),
    firstName: firstName,
    middleName: middleName,
    lastName: lastName,
    dateOfBirth: dateOfBirth,
    className: className,
  };
  students.push(student);
};

const deleteStudents = () => {
  let id = readLineSync.questionInt("Dong muon xoa: ");
  students.splice(id, 1);
};

const saveData = () => {
  let data = JSON.stringify(students);
  fs.writeFileSync("./data.json", data, { encoding: "UTF-8" });
};

const option = () => {
  console.log("1: Hiển thị thông tin sinh viên.");
  console.log("2: Thêm sinh viên.");
  console.log("3: Xóa sinh viên.");
  console.log("4: Lưu và thoát.");

  let index = readLineSync.question("> ");
  index = parseInt(index);
  switch (index) {
    case 1:
      showStudents();
      option();
      break;
    case 2:
      addStudents();
      showStudents();
      option();
      break;
    case 3:
      deleteStudents();
      showStudents();
      option();
      break;
    case 4:
      saveData();
      break;
    default:
      console.log("Lựa chọn sai, mời chọn lại.");
      option();
  }
};

loadData();
option();
