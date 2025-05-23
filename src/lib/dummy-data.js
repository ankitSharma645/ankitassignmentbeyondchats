import { generateId } from './utils';
import { aiPersonalities } from './ai-personalities';

// Predefined magic prompts
export const magicPrompts = [
  {
    category: 'Refunds',
    prompts: [
      "How do I process a refund for a customer?",
      "What's our policy on refunds for damaged items?",
      "Can I offer a partial refund for a late delivery?",
      "How long do refunds typically take to process?",
      "What documentation is needed for a refund request?",
      "How do I handle international refunds?",
      "What's the procedure for refunding to a different payment method?",
      "Can customers get refunds after the 30-day window?"
    ]
  },
  {
    category: 'Shipping',
    prompts: [
      "What are our shipping timeframes?",
      "How do I handle a lost package inquiry?",
      "What shipping options do we offer internationally?",
      "How can a customer track their order?",
      "What's our policy on shipping delays?",
      "How do we handle customs fees for international orders?",
      "What carriers do we use for expedited shipping?",
      "How do I process a shipping address change?"
    ]
  },
  {
    category: 'Account Issues',
    prompts: [
      "How can I help a customer reset their password?",
      "What should I do if a customer can't access their account?",
      "How do customers update their payment information?",
      "What information can customers edit in their profile?",
      "How do I help merge duplicate accounts?",
      "What's the process for deleting a customer account?",
      "How do I help a customer with two-factor authentication issues?",
      "What should I do if a customer reports unauthorized account activity?"
    ]
  },
  {
    category: 'Product Information',
    prompts: [
      "Where can I find detailed product specifications?",
      "How do I check if a product is in stock?",
      "What's our warranty policy?",
      "How do I explain product compatibility to customers?",
      "Where can I find product comparison charts?",
      "What are the care instructions for our products?",
      "How do I find information about product materials and ingredients?",
      "What's our policy on discontinued products?"
    ]
  },
  {
    category: 'Returns',
    prompts: [
      "What's our return policy?",
      "How do I process a return for a customer?",
      "What's the timeframe for returns?",
      "Do customers need the original packaging to return an item?",
      "How do I generate a return shipping label?",
      "What items are not eligible for returns?",
      "How do we handle returns of personalized items?",
      "What's the process for exchanges instead of returns?"
    ]
  },
  {
    category: 'Technical Support',
    prompts: [
      "How do I troubleshoot common software issues?",
      "What's the process for escalating technical problems?",
      "Where can I find the latest software documentation?",
      "How do I help customers with installation problems?",
      "What system requirements should I check for compatibility issues?",
      "How do I guide customers through the software update process?",
      "What are common solutions for connectivity problems?",
      "How do I help customers recover lost data?"
    ]
  }
];

