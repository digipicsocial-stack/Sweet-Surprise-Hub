const PRODUCTS = [
  {id:"trf-midnight-noir",name:"Midnight Noir",description:"Dark chocolate ganache with a deep cacao finish.",price:399,image:"https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=900"},
  {id:"trf-rose-cardamom",name:"Rose & Cardamom",description:"Floral rose and fragrant cardamom in silky chocolate.",price:449,image:"https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg?auto=compress&cs=tinysrgb&w=900"},
  {id:"trf-saffron-silk",name:"Saffron Silk",description:"A delicate saffron chocolate experience.",price:499,image:"https://images.pexels.com/photos/257816/pexels-photo-257816.jpeg?auto=compress&cs=tinysrgb&w=900"},
  {id:"trf-espresso-ember",name:"Espresso Ember",description:"Roasted espresso notes with rich dark chocolate.",price:429,image:"https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg?auto=compress&cs=tinysrgb&w=900"}
];
export const api = {
  get: async (path) => ({data: path === "/products" ? PRODUCTS : []}),
  post: async (path, data) => ({data:{success:true,...data}})
};
export const formatINR = (n) => `₹${Number(n).toLocaleString("en-IN")}`;
