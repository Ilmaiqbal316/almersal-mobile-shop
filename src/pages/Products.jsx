import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '../components/products/ProductCard';

/**
 * @typedef {Object} ProductModel
 * @property {string} name
 * @property {string} storage
 * @property {string[]} colors
 * @property {'Available' | 'Active' | 'Non Active'} status
 * @property {string} region
 * @property {Record<string, string>} [variantImages]
 */

/**
 * @typedef {Object} Product
 * @property {string} brand
 * @property {string} name
 * @property {ProductModel[]} models
 * @property {string} image
 * @property {string} glow
 * @property {string} [status]
 * @property {string} [region]
 */

/**
 * @typedef {Object} StatusStyle
 * @property {string} bg
 * @property {string} text
 * @property {string} border
 * @property {string} dot
 */

/**
 * @typedef {Object} ActiveFilters
 * @property {string[]} status
 * @property {string[]} region
 * @property {string[]} storage
 */

/** @type {Product[]} */
const products = [

    { 
    brand: 'Apple', 
    name: 'iPhone 17 Pro Max', 
    models: [
      { name: 'iPhone 17 Pro Max', storage: '256GB', colors: ['Orange','Silver', 'Blue'], status: 'Available', region: 'Global', variantImages: {  'Orange': 'iphone-17pro-orange.png','Silver': 'iphone17pro_silver.png', 'Blue': 'iphone-17pro-blue.png' } },
      { name: 'iPhone 17 Pro Max', storage: '512GB', colors: ['Orange','Silver'], status: 'Available', region: 'Global', variantImages: {  'Orange': 'iphone-17pro-orange.png','Silver': 'iphone17pro_silver.png',  } },
      { name: 'iPhone 17 Pro Max', storage: '1TB', colors: ['Orange','Silver', 'Blue'], status: 'Available', region: 'Global', variantImages: {  'Orange': 'iphone-17pro-orange.png','Silver': 'iphone17pro_silver.png', 'Blue': 'iphone-17pro-blue.png' } },
    ],
    image: 'https://media.base44.com/images/public/69f3a12d73b56ba9582ced2f/1b32df475_generated_91fd1487.png', 
    glow: '#A2AAAD',
    status: 'Available',
    region: 'Global'
  },
  { 
    brand: 'Samsung', 
    name: 'Galaxy S25 Ultra', 
    models: [
      { name: 'Galaxy S25 Ultra', storage: '256GB', colors: ['Black', 'Blue', 'Silver'], status: 'Available', region: 'Global', variantImages: { 'Black': 'galaxy-s25ultra_black.webp', 'Blue': 'galaxy-s25ultra_blue.webp', 'Silver': 'galaxy-s25ultra_silver.webp' } },
      { name: 'Galaxy S25 Ultra', storage: '512GB', colors: ['Black', 'Blue', 'Silver'], status: 'Available', region: 'Global', variantImages: { 'Black': 'galaxy-s25ultra_black.webp', 'Blue': 'galaxy-s25ultra_blue.webp', 'Silver': 'galaxy-s25ultra_silver.webp' } }
    ],
    image: 'https://media.base44.com/images/public/69f3a12d73b56ba9582ced2f/91ad311ee_generated_6ecdb6cb.png', 
    glow: '#1428A0',
    status: 'Available',
    region: 'Global'
  },
   { 
    brand: 'Huawei', 
    name: 'Pura 90 Pro Max', 
    models: [
      { name: 'Pura 90 Pro Max', storage: '1TB', colors: ['Orange', 'Purple','Green'], status: 'Available', region: 'Global', variantImages: { 'Orange': 'huawei_pura_90_pro_max-orangre.png', 'Purple': 'huawei_pura_90_pro_max-Orange.png', 'Green': 'huawei_pura_90_pro_max-Green.png' } }
    ],
    image: 'https://media.base44.com/images/public/69f3a12d73b56ba9582ced2f/06c43b617_generated_6ed83b07.png', 
    glow: '#CF0A2C',
    status: 'Available',
    region: 'Global'
  },
   { 
    brand: 'Redmi', 
    name: 'Redmi 15C', 
    models: [
      { name: 'Redmi 15C', storage: '4/128', colors: ['Blue','Peach', 'Green'], status: 'Available', region: 'Global', variantImages: { 'Blue': 'redmi-15c-blue.png','Peach': 'redmi-15c-orange.png', 'Green': 'redmi-15c-green.png' } },
      { name: 'Redmi 15C', storage: '6/128', colors: ['Blue', 'Green'], status: 'Available', region: 'Global', variantImages: { 'Blue': 'redmi-15c-blue.png', 'Green': 'redmi-15c-green.png' } },
      { name: 'Redmi 15C', storage: '8/256', colors: ['Blue','Peach'], status: 'Available', region: 'Global', variantImages: { 'Blue': 'redmi-15c-blue.png','Peach': 'redmi-15c-orange.png' } }
    ],
    image: 'https://media.base44.com/images/public/69f3a12d73b56ba9582ced2f/a18b86454_generated_dc1b2df2.png', 
    glow: '#FF6900',
    status: 'Available',
    region: 'Global'
  },
  { 
    brand: 'Apple', 
    name: 'iPhone 17 Air', 
    models: [
      { name: 'iPhone 17 Air', storage: '256GB', colors: ['Black', 'Blue', 'Gold', 'White'], status: 'Active', region: 'Global', variantImages: { 'Black': 'Apple-iPhone-Air-black.png', 'Blue': 'Apple-iPhone-Air-blue.png', 'Gold': 'Apple-iPhone-Air-gold.png', 'White': 'Apple-iPhone-Air-white.png' } },
      { name: 'iPhone 17 Air', storage: '512GB', colors: ['Blue','Gold'], status: 'Active', region: 'Global', variantImages: {  'Blue': 'Apple-iPhone-Air-blue.png', 'Gold': 'Apple-iPhone-Air-gold.png'} },
      { name: 'iPhone 17 Air', storage: '1TB', colors: ['Black', 'Gold'], status: 'Active', region: 'Global', variantImages: { 'Black': 'Apple-iPhone-Air-black.png', 'Gold': 'Apple-iPhone-Air-gold.png' } }
    ],
    image: 'https://media.base44.com/images/public/69f3a12d73b56ba9582ced2f/1b32df475_generated_91fd1487.png', 
    glow: '#A2AAAD',
    status: 'Active',
    region: 'Global'
  },
    { 
    brand: 'Redmi', 
    name: 'Redmi Note 15 Pro 4G', 
    models: [
      { name: 'Redmi Note 15 Pro 4G', storage: '8/256', colors: ['Gold', 'Blue'], status: 'Available', region: 'Global', variantImages: { 'Gold': 'redmi-note-15-pro-4g-gold6.png', 'Blue': 'redmi-note-15-pro-4g-icebluejpg.png' } },
      { name: 'Redmi Note 15 Pro 4G', storage: '12/512', colors: ['Gold', 'Blue'], status: 'Available', region: 'Global', variantImages: { 'Gold': 'redmi-note-15-pro-4g-gold6.png', 'Blue': 'redmi-note-15-pro-4g-icebluejpg.png' } }
    
    ],
    image: 'https://media.base44.com/images/public/69f3a12d73b56ba9582ced2f/a18b86454_generated_dc1b2df2.png', 
    glow: '#FF6900',
    status: 'Available',
    region: 'Global'
  },
    { 
    brand: 'Apple', 
    name: 'iPhone 17', 
    models: [
      { name: 'iPhone 17', storage: '256GB', colors: ['Black', 'White', 'Blue', 'Lavender', 'Sage'], status: 'Available', region: 'Global', variantImages: { 'Black': 'Apple-iPhone-17-black.png', 'White': 'Apple-iPhone-17-white.png', 'Blue': 'Apple-iPhone-17-blue.png', 'Lavender': 'Apple-iPhone-17-levender.png', 'Sage': 'Apple-iPhone-17-sage.png' } },
      { name: 'iPhone 17', storage: '512GB', colors: ['Black', 'White'], status: 'Available', region: 'Global', variantImages: { 'Black': 'Apple-iPhone-17-black.png', 'White': 'Apple-iPhone-17-white.png' } }
    ],
    image: 'https://media.base44.com/images/public/69f3a12d73b56ba9582ced2f/1b32df475_generated_91fd1487.png', 
    glow: '#A2AAAD',
    status: 'Available',
    region: 'Global'
  },
  
  { 
    brand: 'Apple', 
    name: 'iPhone 17 Pro', 
    models: [
      { name: 'iPhone 17 Pro', storage: '256GB', colors: ['Orange','Silver', 'Blue'], status: 'Available', region: 'Global', variantImages: {  'Orange': 'iphone-17pro-orange.png','Silver': 'iphone17pro_silver.png', 'Blue': 'iphone-17pro-blue.png' } },
      { name: 'iPhone 17 Pro', storage: '512GB', colors: ['Orange', 'Blue'], status: 'Available', region: 'Global', variantImages: {  'Orange': 'iphone-17pro-orange.png', 'Blue': 'iphone-17pro-blue.png' } },
      { name: 'iPhone 17 Pro', storage: '1TB', colors: ['Orange','Silver', 'Blue'], status: 'Available', region: 'Global', variantImages: {  'Orange': 'iphone-17pro-orange.png','Silver': 'iphone17pro_silver.png', 'Blue': 'iphone-17pro-blue.png' } }
    ],
    image: 'https://media.base44.com/images/public/69f3a12d73b56ba9582ced2f/1b32df475_generated_91fd1487.png', 
    glow: '#A2AAAD',
    status: 'Available',
    region: 'Global'
  },
  { 
    brand: 'Honor', 
    name: 'Honor 600 Pro', 
    models: [
      { name: 'Honor 600 Pro', storage: '256GB', colors: [  'Orange','Black'], status: 'Non Active', region: 'Europe', variantImages: {  'Orange': 'Honor-600-Pro-orange.webp','Black': 'Honor-600-Pro-black.webp' } },
      { name: 'Honor 600 Pro', storage: '512GB', colors: [  'Black'], status: 'Non Active', region: 'Europe', variantImages: {  'Black': 'Honor-600-Pro-black.webp' } }
   
    ],
    image: 'https://media.base44.com/images/public/69f3a12d73b56ba9582ced2f/06c43b617_generated_6ed83b07.png',
    glow: '#00B4D8',
    status: 'Non Active',
    region: 'Europe'
  },

  { 
    brand: 'Itel', 
    name: 'Itel A80', 
    models: [
      { name: 'Itel A80', storage: '4/128', colors: ['Black', 'White','Blue'], status: 'Available', region: 'Global', variantImages: { 'Black': 'itel-A80-black.png', 'White': 'itel-A80-wirte.png', 'Blue': 'itel-A80-bule.png' } }
    ],
    image: 'https://media.base44.com/images/public/69f3a12d73b56ba9582ced2f/a9a3b416f_generated_83e1d498.png', 
    glow: '#00B140',
    status: 'Available',
    region: 'Global'
  },

  { 
    brand: 'Apple', 
    name: 'iPhone 15 Pro', 
    models: [
      { name: 'iPhone 15 Pro', storage: '256GB', colors: ['Black', 'Gold'], status: 'Available', region: 'Global', variantImages: { 'Black': 'iphone-15-pro.png', 'Gold': 'iPhone_15_Pro_gold.png' } },
      { name: 'iPhone 15 Pro', storage: '512GB', colors: ['Black', 'Gold'], status: 'Available', region: 'Global', variantImages: { 'Black': 'iphone-15-pro.png', 'Gold': 'iPhone_15_Pro_gold.png' } }
    ],
    image: 'https://media.base44.com/images/public/69f3a12d73b56ba9582ced2f/1b32df475_generated_91fd1487.png', 
    glow: '#A2AAAD',
    status: 'Available',
    region: 'Global'
  },
   
  // {
  //   brand: 'WTS India',
  //   name: 'iPhone 16',
  //   models: [
  //     { name: 'iPhone 16', storage: '128GB', colors: ['Black', 'White', 'Pink'], status: 'Available', region: 'India', variantImages: { 'Black': 'iphone16_black.jpg', 'White': 'iphone16_white.jpg', 'Pink': 'iphone16_pink.jpg' } }
  //   ],
  //   image: 'https://media.base44.com/images/public/69f3a12d73b56ba9582ced2f/1b32df475_generated_91fd1487.png',
  //   glow: '#A2AAAD',
  //   status: 'Available',
  //   region: 'India'
  // },
  // {
  //   brand: 'WTS India',
  //   name: 'iPhone 15',
  //   models: [
  //     { name: 'iPhone 15', storage: '128GB', colors: ['Black', 'Blue'], status: 'Available', region: 'India', variantImages: { 'Black': 'iphone15_black.jpg', 'Blue': 'iphone15_blue.jpg' } }
  //   ],
  //   image: 'https://media.base44.com/images/public/69f3a12d73b56ba9582ced2f/1b32df475_generated_91fd1487.png',
  //   glow: '#A2AAAD',
  //   status: 'Available',
  //   region: 'India'
  // },
  // {
  //   brand: 'WTS India',
  //   name: 'iPhone 16 Plus',
  //   models: [
  //     { name: 'iPhone 16 Plus', storage: '128GB', colors: ['Black', 'White', 'Blue'], status: 'Available', region: 'India', variantImages: { 'Black': 'iphone16plus_black.jpg', 'White': 'iphone16plus_white.jpg', 'Blue': 'iphone16plus_blue.jpg' } },
  //     { name: 'iPhone 16 Plus', storage: '256GB', colors: ['Black', 'White', 'Blue'], status: 'Available', region: 'India', variantImages: { 'Black': 'iphone16plus_black.jpg', 'White': 'iphone16plus_white.jpg', 'Blue': 'iphone16plus_blue.jpg' } }
  //   ],
  //   image: 'https://media.base44.com/images/public/69f3a12d73b56ba9582ced2f/1b32df475_generated_91fd1487.png',
  //   glow: '#A2AAAD',
  //   status: 'Available',
  //   region: 'India'
  // },
  { 
    brand: 'Samsung', 
    name: 'Galaxy S25 FE', 
    models: [
      { name: 'Galaxy S25 FE', storage: '256GB', colors: ['Black', 'Blue','White'], status: 'Available', region: 'Global', variantImages: { 'Black': 'galaxy-s25-fe-black.avif', 'Blue': 'Galaxy-S25-FE-blue.png', 'White': 'galaxy-s25-fe-white.avif' } }
    ],
    image: 'https://media.base44.com/images/public/69f3a12d73b56ba9582ced2f/91ad311ee_generated_6ecdb6cb.png', 
    glow: '#1428A0',
    status: 'Available',
    region: 'Global'
  },
  
  { 
    brand: 'Samsung', 
    name: 'Galaxy A17', 
    models: [
      { name: 'Galaxy A17', storage: '4/128', colors: ['Black', 'Blue', 'Gray'], status: 'Available', region: 'Global', variantImages: { 'Black': 'garaxy-A17-black.avif', 'Blue': 'garaxy-A17-blue1.avif', 'Gray': 'garaxy-A17-silver.avif' } },
      { name: 'Galaxy A17', storage: '6/128', colors: ['Black', 'Blue', 'Gray'], status: 'Available', region: 'Global', variantImages: { 'Black': 'garaxy-A17-black.avif', 'Blue': 'garaxy-A17-blue1.avif', 'Gray': 'garaxy-A17-silver.avif' } },
      { name: 'Galaxy A17', storage: '256GB', colors: ['Black', 'Blue', 'Gray'], status: 'Active', region: 'Global', variantImages: { 'Black': 'garaxy-A17-black.avif', 'Blue': 'garaxy-A17-blue1.avif', 'Gray': 'garaxy-A17-silver.avif' } }
    ],
    image: 'https://media.base44.com/images/public/69f3a12d73b56ba9582ced2f/91ad311ee_generated_6ecdb6cb.png', 
    glow: '#1428A0',
    status: 'Available',
    region: 'Global'
  },
  { 
    brand: 'Samsung', 
    name: 'Galaxy A07', 
    models: [
      { name: 'Galaxy A07', storage: '64GB', colors: ['Black', 'Green'], status: 'Available', region: 'Global', variantImages: { 'Black': 'galaxy-a07-black.avif', 'Green': 'galaxy-a07-green.avif' } },
      { name: 'Galaxy A07', storage: '4/128', colors: ['Black', 'Green'], status: 'Available', region: 'Global', variantImages: { 'Black': 'galaxy-a07-black.avif', 'Green': 'galaxy-a07-green.avif' } },
      { name: 'Galaxy A07', storage: '6/128', colors: ['Black', 'Green'], status: 'Available', region: 'Global', variantImages: { 'Black': 'galaxy-a07-black.avif', 'Green': 'galaxy-a07-green.avif' } }
    ],
    image: 'https://media.base44.com/images/public/69f3a12d73b56ba9582ced2f/91ad311ee_generated_6ecdb6cb.png', 
    glow: '#1428A0',
    status: 'Available',
    region: 'Global'
  },
  { 
    brand: 'Samsung', 
    name: 'Galaxy A26', 
    models: [
      { name: 'Galaxy A26', storage: '128GB', colors: ['Black', 'Peach', 'White'], status: 'Active', region: 'Global', variantImages: { 'Black': 'galaxy-a26-5g-black.avif', 'Peach': 'galaxy-a26-5g-pink.webp', 'White': 'galaxy-a26-white.webp' } }
    ],
    image: 'https://media.base44.com/images/public/69f3a12d73b56ba9582ced2f/91ad311ee_generated_6ecdb6cb.png', 
    glow: '#1428A0',
    status: 'Active',
    region: 'Global'
  },
  { 
    brand: 'Samsung', 
    name: 'Galaxy A36', 
    models: [
      { name: 'Galaxy A36', storage: '128GB', colors: ['Black', 'Lavender', 'White'], status: 'Available', region: 'Global', variantImages: { 'Black': 'galaxy-a36-5g-black.avif', 'Lavender': 'galaxy-a36-5g-levender.avif', 'White': 'galaxy-a36-5g-white.webp' } },
      { name: 'Galaxy A36', storage: '256GB', colors: ['Lavender', 'White'], status: 'Available', region: 'Global', variantImages: {  'Lavender': 'galaxy-a36-5g-levender.avif', 'White': 'galaxy-a36-5g-white.webp'   } }
    ],
    image: 'https://media.base44.com/images/public/69f3a12d73b56ba9582ced2f/91ad311ee_generated_6ecdb6cb.png', 
    glow: '#1428A0',
    status: 'Available',
    region: 'Global'
  },
  { 
    brand: 'Samsung', 
    name: 'Galaxy A56', 
    models: [
      { name: 'Galaxy A56', storage: '128GB', colors: ['Gray', 'Olive', 'Pink'], status: 'Active', region: 'Global', variantImages: { 'Gray': 'galaxy-a56-5g-gray.avif', 'Olive': 'galaxy-a56-5g-olive.avif', 'Pink': 'galaxy-a56-5g-pink.avif' } },
      { name: 'Galaxy A56', storage: '256GB', colors: ['Gray', 'Pink'], status: 'Active', region: 'Global', variantImages: { 'Gray': 'galaxy-a56-5g-gray.avif', 'Pink': 'galaxy-a56-5g-pink.avif' } }
    ],
    image: 'https://media.base44.com/images/public/69f3a12d73b56ba9582ced2f/91ad311ee_generated_6ecdb6cb.png', 
    glow: '#1428A0',
    status: 'Active',
    region: 'Global'
  },
  { 
    brand: 'Samsung', 
    name: 'Galaxy A16', 
    models: [
      { name: 'Galaxy A16', storage: '4/128', colors: ['Black', 'Silver', 'Green'], status: 'Available', region: 'Global', variantImages: { 'Black': 'galaxy-a16-black.avif', 'Silver': 'galaxy-a16-white.avif', 'Green': 'galaxy-a16-green.avif' } }
    ],
    image: 'https://media.base44.com/images/public/69f3a12d73b56ba9582ced2f/91ad311ee_generated_6ecdb6cb.png', 
    glow: '#1428A0',
    status: 'Available',
    region: 'Global'
  },
  { 
    brand: 'Samsung', 
    name: 'Galaxy A06', 
    models: [
      { name: 'Galaxy A06', storage: '64GB', colors: ['Black', 'White'], status: 'Available', region: 'Global', variantImages: { 'Black': 'galaxy-a06-black.avif', 'White': 'galaxy-a06-white.webp' } },
    ],
    image: 'https://media.base44.com/images/public/69f3a12d73b56ba9582ced2f/91ad311ee_generated_6ecdb6cb.png', 
    glow: '#1428A0',
    status: 'Available',
    region: 'Global'
  },
  { 
    brand: 'Redmi', 
    name: 'Redmi Pad 7', 
    models: [
      { name: 'Redmi Pad 7', storage: '8/256', colors: [ 'Silver'], status: 'Available', region: 'Global', variantImages: {  'Silver': 'redmi-pad-7.webp' } }
    ],
    image: 'https://media.base44.com/images/public/69f3a12d73b56ba9582ced2f/a18b86454_generated_dc1b2df2.png', 
    glow: '#FF6900',
    status: 'Available',
    region: 'Global'
  },
  { 
    brand: 'Redmi', 
    name: 'Redmi Pad 2', 
    models: [
      { name: 'Redmi Pad 2', storage: '4/128', colors: [ 'Black','Lavender'], status: 'Available', region: 'Global', variantImages: {  'Black': 'redmi-pad2-gray.webp' ,'Lavender': 'redmi-pad2-levender.png' } },
      
    ],
    image: 'https://media.base44.com/images/public/69f3a12d73b56ba9582ced2f/a18b86454_generated_dc1b2df2.png', 
    glow: '#FF6900',
    status: 'Available',
    region: 'Global'
  },
  { 
    brand: 'Redmi', 
    name: 'Redmi Pad Pro 5G', 
    models: [
      { name: 'Redmi Pad Pro 5G', storage: '6/128', colors: ['Silver'], status: 'Active', region: 'Global', variantImages: { 'Silver': 'redmi-pad-pro5g- white.webp' } }
    ],
    image: 'https://media.base44.com/images/public/69f3a12d73b56ba9582ced2f/a18b86454_generated_dc1b2df2.png', 
    glow: '#FF6900',
    status: 'Active',
    region: 'Global'
  },
  { 
    brand: 'Redmi', 
    name: 'Redmi Pad 2 Pro', 
    models: [
      { name: 'Redmi Pad 2 Pro', storage: '8/256', colors: ['Gray'], status: 'Available', region: 'Global', variantImages: { 'Gray': 'redmi-pad2-pro-gray.webp'} }
    ],
    image: 'https://media.base44.com/images/public/69f3a12d73b56ba9582ced2f/a18b86454_generated_dc1b2df2.png', 
    glow: '#FF6900',
    status: 'Available',
    region: 'Global'
  },
  { 
    brand: 'Redmi', 
    name: 'Redmi A5', 
    models: [
      { name: 'Redmi A5', storage: '3/64', colors: ['Blue','Gold','Black'], status: 'Available', region: 'India', variantImages: {  'Blue': 'REDMI-A5-Ocean-Blue1.png','Gold': 'REDMI-A5-Sandy-Gold-.png', 'Black': 'REDMI-A5-Midnight-Black.png' } },
      { name: 'Redmi A5', storage: '4/128', colors: [ 'Blue','Black'], status: 'Available', region: 'India', variantImages: {  'Blue': 'REDMI-A5-Ocean-Blue1.png', 'Black': 'REDMI-A5-Midnight-Black.png' } },
    ],
    image: 'https://media.base44.com/images/public/69f3a12d73b56ba9582ced2f/a18b86454_generated_dc1b2df2.png', 
    glow: '#FF6900',
    status: 'Available',
    region: 'India'
  },
  { 
    brand: 'Redmi', 
    name: 'Redmi 15 5G', 
    models: [
      { name: 'Redmi 15 5G', storage: '8/256', colors: ['Green', 'Black'], status: 'Active', region: 'Global', variantImages: { 'Green': 'redmi-15-green.png', 'Black': 'Redmi-15-5G-black.png' } }
    ],
    image: 'https://media.base44.com/images/public/69f3a12d73b56ba9582ced2f/a18b86454_generated_dc1b2df2.png', 
    glow: '#FF6900',
    status: 'Active',
    region: 'Global'
  },
 
  { 
    brand: 'Redmi', 
    name: 'Redmi Note 14', 
    models: [
      { name: 'Redmi Note 14', storage: '6/128', colors: ['Black', 'Blue'], status: 'Available', region: 'Global', variantImages: { 'Black': 'REDMI_Note_14_black.webp', 'Blue': 'redmi-note-14-blue.png' } },
      { name: 'Redmi Note 14', storage: '8/256', colors: ['Black', 'Blue'], status: 'Available', region: 'Global', variantImages: { 'Black': 'REDMI_Note_14_black.webp', 'Blue': 'redmi-note-14-blue.png' } }
    ],
    image: 'https://media.base44.com/images/public/69f3a12d73b56ba9582ced2f/a18b86454_generated_dc1b2df2.png', 
    glow: '#FF6900',
    status: 'Available',
    region: 'Global'
  },
  { 
    brand: 'Redmi', 
    name: 'Redmi Note 14 Pro', 
    models: [
      { name: 'Redmi Note 14 Pro', storage: '8/256', colors: ['Black', 'Skyblue', 'Purple'], status: 'Active', region: 'Global', variantImages: { 'Black': 'redmi-note14-pro-black.png', 'Skyblue': 'redmi-note14-pro-oceanblue.png', 'Purple': 'redmi-note14-problue.png' } },
      { name: 'Redmi Note 14 Pro', storage: '12/512', colors: ['Black', 'Skyblue', 'Purple'], status: 'Active', region: 'Global', variantImages: { 'Black': 'redmi-note14-pro-black.png', 'Skyblue': 'redmi-note14-pro-oceanblue.png', 'Purple': 'redmi-note14-problue.png' } }
    ],
    image: 'https://media.base44.com/images/public/69f3a12d73b56ba9582ced2f/a18b86454_generated_dc1b2df2.png', 
    glow: '#FF6900',
    status: 'Active',
    region: 'Global'
  },
  { 
    brand: 'Redmi', 
    name: 'Redmi Note 14 Pro+', 
    models: [
      { name: 'Redmi Note 14 Pro+', storage: '12/256', colors: ['Teal','Black'], status: 'Active', region: 'Global', variantImages: {  'Teal': 'redmi-note-14-pro+=greenwebp.png','Black': 'redmi-note-14-pro+-green.png' } }
    ],
    image: 'https://media.base44.com/images/public/69f3a12d73b56ba9582ced2f/a18b86454_generated_dc1b2df2.png', 
    glow: '#FF6900',
    status: 'Active',
    region: 'Global'
  },

  { 
    brand: 'Itel', 
    name: 'Itel VistaTab 30', 
    models: [
      { name: 'Itel VistaTab 30', storage: '4/128', colors: ['Grey', 'Blue'], status: 'Active', region: 'Global', variantImages: { 'Grey': 'Itel-VistaTab-30-gray.png', 'Blue': 'Itel-VistaTab-30-blue.png' } }
    ],
    image: 'https://media.base44.com/images/public/69f3a12d73b56ba9582ced2f/a9a3b416f_generated_83e1d498.png', 
    glow: '#00B140',
    status: 'Active',
    region: 'Global'
  },
  { 
    brand: 'Realme', 
    name: 'Realme 16 5G', 
    models: [
      { name: 'Realme 16 5G', storage: '128GB', colors: ['Black', 'White'], status: 'Available', region: 'India', variantImages: { 'Black': 'Realme-16-5G-black.webp', 'White': 'Realme-16 5G-white.webp' } }
    ],
    image: 'https://media.base44.com/images/public/69f3a12d73b56ba9582ced2f/29b5ef1fa_generated_48f43daa.png', 
    glow: '#FFB800',
    status: 'Available',
    region: 'India'
  },
  { 
    brand: 'Realme', 
    name: 'Realme Narzo 100 Lite 5G', 
    models: [
      { name: 'Realme Narzo 100 Lite 5G', storage: '256GB', colors: ['Black', 'Silver'], status: 'Active', region: 'India', variantImages: { 'Black': 'Realme-Narzo-100 Lite 5G-black.webp', 'Silver': 'Realme-Narzo-100 Lite-5G-silver.webp' } }
    ],
    image: 'https://media.base44.com/images/public/69f3a12d73b56ba9582ced2f/29b5ef1fa_generated_48f43daa.png', 
    glow: '#FFB800',
    status: 'Active',
    region: 'India'
  },
  { 
    brand: 'Nokia', 
    name: 'Nokia C12 Pro', 
    models: [
      { name: 'Nokia C12 Pro', storage: '64GB', colors: ['Brown', 'Mint','DarkCyan'], status: 'Non Active', region: 'Europe', variantImages: { 'Brown': 'nokia_C12_pro-charcoal-front_back-in.avif', 'Mint': 'nokia_C12_pro-lightmint-front_back-in.avif', 'DarkCyan': 'nokia_C12_pro-darkcyan-front_back-in.avif'  } }
    ],
    image: 'https://media.base44.com/images/public/69f3a12d73b56ba9582ced2f/06c43b617_generated_6ed83b07.png', 
    glow: '#005AFF',
    status: 'Non Active',
    region: 'Europe'
  },
    
  { 
    brand: 'Huawei', 
    name: 'Huawei Pura 90', 
    models: [
      { name: 'Huawei Pura 90', storage: '256GB', colors: ['Black', 'Purple', 'White'], status: 'Active', region: 'China', variantImages: { 'Black': 'huawei_pura_90-black.png', 'Purple': 'Huawei_Pura_90_purple.png', 'White': 'huawei_pura_90-white.png'  } }
    ],
    image: 'https://media.base44.com/images/public/69f3a12d73b56ba9582ced2f/06c43b617_generated_6ed83b07.png', 
    glow: '#CF0A2C',
    status: 'Available',
    region: 'China'
  },
  { 
    brand: 'Huawei', 
    name: 'Pura 90 Pro', 
    models: [
      { name: 'Pura 90 Pro', storage: '512GB', colors: ['Pink','Orange', 'Black', 'White'], status: 'Active', region: 'China', variantImages: {  'Pink': 'huawei_pura_90_pro-pink.png', 'Orange': 'huawei_pura_90_pro-orange.png', 'Black': 'huawei_pura_90_pro_1_black.png','White': 'huawei_pura_90_pro-white.png' } }
    ],
    image: 'https://media.base44.com/images/public/69f3a12d73b56ba9582ced2f/06c43b617_generated_6ed83b07.png', 
    glow: '#CF0A2C',
    status: 'Active',
    region: 'China'
  },
 
  { 
    brand: 'Huawei', 
    name: 'Pura X Max', 
    models: [
      { name: 'Pura X Max', storage: '512GB', colors: [ 'Blue', 'White', 'Gold'], status: 'Active', region: 'China', variantImages: {  'Blue': 'huawei_pura_x_max_blue_2.png', 'White': 'huawei_pura_x_max_white_1.png', 'Gold': 'huawei_pura_x_max_gold_1.png' } }
    ],
    image: 'https://media.base44.com/images/public/69f3a12d73b56ba9582ced2f/06c43b617_generated_6ed83b07.png', 
    glow: '#CF0A2C',
    status: 'Active',
    region: 'China'
  },
  { 
    brand: 'Sony', 
    name: 'Xperia 1 VII', 
    models: [
      { name: 'Sony Xperia 1 VII', storage: '512GB', colors: ['Purple', 'Gray'], status: 'Available', region: 'Japan', variantImages: { 'Purple': 'Sony-Xperia-1-VII-Orchid_Purple.png', 'Gray': 'Sony-Xperia-1-VII-official-image-gray.png' } }
    ],
    image: 'https://media.base44.com/images/public/69f3a12d73b56ba9582ced2f/06c43b617_generated_6ed83b07.png', 
    glow: '#00A1E0',
      status: 'Available',
      region: 'Japan'
  },
  { 
    brand: 'Honor', 
    name: 'Honor Magic8 Pro Air', 
    models: [
      { name: 'Honor Magic8 Pro Air', storage: '256GB', colors: ['Lavender','Black', 'Orange'], status: 'Available', region: 'China', variantImages: { 'Lavender': 'Honor-Magic8-Pro-Air-levender.png' ,'Black': 'Honor-Magic8-Pro-Air-black.png', 'Orange': 'Honor-Magic8-Pro-Air-orange.png'} }
    ],
    image: 'https://media.base44.com/images/public/69f3a12d73b56ba9582ced2f/06c43b617_generated_6ed83b07.png', 
    glow: '#00B4D8',
    status: 'Available',
    region: 'China'
  },
  // { 
  //   brand: 'Honor', 
  //   name: 'Honor Magic V6', 
  //   models: [
  //     { name: 'Honor Magic V6', storage: '512GB', colors: ['Red', 'White', 'Gold'], status: 'Active', region: 'Global', variantImages: { 'Red': 'Honor-Magic-V6-RED.webp', 'White': 'Honor-Magic-V6-White.webp', 'Gold': 'Honor-Magic-V6-Gold.webp' } }
  //   ],
  //   image: 'https://media.base44.com/images/public/69f3a12d73b56ba9582ced2f/06c43b617_generated_6ed83b07.png', 
  //   glow: '#00B4D8',
  //   status: 'Active',
  //   region: 'Global'
  // },
  { 
    brand: 'Honor', 
    name: 'Honor 600', 
    models: [
      { name: 'Honor 600', storage: '128GB', colors: ['Gold', 'Silver'], status: 'Available', region: 'India', variantImages: { 'Gold': 'Honor-600-gold.webp', 'Silver': 'Honor-600-silver.webp' } }
    ],
    image: 'https://media.base44.com/images/public/69f3a12d73b56ba9582ced2f/06c43b617_generated_6ed83b07.png',
    glow: '#00B4D8',
    status: 'Available',
    region: 'India'
  },
 
];

