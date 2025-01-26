import Language from "../models/languageModel"; 

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
  } catch (error: any) {
    if (error.code === 11000) {
      console.log("Languages already exist");
    } else {
      console.error("Error seeding languages:", error);
    }
  }
};

export default seedLanguages;
