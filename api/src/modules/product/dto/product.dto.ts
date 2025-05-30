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
    
    @ApiProperty({ example: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fimg.freepik.com%2Fvetores-gratis%2Ftela-realista-para-smartphone-com-aplicativos-diferentes_52683-30241.jpg%3Fsemt%3Dais_hybrid%26w%3D740&tbnid=c_SH5x0wtf1d3M&vet=1&imgrefurl=https%3A%2F%2Fbr.freepik.com%2Ffotos-vetores-gratis%2Fcelular&docid=tl4Koh-DJNeGqM&w=740&h=740&source=sh%2Fx%2Fim%2Fm5%2F1&kgs=ed26c277c3803ea0" })
    productImageUrl: string;
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