// Sample conversations for history
export const sampleConversations = [
  {
    id: generateId(),
    title: "Refund Process Inquiry",
    preview: "How do I process a refund for a customer?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    starred: true,
    messages: [
      {
        id: generateId(),
        content: "How do I process a refund for a customer?",
        sender: "user",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      },
      {
        id: generateId(),
        content: "To process a refund for a customer, you'll need to follow these steps:\n\n1. Verify the order using the order number or customer email\n2. Confirm the reason for the refund request\n3. Check if the item has been shipped or delivered\n4. Process the refund through our system\n\nRefunds are typically processed within 3-5 business days, and the customer will receive an email confirmation once the refund is initiated.\n\nIf the order was placed by mistake and hasn't shipped yet, you can cancel it immediately for a full refund. If it has already shipped, the customer will need to return the item once received.",
        sender: "ai",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 30), // 30 seconds later
        sources: [
          {
            id: "1",
            title: "Getting a refund",
            content: "To process a refund, customers need to provide their order number and reason for the refund. Refunds are typically processed within 3-5 business days, depending on the payment method used.\n\nFor credit card payments, refunds will be issued to the original payment method. For gift cards or store credit, refunds will be issued as store credit.\n\nCustomers can request refunds through their account dashboard or by contacting customer support directly.",
            category: "Refund Policy",
            lastUpdated: "2 months ago",
            relevance: 0.95,
          },
          {
            id: "2",
            title: "Refund for an order placed by mistake",
            content: "If a customer placed an order by mistake, they should contact customer support immediately. If the order hasn't been shipped yet, we can cancel it and issue a full refund.\n\nIf the order has already been shipped, the customer will need to return the item once received. Return shipping costs may apply unless the mistake was on our end.\n\nTo expedite the process, customers should provide their order number and explain that the order was placed by mistake.",
            category: "Refund Policy",
            lastUpdated: "3 months ago",
            relevance: 0.92,
          }
        ]
      }
    ]
  },
  {
    id: generateId(),
    title: "Shipping Timeframes",
    preview: "What are our standard shipping timeframes?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    starred: false,
    messages: [
      {
        id: generateId(),
        content: "What are our standard shipping timeframes?",
        sender: "user",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      },
      {
        id: generateId(),
        content: "Our standard shipping timeframes are as follows:\n\n- Standard Shipping: 3-5 business days\n- Express Shipping: 1-2 business days\n- International Shipping: 7-14 business days\n\nThese timeframes begin once the order has been processed and shipped, not from the time the order is placed. Order processing typically takes 1-2 business days.\n\nCustomers receive a shipping confirmation email with tracking information once their order ships. If they haven't received this email within 48 hours of placing their order, you should check the order status in our system.",
        sender: "ai",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 + 1000 * 45), // 45 seconds later
        sources: [
          {
            id: "8",
            title: "Shipping timeframes",
            content: "Our standard shipping timeframes are as follows:\n\n- Standard Shipping: 3-5 business days\n- Express Shipping: 1-2 business days\n- International Shipping: 7-14 business days\n\nPlease note that these timeframes begin once your order has been processed and shipped, not from the time the order is placed. Order processing typically takes 1-2 business days.",
            category: "Shipping Information",
            lastUpdated: "2 weeks ago",
            relevance: 0.94,
          }
        ]
      }
    ]
  },
  {
    id: generateId(),
    title: "Account Recovery Options",
    preview: "How do I help a customer who can't access their account?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
    starred: true,
    messages: [
      {
        id: generateId(),
        content: "How do I help a customer who can't access their account?",
        sender: "user",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72),
      },
      {
        id: generateId(),
        content: "If a customer is having trouble accessing their account, here are the steps you should guide them through:\n\n1. First, direct them to the 'Forgot Password' link on the login page. This will send a password reset email to their registered email address.\n\n2. If they don't receive the password reset email, ask them to check their spam folder and verify they're using the correct email address.\n\n3. If they've forgotten which email they used to register, you can look up their account using their name and any previous order numbers.\n\n4. For security purposes, never provide the full email address associated with an account. Instead, confirm with the customer by sharing the first few characters followed by asterisks.",
        sender: "ai",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72 + 1000 * 35), // 35 seconds later
        sources: [
          {
            id: "11",
            title: "Account recovery options",
            content: "If you're unable to access your account, we offer several recovery options:\n\n1. Password Reset: Use the 'Forgot Password' link on the login page to receive a password reset email.\n\n2. Email Recovery: If you've forgotten which email you used, contact customer support with your name and any order numbers you may have.\n\n3. Account Verification: For security purposes, we may ask you to verify your identity with previous order details or the payment method used.",
            category: "Account Management",
            lastUpdated: "1 month ago",
            relevance: 0.96,
          }
        ]
      }
    ]
  },
  {
    id: generateId(),
    title: "Return Policy Questions",
    preview: "What's our policy on returns for opened items?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 120), // 5 days ago
    starred: false,
    messages: [
      {
        id: generateId(),
        content: "What's our policy on returns for opened items?",
        sender: "user",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 120),
      },
      {
        id: generateId(),
        content: "For opened items, our return policy is as follows:\n\n1. Most opened items can be returned within 30 days of delivery, but they must be in resalable condition with all original packaging and accessories.\n\n2. Certain categories have specific restrictions:\n   - Electronics: Cannot be returned if the factory seal is broken, unless defective\n   - Beauty products: Cannot be returned if opened, unless there's an allergic reaction\n   - Food items: Cannot be returned if opened under any circumstances\n\n3. Items that show signs of excessive use or damage beyond normal inspection may be subject to a restocking fee of up to 15%.\n\n4. For hygiene reasons, certain items like underwear, swimwear, and earrings cannot be returned if the hygiene seal has been broken or removed.",
        sender: "ai",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 120 + 1000 * 40), // 40 seconds later
        sources: [
          {
            id: "20",
            title: "Return Policy for Opened Items",
            content: "While we accept returns on most opened items within 30 days of delivery, the item must be in resalable condition with all original packaging and accessories included. Certain categories have specific restrictions, such as electronics with broken factory seals, opened beauty products, and food items. Items showing signs of excessive use may incur a restocking fee.",
            category: "Return Policy",
            lastUpdated: "1 month ago",
            relevance: 0.98,
          }
        ]
      },
      {
        id: generateId(),
        content: "What about items that were gifts? Can customers return those without a receipt?",
        sender: "user",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 120 + 1000 * 300), // 5 minutes later
      },
      {
        id: generateId(),
        content: "Yes, customers can return gifts without the original receipt, but there are some specific procedures to follow:\n\n1. If the customer has a gift receipt, they can process a standard return and receive store credit or exchange the item.\n\n2. Without any receipt (original or gift), we can still process the return if:\n   - The customer can provide the order number\n   - The purchaser's name or email address is known\n   - The item has our store tags or identifiable packaging\n\n3. For returns without any proof of purchase, we can only offer store credit at the current selling price of the item, not the original purchase price.\n\n4. Gift returns are processed discreetly, and the original purchaser is not notified about the return.\n\n5. The same condition requirements apply to gift returns as to regular returns - items must be unused or in resalable condition with all original packaging.",
        sender: "ai",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 120 + 1000 * 340), // 40 seconds after the question
        sources: [
          {
            id: "21",
            title: "Gift Return Policy",
            content: "We accept returns for gifts even without the original purchase receipt. With a gift receipt, customers can receive store credit or exchange the item. Without any receipt, we can still process returns if the customer can provide alternative verification, but store credit will be issued at the current selling price. Gift returns are always processed discreetly without notifying the original purchaser.",
            category: "Return Policy",
            lastUpdated: "2 months ago",
            relevance: 0.95,
          }
        ]
      }
    ]
  },
  {
    id: generateId(),
    title: "Product Warranty Information",
    preview: "How do I explain our warranty policy to customers?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 168), // 7 days ago
    starred: false,
    messages: [
      {
        id: generateId(),
        content: "How do I explain our warranty policy to customers?",
        sender: "user",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 168),
      },
      {
        id: generateId(),
        content: "When explaining our warranty policy to customers, cover these key points:\n\n1. Warranty Duration: Most products come with a 1-year limited warranty from the date of purchase. Premium and signature products have extended warranties of 2-5 years.\n\n2. What's Covered: Manufacturing defects and product failures under normal use conditions are covered. This includes issues with materials, workmanship, and functionality.\n\n3. What's Not Covered: Damage from accidents, misuse, improper care, normal wear and tear, or modifications are not covered. Consumable parts (like batteries) typically have shorter warranty periods.\n\n4. How to Claim: Customers need their proof of purchase and product serial number. They can initiate claims through our website, customer service, or in-store.\n\n5. Resolution Options: Depending on the issue, we may repair the product, replace it with the same or equivalent model, or issue a store credit if the item is discontinued.\n\n6. Extended Warranty: Customers can purchase additional protection plans at checkout for coverage beyond the standard warranty period.",
        sender: "ai",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 168 + 1000 * 50), // 50 seconds later
        sources: [
          {
            id: "25",
            title: "Warranty Policy Overview",
            content: "Our standard warranty covers manufacturing defects and product failures under normal use for 1 year from purchase. Premium products have longer warranties of 2-5 years. Damage from accidents, misuse, or modifications is not covered. Customers need proof of purchase to make warranty claims.",
            category: "Product Information",
            lastUpdated: "3 months ago",
            relevance: 0.97,
          },
          {
            id: "26",
            title: "Warranty Claim Process",
            content: "To make a warranty claim, customers need their proof of purchase and product serial number. Claims can be initiated online, through customer service, or in-store. We may repair, replace, or issue store credit depending on the situation and product availability.",
            category: "Customer Service",
            lastUpdated: "1 month ago",
            relevance: 0.92,
          }
        ]
      }
    ]
  }
];

