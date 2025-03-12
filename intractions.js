import images from "./constants/images";
// import { images } from "./constants/images";
import moment from "moment";

export const intractionData = [
  {
    id: 1,
    text_question: "I need drone camera for 4 days rent June 8- June 11",
    image_question: images.testimage,
    voice_question:
      "https://glassbrassparde.s3.us-east-2.amazonaws.com/NBSPLV+-+The+Lost+Soul+Down+(Slowed+Reverb).mp3",
    further_question: [
      " how much is the price?",
      "In what colors do you have?",
      "Do you give warrenty?",
    ],
    demand_category: ["Designer", "Designer", "Designer"],
    is_answered: "#Designer #clothing",
    user: "Siham Joo",
    user_profile: images.profile,
    intractions: [
      {
        id: 2,
        intraction_type: 1,
        company_name: "Siham marketing",
        company_profile: images.shope,
        answers: [
          { q: "What is the price?", fQ_ans: "Birr 4000" },
          { q: "What color do you have?", fQ_ans: "Black,White,Beige" },
          { q: "Warrenty",fQ_ans: "We will provide one year warrenty for all bags?",},
        ],
      },
      {
        id: 2,
        intraction_type: 0,
        company_name: "M&M marketing",
        company_profile: images.shope,
        answers: [
          { q: "What is the price?", fQ_ans: "Birr 4000" },
          { q: "What color do you have?", fQ_ans: "Black,White,Beige" },
          { q: "Warrenty",fQ_ans: "We will provide one year warrenty for all bags?",},
        ],
      },
      {
        id: 3,
        intraction_type: 1,
        company_name: "B&B marketing",
        company_profile: images.shope,
        answers: [
          { q: "What is the price?", fQ_ans: "Birr 4000" },
          { q: "What color do you have?", fQ_ans: "Black,White,Beige" },
          { q: "Warrenty",fQ_ans: "We will provide one year warrenty for all bags?",},
        ],
      },
      {
        id: 4,
        intraction_type: 0,
        company_name: "F&F marketing",
        company_profile: images.shope,
        answers: [
          { q: "What is the price?", fQ_ans: "Birr 4000" },
          { q: "What color do you have?", fQ_ans: "Black,White,Beige" },
          { q: "Warrenty",fQ_ans: "We will provide one year warrenty for all bags?",},
        ],
      },
      {
        id: 5,
        intraction_type: 1,
        company_name: "S&S marketing",
        company_profile: images.shope,
        answers: [
          { q: "What is the price?", fQ_ans: "Birr 4000" },
          { q: "What color do you have?", fQ_ans: "Black,White,Beige" },
          { q: "Warrenty",fQ_ans: "We will provide one year warrenty for all bags?",},
        ],
      },
      {
        id: 6,
        intraction_type: 0,
        company_name: "K&K marketing",
        company_profile: images.shope,
        answers: [
          { q: "What is the price?", fQ_ans: "Birr 4000" },
          { q: "What color do you have?", fQ_ans: "Black,White,Beige" },
          { q: "Warrenty",fQ_ans: "We will provide one year warrenty for all bags?",},
        ],
      },
      {
        id: 7,
        intraction_type: 1,
        company_name: "R&R marketing",
        company_profile: images.shope,
        answers: [
          { q: "What is the price?", fQ_ans: "Birr 4000" },
          { q: "What color do you have?", fQ_ans: "Black,White,Beige" },
          { q: "Warrenty",fQ_ans: "We will provide one year warrenty for all bags?",},
        ],
      },
      {
        id: 8,
        intraction_type: 1,
        company_name: "W&W marketing",
        company_profile: images.shope,
        answers: [
          { q: "What is the price?", fQ_ans: "Birr 4000" },
          { q: "What color do you have?", fQ_ans: "Black,White,Beige" },
          { q: "Warrenty",fQ_ans: "We will provide one year warrenty for all bags?",},
        ],
      },
      {
        id: 9,
        intraction_type: 1,
        company_name: "N&N marketing",
        company_profile: images.shope,
        answers: [
          { q: "What is the price?", fQ_ans: "Birr 4000" },
          { q: "What color do you have?", fQ_ans: "Black,White,Beige" },
          { q: "Warrenty",fQ_ans: "We will provide one year warrenty for all bags?",},
        ],
      },
    ],
  },
  {
    id: 2,
    text_question: "I need drone camera for 4 days rent June 8- June 11",
    image_question: images.testimage,
    voice_question:
      "https://glassbrassparde.s3.us-east-2.amazonaws.com/NBSPLV+-+The+Lost+Soul+Down+(Slowed+Reverb).mp3",
    further_question: [
      " how much is the price?",
      "In what colors do you have?",
      "Do you give warrenty?",
    ],
    demand_category: ["Designer", "Designer", "Designer"],
    is_answered: "#Designer #clothing",
    user: "Siham Joo",
    user_profile: images.profile,
    createdAt: moment(new Date(), "YYYYMMDD").fromNow(),
    intractions: [
      {
        id: 2,
        intraction_type: 1,
        company_name: "Siham marketing",
        company_profile: images.shope,
        answers: [
          { q: "What is the price?", fQ_ans: "Birr 4000" },
          { q: "What color do you have?", fQ_ans: "Black,White,Beige" },
          { q: "Warrenty",fQ_ans: "We will provide one year warrenty for all bags?",},
        ],
      },
      {
        id: 2,
        intraction_type: 0,
        company_name: "M&M marketing",
        company_profile: images.shope,
        answers: [
          { q: "What is the price?", fQ_ans: "Birr 4000" },
          { q: "What color do you have?", fQ_ans: "Black,White,Beige" },
          { q: "Warrenty",fQ_ans: "We will provide one year warrenty for all bags?",},
        ],
      },
      {
        id: 3,
        intraction_type: 1,
        company_name: "B&B marketing",
        company_profile: images.shope,
        answers: [
          { q: "What is the price?", fQ_ans: "Birr 4000" },
          { q: "What color do you have?", fQ_ans: "Black,White,Beige" },
          { q: "Warrenty",fQ_ans: "We will provide one year warrenty for all bags?",},
        ],
      },
      {
        id: 4,
        intraction_type: 0,
        company_name: "F&F marketing",
        company_profile: images.shope,
        answers: [
          { q: "What is the price?", fQ_ans: "Birr 4000" },
          { q: "What color do you have?", fQ_ans: "Black,White,Beige" },
          { q: "Warrenty",fQ_ans: "We will provide one year warrenty for all bags?",},
        ],
      },
      {
        id: 5,
        intraction_type: 1,
        company_name: "S&S marketing",
        company_profile: images.shope,
        answers: [
          { q: "What is the price?", fQ_ans: "Birr 4000" },
          { q: "What color do you have?", fQ_ans: "Black,White,Beige" },
          { q: "Warrenty",fQ_ans: "We will provide one year warrenty for all bags?",},
        ],
      },
      {
        id: 6,
        intraction_type: 0,
        company_name: "K&K marketing",
        company_profile: images.shope,
        answers: [
          { q: "What is the price?", fQ_ans: "Birr 4000" },
          { q: "What color do you have?", fQ_ans: "Black,White,Beige" },
          { q: "Warrenty",fQ_ans: "We will provide one year warrenty for all bags?",},
        ],
      },
      {
        id: 7,
        intraction_type: 1,
        company_name: "R&R marketing",
        company_profile: images.shope,
        answers: [
          { q: "What is the price?", fQ_ans: "Birr 4000" },
          { q: "What color do you have?", fQ_ans: "Black,White,Beige" },
          { q: "Warrenty",fQ_ans: "We will provide one year warrenty for all bags?",},
        ],
      },
      {
        id: 8,
        intraction_type: 1,
        company_name: "W&W marketing",
        company_profile: images.shope,
        answers: [
          { q: "What is the price?", fQ_ans: "Birr 4000" },
          { q: "What color do you have?", fQ_ans: "Black,White,Beige" },
          { q: "Warrenty",fQ_ans: "We will provide one year warrenty for all bags?",},
        ],
      },
      {
        id: 9,
        intraction_type: 0,
        company_name: "N&N marketing",
        company_profile: images.shope,
        answers: [
          { q: "What is the price?", fQ_ans: "Birr 4000" },
          { q: "What color do you have?", fQ_ans: "Black,White,Beige" },
          { q: "Warrenty",fQ_ans: "We will provide one year warrenty for all bags?",},
        ],
      },
    ],
  },
  {
    id: 1,
    text_question: "I need drone camera for 4 days rent June 8- June 11",
    image_question: null,
    voice_question:
      "https://glassbrassparde.s3.us-east-2.amazonaws.com/NBSPLV+-+The+Lost+Soul+Down+(Slowed+Reverb).mp3",
    further_question: [
      " how much is the price?",
      "In what colors do you have?",
      "Do you give warrenty?",
    ],
    demand_category: ["Designer", "Designer", "Designer"],
    is_answered: "#Designer #clothing",
    user: "Siham Joo",
    user_profile: images.profile,
    intractions: [
      {
        id: 2,
        intraction_type: 1,
        company_name: "Siham marketing",
        company_profile: images.shope,
        answers: [
          { q: "What is the price?", fQ_ans: "Birr 4000" },
          { q: "What color do you have?", fQ_ans: "Black,White,Beige" },
          { q: "Warrenty",fQ_ans: "We will provide one year warrenty for all bags?",},
        ],
      },
      {
        id: 2,
        intraction_type: 0,
        company_name: "M&M marketing",
        company_profile: images.shope,
        answers: [
          { q: "What is the price?", fQ_ans: "Birr 4000" },
          { q: "What color do you have?", fQ_ans: "Black,White,Beige" },
          { q: "Warrenty",fQ_ans: "We will provide one year warrenty for all bags?",},
        ],
      },
      {
        id: 3,
        intraction_type: 1,
        company_name: "B&B marketing",
        company_profile: images.shope,
        answers: [
          { q: "What is the price?", fQ_ans: "Birr 4000" },
          { q: "What color do you have?", fQ_ans: "Black,White,Beige" },
          { q: "Warrenty",fQ_ans: "We will provide one year warrenty for all bags?",},
        ],
      },
      {
        id: 4,
        intraction_type: 0,
        company_name: "F&F marketing",
        company_profile: images.shope,
        answers: [
          { q: "What is the price?", fQ_ans: "Birr 4000" },
          { q: "What color do you have?", fQ_ans: "Black,White,Beige" },
          { q: "Warrenty",fQ_ans: "We will provide one year warrenty for all bags?",},
        ],
      },
      {
        id: 5,
        intraction_type: 1,
        company_name: "S&S marketing",
        company_profile: images.shope,
        answers: [
          { q: "What is the price?", fQ_ans: "Birr 4000" },
          { q: "What color do you have?", fQ_ans: "Black,White,Beige" },
          { q: "Warrenty",fQ_ans: "We will provide one year warrenty for all bags?",},
        ],
      },
      {
        id: 6,
        intraction_type: 0,
        company_name: "K&K marketing",
        company_profile: images.shope,
        answers: [
          { q: "What is the price?", fQ_ans: "Birr 4000" },
          { q: "What color do you have?", fQ_ans: "Black,White,Beige" },
          { q: "Warrenty",fQ_ans: "We will provide one year warrenty for all bags?",},
        ],
      },
      {
        id: 7,
        intraction_type: 1,
        company_name: "R&R marketing",
        company_profile: images.shope,
        answers: [
          { q: "What is the price?", fQ_ans: "Birr 4000" },
          { q: "What color do you have?", fQ_ans: "Black,White,Beige" },
          { q: "Warrenty",fQ_ans: "We will provide one year warrenty for all bags?",},
        ],
      },
      {
        id: 8,
        intraction_type: 1,
        company_name: "W&W marketing",
        company_profile: images.shope,
        answers: [
          { q: "What is the price?", fQ_ans: "Birr 4000" },
          { q: "What color do you have?", fQ_ans: "Black,White,Beige" },
          { q: "Warrenty",fQ_ans: "We will provide one year warrenty for all bags?",},
        ],
      },
      {
        id: 9,
        intraction_type: 0,
        company_name: "N&N marketing",
        company_profile: images.shope,
        answers: [
          { q: "What is the price?", fQ_ans: "Birr 4000" },
          { q: "What color do you have?", fQ_ans: "Black,White,Beige" },
          { q: "Warrenty",fQ_ans: "We will provide one year warrenty for all bags?",},
        ],
      },
    ],
  },
];
