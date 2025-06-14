import { Vehicle } from '@prisma/client'; // Assuming Vehicle type is available

// Interface for the structured content output
export interface GeneratedContent {
  facebook: string;
  instagram: string;
  x: string; // Twitter
  youtubeScript: string;
  email: {
    subject: string;
    preheader: string;
    body: string; // Can be HTML or plain text
  };
  has360Media: boolean;
}

// Utility function to detect 360° images by filename
export const is360Image = (filename: string): boolean => {
  if (!filename) return false;
  const lowerFilename = filename.toLowerCase();
  const patterns = ['360', 'pano', 'sphere', 'panorama']; // Add more patterns if needed
  return patterns.some(pattern => lowerFilename.includes(pattern));
};

// --- Placeholder functions for each platform ---
const generateFacebookPost = (vehicle: Vehicle, has360: boolean): string => {
  let post = `🎉 JUST ARRIVED! 🎉 Feast your eyes on this incredible ${vehicle.year} ${vehicle.make} ${vehicle.model}${vehicle.color ? ` in a stunning ${vehicle.color}` : ''}!\n\n`;
  post += `💲 Priced to sell at $${vehicle.price.toLocaleString()}`;
  if (vehicle.mileage) {
    post += ` with an impressively low ${vehicle.mileage.toLocaleString()} miles!`;
  }
  post += `\n\n`;

  const featuresList = vehicle.features || [];
  if (featuresList.length > 0) {
    post += `🌟 Key Features Include: 🌟\n`;
    // List a few prominent features
    featuresList.slice(0, 3).forEach(feature => post += `  - ${feature}\n`);
    if (featuresList.length > 3) {
      post += `  - And so much more!\n`;
    }
  } else {
    post += `This beauty is packed with amazing features you'll love!\n`;
  }
  post += `\n`;

  if (vehicle.description) {
    // Use a snippet of the description or a summarized version
    const snippet = vehicle.description.length > 150 ? vehicle.description.substring(0, 147) + "..." : vehicle.description;
    post += `📝 From the owner: "${snippet}"\n\n`;
  }

  if (has360) {
    post += `🔄 Don't just take our word for it – experience it yourself with our full 360° VIRTUAL TOUR! Click here: [LinkTo360View]\n\n`;
  }

  post += `Ready for a test drive? 🚗💨\n`;
  post += `📞 Call us at [YourPhoneNumber] or 💬 DM us for more info!\n`;
  post += `📍 Visit us at [YourDealershipAddress]\n\n`;
  
  // Dynamic Hashtags
  let hashtags = `#${vehicle.make} #${vehicle.model} #${vehicle.year} #LuxuryCar #UsedCarsForSale #CarDealership #[YourCity]Cars`;
  if (featuresList.some(f => f.toLowerCase().includes("sunroof") || f.toLowerCase().includes("moonroof"))) {
      hashtags += " #Sunroof";
  }
  if (vehicle.engine?.toLowerCase().includes("v8")) {
      hashtags += " #V8Power";
  }
  if (vehicle.engine?.toLowerCase().includes("turbo")) {
      hashtags += " #Turbocharged";
  }
  if (featuresList.some(f => f.toLowerCase().includes("awd") || f.toLowerCase().includes("all-wheel drive"))) {
      hashtags += " #AWD";
  }
  if (featuresList.some(f => f.toLowerCase().includes("leather"))) {
      hashtags += " #LeatherSeats";
  }
  post += hashtags;

  // TODO: Add more sophisticated AI-powered generation logic and dynamic hashtag generation
  return post;
};

