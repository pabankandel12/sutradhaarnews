export type Story = {
  id: number | string;
  category: string;
  title: string;
  summary?: string;
  image: string;
  time: string;
  author?: string;
};

export function apiArticleToStory(article: import("./api").ApiArticle): Story {
  return { id: article.id, category: article.category.name, title: article.title, summary: article.excerpt, image: article.featuredImage?.deliveryUrl || "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1200&q=80", time: article.publishedAt ? new Date(article.publishedAt).toLocaleDateString("ne-NP") : "भर्खरै", author: article.author.name };
}

export const categoryMap: Record<string, string> = {
  samachar: "समाचार", rajniti: "राजनीति", artha: "अर्थ", samaj: "समाज",
  pradesh: "प्रदेश", khelkud: "खेलकुद", manoranjan: "मनोरञ्जन",
  prabidhi: "प्रविधि", bishwo: "विश्व", bichar: "विचार",
};

export const leadStories: Story[] = [
  {
    id: 1,
    category: "समाचार",
    title: "नयाँ आर्थिक वर्षको प्राथमिकता: उत्पादन, रोजगारी र पूर्वाधारमा जोड",
    summary: "सरकारले आगामी वर्षको नीति तथा कार्यक्रममा स्वदेशी उत्पादन र युवाको रोजगारीलाई केन्द्रमा राख्ने तयारी गरेको छ।",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1400&q=85",
    time: "२१ मिनेट अगाडि",
    author: "सूत्रधार संवाददाता",
  },
  {
    id: 2,
    category: "अर्थ",
    title: "लगानीमैत्री वातावरण बनाउन निजी क्षेत्रको आग्रह",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
    time: "४२ मिनेट अगाडि",
  },
  {
    id: 3,
    category: "खेलकुद",
    title: "युवा टोलीको शानदार जित, फाइनल यात्रा सुनिश्चित",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=900&q=80",
    time: "१ घण्टा अगाडि",
  },
];

export const latest: Story[] = [
  { id: 4, category: "राजनीति", title: "संसदीय समितिको बैठकमा महत्त्वपूर्ण विषयमाथि छलफल", image: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=500&q=80", time: "१२ मिनेट अगाडि" },
  { id: 5, category: "प्रदेश", title: "स्थानीय तहमा डिजिटल सेवा विस्तार हुँदै", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=500&q=80", time: "३५ मिनेट अगाडि" },
  { id: 6, category: "प्रविधि", title: "नेपाली स्टार्टअपले सार्वजनिक गर्‍यो नयाँ प्रविधि", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80", time: "१ घण्टा अगाडि" },
  { id: 7, category: "विश्व", title: "क्षेत्रीय सहकार्यबारे नयाँ समझदारी", image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=500&q=80", time: "२ घण्टा अगाडि" },
];

export const videos: Story[] = [
  { id: 8, category: "भिडियो", title: "आजका मुख्य समाचार एकै ठाउँमा", image: "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=900&q=80", time: "आज" },
  { id: 9, category: "अन्तर्वार्ता", title: "समृद्धिको बाटो: विज्ञसँग विशेष संवाद", image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=900&q=80", time: "आज" },
  { id: 10, category: "मैदानबाट", title: "दुर्गम गाउँमा बदलिँदै गरेको जनजीवन", image: "https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?auto=format&fit=crop&w=900&q=80", time: "हिजो" },
];

export const allStories = [...leadStories, ...latest, ...videos];

export function getStory(id: number) {
  return allStories.find((story) => story.id === id);
}