// Generate dummy sources based on the query
export function generateDummySources(query, isFollowUp = false) {
  const lowerQuery = query.toLowerCase();
  let sources = [];

  // Generate different sources based on the query content
  if (lowerQuery.includes("refund")) {
    sources = [
      {
        id: "1",
        title: "Getting a refund",
        content:
          "To process a refund, customers need to provide their order number and reason for the refund. Refunds are typically processed within 3-5 business days, depending on the payment method used.\n\nFor credit card payments, refunds will be issued to the original payment method. For gift cards or store credit, refunds will be issued as store credit.\n\nCustomers can request refunds through their account dashboard or by contacting customer support directly.",
        category: "Refund Policy",
        lastUpdated: "2 months ago",
        relevance: 0.95,
      },
      {
        id: "2",
        title: "Refund for an order placed by mistake",
        content:
          "If a customer placed an order by mistake, they should contact customer support immediately. If the order hasn't been shipped yet, we can cancel it and issue a full refund.\n\nIf the order has already been shipped, the customer will need to return the item once received. Return shipping costs may apply unless the mistake was on our end.\n\nTo expedite the process, customers should provide their order number and explain that the order was placed by mistake.",
        category: "Refund Policy",
        lastUpdated: "3 months ago",
        relevance: 0.92,
      },
      {
        id: "3",
        title: "Refund for an unwanted gift",
        content:
          "Unwanted gifts can be returned for a refund or store credit. The recipient will need the gift receipt or order number to process the return.\n\nWithout a gift receipt, we can still process a return for store credit at the current selling price of the item.\n\nGift returns do not notify the original purchaser and can be processed discreetly through customer support or in-store.",
        category: "Gift Returns",
        lastUpdated: "1 month ago",
        relevance: 0.88,
      },
      {
        id: "4",
        title: "Refund timeframes by payment method",
        content:
          "Refund processing times vary by payment method:\n\n- Credit/Debit Cards: 3-5 business days\n- PayPal: 1-2 business days\n- Store Credit: Immediate\n- Bank Transfers: 5-7 business days\n\nPlease note that while we process refunds immediately, your financial institution may take additional time to reflect the refund in your account.",
        category: "Payment Information",
        lastUpdated: "2 weeks ago",
        relevance: 0.85,
      },
      {
        id: "5",
        title: "International refund policy",
        content:
          "For international orders, refunds follow the same general policy with a few exceptions. International shipping costs are non-refundable unless the return is due to a defective product or our error.\n\nDue to currency conversion, the exact refund amount may vary slightly from the original charge. This is due to fluctuations in exchange rates between the time of purchase and the time of refund.\n\nInternational refunds typically take 7-10 business days to process due to additional banking procedures.",
        category: "International Orders",
        lastUpdated: "1 month ago",
        relevance: 0.82,
      },
      {
        id: "6",
        title: "Partial refunds",
        content:
          "Partial refunds may be issued in cases where only part of an order is being returned, or when items are returned in a condition that doesn't warrant a full refund.\n\nFor items returned with missing parts or packaging, a restocking fee of up to 15% may be deducted from the refund amount.\n\nPartial refunds are processed in the same timeframe as full refunds, following the same payment method guidelines.",
        category: "Refund Policy",
        lastUpdated: "3 months ago",
        relevance: 0.78,
      },
      {
        id: "7",
        title: "Refund vs. Exchange",
        content:
          "Customers have the option to request either a refund or an exchange for returned items. Exchanges are recommended when the customer wants a different size, color, or slightly different model of the same product.\n\nExchanges are processed more quickly than refunds, as they don't require payment reversal. For exchanges of equal value, no additional payment is needed.\n\nIf the exchanged item costs more than the original, the customer will need to pay the difference. If it costs less, we can refund the difference or provide store credit.",
        category: "Returns & Exchanges",
        lastUpdated: "2 months ago",
        relevance: 0.75,
      },
    ];
  } else if (lowerQuery.includes("shipping") || lowerQuery.includes("delivery")) {
    sources = [
      {
        id: "8",
        title: "Shipping timeframes",
        content:
          "Our standard shipping timeframes are as follows:\n\n- Standard Shipping: 3-5 business days\n- Express Shipping: 1-2 business days\n- International Shipping: 7-14 business days\n\nPlease note that these timeframes begin once your order has been processed and shipped, not from the time the order is placed. Order processing typically takes 1-2 business days.",
        category: "Shipping Information",
        lastUpdated: "2 weeks ago",
        relevance: 0.94,
      },
      {
        id: "9",
        title: "Tracking your order",
        content:
          "Once your order ships, you'll receive a shipping confirmation email with a tracking number. You can use this tracking number on our website or the carrier's website to track your package.\n\nTracking information may take up to 24 hours to update after the shipping label is created. If your tracking hasn't updated after 48 hours, please contact customer support.\n\nFor international orders, tracking may be limited once the package leaves the origin country.",
        category: "Order Tracking",
        lastUpdated: "1 month ago",
        relevance: 0.92,
      },
      {
        id: "10",
        title: "Shipping to multiple addresses",
        content:
          "We offer the option to ship items from a single order to multiple addresses. This is particularly useful for sending gifts directly to recipients.\n\nTo use this feature, select 'Ship to multiple addresses' during checkout. You'll be able to specify which items go to which address.\n\nPlease note that shipping fees will apply to each address, and gift wrapping can be selected individually for each shipment.",
        category: "Shipping Options",
        lastUpdated: "3 months ago",
        relevance: 0.85,
      },
      {
        id: "30",
        title: "Shipping carriers and services",
        content:
          "We partner with several shipping carriers to provide reliable delivery services:\n\n- USPS for standard domestic shipping\n- UPS and FedEx for expedited domestic shipping\n- DHL for international shipping\n\nThe carrier used for your order depends on your location, selected shipping speed, and package size. During checkout, you'll see the available shipping options for your order.",
        category: "Shipping Information",
        lastUpdated: "1 month ago",
        relevance: 0.83,
      },
      {
        id: "31",
        title: "Shipping restrictions and prohibited items",
        content:
          "Certain items cannot be shipped to specific locations due to local regulations, customs restrictions, or carrier policies. These may include:\n\n- Aerosols and flammable items\n- Alcohol and tobacco products\n- Perishable goods\n- Oversized or overweight packages\n\nDuring checkout, you'll be notified if any items in your cart cannot be shipped to your selected address.",
        category: "Shipping Policies",
        lastUpdated: "2 months ago",
        relevance: 0.80,
      },
    ];
  } else if (lowerQuery.includes("account") || lowerQuery.includes("login")) {
    sources = [
      {
        id: "11",
        title: "Account recovery options",
        content:
          "If you're unable to access your account, we offer several recovery options:\n\n1. Password Reset: Use the 'Forgot Password' link on the login page to receive a password reset email.\n\n2. Email Recovery: If you've forgotten which email you used, contact customer support with your name and any order numbers you may have.\n\n3. Account Verification: For security purposes, we may ask you to verify your identity with previous order details or the payment method used.",
        category: "Account Management",
        lastUpdated: "1 month ago",
        relevance: 0.96,
      },
      {
        id: "12",
        title: "Managing saved payment methods",
        content:
          "For your convenience, you can save payment methods in your account for faster checkout. To manage these:\n\n1. Log in to your account\n2. Navigate to 'Payment Methods' in your account settings\n3. From here, you can add new payment methods, delete existing ones, or update card information\n\nAll payment information is securely stored using industry-standard encryption. We never store complete credit card numbers, only the last four digits for identification purposes.",
        category: "Payment Information",
        lastUpdated: "2 months ago",
        relevance: 0.88,
      },
      {
        id: "13",
        title: "Account privacy settings",
        content:
          "We take your privacy seriously and offer several settings to control your data:\n\n1. Marketing Preferences: Control which types of communications you receive from us\n2. Data Sharing: Manage how your shopping data is used for recommendations\n3. Account Visibility: Control whether your reviews and profile are public\n\nTo access these settings, log in and navigate to 'Privacy Settings' in your account dashboard. Changes to these settings take effect immediately.",
        category: "Privacy & Security",
        lastUpdated: "3 weeks ago",
        relevance: 0.85,
      },
      {
        id: "32",
        title: "Account security best practices",
        content:
          "To keep your account secure, we recommend the following practices:\n\n1. Use a strong, unique password that you don't use for other websites\n2. Enable two-factor authentication for an extra layer of security\n3. Regularly review your order history and payment methods for unauthorized activity\n4. Log out when using shared or public computers\n5. Keep your contact information up to date\n\nIf you notice any suspicious activity, contact customer support immediately to secure your account.",
        category: "Account Security",
        lastUpdated: "2 weeks ago",
        relevance: 0.87,
      },
      {
        id: "33",
        title: "Managing multiple user accounts",
        content:
          "For business customers, we offer the ability to create and manage multiple user accounts under a single organization. This allows:\n\n1. Different permission levels for various team members\n2. Centralized billing while maintaining separate user logins\n3. Shared order history and account information\n\nTo set up multiple user accounts, contact our business support team with your company information and the number of users you need to add.",
        category: "Business Accounts",
        lastUpdated: "1 month ago",
        relevance: 0.82,
      },
    ];
  } else if (lowerQuery.includes("return") || lowerQuery.includes("exchange")) {
    sources = [
      {
        id: "20",
        title: "Return Policy for Opened Items",
        content:
          "While we accept returns on most opened items within 30 days of delivery, the item must be in resalable condition with all original packaging and accessories included. Certain categories have specific restrictions, such as electronics with broken factory seals, opened beauty products, and food items. Items showing signs of excessive use may incur a restocking fee.",
        category: "Return Policy",
        lastUpdated: "1 month ago",
        relevance: 0.98,
      },
      {
        id: "21",
        title: "Gift Return Policy",
        content:
          "We accept returns for gifts even without the original purchase receipt. With a gift receipt, customers can receive store credit or exchange the item. Without any receipt, we can still process returns if the customer can provide alternative verification, but store credit will be issued at the current selling price. Gift returns are always processed discreetly without notifying the original purchaser.",
        category: "Return Policy",
        lastUpdated: "2 months ago",
        relevance: 0.95,
      },
      {
        id: "22",
        title: "Return Shipping Options",
        content:
          "Customers have several options for returning items:\n\n1. Free in-store returns at any of our retail locations\n2. Prepaid return shipping labels (available in account dashboard)\n3. Customer-arranged shipping to our returns center\n\nFor defective items or our error, return shipping is always free. For preference-based returns, a shipping fee may be deducted from the refund amount unless the customer has a premium membership.",
        category: "Returns & Exchanges",
        lastUpdated: "3 weeks ago",
        relevance: 0.92,
      },
      {
        id: "23",
        title: "International Returns",
        content:
          "International customers can return items, but the process differs from domestic returns. Return shipping for international orders is the customer's responsibility unless the item is defective. Due to customs regulations, certain items cannot be returned across international borders. International returns typically take 2-3 weeks to process once received at our returns center.",
        category: "International Orders",
        lastUpdated: "2 months ago",
        relevance: 0.88,
      },
      {
        id: "24",
        title: "Seasonal Return Policy Extensions",
        content:
          "During holiday periods, we extend our standard return window. Items purchased between November 1 and December 24 can be returned until January 31 of the following year. This extension applies to all items that normally qualify for returns, giving customers extra time to make decisions about holiday gifts.",
        category: "Return Policy",
        lastUpdated: "10 months ago",
        relevance: 0.85,
      },
    ];
  } else if (lowerQuery.includes("warranty") || lowerQuery.includes("guarantee")) {
    sources = [
      {
        id: "25",
        title: "Warranty Policy Overview",
        content:
          "Our standard warranty covers manufacturing defects and product failures under normal use for 1 year from purchase. Premium products have longer warranties of 2-5 years. Damage from accidents, misuse, or modifications is not covered. Customers need proof of purchase to make warranty claims.",
        category: "Product Information",
        lastUpdated: "3 months ago",
        relevance: 0.97,
      },
      {
        id: "26",
        title: "Warranty Claim Process",
        content:
          "To make a warranty claim, customers need their proof of purchase and product serial number. Claims can be initiated online, through customer service, or in-store. We may repair, replace, or issue store credit depending on the situation and product availability.",
        category: "Customer Service",
        lastUpdated: "1 month ago",
        relevance: 0.92,
      },
      {
        id: "27",
        title: "Extended Warranty Options",
        content:
          "Customers can purchase extended warranty plans at checkout to cover their products beyond the standard warranty period. These plans offer the same coverage as the standard warranty but for an additional 1-3 years. Extended warranties are especially recommended for high-value electronics and appliances.",
        category: "Product Protection",
        lastUpdated: "2 months ago",
        relevance: 0.90,
      },
      {
        id: "28",
        title: "International Warranty Coverage",
        content:
          "Our warranty is valid worldwide, but service options may vary by country. In regions where we don't have service centers, customers may need to ship products to the nearest service location at their own expense. Replacement parts and repair times may also vary based on local availability.",
        category: "International Support",
        lastUpdated: "4 months ago",
        relevance: 0.85,
      },
      {
        id: "29",
        title: "Satisfaction Guarantee",
        content:
          "In addition to our warranty, we offer a 30-day satisfaction guarantee on most products. If a customer is not completely satisfied with their purchase for any reason, they can return it within 30 days for a full refund or exchange. This guarantee applies even if the product has been used, as long as it's not damaged.",
        category: "Customer Policies",
        lastUpdated: "2 months ago",
        relevance: 0.88,
      },
    ];
  } else {
    // Generic sources for other queries
    sources = [
      {
        id: "14",
        title: "Frequently Asked Questions",
        content:
          "This comprehensive FAQ covers the most common questions our customers ask. Topics include account management, ordering, shipping, returns, and product information.\n\nIf you can't find the answer to your question here, please contact our customer support team through chat, email, or phone.",
        category: "General Information",
        lastUpdated: "1 week ago",
        relevance: 0.9,
      },
      {
        id: "15",
        title: "Contact Customer Support",
        content:
          "Our customer support team is available through multiple channels:\n\n- Live Chat: Available 24/7 on our website\n- Email: support@example.com (response within 24 hours)\n- Phone: 1-800-123-4567 (Mon-Fri, 9am-6pm EST)\n\nFor the fastest response, please have your order number ready and provide a clear description of your issue or question.",
        category: "Support Information",
        lastUpdated: "2 weeks ago",
        relevance: 0.88,
      },
      {
        id: "16",
        title: "Product Care Guidelines",
        content:
          "To get the most out of your products, follow these care guidelines:\n\n1. Always check the product-specific care instructions included with your item\n2. For clothing, follow the washing and drying instructions on the label\n3. For electronics, avoid exposure to extreme temperatures and moisture\n4. For furniture, use recommended cleaning products and avoid direct sunlight\n\nProper care extends the life of your products and may be required to maintain warranty coverage.",
        category: "Product Information",
        lastUpdated: "1 month ago",
        relevance: 0.82,
      },
      {
        id: "17",
        title: "Membership Benefits",
        content:
          "Our premium membership program offers several benefits:\n\n- Free expedited shipping on all orders\n- Early access to new products and sales\n- Extended return window (60 days instead of 30)\n- Exclusive member-only discounts\n- Free gift wrapping\n\nMembership costs $49/year and typically pays for itself within 2-3 orders through shipping savings alone.",
        category: "Membership Program",
        lastUpdated: "3 weeks ago",
        relevance: 0.80,
      },
      {
        id: "18",
        title: "Gift Options",
        content:
          "We offer several gift options to make your purchase special:\n\n1. Gift wrapping with choice of paper and ribbon\n2. Personalized gift messages\n3. Gift receipts that don't show prices\n4. E-gift cards delivered instantly via email\n5. Physical gift cards that can be mailed\n\nGift options can be selected during checkout. Gift wrapping costs $5 per item, while gift messages and gift receipts are complimentary.",
        category: "Shopping Information",
        lastUpdated: "2 months ago",
        relevance: 0.78,
      },
      {
        id: "19",
        title: "Corporate Social Responsibility",
        content:
          "Our company is committed to sustainable and ethical business practices:\n\n1. Environmental Initiatives: Carbon-neutral shipping, sustainable packaging, and energy-efficient facilities\n2. Ethical Sourcing: Fair trade partnerships and supply chain transparency\n3. Community Impact: Donation program that gives 1% of profits to local charities\n\nFor more information about our sustainability efforts, visit the 'About Us' section of our website.",
        category: "Company Information",
        lastUpdated: "3 months ago",
        relevance: 0.75,
      },
    ];
  }

  // For follow-up queries, add some additional context-specific sources
  if (isFollowUp) {
    sources.unshift({
      id: "follow-1",
      title: "Additional information based on your follow-up",
      content:
        "Based on your follow-up question, here is some additional context that might be helpful.\n\nOur agents are empowered to make decisions that best serve the customer's needs, even if they sometimes fall outside our standard policies. If you believe a special exception is warranted, please explain the circumstances clearly.\n\nWe track customer satisfaction after each interaction, so providing a complete and helpful response is our priority.",
      category: "Agent Guidelines",
      lastUpdated: "1 day ago",
      relevance: 0.98,
    });
  }

  // Randomize the order slightly but keep high relevance items near the top
  return sources.sort((a, b) => Math.random() * 0.1 - 0.05 + (b.relevance - a.relevance));
}

