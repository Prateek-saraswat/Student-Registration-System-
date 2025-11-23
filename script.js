const studentName = document.getElementById("studentName");
const studentId = document.getElementById("studentId");
const studentEmailId = document.getElementById("studentEmailId");
const studentContactNo = document.getElementById("studentContactNo");
const registeredStudentTable = document.querySelector("#studentsTable tbody");
const table = document.querySelector("#studentsTable")
const submitBtn = document.getElementById("submit-btn");
const registrationForm = document.getElementById("registration-form");



  let rowId = 1;
  
  let editRow = null


  //for saving data in local storage
function saveToLocalStorage() {
  const rows = [...registeredStudentTable.querySelectorAll("tr")];
  const data = rows.map(row => {
    const cells = row.querySelectorAll("td");
    return {
      studentName: cells[0].textContent,
      studentId: cells[1].textContent,
      studentEmailId: cells[2].textContent,
      studentContactNo: cells[3].textContent,
    };
  });

  

  localStorage.setItem("studentsData", JSON.stringify(data));
}


//after refreshing first load data from local storage
function loadFromLocalStorage() {
  const data = JSON.parse(localStorage.getItem("studentsData")) || [];


  data.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="py-2 px-4">${item.studentName}</td>
      <td class="py-2 px-4">${item.studentId}</td>
      <td class="py-2 px-4">${item.studentEmailId}</td>
      <td class="py-2 px-4">${item.studentContactNo}</td>
      <td>
        <button type="button" class="btn-edit bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition">Edit</button>
        <button type="button" class="btn-delete bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition">Delete</button>
      </td>
    `;
    registeredStudentTable.appendChild(row);
  });

  updateTableScroll();
}

//calling local storage one time after loading DOM
loadFromLocalStorage();

function updateTableScroll() {
  const rows = registeredStudentTable.querySelectorAll("tr");
  if(rows.length > 8){
    registeredStudentTable.style.maxHeight = "400px";
    registeredStudentTable.style.overflowY = "auto";
  } else {
    registeredStudentTable.style.maxHeight = "none";
    registeredStudentTable.style.overflowY = "visible";
  }
}


//created array so that i can loop and apply event listener easily not one by one 
let studentDetailsArray = [
  studentName,
  studentId,
  studentEmailId,
  studentContactNo,
];

// console.log(studentDetailsArray);

let studentDetails = {
  studentName: "",
  studentId: "",
  studentEmailId: "",
  studentContactNo: "",
};

studentDetailsArray.forEach((eachField) => {
  eachField.addEventListener("input", (e) => {
    studentDetails[e.target.id] = e.target.value;
    // console.log(studentDetails);
  });
});

registrationForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if(editRow !== null){

    let cells = editRow.querySelectorAll('td')
 cells[0].textContent = studentName.value;
    cells[1].textContent = studentId.value;
    cells[2].textContent = studentEmailId.value;
    cells[3].textContent = studentContactNo.value;
editRow = null

  registrationForm.reset();
   submitBtn.innerText = 'Add Student'
   updateTableScroll()
   saveToLocalStorage();
return 

  }
  const rowData = document.createElement("tr");
  rowData.setAttribute("data-row-id" , rowId)
  rowData.innerHTML = `
      <td class="py-2 px-4">${studentDetails.studentName}</td>
      <td class="py-2 px-4">${studentDetails.studentId}</td>
      <td class="py-2 px-4">${studentDetails.studentEmailId}</td>
      <td class="py-2 px-4">${studentDetails.studentContactNo}</td>
     <td>
  <button type="button" class="btn-edit bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition" data-id=${rowId}>
    Edit
  </button>
  <button type="button" class="btn-delete bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition" data-id=${rowId}>
    Delete
  </button>
</td>`;
rowData.classList.add("hover:bg-gray-700", "transition-colors");


  registeredStudentTable.appendChild(rowData);
  rowId++

  updateTableScroll()
  registrationForm.reset();
  saveToLocalStorage();
});


registeredStudentTable.addEventListener('click' , (e)=>{
 if (e.target.classList.contains("btn-delete")) {
    const row = e.target.closest("tr");
    row.remove();
    registrationForm.reset()
    saveToLocalStorage();
    return;
  }

  if(e.target.classList.contains("btn-edit")){
    submitBtn.innerText = 'Save'
     editRow = e.target.closest("tr");
    const cells = editRow.querySelectorAll("td")
    console.log(cells)
     //Form refill
     studentName.value = cells[0].textContent
     studentId.value = cells[1].textContent
     studentEmailId.value = cells[2].textContent
     studentContactNo.value = cells[3].textContent

   
     studentDetails.studentName = cells[0].textContent
    studentDetails.studentId = cells[1].textContent
    studentDetails.studentEmailId = cells[2].textContent
    studentDetails.studentContactNo = cells[3].textContent

    saveToLocalStorage();
  }

})