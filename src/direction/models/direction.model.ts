import { AutoIncrement, Column, DataType, PrimaryKey, Table, Unique, Model } from "sequelize-typescript"
import { IDirection } from "./direction.dto"

interface DirectionCreationAttrs extends IDirection {}

@Table({tableName: 'direction', timestamps: false})
export class DirectionModel extends Model<DirectionModel, DirectionCreationAttrs> {
  
  @Unique
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  id: number

  @Column({type: DataType.STRING})
  directionName: string

  @Unique
  @Column({type: DataType.STRING})
  directionCode: string

  @Column({type: DataType.INTEGER, defaultValue: 0})
  directionFrom: number

  @Column({type: DataType.BOOLEAN, defaultValue: false})
  isSelect: boolean
}