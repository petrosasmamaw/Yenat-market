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

// Clean executive styling colors (no flashy emojis, clean corporate look)
const COLOR_PRIMARY = '7A1C12';   // Deep Burgundy Red
const COLOR_SECONDARY = '1F2421'; // Crisp Charcoal Dark
const COLOR_MUTED = '555555';     // Neutral Slate
const COLOR_BORDER = 'CCCCCC';    // Subtle border
const COLOR_BG_LIGHT = 'F9F8F6';  // Soft off-white table shading

function createHeader() {
  return new Paragraph({
    alignment: AlignmentType.RIGHT,
    children: [
      new TextRun({
        text: 'Yenat Market — Official Website Information Questionnaire',
        size: 16,
        color: '888888',
        font: 'Calibri',
      }),
    ],
  });
}

function createFooter() {
  return new Paragraph({
    alignment: AlignmentType.SPACE_BETWEEN,
    children: [
      new TextRun({
        text: 'Confidential Client Onboarding Form',
        size: 16,
        color: '888888',
        font: 'Calibri',
      }),
      new TextRun({
        text: '   |   Page ',
        size: 16,
        color: '888888',
        font: 'Calibri',
      }),
      new TextRun({
        children: [PageNumber.CURRENT],
        size: 16,
        color: '888888',
        font: 'Calibri',
      }),
      new TextRun({
        text: ' of ',
        size: 16,
        color: '888888',
        font: 'Calibri',
      }),
      new TextRun({
        children: [PageNumber.TOTAL_PAGES],
        size: 16,
        color: '888888',
        font: 'Calibri',
      }),
    ],
  });
}

function sectionHeading(num, title) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 280, after: 100 },
    children: [
      new TextRun({
        text: `${num}. ${title}`,
        bold: true,
        size: 24,
        color: COLOR_PRIMARY,
        font: 'Calibri',
      }),
    ],
  });
}

function categoryHeading(title) {
  return new Paragraph({
    spacing: { before: 140, after: 60 },
    children: [
      new TextRun({
        text: title,
        bold: true,
        size: 20,
        color: COLOR_PRIMARY,
        font: 'Calibri',
      }),
    ],
  });
}

function fieldPrompt(label, lineLength = '____________________________________________________________________') {
  return new Paragraph({
    spacing: { before: 60, after: 60 },
    children: [
      new TextRun({
        text: label + ' ',
        bold: true,
        size: 19,
        color: COLOR_SECONDARY,
        font: 'Calibri',
      }),
      new TextRun({
        text: lineLength,
        size: 18,
        color: 'AAAAAA',
        font: 'Calibri',
      }),
    ],
  });
}

function checkOption(label) {
  return new Paragraph({
    spacing: { before: 45, after: 45 },
    children: [
      new TextRun({
        text: '[   ]  ',
        bold: true,
        size: 20,
        color: COLOR_PRIMARY,
        font: 'Calibri',
      }),
      new TextRun({
        text: label,
        size: 19,
        color: COLOR_SECONDARY,
        font: 'Calibri',
      }),
    ],
  });
}

function otherProductsBox(label = 'Other items you carry in this department (names & prices):', lines = 2) {
  const list = [
    new Paragraph({
      spacing: { before: 70, after: 40 },
      children: [
        new TextRun({
          text: `+ ${label}`,
          bold: true,
          size: 18,
          color: COLOR_MUTED,
          font: 'Calibri',
        }),
      ],
    }),
  ];
  for (let i = 0; i < lines; i++) {
    list.push(
      new Paragraph({
        spacing: { before: 30, after: 30 },
        children: [
          new TextRun({
            text: '   ________________________________________________________________________________________________',
            size: 18,
            color: 'CCCCCC',
            font: 'Calibri',
          }),
        ],
      })
    );
  }
  return list;
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
          color: COLOR_SECONDARY,
          font: 'Calibri',
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
            text: '____________________________________________________________________________________________________',
            size: 18,
            color: 'CCCCCC',
            font: 'Calibri',
          }),
        ],
      })
    );
  }
  return paras;
}

