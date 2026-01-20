import{
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,


} from 'typeorm';
import{Bus} from '../../buses/entities/bus.entity';


export enum UserRole{
    ADMIN= 'admin',
    USER = 'user',
}
@Entity()
export class User{
    @PrimaryGeneratedColumn('uuid')
    id:string;
    @Column({unique:true})
    email:string;
    @Column()
    password:string;
    @Column({
        type:'enum',
        enum: UserRole,
        default: UserRole.USER,
    })
    role:UserRole;

    @OneToMany(()=>Bus, (bus)=>bus.createdBy)
    buses:Bus[];
    @CreateDateColumn()
    CreatedAt:Date;
    
}


