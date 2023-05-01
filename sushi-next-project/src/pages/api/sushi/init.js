import connectSushiDB, { sushiDbConnection } from '@/utilities/sushiDBConnect'
import Sushi from '@/models/Sushi'

export default async function handler(req, res) {
  if (!sushiDbConnection.isConnected) {
    await connectSushiDB()
  }

  switch (req.method) {
    case 'POST': {
      await Sushi.insertMany(list)
      const arrayMongo = await Sushi.find()
      const array = arrayMongo.map((item) => {
        return {
          id: item._id,
          title: item.title,
          image: item.image,
          description: item.description,
          price: item.price,
        }
      })
      res.status(200).json(array)
      break
    }
    default:
      res.status(405).json({ message: 'Method not allowed.' })
  }
}

const list = [
  {
    _id: '644ef714e3d6e6f4efaa02b6',
    title: 'Hosomaki Avocado (6 mcx / 6 pcs) ',
    image:
      'https://tb-static.uber.com/prod/image-proc/processed_images/de726add222709c80dbf05f32de076f6/f0d1762b91fd823a1aa9bd0dab5c648d.jpeg',
    description: 'Avocat, sésame / Avocado, sesame',
    price: 495,
    __v: 0,
  },
  {
    _id: '644ef714e3d6e6f4efaa02b7',
    title: 'Takoyaki(5mcx)',
    image:
      'https://tb-static.uber.com/prod/image-proc/processed_images/d3897dce9618d797a6f05b7f9704e661/f0d1762b91fd823a1aa9bd0dab5c648d.jpeg',
    description: 'baked wheat cake of octopus, sauce teriyaki, sauce Japanese',
    price: 899,
    __v: 0,
  },
  {
    _id: '644ef714e3d6e6f4efaa02b8',
    title: ' COMBO KAMIKAZE(11MCX)',
    image:
      'https://tb-static.uber.com/prod/image-proc/processed_images/d7fd9d623ac4fbeaad61e7e04be1a3f6/f0d1762b91fd823a1aa9bd0dab5c648d.jpeg',
    description:
      '5 mcx kamikaze salmon, 3mcx Hosomaki avocado, 3mcx Hosomaki kappa.',
    price: 1299,
    __v: 0,
  },
  {
    _id: '644ef714e3d6e6f4efaa02b9',
    title: 'Combo A(16MCX)',
    image:
      'https://tb-static.uber.com/prod/image-proc/processed_images/84cc41b90cd174f1e4dad96ba43aa0ef/f0d1762b91fd823a1aa9bd0dab5c648d.jpeg',
    description:
      '5 mcx kamikaze salmon, 5mcx spicy shrimp, 3mcx Hosomaki avocado, 3mcx Hosomaki kappa.',
    price: 2899,
    __v: 0,
  },
  {
    _id: '644ef714e3d6e6f4efaa02ba',
    title: 'SAUMON FLOWER(6MCX)',
    image:
      'https://tb-static.uber.com/prod/image-proc/processed_images/90c4aaa3514c0201096769d436847be9/f0d1762b91fd823a1aa9bd0dab5c648d.jpeg',
    description:
      'Saumon saisi à la torche, avocat, tempura, masago rouge, mayo légère épicée, sésame / Torch-seared salmon, avocado, tempura, red masago, spicy light mayo, sesame\n',
    price: 1599,
    __v: 0,
  },
  {
    _id: '644ef714e3d6e6f4efaa02bb',
    title: 'Poke saumon/Salmon Poke',
    image:
      'https://tb-static.uber.com/prod/image-proc/processed_images/3297f74d6171ba1938331d682f2ce1c5/f0d1762b91fd823a1aa9bd0dab5c648d.jpeg',
    description:
      'Saumon, avocat, caviar, concombre, tempura, laitue, chou rouge,\ncarotte,edamame,oignon vert, sauce ponzu, mayo légère épicée, sauce\nteryaki, mayo japonaise, sésame / Salmon, avocado, red masago,\ncucumber,tempura, lettuce, red cabbage, carrot,edamame,green onion, ponzu\nsauce, spicy light mayo, teryaki sauce, japanese mayo, sesame',
    price: 1899,
    __v: 0,
  },
  {
    _id: '644ef714e3d6e6f4efaa02bc',
    title: 'Dragon Eye',
    image:
      'https://tb-static.uber.com/prod/image-proc/processed_images/034d1334561d409ab1f48f6f3244bff6/f0d1762b91fd823a1aa9bd0dab5c648d.jpeg',
    description: 'no description',
    price: 1599,
    __v: 0,
  },
  {
    _id: '644ef714e3d6e6f4efaa02bd',
    title: 'Maki thon épicée（spicy thon）(8 mcx / 8 pcs)',
    image:
      'https://tb-static.uber.com/prod/image-proc/processed_images/3a939708e217ff955a19c9abc7cb5401/4218ca1d09174218364162cd0b1a8cc1.jpeg',
    description:
      'Thon, avocat, tempura, masago orange,mayo légère épicée et sauce épicée, sésame / Tuna,\navocado, tempura, orange masago, spicy light mayo & spicy sauce, sesame',
    price: 1499,
    __v: 0,
  },
  {
    _id: '644ef714e3d6e6f4efaa02be',
    title: 'Hosomaki Avocado (6 mcx / 6 pcs) ',
    image:
      'https://tb-static.uber.com/prod/image-proc/processed_images/de726add222709c80dbf05f32de076f6/f0d1762b91fd823a1aa9bd0dab5c648d.jpeg',
    description: 'Avocat, sésame / Avocado, sesame',
    price: 495,
    __v: 0,
  },
  {
    _id: '644f0772e3d6e6f4efaa032a',
    image:
      'https://tb-static.uber.com/prod/image-proc/processed_images/3a939708e217ff955a19c9abc7cb5401/4218ca1d09174218364162cd0b1a8cc1.jpeg',
    description:
      'Thon, avocat, tempura, masago orange,mayo légère épicée et sauce épicée, sésame / Tuna,\navocado, tempura, orange masago, spicy light mayo & spicy sauce, sesame',
    price: 99,
    __v: 0,
    title: 'Avocat Thon',
  },
]