const generateInstagramCaption = (vehicle: Vehicle, has360: boolean): string => {
  let caption = `✨ ${vehicle.year} ${vehicle.make} ${vehicle.model} ✨\n`;
  caption += `Your next adventure awaits! ${vehicle.color ? `Stunning in ${vehicle.color}. ` : ''}\n\n`;

  caption += `💰 Price: $${vehicle.price.toLocaleString()}`;
  if (vehicle.mileage) {
    caption += ` | Mileage: ${vehicle.mileage.toLocaleString()} miles\n`;
  } else {
    caption += `\n`;
  }

  const featuresList = vehicle.features || [];
  if (featuresList.length > 0) {
    // Highlight one or two key features concisely
    caption += `Key highlights: ${featuresList.slice(0, 2).join(' & ')}!\n`;
  }

  if (has360) {
    caption += `🔄 Full 360° interactive view available! Check the link in our bio! 👆\n`;
  }
  caption += `\nDM us to schedule your test drive or for more info! 📲\n\n`;

  // Hashtags - Instagram can handle more, and they are crucial for discovery
  let instaHashtags = `#${vehicle.make} #${vehicle.model} #${vehicle.year} #CarsOfInstagram #LuxuryLifestyle #[YourCity]Cars`;
  if (vehicle.color) {
    instaHashtags += ` #${vehicle.color.replace(/\s+/g, '')}Car`; // e.g. #SilverCar
  }
  // Add a few feature-based hashtags, keeping them short and relevant
  featuresList.slice(0, 4).forEach(feature => {
      const simpleFeature = feature.toLowerCase().replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '');
      if (simpleFeature.length > 2 && simpleFeature.length < 20) { // Basic validation for hashtag length
          instaHashtags += ` #${simpleFeature}`;
      }
  });
  if (has360) {
      instaHashtags += " #360View #VirtualTour #ImmersiveExperience";
  }
  instaHashtags += " #InstaAuto #CarGram #ForSale #DreamRide #CarShopping";
  caption += instaHashtags;

  // TODO: Add more sophisticated AI-powered generation logic, potentially varying CTA or feature highlights
  return caption;
};

const generateXPost = (vehicle: Vehicle, has360: boolean): string => {
  // Max length for X posts is 280 chars. We need to be mindful of this.
  let post = `🔥 Hot Deal! 🔥 ${vehicle.year} ${vehicle.make} ${vehicle.model}`;
  if (vehicle.color) {
    post += ` (${vehicle.color})`;
  }
  post += ` - $${vehicle.price.toLocaleString()}`;
  if (vehicle.mileage) {
    post += ` | ${vehicle.mileage.toLocaleString()} mi`;
  }
  post += ". ";

  const featuresList = vehicle.features || [];
  let prominentFeature = "";
  if (featuresList.length > 0) {
    const commonFeatures = ["sunroof", "panoramic", "leather", "awd", "turbo", "navigation", "hybrid"];
    for (const feat of featuresList) {
      if (commonFeatures.some(cf => feat.toLowerCase().includes(cf))) {
        prominentFeature = `Incl. ${feat}! `;
        break;
      }
    }
    if (!prominentFeature && featuresList[0].length < 25) { // Fallback to first feature if short
        prominentFeature = `Feat: ${featuresList[0]}. `;
    }
  }
  post += prominentFeature;

  if (has360) {
    post += "🔄 360° Tour Avail! ";
  }

  post += "Don't miss out! 👉 [LinkToVehiclePage]"; // Placeholder for link

  let xHashtags = ` #${vehicle.make} #${vehicle.model}`;
  if (vehicle.price < 20000) {
    xHashtags += " #AffordableLuxury";
  } else {
    xHashtags += " #DreamCar";
  }
  xHashtags += " #CarSales";

  const finalPost = post + xHashtags;
  // A proper URL shortener would give a predictable length, we'll just assume it fits for now.
  // This is a placeholder for a more robust length check.
  if (finalPost.length > 280) {
      // Naive truncation if it's too long
      return finalPost.substring(0, 277) + "...";
  }

  // TODO: Add more sophisticated AI-powered generation logic, better length management, and URL shortener integration.
  return finalPost;
};

