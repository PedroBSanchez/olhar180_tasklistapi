import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  BadRequestException,
  ValidationPipe,
  UsePipes,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('users')
@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(@Req() req: any) {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param() param: any) {
    const id: number = param.id;

    if (!id) {
      throw new BadRequestException('user [id] is required in request params');
    }

    return await this.usersService.findById(id);
  }

  @UsePipes(ValidationPipe)
  @Post()
  async store(@Body() body: CreateUserDto) {
    return await this.usersService.store(body);
  }
}
