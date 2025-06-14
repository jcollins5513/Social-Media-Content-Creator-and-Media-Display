import { Request, Response } from 'express';
import { prisma } from '..';
import { Vehicle, VehicleStatus } from '@prisma/client';

interface VehicleResponse extends Omit<Vehicle, 'createdAt' | 'updatedAt'> {
  createdAt: string;
  updatedAt: string;
}

export const getVehicles = async (req: Request, res: Response) => {
  try {
    const vehicles = await prisma.vehicle.findMany({
      where: { status: 'available' },
      orderBy: { createdAt: 'desc' },
    });

    const formattedVehicles: VehicleResponse[] = vehicles.map(vehicle => ({
      ...vehicle,
      createdAt: vehicle.createdAt.toISOString(),
      updatedAt: vehicle.updatedAt.toISOString(),
    }));

    res.status(200).json({
      status: 'success',
      results: formattedVehicles.length,
      data: {
        vehicles: formattedVehicles,
      },
    });
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch vehicles',
    });
  }
};

export const getVehicleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
    });

    if (!vehicle) {
      return res.status(404).json({
        status: 'fail',
        message: 'No vehicle found with that ID',
      });
    }

    const formattedVehicle: VehicleResponse = {
      ...vehicle,
      createdAt: vehicle.createdAt.toISOString(),
      updatedAt: vehicle.updatedAt.toISOString(),
    };

    res.status(200).json({
      status: 'success',
      data: {
        vehicle: formattedVehicle,
      },
    });
  } catch (error) {
    console.error('Error fetching vehicle:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch vehicle',
    });
  }
};
