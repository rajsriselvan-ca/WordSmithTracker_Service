import Language from "../models/languageModel"; 

interface MongoError extends Error {
  code?: number;
}

export const seedLanguages = async () => {
  const languages = [
    'English',
    'Irish',
    'German',
    'French',
    'Spanish',
    'Tamil',
    'Hindi',
  ];

  try {
    await Language.insertMany(
      languages.map((lang) => ({ name: lang })), 
      { ordered: false } 
    );
    console.log("Languages seeded successfully");
  } catch (error: unknown) {
    const mongoError = error as MongoError;
    if (mongoError.code === 11000) {
      console.log("Languages already exist");
    } else {
      console.error("Error seeding languages:", error);
    }
  }
};

export default seedLanguages;
