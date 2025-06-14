import { Request, Response } from 'express';
import { prisma } from '..';
import { Vehicle, VehicleStatus } from '@prisma/client';
import {
  generateAllPlatformContent,
  EmailScenario,
} from '../services/contentGenerator';

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

export const generateVehicleContentAndTrack = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { emailScenario }: { emailScenario?: EmailScenario } = req.body;

  try {
    // 1. Find the vehicle
    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
    });

    if (!vehicle) {
      return res.status(404).json({
        status: 'fail',
        message: 'No vehicle found with that ID',
      });
    }

    // 2. Generate content for all platforms
    const generatedContent = await generateAllPlatformContent(
      vehicle,
      emailScenario
    );

    // 3. Update post tracking information (example for Facebook)
    const updatedVehicle = await prisma.vehicle.update({
      where: { id },
      data: {
        lastFacebookPostDate: new Date(),
        // In a real app, you might get a post ID back from a social media API
        // facebookPostId: 'some_post_id_from_api_response',
      },
    });

    // 4. Send response
    res.status(200).json({
      status: 'success',
      message: 'Content generated and tracking updated.',
      data: {
        generatedContent,
        updatedVehicle: {
            ...updatedVehicle,
            createdAt: updatedVehicle.createdAt.toISOString(),
            updatedAt: updatedVehicle.updatedAt.toISOString(),
        }
      },
    });
  } catch (error) {
    console.error(`Error generating content for vehicle ${id}:`, error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to generate content or update tracking information.',
    });
  }
};