/** @type {Record<string, string>} */
const colorMap = {
  'Black': '#1a1a1a',
  'Blue': '#2563eb',
  'Silver': '#c0c0c0',
  'Gold': '#ffd700',
  'Green': '#16a34a',
  'Pink': '#ec4899',
  'White': '#f5f5f5',
  'Purple': '#9333ea',
  'Red': '#dc2626',
  'Orange': '#ea580c',
  'Lavender': '#b4a7d6',
  'Sage': '#9ca67a',
  'Grey': '#a0a0a0',
  "DarkCyan": '#008b8b',
  "Mint": '#98ff98',
  "Brown": '#8b4513',
  "Skyblue": '#87ceeb',
  "Charcoal": '#36454f',
  "Peach": '#f7b7a0',
  "Olive": '#808000',
  "Teal": '#429494'
};

/** @type {Record<string, StatusStyle>} */
const statusConfig = {
  'Available': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' },
  'Active': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500' },
  'Non Active': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' }
};

/** @type {Record<string, string>} */
const regionFlags = {
  'Global': '🌍',
  'USA': '🇺🇸',
  'Japan': '🇯🇵',
  'India': '🇮🇳',
  'Europe': '🇪🇺',
  'China': '🇨🇳',
  'Africa': '🌍'
};

/**
 * SVG Flag Component - Works on all platforms including Windows
 * @param {{ code: 'US' | 'JP' | 'IN' | 'EU' | 'CN' | 'Global', className?: string }} props
 */
