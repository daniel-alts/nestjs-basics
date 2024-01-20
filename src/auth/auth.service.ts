import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Auth } from './entities/auth.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

interface IFindAllQuery {
  email?: string;
  name?: string;
  page?: number;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private readonly authModel: Model<Auth>,
  ) {}

  private auths = [
    {
      id: 1,
      name: 'John Doe',
      email: 'jon@mail.com',
    },
  ];

  findAll(options: IFindAllQuery) {
    const query = {};

    if (options.email) {
      query['email'] = options.email;
    }

    if (options.name) {
      query['name'] = options.name;
    }

    const auths = this.authModel.find({ ...query });

    return auths;

    // if (options.email) {
    //   return {
    //     message: 'Auth retrieved successfully',
    //     data: this.auths.filter((auth) => auth.email === options.email),
    //     statusCode: 200,
    //   };
    // }

    // if (options.name) {
    //   return {
    //     message: 'Auth retrieved successfully',
    //     data: this.auths.filter((auth) => auth.name === options.name),
    //     statusCode: 200,
    //   };
    // }

    // // page

    // return {
    //   message: 'Auths retrieved successfully',
    //   data: this.auths,
    //   statusCode: 200,
    // };
  }

  create(createAuthDto: CreateAuthDto) {
    const newAuth = {
      id: Date.now(),
      name: createAuthDto.name,
      email: createAuthDto.email,
    };

    const auth = new this.authModel(newAuth);

    auth.save();

    return {
      message: 'Auth created successfully',
      data: {
        auth,
      },
      statusCode: 201,
    };
  }

  findOne(id: number) {
    const auth = this.auths.find((auth) => auth.id === id);

    if (!auth) {
      throw new NotFoundException();
    }

    return {
      message: 'Auth retrieved successfully',
      data: auth,
      statusCode: 200,
    };
  }

  remove(id: number) {
    this.auths = this.auths.filter((auth) => auth.id !== id);
    return {
      message: `Auth with id ${id} deleted successfully`,
      statusCode: 200,
    }
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {

    this.auths = this.auths.map((auth) => {
      if (auth.id === id) {
        return {
          ...auth,
          ...updateAuthDto,
        };
      }
      return auth;
    });

    return {
      message: `Auth with id ${id} updated successfully`,
      data: this.auths,
    };
  }
}
