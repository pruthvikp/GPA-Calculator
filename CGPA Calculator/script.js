let object = {
    id: 0
};

const buttonAddSubject = document.getElementById('addSubject');
const buttonCalculate = document.getElementById('calculate');

buttonAddSubject.addEventListener('click', () => {
    addSubjectBox();
    refreshSemesterNumbers();
});

buttonCalculate.addEventListener('click', (e) => {
    e.preventDefault();
    calculateCGPA();
});

function addSubjectBox() {
    const maindiv = document.querySelector('.subject-boxes');
    const subjectBox = document.createElement("div");
    
    object.id += 1;
    const id = object.id;
    subjectBox.classList.add('subject-box');
    subjectBox.id = `subject_box-${id}`;

    // Semester label
    const semesterLabel = document.createElement('span');
    semesterLabel.classList.add('semester-label');
    semesterLabel.innerText = `Semester ${id}:`;
    subjectBox.appendChild(semesterLabel);

    // CGPA input box
    const newGpa = document.createElement('input');
    newGpa.setAttribute('type', 'number');
    newGpa.setAttribute('name', 'cgpa');
    newGpa.setAttribute('id', `cgpa-${id}`);
    newGpa.setAttribute('placeholder', 'CGPA');
    subjectBox.appendChild(newGpa);

    // Credit input box
    const newTextbox = document.createElement('input');
    newTextbox.setAttribute('type', 'number');
    newTextbox.setAttribute('name', 'credit');
    newTextbox.setAttribute('id', `credits-${id}`);
    newTextbox.setAttribute('placeholder', 'Credits');
    subjectBox.appendChild(newTextbox);

    // Remove button
    const removeButton = document.createElement("button");
    removeButton.classList.add("remove");
    removeButton.id = `remove-${id}`;
    removeButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    subjectBox.appendChild(removeButton);

    maindiv.appendChild(subjectBox);

    // Add event listener to remove button
    removeButton.addEventListener('click', () => {
        subjectBox.remove();
        refreshSemesterNumbers();
    });
}

function refreshSemesterNumbers() {
    const subjectBoxes = document.querySelectorAll('.subject-box');
    subjectBoxes.forEach((box, index) => {
        const label = box.querySelector('.semester-label');
        label.innerText = `Semester ${index + 1}:`;
        // Adjust IDs for input and select elements
        const gpaBox = box.querySelector('input[name="cgpa"]');
        const creditBox = box.querySelector('input[name="credit"]');
        const removeButton = box.querySelector('button.remove');

        gpaBox.id = `cgpa-${index + 1}`;
        creditBox.id = `credits-${index + 1}`;
        removeButton.id = `remove-${index + 1}`;
    });
    object.id = subjectBoxes.length;
}

function calculateCGPA() {
    let totalCredits = 0;
    let totalGpa = 0;
    let cgpa = 0;

    for (let i = 1; i <= object.id; i++) {
        const creditBox = document.getElementById(`credits-${i}`);
        const gpaBox = document.getElementById(`cgpa-${i}`);
        
        if (creditBox && gpaBox) {
            const cred = parseFloat(creditBox.value);
            if (isNaN(cred)) {
                Swal.fire({
                    title: "Error",
                    text: 'Please fill in all credit fields',
                    confirmButtonText: 'OK'
                });
                return false;
            }
            totalCredits += cred;
            const gpa = parseFloat(gpaBox.value);
            if (isNaN(gpa)) {
                Swal.fire({
                    title: "Error",
                    text: 'Please fill in all GPA fields',
                    confirmButtonText: 'OK'
                });
                return false;
            }
            totalGpa += gpa * cred;
        }
    }

    if (totalCredits === 0) {
        Swal.fire({
            title: "Error",
            text: 'Total credits cannot be zero',
            confirmButtonText: 'OK'
        });
        return false;
    }

    cgpa = (totalGpa / totalCredits).toFixed(4);
    document.getElementById('answer').innerHTML = `Your CGPA is ${cgpa}`;
}
