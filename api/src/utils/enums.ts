export enum OperationsMessages{
    SUCCESS_WHEN_CREATE_NEW_ITEM = "Success when create new item.",
    SUCCESS_WHEN_LIST_ITEMS = "Success when list items.",
    SUCCESS_WHEN_UPDATE_ITEM = "Success when update item.",
    SUCCESS_WHEN_DELETE_ITEM = "Success when delete item.",
    ERROR_WHEN_CREATE_DATABASE_PRODUCT = "Error when create product in database.",
    ERROR_WHEN_CREATE_REDIS_PRODUCT = "Error when create product in cache.",
    ERROR_WHEN_UPDATE_DATABASE_PRODUCT = "Error when update the product in database.",
    ERROR_WHEN_UPDATE_REDIS_PRODUCT = "Error when update the product in cache.",
    ERROR_WHEN_DELETE_DATABASE_PRODUCT = "Error when delete the product from table.",
    ERROR_WHEN_DELETE_REDIS_PRODUCT = "Error when delete the product from cache.",
    ERROR_WHEN_DELETE_PRODUCT = "Error when delete product",
    ERROR_WHEN_UPDATE_CACHE = "Error when update cache.",
    ERROR_WHEN_GET_REDIS_KEYS = "Error when get redis keys.",
    ERROR_WHEN_LIST_PRODUCTS = "Error when list products.",
    ERROR_WHEN_UPDATE_PRODUCT = "Error when update product",
    PRODUCTS_ITEMS_NOT_FOUND = "Products items was not found!"
}

export enum OperationStatus{
    SUCCESS = "success",
    ERROR = "error"
}

export enum ParamsDescriptions {
    PAGE_DESCRIPTION = "Page of the table to retrieve. Pass if you want retrieve a specific page. If null, will retrieve all items.",
    PAGE_SIZE_DESCRIPTION = "Size of each page to be returned"
}

export enum ConstantsValues {
    REDIS_INITIAL_CURSOR = '0',
    REDIS_FINAL_CURSOR = '0',
    REDIS_SCAN_PRODUCTS_PATTERN = 'product:*'
}