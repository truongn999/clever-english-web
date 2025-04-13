export interface Story {
  id: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  readingTime: string;
  category: string;
  thumbnail: string;
  featured: boolean;
  popular: boolean;
  date: string;
  content: string;
  vocabulary: VocabularyItem[];
  comprehensionQuestions: ComprehensionQuestion[];
}

export interface VocabularyItem {
  word: string;
  definition: string;
  example: string;
  synonyms: string[];
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface ComprehensionQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const storiesData: Story[] = [
  {
    id: '1',
    title: 'The Lost Key',
    description: 'A short story about a boy who loses his house key and the adventure that follows.',
    level: 'Beginner',
    readingTime: '5 min',
    category: 'Daily Life',
    thumbnail: 'https://images.unsplash.com/photo-1582727657635-c771002bdada?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: true,
    popular: true,
    date: '2023-10-15',
    content: `<p>Tom was having a bad day. He woke up late for school and had to rush. He grabbed his backpack and ran out the door. But when he got to school, he realized something terrible. He didn\'t have his house key!</p>
    
    <p>"Oh no," Tom thought. "Mom is at work until 6:00 PM. How will I get into the house after school?"</p>
    
    <p>During lunch, Tom told his friend Sam about his problem.</p>
    
    <p>"Why don\'t you go to your neighbor\'s house?" Sam suggested. "You can wait there until your mom comes home."</p>
    
    <p>Tom thought this was a good idea. His neighbor, Mrs. Johnson, was always kind to him.</p>
    
    <p>After school, Tom went to Mrs. Johnson\'s house and knocked on the door. Mrs. Johnson opened the door with a smile.</p>
    
    <p>"Hello, Tom! What brings you here today?" she asked.</p>
    
    <p>"I forgot my key, and my mom won\'t be home until 6:00. Can I wait here?" Tom explained.</p>
    
    <p>"Of course! Come in," Mrs. Johnson said. "I just baked some cookies. Would you like some?"</p>
    
    <p>Tom spent the afternoon with Mrs. Johnson. She told him stories about when she was young. Tom helped her water her plants. They had a wonderful time together.</p>
    
    <p>At 6:00, Tom\'s mom called Mrs. Johnson\'s phone.</p>
    
    <p>"Is Tom with you?" she asked. "I found his key in the kitchen."</p>
    
    <p>"Yes, he\'s here," Mrs. Johnson replied. "We've had a lovely afternoon."</p>
    
    <p>Tom\'s mom came to pick him up. Tom thanked Mrs. Johnson for her kindness.</p>
    
    <p>"You're welcome anytime, Tom," Mrs. Johnson said. "Key or no key!"</p>
    
    <p>On the way home, Tom realized something important. Sometimes, forgetting something can lead to unexpected adventures and new friendships.</p>`,
    vocabulary: [
      {
        word: 'rush',
        definition: 'to move or do something very quickly',
        example: 'He had to rush to catch the bus.',
        synonyms: ['hurry', 'dash', 'race'],
        level: 'Beginner'
      },
      {
        word: 'realized',
        definition: 'to become fully aware of something as a fact',
        example: 'She suddenly realized she had left her phone at home.',
        synonyms: ['understand', 'recognize', 'comprehend'],
        level: 'Beginner'
      },
      {
        word: 'suggested',
        definition: 'to mention an idea or plan for someone to think about',
        example: 'He suggested going to the movies.',
        synonyms: ['propose', 'recommend', 'advise'],
        level: 'Beginner'
      },
      {
        word: 'neighbor',
        definition: 'a person who lives near you',
        example: 'Our neighbors have a beautiful garden.',
        synonyms: ['resident', 'local', 'inhabitant'],
        level: 'Beginner'
      },
      {
        word: 'unexpected',
        definition: 'not anticipated or predicted',
        example: 'His visit was completely unexpected.',
        synonyms: ['surprising', 'unforeseen', 'unanticipated'],
        level: 'Intermediate'
      }
    ],
    comprehensionQuestions: [
      {
        question: 'Why couldn\'t Tom get into his house after school?',
        options: [
          'He lost his backpack',
          'He forgot his house key',
          'His mom locked him out',
          'The door was broken'
        ],
        correctAnswer: 1,
        explanation: 'Tom realized he didn\'t have his house key when he got to school.'
      },
      {
        question: 'Who suggested that Tom go to his neighbor\'s house?',
        options: [
          'His mother',
          'Mrs. Johnson',
          'His teacher',
          'His friend Sam'
        ],
        correctAnswer: 3,
        explanation: 'During lunch, Tom\'s friend Sam suggested he go to his neighbor\'s house.'
      },
      {
        question: 'What did Mrs. Johnson offer Tom when he arrived?',
        options: [
          'Money',
          'A ride home',
          'Cookies',
          'A new key'
        ],
        correctAnswer: 2,
        explanation: 'Mrs. Johnson had just baked some cookies and offered them to Tom.'
      },
      {
        question: 'Where did Tom\'s mom find his key?',
        options: [
          'In the kitchen',
          'At school',
          'In his backpack',
          'At Mrs. Johnson\'s house'
        ],
        correctAnswer: 0,
        explanation: 'Tom\'s mom found his key in the kitchen.'
      },
      {
        question: 'What lesson did Tom learn from this experience?',
        options: [
          'Never trust neighbors',
          'Always double-check for his key',
          'Call his mom immediately when there\'s a problem',
          'Sometimes forgetting things can lead to unexpected adventures'
        ],
        correctAnswer: 3,
        explanation: 'On the way home, Tom realized that sometimes forgetting something can lead to unexpected adventures and new friendships.'
      }
    ]
  },
  {
    id: '2',
    title: 'The Mysterious Painting',
    description: 'A story about an art student who discovers a painting with a hidden secret.',
    level: 'Intermediate',
    readingTime: '8 min',
    category: 'Mystery',
    thumbnail: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: true,
    popular: false,
    date: '2023-10-10',
    content: `<p>Emma loved art. Every weekend, she visited the local art museum to study the paintings. She was an art student at the university, and she wanted to learn from the masters.</p>
    
    <p>One Saturday, Emma noticed something unusual. There was a new painting in the modern art section. It showed a landscape with a small cottage by a lake. The colors were vibrant, and the technique was impressive. But something about it caught Emma\'s attention. In the corner of the painting, there appeared to be a small code or signature that didn\'t look like the artist\'s name.</p>
    
    <p>"That\'s strange," Emma thought. She moved closer to examine it.</p>
    
    <p>The code consisted of numbers and letters: "N47° W122° 1962." Emma took out her notebook and wrote it down.</p>
    
    <p>When she got home, Emma researched the painting online. The artist was Jonathan Reed, a relatively unknown painter from the 1960s. According to the museum\'s website, the painting was donated anonymously last month.</p>
    
    <p>Emma couldn\'t stop thinking about the code. After some research, she realized that N47° W122° looked like geographical coordinates. She entered them into a map application on her computer.</p>
    
    <p>The coordinates pointed to a location near Seattle, Washington. And 1962 must be a year. But what did it mean?</p>
    
    <p>Emma decided to email the museum curator, Dr. Martinez, about her discovery.</p>
    
    <p>The next day, Dr. Martinez called Emma.</p>
    
    <p>"Your observation is fascinating," he said. "We didn\'t notice that detail. Jonathan Reed disappeared mysteriously in 1962, and no one knew what happened to him. These coordinates might be a clue."</p>
    
    <p>A week later, Emma received another call from Dr. Martinez.</p>
    
    <p>"Emma, you won\'t believe this. We contacted authorities in Seattle. They investigated the location, and they found a small time capsule buried there. Inside was a journal belonging to Jonathan Reed. It reveals that he decided to start a new life under a different name. The anonymous donor of the painting was his grandson, who discovered the truth after Reed passed away last year."</p>
    
    <p>Emma was amazed. Her careful observation had helped solve a decades-old mystery.</p>
    
    <p>"We're organizing a special exhibition about Jonathan Reed\'s life and work," Dr. Martinez continued. "Would you like to help curate it?"</p>
    
    <p>Emma couldn\'t believe her luck. Her passion for art had led to an unexpected opportunity. Sometimes, the smallest details can lead to the biggest discoveries.</p>`,
    vocabulary: [
      {
        word: 'vibrant',
        definition: 'full of energy, brightness, and life',
        example: 'The painting used vibrant colors that caught everyone\'s attention.',
        synonyms: ['bright', 'vivid', 'intense'],
        level: 'Intermediate'
      },
      {
        word: 'technique',
        definition: 'a way of carrying out a particular task, especially the execution or performance of an artistic work',
        example: 'Her painting technique has improved significantly over the years.',
        synonyms: ['method', 'approach', 'procedure'],
        level: 'Intermediate'
      },
      {
        word: 'coordinates',
        definition: 'a set of numbers or values that designate the position of a point',
        example: 'The GPS gave us the exact coordinates of the location.',
        synonyms: ['position', 'location', 'bearings'],
        level: 'Intermediate'
      },
      {
        word: 'curator',
        definition: 'a keeper or custodian of a museum or other collection',
        example: 'The museum curator organized a special exhibition of Renaissance art.',
        synonyms: ['keeper', 'conservator', 'custodian'],
        level: 'Advanced'
      },
      {
        word: 'capsule',
        definition: 'a small container that encloses something else, especially one that preserves its contents for the future',
        example: 'They buried a time capsule containing items from the current era.',
        synonyms: ['container', 'case', 'receptacle'],
        level: 'Intermediate'
      }
    ],
    comprehensionQuestions: [
      {
        question: 'What did Emma notice about the new painting?',
        options: [
          'It was painted by a famous artist',
          'It had a small code or signature in the corner',
          'It was damaged',
          'It was very expensive'
        ],
        correctAnswer: 1,
        explanation: 'Emma noticed a small code or signature in the corner of the painting that didn\'t look like the artist\'s name.'
      },
      {
        question: 'What was the code in the painting?',
        options: [
          'A phone number',
          'The artist\'s secret name',
          'Geographical coordinates and a year',
          'A hidden message about art'
        ],
        correctAnswer: 2,
        explanation: 'The code consisted of "N47° W122° 1962," which were geographical coordinates and a year.'
      },
      {
        question: 'Who was Jonathan Reed?',
        options: [
          'The museum curator',
          'Emma\'s professor',
          'A relatively unknown painter from the 1960s',
          'The person who donated the painting'
        ],
        correctAnswer: 2,
        explanation: 'Jonathan Reed was a relatively unknown painter from the 1960s who disappeared mysteriously in 1962.'
      },
      {
        question: 'What was found at the coordinates?',
        options: [
          'Another painting',
          'A small time capsule with Reed\'s journal',
          'The artist himself',
          'Nothing important'
        ],
        correctAnswer: 1,
        explanation: 'Authorities found a small time capsule buried at the location, which contained a journal belonging to Jonathan Reed.'
      },
      {
        question: 'Who donated the painting to the museum?',
        options: [
          'Emma',
          'Dr. Martinez',
          'Jonathan Reed himself',
          'Reed\'s grandson'
        ],
        correctAnswer: 3,
        explanation: 'The anonymous donor of the painting was Jonathan Reed\'s grandson, who discovered the truth after Reed passed away.'
      }
    ]
  },
  {
    id: '3',
    title: 'The Job Interview',
    description: 'A story about overcoming nervousness and finding confidence during a job interview.',
    level: 'Intermediate',
    readingTime: '7 min',
    category: 'Career',
    thumbnail: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: false,
    popular: true,
    date: '2023-10-05',
    content: `<p>Sarah\'s hands were trembling as she sat in the waiting room. In fifteen minutes, she would have her interview for her dream job at a prestigious marketing firm. She had prepared for weeks, researching the company, practicing answers to common interview questions, and selecting the perfect outfit. But now, her confidence was fading.</p>
    
    <p>"What if I forget everything? What if they don\'t like me?" she thought anxiously.</p>
    
    <p>Sarah took a deep breath and tried to calm her nerves. She reminded herself of all her accomplishments and qualifications. She had graduated with honors and had two years of relevant experience. She deserved this opportunity.</p>
    
    <p>Just then, a young man sat down next to her. He looked equally nervous.</p>
    
    <p>"Are you here for the marketing position too?" he asked.</p>
    
    <p>Sarah nodded. "Yes, I'm so nervous I can hardly think straight."</p>
    
    <p>The man smiled. "Me too. I'm David, by the way."</p>
    
    <p>"I'm Sarah. Have you had many interviews before?"</p>
    
    <p>"This is my third this month," David replied. "I've learned that the key is to be authentic. They're not just looking for skills; they're looking for someone who fits their company culture."</p>
    
    <p>Sarah appreciated his advice. They chatted for a few minutes, and Sarah began to feel more relaxed.</p>
    
    <p>"Sarah Johnson?" A woman with a clipboard called her name.</p>
    
    <p>"That\'s me," Sarah said, standing up. "Good luck, David."</p>
    
    <p>"You too," he replied with a thumbs-up.</p>
    
    <p>As Sarah followed the woman to the interview room, she felt a new sense of calm. The interview panel consisted of three people who greeted her warmly.</p>
    
    <p>"Tell us about yourself, Sarah," the first interviewer began.</p>
    
    <p>Sarah took a deep breath and began to speak. She focused on being authentic, as David had suggested. Instead of reciting rehearsed answers, she spoke genuinely about her passion for marketing and her experiences.</p>
    
    <p>The interview flowed naturally. Sarah answered questions confidently and asked thoughtful questions about the company. Before she knew it, an hour had passed.</p>
    
    <p>"Thank you for your time, Sarah," the lead interviewer said. "We've been impressed with your responses. We'll be in touch soon."</p>
    
    <p>As Sarah left the building, she saw David waiting for his turn.</p>
    
    <p>"How did it go?" he asked.</p>
    
    <p>"Much better than I expected," Sarah replied with a smile. "Thank you for your advice about being authentic. It really helped."</p>
    
    <p>"That\'s great to hear," David said. "Maybe we'll end up being colleagues!"</p>
    
    <p>A week later, Sarah received a phone call offering her the position. She had conquered her nervousness and found her confidence when it mattered most. And she had made a new friend in the process.</p>`,
    vocabulary: [
      {
        word: 'trembling',
        definition: 'shaking or quivering, typically as a result of anxiety, excitement, or frailty',
        example: 'His hands were trembling with nervousness.',
        synonyms: ['shaking', 'quivering', 'shivering'],
        level: 'Intermediate'
      },
      {
        word: 'prestigious',
        definition: 'inspiring respect and admiration; having high status',
        example: 'She works for a prestigious law firm.',
        synonyms: ['respected', 'distinguished', 'esteemed'],
        level: 'Advanced'
      },
      {
        word: 'anxiously',
        definition: 'in a manner showing worry, nervousness, or unease',
        example: 'She waited anxiously for the test results.',
        synonyms: ['nervously', 'worriedly', 'uneasily'],
        level: 'Intermediate'
      },
      {
        word: 'authentic',
        definition: 'genuine or real; not fake or imitation',
        example: 'The restaurant serves authentic Italian cuisine.',
        synonyms: ['genuine', 'real', 'true'],
        level: 'Intermediate'
      },
      {
        word: 'conquered',
        definition: 'successfully overcome or dealt with (a problem or difficulty)',
        example: 'She finally conquered her fear of flying.',
        synonyms: ['overcome', 'defeat', 'master'],
        level: 'Intermediate'
      }
    ],
    comprehensionQuestions: [
      {
        question: 'Why was Sarah nervous?',
        options: [
          'She was late for the interview',
          'She was interviewing for her dream job',
          'She forgot her resume',
          'She didn\'t know anything about the company'
        ],
        correctAnswer: 1,
        explanation: 'Sarah was nervous because she was about to have an interview for her dream job at a prestigious marketing firm.'
      },
      {
        question: 'What advice did David give to Sarah?',
        options: [
          'To speak loudly during the interview',
          'To ask for a high salary',
          'To be authentic during the interview',
          'To wear professional clothes'
        ],
        correctAnswer: 2,
        explanation: 'David advised Sarah that the key is to be authentic, as companies are looking for someone who fits their company culture.'
      },
      {
        question: 'How did Sarah feel after talking with David?',
        options: [
          'More nervous',
          'More relaxed',
          'Confused',
          'Competitive'
        ],
        correctAnswer: 1,
        explanation: 'After chatting with David for a few minutes, Sarah began to feel more relaxed.'
      },
      {
        question: 'How did Sarah approach the interview after David\'s advice?',
        options: [
          'She recited rehearsed answers',
          'She spoke genuinely about her passion and experiences',
          'She tried to impress them with technical jargon',
          'She was very formal and serious'
        ],
        correctAnswer: 1,
        explanation: 'Instead of reciting rehearsed answers, Sarah spoke genuinely about her passion for marketing and her experiences.'
      },
      {
        question: 'What was the outcome of Sarah\'s interview?',
        options: [
          'She was rejected',
          'She was offered the position',
          'She was asked to come back for a second interview',
          'The story doesn\'t say'
        ],
        correctAnswer: 1,
        explanation: 'A week later, Sarah received a phone call offering her the position.'
      }
    ]
  },
  
  {
    id: '6',
    title: 'The Digital Detox',
    description: 'A story about a tech-addicted professional who discovers the benefits of disconnecting.',
    level: 'Intermediate',
    readingTime: '8 min',
    category: 'Modern Life',
    thumbnail: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: false,
    popular: false,
    date: '2023-09-15',
    content: `<p>Michael couldn\'t remember the last time he had gone more than an hour without checking his phone. As a digital marketing manager, he was constantly connected—responding to emails, monitoring social media campaigns, and attending virtual meetings. His phone buzzed with notifications day and night, and he prided himself on his quick response time.</p>
    
    <p>But lately, Michael had been feeling exhausted and irritable. He had trouble sleeping, often lying awake with his mind racing through work tasks. His girlfriend, Elena, had commented several times that he seemed distracted whenever they spent time together.</p>
    
    <p>"You're always half-present," she told him during dinner one evening. "Your body is here, but your mind is on your phone."</p>
    
    <p>Michael wanted to argue, but at that exact moment, he felt the familiar urge to check his phone, which was face-down on the table. He realized Elena was right.</p>
    
    <p>The next day, Michael came across an article about "digital detox"—the practice of deliberately disconnecting from digital devices for a period of time. The article claimed that taking a break from technology could reduce stress, improve sleep, and enhance real-life relationships.</p>
    
    <p>"I should try this," Michael thought. But the idea of being completely disconnected made him anxious. What about work emergencies? What if he missed something important?</p>
    
    <p>After much consideration, Michael decided to start small. He would take a weekend digital detox at a cabin in the mountains, where cell service was limited anyway. He informed his team that he would be unreachable for the weekend but provided Elena\'s number for genuine emergencies.</p>
    
    <p>As Michael drove to the cabin on Friday evening, he already felt a sense of withdrawal. His hand kept reaching for his phone, which he had placed in the glove compartment.</p>
    
    <p>Upon arriving at the cabin, Michael turned off his phone and put it in a drawer. "Just for the weekend," he reminded himself.</p>
    
    <p>The first evening was challenging. Michael felt restless and kept wondering what emails he was missing. He picked up a novel he had brought but found it hard to concentrate. His mind kept wandering to work matters.</p>
    
    <p>The next morning, Michael woke up without the usual jolt from his alarm. Sunlight streamed through the window, and birds chirped outside. He realized he had slept better than he had in months.</p>
    
    <p>After breakfast, Michael went for a hike. Without the distraction of his phone, he noticed details he might have otherwise missed—the intricate patterns on tree bark, the various bird calls, the changing colors of the sky. He felt fully present in a way he hadn\'t experienced in years.</p>
    
    <p>That evening, Michael sat on the cabin\'s porch, watching the sunset. He felt a profound sense of calm. His mind wasn\'t racing through a to-do list or anticipating the next notification. He was simply experiencing the moment.</p>
    
    <p>By Sunday afternoon, when it was time to return to the city, Michael felt refreshed and clear-headed. He was reluctant to turn his phone back on but knew he needed to prepare for the work week.</p>
    
    <p>When he finally powered up his device, dozens of notifications flooded in. But surprisingly, there were no emergencies. The world had continued without his constant attention.</p>
    
    <p>Back at work on Monday, Michael implemented some changes. He set specific times to check emails rather than responding immediately to every notification. He turned off non-essential alerts and established "phone-free" periods during his day.</p>
    
    <p>Elena noticed the difference immediately. "You seem more relaxed," she commented. "And you're actually listening when I talk."</p>
    
    <p>Michael smiled. "I realized that being constantly connected was disconnecting me from what really matters."</p>
    
    <p>His weekend digital detox had been a small step, but it had shown him a different way of living—one where technology was a tool, not a master. And while he knew he couldn\'t completely disconnect in his line of work, he could create boundaries that allowed him to be more present in his life.</p>
    
    <p>"Sometimes," Michael thought, "the most valuable connection is the one with the present moment."</p>`,
    vocabulary: [
      {
        word: 'detox',
        definition: 'a process or period of time in which one abstains from or rids the body of toxic or unhealthy substances',
        example: 'She did a juice detox for three days.',
        synonyms: ['cleanse', 'purification', 'purge'],
        level: 'Intermediate'
      },
      {
        word: 'withdrawal',
        definition: 'the symptoms that occur when a person suddenly stops a substance they are dependent on',
        example: 'He experienced caffeine withdrawal when he stopped drinking coffee.',
        synonyms: ['craving', 'yearning', 'longing'],
        level: 'Intermediate'
      },
      {
        word: 'restless',
        definition: 'unable to rest or relax as a result of anxiety or boredom',
        example: 'She spent a restless night worrying about the exam.',
        synonyms: ['uneasy', 'agitated', 'fidgety'],
        level: 'Intermediate'
      },
      {
        word: 'intricate',
        definition: 'very complicated or detailed',
        example: 'The watch had an intricate mechanism.',
        synonyms: ['complex', 'complicated', 'detailed'],
        level: 'Advanced'
      },
      {
        word: 'profound',
        definition: 'very great or intense; having intellectual depth',
        example: 'The experience had a profound effect on her life.',
        synonyms: ['deep', 'intense', 'significant'],
        level: 'Advanced'
      }
    ],
    comprehensionQuestions: [
      {
        question: 'What problem was Michael experiencing at the beginning of the story?',
        options: [
          'He was unemployed',
          'He was constantly connected to his devices and feeling exhausted',
          'He had a fight with his girlfriend',
          'He was lost in the mountains'
        ],
        correctAnswer: 1,
        explanation: 'Michael was constantly connected to his digital devices, which was making him feel exhausted and irritable.'
      },
      
    ]
  }
];