function FlagIcon({ code, className = '' }) {
  /** @type {Record<string, React.ReactNode>} */
  const flags = {
    'US': (
      <svg viewBox="0 0 640 480" className={className}>
        <path fill="#bd3d44" d="M0 0h640v480H0"/>
        <path stroke="#fff" strokeWidth="37" d="M0 55.5h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640"/>
        <path fill="#192f5d" d="M0 0h364.8v258.5H0"/>
      </svg>
    ),
    'JP': (
      <svg viewBox="0 0 640 480" className={className}>
        <path fill="#fff" d="M0 0h640v480H0"/>
        <circle cx="320" cy="240" r="120" fill="#bc002d"/>
      </svg>
    ),
    'IN': (
      <svg viewBox="0 0 640 480" className={className}>
        <path fill="#f93" d="M0 0h640v160H0z"/>
        <path fill="#fff" d="M0 160h640v160H0z"/>
        <path fill="#128807" d="M0 320h640v160H0z"/>
        <circle cx="320" cy="240" r="60" fill="#008"/>
      </svg>
    ),
    'EU': (
      <svg viewBox="0 0 640 480" className={className}>
        <path fill="#039" d="M0 0h640v480H0"/>
        <g fill="#fc0">
          {[0,1,2,3,4,5,6,7,8,9,10,11].map((i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x = 320 + 80 * Math.cos(angle);
            const y = 240 + 80 * Math.sin(angle);
            return <circle key={i} cx={x} cy={y} r="10"/>;
          })}
        </g>
      </svg>
    ),
    'CN': (
      <svg viewBox="0 0 640 480" className={className}>
        <path fill="#de2910" d="M0 0h640v480H0"/>
        <g fill="#ffde00">
          <path d="M120 80l-15-46-15 46 39-28h-48"/>
          <path d="M180 40l-5-15-5 15 12-9h-15" transform="scale(0.6) translate(200, 80)"/>
          <path d="M200 70l-5-15-5 15 12-9h-15" transform="scale(0.6) translate(280, 60)"/>
          <path d="M200 100l-5-15-5 15 12-9h-15" transform="scale(0.6) translate(280, 120)"/>
          <path d="M180 120l-5-15-5 15 12-9h-15" transform="scale(0.6) translate(200, 160)"/>
        </g>
      </svg>
    ),
    'Global': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    )
  };

  const flag = flags[code];
  if (!flag) {
    return <span className={className}>{regionFlags[code] || '🌍'}</span>;
  }
  return flag;
}

