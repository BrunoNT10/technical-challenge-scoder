import { ApiProperty } from "@nestjs/swagger";
import { Product } from "../entities/product.entity";
import { count } from "console";

export class CreateProductDto {
    @ApiProperty({ example: "Celular" })
    productName: string;
    
    @ApiProperty({ example: "Celular Suricato, 128 GB de Armazenamento, 16 GB de Memória RAM" })
    productDescription: string;
    
    @ApiProperty({ example: 100 })
    productPrice: number;
    
    @ApiProperty({ example: "Eletrônicos" })
    productCategory: string
}

export class CreateProductResponseDto {
    type: string;
    message: string;
    item: Product;
    
    constructor(type: string, message: string, product: Product){
        this.type = type;
        this.message = message;
        this.item = product;
    }
}

export class ListProductResponseDto {
    type: string;
    message: string;
    items: Record<string, any>[]
    count: number
    
    constructor(type: string, message: string, items: Record<string, any>[], count: number) {
        this.type = type
        this.message = message
        this.items = items
        this.count = count
    }
}