const generateYouTubeShortsScript = (vehicle: Vehicle, has360: boolean): string => {
  const features = vehicle.features || [];
  const keyFeature1 = features.length > 0 ? features[0] : "amazing features";
  const keyFeature2 = features.length > 1 ? features[1] : "a smooth ride";

  let script = `
**YouTube Shorts Script: The ${vehicle.year} ${vehicle.make} ${vehicle.model} Experience**

**Hook (0-3 seconds):**
*   **(Scene):** Extreme close-up of the vehicle's badge or a striking headlight, then a rapid pull-back to reveal the full car. Upbeat, trendy music starts.
*   **(Text Overlay):** STOP SCROLLING! You NEED to see this.
*   **(Voiceover - Energetic):** "Tired of boring rides? Your upgrade is HERE."

**Scene 1: Exterior Showcase (3-6 seconds):**
*   **(Scene):** A series of quick, dynamic shots of the exterior. A low-angle shot from the front, a smooth pan across the side profile, a close-up of the wheels.
*   **(Text Overlay):** ${vehicle.year} ${vehicle.make} ${vehicle.model}
*   **(Voiceover):** "This is the ${vehicle.year} ${vehicle.make} ${vehicle.model}${vehicle.color ? ` in stunning ${vehicle.color}` : ''}."

**Scene 2: Key Feature Highlight (6-9 seconds):**
*   **(Scene):** Snap to a shot of the interior, focusing on the infotainment screen or a luxury feature like a sunroof or leather seats.
*   **(Text Overlay):** Featuring: ${keyFeature1}!
*   **(Voiceover):** "Packed with features like ${keyFeature1} and ${keyFeature2}!"

**Scene 3: 360° Interactive View (If applicable, 9-12 seconds):**
`;

  if (has360) {
    script += `
*   **(Scene):** A simulated "swipe" effect transitions to the 360° interior view, spinning slowly.
*   **(Text Overlay):** 🔄 Full 360° Tour!
*   **(Voiceover):** "And get this... we have a full 360-degree interactive tour. See EVERY angle online!"
`;
  } else {
    script += `
*   **(Scene):** Another cool interior or exterior shot. Maybe a shot of the spacious trunk or back seats.
*   **(Text Overlay):** Comfort & Style!
*   **(Voiceover):** "Experience true comfort and style."
`;
  }

  script += `
**Scene 4: The Offer (12-14 seconds):**
*   **(Scene):** A clean, final shot of the car.
*   **(Text Overlay):** Price: $${vehicle.price.toLocaleString()} | Mileage: ${vehicle.mileage ? vehicle.mileage.toLocaleString() : 'N/A'}
*   **(Voiceover):** "And it can be yours for just $${vehicle.price.toLocaleString()}."

**Call to Action (14-15 seconds):**
*   **(Scene):** End card with dealership logo and contact info.
*   **(Text Overlay):** LINK IN DESCRIPTION! 🔗
*   **(Voiceover):** "Don't wait! Click the link in the description to learn more and book your test drive!"
`;

  return script.trim();
};

export type EmailScenario = 'new-arrival' | 'manager-special' | 'price-drop' | 'generic';

