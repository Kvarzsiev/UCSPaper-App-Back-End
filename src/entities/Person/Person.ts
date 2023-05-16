import bcrypt from 'bcryptjs'; // caso utilizarmos senhas
import { Project } from 'entities/Project/Project';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';

@Entity('Person')
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    nullable: true,
  })
  name: string;

  @Column({
    nullable: true,
  })
  institution: string;

  @ManyToMany(() => Project, (project) => project.persons)
  @JoinTable()
  projects: Project[];

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
