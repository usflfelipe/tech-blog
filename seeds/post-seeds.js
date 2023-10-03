const { Post } = require('../models');

const postdata = [
  {
    title: 'I love Bootstrap!',
    post_text: 'Bootstrap makes it easy to build pretty pages. Bootswatch is built on top of Bootstrap and adds some fun to webpages.',
    user_id: 1
  },
  {
    title: 'Some interesting tech news is on the horizon!',
    post_text: "Is the news about the new iPhone? Maybe it's about a Samsung (one that does not explode, I would hope)? What could this exciting news be?",
    user_id: 3
  },
  {
    title: "If you're interested in learning how to code, Bootcamp is the way to go!",
    post_text: "UCF's coding bootcamp will help you become a full stack developer. They even offer career counseling!",
    user_id: 1
  },
  {
    title: 'IBM is hiring former tech workers',
    post_text: 'IBM has a "returnship" program for people that used to work in tech and want to return',
    user_id: 1
  },
  {
    title: "Apple's under unprecedented pressure as it prepares iPhone 13 launch",
    post_text: "The tech giant is fighting regulation in South Korea, a courtroom case in California and employee revolts -- and it's all tied to social media, Slack and the App Store.",
    user_id: 4
  },
  {
    title: 'How video illusionist Zach King enchants millions on TikTok and Instagram',
    post_text: "King's seemingly magical editing tricks have captivated audiences for nearly a decade. CNET gets a behind-the-scenes look at how he creates his mind-bending post_text.",
    user_id: 7
  },
  {
    title: 'You can do better than the Apple Watch Series 3 in 2021, even if you want to save money',
    post_text: "Cheaper doesn't necessarily mean best value.",
    user_id: 1
  },
  {
    title: 'Car buyers are giving up as chip shortage dwindles new car inventories further',
    post_text: 'Kelley Blue Book and Cox Automotive found nearly half of car buyers in the market are ready to call it quits and postpone their purchase.',
    user_id: 1
  },
  {
    title: 'Luminous aurora seen from ISS drapes Earth in a glowing green veil',
    post_text: 'A full moon, an aurora and Earth come together in a mystical moment seen from space.',
    user_id: 9
  },
  {
    title: "Foundation review: Apple's slow-burn sci-fi epic thinks big, looks great",
    post_text: "Isaac Asimov's novels come to Apple TV Plus in a 10-episode series that may be ponderous but genuinely has big ideas to ponder.",
    user_id: 5
  },
  {
    title: "Amazon-owned Whole Foods to add $10 delivery fee to orders next month",
    post_text: 'The expensive supermarket will get more expensive.',
    user_id: 3
  },
  {
    title: "Amazon's Echo and Ring launch event: How to get all the details live",
    post_text: 'The e-commerce giant is holding an invite-only press event starting Sept. 28 at 9 a.m. PT, noon ET.',
    user_id: 10
  },
  {
    title: 'Pokemon Sword and Shield: How to get a free Dada Zarude and Shiny Celebi [last chance]',
    post_text: 'Players who sign up for the Pokemon Trainer Club newsletter by Sept. 25 will receive a free Dada Zarude and Shiny Celebi.',
    user_id: 8
  },
  {
    title: 'HBO Max: A half-off deal is ending, plus movies, shows and everything else to know',
    post_text: 'HBO Max, the main place to stream Emmy winners like Mare of Easttown and Hacks, is running a promo right now offering six months at half price.',
    user_id: 3
  },
  {
    title: "Marvel's Shang-Chi won't be available to stream until Nov. 12",
    post_text: "Shang-Chi will be in theaters exclusively until mid-October. Even after that, it'll be another month until it's on Disney Plus.",
    user_id: 3
  },
  {
    title: "Hulu: The 39 best TV shows to watch tonight",
    post_text: 'Alter Ego, a new music competition show, features singers performing as their digital avatars.',
    user_id: 7
  },
  {
    title: 'Huawei CFO Meng Wanzhou enters agreement with Justice Department',
    post_text: 'The deal will allow the executive to return to China, The New York Times reports.',
    user_id: 6
  },
  {
    title: 'The 2-row Jeep Grand Cherokee will debut on Sept. 29',
    post_text: 'The smaller Grand Cherokee lineup will include a 4xe plug-in hybrid model.',
    user_id: 4
  },
  {
    title: "HBO Max isn't streaming Dear Evan Hansen, sorry",
    post_text: '/diam/neque/vestibulum/eget/vulputate/ut/ultrices.png',
    user_id: 6
  },
  {
    title: 'Shop now or shipping delays could ruin your holidays',
    post_text: 'Supply chains are a mess thanks to COVID, storms and a shortage of key materials. That means Black Friday might be too late to shop for some products.',
    user_id: 7
  }
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;
