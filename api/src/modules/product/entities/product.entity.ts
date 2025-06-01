import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  productName: string;

  @Column({ length: 100 })
  productDescription: string;
  
  @Column()
  productPrice: number;
  
  @Column()
  productCategory: string
}
