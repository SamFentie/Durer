import { images } from "./constants";
import moment from "moment";
export default  sampleProfileData =[ {
  id: "sample-id",
  companyName: "Company name",
  bio: "Bio/slogan",
  productService: "Product or service",
  gender:"male",
  dob:"10-5-2000",
  profilePictures:[
      "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=",
      "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
      "https://cdn3.pixelcut.app/7/20/uncrop_hero_bdf08a8ca6.jpg",
    ],
  stats: {
    following: "238",
    followers: "55.7K",
    rating: 4.5
  },
  contacts: {
    phone: "+251911223344",
    email: "company@example.com",
    website: "www.company.com"
  },
  address: {
    street: "Bole Road",
    city: "Addis Ababa",
    country: "Ethiopia"
  },
  socialMedia: {
    facebook: "company.facebook",
    twitter: "company.twitter",
    instagram: "company.instagram"
  },
  productServices: [
    "Product 1",
    "Service 1",
    "Product 2",
    "Service 2"
  ],
  licenses: [
    {
      name: "Business License",
      number: "LIC123456"
    },
    {
      name: "Trade Certificate",
      number: "CERT789012"
    }
  ],
  demands: [
    {
        status: false,
        id: 1,
        text_question: "I need drone camera for 4 days rent June 8- June 11",
        image_question: images.testimage,
        voice_question:
          "https://assets.mixkit.co/active_storage/sfx/995/995-preview.mp3",
        further_question: [
          " how much is the price?",
          "how much is the price?",
          "how much is the price?",
        ],
        demand_category: ["Clothing", "dgsahdsdsadbsdsdbscccc", "Designer"],
        is_answered: "#Designer #dgsahdsdsadbsdsdbscccc",
        user: "Siham Joo",
        user_profile: images.profile,
        number_of_intreactions: 3,
        createdAt: moment(new Date(), "YYYYMMDD").fromNow(),
      },
      {
        status: true,
        id: 2,
        text_question:
          "I need a green Fancy dress for photo shoot. I need a expert designer to design the dress. I need it for May  0",
        image_question: images.shope,
        voice_question: null,
        further_question: [
          " how much is the price?",
          "how much is the price?",
          "how much is the price?",
        ],
        demand_category: ["Designer", "Designer", "Designer"],
        is_answered: "#Designer #clothing",
        user: "Amand Joo",
        user_profile: images.profile,
        number_of_intreactions: 126,
        createdAt: moment(new Date(), "YYYYMMDD").fromNow(),
      },
      {
        status: true,
        id: 3,
        text_question:
          "I need a green Fancy dress for photo shoot. I need a expert designer to design the dress. I need it for May  0",
    
        image_question: null,
        voice_question:
          "https://assets.mixkit.co/active_storage/sfx/1714/1714-preview.mp3",
        further_question: [
          " how much is the price?",
          "how much is the price?",
          "how much is the price?",
        ],
        demand_category: ["Designer", "Designer", "Designer"],
        is_answered: "#Designer #clothing",
        user: "Siham Joo",
        user_profile: images.profile,
        number_of_intreactions: 67,
        createdAt: moment(new Date(), "YYYYMMDD").fromNow(),
      },
  ]
}]