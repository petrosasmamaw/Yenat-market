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
  UnderlineType,
} from 'docx';

// Colors
const PRIMARY = '7A1C12'; // Deep Ethiopian Wine / Burgundy
const SECONDARY = 'B87310'; // Warm Ethiopian Amber / Gold
const ACCENT = '234B28'; // Deep Herbal Green
const DARK = '222222';
const GRAY_BG = 'F6F4F0'; // Soft warm cream/off-white background
const BORDER_COLOR = 'D4CDC5';
const HIGHLIGHT_BG = 'FBF4E8'; // Soft amber accent

function createHeaderPara() {
  return new Paragraph({
    alignment: AlignmentType.RIGHT,
    children: [
      new TextRun({
        text: 'Yenat Market (የእናት ገበያ) — Official Website Content Questionnaire',
        size: 16,
        color: '888888',
        italics: true,
      }),
    ],
  });
}

function createFooterPara() {
  return new Paragraph({
    alignment: AlignmentType.SPACE_BETWEEN,
    children: [
      new TextRun({
        text: 'Confidential — Prepared for Website Setup & Content Integration',
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

function heading1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 320, after: 120 },
    children: [
      new TextRun({
        text: text,
        bold: true,
        size: 26,
        color: PRIMARY,
        font: 'Segoe UI',
      }),
    ],
  });
}

function heading2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 200, after: 80 },
    children: [
      new TextRun({
        text: text,
        bold: true,
        size: 22,
        color: SECONDARY,
        font: 'Segoe UI',
      }),
    ],
  });
}

function instructionPara(text) {
  return new Paragraph({
    spacing: { before: 60, after: 120 },
    children: [
      new TextRun({
        text: text,
        italics: true,
        size: 19,
        color: '555555',
      }),
    ],
  });
}

function question(num, qText, hint = '') {
  const children = [
    new TextRun({
      text: `${num}. `,
      bold: true,
      color: PRIMARY,
      size: 21,
    }),
    new TextRun({
      text: qText,
      bold: true,
      color: DARK,
      size: 21,
    }),
  ];

  if (hint) {
    children.push(
      new TextRun({
        text: `\n    ${hint}`,
        italics: true,
        color: '666666',
        size: 18,
      })
    );
  }

  return new Paragraph({
    spacing: { before: 140, after: 60 },
    children,
  });
}

function fillLine(label = '', lines = 1) {
  const paras = [];
  if (label) {
    paras.push(
      new Paragraph({
        spacing: { before: 40, after: 40 },
        children: [
          new TextRun({
            text: label + ' ',
            color: '444444',
            size: 19,
          }),
          new TextRun({
            text: '____________________________________________________________________________________',
            color: 'BBBBBB',
            size: 18,
          }),
        ],
      })
    );
    lines--;
  }
  for (let i = 0; i < lines; i++) {
    paras.push(
      new Paragraph({
        spacing: { before: 30, after: 30 },
        children: [
          new TextRun({
            text: '____________________________________________________________________________________________________',
            color: 'CCCCCC',
            size: 18,
          }),
        ],
      })
    );
  }
  return paras;
}

function checkItem(text, isChecked = false) {
  return new Paragraph({
    spacing: { before: 40, after: 40 },
    children: [
      new TextRun({
        text: isChecked ? '[ X ] ' : '[   ] ',
        bold: true,
        color: isChecked ? PRIMARY : '666666',
        size: 20,
      }),
      new TextRun({
        text: text,
        color: DARK,
        size: 20,
      }),
    ],
  });
}