function calloutCard(title, bulletPoints) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 6, color: COLOR_PRIMARY },
      bottom: { style: BorderStyle.SINGLE, size: 6, color: COLOR_PRIMARY },
      left: { style: BorderStyle.SINGLE, size: 24, color: COLOR_PRIMARY },
      right: { style: BorderStyle.SINGLE, size: 6, color: COLOR_PRIMARY },
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            shading: { fill: COLOR_BG_LIGHT, type: ShadingType.CLEAR },
            margins: { top: 120, bottom: 120, left: 160, right: 160 },
            children: [
              new Paragraph({
                spacing: { after: 60 },
                children: [
                  new TextRun({
                    text: title,
                    bold: true,
                    size: 21,
                    color: COLOR_PRIMARY,
                    font: 'Calibri',
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
                        color: COLOR_SECONDARY,
                        font: 'Calibri',
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

function makeHoursTable() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const headerRow = new TableRow({
    children: [
      new TableCell({
        width: { size: 30, type: WidthType.PERCENTAGE },
        shading: { fill: COLOR_PRIMARY, type: ShadingType.CLEAR },
        margins: { top: 80, bottom: 80, left: 100, right: 100 },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: 'Day of Week', bold: true, color: 'FFFFFF', size: 18, font: 'Calibri' })],
          }),
        ],
      }),
      new TableCell({
        width: { size: 70, type: WidthType.PERCENTAGE },
        shading: { fill: COLOR_PRIMARY, type: ShadingType.CLEAR },
        margins: { top: 80, bottom: 80, left: 100, right: 100 },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: 'Operating Hours (e.g., 8:30 AM to 9:00 PM)', bold: true, color: 'FFFFFF', size: 18, font: 'Calibri' })],
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
          children: [new Paragraph({ children: [new TextRun({ text: day, bold: true, size: 18, color: COLOR_SECONDARY, font: 'Calibri' })] })],
        }),
        new TableCell({
          shading: { fill: bg, type: ShadingType.CLEAR },
          margins: { top: 70, bottom: 70, left: 100, right: 100 },
          children: [new Paragraph({ children: [new TextRun({ text: '[          ] AM   to   [          ] PM', size: 18, color: '555555', font: 'Calibri' })] })],
        }),
      ],
    });
  });

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
      left: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
      right: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 2, color: COLOR_BORDER },
      insideVertical: { style: BorderStyle.SINGLE, size: 2, color: COLOR_BORDER },
    },
    rows: [headerRow, ...bodyRows],
  });
}