// Generate dummy AI response based on the query and sources
export function generateDummyResponse(query, sources, isFollowUp = false, personality = 'friendly') {
  const lowerQuery = query.toLowerCase();
  let response = "";

  if (lowerQuery.includes("refund")) {
    if (isFollowUp) {
      response = "Based on your follow-up, I can provide more specific details about our refund process.\n\nRefunds are typically processed within 3-5 business days after we receive the returned item. The money will be returned to the original payment method used for the purchase.\n\nIf the customer paid with a credit card, they should see the refund appear as a credit on their statement within 1-2 billing cycles, depending on their card issuer's policies.\n\nFor expedited refunds, you can offer store credit which is applied immediately to the customer's account.";
    } else {
      response = "To process a refund for a customer, you'll need to follow these steps:\n\n1. Verify the order using the order number or customer email\n2. Confirm the reason for the refund request\n3. Check if the item has been shipped or delivered\n4. Process the refund through our system\n\nRefunds are typically processed within 3-5 business days, and the customer will receive an email confirmation once the refund is initiated.\n\nIf the order was placed by mistake and hasn't shipped yet, you can cancel it immediately for a full refund. If it has already shipped, the customer will need to return the item once received.";
    }
  } else if (lowerQuery.includes("shipping") || lowerQuery.includes("delivery")) {
    if (isFollowUp) {
      response = "Regarding your question about shipping delays, here's what you can tell the customer:\n\nIf a package is delayed beyond our estimated delivery timeframe, the customer should first check the tracking information for any updates or delivery exceptions.\n\nIf the tracking shows no movement for 48 hours, you can initiate a shipping inquiry with our logistics team. This process typically takes 1-2 business days, during which we'll contact the carrier for more information.\n\nFor significant delays (5+ days beyond the estimated delivery date), you're authorized to offer the customer a shipping refund or a 10% discount on their next order as a courtesy.";
    } else {
      response = "Our standard shipping timeframes are as follows:\n\n- Standard Shipping: 3-5 business days\n- Express Shipping: 1-2 business days\n- International Shipping: 7-14 business days\n\nThese timeframes begin once the order has been processed and shipped, not from the time the order is placed. Order processing typically takes 1-2 business days.\n\nCustomers receive a shipping confirmation email with tracking information once their order ships. If they haven't received this email within 48 hours of placing their order, you should check the order status in our system.";
    }
  } else if (lowerQuery.includes("account") || lowerQuery.includes("login")) {
    if (isFollowUp) {
      response = "For customers who are experiencing persistent login issues even after password reset, here are some additional troubleshooting steps you can suggest:\n\n1. Clear browser cookies and cache, then try logging in again\n2. Try using a different browser or device\n3. Ensure they're using the correct email address (check for typos)\n4. Check if their account may have been deactivated due to inactivity\n\nIf none of these steps resolve the issue, you can offer to manually verify their identity and reset their account access from the admin panel. This requires supervisor approval and should be documented in the customer's account notes.";
    } else {
      response = "If a customer is having trouble accessing their account, here are the steps you should guide them through:\n\n1. First, direct them to the 'Forgot Password' link on the login page. This will send a password reset email to their registered email address.\n\n2. If they don't receive the password reset email, ask them to check their spam folder and verify they're using the correct email address.\n\n3. If they've forgotten which email they used to register, you can look up their account using their name and any previous order numbers.\n\n4. For security purposes, never provide the full email address associated with an account. Instead, confirm with the customer by sharing the first few characters followed by asterisks.";
    }
  } else if (lowerQuery.includes("return") || lowerQuery.includes("exchange")) {
    if (isFollowUp) {
      response = "Regarding your question about special return circumstances, here's some additional information:\n\n1. For items that were purchased during a sale but returned after the sale ended, we still refund the original purchase price, not the current selling price.\n\n2. If a customer received a defective item and wants to exchange it for the same product, we can arrange for a replacement to be shipped immediately, without waiting for the return to be processed first.\n\n3. For bulky or heavy items that would be expensive to return, we sometimes offer partial refunds that allow the customer to keep the item, especially if the issue is minor.\n\n4. Return shipping for hazardous materials or restricted items may require special handling. In these cases, provide the customer with specific return instructions from our logistics team.";
    } else {
      response = "Our return policy allows customers to return most items within 30 days of delivery for a full refund. Here's what you need to know:\n\n1. Items must be in original condition with all packaging and accessories included.\n\n2. Customers can initiate returns through their account dashboard or by contacting customer support.\n\n3. We offer free return shipping for defective items or if we sent the wrong item. For preference-based returns, customers are responsible for return shipping costs unless they have a premium membership.\n\n4. Once we receive the returned item, refunds are processed within 3-5 business days to the original payment method.\n\n5. Some items have special return restrictions, including perishables, personalized items, and intimate apparel. These are noted on the product page.";
    }
  } else if (lowerQuery.includes("warranty") || lowerQuery.includes("guarantee")) {
    if (isFollowUp) {
      response = "Regarding warranty transfers and special circumstances, here's what you should know:\n\n1. Our warranty is transferable if the product is given as a gift or sold to another person, but the warranty period still begins from the original purchase date.\n\n2. For discontinued products that can't be repaired or replaced with the same model, we offer store credit for the current market value of a comparable product.\n\n3. If a customer has lost their proof of purchase but registered the product on our website, we can verify the warranty using their account information.\n\n4. For products that have been repaired under warranty, the remaining warranty period still applies to the entire product, and an additional 90-day warranty covers the specific repaired component.";
    } else {
      response = "Our warranty policy covers manufacturing defects and product failures under normal use conditions. Here are the key points to explain to customers:\n\n1. Most products come with a 1-year limited warranty from the date of purchase. Premium products have extended warranties of 2-5 years.\n\n2. The warranty covers defects in materials, workmanship, and functionality when the product is used as intended.\n\n3. Damage from accidents, misuse, improper care, normal wear and tear, or unauthorized modifications voids the warranty.\n\n4. To make a warranty claim, customers need their proof of purchase and product serial number. They can initiate claims through our website, customer service, or in-store.\n\n5. Depending on the issue, we may repair the product, replace it, or issue store credit if the item is discontinued.";
    }
  } else {
    if (isFollowUp) {
      response = "Thank you for providing that additional information. Based on what you've shared, I recommend the following approach:\n\nWhen handling this type of situation, it's important to balance company policy with customer satisfaction. You have the authority to make exceptions when warranted, especially for loyal customers or unique circumstances.\n\nIn this specific case, I would suggest offering the customer a one-time courtesy adjustment as a goodwill gesture. This acknowledges their concern while maintaining our standard policies for future interactions";
    } else {
      response = "I understand you're looking for information about this topic. Based on our knowledge base, here are some key points that might help:\n\n1. We have comprehensive resources available in our help center that cover most common questions and scenarios.\n\n2. For specific customer issues, it's always best to gather all relevant details before providing a definitive answer. This includes order numbers, account information, and a clear description of their question or concern.\n\n3. If you're unsure about how to handle a particular situation, don't hesitate to escalate to a supervisor or check our internal guidelines.\n\nIs there a specific aspect of this topic you'd like me to elaborate on?";
    }
  }

  // Apply personality to response
  const selectedPersonality = aiPersonalities.find(p => p.id === personality) || aiPersonalities[0];
  return response + selectedPersonality.responseSuffix;
}

