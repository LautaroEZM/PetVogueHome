const validation = (pet) => {
    const error = {}

    //REGEX 
    const nameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+){0,3}$/
    const weightRegex = /^\d+$/
   // const imageRegexUrl = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
   // const regexUrl = new RegExp(imageRegexUrl);

    //Name🎀 
    if(pet.name && !nameRegex.test(pet.name)) {
        error.name = "EL nombre contiene caracteres invalidos."
    }
    if(pet.name && pet.name.length > 30) {
        error.name = "Máximo de caracteres alcanzado🐾."
    }
    if(pet.name && pet.name.length < 5) {
        error.name = "El mínimo son 5 caracteres🐾."
    }
    if(!pet.name) {
        error.name = "Debe agregar un nombre 👀."
    }

    // Birthdate🎀
      if (!pet.birthdate) {
        error.birthdate = "Debe agregar una fecha de nacimiento 📅";
    } else {
        const birthdate = new Date(pet.birthdate);
        const currentDate = new Date();

        if (birthdate > currentDate) {
            error.birthdate = "La fecha de nacimiento no puede ser en el futuro";
        }
    }


  //Gender🎀

  if(pet.gender && !nameRegex.test(pet.gender)) {
    error.gender = "El genero contiene caracteres invalidos."
}
    
    if(pet.gender && pet.gender.length > 10) {
        error.gender = "🐾Máximo de caracteres alcanzado."
    }
    if(pet.gender && pet.gender.length < 13) {
        error.email = "🐾El mínimo son 1 caracteres."
    }
    if(!pet.gender) {
        error.gender = "Debe agregar un Genero 👀👀👀."
    }

    //Specie🎀
    if(pet.specie && !nameRegex.test(pet.specie)) {
        error.specie = "EL nombre contiene caracteres invalidos."
    }

    if(pet.specie && pet.specie.length < 5) {
        error.specie = "El mínimo son 5 caracteres. Porfavor especifique la especie de su mascota👀"
    }
    if(pet.specie && pet.specie.length > 20) {
        error.specie = "Máximo de caracteres alcanzado ❌"
    }

    //Breed🎀
    if(pet.breed && !nameRegex.test(pet.breed)) {
        error.breed = "La raza contiene caracteres invalidos."
    }

    if(pet.breed && pet.breed.length < 5) {
        error.breed = "El mínimo son 5 caracteres👀"
    }
    if(pet.breed && pet.breed.length > 30) {
        error.breed = "Máximo de caracteres alcanzado ❌"
    }

    //VacRecord🎀
    if(pet.vacRecord && pet.vacRecord.length < 5) {
        error.vacRecord = "El mínimo son 5 caracteres👀"
    }
    if(pet.vacRecord && pet.vacRecord.length > 30) {
        error.vacRecord = "Máximo de caracteres alcanzado ❌"
    }

    //Weight🎀
    if(pet.weight && !weightRegex.test(pet.weight)) {
        error.weight = "El peso contiene caracteres invalidos 👀."
    }
    if(pet.weight && pet.weight.length > 0) {
        error.weight = "Peso requerido ❌"
    }

    //Size🎀
    if(pet.size && !nameRegex.test(pet.size)) {
        error.size = "El tamaño contiene caracteres invalidos."
    }

    if(pet.size && pet.size.length < 5) {
        error.size = "El mínimo son 5 caracteres👀"
    }
    if(pet.size && pet.size.length > 20) {
        error.size = "Máximo de caracteres alcanzado ❌"
    }

    // Image🎀
     if (!pet.image) {
        error.image = "Debe agregar una imagen 📷";
    }


    return error;
}

export default validation;