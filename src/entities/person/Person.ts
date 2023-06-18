import { Project } from 'entities/project/Project';
import { PersonProject } from 'entities/personProject/PersonProject';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Result } from 'entities/result/Result';

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

  @OneToMany(() => PersonProject, (personProject) => personProject.person)
  personProjects: PersonProject[];

  @ManyToMany(() => Result, (result) => result.persons)
  results: Result[];

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
