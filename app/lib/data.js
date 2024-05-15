import mysql from 'serverless-mysql';



export async function fetchProducts() {
    const db=mysql({config:{
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD
      }});
    
    try {
      const data = await db.query(`
        SELECT products.id,products.title, products.price, products.category,products.image_urls
        FROM products`)

        const products = data.map(row => ({
          id:row.id,
          title: row.title,
          price: row.price,
          category: row.category,
          image_urls:JSON.parse(row.image_urls)
      }));

      return products;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch the products.');
    }
  }
  