function createBoxedCallout(title, lines, bgColor = GRAY_BG, borderColor = PRIMARY) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 8, color: borderColor },
      bottom: { style: BorderStyle.SINGLE, size: 8, color: borderColor },
      left: { style: BorderStyle.SINGLE, size: 24, color: borderColor },
      right: { style: BorderStyle.SINGLE, size: 8, color: borderColor },
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            shading: { fill: bgColor, type: ShadingType.CLEAR },
            margins: { top: 140, bottom: 140, left: 180, right: 180 },
            children: [
              new Paragraph({
                spacing: { after: 60 },
                children: [
                  new TextRun({
                    text: title,
                    bold: true,
                    size: 22,
                    color: borderColor,
                  }),
                ],
              }),
              ...lines.map(
                (l) =>
                  new Paragraph({
                    spacing: { after: 40 },
                    children: [
                      new TextRun({
                        text: l,
                        size: 19,
                        color: DARK,
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

function createHoursTable() {
  const days = [
    { day: 'Monday', demo: '8:30 AM – 9:00 PM' },
    { day: 'Tuesday', demo: '8:30 AM – 9:00 PM' },
    { day: 'Wednesday', demo: '8:30 AM – 9:00 PM' },
    { day: 'Thursday', demo: '8:30 AM – 9:00 PM' },
    { day: 'Friday', demo: '8:30 AM – 9:00 PM' },
    { day: 'Saturday', demo: '8:30 AM – 9:00 PM' },
    { day: 'Sunday', demo: '8:30 AM – 9:00 PM' },
  ];

  const headerRow = new TableRow({
    children: [
      new TableCell({
        width: { size: 25, type: WidthType.PERCENTAGE },
        shading: { fill: PRIMARY, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 100, right: 100 },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: 'Day of Week', bold: true, color: 'FFFFFF', size: 19 })],
          }),
        ],
      }),
      new TableCell({
        width: { size: 35, type: WidthType.PERCENTAGE },
        shading: { fill: PRIMARY, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 100, right: 100 },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: 'Demo Site Hours', bold: true, color: 'FFFFFF', size: 19 })],
          }),
        ],
      }),
      new TableCell({
        width: { size: 40, type: WidthType.PERCENTAGE },
        shading: { fill: PRIMARY, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 100, right: 100 },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: 'Your Actual Opening & Closing Hours', bold: true, color: 'FFFFFF', size: 19 })],
          }),
        ],
      }),
    ],
  });

  const bodyRows = days.map((d, idx) => {
    const bg = idx % 2 === 0 ? 'FFFFFF' : 'F9F8F6';
    return new TableRow({
      children: [
        new TableCell({
          shading: { fill: bg, type: ShadingType.CLEAR },
          margins: { top: 80, bottom: 80, left: 100, right: 100 },
          children: [new Paragraph({ children: [new TextRun({ text: d.day, bold: true, size: 19, color: DARK })] })],
        }),
        new TableCell({
          shading: { fill: bg, type: ShadingType.CLEAR },
          margins: { top: 80, bottom: 80, left: 100, right: 100 },
          children: [new Paragraph({ children: [new TextRun({ text: d.demo, size: 18, color: '777777', italics: true })] })],
        }),
        new TableCell({
          shading: { fill: bg, type: ShadingType.CLEAR },
          margins: { top: 80, bottom: 80, left: 100, right: 100 },
          children: [new Paragraph({ children: [new TextRun({ text: '[       ] AM  to  [       ] PM', size: 18, color: '444444' })] })],
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

async function buildDoc() {
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: 'Segoe UI',
            size: 20,
            color: DARK,
          },
        },
      },
    },
    sections: [
      {
        headers: { default: new Header({ children: [createHeaderPara()] }) },
        footers: { default: new Footer({ children: [createFooterPara()] }) },
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
          // Title Section
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 100, after: 60 },
            children: [
              new TextRun({
                text: 'YE ENAT MARKET (የእናት ገበያ)',
                bold: true,
                size: 36,
                color: PRIMARY,
                font: 'Segoe UI',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 140 },
            children: [
              new TextRun({
                text: 'WEBSITE LAUNCH QUESTIONNAIRE: FROM DEMO TO LIVE REAL SITE',
                bold: true,
                size: 22,
                color: SECONDARY,
              }),
            ],
          }),

          createBoxedCallout(
            '🌟 Dear Store Owner / Manager — Welcome!',
            [
              'We have built an interactive demo website for Yenat Market! To replace all demo placeholder information with your exact real-life products, prices, opening hours, butcher cuts, spices, and contact information, please fill in this questionnaire.',
              'You can type your answers directly into this document or print it out and write by hand.',
              'At the very end of this document, you will also find the instructions to send all high-resolution photos and videos of your market to our WhatsApp so we can feature your real store on the live website.',
            ],
            HIGHLIGHT_BG,
            SECONDARY
          ),

          new Paragraph({ spacing: { after: 180 } }),

          // SECTION 1
          heading1('SECTION 1: Official Store Identity & Contact Information'),
          instructionPara('Please provide your exact business details as you want them to appear on Google and on your website.'),

          question('1.1', 'Official Store Name', 'How should your business name be written?'),
          ...fillLine('English Name (e.g. Yenat Market):'),
          ...fillLine('Amharic Script Name (e.g. የእናት ገበያ):'),

          question('1.2', 'Store Slogan / Tagline / Main Brand Phrase', 'What is your main motto or catchphrase?'),
          instructionPara('Demo currently says: "Mother\'s Market — Authentic Ethiopian Grocery & Heritage Spices"'),
          ...fillLine('Your preferred slogan / tagline:'),

          question('1.3', 'Physical Store Address & Landmarks', 'Where is your market located?'),
          ...fillLine('Street Address:'),
          ...fillLine('Suite / Unit #:'),
          ...fillLine('City, State, ZIP Code:'),
          ...fillLine('Nearby landmark or cross streets (helps shoppers find you):'),

          question('1.4', 'Phone Numbers & Communication Channels', 'Which numbers can customers call or message?'),
          ...fillLine('Primary Public Store Phone (Customer orders / questions):'),
          ...fillLine('WhatsApp Business Number (for orders & customer chat):'),
          ...fillLine('Owner / Manager Private Cell Phone (for website developer contact only):'),

          question('1.5', 'Email & Website Domain'),
          ...fillLine('Official Store Email:'),
          ...fillLine('Do you already own a website domain? (e.g., www.yenatmarket.com):'),
          checkItem('Yes, we already bought our domain name. (Domain: _________________________)'),
          checkItem('No, please help us register/buy our domain name.'),

          question('1.6', 'Social Media Links & Google Business Profile', 'Check and write handles where customers can follow you:'),
          ...fillLine('Google Maps / Google Business Profile link or name:'),
          ...fillLine('Instagram handle / URL (@______________________):'),
          ...fillLine('Facebook page URL:'),
          ...fillLine('TikTok account (@______________________):'),
          ...fillLine('Yelp business listing URL:'),

          new Paragraph({ spacing: { after: 200 } }),

          // SECTION 2
          heading1('SECTION 2: Store Operating Hours & Special Days'),
          instructionPara('Please confirm or update your weekly hours. Customers search for opening times every day!'),

          createHoursTable(),

          new Paragraph({ spacing: { before: 120 } }),
          question('2.1', 'Holiday & Special Event Hours', 'How do you operate on Ethiopian and US holidays?'),
          checkItem('Open normal hours on all holidays'),
          checkItem('Special hours on Ethiopian Holidays (Enkutatash / New Year, Genna / Christmas, Fasika / Easter, Meskel)'),
          checkItem('Closed on Thanksgiving / Christmas Day / New Year'),
          ...fillLine('Special holiday notes / details:', 2),

          new Paragraph({ spacing: { after: 200 } }),

          // SECTION 3
          heading1('SECTION 3: Accepted Payment Methods'),
          instructionPara('Select all payment methods accepted at your register. We will show these badges prominently on the website:'),

          checkItem('Cash'),
          checkItem('Credit / Debit Cards (Visa, MasterCard, American Express, Discover)'),
          checkItem('EBT / SNAP (Food Stamps) — [Very important for grocery shoppers!]'),
          checkItem('Apple Pay'),
          checkItem('Google Pay / Samsung Pay (Tap to Pay)'),
          checkItem('Zelle (Phone or Email for Zelle: ______________________________________)'),
          checkItem('CashApp ($Cashtag: ______________________________________)'),
          checkItem('Direct invoicing / Checks for Restaurant Wholesale accounts'),
          ...fillLine('Any other payment methods or restrictions? (e.g. $5 card minimum?):', 1),

          new Paragraph({ spacing: { after: 200 } }),

          // SECTION 4
          heading1('SECTION 4: Main Products & Departments Offered'),
          instructionPara('Please tell us about your main products so we can put your real inventory and bestsellers on the site.'),

          question('4.1', 'What are your Top 5 Best-Selling Products in the entire market?'),
          instructionPara('(The items people specifically walk into Yenat Market to buy):'),
          ...fillLine('1. Top Seller #1:'),
          ...fillLine('2. Top Seller #2:'),
          ...fillLine('3. Top Seller #3:'),
          ...fillLine('4. Top Seller #4:'),
          ...fillLine('5. Top Seller #5:'),

          heading2('Department A: Fresh Injera & Bakery'),
          question('4.2', 'Tell us about your Injera offerings:'),
          checkItem('100% Pure Teff Injera (Gluten-Free) — Price per pack: $_______ (Pack size: _____ rolls)'),
          checkItem('Traditional Mixed Teff Injera (Teff + Wheat/Barley) — Price per pack: $_______ (Pack size: _____ rolls)'),
          checkItem('Baked in-house at our shop'),
          checkItem('Delivered fresh daily by trusted master bakers'),
          ...fillLine('What times does fresh hot injera arrive/come out? (e.g., 8:00 AM & 2:00 PM):'),
          checkItem('Do you bake/sell Ambasha (ድፎ ዳቦ)?  Days available: [  ] Daily  [  ] Weekends only (Fri-Sun)'),
          ...fillLine('Ambasha price per loaf / details:'),

          heading2('Department B: Heritage Spices & Seasonings'),
          question('4.3', 'Which Ethiopian spices and blends do you carry in stock?'),
          checkItem('Authentic Stone-Ground Berbere (የወጣት በርበሬ / የደብረ ማርቆስ በርበሬ) — Available in: [ ] 8oz  [ ] 1lb  [ ] 5lb  [ ] Bulk 25lb sacks'),
          checkItem('Fiery Mitmita (ሚጥሚጣ) — Extra spicy bird’s eye chili blend'),
          checkItem('Spiced Shiro Powder (ሽሮ ዱቄት / ሽሮ ተጋቢኖ) — Chickpea & broad bean flour'),
          checkItem('Whole Korarima / False Cardamom (ኮረሪማ) — [ ] Whole pods  [ ] Crushed seed'),
          checkItem('Korerima / Mekelesha (መከለሻ) — Finishing aromatic spice blend'),
          checkItem('Tikur Azmud / Black Nigella Seed (ጥቁር አዝሙድ)'),
          checkItem('Nech Azmud / White Cumin (ነጭ አዝሙድ)'),
          checkItem('Besobila / Sacred Basil (በሶብላ) & Senafech / Mustard (ሰናፍጭ)'),
          checkItem('Fenugreek / Abish (አብሽ) & Rue / Tena Adam (ጤና አዳም)'),
          checkItem('Niter Kibbeh pre-made spiced clarified butter (የተነጠረ ቅቤ)'),
          ...fillLine('Where do your spices come from? (e.g. Directly imported from Gojjam, Gondar, Addis Ababa):'),
          ...fillLine('Other specialty spices you carry:', 2),

          heading2('Department C: Fresh Meat & Custom Butchery Counter'),
          question('4.4', 'Do you have an in-store Butchery / Meat Counter?'),
          checkItem('YES, we have a full fresh butchery counter'),
          checkItem('NO, we sell packaged meats only / no meat counter'),
          instructionPara('If YES, please check the cuts and meats you prepare:'),
          checkItem('Prime Beef for Kitfo (የክትፎ ስጋ) — Ultra-lean, freshly trimmed and minced on cold blocks'),
          checkItem('Tender Beef for Tibs (የጥብስ ስጋ) — Hand-cubed for sizzling pans'),
          checkItem('Fresh Lamb (የበግ ስጋ) — Whole, half, or cubed'),
          checkItem('Fresh Goat (የፍየል ስጋ) — Bone-in cubes for traditional wats'),
          checkItem('Specialty cuts: Dulet meats, Tripe, Liver, Gored Gored beef cubes'),
          checkItem('100% Halal certified meats available'),
          ...fillLine('What days does fresh meat arrive from the farm/distributor? (e.g. Monday, Wednesday, Saturday):'),

          heading2('Department D: Coffee & Traditional Ceremony (ቡና እና የቡና ማፍያ)'),
          question('4.5', 'What coffee items do you carry?'),
          checkItem('Raw Green Unroasted Beans (ጥሬ ቡና) — Origins: [ ] Yirgacheffe  [ ] Sidama  [ ] Harrar  [ ] Jimma'),
          checkItem('Freshly Pan-Roasted Coffee Beans or Ground Coffee (የተቆላ ቡና)'),
          checkItem('Handcrafted Clay Jebena Coffee Pots (የሸክላ ጀበና) with straw stands'),
          checkItem('Porcelain Cini Cups & Saucers (ሲኒ)'),
          checkItem('Traditional wooden coffee tables / Rekebot (ረከቦት)'),
          checkItem('Frankincense / Incense (ዕጣን - Itan) and charcoal burners (መባቻ)'),
          checkItem('Iron Roasting Pans (ብረት ምጣድ)'),
          ...fillLine('Do you roast coffee in the market for customers to smell or drink? Details:'),

          heading2('Department E: Flours, Grains & Pantry Staples'),
          question('4.6', 'Which teff grains, flours, and pulses do you sell?'),
          checkItem('Brown Teff Flour (የቡናማ ጤፍ ዱቄት) — Sizes: [ ] 5 lb  [ ] 25 lb  [ ] 50 lb commercial bags'),
          checkItem('White / Ivory Teff Flour (የነጭ ጤፍ ዱቄት) — Sizes: [ ] 5 lb  [ ] 25 lb  [ ] 50 lb bags'),
          checkItem('Whole Teff Grain'),
          checkItem('Red Lentils (ቀይ ምስር - Misir)'),
          checkItem('Yellow Split Peas (አተር ክክ - Kik)'),
          checkItem('Barley (ገብስ) & Wheat flour for Kocho / Bulla'),
          ...fillLine('List any specific teff brands you carry (e.g., Maskal Teff, Bob’s Red Mill, Imported):'),

          heading2('Department F: Cultural Goods, Clothing & Kitchenware'),
          question('4.7', 'Do you carry cultural and household items?'),
          checkItem('Handwoven Mesob dining tables (ባህላዊ መሶብ) — [ ] Small  [ ] Medium  [ ] Large communal'),
          checkItem('Electric Mitad Injera baking grills (e.g. Wass Electronics / Heritage grills)'),
          checkItem('Sefed woven cooling trays (ሰፌድ) & Akambalo mitad covers (አካምባሎ)'),
          checkItem('Traditional Ethiopian Habesha Kemis dresses, Netela scarves & Gabi blankets'),
          checkItem('Ethiopian Silver / Gold Crosses, jewelry, and artwork'),
          checkItem('Skin care, hair oils, Koba leaves, natural soaps'),
          ...fillLine('Other cultural goods in stock:', 2),

          heading2('Department G: Café, Prepared Food or Deli (If any)'),
          question('4.8', 'Do you serve any ready-to-eat hot food or drinks in the shop?'),
          checkItem('NO — strictly retail grocery & butchery'),
          checkItem('YES — we have a small café / hot food counter serving:'),
          ...fillLine('Details of prepared food / coffee served:', 2),

          new Paragraph({ spacing: { after: 200 } }),

          // SECTION 5
          heading1('SECTION 5: Fresh Schedule & Weekly Specials'),
          instructionPara('The website features a "Fresh Delivery Schedule" so customers know which days to visit for warm injera, fresh meat, or weekend bakes.'),

          question('5.1', 'What happens on each day of the week?'),
          ...fillLine('Monday – Thursday Fresh Highlights (e.g. Daily morning fresh injera & butchery cuts):', 2),
          ...fillLine('Friday Highlights (e.g. Weekend restock, restaurant wholesale pickups, fresh ambasha):', 2),
          ...fillLine('Saturday Highlights (e.g. Community shopping day, fresh lamb delivery):', 2),
          ...fillLine('Sunday Highlights (e.g. Family shopping, fresh coffee roasting):', 2),

          new Paragraph({ spacing: { after: 200 } }),

          // SECTION 6
          heading1('SECTION 6: Ordering, Pickup & Delivery Services'),
          instructionPara('How can customers get your goods?'),

          checkItem('Walk-in In-Store Shopping Only'),
          checkItem('Call-Ahead Phone Orders for quick counter pickup'),
          checkItem('WhatsApp Ordering for custom butcher meat & bulk spice pickup'),
          checkItem('Local Delivery via delivery apps: [ ] DoorDash  [ ] UberEats  [ ] Grubhub  [ ] In-house delivery'),
          checkItem('Nationwide Shipping across the USA (shipping dry spices, teff flour, coffee)'),
          ...fillLine('Delivery / Shipping notes or restrictions:', 2),

          new Paragraph({ spacing: { after: 200 } }),

          // SECTION 7
          heading1('SECTION 7: Wholesale & Restaurant Supplier Services'),
          instructionPara('Do you supply local Ethiopian restaurants, catering services, or church events?'),

          checkItem('YES, we offer wholesale bulk pricing to restaurants and commercial chefs'),
          checkItem('NO, we focus exclusively on retail individual shoppers'),
          instructionPara('If YES, which bulk products do you offer?'),
          checkItem('Bulk 25 lb / 50 lb Berbere and Shiro sacks'),
          checkItem('Commercial Teff flour sacks (25 lb / 50 lb)'),
          checkItem('Daily wholesale Injera crates (custom quantity restaurant delivery or pickup)'),
          checkItem('Whole lamb / beef wholesale cuts'),
          checkItem('Bulk 50 lb green coffee burlap sacks'),
          ...fillLine('Wholesale contact person & direct phone number:'),

          new Paragraph({ spacing: { after: 200 } }),

          // SECTION 8
          heading1('SECTION 8: Store Heritage & "About Us" Story'),
          instructionPara('Customers love knowing the heart and family behind Yenat Market. What makes your store special?'),

          question('8.1', 'The Meaning & Origin of "Yenat Market" (የእናት ገበያ)'),
          instructionPara('Why did you choose the name "Yenat" ("Mother\'s")? Is it in honor of a mother, grandmother, or family tradition?'),
          ...fillLine('', 3),

          question('8.2', 'Founding Year & Store Background'),
          ...fillLine('Year Yenat Market was founded / opened:'),
          ...fillLine('Founder / Owner name(s):'),
          ...fillLine('Where in Ethiopia are the roots of the family / spices? (e.g. Gojjam, Gondar, Addis, Harar):'),
          ...fillLine('What is your main mission for the Ethiopian community and local food lovers?', 3),

          new Paragraph({ spacing: { after: 200 } }),

          // SECTION 9
          heading1('SECTION 9: Frequently Asked Questions (FAQ) & Policies'),
          instructionPara('What are the questions customers ask most often when they call or visit?'),

          question('9.1', 'Common Questions & Your Answers:'),
          ...fillLine('Question 1:'),
          ...fillLine('Answer 1:'),
          ...fillLine('Question 2:'),
          ...fillLine('Answer 2:'),
          ...fillLine('Question 3:'),
          ...fillLine('Answer 3:'),

          question('9.2', 'Store Policies'),
          ...fillLine('Return / Exchange policy (e.g. unopened dry goods within 7 days, perishable meats final sale):', 2),

          new Paragraph({ spacing: { after: 260 } }),

          // SECTION 10 - FINAL CALL TO ACTION (WHATSAPP PHOTOS)
          createBoxedCallout(
            '📸 MANDATORY FINAL STEP: SEND YOUR PHOTOS & VIDEOS VIA WHATSAPP',
            [
              'Real photos are the #1 thing that makes a website look authentic, trustworthy, and mouth-watering!',
              'Please open WhatsApp and send all the photos and video clips you have of Yenat Market to our phone number.',
              '',
              '📱 WHATSAPP NUMBER TO SEND PHOTOS TO:  [                                                                         ]',
              '👤 CONTACT NAME:                       [                                                                         ]',
              '',
              '✅ PHOTO CHECKLIST — PLEASE SEND AS MANY AS YOU CAN:',
              '  1. Storefront Exterior: Clear front view showing your building sign & entrance (day & evening).',
              '  2. Store Interior / Aisles: Clean, well-lit shots of your shelves and dry goods aisles.',
              '  3. Fresh Injera Display: Close-up photos of fresh teff injera rolls, packages, or mitad baking.',
              '  4. Spice Bar & Packaging: Jars, bowls, and bulk sacks of Berbere, Mitmita, Korarima, Shiro.',
              '  5. Butchery Counter: Clean meat display cases, Kitfo beef cuts, and fresh lamb/tibs cuts.',
              '  6. Coffee Ceremony Corner: Clay Jebena pots, Cini cups, Rekebot tables, and green/roasted coffee beans.',
              '  7. Cultural Items & Mesobs: Handwoven Mesob tables, traditional Habesha dresses, and Mitad griddles.',
              '  8. Official Logo File: High-resolution image of your logo, store sign, shopping bag, or business card.',
              '  9. Owner / Team Photo: A warm, smiling photo of the owner or staff behind the counter (builds great trust!).',
              ' 10. Short 10–15 Second Video Tour: Walk through the front door showing the aisles and warm atmosphere.',
              '',
              '💡 TIP FOR BEST QUALITY ON WHATSAPP: When sending photos on WhatsApp, tap "Attach (+) -> Document" (or select "HD Quality") so the photos are sent in original, crystal-clear high resolution without compression!',
            ],
            HIGHLIGHT_BG,
            PRIMARY
          ),

          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 240, after: 80 },
            children: [
              new TextRun({
                text: 'Thank you for your partnership! Once we receive your answers and WhatsApp photos,',
                bold: true,
                size: 21,
                color: PRIMARY,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 120 },
            children: [
              new TextRun({
                text: 'your official Yenat Market website will be transformed with your 100% real information and launched live!',
                bold: true,
                size: 21,
                color: SECONDARY,
              }),
            ],
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const outputPath = path.resolve('Yenat_Market_Website_Questionnaire.docx');
  fs.writeFileSync(outputPath, buffer);
  console.log(`Document generated successfully at: ${outputPath}`);
}

buildDoc().catch(console.error);
