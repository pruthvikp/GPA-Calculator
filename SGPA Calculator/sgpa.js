
object ={
    id:0,
};

const button = document.getElementById('addSubject');

button.addEventListener('click', () => {

    const maindiv = document.querySelector('.subject-boxes');

    const subject_box = document.createElement("div");
    
    object.id+=1
    const id=object.id;

    subject_box.id=`subject_box-${id}`;

    subject_box.innerHTML += `Subject ${id}:`; 
    
    const newTextbox = document.createElement('input');
    newTextbox.setAttribute('type', 'number');
    newTextbox.setAttribute('name', 'credit');
    newTextbox.setAttribute('id', `credits-${id}`);
    newTextbox.setAttribute('placeholder', 'Credits');

    const newSelect = document.createElement('select');
    newSelect.setAttribute('name', 'grade');
    newSelect.setAttribute('id', `grades-${id}`);
    var option0 = document.createElement("option");
    option0.value="";
    option0.text = "Grade"; 
    option0.disabled = "disabled";
    option0.display="hidden"; 
    var option1 = document.createElement("option"); 
    option1.value = "S"; 
    option1.text = "S"; 
    newSelect.appendChild(option1); 
    var option2 = document.createElement("option"); 
    option2.value = "A"; 
    option2.text = "A"; 
    newSelect.appendChild(option2); 
    var option3 = document.createElement("option"); 
    option3.value = "B"; 
    option3.text = "B"; 
    newSelect.appendChild(option3); 
    var option4 = document.createElement("option"); 
    option4.value = "C"; 
    option4.text = "C"; 
    newSelect.appendChild(option4); 
    var option5 = document.createElement("option"); 
    option5.value = "D"; 
    option5.text = "D"; 
    newSelect.appendChild(option5); 
    var option6 = document.createElement("option"); 
    option6.value = "E"; 
    option6.text = "E"; 
    newSelect.appendChild(option6); 
    var option7 = document.createElement("option"); 
    option7.value = "F"; 
    option7.text = "F"; 
    newSelect.appendChild(option7); 

    var x = document.createElement("BUTTON");
    x.classList.add("remove");
    x.id=`remove-${id}`;
    x.innerHTML = '<i class="fa-solid fa-trash"></i>';

    subject_box.appendChild(newTextbox);
    subject_box.appendChild(newSelect);
    subject_box.append(x);
    maindiv.appendChild(subject_box);


    const button3 = document.getElementById(`remove-${id}`);
    const divToRemove = document.getElementById(`subject_box-${id}`);

    button3.addEventListener('click', () => {
        divToRemove.remove();
        });
});


const button2 = document.getElementById('calculate');

button2.addEventListener('click', (e) => {
    e.preventDefault();
    let total_credits=0;
    let total_grades=0;
    let sgpa=0;
    const grade_points={
        'S':10,
        'A':9,
        'B':8,
        'C':7,
        'D':5,
        'E':4,
        'F':0
    };

    for(let i=1;i<=object.id;i++){
        cred=parseFloat(document.getElementById(`credits-${i}`).value);
        if (isNaN(cred))
            {
                
                Swal.fire({
                    title: "Pruthvi's calculator says",
                    text: 'Field is blank',
                    confirmButtonText: 'OK'
                });
                return false;
            }
        total_credits+=cred;
        grad=document.getElementById(`grades-${i}`).value;
        total_grades+=grade_points[grad]*cred;

        console.log(cred);
        console.log(grad);
        console.log(grade_points[grad]);
        console.log(total_credits);
        console.log(total_grades);
    }

    sgpa=(total_grades/total_credits).toFixed(4);
    console.log(sgpa);
    document.getElementById('answer').innerHTML=`Your SGPA is ${sgpa}`;
    
});