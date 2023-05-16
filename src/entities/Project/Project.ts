import { Person } from 'entities/Person/Person';
import { Result } from 'entities/Result/Result';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

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

  @OneToMany(() => Result, (result) => result.project)
  results: Result[];

  @ManyToMany(() => Person, (person) => person.projects)
  persons: Person[];

  @OneToOne(() => Person)
  @JoinColumn()
  coordinator: Person;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
