// @/models.ts
import { Table, Model, Column, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import User from "./User";


// models/Ticket.ts
@Table({ tableName: "Ticket" })
export default class Ticket extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare ID_Ticket: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  declare ID_User: number;

  @BelongsTo(() => User)
  User?: User;

  @Column(DataType.STRING)
  declare NumeroTicket: string;

  @Column(DataType.STRING)
  declare Sucursal: string;

  @Column(DataType.FLOAT)
  declare Total: number;

  @Column(DataType.DATE)
  declare Fecha: Date;

  @Column(DataType.INTEGER)
  declare Articulos: number;
}


