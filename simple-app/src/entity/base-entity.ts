import {Exclude, Expose, Type} from "class-transformer";
import {IsDate, IsNotEmpty, IsNumber, IsOptional} from "class-validator";
import {
	CreateDateColumn,
	UpdateDateColumn,
	Column,
	PrimaryGeneratedColumn,
} from "typeorm";

@Exclude()
export class BaseEntity {

	@Expose()
	@PrimaryGeneratedColumn()
	@IsNumber() @IsNotEmpty()
	public id!: number;

	@Expose()
	@Type(() => Date)
	@CreateDateColumn({select: false})
	@IsDate()
	public created_date!: Date;

	@Expose()
	@Type(() => Date)
	@UpdateDateColumn({select: false})
	@IsDate()
	@IsOptional()
	public updated_date?: Date;

	@Column({select: false})
	public deleted!: boolean;
}
