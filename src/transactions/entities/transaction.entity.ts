import { BaseEntity } from "src/common/entity/base.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { TransactionStatus } from "../enum/transaction.enum";

@Entity({
    name: 'transaction',
  })
  export class Transaction extends BaseEntity {
      @ManyToOne(() => User, (user) => user.wallets, { onDelete: 'CASCADE', nullable: false })
      senderId: string;

        @ManyToOne(() => User, (user) => user.wallets, { onDelete: 'CASCADE', nullable: false })
        receiverId: string;

        @Column({ nullable: false })
        amount: number;

        @Column({ nullable: false, enum: Object.values(TransactionStatus) })
        status: string;

        @Column({ nullable: false })
        currency: string;

        @Column({ nullable: false })
        reference: string;

        @Column({ nullable: false })
        narration: string;

        @Column({ nullable: false })
        senderBalance: number;

        @Column({ nullable: false })
        receiverBalance: number;
    }

