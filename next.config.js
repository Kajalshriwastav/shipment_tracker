/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
    // DB_URI:"postgres://localhost:3000//next13-auth",
    NEXTAUTH_SECRET : "coding"
    
},
};

// secret: process.env.NEXTAUTH_SECRET



module.exports = nextConfig
