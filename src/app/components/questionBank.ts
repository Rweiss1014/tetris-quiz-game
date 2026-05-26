export interface Question {
  id: string;
  question: string;
  scenario?: string;
  options: string[];
  correctAnswer: number;
  category: string;
  difficulty: number;
  explanation?: string;
}

export const QUESTION_BANK: Question[] = [
  { id: 'geo_1', question: 'Which ocean is the largest?', options: ['Atlantic Ocean','Indian Ocean','Pacific Ocean','Arctic Ocean'], correctAnswer: 2, category: 'Geography', difficulty: 1, explanation: 'The Pacific Ocean is the largest and deepest ocean on Earth, covering more than 30% of the planet surface.' },
  { id: 'math_1', question: 'What is 15 + 27?', options: ['41','42','43','44'], correctAnswer: 1, category: 'Mathematics', difficulty: 1, explanation: '15 + 27 = 42' },
  { id: 'sci_1', question: 'What planet is known as the Red Planet?', options: ['Venus','Mars','Jupiter','Saturn'], correctAnswer: 1, category: 'Science', difficulty: 1, explanation: 'Mars is called the Red Planet because of iron oxide on its surface.' },
  { id: 'hist_1', question: 'In what year did World War II end?', options: ['1943','1944','1945','1946'], correctAnswer: 2, category: 'History', difficulty: 2, explanation: 'World War II ended in 1945 with Japan surrender in September.' },
  { id: 'geo_2', question: 'What is the capital of France?', options: ['London','Berlin','Paris','Madrid'], correctAnswer: 2, category: 'Geography', difficulty: 1, explanation: 'Paris is the capital and largest city of France.' },
  { id: 'math_2', question: 'What is 144 / 12?', options: ['10','11','12','13'], correctAnswer: 2, category: 'Mathematics', difficulty: 3, explanation: '144 / 12 = 12' },
  { id: 'sci_2', question: 'What is the chemical symbol for gold?', options: ['Go','Gd','Au','Ag'], correctAnswer: 2, category: 'Science', difficulty: 3, explanation: 'Au comes from the Latin word for gold, aurum.' },
  { id: 'geo_3', question: 'Which country has the longest coastline in the world?', options: ['Australia','Russia','Canada','Indonesia'], correctAnswer: 2, category: 'Geography', difficulty: 4, explanation: 'Canada has the longest coastline at over 202,000 kilometers.' },
  { id: 'hist_2', question: 'Who was the first person to walk on the moon?', options: ['Buzz Aldrin','Neil Armstrong','John Glenn','Yuri Gagarin'], correctAnswer: 1, category: 'History', difficulty: 2, explanation: 'Neil Armstrong walked on the moon on July 20, 1969.' },
  { id: 'sci_3', question: 'How many bones are in the adult human body?', options: ['196','206','216','226'], correctAnswer: 1, category: 'Science', difficulty: 4, explanation: 'An adult human has 206 bones.' },
  { id: 'math_3', question: 'A product costs $80, on sale for 25% off. What is the sale price?', options: ['$55','$60','$65','$70'], correctAnswer: 1, category: 'Mathematics', difficulty: 5, explanation: '25% of $80 is $20, so $80 - $20 = $60' },
  { id: 'geo_4', question: 'What is the smallest country in the world by land area?', options: ['Monaco','San Marino','Vatican City','Liechtenstein'], correctAnswer: 2, category: 'Geography', difficulty: 5, explanation: 'Vatican City is the smallest country at just 0.17 square miles.' },
  { id: 'hist_3', question: 'Which ancient wonder is the only one still standing?', options: ['Hanging Gardens of Babylon','Colossus of Rhodes','Great Pyramid of Giza','Lighthouse of Alexandria'], correctAnswer: 2, category: 'History', difficulty: 5, explanation: 'The Great Pyramid of Giza is the only remaining ancient wonder.' },
  { id: 'sci_4', question: 'What is the speed of light in a vacuum?', options: ['299,792 km/s','199,792 km/s','399,792 km/s','99,792 km/s'], correctAnswer: 0, category: 'Science', difficulty: 6, explanation: 'The speed of light is approximately 299,792 km/s.' },
  { id: 'art_1', question: 'Who painted the Mona Lisa?', options: ['Michelangelo','Leonardo da Vinci','Raphael','Donatello'], correctAnswer: 1, category: 'Art', difficulty: 2, explanation: 'Leonardo da Vinci painted the Mona Lisa between 1503 and 1519.' },
  { id: 'math_4', question: 'A 20% coupon + 10% store discount on $100, applied sequentially. Final price?', options: ['$70','$72','$75','$80'], correctAnswer: 1, category: 'Mathematics', difficulty: 7, explanation: '$100 x 0.8 = $80, then $80 x 0.9 = $72' },
  { id: 'sci_5', question: 'What is the most abundant gas in Earth atmosphere?', options: ['Oxygen','Carbon Dioxide','Nitrogen','Argon'], correctAnswer: 2, category: 'Science', difficulty: 6, explanation: 'Nitrogen makes up about 78% of Earth atmosphere.' },
  { id: 'hist_4', question: 'Which empire was ruled by Genghis Khan?', options: ['Ottoman Empire','Roman Empire','Mongol Empire','Byzantine Empire'], correctAnswer: 2, category: 'History', difficulty: 5, explanation: 'Genghis Khan founded and ruled the Mongol Empire.' },
  { id: 'geo_5', question: 'What is the deepest point in Earth oceans?', options: ['Puerto Rico Trench','Java Trench','Mariana Trench','Tonga Trench'], correctAnswer: 2, category: 'Geography', difficulty: 7, explanation: 'The Mariana Trench is the deepest point at approximately 36,000 feet.' },
  { id: 'lit_1', question: 'Who wrote Romeo and Juliet?', options: ['Charles Dickens','William Shakespeare','Jane Austen','Mark Twain'], correctAnswer: 1, category: 'Literature', difficulty: 2, explanation: 'William Shakespeare wrote Romeo and Juliet around 1594-1596.' },
  { id: 'sci_6', question: 'What is the hardest natural substance on Earth?', options: ['Diamond','Graphene','Tungsten','Titanium'], correctAnswer: 0, category: 'Science', difficulty: 6, explanation: 'Diamond rates 10 on the Mohs hardness scale.' },
  { id: 'hist_5', question: 'The fall of Constantinople in 1453 marked the end of which empire?', options: ['Roman Empire','Byzantine Empire','Ottoman Empire','Persian Empire'], correctAnswer: 1, category: 'History', difficulty: 8, explanation: 'Constantinople falling to the Ottomans ended the Byzantine Empire.' },
  { id: 'geo_6', question: 'Which desert is the largest hot desert in the world?', options: ['Arabian Desert','Gobi Desert','Sahara Desert','Kalahari Desert'], correctAnswer: 2, category: 'Geography', difficulty: 6, explanation: 'The Sahara is the largest hot desert, covering much of North Africa.' },
  { id: 'sci_7', question: 'What is the powerhouse of the cell?', options: ['Nucleus','Ribosome','Mitochondria','Chloroplast'], correctAnswer: 2, category: 'Science', difficulty: 4, explanation: 'Mitochondria generate most of the cell energy as ATP.' },
];

export function getRandomQuestion(usedQuestionIds: string[]): Question {
  const available = QUESTION_BANK.filter(q => !usedQuestionIds.includes(q.id));
  const pool = available.length === 0 ? QUESTION_BANK : available;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function calculateQuestionPoints(isCorrect: boolean, timeElapsed: number): number {
  if (!isCorrect) return -50;
  let speedBonus = 0;
  if (timeElapsed <= 5) speedBonus = 200;
  else if (timeElapsed <= 15) speedBonus = 150 - ((timeElapsed - 5) * 5);
  else if (timeElapsed <= 25) speedBonus = 100 - ((timeElapsed - 15) * 5);
  else speedBonus = Math.max(0, 50 - ((timeElapsed - 25) * 10));
  return Math.floor(100 + speedBonus);
}
