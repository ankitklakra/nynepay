const dummyProducts = {
  Electronics: [
    {
      title: "Sony 4K Smart TV",
      price: 49999,
      url: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500",
      description: "55-inch 4K Ultra HD Smart LED TV with HDR"
    },
    {
      title: "Apple MacBook Pro",
      price: 129999,
      url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500",
      description: "M2 Chip, 16GB RAM, 512GB SSD"
    },
    {
      title: "Samsung Galaxy S23",
      price: 79999,
      url: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500",
      description: "256GB Storage, 8GB RAM"
    },
    {
      title: "Bose Noise Cancelling Headphones",
      price: 29999,
      url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      description: "Wireless Noise Cancelling Headphones 700"
    }
  ],
  Fashion: [
    {
      title: "Men's Leather Jacket",
      price: 4999,
      url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
      description: "Genuine Leather Biker Jacket"
    },
    {
      title: "Women's Summer Dress",
      price: 1999,
      url: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500",
      description: "Floral Print Maxi Dress"
    },
    {
      title: "Designer Watch",
      price: 15999,
      url: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500",
      description: "Luxury Chronograph Watch"
    },
    {
      title: "Running Shoes",
      price: 3999,
      url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
      description: "Professional Running Shoes"
    }
  ],
  Appliances: [
    {
      title: "Samsung Refrigerator",
      price: 34999,
      url: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=500",
      description: "Double Door Smart Refrigerator"
    },
    {
      title: "LG Washing Machine",
      price: 24999,
      url: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=500",
      description: "Front Load Washing Machine"
    },
    {
      title: "Philips Air Purifier",
      price: 8999,
      url: "https://images.unsplash.com/photo-1581092921461-39b9d08a9b21?w=500",
      description: "HEPA Air Purifier"
    },
    {
      title: "Bosch Microwave",
      price: 12999,
      url: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500",
      description: "Convection Microwave Oven"
    }
  ],
  Jewellery: [
    {
      title: "Diamond Necklace",
      price: 99999,
      url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500",
      description: "18K Gold Diamond Pendant"
    },
    {
      title: "Pearl Earrings",
      price: 4999,
      url: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=500",
      description: "South Sea Pearl Earrings"
    },
    {
      title: "Gold Bracelet",
      price: 29999,
      url: "https://images.unsplash.com/photo-1611652022419-a9419f743f59?w=500",
      description: "22K Gold Traditional Bracelet"
    },
    {
      title: "Sapphire Ring",
      price: 39999,
      url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500",
      description: "Blue Sapphire Engagement Ring"
    }
  ],
  Beauty: [
    {
      title: "MAC Lipstick Set",
      price: 4999,
      url: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500",
      description: "Set of 5 Premium Lipsticks"
    },
    {
      title: "Clinique Moisturizer",
      price: 2999,
      url: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500",
      description: "Dramatically Different Moisturizing Cream"
    },
    {
      title: "Dior Perfume",
      price: 8999,
      url: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500",
      description: "Miss Dior Eau de Parfum"
    },
    {
      title: "Estee Lauder Foundation",
      price: 3999,
      url: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500",
      description: "Double Wear Stay-in-Place Foundation"
    }
  ],
  Books: [
    {
      title: "The Great Gatsby",
      price: 499,
      url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
      description: "Classic Novel by F. Scott Fitzgerald"
    },
    {
      title: "Think and Grow Rich",
      price: 299,
      url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500",
      description: "Personal Development Book"
    },
    {
      title: "The Alchemist",
      price: 399,
      url: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=500",
      description: "Novel by Paulo Coelho"
    },
    {
      title: "Rich Dad Poor Dad",
      price: 349,
      url: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=500",
      description: "Personal Finance Book"
    }
  ],
  Food: [
    {
      title: "Organic Honey",
      price: 999,
      url: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500",
      description: "Pure Natural Honey 500g"
    },
    {
      title: "Premium Coffee Beans",
      price: 799,
      url: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=500",
      description: "Arabica Coffee Beans 250g"
    },
    {
      title: "Organic Green Tea",
      price: 499,
      url: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=500",
      description: "Japanese Green Tea 100 Bags"
    },
    {
      title: "Dark Chocolate",
      price: 299,
      url: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500",
      description: "70% Dark Chocolate Bar"
    }
  ],
  Tour: [
    {
      title: "Bali Vacation Package",
      price: 49999,
      url: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500",
      description: "7 Days Bali Tour Package"
    },
    {
      title: "Swiss Alps Tour",
      price: 89999,
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500",
      description: "10 Days Swiss Alps Adventure"
    },
    {
      title: "Dubai Desert Safari",
      price: 29999,
      url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500",
      description: "3 Days Dubai Experience"
    },
    {
      title: "Goa Beach Package",
      price: 19999,
      url: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500",
      description: "5 Days Goa Beach Holiday"
    }
  ],
  Others: [
    {
      title: "Yoga Mat",
      price: 999,
      url: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=500",
      description: "Premium Non-slip Yoga Mat"
    },
    {
      title: "Smart Watch",
      price: 4999,
      url: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500",
      description: "Fitness Tracker Smart Watch"
    },
    {
      title: "Wireless Earbuds",
      price: 2999,
      url: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500",
      description: "True Wireless Earbuds"
    },
    {
      title: "Gaming Mouse",
      price: 1999,
      url: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500",
      description: "RGB Gaming Mouse"
    }
  ]
};

export default dummyProducts; 