export type createPropertyDto = {
    type: 'land' | 'villa' | 'banquet_hall' | 'building' | 'apartment' | 'duplex';
    status: 'for_sale' | 'for_rent';
    price: number;
    priceFrequency?: "hourly" | "daily" | "weekly" | "monthly" | "yearly" ;
    sellerId?: string;
    agentId: string;
    area: number;
    description?: string;
    rooms?:{
        bedrooms: number;
        livingRooms: number;
        kitchens: number;
        bathrooms: number
    };
}

export type updatePostDto = Omit<createPropertyDto, 'agentId'>