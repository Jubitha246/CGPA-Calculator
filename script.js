let course_details={
  courseDetails:[
      { code: "GN1101", Name: "Life Skills 1", type: "Science", credits: "0" },
      { code: "ID1200", Name: "Ecology and Environment", type: "Science", credits: "0" },
      { code: "MA1101", Name: "Functions of Several Variables", type: "Science", credits: "10" },
      { code: "ME1480", Name: "Engineering Drawing", type: "Engineering", credits: "7" },
      { code: "PH1010", Name: "Physics I", type: "Science", credits: "10" },
      { code: "AM1100A", Name: "Engineering Mechanics", type: "Engineering", credits: "10" },
      { code: "CE1010", Name: "Introduction to Civil Engineering Profession", type: "Professional", credits: "8" },
      { code: "CE2330", Name: "Civil Engineering Materials and Construction", type: "Professional", credits: "9" },
      { code: "CS1100", Name: "Introduction to Programming", type: "Engineering", credits: "12" },
      { code: "CY1001#", Name: "Chemistry I: Structure, Bonding & Reactivity", type: "Science", credits: "10" },
      { code: "GN1102", Name: "Life Skills 2", type: "Science", credits: "0" },
      { code: "PH1020", Name: "Physics II", type: "Science", credits: "10" },
      { code: "PH1030", Name: "Physics Laboratory I", type: "Science", credits: "4" },
      { code: "CY1002", Name: "Chemistry Lab I", type: "Science", credits: "3" },
      { code: "MA1102,", Name: "Series and Matrices", type: "Science", credits: "10" },
      { code: "CE2040", Name: "Hydraulic Engineering", type: "Professional", credits: "11" },
      { code: "CE2080", Name: "Surveying", type: "Professional", credits: "10" },
      { code: "CE2310", Name: "Mechanics of materials", type: "Engineering", credits: "11" },
      { code: "CE3015", Name: "Highway Engineering", type: "Professional", credits: "9" },
      { code: "MA2040", Name: "Probability, Statistics and Stochastic Process", type: "Science", credits: "9" },
      { code: "CE2020", Name: "Structural Analysis", type: "Professional", credits: "11" },
      { code: "CE3060", Name: "Geotechnical Engineering I", type: "Professional", credits: "11" },
      { code: "CE3025", Name: "Traffic Engineering ", type: "Professional", credits: "9" },
      { code: "CE3040", Name: "Environmental Engineering", type: "Professional", credits: "10" },
      { code: "HS4570", Name: "Introduction to Chinese Language", type: "Humanities", credits: "9" },
      { code: "MA2020", Name: "Differential Equations", type: "Sciences", credits: "9" },
      { code: "CE3060", Name: "Basic design of reinforced concrete structures ", type: "Professional", credits: "11" },
      { code: "HS4570", Name: "Urbanization and Development", type: "Humanities", credits: "10" },
      { code: "CE4500", Name: "Hydraulic and Environmental Engineering Lab", type: "Professional", credits: "4" },
      { code: "BT1010", Name: "Life Sciences", type: "Sciences", credits: "9" },
      { code: "CE3030", Name: "Water Resources Engineering", type: "Professional", credits: "12" },
      { code: "CE3350", Name: "Geotechnical Engineering II", type: "Professional", credits: "11" },
      { code: "CE3410", Name: "Construction Materials Laboratory", type: "Professional", credits: "4" },
      { code: "CE4010", Name: "Construction Project Management", type: "Professional", credits: "10" },
      { code: "CE3050", Name: "Basic Steel Design", type: "Professional", credits: "11" },
      { code: "CE3100", Name: "Structural engineering laboratory", type: "Professional", credits: "4" },
      { code: "HS3002", Name: "Principles of Economics", type: "Humanities", credits: "9" },
      { code: "CE4310", Name: "Design of Concrete Structrual Systems", type: "Professional", credits: "9" },
      { code: "CE6051", Name: "Machine Learning in Civil Engineering", type: "Professional", credits: "9" },
      { code: "CE6018", Name: "Seismic Data Analytics", type: "Professional", credits: "9" }
  ]
};
let grades_details={
  S: 10,
  A: 9,
  B: 8,
  C: 7,
  D: 6,
  E: 4,
  F: 0,
  U: 0,
  P: 0
};
function createGradeDropdown() {
  const gradeDropdown=document.createElement('select');
  gradeDropdown.classList.add('grade');
  gradeDropdown.required=true;
  const defaultOption=document.createElement('option');
  defaultOption.text='Select Grade';
  defaultOption.disabled=true;
  defaultOption.selected=true;
  gradeDropdown.appendChild(defaultOption);
  Object.keys(grades_details).forEach(grade => {
      const option=document.createElement('option');
      option.value=grade;
      option.text=grade;
      gradeDropdown.appendChild(option);
  });
  return gradeDropdown;
}
document.getElementById('course-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const totalCourses=parseInt(document.getElementById('total-courses').value);
  const courseInputsDiv=document.getElementById('course-inputs');
  courseInputsDiv.innerHTML='';
  document.getElementById('result').textContent='';
  for (let i=0;i<totalCourses;i++) {
      const courseInput=document.createElement('div');
      courseInput.classList.add('course-input');
      const courseLabel=document.createElement('label');
      courseLabel.textContent=`Course ${i + 1}:`;
      const courseDropdown=document.createElement('select');
      courseDropdown.classList.add('course-code');
      courseDropdown.required=true;
      const defaultOption=document.createElement('option');
      defaultOption.text='Select Course Code';
      defaultOption.disabled=true;
      defaultOption.selected=true;
      courseDropdown.appendChild(defaultOption);
      course_details.courseDetails.forEach(course => {
          const option=document.createElement('option');
          option.value=course.code;
          option.text=`${course.code}-${course.Name}(${course.credits} credits)`;
          courseDropdown.appendChild(option);
      });
      const gradeLabel=document.createElement('label');
      gradeLabel.textContent=`Grade for Course ${i + 1}:`;
      const gradeDropdown=createGradeDropdown();
      courseInput.appendChild(courseLabel);
      courseInput.appendChild(courseDropdown);
      courseInput.appendChild(document.createElement('br'));
      courseInput.appendChild(gradeLabel);
      courseInput.appendChild(gradeDropdown);
      courseInputsDiv.appendChild(courseInput);
  }
  const calculateButton=document.getElementById('calculate-cgpa');
  calculateButton.style.display='block';
});
document.getElementById('calculate-cgpa').addEventListener('click', function() {
  const courseInputs=document.querySelectorAll('.course-input');
  let totalCredits=0;
  let totalWeightedGradePoints=0;
  courseInputs.forEach((input, index) => {
      const courseCode = input.querySelector('.course-code').value;
      const grade = input.querySelector('.grade').value;
      const courseDetail = course_details.courseDetails.find(course=>course.code === courseCode);
      const credits = parseInt(courseDetail.credits);
      const gradePoint = grades_details[grade];
      if (!isNaN(credits) && !isNaN(gradePoint)) {
          totalCredits +=credits;
          totalWeightedGradePoints+=credits*gradePoint;
      }
  });
  const cgpa = (totalWeightedGradePoints)/(totalCredits);
  if (!isNaN(cgpa)){
      document.getElementById('result').textContent = `Your CGPA is: ${cgpa.toFixed(2)}`;
  }else{
      document.getElementById('result').textContent = "Please enter valid course codes and grades.";
  }
});
