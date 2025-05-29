import { fs, storage } from './Config';
import dummyProducts from './dummyData';

const addDummyCategories = async () => {
  try {
    const categories = [
      { categoryname: 'Electronics', categorynumber: '1', url: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500' },
      { categoryname: 'Fashion', categorynumber: '2', url: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500' },
      { categoryname: 'Appliances', categorynumber: '3', url: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500' },
      { categoryname: 'Jewellery', categorynumber: '4', url: 'https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=500' },
      { categoryname: 'Beauty', categorynumber: '5', url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500' },
      { categoryname: 'Books', categorynumber: '6', url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500' },
      { categoryname: 'Food', categorynumber: '7', url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500' },
      { categoryname: 'Tour', categorynumber: '8', url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500' },
      { categoryname: 'Others', categorynumber: '9', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500' }
    ];

    for (const category of categories) {
      await fs.collection('Products').add({
        ...category,
        Created: new Date()
      });
    }
    console.log('Categories added successfully!');
  } catch (error) {
    console.error('Error adding categories:', error);
  }
};

const addDummyProducts = async () => {
  try {
    // First add categories
    await addDummyCategories();

    // Then add products
    for (const [category, products] of Object.entries(dummyProducts)) {
      // Add each product to its category collection
      for (const product of products) {
        await fs.collection(category).add({
          ...product,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
      console.log(`Added products to ${category} collection`);
    }
    console.log('All dummy products added successfully!');
  } catch (error) {
    console.error('Error adding dummy products:', error);
  }
};

export default addDummyProducts; 