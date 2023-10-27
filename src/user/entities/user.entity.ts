import { BaseEntity } from 'src/common/entity/base.entity';
import { BeforeInsert, Column, Entity, OneToMany, ManyToOne } from 'typeorm';
import { UserRole } from '../enum/user.enum';

@Entity({
  name: 'user',
})
export class User extends BaseEntity {
  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: false })
  phoneNumber: string;

  @Column({ enum: Object.values(UserRole), default: UserRole.USER })
  role: string;

  @Column({ nullable: true })
  dateOfBirth: string;

  @Column({ nullable: true })
  age: number;

  @BeforeInsert()
  calculateAge() {
    const today = new Date();
    if (!this?.dateOfBirth) {
      return;
    }
    const birthDate = new Date(this?.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    this.age = age;
  }
}
