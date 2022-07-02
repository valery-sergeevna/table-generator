export const validate = (event, name, value, errors, setErrors, setErrorFlag) => {
    switch (name) {
        case 'name':
            if(value.length < 2){
                setErrors({
                    ...errors,
                    name:'Username at least have 2 letters'
                })
            }else{
                setErrors(current => {
                    const copy = {...current};
                    delete copy.name;
                    return copy;
                });
            }
            break;
        case 'surname':
            if(value.length < 2){
                setErrors({
                    ...errors,
                    surname:'Surname at least have 5 letters'
                })
            }else{
                setErrors(current => {
                    const copy = {...current};
                    delete copy.surname;
                    return copy;
                });
            }
            break;

        case 'age':
            if(value === 0){
                setErrors({
                    ...errors,
                    age:'Please write a number greater than 0'
                })
            }else if(value > 100){
                setErrors({
                    ...errors,
                    age:'You cannot enter numbers greater than 100'
                })
            } else{
                setErrors(current => {
                    const copy = {...current};
                    delete copy.age;
                    return copy;
                });
            }
            break;
        default:
            break;
    }
    setErrorFlag( !errors.name && !errors.age && !errors.surname);
}