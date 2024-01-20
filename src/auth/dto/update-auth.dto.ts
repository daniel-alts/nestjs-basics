import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-auth.dto';
import {} from 'class-validator'

export class UpdateAuthDto extends PartialType(CreateAuthDto) {
    name: string;
}