async function generateQuestionnaire2() {
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: 'Calibri',
            size: 19,
            color: COLOR_SECONDARY,
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
              left: 1000,
              right: 1000,
            },
          },
        },
        children: [
          // Title
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 60, after: 30 },
            children: [
              new TextRun({
                text: 'YENAT MARKET',
                bold: true,
                size: 32,
                color: COLOR_PRIMARY,
                font: 'Calibri',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 120 },
            children: [
              new TextRun({
                text: 'Official Website Information & Content Onboarding Form',
                bold: true,
                size: 20,
                color: COLOR_MUTED,
                font: 'Calibri',
              }),
            ],
          }),

          calloutCard(
            'Instructions for Store Owner & Management',
            [
              '• We have developed an interactive website demo for Yenat Market.',
              '• Please fill out this form to replace placeholder demo information with your actual store products, prices, hours, and business details.',
              '• In each product section, extra blank lines are provided so you can easily write in any additional items you sell that are not already listed.',
              '• At the end of this form, please review the checklist to send store photos and short video clips via WhatsApp.',
            ]
          ),

          new Paragraph({ spacing: { after: 140 } }),

          // SECTION 1
          sectionHeading('1', 'Store Identity & Contact Details'),
          fieldPrompt('Official Business Name:'),
          fieldPrompt('Tagline / Slogan (e.g., Authentic Ethiopian Grocery & Heritage Spices):'),
          fieldPrompt('Announcement Bar Banner (e.g., Fresh Injera baked daily! Special weekend cuts):'),
          fieldPrompt('Street Address & Suite Number:'),
          fieldPrompt('City, State, ZIP Code:'),
          fieldPrompt('Nearby Landmarks or Cross-Streets:'),
          fieldPrompt('Primary Phone Number for Customer Calls:'),
          fieldPrompt('WhatsApp Phone Number (for Customer Inquiries & Orders):'),
          fieldPrompt('Official Store Email Address:'),
          fieldPrompt('Website Domain (e.g., yenatmarket.com — or note if you need one registered):'),
          fieldPrompt('Social Media Accounts (Instagram, Facebook, TikTok, Google Business):'),

          new Paragraph({ spacing: { after: 140 } }),

          // SECTION 2
          sectionHeading('2', 'Store Operating Hours'),
          makeHoursTable(),
          new Paragraph({ spacing: { before: 80 } }),
          ...multiLineArea('Holiday Hours & Special Exceptions (e.g., Open regular hours on all holidays, or special Ethiopian holiday hours):', 1),

          new Paragraph({ spacing: { after: 140 } }),

          // SECTION 3
          sectionHeading('3', 'Accepted Payment Methods'),
          checkOption('Cash'),
          checkOption('Credit & Debit Cards (Visa, MasterCard, American Express, Discover)'),
          checkOption('EBT / SNAP (Food Stamps)'),
          checkOption('Apple Pay, Google Pay, Samsung Pay (Tap to Pay)'),
          checkOption('Zelle (Phone or Email for Zelle: ______________________________________)'),
          checkOption('CashApp / Venmo ($Username: ______________________________________)'),
          checkOption('Commercial Invoicing / Checks (for restaurant wholesale accounts)'),
          ...otherProductsBox('Other payment methods or register policies (e.g., minimum purchase amount):', 1),

          new Paragraph({ spacing: { after: 140 } }),

          // SECTION 4
          sectionHeading('4', 'Main Products & Store Departments'),

          // Dept A
          categoryHeading('A. Injera & Bakery Department'),
          checkOption('100% Pure Teff Injera (Gluten-Free)  —  Pack Price: $_______  |  Pack Size: ______ rolls'),
          checkOption('Traditional Mixed Teff Injera  —  Pack Price: $_______  |  Pack Size: ______ rolls'),
          checkOption('In-House Baked Fresh Daily'),
          checkOption('Delivered Daily from Local Bakery'),
          fieldPrompt('Fresh hot injera arrival / bake times (e.g., 8:00 AM & 2:00 PM):'),
          checkOption('Fresh Ambasha / Specialty Celebratory Bread  —  Loaf Price: $_______'),
          ...otherProductsBox('Other bakery or bread items not listed above (names & prices):', 2),

          // Dept B
          categoryHeading('B. Authentic Spices & Blends'),
          checkOption('Stone-Ground Berbere (Available in: [ ] 8oz  [ ] 1lb  [ ] 5lb  [ ] Bulk 25lb commercial sacks)'),
          checkOption('Fiery Mitmita (Chili blend for Kitfo and meats)'),
          checkOption('Spiced Shiro Powder (Chickpea and broad bean stew mix)'),
          checkOption('Whole Korarima / False Cardamom (Pods and seeds)'),
          checkOption('Mekelesha Finishing Spice Blend'),
          checkOption('Tikur Azmud (Black Nigella seed) & Nech Azmud (White cumin)'),
          checkOption('Besobila (Sacred Basil) & Senafech (Mustard powder)'),
          checkOption('Niter Kibbeh (Traditional spiced clarified butter)'),
          fieldPrompt('Spice Origin (e.g., Imported directly from Gojjam, Gondar, Addis Ababa):'),
          ...otherProductsBox('Other spices, herbs, or seasonings not listed above (names & prices):', 2),

          // Dept C
          categoryHeading('C. Custom Meat & Butcher Counter'),
          checkOption('Yes, we have a fresh meat / butchery counter in the shop'),
          checkOption('No fresh meat counter (we carry packaged dry foods only)'),
          checkOption('Prime Beef for Kitfo (ultra-lean, hand-trimmed top round)  —  Price per lb: $_______'),
          checkOption('Tender Beef for Tibs (hand-cubed for sizzling skillet)  —  Price per lb: $_______'),
          checkOption('Fresh Lamb (cut to order)  —  Price per lb: $_______'),
          checkOption('Fresh Bone-in Goat  —  Price per lb: $_______'),
          checkOption('Specialty Cuts: Dulet meats, Tripe, Liver, Gored Gored beef cubes'),
          checkOption('100% Halal certified processing available'),
          fieldPrompt('Days of week fresh meat arrives from distributor (e.g., Mon, Wed, Sat):'),
          ...otherProductsBox('Other meat cuts, poultry, or specialty meats not listed above (names & prices):', 2),

          // Dept D
          categoryHeading('D. Coffee & Traditional Ceremony Items'),
          checkOption('Raw Green Unroasted Coffee Beans (Origins: [ ] Yirgacheffe  [ ] Sidama  [ ] Harrar  [ ] Jimma)'),
          checkOption('Pan-Roasted Coffee Beans or Fresh Ground Coffee  —  Price per bag: $_______'),
          checkOption('Handcrafted Clay Jebena Coffee Pots with natural straw stands'),
          checkOption('Porcelain Cini Cups & Saucers'),
          checkOption('Traditional Wooden Coffee Tables (Rekebot)'),
          checkOption('Frankincense (Incense / Itan), Charcoal Burners, and Roasting Pans'),
          ...otherProductsBox('Other coffee varieties or ceremony accessories not listed above:', 2),

          // Dept E
          categoryHeading('E. Pantry Essentials, Grains & Flours'),
          checkOption('Brown Teff Flour (Sizes: [ ] 5 lb  [ ] 25 lb  [ ] 50 lb commercial sacks)'),
          checkOption('White / Ivory Teff Flour (Sizes: [ ] 5 lb  [ ] 25 lb  [ ] 50 lb commercial sacks)'),
          checkOption('Red Lentils (Misir) & Yellow Split Peas (Kik)'),
          checkOption('Barley (Gebs), Wheat Flours, and Kocho / Bulla'),
          checkOption('Ethiopian Honey, Pastes (Awaze), Cooking Oils & Sauces'),
          ...otherProductsBox('Other pantry essentials, dry grains, or canned goods not listed above:', 2),

          // Dept F
          categoryHeading('F. Cultural Goods & Kitchen Cookware'),
          checkOption('Handwoven Mesob Dining Tables (Available sizes: [ ] Small  [ ] Medium  [ ] Large)'),
          checkOption('Electric Mitad Injera Baking Griddles (e.g., Wass Electronics or Heritage models)'),
          checkOption('Traditional Sefed cooling trays and Akambalo mitad covers'),
          checkOption('Traditional Habesha Kemis dresses, Netela scarves, and Gabi blankets'),
          checkOption('Ethiopian Crosses, Cultural Jewelry, Traditional Soaps & Hair Care'),
          ...otherProductsBox('Other cultural or household items not listed above (names & prices):', 2),

          // Dept G
          categoryHeading('G. Prepared Food, Deli or Café Counter (If applicable)'),
          checkOption('No prepared food — strictly retail grocery & butcher'),
          checkOption('Yes — we have a deli / hot food counter serving takeout meals or brewed coffee'),
          ...otherProductsBox('Details of prepared food, takeout items, or hot beverages served:', 2),

          new Paragraph({ spacing: { before: 80 } }),
          ...multiLineArea('Overall Top 3 Bestsellers in the entire market (what people buy the most):', 2),

          new Paragraph({ spacing: { after: 140 } }),

          // SECTION 5
          sectionHeading('5', 'Weekly Fresh Schedule & Customer Services'),
          ...multiLineArea('Weekly Schedule Highlights (What days do fresh shipments or bakes arrive?):', 3),

          new Paragraph({ spacing: { before: 60 } }),
          checkOption('Walk-In In-Store Shopping'),
          checkOption('Call-Ahead Phone Orders for Fast Counter Pickup'),
          checkOption('WhatsApp Ordering for Custom Meat Cuts and Bulk Spices'),
          checkOption('Local Delivery via Apps: [ ] DoorDash  [ ] UberEats  [ ] Grubhub  [ ] In-house delivery'),
          checkOption('Nationwide Shipping across the USA (shipping dry spices, teff flour, coffee)'),
          checkOption('Wholesale Bulk Supply to Local Restaurants & Caterers (25lb/50lb sacks & injera crates)'),
          fieldPrompt('Wholesale / Bulk Order Direct Contact Name & Phone:'),

          new Paragraph({ spacing: { after: 140 } }),

          // SECTION 6
          sectionHeading('6', 'Store Heritage & Story (About Us)'),
          ...multiLineArea('Why was the market named "Yenat Market" ("Mother\'s Market")? (Brief family story or meaning):', 2),
          fieldPrompt('Year Yenat Market was founded / opened:'),
          fieldPrompt('Founder or Owner Name(s):'),
          ...multiLineArea('What makes your store special compared to others? (e.g., freshest meat, family atmosphere, authentic direct imports):', 2),

          new Paragraph({ spacing: { after: 140 } }),

          // SECTION 7
          sectionHeading('7', 'Customer Reviews & Frequently Asked Questions'),
          ...multiLineArea('Customer Reviews or Quotes to Feature on the Website (from regular customers, chefs, or community):', 2),
          ...multiLineArea('Top 2 or 3 Questions Customers Frequently Ask (with your answers):', 3),

          new Paragraph({ spacing: { after: 160 } }),

          // SECTION 8 - FINAL WHATSAPP CALLOUT
          calloutCard(
            'FINAL STEP: SEND STORE PHOTOS & VIDEOS VIA WHATSAPP',
            [
              'Real photos of your actual storefront, shelves, and products make the website look authentic and inviting to customers.',
              'Please send all your photos and short video clips directly to our WhatsApp:',
              '',
              'WhatsApp Phone Number to Send Photos:  [                                                                       ]',
              'Contact Name:                           [                                                                       ]',
              '',
              'Photo Checklist — Please send as many as you can:',
              '  1. Storefront Exterior: Front building view showing your store sign and entrance (day and night).',
              '  2. Store Aisles: Clear, well-lit photos of the grocery aisles and display shelves.',
              '  3. Fresh Injera & Bread: Photos of fresh injera packages, bread loaves, or mitad baking.',
              '  4. Spices: Jars, bags, and bulk displays of Berbere, Mitmita, Shiro, and seasonings.',
              '  5. Butcher Counter: Clean photos of display cases with fresh meats and cuts (if applicable).',
              '  6. Coffee Corner: Clay Jebena pots, cups, and green or roasted coffee beans.',
              '  7. Cultural Items: Mesob tables, traditional cookware, or clothing displays.',
              '  8. Store Logo: High-resolution file or clear photo of your logo, sign, business card, or bags.',
              '  9. Owner & Staff: A friendly photo behind the counter (optional, builds great trust).',
              ' 10. Short 15-Second Video: A quick walk-through video showing the welcoming market atmosphere.',
              '',
              'Tip for Best Quality: In WhatsApp, tap the attachment (+) icon and choose "Document" (or select "HD Quality") so the photos are sent in full original resolution.',
            ]
          ),

          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 180, after: 60 },
            children: [
              new TextRun({
                text: 'Thank you for your time and partnership!',
                bold: true,
                size: 20,
                color: COLOR_PRIMARY,
                font: 'Calibri',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 100 },
            children: [
              new TextRun({
                text: 'Once we receive this form and your WhatsApp photos, we will update the website with your 100% real information and launch it live.',
                bold: false,
                size: 19,
                color: COLOR_MUTED,
                font: 'Calibri',
              }),
            ],
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const outputPath = path.resolve('Yenat_Market_Store_Questionnaire_2.docx');
  fs.writeFileSync(outputPath, buffer);
  console.log(`Questionnaire 2 successfully created at: ${outputPath}`);
}

generateQuestionnaire2().catch(console.error);
