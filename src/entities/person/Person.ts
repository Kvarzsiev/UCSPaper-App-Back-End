import { PersonProject } from '../personProject/PersonProject';
import { Result } from '../result/Result';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';

@Entity('person')
export class Person {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