// Generate analytics data
export function generateAnalytics(conversationId) {
  return {
    responseTime: Math.floor(Math.random() * 3000) + 500, // 500-3500ms
    confidenceScore: Math.floor(Math.random() * 30) + 70, // 70-99%
    sourcesUsed: Math.floor(Math.random() * 5) + 1, // 1-5 sources
    wordCount: Math.floor(Math.random() * 200) + 50, // 50-250 words
    interactionCount: Math.floor(Math.random() * 10) + 1, // 1-10 interactions
    topicRelevance: Math.floor(Math.random() * 20) + 80, // 80-99%
    sentimentScore: Math.floor(Math.random() * 100), // 0-100 (higher is more positive)
    userSatisfactionPrediction: Math.floor(Math.random() * 30) + 70, // 70-99%
  };
}

// Generate suggested prompts based on conversation context
export function generateSuggestedPrompts(lastMessage) {
  const lowerMessage = lastMessage.toLowerCase();
  
  if (lowerMessage.includes("refund")) {
    return [
      "What documentation is needed for processing refunds?",
      "How do I handle partial refunds?",
      "What's our policy on refunds for digital products?",
      "Can you explain the refund timeframes for different payment methods?"
    ];
  } else if (lowerMessage.includes("shipping") || lowerMessage.includes("delivery")) {
    return [
      "How do I handle shipping delays?",
      "What shipping carriers do we use?",
      "How can customers change their shipping address?",
      "What's our policy on international shipping fees?"
    ];
  } else if (lowerMessage.includes("account") || lowerMessage.includes("login")) {
    return [
      "How do I help customers with two-factor authentication?",
      "What account permissions are available for business accounts?",
      "How can customers update their billing information?",
      "What should I do if a customer reports unauthorized account activity?"
    ];
  } else if (lowerMessage.includes("return") || lowerMessage.includes("exchange")) {
    return [
      "What's our policy on return shipping costs?",
      "How do I process an exchange instead of a return?",
      "What items are not eligible for returns?",
      "How do we handle returns of personalized items?"
    ];
  } else {
    return [
      "Can you tell me more about our warranty policy?",
      "How do I check inventory for a specific product?",
      "What payment methods do we accept?",
      "How can I help customers with order tracking?"
    ];
  }
}