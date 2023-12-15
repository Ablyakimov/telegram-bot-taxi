import { Model } from "sequelize"
import { AutoIncrement, Column, DataType, PrimaryKey, Table, Unique } from "sequelize-typescript"
import { IOrder } from "./order.dto"


interface OrderCreationAttrs extends IOrder {}

@Table({tableName: 'orders', timestamps: false})
export class OrderModel extends Model<OrderModel, OrderCreationAttrs> {
  
  @Unique
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  id: number

  @Column({type: DataType.DATE})
  date: string

  @Column({type: DataType.STRING})
  fromCode: string

  @Column({type: DataType.STRING})
  fromName: string

  @Column({type: DataType.STRING})
  to: string

  @Column({type: DataType.STRING})
  tarifName: string

  @Column({type: DataType.STRING})
  tarifCode: string

  @Column({type: DataType.INTEGER})
  price: number

  @Column({type: DataType.INTEGER})
  passenger: number

  @Column({type: DataType.STRING})
  numberOrder: string

  @Column({type: DataType.STRING, allowNull: true})
  conductor: string
}