import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity.js';

@Entity('recipes')
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'int' })
  servings: number;

  @Column({ type: 'int' })
  cookTimeMinutes: number;

  @Column({ type: 'text' })
  imageUrl: string;

  @Column({ type: 'boolean', default: false })
  isPublic: boolean;

  @Column({ type: 'jsonb' })
  ingredients: object[];

  @Column({ type: 'jsonb' })
  directions: object[];

  @Column({ type: 'text', array: true, default: '{}' })
  tags: string[];

  @Column({ type: 'varchar' })
  category: string;

  @ManyToOne(() => User, (user) => user.recipes,  {
    nullable: false,
  })
    user: User;
}