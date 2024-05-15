const mysql =require( 'serverless-mysql');
const bcrypt=require('bcrypt');
const {customers,users}=require('../app/lib/placeholder-data')

const db=mysql({config:{
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD
  }});

async function seedUsers() {
    try {
      // Create the "users" table if it doesn't exist
      const createTable = await db.query (`
      CREATE TABLE IF NOT EXISTS users (
        id  CHAR(36) NOT NULL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email  VARCHAR(255) NOT NULL UNIQUE,
        password TEXT NOT NULL
    );
    
      `);
  
      console.log(`Created "users" table`);
  
      // Insert data into the "users" table
      const insertedUsers = await Promise.all(
        users.map(async (user) => {
          const hashedPassword = await bcrypt.hash(user.password, 10);

          return db.query(`
          INSERT IGNORE INTO users (id, name, email, password)
          VALUES ('${user.id}', '${user.name}', '${user.email}', '${hashedPassword}')
        `);
        }),
      );
  
      console.log(`Seeded ${insertedUsers.length} users`);
  
      return {
        createTable,
        users: insertedUsers,
      };
    } catch (error) {
      console.error('Error seeding users:', error);
      throw error;
    }
  }
  
async function seedCustomers() {
    try {
  
      // Create the "customers" table if it doesn't exist
      const createTable = await db.query(`
        CREATE TABLE IF NOT EXISTS customers (
          id  CHAR(36) NOT NULL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          image_url VARCHAR(255) NOT NULL)
        `);  
      console.log(`Created "customers" table`);
  
      // Insert data into the "customers" table
      const insertedCustomers = await Promise.all(
        customers.map(
          (customer) => db.query(`
          INSERT IGNORE INTO customers (id, name, email, image_url)
          VALUES ('${customer.id}', '${customer.name}', '${customer.email}', '${customer.image_url}')
        `),
        ),
      );
  
      console.log(`Seeded ${insertedCustomers.length} customers`);
  
      return {
        createTable,
        customers: insertedCustomers,
      };
    } catch (error) {
      console.error('Error seeding customers:', error);
      throw error;
    }
  }
const fetchProducts=async()=> {
    const response=await fetch('https://dummyjson.com/products').then(res => res.json());
    return response.products;
  }
  

async function seedProducts(){
    const createTable = await db.query(`
        CREATE TABLE IF NOT EXISTS products (
          id CHAR(36) NOT NULL PRIMARY KEY ,
          title VARCHAR(255) NOT NULL,
          description VARCHAR(255) ,
          price DECIMAL NOT NULL,
          rating DECIMAL ,
          brand VARCHAR(255),
          category VARCHAR(255),
          image_urls  VARCHAR(512)
        );
      `);
      const products = await fetchProducts();
      console.log('response',products);
      const  productsMapped=products.map(product=>({...product,image_urls:JSON.stringify(product.images)}));
      const insertedProducts = await Promise.all(
        productsMapped.map(
          (product) => db.query(`
          INSERT IGNORE INTO products (id, title, description,price,rating,brand,category,image_urls)
          VALUES (${product.id}, '${product.title}', "${product.description}",${product.price},${product.rating},"${product.brand}","${product.category}",'${product.image_urls}')`),
        ),
      );
    
} 
async function main() {


    await seedUsers();
    await seedCustomers();
    await seedProducts();

  
    await db.end();
    await db.quit();
  }
  
  main().catch((err) => {
    console.error(
      'An error occurred while attempting to seed the database:',
      err,
    );
  });
  