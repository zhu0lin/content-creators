// Sample data for seeding the database
export const sampleCreators = [
  {
    name: "Linus Tech Tips",
    url: "https://www.youtube.com/@LinusTechTips",
    description: "Technology reviews, PC builds, and tech news from Linus Sebastian and his team. Known for detailed hardware reviews and entertaining tech content.",
    imageURL: "https://yt3.googleusercontent.com/ytc/APkrFKZWeMCsx4Q9e_Hm6nhOOUQ3fv96QGUXiMr1pPPs=s176-c-k-c0x00ffffff-no-rj"
  },
  {
    name: "MrBeast",
    url: "https://www.youtube.com/@MrBeast",
    description: "Philanthropist and content creator known for massive giveaways, challenges, and charitable acts. One of the most subscribed YouTubers globally.",
    imageURL: "https://yt3.googleusercontent.com/ytc/APkrFKZWeMCsx4Q9e_Hm6nhOOUQ3fv96QGUXiMr1pPPs=s176-c-k-c0x00ffffff-no-rj"
  },
  {
    name: "Marques Brownlee (MKBHD)",
    url: "https://www.youtube.com/@mkbhd",
    description: "Tech reviewer and YouTuber specializing in smartphone and gadget reviews. Known for high-quality production and detailed analysis.",
    imageURL: "https://yt3.googleusercontent.com/ytc/APkrFKZWeMCsx4Q9e_Hm6nhOOUQ3fv96QGUXiMr1pPPs=s176-c-k-c0x00ffffff-no-rj"
  },
  {
    name: "PewDiePie",
    url: "https://www.youtube.com/@PewDiePie",
    description: "Swedish YouTuber and internet personality known for gaming content, memes, and commentary. One of the most influential content creators.",
    imageURL: "https://yt3.googleusercontent.com/ytc/APkrFKZWeMCsx4Q9e_Hm6nhOOUQ3fv96QGUXiMr1pPPs=s176-c-k-c0x00ffffff-no-rj"
  },
  {
    name: "Mark Rober",
    url: "https://www.youtube.com/@MarkRober",
    description: "Former NASA engineer turned YouTuber creating science and engineering content. Known for creative experiments and educational videos.",
    imageURL: "https://yt3.googleusercontent.com/ytc/APkrFKZWeMCsx4Q9e_Hm6nhOOUQ3fv96QGUXiMr1pPPs=s176-c-k-c0x00ffffff-no-rj"
  },
  {
    name: "Emma Chamberlain",
    url: "https://www.youtube.com/@emmachamberlain",
    description: "Lifestyle and fashion YouTuber known for her authentic vlogs, coffee content, and relatable personality. Popular among Gen Z audiences.",
    imageURL: "https://yt3.googleusercontent.com/ytc/APkrFKZWeMCsx4Q9e_Hm6nhOOUQ3fv96QGUXiMr1pPPs=s176-c-k-c0x00ffffff-no-rj"
  },
  {
    name: "David Dobrik",
    url: "https://www.youtube.com/@DavidDobrik",
    description: "Vlogger and content creator known for his fast-paced vlogs, pranks, and collaborations with other creators. Popular for his energetic style.",
    imageURL: "https://yt3.googleusercontent.com/ytc/APkrFKZWeMCsx4Q9e_Hm6nhOOUQ3fv96QGUXiMr1pPPs=s176-c-k-c0x00ffffff-no-rj"
  }
];

// Function to seed the database (call this from browser console or a component)
export const seedDatabase = async (supabase) => {
  try {
    console.log('Starting to seed database...');
    
    // Clear existing data
    const deleteResponse = await fetch(`${supabase.supabaseUrl}/rest/v1/creators`, {
      method: 'DELETE',
      headers: {
        'apikey': supabase.supabaseKey,
        'Authorization': `Bearer ${supabase.supabaseKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!deleteResponse.ok) {
      console.error('Error clearing existing data:', deleteResponse.status);
      return;
    }
    
    // Insert sample data
    const insertResponse = await fetch(`${supabase.supabaseUrl}/rest/v1/creators`, {
      method: 'POST',
      headers: {
        'apikey': supabase.supabaseKey,
        'Authorization': `Bearer ${supabase.supabaseKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(sampleCreators)
    });
    
    if (!insertResponse.ok) {
      console.error('Error seeding database:', insertResponse.status);
      return;
    }
    
    const data = await insertResponse.json();
    console.log('Database seeded successfully!', data);
    return data;
  } catch (err) {
    console.error('Unexpected error:', err);
  }
};
