import { BadRequestException } from '@nestjs/common';
import { isNumberString } from 'class-validator';
import * as bcrypt from 'bcryptjs';
export const comparePassword = (text: string, hashedText: string) => {
  return bcrypt.compareSync(text, hashedText);
};

export const hashPassword = (text: string) => {
  return bcrypt.hashSync(text, 10);
}

export const unifyPhoneNumber = (value: string): string => {
  if (![11, 13, 14].includes(value?.length)) {
    throw new BadRequestException(
      `Invalid phone number. Phone number must start with +234, 234 or 0`,
    );
  }

  if (
    !value.startsWith('+234') &&
    !value.startsWith('234') &&
    !value.startsWith('0')
  ) {
    throw new BadRequestException(
      `Invalid phone number. Phone number must start with +234, 234 or 0`,
    );
  }

  return value.replace(/(^0)/, '234').replace(/(^\+)/, '');
};

export const isPhoneNumber = (value: string): boolean => {
  return (
    isNumberString(value) &&
    [11, 13, 14].includes(value?.length) &&
    (value.startsWith('+234') ||
      value.startsWith('234') ||
      value.startsWith('0'))
  );
};