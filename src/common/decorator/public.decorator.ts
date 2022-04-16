import { SetMetadata } from '@nestjs/common';

// Make route public
export const Public = () => SetMetadata('isPublic', true);
