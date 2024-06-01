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
