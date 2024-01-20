import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, ValidationPipe, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthGuard } from './auth.guard';

// GET http://localhost:3001/auth?email=jon@name=name&page=10
// POST http://localhost:3001/auth
// GET http://localhost:3001/auth/:id
// PATCH http://localhost:3001/auth/:id
// DELETE http://localhost:3001/auth/:id

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // GET /auths
  @Get()
  // @UseGuards(AuthGuard)
  findAll(
    @Query('email') email: string,
    @Query('name') name: string,
    @Query('page') page: number,
  ) {
    return this.authService.findAll({ email, name, page });
  }

  // GET /auths/:id/roles/:roleId
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.authService.findOne(id);
  }

  // POST /auths
  @Post()
  create(@Body(new ValidationPipe()) createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  // PATCH /auths/:id
  @Patch(':id')
  protected update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }


  // DELETE /auths/:id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
