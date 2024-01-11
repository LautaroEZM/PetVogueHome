const validations = (service) => {
    const error = {}

    //REGEX 
    const nameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+){0,3}$/
    const priceRegex = /^\d+(,\d{3})*(\.\d{2})?$/
   // const imageRegexUrl = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
   // const regexUrl = new RegExp(imageRegexUrl);

    //Name🎀 
    if(service.name && !nameRegex.test(service.name)) {
        error.name = "El nombre contiene caracteres invalidos."
    }
    if(service.name && service.name.length > 30) {
        error.name = "Máximo de caracteres alcanzado🐾."
    }
    if(service.name && service.name.length < 5) {
        error.name = "El mínimo son 5 caracteres🐾."
    }
    if(service.name.length === 0) {
        error.name = "Debe agregar un nombre 👀."
    }

    //🎀Description:
    if(service.description && service.description.length > 400) {
        error.description = "Máximo de caracteres alcanzado(Máx 400)🐾."
    }
    if(service.description && service.description.length < 20) {
        error.description = "El mínimo son 20 caracteres🐾."
    }
    if(service.description.length === 0) {
        error.description = "Debe agregar una descripcion 👀."
    }
    //🎀Category
    if(service.category && !nameRegex.test(service.category)) {
        error.category = "Categoria contiene caracteres invalidos."
    }
    if(service.category.length === 0) {
        error.category = "Debe agregar una categoria 👀."
    }
    //🎀Price:
    if(service.price && !priceRegex.test(service.price)) {
        error.price = "El precio contiene caracteres invalidos👀."
    }
    if(service.price.length === 0) {
        error.price = "Debe agregar un precio 👀."
    }
    return error;
}

export default validations;