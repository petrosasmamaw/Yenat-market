import fs from 'fs';
import path from 'path';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
  ShadingType,
  Header,
  Footer,
  PageNumber,
} from 'docx';

// Elegant styling colors
const BRAND_PRIMARY = '8B261E';   // Warm Ethiopian Crimson / Burgundy
const BRAND_DARK = '1F2421';      // Charcoal Dark
const BRAND_GOLD = 'B87310';      // Soft Amber / Gold
const BG_LIGHT = 'F9F8F6';        // Off-white / Cream
const BORDER_COLOR = 'D6D1CA';

function createHeader() {
  return new Paragraph({
    alignment: AlignmentType.RIGHT,
    children: [
      new TextRun({
        text: 'Yenat Market — Website Information Questionnaire',
        size: 16,
        color: '888888',
      }),
    ],
  });
}

function createFooter() {
  return new Paragraph({
    alignment: AlignmentType.SPACE_BETWEEN,
    children: [
      new TextRun({
        text: 'Website Content Onboarding Form',
        size: 16,
        color: '888888',
      }),
      new TextRun({
        text: '   |   Page ',
        size: 16,
        color: '888888',
      }),
      new TextRun({
        children: [PageNumber.CURRENT],
        size: 16,
        color: '888888',
      }),
      new TextRun({
        text: ' of ',
        size: 16,
        color: '888888',
      }),
      new TextRun({
        children: [PageNumber.TOTAL_PAGES],
        size: 16,
        color: '888888',
      }),
    ],
  });
}

function sectionTitle(number, title) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 260, after: 100 },
    children: [
      new TextRun({
        text: `${number}. ${title}`,
        bold: true,
        size: 24,
        color: BRAND_PRIMARY,
        font: 'Segoe UI',
      }),
    ],
  });
}

function subtitle(text) {
  return new Paragraph({
    spacing: { before: 40, after: 100 },
    children: [
      new TextRun({
        text: text,
        italics: true,
        size: 18,
        color: '666666',
        font: 'Segoe UI',
      }),
    ],
  });
}

function fieldPrompt(label, placeholder = '____________________________________________________________________') {
  return new Paragraph({
    spacing: { before: 70, after: 70 },
    children: [
      new TextRun({
        text: label + ' ',
        bold: true,
        size: 19,
        color: BRAND_DARK,
        font: 'Segoe UI',
      }),
      new TextRun({
        text: placeholder,
        size: 18,
        color: '999999',
        font: 'Segoe UI',
      }),
    ],
  });
}

function checkOption(label) {
  return new Paragraph({
    spacing: { before: 50, after: 50 },
    children: [
      new TextRun({
        text: '[   ]  ',
        bold: true,
        size: 20,
        color: BRAND_PRIMARY,
        font: 'Segoe UI',
      }),
      new TextRun({
        text: label,
        size: 19,
        color: BRAND_DARK,
        font: 'Segoe UI',
      }),
    ],
  });
}

function multiLineArea(prompt, lines = 2) {
  const paras = [
    new Paragraph({
      spacing: { before: 80, after: 40 },
      children: [
        new TextRun({
          text: prompt,
          bold: true,
          size: 19,
          color: BRAND_DARK,
          font: 'Segoe UI',
        }),
      ],
    }),
  ];
  for (let i = 0; i < lines; i++) {
    paras.push(
      new Paragraph({
        spacing: { before: 30, after: 30 },
        children: [
          new TextRun({
            text: '______________________________________________________________________________________________',
            size: 18,
            color: 'CCCCCC',
            font: 'Segoe UI',
          }),
        ],
      })
    );
  }
  return paras;
}

function calloutCard(title, bulletPoints, isHighlight = false) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 6, color: isHighlight ? BRAND_PRIMARY : BORDER_COLOR },
      bottom: { style: BorderStyle.SINGLE, size: 6, color: isHighlight ? BRAND_PRIMARY : BORDER_COLOR },
      left: { style: BorderStyle.SINGLE, size: 24, color: isHighlight ? BRAND_PRIMARY : BRAND_GOLD },
      right: { style: BorderStyle.SINGLE, size: 6, color: isHighlight ? BRAND_PRIMARY : BORDER_COLOR },
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            shading: { fill: isHighlight ? 'FFF8F6' : BG_LIGHT, type: ShadingType.CLEAR },
            margins: { top: 140, bottom: 140, left: 160, right: 160 },
            children: [
              new Paragraph({
                spacing: { after: 60 },
                children: [
                  new TextRun({
                    text: title,
                    bold: true,
                    size: 21,
                    color: isHighlight ? BRAND_PRIMARY : BRAND_GOLD,
                    font: 'Segoe UI',
                  }),
                ],
              }),
              ...bulletPoints.map(
                (point) =>
                  new Paragraph({
                    spacing: { after: 40 },
                    children: [
                      new TextRun({
                        text: point,
                        size: 18,
                        color: BRAND_DARK,
                        font: 'Segoe UI',
                      }),
                    ],
                  })
              ),
            ],
          }),
        ],
      }),
    ],
  });
}

