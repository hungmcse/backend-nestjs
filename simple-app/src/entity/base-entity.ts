import {Exclude, Expose, Type} from 'class-transformer';
import {IsDate, IsOptional} from 'class-validator';
import {Column, CreateDateColumn, UpdateDateColumn,} from 'typeorm';

@Exclude()
export class BaseEntity {
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
