export const validate = (user, setErrors, setErrorsEdited, editFlag) => {
    let nameError = '';
    let surnameError = '';
    let ageError = '';
    const regName = /^[A-Za-z -]+$/;
    if(user.name.length < 2){
        nameError = "Name at least have 2 letters";
    }else if(!regName.test(user.name)){
        nameError = "The field 'Name' must contain only letters ";
    }
    if(user.surname.length < 2){
        surnameError = "Surname at least have 2 letters";
    }else if(!regName.test(user.surname)){
        surnameError = "The field 'Surname' must contain only letters ";
    }
    if(+user.age === 0){
        ageError = "Please write a number greater than 0";
    }else if(user.age > 100){
        ageError = "You cannot enter numbers greater than 100";
    }

    if(!editFlag){
        if(nameError || surnameError || ageError){
            setErrors({nameError, surnameError, ageError});
            return false;
        }
    }else{
        if(nameError || surnameError || ageError){
            setErrorsEdited({nameError, surnameError, ageError});
            return false;
        }
    }
    return true;
}