function makeSimpleHoursTable() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const headerRow = new TableRow({
    children: [
      new TableCell({
        width: { size: 30, type: WidthType.PERCENTAGE },
        shading: { fill: BRAND_PRIMARY, type: ShadingType.CLEAR },
        margins: { top: 80, bottom: 80, left: 100, right: 100 },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: 'Day', bold: true, color: 'FFFFFF', size: 18, font: 'Segoe UI' })],
          }),
        ],
      }),
      new TableCell({
        width: { size: 70, type: WidthType.PERCENTAGE },
        shading: { fill: BRAND_PRIMARY, type: ShadingType.CLEAR },
        margins: { top: 80, bottom: 80, left: 100, right: 100 },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: 'Operating Hours (e.g., 9:00 AM – 9:00 PM)', bold: true, color: 'FFFFFF', size: 18, font: 'Segoe UI' })],
          }),
        ],
      }),
    ],
  });

  const bodyRows = days.map((day, idx) => {
    const bg = idx % 2 === 0 ? 'FFFFFF' : 'F9F8F6';
    return new TableRow({
      children: [
        new TableCell({
          shading: { fill: bg, type: ShadingType.CLEAR },
          margins: { top: 70, bottom: 70, left: 100, right: 100 },
          children: [new Paragraph({ children: [new TextRun({ text: day, bold: true, size: 18, color: BRAND_DARK, font: 'Segoe UI' })] })],
        }),
        new TableCell({
          shading: { fill: bg, type: ShadingType.CLEAR },
          margins: { top: 70, bottom: 70, left: 100, right: 100 },
          children: [new Paragraph({ children: [new TextRun({ text: '[          ] AM   to   [          ] PM', size: 18, color: '555555', font: 'Segoe UI' })] })],
        }),
      ],
    });
  });

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: BORDER_COLOR },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: BORDER_COLOR },
      left: { style: BorderStyle.SINGLE, size: 4, color: BORDER_COLOR },
      right: { style: BorderStyle.SINGLE, size: 4, color: BORDER_COLOR },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 2, color: BORDER_COLOR },
      insideVertical: { style: BorderStyle.SINGLE, size: 2, color: BORDER_COLOR },
    },
    rows: [headerRow, ...bodyRows],
  });
}