const generateEmailContent = (
  vehicle: Vehicle,
  has360: boolean,
  scenario: EmailScenario = 'generic'
): { subject: string; preheader: string; body: string } => {
  let subject = '';
  let preheader = '';
  let headline = '';
  let ctaText = '';

  switch (scenario) {
    case 'new-arrival':
      subject = `Just Arrived: The ${vehicle.year} ${vehicle.make} ${vehicle.model} You've Been Waiting For!`;
      preheader = `Be the first to test drive this stunning ${vehicle.make}. See photos & details.`;
      headline = `Fresh on the Lot: A Stunning ${vehicle.year} ${vehicle.make} ${vehicle.model}!`;
      ctaText = 'Be the first to experience this incredible vehicle. Schedule your exclusive test drive today!';
      break;
    case 'manager-special':
      subject = `⭐ Manager's Special: A Hand-Picked ${vehicle.year} ${vehicle.make} ${vehicle.model}!`;
      preheader = `An incredible deal on a premium ${vehicle.make}. Don't miss out!`;
      headline = `Our Manager's Pick: Unbeatable Value!`;
      ctaText = 'This hand-picked vehicle won’t last long. Claim this special offer now!';
      break;
    case 'price-drop':
      subject = `🚨 Price Drop Alert on the ${vehicle.year} ${vehicle.make} ${vehicle.model}!`;
      preheader = `The ${vehicle.make} you were looking at just got more affordable. Act fast!`;
      headline = `Price REDUCED on the ${vehicle.year} ${vehicle.make} ${vehicle.model}!`;
      ctaText = 'Your dream car is now at a dream price. This is your chance—act fast before it’s gone!';
      break;
    case 'generic':
    default:
      subject = `You'll LOVE this ${vehicle.year} ${vehicle.make} ${vehicle.model}!`;
      preheader = `Special offer on a ${vehicle.make} ${vehicle.model}. See details inside.`;
      headline = `Check Out This Amazing ${vehicle.year} ${vehicle.make} ${vehicle.model}!`;
      ctaText = 'Interested? Contact us today to learn more or to book a test drive!';
      break;
  }

  const featuresList = vehicle.features?.slice(0, 5).map(f => `<li>${f}</li>`).join('') || '<li>Many great features!</li>';

  const body = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subject}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #dddddd; }
        .header { background-color: #004a99; color: #ffffff; padding: 20px; text-align: center; }
        .header h1 { margin: 0; }
        .content { padding: 20px; }
        .vehicle-image { width: 100%; height: auto; border-radius: 4px; }
        .details { margin: 20px 0; }
        .details p { margin: 5px 0; font-size: 16px; }
        .features-list { list-style-type: none; padding: 0; }
        .features-list li { background: url('✔️') no-repeat left center; padding-left: 25px; margin-bottom: 5px; }
        .cta-button { display: inline-block; background-color: #ff7f50; color: #ffffff; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; text-align: center; }
        .footer { background-color: #333333; color: #aaaaaa; padding: 15px; text-align: center; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>[Your Dealership Name]</h1>
        </div>
        <div class="content">
            <h2>${headline}</h2>
            <img src="${vehicle.images?.[0] || 'https://via.placeholder.com/600x400'}" alt="${vehicle.make} ${vehicle.model}" class="vehicle-image">
            <div class="details">
                <p><strong>Price:</strong> <span style="color: #ff7f50; font-weight: bold;">$${vehicle.price.toLocaleString()}</span></p>
                ${vehicle.mileage ? `<p><strong>Mileage:</strong> ${vehicle.mileage.toLocaleString()}</p>` : ''}
                <p><strong>Color:</strong> ${vehicle.color || 'N/A'}</p>
            </div>
            <h3>Key Features:</h3>
            <ul class="features-list">
                ${featuresList}
            </ul>
            ${has360 ? `<p><strong><a href="[LinkTo360View]" class="cta-button" style="background-color: #007bff;">Take an Immersive 360° Tour!</a></strong></p>` : ''}
            <p>${ctaText}</p>
            <a href="[LinkToVehiclePage]" class="cta-button">View Vehicle Details & Inquire</a>
        </div>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} [Your Dealership Name] | [YourDealershipAddress]</p>
            <p><a href="[UnsubscribeLink]" style="color: #aaaaaa;">Unsubscribe</a></p>
        </div>
    </div>
</body>
</html>
  `.trim();

  return { subject, preheader, body };
};

// Main service function to generate all content
export const generateAllPlatformContent = async (
  vehicle: Vehicle,
  emailScenario: EmailScenario = 'generic'
): Promise<GeneratedContent> => {
  // Determine if the vehicle has 360 media by checking its images
  const has360Media = vehicle.images?.some(image => is360Image(image)) || false;

  // TODO: Integrate with OpenAI API for more sophisticated content generation
  // For now, using placeholder functions

  const facebook = generateFacebookPost(vehicle, has360Media);
  const instagram = generateInstagramCaption(vehicle, has360Media);
  const x = generateXPost(vehicle, has360Media);
  const youtubeScript = generateYouTubeShortsScript(vehicle, has360Media);
  const email = generateEmailContent(vehicle, has360Media, emailScenario);

  return {
    facebook,
    instagram,
    x,
    youtubeScript,
    email,
    has360Media,
  };
};
