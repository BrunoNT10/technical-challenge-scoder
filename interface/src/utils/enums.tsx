export enum Categories {
    All = "Todos",
    Eletronics = "Eletrônicos",
    Clothes = "Roupas",
    Food = "Alimentos",
    House = "Casa e Decoração",
    Beauty = "Cuidados Pessoais",
    Tools = "Ferramentas",
    Toys = "Brinquedos",
    Sports = "Esporte"
}

export enum StatusCode {
    Ok = 200,
    Created = 201,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    InternalServerError = 500,
}

export enum ToastIds {
    SuccessWhenUpdateItem = "items-updated-successfully",
    SuccessWhenDeleteItem = "items-updated-successfully",
    NoProductsFound = "list-products-404",
    UnexpectedException = "unexpected-excpetion"
}

export enum ProductKeys {
    Price = 'productPrice'
}