import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Recipe } from "../../recipes/entities/recipe.entity.js";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id : number
    @Column({type : 'varchar'})
    username : string

    @Column({type : 'varchar'})
    email : string

    @Column({type : 'varchar'})
    password : string

    @OneToMany(() => Recipe, (recipe) => recipe.user)
    recipes: Recipe[];
}
