import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CategoryUpdateDTO } from './dto/categoryUpdate';
import { CategoryCreateDTO } from './dto/categoryCreate.dto';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('category')
@ApiBearerAuth('access-token')
export class CategoryController {
    constructor(@Inject('ASSETS_SERVICE') private readonly assetsClient: ClientProxy,) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getCategory() {
        return this.assetsClient.send({ cmd: "assets_category_getAll" }, {});
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    async getCategoryById(@Param('id') id: string) {
        return this.assetsClient.send({ cmd: "assets_category_getById" }, { id: id });
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('create')
    @Roles('admin', 'manager')
    async createCategory(@Body(ValidationPipe) CategoryCreateDTO: CategoryCreateDTO ) {
        return this.assetsClient.send({cmd: "assets_category_create"}, CategoryCreateDTO)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch('update')
    @Roles('admin', 'manager')
    async updateCategory(@Body(ValidationPipe) CategoryUpdateDTO: CategoryUpdateDTO) {
        return this.assetsClient.send({cmd: "assets_category_update"}, CategoryUpdateDTO)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('delete:id')
    @Roles('admin', 'manager')
    async deleteCategory(@Param('id') id: string) {
        return this.assetsClient.send({cmd: "assets_category_delete"}, {id: id})
    }
}