/**
 * @param {string} region
 * @returns {'US' | 'JP' | 'IN' | 'EU' | 'CN' | 'Global'}
 */
function getFlagCode(region) {
  if (region === 'USA') return 'US';
  if (region === 'Japan') return 'JP';
  if (region === 'India') return 'IN';
  if (region === 'Europe') return 'EU';
  if (region === 'China') return 'CN';
  return 'Global';
}

export default function Products() {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Brand nav arrow scroll
  const brandNavRef = useRef(/** @type {HTMLDivElement | null} */ (null));
  const stickyBarRef = useRef(/** @type {HTMLDivElement | null} */ (null));
  const productGridRef = useRef(/** @type {HTMLDivElement | null} */ (null));
  const pendingScrollRef = useRef(false);
  const [canScrollLeft,  setCanScrollLeft]  = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = brandNavRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = brandNavRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => { el.removeEventListener('scroll', updateScrollState); ro.disconnect(); };
  }, [updateScrollState]);

  const scrollBrands = useCallback((/** @type {'left'|'right'} */ dir) => {
    const el = brandNavRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'left' ? -140 : 140, behavior: 'smooth' });
  }, []);

  /** @type {[ActiveFilters, React.Dispatch<React.SetStateAction<ActiveFilters>>]} */
  const [activeFilters, setActiveFilters] = useState(
    /** @type {ActiveFilters} */ ({ status: [], region: [], storage: [] })
  );

  const brands = ['All', ...new Set(products.map(p => p.brand))];

  // Extract all unique values for filters
  const allStatuses = /** @type {string[]} */ ([...new Set(products.map(p => p.status || ''))]);
  const allRegions = /** @type {string[]} */ ([...new Set(products.map(p => p.region || ''))]);
  const allStorage = /** @type {string[]} */ ([...new Set(products.flatMap(p => p.models.map(m => m.storage)))].sort());

  // Scroll to the product grid after brand filter change settles
  useEffect(() => {
    if (!pendingScrollRef.current) return;
    pendingScrollRef.current = false;
    const el = productGridRef.current;
    if (!el) return;
    // Offset 
    const offset = 160;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }, [filter]);

  const filtered = useMemo(() => {
    let result = filter === 'All' ? products : products.filter(p => p.brand === filter);

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.brand.toLowerCase().includes(q) ||
        p.name.toLowerCase().includes(q) ||
        p.models.some(m => 
          m.name.toLowerCase().includes(q) ||
          m.storage.toLowerCase().includes(q) ||
          m.colors.some(c => c.toLowerCase().includes(q))
        )
      );
    }

    if (activeFilters.status.length > 0) {
      result = result.filter(p => p.models.some(m => activeFilters.status.includes(m.status || '')));
    }
    if (activeFilters.region.length > 0) {
      result = result.filter(p => p.models.some(m => activeFilters.region.includes(m.region || '')));
    }
    if (activeFilters.storage.length > 0) {
      result = result.filter(p => p.models.some(m => activeFilters.storage.includes(m.storage)));
    }

    return result;
  }, [filter, searchQuery, activeFilters]);

  /**
   * @param {'status' | 'region' | 'storage'} category
   * @param {string} value
   */
  const toggleFilter = (category, value) => {
    setActiveFilters(prev => {
      /** @type {ActiveFilters} */
      const next = { ...prev };
      if (next[category].includes(value)) {
        next[category] = next[category].filter(v => v !== value);
      } else {
        next[category] = [...next[category], value];
      }
      return next;
    });
  };

  const clearFilters = () => {
    setActiveFilters({ status: [], region: [], storage: [] });
    setSearchQuery('');
    setFilter('All');
  };

  const hasActiveFilters = activeFilters.status.length > 0 || activeFilters.region.length > 0 || activeFilters.storage.length > 0 || !!searchQuery;

  return (
    <div className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <section ref={stickyBarRef} className="py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy/50 to-navy-deep" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-gold font-mono text-xs tracking-[0.3em] uppercase mb-4 block">Product Catalog</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold gold-gradient-text mb-4">
              The Product Vault
            </h1>
            <p className="text-gold-light text-lg max-w-xl mx-auto">
              Genuine smartphones from the world's leading manufacturers, available for wholesale
            </p>
          </motion.div>
        </div>
      </section>

      {/* ========== STICKY CONTROL BAR - EXACT SAME WIDTH AS PRODUCT GRID ========== */}
      <div className="sticky top-20 z-40 bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200/40 dark:border-slate-800/40">
        {/* Same max-w-7xl container as the product grid below - EXACT alignment */}
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">

          {/* Mobile: Single vertical column | Desktop: horizontal row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 lg:gap-6 py-2 sm:py-4">

            {/* LEFT: Brand Navigation Pills with arrow controls on mobile/tablet */}
            <div className="relative flex items-center w-full sm:w-auto min-w-0">
              {/* Left arrow — only shown on non-lg when scrollable */}
              <button
                onClick={() => scrollBrands('left')}
                aria-label="Scroll brands left"
                className={[
                  'lg:hidden shrink-0 flex items-center justify-center',
                  'w-7 h-7 rounded-full mr-1',
                  'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700',
                  'text-slate-500 dark:text-slate-300 shadow-sm',
                  'transition-all duration-200',
                  canScrollLeft
                    ? 'opacity-100 pointer-events-auto hover:bg-slate-100 dark:hover:bg-slate-700'
                    : 'opacity-0 pointer-events-none',
                ].join(' ')}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Scrollable pill strip — hides scrollbar visually */}
              <div
                ref={brandNavRef}
                className="flex items-center gap-1 sm:gap-2 overflow-x-auto w-full sm:w-auto"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                <style>{`.brand-nav-strip::-webkit-scrollbar{display:none}`}</style>
                {brands.map((b) => (
                  <button
                    key={b}
                    onClick={() => {
                      pendingScrollRef.current = true;
                      setFilter(b);
                      setActiveFilters({ status: [], region: [], storage: [] });
                      setSearchQuery('');
                    }}
                    className={`shrink-0 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs font-semibold tracking-wide uppercase transition-all duration-200 ${
                      filter === b
                        ? 'bg-gold text-navy-deep shadow-sm'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>

              {/* Right arrow — only shown on non-lg when scrollable */}
              <button
                onClick={() => scrollBrands('right')}
                aria-label="Scroll brands right"
                className={[
                  'lg:hidden shrink-0 flex items-center justify-center',
                  'w-7 h-7 rounded-full ml-1',
                  'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700',
                  'text-slate-500 dark:text-slate-300 shadow-sm',
                  'transition-all duration-200',
                  canScrollRight
                    ? 'opacity-100 pointer-events-auto hover:bg-slate-100 dark:hover:bg-slate-700'
                    : 'opacity-0 pointer-events-none',
                ].join(' ')}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* RIGHT: Search + Filter - Responsive sizes */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0 w-full sm:w-auto">
              {/* Search Bar - Mobile responsive */}
              <div className="relative group flex-1 sm:flex-none">
                <Search className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-3.5 sm:w-4 h-3.5 sm:h-4 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full sm:w-48 lg:w-64 pl-8 sm:pl-10 pr-2 sm:pr-8 py-1.5 sm:py-2.5 rounded-lg text-[11px] sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/20 transition-all duration-200 shadow-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-1.5 sm:right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  >
                    <X className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                  </button>
                )}
              </div>

              {/* Filter Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg transition-all duration-200 shrink-0 ${
                  showFilters || hasActiveFilters
                    ? 'bg-amber-500 text-white shadow-sm shadow-amber-500/20'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 text-slate-500 dark:text-slate-400 hover:border-amber-300 hover:text-amber-500 dark:hover:text-amber-400'
                }`}
                title="Filters"
              >
                <SlidersHorizontal className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                {hasActiveFilters && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                    {activeFilters.status.length + activeFilters.region.length + activeFilters.storage.length + (searchQuery ? 1 : 0)}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Active Filters Tags - Responsive */}
          <AnimatePresence>
            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-wrap items-center gap-1.5 sm:gap-2 pb-2 sm:pb-3"
              >
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 text-[10px] sm:text-xs font-medium border border-amber-200/60 dark:border-amber-800/40">
                    "{searchQuery}"
                    <button onClick={() => setSearchQuery('')} className="hover:text-amber-900 ml-0.5"><X className="w-2.5 h-2.5 sm:w-3 sm:h-3" /></button>
                  </span>
                )}
                {activeFilters.status.map(s => (
                  <span key={s} className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] sm:text-xs font-medium border border-slate-200/60 dark:border-slate-700/40">
                    {s}
                    <button onClick={() => toggleFilter('status', s)} className="hover:text-slate-900 dark:hover:text-slate-200"><X className="w-2.5 h-2.5 sm:w-3 sm:h-3" /></button>
                  </span>
                ))}
                {activeFilters.region.map(r => (
                  <span key={r} className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] sm:text-xs font-medium border border-slate-200/60 dark:border-slate-700/40">
                    <FlagIcon code={getFlagCode(r)} className="w-2.5 h-2 sm:w-3.5 sm:h-3 rounded-sm" />
                    {r}
                    <button onClick={() => toggleFilter('region', r)} className="hover:text-slate-900 dark:hover:text-slate-200"><X className="w-2.5 h-2.5 sm:w-3 sm:h-3" /></button>
                  </span>
                ))}
                {activeFilters.storage.map(s => (
                  <span key={s} className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] sm:text-xs font-medium border border-slate-200/60 dark:border-slate-700/40">
                    {s}
                    <button onClick={() => toggleFilter('storage', s)} className="hover:text-slate-900 dark:hover:text-slate-200"><X className="w-2.5 h-2.5 sm:w-3 sm:h-3" /></button>
                  </span>
                ))}
                <button
                  onClick={clearFilters}
                  className="text-[10px] sm:text-xs text-slate-400 hover:text-amber-500 transition-colors ml-0.5 sm:ml-1"
                >
                  Clear all
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Main Content with Optional Right Panel */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* Product Grid */}
          <div ref={productGridRef} className="flex-1 min-w-0">
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
              <AnimatePresence mode="popLayout">
                {filtered.map((product, i) => (
                  <motion.div
                    key={`${product.brand}-${product.name}`}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    <ProductCard 
                      product={product} 
                      colorMap={colorMap}
                      statusConfig={statusConfig}
                      regionFlags={regionFlags}
                      activeFilters={activeFilters}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filtered.length === 0 && (
              <div className="text-center py-12 sm:py-20">
                <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg">No products match your criteria</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 px-6 py-2 bg-amber-500 text-white rounded-full text-xs sm:text-sm font-medium hover:bg-amber-600 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Product Table Section */}
            {filtered.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mt-8 sm:mt-12 lg:mt-16"
              >
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent" />
                  <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-slate-800 dark:text-slate-200 shrink-0">Detailed Specifications</h2>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent" />
                </div>

                {/* ── Desktop table (md+) ── */}
                <div className="hidden md:block bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                        <th className="text-left px-4 lg:px-6 py-3 lg:py-4 text-[10px] lg:text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Model</th>
                        <th className="text-left px-4 lg:px-6 py-3 lg:py-4 text-[10px] lg:text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Storage Options</th>
                        <th className="text-left px-4 lg:px-6 py-3 lg:py-4 text-[10px] lg:text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Colors</th>
                        <th className="text-left px-4 lg:px-6 py-3 lg:py-4 text-[10px] lg:text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                        <th className="text-left px-4 lg:px-6 py-3 lg:py-4 text-[10px] lg:text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Region</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {filtered.map(product => {
                        // Filter models per active filters
                        const visibleModels = product.models.filter(model => {
                          if (activeFilters.status.length > 0 && !activeFilters.status.includes(model.status || '')) return false;
                          if (activeFilters.region.length > 0 && !activeFilters.region.includes(model.region || '')) return false;
                          if (activeFilters.storage.length > 0 && !activeFilters.storage.includes(model.storage)) return false;
                          return true;
                        });
                        if (visibleModels.length === 0) return null;

                        // Aggregate all unique colors across visible models
                        const allColors = [...new Set(visibleModels.flatMap(m => m.colors))];
                        // Use the first visible model for status/region (representative)
                        const repModel = visibleModels[0];

                        return (
                          <tr
                            key={`${product.brand}-${product.name}`}
                            className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                          >
                            {/* Model */}
                            <td className="px-4 lg:px-6 py-3 lg:py-4">
                              <div className="flex flex-col gap-0.5">
                                <span className="text-xs lg:text-sm font-semibold text-slate-900 dark:text-slate-100">{product.name}</span>
                                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">{product.brand}</span>
                              </div>
                            </td>

                            {/* All storage options */}
                            <td className="px-4 lg:px-6 py-3 lg:py-4">
                              <div className="flex flex-wrap gap-1.5">
                                {visibleModels.map(model => (
                                  <span
                                    key={model.storage}
                                    className="inline-flex items-center px-2 lg:px-2.5 py-0.5 lg:py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] lg:text-xs font-semibold text-slate-700 dark:text-slate-300"
                                  >
                                    {model.storage}
                                  </span>
                                ))}
                              </div>
                            </td>

                            {/* Aggregated colors */}
                            <td className="px-4 lg:px-6 py-3 lg:py-4">
                              <div className="flex items-center gap-1">
                                {allColors.slice(0, 6).map(color => (
                                  <div
                                    key={color}
                                    className="w-4 h-4 lg:w-5 lg:h-5 rounded-full border border-white dark:border-slate-700 shadow-sm flex-shrink-0"
                                    style={{ backgroundColor: colorMap[color] || color }}
                                    title={color}
                                  />
                                ))}
                                {allColors.length > 6 && (
                                  <span className="text-[9px] lg:text-xs text-slate-500 dark:text-slate-400 ml-0.5">+{allColors.length - 6}</span>
                                )}
                              </div>
                            </td>

                            {/* Status */}
                            <td className="px-4 lg:px-6 py-3 lg:py-4">
                              <span className={`inline-flex items-center gap-1 lg:gap-1.5 px-2 lg:px-2.5 py-0.5 lg:py-1 rounded-full text-[10px] lg:text-xs font-medium border ${statusConfig[repModel.status].bg} ${statusConfig[repModel.status].text} ${statusConfig[repModel.status].border}`}>
                                <span className={`w-1 h-1 lg:w-1.5 lg:h-1.5 rounded-full ${statusConfig[repModel.status].dot}`} />
                                {repModel.status}
                              </span>
                            </td>

                            {/* Region */}
                            <td className="px-4 lg:px-6 py-3 lg:py-4">
                              <span className="inline-flex items-center gap-1.5 lg:gap-2 text-xs lg:text-sm text-slate-700 dark:text-slate-300">
                                <FlagIcon code={getFlagCode(repModel.region)} className="w-4 h-3 lg:w-5 lg:h-4 rounded-sm shadow-sm flex-shrink-0" />
                                {repModel.region}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* ── Mobile spec table (below md) ── */}
                <div className="md:hidden bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">

                  {/* Column header strip */}
                  <div className="grid grid-cols-[1fr_auto] items-center px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Model / Storage</span>
                    <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-right">Status · Region</span>
                  </div>

                  {/* One spec row per product */}
                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filtered.map((product, productIdx) => {
                      const visibleModels = product.models.filter(model => {
                        if (activeFilters.status.length > 0 && !activeFilters.status.includes(model.status || '')) return false;
                        if (activeFilters.region.length > 0 && !activeFilters.region.includes(model.region || '')) return false;
                        if (activeFilters.storage.length > 0 && !activeFilters.storage.includes(model.storage)) return false;
                        return true;
                      });
                      if (visibleModels.length === 0) return null;

                      const allColors = [...new Set(visibleModels.flatMap(m => m.colors))];
                      const repModel = visibleModels[0];

                      return (
                        <div
                          key={`mspec-${product.brand}-${product.name}`}
                          className={`px-4 py-3 ${productIdx % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50/60 dark:bg-slate-800/25'}`}
                        >
                          {/* Row 1: Model name + brand · Status badge */}
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="min-w-0">
                              <span className="block text-[13px] font-semibold text-slate-900 dark:text-slate-100 leading-snug truncate">{product.name}</span>
                              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">{product.brand}</span>
                            </div>
                            <div className="flex flex-col items-end gap-1 flex-shrink-0">
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-semibold border ${statusConfig[repModel.status].bg} ${statusConfig[repModel.status].text} ${statusConfig[repModel.status].border}`}>
                                <span className={`w-1 h-1 rounded-full ${statusConfig[repModel.status].dot}`} />
                                {repModel.status}
                              </span>
                              <span className="inline-flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400">
                                <FlagIcon code={getFlagCode(repModel.region)} className="w-3.5 h-2.5 rounded-sm flex-shrink-0" />
                                {repModel.region}
                              </span>
                            </div>
                          </div>

                          {/* Row 2: Storage pills */}
                          <div className="flex items-center gap-1.5 mb-2 flex-wrap">
                            <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest w-12 flex-shrink-0">Storage</span>
                            <div className="flex flex-wrap gap-1">
                              {visibleModels.map(model => (
                                <span
                                  key={model.storage}
                                  className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                                >
                                  {model.storage}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Row 3: Colors */}
                          <div className="flex items-center gap-1.5">
                            <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest w-12 flex-shrink-0">Colors</span>
                            <div className="flex items-center gap-1 flex-wrap">
                              {allColors.slice(0, 10).map(color => (
                                <div
                                  key={color}
                                  className="w-3.5 h-3.5 rounded-full border border-white dark:border-slate-700 shadow-sm flex-shrink-0"
                                  style={{ backgroundColor: colorMap[color] || color }}
                                  title={color}
                                />
                              ))}
                              {allColors.length > 10 && (
                                <span className="text-[9px] text-slate-400 dark:text-slate-500 ml-0.5">+{allColors.length - 10}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.section>
            )}
          </div>

          {/* Right Side Filter Panel - Desktop & Mobile */}
          <AnimatePresence>
            {showFilters && (
              <>
                {/* Mobile: Full screen modal overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden fixed inset-0 top-20 bg-black/50 backdrop-blur-sm z-30"
                />

                {/* Filter Panel - Mobile drawer + Desktop sidebar */}
                <motion.div
                  initial={{ opacity: 0, x: 20, width: 0 }}
                  animate={{ opacity: 1, x: 0, width: 'auto' }}
                  exit={{ opacity: 0, x: 20, width: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="fixed lg:sticky bottom-0 left-0 right-0 lg:top-36 lg:h-fit lg:bottom-auto z-40 lg:z-0 lg:shrink-0 lg:overflow-hidden"
                >
                  <div className="lg:w-[260px] bg-white dark:bg-slate-900 lg:bg-white/70 dark:lg:bg-slate-900/70 lg:backdrop-blur-xl rounded-t-2xl lg:rounded-xl border-t border-l border-r lg:border border-slate-200/60 dark:border-slate-700/60 lg:shadow-sm shadow-lg p-4 sm:p-5 h-[80vh] lg:h-auto overflow-y-auto">
                    <div className="flex items-center justify-between mb-4 sm:mb-5">
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Filters</h3>
                      <button onClick={() => setShowFilters(false)} className="lg:hidden text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Status Filter */}
                    <div className="mb-4 sm:mb-5">
                      <h4 className="text-[9px] sm:text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Status</h4>
                      <div className="space-y-1 sm:space-y-1.5">
                        {allStatuses.map(status => (
                          <label key={status} className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group">
                            <div 
                              onClick={() => toggleFilter('status', status)}
                              className={`w-3.5 h-3.5 rounded border transition-all cursor-pointer flex items-center justify-center flex-shrink-0 ${activeFilters.status.includes(status) ? 'bg-amber-500 border-amber-500' : 'border-slate-300 dark:border-slate-600 group-hover:border-amber-400'}`}
                            >
                              {activeFilters.status.includes(status) && (
                                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <span className={`text-xs ${activeFilters.status.includes(status) ? 'text-amber-600 dark:text-amber-400 font-medium' : 'text-slate-500 dark:text-slate-400'}`}>
                              {status}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Region Filter */}
                    <div className="mb-4 sm:mb-5">
                      <h4 className="text-[9px] sm:text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Region</h4>
                      <div className="space-y-1 sm:space-y-1.5">
                        {allRegions.map(region => (
                          <label key={region} className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group">
                            <div 
                              onClick={() => toggleFilter('region', region)}
                              className={`w-3.5 h-3.5 rounded border transition-all cursor-pointer flex items-center justify-center flex-shrink-0 ${activeFilters.region.includes(region) ? 'bg-amber-500 border-amber-500' : 'border-slate-300 dark:border-slate-600 group-hover:border-amber-400'}`}
                            >
                              {activeFilters.region.includes(region) && (
                                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <FlagIcon code={getFlagCode(region)} className="w-3.5 h-2.5 sm:w-4 sm:h-3 rounded-sm flex-shrink-0" />
                            <span className={`text-xs ${activeFilters.region.includes(region) ? 'text-amber-600 dark:text-amber-400 font-medium' : 'text-slate-500 dark:text-slate-400'}`}>
                              {region}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Storage Filter */}
                    <div className="mb-4 sm:mb-5">
                      <h4 className="text-[9px] sm:text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Storage</h4>
                      <div className="flex flex-wrap gap-1">
                        {allStorage.map(storage => (
                          <button
                            key={storage}
                            onClick={() => toggleFilter('storage', storage)}
                            className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-[10px] sm:text-[11px] font-medium transition-all ${
                              activeFilters.storage.includes(storage)
                                ? 'bg-amber-500 text-white shadow-sm shadow-amber-500/15'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                            }`}
                          >
                            {storage}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={clearFilters}
                      className="w-full py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      Reset Filters
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}