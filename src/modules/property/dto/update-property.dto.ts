import { CreatePropertyDto } from './create-property.dto';

export type UpdatePropertyDto = Partial<CreatePropertyDto> 
// & {
//     likedBy?: string[]; 
//     savedBy?: string[]
//   };