async function generateSimplifiedQuestionnaire() {
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: 'Segoe UI',
            size: 19,
            color: BRAND_DARK,
          },
        },
      },
    },
    sections: [
      {
        headers: { default: new Header({ children: [createHeader()] }) },
        footers: { default: new Footer({ children: [createFooter()] }) },
        properties: {
          page: {
            margin: {
              top: 1000,
              bottom: 1000,
              left: 1100,
              right: 1100,
            },
          },
        },
        children: [
          // Document Header
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 80, after: 40 },
            children: [
              new TextRun({
                text: 'YENAT MARKET',
                bold: true,
                size: 34,
                color: BRAND_PRIMARY,
                font: 'Segoe UI',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 120 },
            children: [
              new TextRun({
                text: 'Official Website Content & Setup Questionnaire',
                bold: true,
                size: 21,
                color: BRAND_GOLD,
                font: 'Segoe UI',
              }),
            ],
          }),

          calloutCard(
            'Quick Instructions for Store Owner / Manager',
            [
              '• We have prepared a live interactive demo for Yenat Market.',
              '• Please take 5 to 10 minutes to fill out the essential details below so we can replace placeholder information with your actual store products, real prices, hours, and contact info.',
              '• You can type your answers directly in this document or print it and fill it out by hand.',
              '• At the end of this form, please note the checklist to send your store photos via WhatsApp.',
            ]
          ),

          new Paragraph({ spacing: { after: 160 } }),

          // SECTION 1
          sectionTitle('1', 'Store Identity & Contact Details'),
          subtitle('How your store should appear to customers on Google and on the website.'),

          fieldPrompt('Store Name:'),
          fieldPrompt('Tagline / Slogan (e.g., Authentic Ethiopian Grocery & Spices):'),
          fieldPrompt('Full Street Address:'),
          fieldPrompt('Nearby Landmark or Cross Streets (helps customers find you):'),
          fieldPrompt('Primary Phone Number for Customers:'),
          fieldPrompt('WhatsApp Phone Number (for customer questions & orders):'),
          fieldPrompt('Store Email Address:'),
          fieldPrompt('Website Domain (e.g., yenatmarket.com — or leave blank if needed):'),
          fieldPrompt('Social Media (Instagram / Facebook / TikTok / Google Maps link):'),

          new Paragraph({ spacing: { after: 160 } }),

          // SECTION 2
          sectionTitle('2', 'Opening Hours'),
          subtitle('Fill in your typical opening and closing times:'),

          makeSimpleHoursTable(),

          new Paragraph({ spacing: { before: 80 } }),
          ...multiLineArea('Holiday Hours / Notes (e.g., Open regular hours on all holidays, or closed on specific days):', 1),

          new Paragraph({ spacing: { after: 160 } }),

          // SECTION 3
          sectionTitle('3', 'Payment Methods Accepted'),
          subtitle('Check all options that customers can use at checkout:'),

          checkOption('Cash'),
          checkOption('Credit & Debit Cards (Visa, MasterCard, American Express, Discover)'),
          checkOption('EBT / SNAP (Food Stamps)'),
          checkOption('Apple Pay & Google Pay (Tap to Pay)'),
          checkOption('Zelle (Phone or Email: _____________________________________)'),
          checkOption('CashApp / Venmo ($Username: _____________________________________)'),
          checkOption('Checks / Invoicing (for restaurant wholesale accounts)'),

          new Paragraph({ spacing: { after: 160 } }),

          // SECTION 4
          sectionTitle('4', 'Main Products & Offerings'),
          subtitle('What are the main products you sell? Please check and add any notes or prices:'),

          new Paragraph({
            spacing: { before: 60, after: 40 },
            children: [
              new TextRun({
                text: 'A. Fresh Injera & Bakery',
                bold: true,
                size: 20,
                color: BRAND_PRIMARY,
                font: 'Segoe UI',
              }),
            ],
          }),
          checkOption('100% Pure Teff Injera (Gluten-Free) — Price per pack: $_______'),
          checkOption('Traditional Mixed Teff Injera — Price per pack: $_______'),
          checkOption('Fresh Ambasha / Specialty Bread — Price per loaf: $_______'),
          fieldPrompt('What times of day does fresh hot injera come out? (e.g., 8:00 AM & 2:00 PM):'),

          new Paragraph({
            spacing: { before: 80, after: 40 },
            children: [
              new TextRun({
                text: 'B. Authentic Spices & Blends',
                bold: true,
                size: 20,
                color: BRAND_PRIMARY,
                font: 'Segoe UI',
              }),
            ],
          }),
          checkOption('Stone-Ground Berbere (Available sizes: [ ] 8oz  [ ] 1lb  [ ] Bulk sacks)'),
          checkOption('Mitmita (Hot chili blend)'),
          checkOption('Shiro Powder (Chickpea stew flour)'),
          checkOption('Korarima / False Cardamom (Pods or ground)'),
          checkOption('Traditional Seasonings (Mekelesha, Besobila, Black Nigella seed, Niter Kibbeh)'),
          fieldPrompt('Where are your spices sourced from? (e.g., Imported directly from Ethiopia):'),

          new Paragraph({
            spacing: { before: 80, after: 40 },
            children: [
              new TextRun({
                text: 'C. Fresh Meat & Butcher Counter',
                bold: true,
                size: 20,
                color: BRAND_PRIMARY,
                font: 'Segoe UI',
              }),
            ],
          }),
          checkOption('Yes, we have a fresh meat / butcher counter'),
          checkOption('No butcher counter (packaged foods only)'),
          fieldPrompt('If yes, what meats do you carry? (Kitfo beef, Tibs beef, Lamb, Goat, Halal options):'),

          new Paragraph({
            spacing: { before: 80, after: 40 },
            children: [
              new TextRun({
                text: 'D. Coffee & Traditional Ceremony Items',
                bold: true,
                size: 20,
                color: BRAND_PRIMARY,
                font: 'Segoe UI',
              }),
            ],
          }),
          checkOption('Raw Green Coffee Beans (e.g., Yirgacheffe, Sidama, Harrar)'),
          checkOption('Roasted Coffee Beans / Ground Coffee'),
          checkOption('Traditional Clay Jebena Pots & Cini Porcelain Cups'),
          checkOption('Frankincense / Incense & Roasting Pans'),

          new Paragraph({
            spacing: { before: 80, after: 40 },
            children: [
              new TextRun({
                text: 'E. Pantry, Grains & Cultural Goods',
                bold: true,
                size: 20,
                color: BRAND_PRIMARY,
                font: 'Segoe UI',
              }),
            ],
          }),
          checkOption('Teff Flour (Brown Teff, White Teff, 25lb / 50lb sacks)'),
          checkOption('Lentils & Pulses (Red lentils / Misir, Yellow split peas / Kik)'),
          checkOption('Handwoven Mesob Dining Tables & Mitad Injera Griddles'),
          checkOption('Traditional Ethiopian Clothing, Scarves & Cultural Accessories'),

          new Paragraph({ spacing: { before: 80 } }),
          ...multiLineArea('What are your Top 3 Best-Selling items overall (the items customers come specifically to buy)?:', 2),

          new Paragraph({ spacing: { after: 160 } }),

          // SECTION 5
          sectionTitle('5', 'Weekly Fresh Schedule & Services'),
          subtitle('Special delivery days and services you offer to customers.'),

          ...multiLineArea('Fresh Delivery Days (e.g., Days fresh injera or fresh butcher meat arrives):', 2),

          new Paragraph({ spacing: { before: 60 } }),
          checkOption('In-Store Walk-in Shopping'),
          checkOption('Call-Ahead Phone Orders for Quick Counter Pickup'),
          checkOption('Local Delivery (DoorDash / UberEats / In-house)'),
          checkOption('Wholesale Supply to Local Restaurants & Caterers (Bulk sacks & fresh injera crates)'),
          fieldPrompt('Wholesale / Bulk order contact phone or name:'),

          new Paragraph({ spacing: { after: 160 } }),

          // SECTION 6
          sectionTitle('6', 'About Yenat Market (Your Story)'),
          subtitle('A brief story helps build trust and connection with customers.'),

          ...multiLineArea('What is the story behind the name "Yenat Market" ("Mother\'s Market")?:', 2),
          fieldPrompt('Year the market was established / opened:'),
          fieldPrompt('Founder or Owner name(s):'),
          ...multiLineArea('What makes your market unique compared to others? (e.g., freshest meat, authentic imports, friendly family atmosphere):', 2),

          new Paragraph({ spacing: { after: 200 } }),

          // SECTION 7 - WHATSAPP PHOTOS CALLOUT
          calloutCard(
            '📸 FINAL STEP: SEND YOUR PHOTOS & VIDEOS VIA WHATSAPP',
            [
              'Real photos make your website look authentic, warm, and professional!',
              'Please open WhatsApp on your phone and send us all the photos and short video clips you have of the shop.',
              '',
              '📱 WhatsApp Number to Send Photos To:  [                                                                       ]',
              '👤 Contact Name:                       [                                                                       ]',
              '',
              'Photo Checklist — Please send as many as you can:',
              '  1. Storefront Exterior: Front building view showing your store sign & entrance.',
              '  2. Store Aisles: Well-lit photos of the shelves and market aisles.',
              '  3. Fresh Injera & Bread: Photos of fresh injera packs, bread, or mitad baking.',
              '  4. Spice Counter: Jars, bags, and displays of Berbere, Mitmita, and seasonings.',
              '  5. Butcher Counter: Clean display of fresh meats and cuts (if applicable).',
              '  6. Coffee Corner: Clay Jebena pots, cups, and green or roasted coffee beans.',
              '  7. Cultural Items: Mesob tables, traditional cookware, or clothing.',
              '  8. Store Logo: Image of your logo, sign, business card, or shopping bags.',
              '  9. Owner / Staff Photo (Optional): A friendly photo behind the counter.',
              ' 10. Short 15-second Video Tour: Quick walk-through showing the welcoming market vibe.',
              '',
              '💡 Tip for Best Quality: In WhatsApp, tap the paperclip/plus (+) icon and select "Document" or choose "HD" so photos are sent in original, crystal-clear quality.',
            ],
            true
          ),

          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 60 },
            children: [
              new TextRun({
                text: 'Thank you! Once you return this form and send your photos,',
                bold: true,
                size: 20,
                color: BRAND_PRIMARY,
                font: 'Segoe UI',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 100 },
            children: [
              new TextRun({
                text: 'we will update the website with your 100% real information and launch it live.',
                bold: true,
                size: 20,
                color: BRAND_GOLD,
                font: 'Segoe UI',
              }),
            ],
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const outputPath = path.resolve('Yenat_Market_Store_Questionnaire.docx');
  fs.writeFileSync(outputPath, buffer);
  console.log(`Simplified questionnaire successfully generated at: ${outputPath}`);

  try {
    const oldPath = path.resolve('Yenat_Market_Website_Questionnaire.docx');
    fs.writeFileSync(oldPath, buffer);
    console.log(`Also updated: ${oldPath}`);
  } catch (err) {
    console.log(`Note: Yenat_Market_Website_Questionnaire.docx is currently open in Microsoft Word. Created ${outputPath} instead!`);
  }
}

generateSimplifiedQuestionnaire().catch(console.error);
