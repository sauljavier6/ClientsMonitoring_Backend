// @/models.ts
import { Table, Model, Column, DataType, PrimaryKey, AutoIncrement } from "sequelize-typescript";


@Table({ tableName: "Flyer" })
export default class Flyer extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER
  })
  declare ID_Flyer: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare Url: string;
}