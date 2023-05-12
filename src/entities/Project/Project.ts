import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/*
TODO: Adicionar relação com Person
*/

@Entity('Project')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  description: string;

  @Column({
    nullable: true,
  })
  sponsor: string;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
