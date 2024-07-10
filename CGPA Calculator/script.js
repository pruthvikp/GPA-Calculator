
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

    subject_box.innerHTML += `Semester ${id}:`; 
    
    const newgpa = document.createElement('input');
    newgpa.setAttribute('type', 'number');
    newgpa.setAttribute('name', 'cgpa');
    newgpa.setAttribute('id', `cgpa-${id}`);
    newgpa.setAttribute('placeholder', 'CGPA');
    
    const newTextbox = document.createElement('input');
    newTextbox.setAttribute('type', 'number');
    newTextbox.setAttribute('name', 'credit');
    newTextbox.setAttribute('id', `credits-${id}`);
    newTextbox.setAttribute('placeholder', 'Credits');

    var x = document.createElement("BUTTON");
    x.classList.add("remove");
    x.id=`remove-${id}`;
    x.innerHTML = '<i class="fa-solid fa-trash"></i>';

    
    subject_box.appendChild(newgpa);
    subject_box.appendChild(newTextbox);
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
    let total_gpa=0;
    let cgpa=0;

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
        gpa=parseFloat(document.getElementById(`cgpa-${i}`).value);
        if (isNaN(cred))
            {
                
                Swal.fire({
                    title: "Pruthvi's calculator says",
                    text: 'Field is blank',
                    confirmButtonText: 'OK'
                });
                return false;
            }
        total_gpa+=gpa*cred;
    }

    cgpa=(total_gpa/total_credits).toFixed(4);
    document.getElementById('answer').innerHTML=`Your CGPA is ${cgpa}`;
    
});