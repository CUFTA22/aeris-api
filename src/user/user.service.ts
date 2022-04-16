import { PrismaService } from '@modules/prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // ----------------------------------------
  // Find user by any field
  // ----------------------------------------

  async findByField(field: keyof User, value: string | number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        [field]: value,
      },
    });

    return user;
  }

  // ----------------------------------------
  // Update users any field
  // ----------------------------------------

  async updateUserById(id: number, field: keyof User, value: string | number) {
    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        [field]: value,
      },
    });
  }

  // ----------------------------------------------------------------------------------
  // Utils
  // ----------------------------------------------------------------------------------

  // ----------------------------------------
  // Create new user for registration
  // ----------------------------------------

  async createUser(email: string, hash: string): Promise<User> {
    try {
      const user = await this.prisma.user.create({
        data: { email, hash },
      });

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // P2002 - unique field error
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }

      throw error;
    }
  }

  // ----------------------------------------
  // Delete hashedRt for logout
  // ----------------------------------------

  async deleteRt(id: number) {
    await this.prisma.user.updateMany({
      where: { id, hashedRt: { not: null } },
      data: { hashedRt: null },
    });
  }
}
