/**
 * Vehicle status string literals matching the backend Prisma schema
 */
export type VehicleStatus = 'available' | 'pending' | 'sold';

/**
 * Vehicle status constants for easy reference
 */
export const VehicleStatusValues = {
  AVAILABLE: 'available' as const,
  PENDING: 'pending' as const,
  SOLD: 'sold' as const
}

/**
 * Vehicle interface matching the backend model
 */
export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  trim?: string;
  price?: number;
  mileage?: number;
  status: VehicleStatus;
  vin?: string;
  color?: string;
  features: string[];
  description?: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  lastFacebookPostDate?: string | null;
  lastMarketplacePostDate?: string | null;
  facebookPostId?: string | null;
}

/**
 * Content by platform interface
 */
export interface VehicleContent {
  [platform: string]: string;
}
