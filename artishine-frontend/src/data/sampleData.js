// Static Data and image imports
import ceramicBowlImg from '../assets/ceramic-bowl.jpg';
import wovenTapestryImg from '../assets/woven-tapestry.jpg';
import woodenJewelryBoxImg from '../assets/wooden-jewelry-box.jpg';
import copperWindChimesImg from '../assets/copper-wind-chimes.jpg';
import leatherHandbagImg from '../assets/leather-handbag.jpg';
import artisanWorkshopImg from '../assets/artisan-workshop.jpg';

const sampleData = {
  products: [
    {
      id: 1,
      imageUrl: ceramicBowlImg,
      title: 'Handcrafted Terracotta Bowl',
      category: 'Pottery',
      tagline: 'Where ancient traditions meet modern beauty',
      forWhom:
        'For the mindful home chef who appreciates authentic craftsmanship',
      madeOf: 'Pure terracotta clay, sourced from the banks of River Narmada',
      howItsMade:
        "Each bowl begins its journey on the potter's wheel, where skilled hands shape the clay with techniques passed down through four generations. The terracotta is fired at high temperatures in a traditional wood-fired kiln, creating unique variations in color and texture that make each piece truly one-of-a-kind. The glazing process uses natural minerals that react beautifully with the clay, creating that signature warm orange hue that seems to capture sunlight itself. The entire process takes 14 days from wet clay to finished bowl, with multiple firings to ensure durability and beauty.",
      culturalSignificance:
        'In Indian tradition, terracotta represents the connection between earth and home. These bowls carry forward the ancient practice of eating from clay vessels, which is believed to balance the body\'s natural minerals and enhance the flavor of food.',
      whoMadeIt:
        'Crafted by Meera Devi, a master potter from Rajasthan whose family has been creating terracotta art for over 150 years. She learned the craft from her grandmother and now teaches her own daughter, ensuring this beautiful tradition continues.',
      price: 1200,
      artisanId: 1,
    },
    {
      id: 2,
      imageUrl: wovenTapestryImg,
      title: 'Geometric Harmony Tapestry',
      category: 'Textiles',
      tagline: 'Stories woven in thread, colors dancing in perfect rhythm',
      forWhom:
        'For art lovers who want to bring warmth and tradition into their modern spaces',
      madeOf:
        'Hand-spun cotton and wool threads, naturally dyed with turmeric, indigo, and pomegranate',
      howItsMade:
        "This tapestry is created on a traditional handloom using the centuries-old technique of extra-weft weaving. The artisan begins by setting up hundreds of warp threads, each carefully measured and aligned. The geometric pattern emerges slowly, one row at a time, as colored weft threads are interlaced to create the design. The natural dyes are prepared in small batches using traditional recipes - turmeric for golden yellows, indigo for deep blues, and pomegranate rinds for rich reds. Each color is applied by hand, resulting in subtle variations that give the tapestry its unique character. The entire piece takes 3 weeks to complete.",
      culturalSignificance:
        "Geometric patterns in Indian textiles represent the cosmic order and the interconnectedness of all life. This particular design is inspired by the traditional 'yantra' patterns used in meditation, bringing a sense of harmony and balance to any space.",
      whoMadeIt:
        'Woven by Lakshmi Bai, a master weaver from Gujarat who learned this art from her mother. She has been weaving for 25 years and is known for her innovative use of traditional patterns in contemporary designs.',
      price: 3500,
      artisanId: 2,
    },
    {
      id: 3,
      imageUrl: woodenJewelryBoxImg,
      title: 'Heirloom Walnut Jewelry Box',
      category: 'Woodwork',
      tagline: 'Where precious memories find their perfect home',
      forWhom:
        'For someone special who deserves a treasure chest worthy of their most precious belongings',
      madeOf:
        'Solid walnut wood with hand-forged brass hinges and natural beeswax finish',
      howItsMade:
        'This jewelry box begins with carefully selected walnut wood, aged for two years to ensure stability. The craftsman uses only hand tools - chisels, planes, and saws - to shape each piece with precision and care. The joinery is done using traditional dovetail techniques, creating joints so perfect they\'ll last for generations without glue. The interior is lined with soft cotton fabric, dyed with natural colors. The brass hinges are hand-forged by a local blacksmith and attached using traditional mortise and tenon methods. Finally, multiple coats of natural beeswax are applied and buffed to create a finish that deepens and becomes more beautiful with age.',
      culturalSignificance:
        'In Indian culture, wooden boxes are symbols of protection and preservation. They represent the safekeeping of not just valuables, but memories and traditions passed down through families.',
      whoMadeIt:
        'Crafted by Ravi Kumar, a third-generation woodworker from Kerala whose grandfather was a master carpenter for the royal palace. His workshop still uses tools that are over 100 years old.',
      price: 4500,
      artisanId: 3,
    },
    {
      id: 4,
      imageUrl: copperWindChimesImg,
      title: 'Melodic Copper Wind Chimes',
      category: 'Metalwork',
      tagline: 'Music of the wind, crafted by fire and anvil',
      forWhom:
        'For dreamers who find peace in gentle melodies and natural sounds',
      madeOf:
        'Pure copper tubes, hand-forged brass striker, sustainable teak wood top',
      howItsMade:
        'Each chime begins as a sheet of pure copper, heated in a coal forge until glowing red-hot. The metal is then carefully hammered and shaped on a traditional anvil, creating tubes of precise dimensions for perfect pitch. The craftsman tunes each tube by ear, adjusting the length and testing the sound until it harmonizes perfectly with the others. The brass striker is hand-forged using techniques passed down through generations of metalworkers. The wooden top is carved from sustainably sourced teak and treated with natural oils. The entire process requires both technical skill and musical ear, taking 5 days to complete each set.',
      culturalSignificance:
        'Wind chimes in Indian tradition are believed to bring positive energy and ward off negative influences. The sound of copper is particularly prized for its ability to create harmony in living spaces.',
      whoMadeIt:
        'Created by Vikram Singh, a master metalworker from Rajasthan whose family has been working with copper for seven generations. He combines traditional techniques with his own musical sensibility to create chimes with perfect harmony.',
      price: 2800,
      artisanId: 4,
    },
    {
      id: 5,
      imageUrl: leatherHandbagImg,
      title: 'Heritage Leather Satchel',
      category: 'Leathercraft',
      tagline: 'Strength meets elegance in every carefully placed stitch',
      forWhom:
        'For the discerning professional who values quality that improves with time',
      madeOf:
        'Full-grain buffalo leather, naturally tanned with vegetable dyes, solid brass hardware',
      howItsMade:
        'This satchel begins with the finest full-grain buffalo leather, selected for its strength and character. The leather is naturally tanned using a process that takes 6 weeks, using bark extracts instead of harsh chemicals. Each piece is hand-cut using traditional patterns passed down through generations. The stitching is done entirely by hand using waxed cotton thread, with each stitch carefully placed for both strength and beauty. The brass hardware is solid and built to last a lifetime. The bag is finished with natural conditioning oils that nourish the leather and enhance its natural patina. With proper care, this bag will last for decades and only become more beautiful with age.',
      culturalSignificance:
        'Leather craftsmanship in India dates back thousands of years. The techniques used to create this bag have been refined over centuries, representing a deep tradition of working with natural materials to create lasting beauty.',
      whoMadeIt:
        'Handcrafted by Ahmed Khan, a master leather artisan from Punjab whose family workshop has been creating leather goods for over 80 years. He learned every technique from his father and takes pride in maintaining the highest standards of craftsmanship.',
      price: 6500,
      artisanId: 5,
    },
  ],
  artisans: [
    {
      id: 1,
      name: 'Meera Devi',
      specialty: 'Pottery & Ceramics',
      location: 'Jaipur, Rajasthan',
      bio: 'Master potter with 30 years of experience, keeping ancient traditions alive',
      coordinates: { lat: 26.9124, lng: 75.7873 },
      shopName: 'Clay Dreams Studio',
      isInstagramConnected: true,
      instagramHandle: '@clayreamsstudio',
    },
    {
      id: 2,
      name: 'Lakshmi Bai',
      specialty: 'Handloom Textiles',
      location: 'Ahmedabad, Gujarat',
      bio: 'Traditional weaver creating contemporary designs with ancient techniques',
      coordinates: { lat: 23.0225, lng: 72.5714 },
      shopName: 'Threads of Tradition',
      isInstagramConnected: true,
      instagramHandle: '@threadsoftradition',
    },
    {
      id: 3,
      name: 'Ravi Kumar',
      specialty: 'Woodcraft',
      location: 'Kochi, Kerala',
      bio: 'Third-generation woodworker specializing in fine furniture and decorative items',
      coordinates: { lat: 9.9312, lng: 76.2673 },
      shopName: 'Heritage Woods',
      isInstagramConnected: false,
      instagramHandle: null,
    },
    {
      id: 4,
      name: 'Vikram Singh',
      specialty: 'Metalwork',
      location: 'Jodhpur, Rajasthan',
      bio: 'Master metalsmith creating musical instruments and decorative pieces',
      coordinates: { lat: 26.2389, lng: 73.0243 },
      shopName: 'Copper & Song',
      isInstagramConnected: true,
      instagramHandle: '@copperandsong',
    },
    {
      id: 5,
      name: 'Ahmed Khan',
      specialty: 'Leathercraft',
      location: 'Amritsar, Punjab',
      bio: 'Traditional leather artisan with 25 years of experience in fine leather goods',
      coordinates: { lat: 31.634, lng: 74.8723 },
      shopName: 'Khan Leather Works',
      isInstagramConnected: false,
      instagramHandle: null,
    },
  ],
  orders: [
    {
      id: 1,
      productId: 1,
      productTitle: 'Handcrafted Terracotta Bowl',
      buyerName: 'Priya Sharma',
      buyerAddress: '123 MG Road, Bangalore',
      status: 'new',
      orderDate: '2024-01-15',
      amount: 1200,
    },
    {
      id: 2,
      productId: 2,
      productTitle: 'Geometric Harmony Tapestry',
      buyerName: 'Rajesh Gupta',
      buyerAddress: '45 Park Street, Kolkata',
      status: 'progress',
      orderDate: '2024-01-12',
      amount: 3500,
    },
    {
      id: 3,
      productId: 3,
      productTitle: 'Heirloom Walnut Jewelry Box',
      buyerName: 'Anita Desai',
      buyerAddress: '78 Linking Road, Mumbai',
      status: 'completed',
      orderDate: '2024-01-08',
      amount: 4500,
    },
  ],
  currentUser: {
    id: 1,
    name: 'Meera Devi',
    role: 'artisan',
    email: 'meera@example.com',
    shopName: 'Clay Dreams Studio',
    bio: 'Master potter with 30 years of experience, keeping ancient traditions alive',
    location: 'Jaipur, Rajasthan',
    isInstagramConnected: true,
  },
  analytics: {
    weeklySales: 8500,
    totalViews: 1247,
    productsLiked: 89,
    instagramLikes: 128,
    instagramComments: 12,
    chartData: [
      { day: 'Mon', sales: 1200 },
      { day: 'Tue', sales: 800 },
      { day: 'Wed', sales: 1500 },
      { day: 'Thu', sales: 2000 },
      { day: 'Fri', sales: 1800 },
      { day: 'Sat', sales: 900 },
      { day: 'Sun', sales: 1300 },
    ],
  },
  artisanWorkshopImg,
};

export default sampleData;


