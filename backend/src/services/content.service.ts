import { Vehicle } from '@prisma/client';

export interface PlatformContent {
  platform: string;
  content: string;
  has360Media: boolean;
}

export const generateContentForVehicle = (vehicle: Vehicle): PlatformContent[] => {
  const has360Media = detect360Media(vehicle.images);
  const contents: PlatformContent[] = [];

  // Generate Facebook content
  contents.push({
    platform: 'facebook',
    content: generateFacebookContent(vehicle, has360Media),
    has360Media
  });

  // Generate Instagram content
  contents.push({
    platform: 'instagram',
    content: generateInstagramContent(vehicle, has360Media),
    has360Media
  });

  // Generate X (Twitter) content
  contents.push({
    platform: 'x',
    content: generateXContent(vehicle, has360Media),
    has360Media
  });

  // Generate YouTube content
  contents.push({
    platform: 'youtube',
    content: generateYouTubeContent(vehicle, has360Media),
    has360Media
  });

  return contents;
};

const detect360Media = (imageUrls: string[]): boolean => {
  const keywords = ['360', 'pano', 'panorama', 'vr'];
  return imageUrls.some(url => 
    keywords.some(keyword => url.toLowerCase().includes(keyword))
  );
};

const generateFacebookContent = (vehicle: Vehicle, has360Media: boolean): string => {
  let content = `🚗 *${vehicle.year} ${vehicle.make} ${vehicle.model}* 🚗\n\n`;
  content += `💰 *Price: $${vehicle.price.toLocaleString()}*\n`;
  content += `📏 Mileage: ${vehicle.mileage.toLocaleString()} miles\n\n`;
  
  if (vehicle.features.length > 0) {
    content += `✨ *Features:*\n${vehicle.features.slice(0, 5).map(f => `• ${f}`).join('\n')}\n\n`;
  }

  if (has360Media) {
    content += `🔄 *Take a spin inside with our 360° interior view!*\n\n`;
  }

  content += `📞 Call or visit us today to schedule a test drive!\n`;
  content += `#${vehicle.make} #${vehicle.model} #UsedCars #CarDealership`;
  
  return content;
};

const generateInstagramContent = (vehicle: Vehicle, has360Media: boolean): string => {
  let content = `🚘 ${vehicle.year} ${vehicle.make} ${vehicle.model} • $${vehicle.price.toLocaleString()}\n\n`;
  
  if (vehicle.features.length > 0) {
    content += `✨ ${vehicle.features.slice(0, 3).join(' • ')}\n\n`;
  }

  if (has360Media) {
    content += `👀 See every angle with our immersive 360° tour! Swipe up for more details.\n\n`;
  }

  content += `📍 Visit us today!\n`;
  content += `#${vehicle.make} #${vehicle.model.replace(/\s+/g, '')} #CarForSale #UsedCars #${vehicle.make}${vehicle.year}`;
  
  return content;
};

const generateXContent = (vehicle: Vehicle, has360Media: boolean): string => {
  let content = `🚗 ${vehicle.year} ${vehicle.make} ${vehicle.model} - $${vehicle.price.toLocaleString()}\n`;
  
  if (has360Media) {
    content += `🔄 Experience it in 360°!\n`;
  }
  
  content += `📍 Available now!`;
  
  return content;
};

const generateYouTubeContent = (vehicle: Vehicle, has360Media: boolean): string => {
  let script = `Title: ${vehicle.year} ${vehicle.make} ${vehicle.model} - Walkaround & Features\n\n`;
  
  script += `[Opening shot of the vehicle exterior]\n`;
  script += `Host: "Welcome back to our showroom! Today we're taking a look at this beautiful ${vehicle.year} ${vehicle.make} ${vehicle.model}. "\n\n`;
  
  script += `[Show exterior features]\n`;
  script += `Host: "Notice the sleek lines and ${vehicle.color} finish that make this ${vehicle.make} stand out from the crowd."\n\n`;
  
  if (has360Media) {
    script += `[Show 360° interior view]\n`;
    script += `Host: "Step inside and experience the cabin like never before with our interactive 360° view."\n\n`;
  } else {
    script += `[Show interior features]\n`;
    script += `Host: "The interior is just as impressive with features like ${vehicle.features[0] || 'premium materials'} and ${vehicle.features[1] || 'modern technology'}."\n\n`;
  }
  
  script += `[Closing shot]\n`;
  script += `Host: "Priced at just $${vehicle.price.toLocaleString()}, this ${vehicle.make} ${vehicle.model} won't last long. Contact us today to schedule your test drive!"`;
  
  return script;
};
