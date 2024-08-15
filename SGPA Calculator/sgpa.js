let object = {
    id: 0
};

const buttonAddSubject = document.getElementById('addSubject');
const buttonCalculate = document.getElementById('calculate');

buttonAddSubject.addEventListener('click', () => {
    addSubjectBox();
    refreshSubjectNumbers();
});

buttonCalculate.addEventListener('click', (e) => {
    e.preventDefault();
    let totalCredits = 0;
    let totalGrades = 0;
    let sgpa = 0;
    const gradePoints = {
        'S': 10,
        'A': 9,
        'B': 8,
        'C': 7,
        'D': 5,
        'E': 4,
        'F': 0
    };

    for (let i = 1; i <= object.id; i++) {
        const creditBox = document.getElementById(`credits-${i}`);
        const gradeBox = document.getElementById(`grades-${i}`);
        
        if (creditBox && gradeBox) {
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
            const grad = gradeBox.value;
            totalGrades += gradePoints[grad] * cred;
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

    sgpa = (totalGrades / totalCredits).toFixed(4);
    document.getElementById('answer').innerHTML = `Your SGPA is ${sgpa}`;
});

function addSubjectBox() {
    const maindiv = document.querySelector('.subject-boxes');
    const subjectBox = document.createElement("div");
    
    object.id += 1;
    const id = object.id;
    subjectBox.classList.add('subject-box');
    subjectBox.id = `subject_box-${id}`;

    // Subject label
    const subjectLabel = document.createElement('span');
    subjectLabel.classList.add('subject-label');
    subjectLabel.innerText = `Subject ${id}:`;
    subjectBox.appendChild(subjectLabel);

    // Credit input box
    const newTextbox = document.createElement('input');
    newTextbox.setAttribute('type', 'number');
    newTextbox.setAttribute('name', 'credit');
    newTextbox.setAttribute('id', `credits-${id}`);
    newTextbox.setAttribute('placeholder', 'Credits');
    subjectBox.appendChild(newTextbox);

    // Grade select box
    const newSelect = document.createElement('select');
    newSelect.setAttribute('name', 'grade');
    newSelect.setAttribute('id', `grades-${id}`);
    const grades = ['S', 'A', 'B', 'C', 'D', 'E', 'F'];
    grades.forEach(grade => {
        const option = document.createElement("option");
        option.value = grade;
        option.text = grade;
        newSelect.appendChild(option);
    });
    subjectBox.appendChild(newSelect);

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
        refreshSubjectNumbers();
    });
}

// Function to refresh subject numbers
function refreshSubjectNumbers() {
    const subjectBoxes = document.querySelectorAll('.subject-box');
    subjectBoxes.forEach((box, index) => {
        const label = box.querySelector('.subject-label');
        label.innerText = `Subject ${index + 1}:`;
        // Adjust IDs for input and select elements
        const creditBox = box.querySelector('input[name="credit"]');
        const gradeBox = box.querySelector('select[name="grade"]');
        const removeButton = box.querySelector('button.remove');

        creditBox.id = `credits-${index + 1}`;
        gradeBox.id = `grades-${index + 1}`;
        removeButton.id = `remove-${index + 1}`;
    });
    object.id = subjectBoxes.length;
}
