// agencyUser.dto.ts

export interface CreateAgencyUserDto {
    userId: string;
    agencyId: string;
    role: 'admin' | 'agent';
    permissions: {
      canCreateProperty: boolean;
      canUpdateProperty: boolean;
      canDeleteProperty: boolean;
    };
  }
  
  export interface UpdateAgencyUserDto {
    role?: 'admin' | 'agent';
    permissions?: {
      canCreateProperty?: boolean;
      canUpdateProperty?: boolean;
      canDeleteProperty?: boolean;
    };
    status?: 'active' | 'inactive' | 'pending';
  }
  