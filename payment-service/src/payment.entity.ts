import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column({ default: 'NEW' })
  status: string;

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  createTimestamp: Date;

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  updateTimestamp: Date;

  @Column({default:() => 0})
  orderId: number; 
}