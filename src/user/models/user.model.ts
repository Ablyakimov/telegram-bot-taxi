import { Model } from "sequelize"
import { AutoIncrement, BelongsToMany, Column, DataType, PrimaryKey, Table, Unique } from "sequelize-typescript"


interface UserCreationAttrs {
  phone_number: string
  first_name: string
}

@Table({tableName: 'users', timestamps: false})
export class UserModel extends Model<UserModel, UserCreationAttrs> {

  @Unique
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  id: number

  @Column({type: DataType.STRING, unique: true})
  phone_number: string

  @Column({type: DataType.STRING})
  first_name: string

}