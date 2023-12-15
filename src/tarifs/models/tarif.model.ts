import { Model } from "sequelize"
import { AutoIncrement, Column, DataType, PrimaryKey, Table, Unique } from "sequelize-typescript"
import { ITarif } from "./tarif.dto"


interface TarifCreationAttrs extends ITarif {}

@Table({tableName: 'tarifs', timestamps: false})
export class TarifModel extends Model<TarifModel, TarifCreationAttrs> {
  
  
  @Unique
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  id: number

  @Column({type: DataType.STRING, unique: true})
  name: string

  @Column({type: DataType.STRING,  unique: true})
  dataBtn: string
}