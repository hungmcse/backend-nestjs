import {BaseEntity, Column, Entity, PrimaryColumn} from 'typeorm';

@Entity('user')
export class UserEntity extends BaseEntity {

	@PrimaryColumn()
	public username!: string;

	@Column()
	public password!: string;
}
