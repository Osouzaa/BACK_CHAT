import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('clients')
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: 'varchar' })
  name: string;

  @Column({ nullable: true, type: 'varchar' })
  cpf: string;

  @Column({ nullable: true, type: 'varchar' })
  modelo: string;

  @Column({ nullable: true, type: 'varchar' })
  telefone: string;

  @Column({ nullable: true, type: 'varchar' })
  troca: string;

  @Column({ nullable: true, type: 'varchar' })
  financiamento: string;

  @Column({ nullable: true, type: 'varchar', default: 'Em aberto' })
  status: string;

  @Column({ nullable: true, type: 'varchar' })
  concluido: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
