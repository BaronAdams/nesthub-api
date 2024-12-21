import { CreatePropertyDto } from './create-property.dto';

export type UpdatePropertyDto = Omit<Partial<CreatePropertyDto>, 'agencyId'> & {
    likedBy?: string[]; 
    savedBy?: string[]
  };