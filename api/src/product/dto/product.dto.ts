import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
    @ApiProperty({ example: "Celular" })
    productName: string;
    
    @ApiProperty({ example: "Celular Suricato, 128 GB de Armazenamento, 16 GB de Memória RAM" })
    productDescription: string;
}