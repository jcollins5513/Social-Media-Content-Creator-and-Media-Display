import { Request, Response } from 'express';
import { prisma } from '..';
import { generateContentForVehicle } from '../services/content.service';

export const generateVehicleContent = async (req: Request, res: Response) => {
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

    const contents = generateContentForVehicle(vehicle);

    res.status(200).json({
      status: 'success',
      data: {
        contents,
      },
    });
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to generate content',
    });
  }
};

export const generateEmailContent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { emailType, customMessage } = req.body;

    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
    });

    if (!vehicle) {
      return res.status(404).json({
        status: 'fail',
        message: 'No vehicle found with that ID',
      });
    }

    const emailContent = generateEmailForVehicle(vehicle, emailType, customMessage);

    res.status(200).json({
      status: 'success',
      data: {
        email: emailContent,
      },
    });
  } catch (error) {
    console.error('Error generating email content:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to generate email content',
    });
  }
};

const generateEmailForVehicle = (
  vehicle: any,
  emailType: string = 'general',
  customMessage: string = ''
): string => {
  let subject = '';
  let body = '';
  const has360Media = vehicle.images.some((img: string) => 
    ['360', 'pano', 'panorama', 'vr'].some(keyword => 
      img.toLowerCase().includes(keyword)
    )
  );

  switch (emailType.toLowerCase()) {
    case 'manager-special':
      subject = `🔥 Manager's Special: ${vehicle.year} ${vehicle.make} ${vehicle.model} - Only $${vehicle.price.toLocaleString()}`;
      body = `Hello,\n\n`;
      body += `We're offering a special deal on this ${vehicle.year} ${vehicle.make} ${vehicle.model} for a limited time only!\n\n`;
      body += `📌 *Vehicle Details:*\n`;
      body += `• ${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim || ''}\n`;
      body += `• Only $${vehicle.price.toLocaleString()}\n`;
      body += `• ${vehicle.mileage.toLocaleString()} miles\n\n`;
      
      if (has360Media) {
        body += `🌟 *Special Feature:* Experience this vehicle like never before with our interactive 360° tour!\n\n`;
      }
      
      body += `💡 *Why You'll Love It:*\n`;
      body += `${vehicle.features.slice(0, 3).map((f: string) => `✓ ${f}`).join('\n')}\n\n`;
      body += `⏳ *This deal won't last long!* Contact us today to schedule your test drive.\n\n`;
      body += `Best regards,\nYour Dealership Team`;
      break;

    case 'holiday-sale':
      const holidayMap: {[key: string]: string} = {
        'christmas': 'Christmas',
        'new year': 'New Year',
        'labor day': 'Labor Day',
        'july 4th': '4th of July',
        'thanksgiving': 'Thanksgiving'
      };
      
      const holiday = holidayMap[emailType.toLowerCase()] || 'Holiday';
      subject = `🎄 ${holiday} Special: ${vehicle.year} ${vehicle.make} ${vehicle.model} - Limited Time Offer!`;
      
      body = `Happy ${holiday}!\n\n`;
      body += `As a special ${holiday} treat, we're offering exclusive savings on this beautiful ${vehicle.year} ${vehicle.make} ${vehicle.model}.\n\n`;
      body += `🚗 *Vehicle Highlights:*\n`;
      body += `• ${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim || ''}\n`;
      body += `• Priced at only $${vehicle.price.toLocaleString()}\n`;
      body += `• ${vehicle.mileage.toLocaleString()} miles\n\n`;
      
      if (has360Media) {
        body += `🔄 Take a virtual tour from the comfort of your home with our 360° interior view!\n\n`;
      }
      
      body += `🎁 *${holiday} Special Features:*\n`;
      body += `${vehicle.features.slice(0, 4).map((f: string) => `• ${f}`).join('\n')}\n\n`;
      body += `📅 This special ${holiday} offer is only available for a limited time. Don't miss out!\n\n`;
      body += `Warm ${holiday} wishes,\nYour Dealership Team`;
      break;

    case 'inventory-update':
      subject = `🚗 New Arrival: ${vehicle.year} ${vehicle.make} ${vehicle.model} - Just Arrived!`;
      body = `Hello,\n\n`;
      body += `We're excited to announce that this ${vehicle.year} ${vehicle.make} ${vehicle.model} has just arrived at our dealership!\n\n`;
      body += `📋 *Vehicle Overview:*\n`;
      body += `• ${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim || ''}\n`;
      body += `• Priced at $${vehicle.price.toLocaleString()}\n`;
      body += `• Only ${vehicle.mileage.toLocaleString()} miles\n\n`;
      
      if (has360Media) {
        body += `🔍 Get up close with our interactive 360° tour - see every angle before you visit!\n\n`;
      }
      
      body += `💎 *Notable Features:*\n`;
      body += `${vehicle.features.slice(0, 5).map((f: string) => `• ${f}`).join('\n')}\n\n`;
      body += `📞 Contact us today to schedule a test drive - these vehicles are selling fast!\n\n`;
      body += `Best regards,\nYour Dealership Team`;
      break;

    default:
      subject = `${vehicle.year} ${vehicle.make} ${vehicle.model} - Available Now!`;
      body = `Hello,\n\n`;
      body += `Thank you for your interest in our ${vehicle.year} ${vehicle.make} ${vehicle.model}. Here are the details you requested:\n\n`;
      body += `🚘 *Vehicle Information:*\n`;
      body += `• ${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim || ''}\n`;
      body += `• Price: $${vehicle.price.toLocaleString()}\n`;
      body += `• Mileage: ${vehicle.mileage.toLocaleString()} miles\n`;
      body += `• Color: ${vehicle.color}\n\n`;
      
      if (has360Media) {
        body += `👀 Don't forget to check out our interactive 360° tour to see every angle of this vehicle!\n\n`;
      }
      
      body += `🔧 *Key Features:*\n`;
      body += `${vehicle.features.slice(0, 5).map((f: string) => `• ${f}`).join('\n')}\n\n`;
      body += `${customMessage ? customMessage + '\n\n' : ''}`;
      body += `Please let us know if you'd like to schedule a test drive or if you have any questions. We're here to help!\n\n`;
      body += `Best regards,\nYour Dealership Team`;
  }

  return JSON.stringify({
    subject,
    body,
    has360Media,
    vehicleDetails: {
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      price: vehicle.price,
      mileage: vehicle.mileage,
      color: vehicle.color,
      trim: vehicle.trim,
      features: vehicle.features,
      images: vehicle.images
    }
  }, null, 2);
};
